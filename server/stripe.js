/**
 * Stripe integration for SafeEat.
 * Uses Stripe's REST API directly — no SDK dependency needed.
 */

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || ''
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || ''
const BASE = 'https://api.stripe.com/v1'

async function stripeRequest(path, method = 'GET', body = null) {
  const opts = {
    method,
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }
  if (body) {
    opts.body = new URLSearchParams(body).toString()
  }
  const res = await fetch(`${BASE}${path}`, opts)
  const data = await res.json()
  if (!res.ok) {
    const msg = data?.error?.message || `Stripe error ${res.status}`
    throw new Error(msg)
  }
  return data
}

/**
 * Create or retrieve a Stripe customer for a venue.
 */
export async function getOrCreateCustomer(venueId, venueName, venueEmail, sql) {
  // Check if venue already has a Stripe customer
  const venues = await sql`
    SELECT stripe_customer_id FROM venues WHERE id = ${venueId} LIMIT 1
  `
  if (venues[0]?.stripe_customer_id) {
    return venues[0].stripe_customer_id
  }

  // Create new Stripe customer
  const customer = await stripeRequest('/customers', 'POST', {
    name: venueName,
    email: venueEmail || undefined,
    'metadata[venue_id]': venueId,
  })

  // Save to database
  await sql`
    UPDATE venues SET stripe_customer_id = ${customer.id} WHERE id = ${venueId}
  `

  return customer.id
}

/**
 * Create a Stripe Checkout session for subscription.
 */
export async function createCheckoutSession(customerId, venueId, successUrl, cancelUrl) {
  const session = await stripeRequest('/checkout/sessions', 'POST', {
    'customer': customerId,
    'mode': 'subscription',
    'line_items[0][price]': STRIPE_PRICE_ID,
    'line_items[0][quantity]': '1',
    'success_url': successUrl,
    'cancel_url': cancelUrl,
    'metadata[venue_id]': venueId,
    'subscription_data[metadata][venue_id]': venueId,
    'allow_promotion_codes': 'true',
  })
  return session
}

/**
 * Create a Stripe Customer Portal session for managing billing.
 */
export async function createPortalSession(customerId, returnUrl) {
  const session = await stripeRequest('/billing_portal/sessions', 'POST', {
    'customer': customerId,
    'return_url': returnUrl,
  })
  return session
}

/**
 * Get subscription status for a venue.
 */
export async function getSubscriptionStatus(venueId, sql) {
  const venues = await sql`
    SELECT subscription_status, stripe_subscription_id, stripe_customer_id
    FROM venues WHERE id = ${venueId} LIMIT 1
  `
  return {
    status: venues[0]?.subscription_status || 'trialing',
    subscriptionId: venues[0]?.stripe_subscription_id || null,
    customerId: venues[0]?.stripe_customer_id || null,
  }
}

/**
 * Verify Stripe webhook signature (using raw body).
 */
export function verifyWebhookSignature(payload, sigHeader, secret) {
  // Stripe-Signature: t=timestamp,v1=signature
  const parts = sigHeader.split(',')
  const timestamp = parts.find(p => p.startsWith('t='))?.slice(2)
  const signature = parts.find(p => p.startsWith('v1='))?.slice(3)

  if (!timestamp || !signature) return false

  // Check timestamp is within 5 minutes
  const age = Math.abs(Date.now() / 1000 - parseInt(timestamp))
  if (age > 300) return false

  // Compute expected signature
  const signedPayload = `${timestamp}.${payload}`
  return computeHmac(signedPayload, secret).then(expected => expected === signature)
}

async function computeHmac(message, secret) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(message))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}
