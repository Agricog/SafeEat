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
  sendWeeklyInsight,
  sendCustomerNotification,
  sendReviewRequest,
} from './email.js'
import { generateEhoReport } from './ehoReport.js'
import { generateTableTalker } from './tableTalker.js'
import { uploadPhoto, deletePhoto, getKeyFromUrl } from './r2.js'
// ---------------------------------------------------------------------------
// Sentry initialisation (must be before app creation)
// ---------------------------------------------------------------------------
Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'production',
  enabled: !!process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,
  beforeSend(event) {
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
app.use('/api/*', requestSizeLimit(5242880))
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
// ===========================================================================
app.post('/api/cron/verification-reminders', async (c) => {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = c.req.header('Authorization')
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  try {
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
// CRON: Weekly insight emails (Monday mornings)
// ===========================================================================
const ALLERGEN_BITS = [
  'celery', 'gluten', 'crustaceans', 'eggs', 'fish', 'lupin', 'milk',
  'molluscs', 'mustard', 'tree_nuts', 'peanuts', 'sesame', 'soybeans', 'sulphites',
]
app.post('/api/cron/weekly-insights', async (c) => {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = c.req.header('Authorization')
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString()
    const fourteenDaysAgo = new Date(Date.now() - 14 * 86400000).toISOString()
    const activeVenues = await sql`
      SELECT id, name, email
      FROM venues
      WHERE subscription_status IN ('active', 'trialing', 'trial')
        AND email IS NOT NULL
        AND email != ''
    `
    let sent = 0
    for (const venue of activeVenues) {
      try {
        const [
          scansThisWeekResult,
          scansPrevWeekResult,
          newProfilesResult,
          totalProfilesResult,
          newOptInsResult,
          totalOptInsResult,
          allergenMasksResult,
          totalDishesResult,
          lastVerifiedResult,
        ] = await Promise.all([
          sql`SELECT COUNT(*)::int as count FROM menu_scans WHERE venue_id = ${venue.id} AND scanned_at > ${sevenDaysAgo}`,
          sql`SELECT COUNT(*)::int as count FROM menu_scans WHERE venue_id = ${venue.id} AND scanned_at > ${fourteenDaysAgo} AND scanned_at <= ${sevenDaysAgo}`,
          sql`SELECT COUNT(*)::int as count FROM customer_profiles WHERE venue_id = ${venue.id} AND created_at > ${sevenDaysAgo}`,
          sql`SELECT COUNT(*)::int as count FROM customer_profiles WHERE venue_id = ${venue.id}`,
          sql`SELECT COUNT(*)::int as count FROM customer_profiles WHERE venue_id = ${venue.id} AND marketing_consent = true AND marketing_consent_at > ${sevenDaysAgo}`,
          sql`SELECT COUNT(*)::int as count FROM customer_profiles WHERE venue_id = ${venue.id} AND marketing_consent = true`,
          sql`SELECT allergen_mask FROM customer_profiles WHERE venue_id = ${venue.id} AND allergen_mask > 0`,
          sql`SELECT COUNT(*)::int as count FROM dishes WHERE venue_id = ${venue.id} AND active = true`,
          sql`SELECT verified_at FROM verification_log WHERE venue_id = ${venue.id} AND type != 'missed' ORDER BY verified_at DESC LIMIT 1`,
        ])
        const allergenCounts = {}
        const totalWithAllergens = allergenMasksResult.length
        for (const row of allergenMasksResult) {
          const mask = row.allergen_mask
          for (let i = 0; i < ALLERGEN_BITS.length; i++) {
            if (mask & (1 << i)) {
              allergenCounts[ALLERGEN_BITS[i]] = (allergenCounts[ALLERGEN_BITS[i]] || 0) + 1
            }
          }
        }
        const topAllergens = Object.entries(allergenCounts)
          .map(([allergen, count]) => ({
            allergen,
            count,
            percentage: totalWithAllergens > 0 ? Math.round((count / totalWithAllergens) * 100) : 0,
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
        let lastVerifiedDaysAgo = null
        if (lastVerifiedResult.length > 0) {
          const lastDate = new Date(lastVerifiedResult[0].verified_at)
          lastVerifiedDaysAgo = Math.floor((Date.now() - lastDate.getTime()) / 86400000)
        }
        await sendWeeklyInsight({
          venueEmail: venue.email,
          venueName: venue.name,
          stats: {
            scansThisWeek: scansThisWeekResult[0].count,
            scansPreviousWeek: scansPrevWeekResult[0].count,
            newProfiles: newProfilesResult[0].count,
            totalProfiles: totalProfilesResult[0].count,
            newOptIns: newOptInsResult[0].count,
            totalOptIns: totalOptInsResult[0].count,
            topAllergens,
            totalDishes: totalDishesResult[0].count,
            lastVerifiedDaysAgo,
          },
        })
        sent++
      } catch (venueErr) {
        console.error(`Weekly insight error for venue ${venue.id}:`, venueErr)
      }
    }
    console.log(`Weekly insights: ${sent} sent out of ${activeVenues.length} active venues`)
    return c.json({ sent, total: activeVenues.length })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/cron/weekly-insights' } })
    console.error('Weekly insight cron error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ===========================================================================
// CRON: Review request emails (2 hours after profile save)
// ===========================================================================
app.post('/api/cron/review-requests', async (c) => {
  const cronSecret = process.env.CRON_SECRET
  const authHeader = c.req.header('Authorization')
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return c.json({ error: 'Unauthorized' }, 401)
  }

  try {
    const encryptionKey = process.env.ALLERGEN_ENCRYPTION_KEY || 'safeeat-default-key-change-me'

    // Find profiles saved 2-4 hours ago that haven't received a review email
    // and where the venue has review prompts enabled
    const profiles = await sql`
      SELECT
        cp.id,
        cp.venue_id,
        pgp_sym_decrypt(cp.marketing_email, ${encryptionKey}) as email,
        v.name as venue_name,
        v.slug as venue_slug,
        v.google_review_url,
        v.tripadvisor_url
      FROM customer_profiles cp
      JOIN venues v ON v.id = cp.venue_id
      WHERE cp.last_visit_at > now() - INTERVAL '4 hours'
        AND cp.last_visit_at < now() - INTERVAL '2 hours'
        AND cp.review_email_sent_at IS NULL
        AND cp.marketing_consent = true
        AND cp.marketing_email IS NOT NULL
        AND v.show_review_prompt = true
        AND (v.google_review_url != '' OR v.tripadvisor_url != '')
        AND v.subscription_status IN ('active', 'trialing', 'trial')
    `

    let sent = 0
    for (const profile of profiles) {
      try {
        const emailId = await sendReviewRequest({
          to: profile.email,
          venueName: profile.venue_name,
          venueSlug: profile.venue_slug,
          googleReviewUrl: profile.google_review_url,
          tripadvisorUrl: profile.tripadvisor_url,
        })

        if (emailId) {
          await sql`
            UPDATE customer_profiles
            SET review_email_sent_at = now()
            WHERE id = ${profile.id}
          `
          sent++
        }
      } catch (emailErr) {
        console.error(`Review email error for profile ${profile.id}:`, emailErr)
      }
    }

    console.log(`Review requests: ${sent} sent out of ${profiles.length} eligible profiles`)
    return c.json({ sent, total: profiles.length })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/cron/review-requests' } })
    console.error('Review request cron error:', err)
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
      SELECT id, name, slug, address, show_nutrition,
        show_review_prompt, google_review_url, tripadvisor_url,
        cross_contamination_notice
      FROM venues
      WHERE slug = ${slug} OR id = ${slug}
      LIMIT 1
    `
    if (venues.length === 0) {
      return c.json({ error: 'Venue not found' }, 404)
    }
    const venue = venues[0]
    const dishes = await sql`
      SELECT id, name, description, price_pence, category, allergen_mask, may_contain_mask, ingredients,
        is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher,
        calories, protein_g, carbs_g, fat_g, fibre_g, sugar_g, salt_g,
        active, sort_order, photo_url
      FROM dishes
      WHERE venue_id = ${venueId}
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
        showNutrition: venue.show_nutrition,
        showReviewPrompt: venue.show_review_prompt,
        googleReviewUrl: venue.google_review_url,
        tripadvisorUrl: venue.tripadvisor_url,
        crossContaminationNotice: venue.cross_contamination_notice || '',
      },
      dishes: dishes.map((d) => ({
        id: d.id,
        name: d.name,
        description: d.description,
        pricePence: d.price_pence,
        category: d.category,
        allergenMask: d.allergen_mask,
        mayContainMask: d.may_contain_mask || 0,
        isVegan: d.is_vegan,
        isVegetarian: d.is_vegetarian,
        isGlutenFree: d.is_gluten_free,
        isDairyFree: d.is_dairy_free,
        isHalal: d.is_halal,
        isKosher: d.is_kosher,
        calories: d.calories,
        proteinG: d.protein_g,
        carbsG: d.carbs_g,
        fatG: d.fat_g,
        fibreG: d.fibre_g,
        sugarG: d.sugar_g,
        saltG: d.salt_g,
        photoUrl: d.photo_url || '',
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
    // Store encrypted email for marketing-opted customers
    const cleanEmail = sanitiseString(identifier.trim().toLowerCase(), 254)
    const shouldStoreEmail = !!marketingConsent && cleanEmail && cleanEmail.includes('@')

    // Pre-encrypt email separately to avoid nested sql template issues
    let encryptedEmail = null
    if (shouldStoreEmail) {
      const enc = await sql`SELECT pgp_sym_encrypt(${cleanEmail}, ${encryptionKey}) as val`
      encryptedEmail = enc[0].val
    }

    const profiles = await sql`
      INSERT INTO customer_profiles (
        venue_id, hashed_identifier, encrypted_allergens, allergen_mask,
        profile_consent, marketing_consent, marketing_consent_at, marketing_email
      )
      VALUES (
        ${venueId},
        ${hashedId},
        pgp_sym_encrypt(${allergenJson}, ${encryptionKey}),
        ${cleanMask},
        true,
        ${!!marketingConsent},
        ${marketingConsent ? new Date().toISOString() : null},
        ${encryptedEmail}
      )
      ON CONFLICT (venue_id, hashed_identifier)
      DO UPDATE SET
        encrypted_allergens = pgp_sym_encrypt(${allergenJson}, ${encryptionKey}),
        allergen_mask = EXCLUDED.allergen_mask,
        marketing_consent = EXCLUDED.marketing_consent,
        marketing_consent_at = CASE WHEN EXCLUDED.marketing_consent THEN now() ELSE customer_profiles.marketing_consent_at END,
        marketing_email = CASE
          WHEN ${!!marketingConsent} AND ${shouldStoreEmail}
          THEN ${encryptedEmail}
          WHEN NOT ${!!marketingConsent}
          THEN NULL
          ELSE customer_profiles.marketing_email
        END,
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
      SELECT id, name, slug, address, phone, email, show_nutrition,
  google_review_url, tripadvisor_url, show_review_prompt, subscription_status, clerk_user_id
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
    const existing = await sql`
      SELECT id FROM venues WHERE clerk_user_id = ${clerkUserId} LIMIT 1
    `
    if (existing.length > 0) {
      return c.json({ error: 'You already have a venue' }, 409)
    }
    const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50)
    const slugSuffix = Math.random().toString(36).slice(2, 6)
    const slug = `${baseSlug}-${slugSuffix}`
    const venueId = `venue-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const venues = await sql`
      INSERT INTO venues (id, name, slug, address, phone, email, clerk_user_id, subscription_status)
      VALUES (${venueId}, ${name}, ${slug}, ${address}, ${phone}, ${email}, ${clerkUserId}, 'trial')
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
// DASHBOARD: Analytics (30-day scan history)
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/analytics', async (c) => {
  const venueId = c.get('venueId')
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString()
    const [dailyScans, newProfiles, returnScans, totalScans] = await Promise.all([
      sql`SELECT DATE(scanned_at) as date, COUNT(*)::int as count
        FROM menu_scans WHERE venue_id = ${venueId} AND scanned_at > ${thirtyDaysAgo}
        GROUP BY DATE(scanned_at) ORDER BY date`,
      sql`SELECT COUNT(*)::int as count FROM customer_profiles
        WHERE venue_id = ${venueId} AND created_at > ${thirtyDaysAgo}`,
      sql`SELECT COUNT(*)::int as count FROM menu_scans
        WHERE venue_id = ${venueId} AND scanned_at > ${thirtyDaysAgo} AND is_return = true`,
      sql`SELECT COUNT(*)::int as count FROM menu_scans
        WHERE venue_id = ${venueId} AND scanned_at > ${thirtyDaysAgo}`,
    ])
    // Fill in missing days with 0
    const filled = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000)
      const dateStr = d.toISOString().slice(0, 10)
      const found = dailyScans.find((r) => r.date && r.date.toISOString().slice(0, 10) === dateStr)
      filled.push({ date: dateStr, count: found ? found.count : 0 })
    }
    const total30 = totalScans[0].count
    const returnRate = total30 > 0 ? Math.round((returnScans[0].count / total30) * 100) : 0
    return c.json({
      dailyScans: filled,
      totalScans30d: total30,
      totalProfiles30d: newProfiles[0].count,
      returnRate,
    })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/analytics', venueId } })
    console.error('Analytics error:', err)
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
      SELECT id, name, description, price_pence, category, allergen_mask, ingredients,
        is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher,
        calories, protein_g, carbs_g, fat_g, fibre_g, sugar_g, salt_g,
        active, sort_order, photo_url
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
  const mayContainMask = sanitiseAllergenMask(body.mayContainMask ?? 0)
  const ingredients = sanitiseString(body.ingredients, 2000)
  const isVegan = !!body.isVegan
  const isVegetarian = !!body.isVegetarian
  const isGlutenFree = !!body.isGlutenFree
  const isDairyFree = !!body.isDairyFree
  const isHalal = !!body.isHalal
  const isKosher = !!body.isKosher
  const calories = body.calories != null && body.calories !== '' ? parseInt(body.calories) || null : null
  const proteinG = body.proteinG != null && body.proteinG !== '' ? parseFloat(body.proteinG) || null : null
  const carbsG = body.carbsG != null && body.carbsG !== '' ? parseFloat(body.carbsG) || null : null
  const fatG = body.fatG != null && body.fatG !== '' ? parseFloat(body.fatG) || null : null
  const fibreG = body.fibreG != null && body.fibreG !== '' ? parseFloat(body.fibreG) || null : null
  const sugarG = body.sugarG != null && body.sugarG !== '' ? parseFloat(body.sugarG) || null : null
  const saltG = body.saltG != null && body.saltG !== '' ? parseFloat(body.saltG) || null : null
  if (!name) return c.json({ error: 'Dish name is required (max 200 chars)' }, 400)
  if (pricePence === null) return c.json({ error: 'Price must be 0-9999999 pence' }, 400)
  if (!category) return c.json({ error: 'Category must be: Starters, Mains, Desserts, Sides, or Drinks' }, 400)
  if (allergenMask === null) return c.json({ error: 'Allergen mask must be 0-16383' }, 400)
  if (mayContainMask === null) return c.json({ error: 'May-contain mask must be 0-16383' }, 400)
  try {
    const dishes = await sql`
      INSERT INTO dishes (venue_id, name, description, price_pence, category, allergen_mask, may_contain_mask, ingredients,
        is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher,
        calories, protein_g, carbs_g, fat_g, fibre_g, sugar_g, salt_g)
      VALUES (${venueId}, ${name}, ${description}, ${pricePence}, ${category}, ${allergenMask}, ${mayContainMask}, ${ingredients},
        ${isVegan}, ${isVegetarian}, ${isGlutenFree}, ${isDairyFree}, ${isHalal}, ${isKosher},
        ${calories}, ${proteinG}, ${carbsG}, ${fatG}, ${fibreG}, ${sugarG}, ${saltG})
      RETURNING id, name, description, price_pence, category, allergen_mask, may_contain_mask, ingredients,
        is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher,
        calories, protein_g, carbs_g, fat_g, fibre_g, sugar_g, salt_g
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
  if (body.mayContainMask !== undefined) {
    updates.mayContainMask = sanitiseAllergenMask(body.mayContainMask)
    if (updates.mayContainMask === null) return c.json({ error: 'May-contain mask must be 0-16383' }, 400)
  }
  if (body.active !== undefined) {
    updates.active = !!body.active
  }
  if (body.ingredients !== undefined) {
    updates.ingredients = sanitiseString(body.ingredients, 2000)
  }
  if (body.isVegan !== undefined) updates.isVegan = !!body.isVegan
  if (body.isVegetarian !== undefined) updates.isVegetarian = !!body.isVegetarian
  if (body.isGlutenFree !== undefined) updates.isGlutenFree = !!body.isGlutenFree
  if (body.isDairyFree !== undefined) updates.isDairyFree = !!body.isDairyFree
  if (body.isHalal !== undefined) updates.isHalal = !!body.isHalal
  if (body.isKosher !== undefined) updates.isKosher = !!body.isKosher
  if (body.calories !== undefined) updates.calories = body.calories != null && body.calories !== '' ? parseInt(body.calories) || null : null
  if (body.proteinG !== undefined) updates.proteinG = body.proteinG != null && body.proteinG !== '' ? parseFloat(body.proteinG) || null : null
  if (body.carbsG !== undefined) updates.carbsG = body.carbsG != null && body.carbsG !== '' ? parseFloat(body.carbsG) || null : null
  if (body.fatG !== undefined) updates.fatG = body.fatG != null && body.fatG !== '' ? parseFloat(body.fatG) || null : null
  if (body.fibreG !== undefined) updates.fibreG = body.fibreG != null && body.fibreG !== '' ? parseFloat(body.fibreG) || null : null
  if (body.sugarG !== undefined) updates.sugarG = body.sugarG != null && body.sugarG !== '' ? parseFloat(body.sugarG) || null : null
  if (body.saltG !== undefined) updates.saltG = body.saltG != null && body.saltG !== '' ? parseFloat(body.saltG) || null : null
  try {
    const dishes = await sql`
      UPDATE dishes
      SET
        name = COALESCE(${updates.name ?? null}, name),
        description = COALESCE(${updates.description ?? null}, description),
        price_pence = COALESCE(${updates.pricePence ?? null}, price_pence),
        category = COALESCE(${updates.category ?? null}, category),
        allergen_mask = COALESCE(${updates.allergenMask ?? null}, allergen_mask),
        may_contain_mask = COALESCE(${updates.mayContainMask ?? null}, may_contain_mask),
        active = COALESCE(${updates.active ?? null}, active),
        ingredients = COALESCE(${updates.ingredients ?? null}, ingredients),
        is_vegan = COALESCE(${updates.isVegan ?? null}, is_vegan),
        is_vegetarian = COALESCE(${updates.isVegetarian ?? null}, is_vegetarian),
        is_gluten_free = COALESCE(${updates.isGlutenFree ?? null}, is_gluten_free),
        is_dairy_free = COALESCE(${updates.isDairyFree ?? null}, is_dairy_free),
        is_halal = COALESCE(${updates.isHalal ?? null}, is_halal),
        is_kosher = COALESCE(${updates.isKosher ?? null}, is_kosher),
        calories = COALESCE(${updates.calories !== undefined ? updates.calories : null}, calories),
        protein_g = COALESCE(${updates.proteinG !== undefined ? updates.proteinG : null}, protein_g),
        carbs_g = COALESCE(${updates.carbsG !== undefined ? updates.carbsG : null}, carbs_g),
        fat_g = COALESCE(${updates.fatG !== undefined ? updates.fatG : null}, fat_g),
        fibre_g = COALESCE(${updates.fibreG !== undefined ? updates.fibreG : null}, fibre_g),
        sugar_g = COALESCE(${updates.sugarG !== undefined ? updates.sugarG : null}, sugar_g),
        salt_g = COALESCE(${updates.saltG !== undefined ? updates.saltG : null}, salt_g)
      WHERE id = ${dishId} AND venue_id = ${venueId}
      RETURNING id, name, description, price_pence, category, allergen_mask, may_contain_mask, ingredients,
        is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher,
        calories, protein_g, carbs_g, fat_g, fibre_g, sugar_g, salt_g, active
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
// DASHBOARD: Notification audience stats (how many recipients per allergen)
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/notifications/stats', async (c) => {
  const venueId = c.get('venueId')
  try {
    const profiles = await sql`
      SELECT allergen_mask
      FROM customer_profiles
      WHERE venue_id = ${venueId}
        AND marketing_consent = true
        AND marketing_email IS NOT NULL
    `
    const total = profiles.length
    const allergenCounts = {}
    for (const row of profiles) {
      const mask = row.allergen_mask
      for (let i = 0; i < ALLERGEN_BITS.length; i++) {
        if (mask & (1 << i)) {
          allergenCounts[ALLERGEN_BITS[i]] = (allergenCounts[ALLERGEN_BITS[i]] || 0) + 1
        }
      }
    }
    return c.json({ total, allergenCounts })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/notifications/stats', venueId } })
    console.error('Notification stats error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ---------------------------------------------------------------------------
// DASHBOARD: Send notification to customers
// ---------------------------------------------------------------------------
app.post('/api/dashboard/:venueId/notifications', async (c) => {
  const venueId = c.get('venueId')
  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }
  const subject = sanitiseString(body.subject, 200)
  const message = sanitiseString(body.message, 2000)
  const allergenFilter = body.allergenFilter || null // e.g. 'gluten' or null for all
  const dietaryFilter = body.dietaryFilter || null // e.g. 'vegan' or null for all
  if (!subject) return c.json({ error: 'Subject is required' }, 400)
  if (!message) return c.json({ error: 'Message is required' }, 400)
  try {
    // Get venue details for email template
    const venues = await sql`
      SELECT name, slug FROM venues WHERE id = ${venueId} LIMIT 1
    `
    if (venues.length === 0) return c.json({ error: 'Venue not found' }, 404)
    const venue = venues[0]
    const encryptionKey = process.env.ALLERGEN_ENCRYPTION_KEY || 'safeeat-default-key-change-me'
    // Get marketing-opted profiles with decrypted emails
    const profiles = await sql`
      SELECT
        allergen_mask,
        pgp_sym_decrypt(marketing_email, ${encryptionKey}) as email
      FROM customer_profiles
      WHERE venue_id = ${venueId}
        AND marketing_consent = true
        AND marketing_email IS NOT NULL
    `
    // Filter by allergen if specified
    let filtered = profiles
    if (allergenFilter) {
      const bitIndex = ALLERGEN_BITS.indexOf(allergenFilter)
      if (bitIndex >= 0) {
        const bitMask = 1 << bitIndex
        filtered = filtered.filter((p) => p.allergen_mask & bitMask)
      }
    }
    // Send emails
    let sent = 0
    const errors = []
    for (const profile of filtered) {
      try {
        const emailId = await sendCustomerNotification({
          to: profile.email,
          subject,
          message,
          venueName: venue.name,
          venueSlug: venue.slug,
        })
        if (emailId) sent++
      } catch (emailErr) {
        errors.push(emailErr.message || 'Unknown error')
      }
    }
    // Log the notification
    await sql`
      INSERT INTO notification_log (venue_id, subject, message, allergen_filter, dietary_filter, recipients_count)
      VALUES (${venueId}, ${subject}, ${message}, ${allergenFilter}, ${dietaryFilter}, ${sent})
    `
    console.log(`Notification sent by venue ${venueId}: "${subject}" to ${sent}/${filtered.length} recipients`)
    return c.json({ sent, total: filtered.length, errors: errors.length }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/notifications', venueId } })
    console.error('Notification send error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ---------------------------------------------------------------------------
// DASHBOARD: Get notification history
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/notifications', async (c) => {
  const venueId = c.get('venueId')
  try {
    const log = await sql`
      SELECT id, subject, message, allergen_filter, dietary_filter, recipients_count, sent_at
      FROM notification_log
      WHERE venue_id = ${venueId}
      ORDER BY sent_at DESC
      LIMIT 50
    `
    return c.json({ notifications: log })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/notifications', venueId } })
    console.error('Notification history error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ---------------------------------------------------------------------------
// DASHBOARD: Staff training log
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/training', async (c) => {
  const venueId = c.get('venueId')
  try {
    const training = await sql`
      SELECT id, staff_name, training_type, certificate_ref, trained_at, recorded_at
      FROM staff_training_log
      WHERE venue_id = ${venueId}
      ORDER BY trained_at DESC
      LIMIT 100
    `
    return c.json({ training })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/training', venueId } })
    console.error('Training fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
app.post('/api/dashboard/:venueId/training', async (c) => {
  const venueId = c.get('venueId')
  let body
  try { body = await c.req.json() } catch { return c.json({ error: 'Invalid JSON body' }, 400) }
  const staffName = sanitiseString(body.staffName, 200)
  const trainingType = sanitiseString(body.trainingType, 50) || 'allergen_awareness'
  const certificateRef = sanitiseString(body.certificateRef, 200)
  const trainedAt = body.trainedAt || new Date().toISOString()
  if (!staffName) return c.json({ error: 'Staff name is required' }, 400)
  try {
    const entries = await sql`
      INSERT INTO staff_training_log (venue_id, staff_name, training_type, certificate_ref, trained_at)
      VALUES (${venueId}, ${staffName}, ${trainingType}, ${certificateRef}, ${trainedAt})
      RETURNING id, staff_name, training_type, certificate_ref, trained_at, recorded_at
    `
    return c.json({ entry: entries[0] }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/training', venueId } })
    console.error('Training create error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
app.delete('/api/dashboard/:venueId/training/:entryId', async (c) => {
  const venueId = c.get('venueId')
  const entryId = parseInt(c.req.param('entryId'))
  if (isNaN(entryId)) return c.json({ error: 'Invalid entry ID' }, 400)
  try {
    const result = await sql`
      DELETE FROM staff_training_log WHERE id = ${entryId} AND venue_id = ${venueId} RETURNING id
    `
    if (result.length === 0) return c.json({ error: 'Entry not found' }, 404)
    return c.json({ deleted: true })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'DELETE /api/dashboard/:venueId/training/:entryId', venueId } })
    console.error('Training delete error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ---------------------------------------------------------------------------
// DASHBOARD: Upload dish photo
// ---------------------------------------------------------------------------
app.post('/api/dashboard/:venueId/dishes/:dishId/photo', async (c) => {
  const venueId = c.get('venueId')
  const dishId = sanitiseId(c.req.param('dishId'))
  if (!dishId) return c.json({ error: 'Invalid dish ID' }, 400)
  try {
    // Check dish belongs to venue
    const dishes = await sql`SELECT id, photo_url FROM dishes WHERE id = ${dishId} AND venue_id = ${venueId} LIMIT 1`
    if (dishes.length === 0) return c.json({ error: 'Dish not found' }, 404)
    const contentType = c.req.header('Content-Type') || 'image/jpeg'
    if (!contentType.startsWith('image/')) return c.json({ error: 'Only image files allowed' }, 400)
    const body = await c.req.arrayBuffer()
    if (body.byteLength > 5 * 1024 * 1024) return c.json({ error: 'Image must be under 5MB' }, 400)
    if (body.byteLength === 0) return c.json({ error: 'Empty file' }, 400)
    // Delete old photo if exists
    const oldUrl = dishes[0].photo_url
    if (oldUrl) {
      const oldKey = getKeyFromUrl(oldUrl)
      if (oldKey) deletePhoto(oldKey).catch((err) => console.error('Old photo delete error:', err))
    }
    // Upload new photo
    const ext = contentType.split('/')[1] || 'jpg'
    const key = `dishes/${venueId}/${dishId}-${Date.now()}.${ext}`
    const photoUrl = await uploadPhoto(Buffer.from(body), key, contentType)
    // Update dish record
    await sql`UPDATE dishes SET photo_url = ${photoUrl} WHERE id = ${dishId} AND venue_id = ${venueId}`
    return c.json({ photoUrl }, 201)
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'POST /api/dashboard/:venueId/dishes/:dishId/photo', venueId, dishId } })
    console.error('Photo upload error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
app.delete('/api/dashboard/:venueId/dishes/:dishId/photo', async (c) => {
  const venueId = c.get('venueId')
  const dishId = sanitiseId(c.req.param('dishId'))
  if (!dishId) return c.json({ error: 'Invalid dish ID' }, 400)
  try {
    const dishes = await sql`SELECT photo_url FROM dishes WHERE id = ${dishId} AND venue_id = ${venueId} LIMIT 1`
    if (dishes.length === 0) return c.json({ error: 'Dish not found' }, 404)
    const url = dishes[0].photo_url
    if (url) {
      const key = getKeyFromUrl(url)
      if (key) await deletePhoto(key)
    }
    await sql`UPDATE dishes SET photo_url = '' WHERE id = ${dishId} AND venue_id = ${venueId}`
    return c.json({ deleted: true })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'DELETE /api/dashboard/:venueId/dishes/:dishId/photo', venueId, dishId } })
    console.error('Photo delete error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ---------------------------------------------------------------------------
// DASHBOARD: Generate EHO inspection report PDF
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/eho-report', async (c) => {
  const venueId = c.get('venueId')
  try {
    const [venues, dishes, verifications, training] = await Promise.all([
      sql`SELECT id, name, slug, address, phone, email FROM venues WHERE id = ${venueId} LIMIT 1`,
      sql`SELECT id, name, description, price_pence, category, allergen_mask, ingredients,
        is_vegan, is_vegetarian, is_gluten_free, is_dairy_free, is_halal, is_kosher,
        active, sort_order
        FROM dishes WHERE venue_id = ${venueId} ORDER BY sort_order, created_at`,
      sql`SELECT id, type, note, verified_at FROM verification_log
        Where venue_id = ${venueId} ORDER BY verified_at DESC LIMIT 50`,
      sql`SELECT staff_name, training_type, certificate_ref, trained_at FROM staff_training_log
        WHERE venue_id = ${venueId} ORDER BY trained_at DESC LIMIT 50`,
    ])
    if (venues.length === 0) return c.json({ error: 'Venue not found' }, 404)
    const pdfBytes = await generateEhoReport({
      venue: venues[0],
      dishes,
      verifications,
      training,
    })
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="SafeEat-EHO-Report-${new Date().toISOString().slice(0, 10)}.pdf"`,
      },
    })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/eho-report', venueId } })
    console.error('EHO report error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})
// ---------------------------------------------------------------------------
// DASHBOARD: Generate printable table talker PDF
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/table-talker', async (c) => {
  const venueId = c.get('venueId')
  try {
    const venues = await sql`SELECT name, slug FROM venues WHERE id = ${venueId} LIMIT 1`
    if (venues.length === 0) return c.json({ error: 'Venue not found' }, 404)
    const menuUrl = `${process.env.CORS_ORIGIN || 'https://safeeat.co.uk'}/menu/${venues[0].slug}`
    const pdfBytes = await generateTableTalker({ venueName: venues[0].name, menuUrl })
    return new Response(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="SafeEat-Table-Talker.pdf"`,
      },
    })
  } catch (err) {
    Sentry.captureException(err, { extra: { route: 'GET /api/dashboard/:venueId/table-talker', venueId } })
    console.error('Table talker error:', err)
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
      SELECT id, name, slug, address, phone, email, show_nutrition,
        google_review_url, tripadvisor_url, show_review_prompt,
        cross_contamination_notice
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
  if (body.showNutrition !== undefined) {
    updates.showNutrition = !!body.showNutrition
  }
  if (body.googleReviewUrl !== undefined) {
    updates.googleReviewUrl = sanitiseString(body.googleReviewUrl, 500)
  }
  if (body.tripadvisorUrl !== undefined) {
    updates.tripadvisorUrl = sanitiseString(body.tripadvisorUrl, 500)
  }
  if (body.showReviewPrompt !== undefined) {
    updates.showReviewPrompt = !!body.showReviewPrompt
  }
  if (body.crossContaminationNotice !== undefined) {
    updates.crossContaminationNotice = sanitiseString(body.crossContaminationNotice, 1000)
  }
  try {
    const venues = await sql`
      UPDATE venues
      SET
        name = COALESCE(${updates.name ?? null}, name),
        address = COALESCE(${updates.address ?? null}, address),
        phone = COALESCE(${updates.phone ?? null}, phone),
        email = COALESCE(${updates.email ?? null}, email),
        show_nutrition = COALESCE(${updates.showNutrition ?? null}, show_nutrition),
        google_review_url = COALESCE(${updates.googleReviewUrl ?? null}, google_review_url),
        tripadvisor_url = COALESCE(${updates.tripadvisorUrl ?? null}, tripadvisor_url),
        show_review_prompt = COALESCE(${updates.showReviewPrompt ?? null}, show_review_prompt),
        cross_contamination_notice = COALESCE(${updates.crossContaminationNotice ?? null}, cross_contamination_notice)
      WHERE id = ${venueId}
      RETURNING id, name, slug, address, phone, email, show_nutrition,
        google_review_url, tripadvisor_url, show_review_prompt,
        cross_contamination_notice
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
app.get('/mick', serveStatic({ root: './dist', path: 'mick.html' }))
app.get('/demo', serveStatic({ root: './dist', path: 'demo.html' }))
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
