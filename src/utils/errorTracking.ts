/**
 * SafeEat — Error Tracking (Autaimate Build Standard v2 — Layer 5)
 *
 * Sentry integration with CRITICAL data safety rules:
 *
 * 1. Allergen data NEVER appears in Sentry events — not in tags, breadcrumbs,
 *    extra data, or error messages. This is UK GDPR Article 9 special-category data.
 *
 * 2. Customer contact data (phone/email) NEVER appears in Sentry events.
 *    If a customer identifier is needed for debugging, use the hashed_identifier only.
 *
 * 3. Authorization headers and CSRF tokens are stripped from request data.
 *
 * 4. Session replay masks all text and blocks all media by default.
 *
 * Initialize in main.tsx before any other code runs:
 *   import { initializeSentry } from './utils/errorTracking'
 *   initializeSentry()
 */

import * as Sentry from '@sentry/react'

// ---------------------------------------------------------------------------
// Patterns to strip from Sentry events
// ---------------------------------------------------------------------------

/** Keys that should be redacted from event extra/context data */
const REDACTED_KEYS = new Set([
  'allergenMask',
  'allergenFlags',
  'allergenIds',
  'allergens',
  'allergen_flags',
  'allergen_mask',
  'allergen_ids',
  'allergensEncrypted',
  'allergens_encrypted',
  'contact',
  'contactEncrypted',
  'contact_encrypted',
  'email',
  'phone',
  'hashedIdentifier',
  'hashed_identifier',
  'consentProfile',
  'consentMarketing',
  'ipHash',
  'ip_hash',
])

/** Headers that should be stripped from request data */
const REDACTED_HEADERS = new Set([
  'authorization',
  'x-csrf-token',
  'cookie',
  'set-cookie',
])

// ---------------------------------------------------------------------------
// Initialization
// ---------------------------------------------------------------------------

/**
 * Initialize Sentry error tracking.
 * Call this once in main.tsx before React renders.
 *
 * Requires VITE_SENTRY_DSN environment variable.
 * If not set, Sentry silently does nothing (safe for local dev).
 */
export function initializeSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN

  if (!dsn) {
    if (import.meta.env.DEV) {
      console.info('[SafeEat] Sentry DSN not configured — error tracking disabled in dev')
    }
    return
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: import.meta.env.VITE_APP_VERSION || 'unknown',

    // Sample 10% of transactions in production
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

    // Session replay — mask all text and block all media for GDPR safety
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0,

    // Strip sensitive data before sending to Sentry
    beforeSend(event) {
      return sanitizeEvent(event)
    },

    // Strip sensitive data from breadcrumbs
    beforeBreadcrumb(breadcrumb) {
      return sanitizeBreadcrumb(breadcrumb)
    },
  })
}

// ---------------------------------------------------------------------------
// Event sanitization
// ---------------------------------------------------------------------------

/**
 * Remove all allergen data, PII, and auth tokens from a Sentry event.
 * This runs on EVERY event before it leaves the browser.
 */
function sanitizeEvent(event: Sentry.Event): Sentry.Event {
  // Strip sensitive request headers
  if (event.request?.headers) {
    const cleanHeaders: Record<string, string> = {}
    for (const [key, value] of Object.entries(event.request.headers)) {
      if (!REDACTED_HEADERS.has(key.toLowerCase())) {
        cleanHeaders[key] = value
      }
    }
    event.request.headers = cleanHeaders
  }

  // Strip sensitive data from request body
  if (event.request?.data) {
    event.request.data = redactObject(event.request.data)
  }

  // Strip sensitive data from extra context
  if (event.extra) {
    event.extra = redactObject(event.extra)
  }

  // Strip sensitive data from contexts
  if (event.contexts) {
    for (const key of Object.keys(event.contexts)) {
      if (event.contexts[key]) {
        event.contexts[key] = redactObject(event.contexts[key])
      }
    }
  }

  // Strip allergen/PII data from tags
  if (event.tags) {
    const cleanTags: Record<string, string> = {}
    for (const [key, value] of Object.entries(event.tags)) {
      if (!REDACTED_KEYS.has(key)) {
        cleanTags[key] = String(value)
      }
    }
    event.tags = cleanTags
  }

  // Scan exception messages for allergen data patterns
  if (event.exception?.values) {
    for (const exception of event.exception.values) {
      if (exception.value) {
        exception.value = redactAllergenPatterns(exception.value)
      }
    }
  }

  return event
}

/**
 * Sanitize a breadcrumb — strip allergen data from messages and data payloads.
 */
function sanitizeBreadcrumb(breadcrumb: Sentry.Breadcrumb): Sentry.Breadcrumb | null {
  // Strip XHR breadcrumbs that might contain profile/allergen endpoints
  if (breadcrumb.category === 'xhr' || breadcrumb.category === 'fetch') {
    const url = breadcrumb.data?.url as string | undefined
    if (url && (url.includes('/profiles') || url.includes('/allergen'))) {
      // Keep the breadcrumb but redact the body
      if (breadcrumb.data) {
        delete breadcrumb.data.body
        delete breadcrumb.data.response
      }
    }
  }

  // Strip allergen data from breadcrumb data
  if (breadcrumb.data) {
    breadcrumb.data = redactObject(breadcrumb.data)
  }

  // Strip allergen patterns from messages
  if (breadcrumb.message) {
    breadcrumb.message = redactAllergenPatterns(breadcrumb.message)
  }

  return breadcrumb
}

// ---------------------------------------------------------------------------
// Redaction utilities
// ---------------------------------------------------------------------------

/**
 * Deep-redact sensitive keys from an object.
 * Returns a new object with REDACTED_KEYS replaced with '[REDACTED]'.
 */
function redactObject(obj: unknown): Record<string, unknown> {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return {}
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (REDACTED_KEYS.has(key)) {
      result[key] = '[REDACTED]'
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      result[key] = redactObject(value)
    } else {
      result[key] = value
    }
  }

  return result
}

/**
 * Remove allergen-specific patterns from error message strings.
 * Catches cases where allergen data leaks into error messages.
 */
function redactAllergenPatterns(message: string): string {
  // Redact bitmask values that look like allergen data (e.g., "mask: 1088")
  let cleaned = message.replace(/allergen[_\s]?mask[:\s]+\d+/gi, 'allergen_mask: [REDACTED]')

  // Redact arrays of allergen IDs
  cleaned = cleaned.replace(
    /allergen[_\s]?ids?[:\s]+\[.*?\]/gi,
    'allergen_ids: [REDACTED]'
  )

  // Redact phone numbers (UK format)
  cleaned = cleaned.replace(/(?:\+44|0)7\d{9}/g, '[PHONE_REDACTED]')

  // Redact email addresses
  cleaned = cleaned.replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[EMAIL_REDACTED]')

  return cleaned
}

// ---------------------------------------------------------------------------
// Error capture utilities — use these instead of raw Sentry calls
// ---------------------------------------------------------------------------

/**
 * Capture a SafeEat-specific error with safe context.
 * Use this for all try/catch blocks in SafeEat code.
 *
 * @param error - The caught error
 * @param context - Where the error occurred (e.g., 'MenuPage.filterDishes')
 * @param safeMetadata - ONLY non-sensitive metadata (never allergen data, PII, or contact info)
 */
export function captureError(
  error: unknown,
  context: string,
  safeMetadata?: Record<string, string | number | boolean>
): void {
  Sentry.captureException(error, {
    tags: {
      type: 'safeeat_error',
      context,
    },
    extra: safeMetadata,
    level: 'error',
  })
}

/**
 * Capture a warning — non-critical issues that should be monitored.
 * E.g., validation failures, rate limit hits, stale verification.
 */
export function captureWarning(
  message: string,
  context: string,
  safeMetadata?: Record<string, string | number | boolean>
): void {
  Sentry.captureMessage(message, {
    tags: {
      type: 'safeeat_warning',
      context,
    },
    extra: safeMetadata,
    level: 'warning',
  })
}

/**
 * Set the current venue context for error tracking.
 * Call this when a venue owner logs into the dashboard.
 * ONLY sets the venue ID — never PII.
 */
export function setVenueContext(venueId: string): void {
  Sentry.setTag('venue_id', venueId)
}

/**
 * Clear all user/venue context.
 * Call this on logout or session expiry.
 */
export function clearContext(): void {
  Sentry.setTag('venue_id', undefined)
  Sentry.setUser(null)
}

// ---------------------------------------------------------------------------
// GA4 Analytics (Non-PII only — Autaimate Build Standard)
// ---------------------------------------------------------------------------

/**
 * Track a SafeEat analytics event via Google Analytics 4.
 * CRITICAL: Never include allergen data, contact info, or any PII.
 *
 * @param eventName - GA4 event name (snake_case, e.g., 'menu_filtered')
 * @param params - Event parameters — ONLY non-sensitive data
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag
    gtag('event', eventName, {
      ...params,
      timestamp: new Date().toISOString(),
    })
  }
}

/**
 * Pre-defined SafeEat analytics events.
 * Use these constants to ensure consistent event naming across the app.
 */
export const ANALYTICS_EVENTS = {
  /** Customer scanned a venue QR code */
  MENU_VIEWED: 'menu_viewed',
  /** Customer applied allergen filter */
  MENU_FILTERED: 'menu_filtered',
  /** Customer saved their allergen profile */
  PROFILE_SAVED: 'profile_saved',
  /** Customer deleted their profile */
  PROFILE_DELETED: 'profile_deleted',
  /** Customer opted in to marketing */
  MARKETING_OPTED_IN: 'marketing_opted_in',
  /** Customer opted out of marketing */
  MARKETING_OPTED_OUT: 'marketing_opted_out',
  /** Venue owner verified their menu */
  MENU_VERIFIED: 'menu_verified',
  /** Venue owner added a new dish */
  DISH_CREATED: 'dish_created',
  /** Venue owner sent a notification */
  NOTIFICATION_SENT: 'notification_sent',
  /** Customer returned (scanned with existing profile) */
  RETURN_VISIT: 'return_visit',
} as const
