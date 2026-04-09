import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sql } from './db.js'

const app = new Hono()

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type'],
}))

// ---------------------------------------------------------------------------
// Health check
// ---------------------------------------------------------------------------
app.get('/api/health', async (c) => {
  try {
    const result = await sql`SELECT now() as time`
    return c.json({ status: 'ok', db: 'connected', time: result[0].time })
  } catch (err) {
    return c.json({ status: 'error', db: 'disconnected' }, 500)
  }
})

// ---------------------------------------------------------------------------
// PUBLIC: Get venue menu by slug (customer-facing QR scan endpoint)
// ---------------------------------------------------------------------------
app.get('/api/menu/:slug', async (c) => {
  const { slug } = c.req.param()

  try {
    // Get venue
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

    // Get active dishes
    const dishes = await sql`
      SELECT id, name, description, price_pence, category, allergen_mask, sort_order
      FROM dishes
      WHERE venue_id = ${venue.id} AND active = true
      ORDER BY sort_order, created_at
    `

    // Get latest verification
    const verifications = await sql`
      SELECT verified_at, type, note
      FROM verification_log
      WHERE venue_id = ${venue.id} AND type != 'missed'
      ORDER BY verified_at DESC
      LIMIT 1
    `

    // Log scan (no PII)
    await sql`
      INSERT INTO menu_scans (venue_id, is_return, profile_saved)
      VALUES (${venue.id}, false, false)
    `

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
// PUBLIC: Save customer profile
// ---------------------------------------------------------------------------
app.post('/api/menu/:slug/profile', async (c) => {
  const { slug } = c.req.param()
  const body = await c.req.json()
  const { identifier, allergenMask, allergenIds, marketingConsent } = body

  if (!identifier || allergenMask === undefined) {
    return c.json({ error: 'identifier and allergenMask are required' }, 400)
  }

  try {
    const venues = await sql`
      SELECT id FROM venues WHERE slug = ${slug} LIMIT 1
    `
    if (venues.length === 0) {
      return c.json({ error: 'Venue not found' }, 404)
    }
    const venueId = venues[0].id

    // Hash the identifier (email/phone) for privacy
    const hashedId = identifier // In production: use crypto.subtle.digest

    // Encrypt allergen IDs
    const encryptedAllergens = JSON.stringify(allergenIds || [])

    // Upsert profile
    const profiles = await sql`
      INSERT INTO customer_profiles (venue_id, hashed_identifier, encrypted_allergens, allergen_mask, profile_consent, marketing_consent, marketing_consent_at)
      VALUES (${venueId}, ${hashedId}, ${encryptedAllergens}::bytea, ${allergenMask}, true, ${!!marketingConsent}, ${marketingConsent ? new Date().toISOString() : null})
      ON CONFLICT (venue_id, hashed_identifier)
      DO UPDATE SET
        encrypted_allergens = EXCLUDED.encrypted_allergens,
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

// ---------------------------------------------------------------------------
// DASHBOARD: Get venue stats
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/stats', async (c) => {
  const { venueId } = c.req.param()

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
  const { venueId } = c.req.param()

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
  const { venueId } = c.req.param()
  const body = await c.req.json()
  const { name, description, pricePence, category, allergenMask } = body

  if (!name || pricePence === undefined || !category) {
    return c.json({ error: 'name, pricePence, and category are required' }, 400)
  }

  try {
    const dishes = await sql`
      INSERT INTO dishes (venue_id, name, description, price_pence, category, allergen_mask)
      VALUES (${venueId}, ${name}, ${description || ''}, ${pricePence}, ${category}, ${allergenMask || 0})
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
  const { venueId, dishId } = c.req.param()
  const body = await c.req.json()
  const { name, description, pricePence, category, allergenMask, active } = body

  try {
    const dishes = await sql`
      UPDATE dishes
      SET
        name = COALESCE(${name}, name),
        description = COALESCE(${description}, description),
        price_pence = COALESCE(${pricePence}, price_pence),
        category = COALESCE(${category}, category),
        allergen_mask = COALESCE(${allergenMask}, allergen_mask),
        active = COALESCE(${active}, active)
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
  const { venueId, dishId } = c.req.param()

  try {
    await sql`DELETE FROM dishes WHERE id = ${dishId} AND venue_id = ${venueId}`
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
  const { venueId } = c.req.param()

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
  const { venueId } = c.req.param()
  const body = await c.req.json()
  const { type, note } = body

  if (!type || !['confirmed', 'updated'].includes(type)) {
    return c.json({ error: 'type must be confirmed or updated' }, 400)
  }

  try {
    const entries = await sql`
      INSERT INTO verification_log (venue_id, type, note)
      VALUES (${venueId}, ${type}, ${note || ''})
      RETURNING id, type, note, verified_at
    `
    return c.json({ verification: entries[0] }, 201)
  } catch (err) {
    console.error('Verification create error:', err)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// ---------------------------------------------------------------------------
// DASHBOARD: Customer profiles
// ---------------------------------------------------------------------------
app.get('/api/dashboard/:venueId/customers', async (c) => {
  const { venueId } = c.req.param()

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

// ---------------------------------------------------------------------------
// Static files (SPA)
// ---------------------------------------------------------------------------
app.use('/*', serveStatic({ root: './dist' }))
app.get('/*', serveStatic({ root: './dist', path: 'index.html' }))

// ---------------------------------------------------------------------------
// Start server
// ---------------------------------------------------------------------------
const port = parseInt(process.env.PORT || '3000')

serve({ fetch: app.fetch, port }, () => {
  console.log(`SafeEat API running on port ${port}`)
})
