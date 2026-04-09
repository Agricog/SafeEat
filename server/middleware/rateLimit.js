import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

let redis = null
let publicLimiter = null
let dashboardLimiter = null
let profileLimiter = null

function init() {
  if (redis) return

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    console.warn('Rate limiting disabled: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN not set')
    return
  }

  redis = new Redis({
    url: UPSTASH_URL,
    token: UPSTASH_TOKEN,
  })

  // Public menu views: 60 requests per 60 seconds per IP
  publicLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(60, '60 s'),
    prefix: 'rl:public',
  })

  // Dashboard API: 120 requests per 60 seconds per user
  dashboardLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(120, '60 s'),
    prefix: 'rl:dashboard',
  })

  // Profile saves: 10 per 60 seconds per IP (prevents spam)
  profileLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60 s'),
    prefix: 'rl:profile',
  })
}

/**
 * Extract client IP from request headers.
 * Handles Cloudflare, Railway, and standard proxies.
 */
function getClientIP(c) {
  return (
    c.req.header('cf-connecting-ip') ||
    c.req.header('x-real-ip') ||
    c.req.header('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

/**
 * Rate limit middleware for public routes (menu views).
 * Keyed by client IP.
 */
export function rateLimitPublic() {
  return async (c, next) => {
    init()
    if (!publicLimiter) return await next()

    const ip = getClientIP(c)
    const { success, limit, remaining, reset } = await publicLimiter.limit(ip)

    c.header('X-RateLimit-Limit', limit.toString())
    c.header('X-RateLimit-Remaining', remaining.toString())
    c.header('X-RateLimit-Reset', reset.toString())

    if (!success) {
      return c.json({ error: 'Too many requests. Please try again shortly.' }, 429)
    }

    await next()
  }
}

/**
 * Rate limit middleware for dashboard routes.
 * Keyed by authenticated venue ID (set by auth middleware).
 */
export function rateLimitDashboard() {
  return async (c, next) => {
    init()
    if (!dashboardLimiter) return await next()

    const venueId = c.get('venueId') || getClientIP(c)
    const { success, limit, remaining, reset } = await dashboardLimiter.limit(venueId)

    c.header('X-RateLimit-Limit', limit.toString())
    c.header('X-RateLimit-Remaining', remaining.toString())
    c.header('X-RateLimit-Reset', reset.toString())

    if (!success) {
      return c.json({ error: 'Too many requests. Please try again shortly.' }, 429)
    }

    await next()
  }
}

/**
 * Rate limit middleware for profile save endpoint.
 * Keyed by client IP — stricter limit to prevent abuse.
 */
export function rateLimitProfile() {
  return async (c, next) => {
    init()
    if (!profileLimiter) return await next()

    const ip = getClientIP(c)
    const { success, limit, remaining, reset } = await profileLimiter.limit(ip)

    c.header('X-RateLimit-Limit', limit.toString())
    c.header('X-RateLimit-Remaining', remaining.toString())
    c.header('X-RateLimit-Reset', reset.toString())

    if (!success) {
      return c.json({ error: 'Too many requests. Please try again shortly.' }, 429)
    }

    await next()
  }
}
