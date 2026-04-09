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

const app = new Hono()

// ---------------------------------------------------------------------------
// Global middleware
// ---------------------------------------------------------------------------
app.use('*', securityHeaders())
app.use('/api/*', requestSizeLimit(102400))
app.use('/api/*', cors({
  origin: process.env.CORS_ORIGIN || 'https://safeeat.co.uk',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
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
      WHERE slug = ${slug}
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
      SELECT id FROM venues WHERE slug = ${slug} LIMIT 1
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
    console.error('Profile save error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ===========================================================================
// DASHBOARD ROUTES (authenticated + rate limited by venue)
// ===========================================================================

app.use('/api/dashboard/*', requireAuth())
app.use('/api/dashboard/:venueId/*', enforceVenueAccess())
app.use('/api/dashboard/*', rateLimitDashboard())

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
    console.error('Customers fetch error:', err)
    return c.json({ error: 'Internal server error' }, 500)
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
const port = parseInt(process.env.PORT || '3000')

serve({ fetch: app.fetch, port }, () => {
  console.log(`SafeEat API running on port ${port}`)
  console.log(`Auth: Clerk JWT verification enabled on /api/dashboard/*`)
  console.log(`Security: headers, CORS, size limits, input sanitisation active`)
  console.log(`Rate limiting: Upstash Redis ${process.env.UPSTASH_REDIS_REST_URL ? 'connected' : 'disabled (no env vars)'}`)
})
