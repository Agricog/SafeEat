/**
 * SafeEat — CSRF Protection (Autaimate Build Standard v2 — Layer 2)
 *
 * Protect all state-changing operations with CSRF tokens.
 *
 * Flow:
 * 1. Frontend calls getCsrfToken() on page load / before form submission
 * 2. Worker API generates a cryptographically random token, stores it server-side
 *    (Upstash Redis with 15-minute TTL), and returns it to the client
 * 3. Frontend includes the token in X-CSRF-Token header on POST/PUT/DELETE requests
 * 4. Worker API middleware validates the token before processing the request
 *
 * CSRF protection is required on:
 * - Profile creation/update/deletion (customer-facing)
 * - Dish creation/update (dashboard)
 * - Ingredient creation/update (dashboard)
 * - Menu verification (dashboard)
 * - Notification send (dashboard)
 * - Subscription checkout (dashboard)
 *
 * CSRF protection is NOT required on:
 * - GET requests (read-only)
 * - Menu fetch (public, no state change)
 * - Health check
 */

import { captureError, captureWarning } from './errorTracking'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Base URL for the SafeEat API — set via environment variable */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/** CSRF token endpoint */
const CSRF_ENDPOINT = '/api/csrf-token'

/** Header name for CSRF token — must match Worker middleware */
export const CSRF_HEADER = 'X-CSRF-Token'

// ---------------------------------------------------------------------------
// Token management
// ---------------------------------------------------------------------------

/** In-memory cache of the current CSRF token */
let cachedToken: string | null = null

/** Timestamp when the cached token was fetched */
let tokenFetchedAt: number = 0

/** Token refresh interval — fetch a new token every 10 minutes */
const TOKEN_REFRESH_MS = 10 * 60 * 1000

/**
 * Fetch a CSRF token from the API.
 *
 * Caches the token in memory and reuses it for up to 10 minutes.
 * The server-side token has a 15-minute TTL, so refreshing at 10 minutes
 * ensures the token is always valid when used.
 *
 * @param forceRefresh - Bypass the cache and fetch a new token
 * @returns The CSRF token string
 * @throws Error if the token cannot be fetched
 */
export async function getCsrfToken(forceRefresh: boolean = false): Promise<string> {
  const now = Date.now()

  // Return cached token if still fresh
  if (
    !forceRefresh &&
    cachedToken &&
    now - tokenFetchedAt < TOKEN_REFRESH_MS
  ) {
    return cachedToken
  }

  try {
    const response = await fetch(`${API_BASE_URL}${CSRF_ENDPOINT}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`CSRF token request failed: ${response.status}`)
    }

    const data = await response.json() as { token: string }

    if (!data.token || typeof data.token !== 'string') {
      throw new Error('Invalid CSRF token response')
    }

    cachedToken = data.token
    tokenFetchedAt = now

    return data.token
  } catch (error) {
    captureError(error, 'csrf.getCsrfToken')

    // If we have a cached token, return it even if expired —
    // the server will reject it and the user can retry
    if (cachedToken) {
      captureWarning(
        'Using potentially stale CSRF token after fetch failure',
        'csrf.getCsrfToken'
      )
      return cachedToken
    }

    throw error
  }
}

/**
 * Clear the cached CSRF token.
 * Call this on:
 * - Logout / session expiry
 * - After a 403 response (token may have been invalidated)
 * - When switching venues in the dashboard
 */
export function clearCsrfToken(): void {
  cachedToken = null
  tokenFetchedAt = 0
}

// ---------------------------------------------------------------------------
// Form submission with CSRF
// ---------------------------------------------------------------------------

/**
 * Submit a form with CSRF protection.
 * Automatically fetches a CSRF token if not cached, includes it in the
 * X-CSRF-Token header, and handles token refresh on 403 responses.
 *
 * @param endpoint - Relative API endpoint (e.g., '/api/profiles')
 * @param data - Request body (will be JSON-serialised)
 * @param method - HTTP method (default: POST)
 * @returns Fetch Response object
 * @throws Error if the request fails after retry
 */
export async function submitWithCsrf(
  endpoint: string,
  data: Record<string, unknown>,
  method: 'POST' | 'PUT' | 'DELETE' = 'POST'
): Promise<Response> {
  // Validate endpoint is relative (SSRF protection — Layer 4)
  if (endpoint.startsWith('http')) {
    throw new Error('SSRF protection: Use relative URLs only')
  }

  const token = await getCsrfToken()

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      [CSRF_HEADER]: token,
    },
    body: JSON.stringify(data),
  })

  // If we get a 403, the token may have expired — retry once with a fresh token
  if (response.status === 403) {
    captureWarning('CSRF token rejected, retrying with fresh token', 'csrf.submitWithCsrf')

    const freshToken = await getCsrfToken(true)

    const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        [CSRF_HEADER]: freshToken,
      },
      body: JSON.stringify(data),
    })

    return retryResponse
  }

  return response
}

// ---------------------------------------------------------------------------
// React integration helpers
// ---------------------------------------------------------------------------

/**
 * Pre-load a CSRF token.
 * Call this in a useEffect on pages with forms to avoid latency on first submit.
 *
 * @example
 * useEffect(() => {
 *   preloadCsrfToken()
 * }, [])
 */
export async function preloadCsrfToken(): Promise<void> {
  try {
    await getCsrfToken()
  } catch {
    // Silently fail — token will be fetched on form submit
  }
}

/**
 * Check if a CSRF token is currently cached and likely valid.
 * Used by UI to show/hide security-dependent features.
 */
export function hasCsrfToken(): boolean {
  if (!cachedToken) return false
  const age = Date.now() - tokenFetchedAt
  return age < TOKEN_REFRESH_MS
}
