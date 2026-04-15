/**
 * Security headers middleware.
 * Adds OWASP-recommended headers to all responses.
 */
export function securityHeaders() {
  return async (c, next) => {
    await next()
    // Prevent MIME type sniffing
    c.header('X-Content-Type-Options', 'nosniff')
    // Prevent clickjacking
    c.header('X-Frame-Options', 'DENY')
    // XSS protection (legacy browsers)
    c.header('X-XSS-Protection', '1; mode=block')
    // Referrer policy
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    // Permissions policy — disable unnecessary browser features
    c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()')
    // HSTS — enforce HTTPS (1 year, include subdomains)
    c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
    // Content Security Policy
    c.header('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.safeeat.co.uk https://*.clerk.accounts.dev https://*.clerk.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://api.qrserver.com https://img.clerk.com https://*.clerk.com https://pub-3d41d748af7d4a25b8aa2bfc3ba25ba8.r2.dev",
      "font-src 'self' https://*.clerk.com",
      "connect-src 'self' https://clerk.safeeat.co.uk https://*.clerk.accounts.dev https://*.clerk.com https://api.clerk.com https://clerk-telemetry.com",
      "frame-src 'self' https://clerk.safeeat.co.uk https://*.clerk.accounts.dev https://*.clerk.com",
      "worker-src 'self' blob:",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '))
  }
}

/**
 * Request size limiter middleware.
 * Rejects request bodies larger than the specified limit.
 */
export function requestSizeLimit(maxBytes = 102400) {
  return async (c, next) => {
    const contentLength = c.req.header('Content-Length')
    if (contentLength && parseInt(contentLength) > maxBytes) {
      return c.json({ error: 'Request body too large' }, 413)
    }
    await next()
  }
}

/**
 * Server-side input sanitisation.
 * Strips HTML tags, trims whitespace, enforces max length.
 */
export function sanitiseString(input, maxLength = 500) {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<[^>]*>/g, '')    // Strip HTML tags
    .replace(/&[a-z]+;/gi, '')  // Strip HTML entities
    .trim()
    .slice(0, maxLength)
}

/**
 * Validates and sanitises a price in pence.
 * Must be a positive integer, max £99,999.99
 */
export function sanitisePrice(pence) {
  const num = parseInt(pence)
  if (isNaN(num) || num < 0 || num > 9999999) return null
  return num
}

/**
 * Validates allergen mask is within valid range (0-16383).
 */
export function sanitiseAllergenMask(mask) {
  const num = parseInt(mask)
  if (isNaN(num) || num < 0 || num > 16383) return null
  return num
}

/**
 * Validates category against allowed values.
 */
const ALLOWED_CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']
export function sanitiseCategory(category) {
  if (ALLOWED_CATEGORIES.includes(category)) return category
  return null
}

/**
 * Validates slug — lowercase alphanumeric and hyphens only, max 60 chars.
 */
export function sanitiseSlug(slug) {
  if (typeof slug !== 'string') return null
  const clean = slug.toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60)
  return clean.length > 0 ? clean : null
}

/**
 * Validates UUID-like string IDs.
 */
export function sanitiseId(id) {
  if (typeof id !== 'string') return null
  // Allow UUIDs and our custom IDs like 'demo-venue-001'
  const clean = id.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 100)
  return clean.length > 0 ? clean : null
}
