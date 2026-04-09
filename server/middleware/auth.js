import { createRemoteJWKSet, jwtVerify } from 'jose'

// Clerk publishes JWKS at this endpoint
const CLERK_ISSUER = process.env.CLERK_ISSUER || ''
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY || ''

// Cache the JWKS keyset
let jwks = null

function getJWKS() {
  if (!jwks) {
    // Clerk JWKS URL derived from the Clerk frontend API domain
    // Format: https://<clerk-domain>/.well-known/jwks.json
    // We extract it from CLERK_ISSUER or construct from publishable key
    const publishableKey = process.env.VITE_CLERK_PUBLISHABLE_KEY || ''
    
    // Extract the Clerk frontend API domain from publishable key
    // pk_test_xxx or pk_live_xxx -> decode base64 part after pk_test_ or pk_live_
    let clerkDomain = ''
    try {
      const keyPart = publishableKey.replace('pk_test_', '').replace('pk_live_', '')
      // Remove trailing $ if present
      const decoded = Buffer.from(keyPart, 'base64').toString('utf-8').replace(/\$$/, '')
      clerkDomain = decoded
    } catch {
      console.error('Failed to decode Clerk publishable key')
    }

    if (!clerkDomain) {
      throw new Error('Cannot determine Clerk domain from VITE_CLERK_PUBLISHABLE_KEY')
    }

    const jwksUrl = new URL(`https://${clerkDomain}/.well-known/jwks.json`)
    jwks = createRemoteJWKSet(jwksUrl)
  }
  return jwks
}

/**
 * Hono middleware that verifies Clerk JWT tokens.
 * Extracts the authenticated user's ID and their venue_id.
 * 
 * Sets on context:
 *   c.set('clerkUserId', string)  — Clerk user ID
 *   c.set('venueId', string)      — venue ID from database lookup
 */
export function requireAuth() {
  return async (c, next) => {
    const authHeader = c.req.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Authentication required' }, 401)
    }

    const token = authHeader.slice(7)

    try {
      const keySet = getJWKS()
      const { payload } = await jwtVerify(token, keySet)

      const clerkUserId = payload.sub
      if (!clerkUserId) {
        return c.json({ error: 'Invalid token: missing subject' }, 401)
      }

      // Look up the venue for this user
      const { sql } = await import('../db.js')
      const venues = await sql`
        SELECT id FROM venues WHERE clerk_user_id = ${clerkUserId} LIMIT 1
      `

      if (venues.length === 0) {
        return c.json({ error: 'No venue found for this user' }, 403)
      }

      // Set authenticated context
      c.set('clerkUserId', clerkUserId)
      c.set('venueId', venues[0].id)

      await next()
    } catch (err) {
      console.error('Auth error:', err.message || err)

      if (err.code === 'ERR_JWT_EXPIRED') {
        return c.json({ error: 'Token expired' }, 401)
      }
      if (err.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
        return c.json({ error: 'Invalid token signature' }, 401)
      }

      return c.json({ error: 'Authentication failed' }, 401)
    }
  }
}

/**
 * Enforces that the venueId in the URL matches the authenticated venue.
 * Prevents a logged-in venue owner from accessing another venue's data.
 */
export function enforceVenueAccess() {
  return async (c, next) => {
    const urlVenueId = c.req.param('venueId')
    const authVenueId = c.get('venueId')

    if (urlVenueId && urlVenueId !== authVenueId) {
      return c.json({ error: 'Access denied: venue mismatch' }, 403)
    }

    await next()
  }
}
