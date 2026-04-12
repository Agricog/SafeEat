import * as Sentry from '@sentry/node'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sql } from './db.js'
import { requireAuth, enforceVenueAccess } from './middleware/auth.js'
import {
  securityHeaders,
  requestSizeLimit,
  sanitiseString,
  sanitisePrice,
  sanitiseAllergenMask,
  sanitiseCategory,
  sanitiseSlug,
  sanitiseId,
} from './middleware/security.js'
import { rateLimitPublic, rateLimitDashboard, rateLimitProfile } from './middleware/rateLimit.js'
import {
  getOrCreateCustomer,
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  verifyWebhookSignature,
} from './stripe.js'
import {
  sendContactNotification,
  sendWelcomeEmail,
  sendVerificationReminder,
} from './email.js'

// ---------------------------------------------------------------------------
// Sentry initialisation (must be before app creation)
// ---------------------------------------------------------------------------
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'production',
  enabled: !!process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,
  beforeSend(event) {
    // Strip sensitive headers
    if (event.request?.headers) {
      delete event.request.headers['authorization']
      delete event.request.headers['cookie']
      delete event.request.headers['stripe-signature']
    }
    return event
  },
})

const app = new Hono()

// ---------------------------------------------------------------------------
// Global error handler — catches unhandled errors and sends to Sentry
// ---------------------------------------------------------------------------
app.onError((err, c) => {
  Sentry.captureException(err, {
    extra: {
      method: c.req.method,
      url: c.req.url,
      path: c.req.path,
    },
  })
  console.error('Unhandled error:', err)
  return c.json({ error: 'Internal server error' }, 500)
})

// ---------------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------------
app.use('*', securityHeaders())
app.use('/api/*', requestSizeLimit(102400))
app.use('/api/*', cors({
  origin: process.env.CORS_ORIGIN || 'https://safeeat.co.uk',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Stripe-Signature'],
  credentials: true,
}))

// ---------------------------------------------------------------------------
// Health check (public, no rate limit)
// ---------------------------------------------------------------------------
app.get('/api/health', async (c) => {
  try {
    const result = await sql`SELECT now() as time`
    return c.json({ status: 'ok', db: 'connected', time: result[0].time })
  } catch (err) {
    return c.json({ status: 'error', db: 'disconnected' }, 500)
  }
})

// ===========================================================================
// STRIPE WEBHOOK (public, no auth, raw body — must be before auth middleware)
// ===========================================================================
app.post('/api/webhooks/stripe', async (c) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set')
    return c.json({ error: 'Webhook not configured' }, 500)
  }

  const sigHeader = c.req.header('Stripe-Signature')
  if (!sigHeader) {
    return c.json({ error: 'Missing signature' }, 400)
  }

  let rawBody
  try {
    rawBody = await c.req.text()
  } catch {
    return c.json({ error: 'Invalid body' }, 400)
  }

  const valid = await verifyWebhookSignature(rawBody, sigHeader, webhookSecret)
  if (!valid) {
    console.error('Stripe webhook signature verification failed')
    return c.json({ error: 'Invalid signature' }, 400)
  }

  let event
  try {
    event = JSON.parse(rawBody)
  } catch {
    return c.json({ error: 'Invalid JSON' }, 400)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const venueId = session.metadata?.venue_id
        const subscriptionId = session.subscription
        const customerId = session.customer

        if (venueId && subscriptionId) {
          await sql`
            UPDATE venues
            SET stripe_subscription_id = ${subscriptionId},
                stripe_customer_id = ${customerId},
                subscription_status = 'active'
            WHERE id = ${venueId}
          `
          console.log(`Subscription activated for venue ${venueId}`)

          // Send welcome email (fire and forget)
          const venues = await sql`SELECT name, email FROM venues WHERE id = ${venueId} LIMIT 1`
          if (venues.length > 0 && venues[0].email) {
            sendWelcomeEmail({ venueEmail: venues[0].email, venueName: venues[0].name })
              .catch((err) => console.error('Welcome email error:', err))
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object
        const venueId = sub.metadata?.venue_id
        const status = sub.status

        if (venueId) {
          await sql`
            UPDATE venues
            SET subscription_status = ${status}
            WHERE id = ${venueId}
          `
          console.log(`Subscription ${status} for venue ${venueId}`)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object
        const venueId = sub.metadata?.venue_id

        if (venueId) {
          await sql`
            UPDATE venues
            SET subscription_status = 'canceled',
                stripe_subscription_id = NULL
            WHERE id = ${venueId}
          `
          console.log(`Subscription canceled for venue ${venueId}`)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        const subId = invoice.subscription
        if (subId) {
          await sql`
            UPDATE venues
            SET subscription_status = 'past_due'
            WHERE stripe_subscription_id = ${subId}
          `
          console.log(`Payment failed for subscription ${subId}`)
        }
        break
      }

      default:
        break
    }
  } catch (err) {
    Sentry.captureException(err, { extra: { eventType: event.type } })
    console.error('Webhook processing error:', err)
    return c.json({ error: 'Processing error' }, 500)
  }

  return c.json({ received: true })
})

// ===========================================================================
// CRON: Verification reminder emails
// Trigger daily via external cron service (e.g. cron-job.org).
// Protected by CRON_SECRET to prevent abuse.
// ===========================================================================
app.post('/api/cron/verification-reminders', async (c) => {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = c.req.header('Authorization')

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    // Find venues with active subscriptions that haven't verified in 7+ days
    const overdueVenues = await sql`
      SELECT v.id, v.name, v.email,
        EXTRACT(DAY FROM now() - MAX(vl.verified_at))::int AS days_since
      FROM venues v
      LEFT JOIN verification_log vl ON vl.venue_id = v.id AND vl.type != 'missed'
      WHERE v.subscription_status = 'active'
        AND v.email IS NOT NULL
        AND v.email != ''
      GROUP BY v.id, v.name, v.email
      HAVING MAX(vl.verified_at) IS NULL OR MAX(vl.verified_at) < now() - INTERVAL '7 days'
    `

    let sent = 0
    for (const venue of overdueVenues) {
      const daysSince = venue.days_since || 'many'
      await sendVerificationReminder({
        venueEmail: venue.email,
        venueName: venue.name,
        daysSince,
      })
      sent++
    }

    console.log(`Verification reminders: ${sent} sent out of ${overdueVenues.length} overdue venues`)
    return c.json({ sent, total: overdueVenues.length })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/cron/verification-reminders' } })
    console.error('Verification reminder cron error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ===========================================================================
// PUBLIC ROUTES (rate limited by IP)
// ===========================================================================

// ---------------------------------------------------------------------------
// PUBLIC: Get venue menu by slug
// ---------------------------------------------------------------------------
app.get('/api/menu/:slug', rateLimitPublic(), async (c) => {
  const slug = sanitiseSlug(c.req.param('slug'))
  if (!slug) return c.json({ error: 'Invalid venue slug' }, 400)

  try {
    const venues = await sql`
      SELECT id, name, slug, address
      FROM venues
      WHERE slug = ${slug} OR id = ${slug}
      LIMIT 1
    `
    if (venues.length === 0) {
      return c.json({ error: 'Venue not found' }, 404)
    }
    const venue = venues[0]

    const dishes = await sql`
      SELECT id, name, description, price_pence, category, allergen_mask, sort_order
      FROM dishes
      WHERE venue_id = ${venue.id} AND active = true
      ORDER BY sort_order, created_at
    `

    const verifications = await sql`
      SELECT verified_at, type, note
      FROM verification_log
      WHERE venue_id = ${venue.id} AND type != 'missed'
      ORDER BY verified_at DESC
      LIMIT 1
    `

    sql`
      INSERT INTO menu_scans (venue_id, is_return, profile_saved)
      VALUES (${venue.id}, false, false)
    `.catch((err) => console.error('Scan log error:', err))

    return c.json({
      venue: {
        id: venue.id,
        name: venue.name,
        slug: venue.slug,
        address: venue.address,
      },
      dishes: dishes.map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        pricePence: d.price_pence,
        category: d.category,
        allergenMask: d.allergen_mask,
      })),
      verification: verifications.length > 0
        ? { verifiedAt: verifications[0].verified_at, type: verifications[0].type }
        : null,
    })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/menu/:slug', slug } })
    console.error('Menu fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// PUBLIC: Save customer profile (stricter rate limit)
// ---------------------------------------------------------------------------
app.post('/api/menu/:slug/profile', rateLimitProfile(), async (c) => {
  const slug = sanitiseSlug(c.req.param('slug'))
  if (!slug) return c.json({ error: 'Invalid venue slug' }, 400)

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const { identifier, allergenMask, allergenIds, marketingConsent } = body

  if (!identifier || typeof identifier !== 'string') {
    return c.json({ error: 'identifier is required' }, 400)
  }
  const cleanMask = sanitiseAllergenMask(allergenMask)
  if (cleanMask === null) {
    return c.json({ error: 'allergenMask must be 0-16383' }, 400)
  }
  if (allergenIds && !Array.isArray(allergenIds)) {
    return c.json({ error: 'allergenIds must be an array' }, 400)
  }

  try {
    const venues = await sql`
      SELECT id FROM venues WHERE slug = ${slug} OR id = ${slug} LIMIT 1
    `
    if (venues.length === 0) {
      return c.json({ error: 'Venue not found' }, 404)
    }
    const venueId = venues[0].id

    const encoder = new TextEncoder()
    const data = encoder.encode(identifier.trim().toLowerCase())
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedId = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    const cleanAllergenIds = Array.isArray(allergenIds)
      ? allergenIds.filter((id) => typeof id === 'string' && id.length <= 20).slice(0, 14)
      : []

    const allergenJson = JSON.stringify(cleanAllergenIds)
    const encryptionKey = process.env.ALLERGEN_ENCRYPTION_KEY || 'safeeat-default-key-change-me'

    const profiles = await sql`
      INSERT INTO customer_profiles (
        venue_id, hashed_identifier, encrypted_allergens, allergen_mask,
        profile_consent, marketing_consent, marketing_consent_at
      )
      VALUES (
        ${venueId},
        ${hashedId},
        pgp_sym_encrypt(${allergenJson}, ${encryptionKey}),
        ${cleanMask},
        true,
        ${!!marketingConsent},
        ${marketingConsent ? new Date().toISOString() : null}
      )
      ON CONFLICT (venue_id, hashed_identifier)
      DO UPDATE SET
        encrypted_allergens = pgp_sym_encrypt(${allergenJson}, ${encryptionKey}),
        allergen_mask = EXCLUDED.allergen_mask,
        marketing_consent = EXCLUDED.marketing_consent,
        marketing_consent_at = CASE WHEN EXCLUDED.marketing_consent THEN now() ELSE customer_profiles.marketing_consent_at END,
        last_visit_at = now(),
        visit_count = customer_profiles.visit_count + 1
      RETURNING id, visit_count
    `

    return c.json({ saved: true, profileId: profiles[0].id, visits: profiles[0].visit_count })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/menu/:slug/profile', slug } })
    console.error('Profile save error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// PUBLIC: Contact form submission (stricter rate limit)
// ---------------------------------------------------------------------------
app.post('/api/contact', rateLimitProfile(), async (c) => {
  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }
  const name = sanitiseString(body.name, 100)
  const email = sanitiseString(body.email, 254)
  const message = sanitiseString(body.message, 2000)
  if (!name) return c.json({ error: 'Name is required' }, 400)
  if (!email || !email.includes('@')) return c.json({ error: 'Valid email is required' }, 400)
  if (!message) return c.json({ error: 'Message is required' }, 400)
  try {
    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (${name}, ${email}, ${message})
    `
    console.log(`Contact form: ${name} <${email}>`)
    // Send notification email to admin (fire and forget)
    sendContactNotification({ name, email, message })
      .catch((err) => console.error('Contact notification email error:', err))
    return c.json({ sent: true }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/contact' } })
    console.error('Contact form error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ===========================================================================
// DASHBOARD ROUTES (authenticated + rate limited by venue)
// ===========================================================================

app.use('/api/dashboard/*', requireAuth())
app.use('/api/dashboard/*', rateLimitDashboard())

// ---------------------------------------------------------------------------
// DASHBOARD: Get current user's venue
// ---------------------------------------------------------------------------
app.get('/api/dashboard/me', async (c) => {
  const clerkUserId = c.get('clerkUserId')
  try {
    const venues = await sql`
      SELECT id, name, slug, address, phone, email
      FROM venues
      WHERE clerk_user_id = ${clerkUserId}
      LIMIT 1
    `
    if (venues.length === 0) {
      return c.json({ error: 'No venue linked to this account' }, 404)
    }
    return c.json({ venue: venues[0] })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/me', clerkUserId } })
    console.error('Venue lookup error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Create venue (onboarding)
// ---------------------------------------------------------------------------
app.post('/api/dashboard/venues', async (c) => {
  const clerkUserId = c.get('clerkUserId')

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const name = sanitiseString(body.name, 200)
  const address = sanitiseString(body.address, 500)
  const phone = sanitiseString(body.phone, 20)
  const email = sanitiseString(body.email, 254)

  if (!name) return c.json({ error: 'Venue name is required' }, 400)

  try {
    // Check user doesn't already have a venue
    const existing = await sql`
      SELECT id FROM venues WHERE clerk_user_id = ${clerkUserId} LIMIT 1
    `
    if (existing.length > 0) {
      return c.json({ error: 'You already have a venue' }, 409)
    }

    // Generate slug from name
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50)
    const slugSuffix = Math.random().toString(36).slice(2, 6)
    const slug = `${baseSlug}-${slugSuffix}`

    // Generate venue ID
    const venueId = `venue-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const venues = await sql`
      INSERT INTO venues (id, name, slug, address, phone, email, clerk_user_id, subscription_status)
      VALUES (${venueId}, ${name}, ${slug}, ${address}, ${phone}, ${email}, ${clerkUserId}, 'trialing')
      RETURNING id, name, slug, address, phone, email
    `

    console.log(`New venue created: ${name} (${venueId}) by ${clerkUserId}`)
    return c.json({ venue: venues[0] }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/venues', clerkUserId } })
    console.error('Venue creation error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Venue-scoped routes need enforceVenueAccess
app.use('/api/dashboard/:venueId/*', enforceVenueAccess())

// ---------------------------------------------------------------------------
// DASHBOARD: Get venue stats
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/stats', async (c) => {
  const venueId = c.get('venueId')

  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString()

    const [scans, profiles, optIns, verification] = await Promise.all([
      sql`SELECT COUNT(*)::int as count FROM menu_scans WHERE venue_id = ${venueId} AND scanned_at > ${sevenDaysAgo}`,
      sql`SELECT COUNT(*)::int as count FROM customer_profiles WHERE venue_id = ${venueId}`,
      sql`SELECT COUNT(*)::int as count FROM customer_profiles WHERE venue_id = ${venueId} AND marketing_consent = true`,
      sql`SELECT verified_at FROM verification_log WHERE venue_id = ${venueId} AND type != 'missed' ORDER BY verified_at DESC LIMIT 1`,
    ])

    return c.json({
      scansWeek: scans[0].count,
      totalProfiles: profiles[0].count,
      marketingOptIns: optIns[0].count,
      lastVerified: verification.length > 0 ? verification[0].verified_at : null,
    })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/stats', venueId } })
    console.error('Stats error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Get dishes for venue
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/dishes', async (c) => {
  const venueId = c.get('venueId')

  try {
    const dishes = await sql`
      SELECT id, name, description, price_pence, category, allergen_mask, active, sort_order
      FROM dishes
      WHERE venue_id = ${venueId}
      ORDER BY sort_order, created_at
    `
    return c.json({ dishes })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/dishes', venueId } })
    console.error('Dishes fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Create dish
// ---------------------------------------------------------------------------
app.post('/api/dashboard/:venueId/dishes', async (c) => {
  const venueId = c.get('venueId')

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const name = sanitiseString(body.name, 200)
  const description = sanitiseString(body.description, 500)
  const pricePence = sanitisePrice(body.pricePence)
  const category = sanitiseCategory(body.category)
  const allergenMask = sanitiseAllergenMask(body.allergenMask ?? 0)

  if (!name) return c.json({ error: 'Dish name is required (max 200 chars)' }, 400)
  if (pricePence === null) return c.json({ error: 'Price must be 0-9999999 pence' }, 400)
  if (!category) return c.json({ error: 'Category must be: Starters, Mains, Desserts, Sides, or Drinks' }, 400)
  if (allergenMask === null) return c.json({ error: 'Allergen mask must be 0-16383' }, 400)

  try {
    const dishes = await sql`
      INSERT INTO dishes (venue_id, name, description, price_pence, category, allergen_mask)
      VALUES (${venueId}, ${name}, ${description}, ${pricePence}, ${category}, ${allergenMask})
      RETURNING id, name, description, price_pence, category, allergen_mask
    `
    return c.json({ dish: dishes[0] }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/dishes', venueId } })
    console.error('Dish create error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Update dish
// ---------------------------------------------------------------------------
app.put('/api/dashboard/:venueId/dishes/:dishId', async (c) => {
  const venueId = c.get('venueId')
  const dishId = sanitiseId(c.req.param('dishId'))
  if (!dishId) return c.json({ error: 'Invalid dish ID' }, 400)

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const updates = {}
  if (body.name !== undefined) {
    updates.name = sanitiseString(body.name, 200)
    if (!updates.name) return c.json({ error: 'Dish name cannot be empty' }, 400)
  }
  if (body.description !== undefined) {
    updates.description = sanitiseString(body.description, 500)
  }
  if (body.pricePence !== undefined) {
    updates.pricePence = sanitisePrice(body.pricePence)
    if (updates.pricePence === null) return c.json({ error: 'Price must be 0-9999999 pence' }, 400)
  }
  if (body.category !== undefined) {
    updates.category = sanitiseCategory(body.category)
    if (!updates.category) return c.json({ error: 'Invalid category' }, 400)
  }
  if (body.allergenMask !== undefined) {
    updates.allergenMask = sanitiseAllergenMask(body.allergenMask)
    if (updates.allergenMask === null) return c.json({ error: 'Allergen mask must be 0-16383' }, 400)
  }
  if (body.active !== undefined) {
    updates.active = !!body.active
  }

  try {
    const dishes = await sql`
      UPDATE dishes
      SET
        name = COALESCE(${updates.name ?? null}, name),
        description = COALESCE(${updates.description ?? null}, description),
        price_pence = COALESCE(${updates.pricePence ?? null}, price_pence),
        category = COALESCE(${updates.category ?? null}, category),
        allergen_mask = COALESCE(${updates.allergenMask ?? null}, allergen_mask),
        active = COALESCE(${updates.active ?? null}, active)
      WHERE id = ${dishId} AND venue_id = ${venueId}
      RETURNING id, name, description, price_pence, category, allergen_mask, active
    `
    if (dishes.length === 0) {
      return c.json({ error: 'Dish not found' }, 404)
    }
    return c.json({ dish: dishes[0] })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'PUT /api/dashboard/:venueId/dishes/:dishId', venueId, dishId } })
    console.error('Dish update error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Delete dish
// ---------------------------------------------------------------------------
app.delete('/api/dashboard/:venueId/dishes/:dishId', async (c) => {
  const venueId = c.get('venueId')
  const dishId = sanitiseId(c.req.param('dishId'))
  if (!dishId) return c.json({ error: 'Invalid dish ID' }, 400)

  try {
    const result = await sql`
      DELETE FROM dishes WHERE id = ${dishId} AND venue_id = ${venueId}
      RETURNING id
    `
    if (result.length === 0) {
      return c.json({ error: 'Dish not found' }, 404)
    }
    return c.json({ deleted: true })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'DELETE /api/dashboard/:venueId/dishes/:dishId', venueId, dishId } })
    console.error('Dish delete error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Verification log
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/verifications', async (c) => {
  const venueId = c.get('venueId')

  try {
    const log = await sql`
      SELECT id, type, note, verified_at
      FROM verification_log
      WHERE venue_id = ${venueId}
      ORDER BY verified_at DESC
      LIMIT 50
    `
    return c.json({ verifications: log })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/verifications', venueId } })
    console.error('Verification fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/api/dashboard/:venueId/verifications', async (c) => {
  const venueId = c.get('venueId')

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const { type } = body
  const note = sanitiseString(body.note, 500)

  if (!type || !['confirmed', 'updated'].includes(type)) {
    return c.json({ error: 'type must be confirmed or updated' }, 400)
  }

  try {
    const entries = await sql`
      INSERT INTO verification_log (venue_id, type, note)
      VALUES (${venueId}, ${type}, ${note})
      RETURNING id, type, note, verified_at
    `
    return c.json({ verification: entries[0] }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/verifications', venueId } })
    console.error('Verification create error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Customer profiles (read-only — no PII exposed)
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/customers', async (c) => {
  const venueId = c.get('venueId')

  try {
    const profiles = await sql`
      SELECT id, allergen_mask, marketing_consent, last_visit_at, visit_count, created_at
      FROM customer_profiles
      WHERE venue_id = ${venueId}
      ORDER BY last_visit_at DESC
    `
    return c.json({ customers: profiles })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/customers', venueId } })
    console.error('Customers fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Get venue details (for settings page)
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/venue', async (c) => {
  const venueId = c.get('venueId')

  try {
    const venues = await sql`
      SELECT id, name, slug, address, phone, email
      FROM venues
      WHERE id = ${venueId}
      LIMIT 1
    `
    if (venues.length === 0) {
      return c.json({ error: 'Venue not found' }, 404)
    }
    return c.json({ venue: venues[0] })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/venue', venueId } })
    console.error('Venue fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Update venue details
// ---------------------------------------------------------------------------
app.put('/api/dashboard/:venueId/venue', async (c) => {
  const venueId = c.get('venueId')

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  const updates = {}
  if (body.name !== undefined) {
    updates.name = sanitiseString(body.name, 200)
    if (!updates.name) return c.json({ error: 'Venue name cannot be empty' }, 400)
  }
  if (body.address !== undefined) {
    updates.address = sanitiseString(body.address, 500)
  }
  if (body.phone !== undefined) {
    updates.phone = sanitiseString(body.phone, 20)
  }
  if (body.email !== undefined) {
    updates.email = sanitiseString(body.email, 254)
  }

  try {
    const venues = await sql`
      UPDATE venues
      SET
        name = COALESCE(${updates.name ?? null}, name),
        address = COALESCE(${updates.address ?? null}, address),
        phone = COALESCE(${updates.phone ?? null}, phone),
        email = COALESCE(${updates.email ?? null}, email)
      WHERE id = ${venueId}
      RETURNING id, name, slug, address, phone, email
    `
    if (venues.length === 0) {
      return c.json({ error: 'Venue not found' }, 404)
    }
    return c.json({ venue: venues[0] })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'PUT /api/dashboard/:venueId/venue', venueId } })
    console.error('Venue update error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Subscription status
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/subscription', async (c) => {
  const venueId = c.get('venueId')

  try {
    const sub = await getSubscriptionStatus(venueId, sql)
    return c.json(sub)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/subscription', venueId } })
    console.error('Subscription status error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Create Stripe Checkout session
// ---------------------------------------------------------------------------
app.post('/api/dashboard/:venueId/billing/checkout', async (c) => {
  const venueId = c.get('venueId')

  try {
    const venues = await sql`
      SELECT name, email FROM venues WHERE id = ${venueId} LIMIT 1
    `
    if (venues.length === 0) return c.json({ error: 'Venue not found' }, 404)

    const customerId = await getOrCreateCustomer(venueId, venues[0].name, venues[0].email, sql)

    const origin = process.env.CORS_ORIGIN || 'https://safeeat.co.uk'
    const session = await createCheckoutSession(
      customerId,
      venueId,
      `${origin}/dashboard/settings?billing=success`,
      `${origin}/dashboard/settings?billing=canceled`
    )

    return c.json({ url: session.url })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/billing/checkout', venueId } })
    console.error('Checkout session error:', err)
    return c.json({ error: err.message || 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Create Stripe Customer Portal session
// ---------------------------------------------------------------------------
app.post('/api/dashboard/:venueId/billing/portal', async (c) => {
  const venueId = c.get('venueId')

  try {
    const venues = await sql`
      SELECT stripe_customer_id, name, email FROM venues WHERE id = ${venueId} LIMIT 1
    `
    if (venues.length === 0) return c.json({ error: 'Venue not found' }, 404)

    let customerId = venues[0].stripe_customer_id
    if (!customerId) {
      customerId = await getOrCreateCustomer(venueId, venues[0].name, venues[0].email, sql)
    }

    const origin = process.env.CORS_ORIGIN || 'https://safeeat.co.uk'
    const session = await createPortalSession(customerId, `${origin}/dashboard/settings`)

    return c.json({ url: session.url })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/billing/portal', venueId } })
    console.error('Portal session error:', err)
    return c.json({ error: err.message || 'Internal server error' }, 500)
  }
})

// ===========================================================================
// STATIC FILES (SPA fallback)
// ===========================================================================
app.use('/*', serveStatic({ root: './dist' }))
app.get('/*', serveStatic({ root: './dist', path: 'index.html' }))

// ===========================================================================
// START SERVER
// ===========================================================================
const port = parseInt(process.env.PORT || '8080')

serve({ fetch: app.fetch, port }, () => {
  console.log(`SafeEat API running on port ${port}`)
  console.log(`Auth: Clerk JWT verification enabled on /api/dashboard/*`)
  console.log(`Security: headers, CORS, size limits, input sanitisation active`)
  console.log(`Rate limiting: Upstash Redis ${process.env.UPSTASH_REDIS_REST_URL ? 'connected' : 'disabled (no env vars)'}`)
  console.log(`Stripe: ${process.env.STRIPE_SECRET_KEY ? 'configured' : 'not configured'}`)
  console.log(`Sentry: ${process.env.SENTRY_DSN ? 'configured' : 'not configured'}`)
  console.log(`Email: Resend ${process.env.RESEND_API_KEY ? 'configured' : 'not configured'}`)
})
