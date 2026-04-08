/**
 * SafeEat — Input Sanitisation (Autaimate Build Standard v2 — Layer 1)
 *
 * DOMPurify wrapper for XSS protection on all user-submitted content.
 *
 * Usage hierarchy:
 * 1. validation.ts handles input validation + basic HTML escaping
 * 2. This module provides DOMPurify-based deep sanitisation for:
 *    - Dish descriptions (may contain accidental HTML from copy-paste)
 *    - Venue names/addresses (copy-pasted from Google Maps etc.)
 *    - Notification messages (venue owner authored)
 *    - Any content rendered via dangerouslySetInnerHTML (which we avoid — but defence in depth)
 *
 * RULE: Never use dangerouslySetInnerHTML in SafeEat. All content is rendered
 * as text nodes via React's default escaping. This module exists as a second
 * line of defence for content stored in the database.
 */

import DOMPurify from 'dompurify'

// ---------------------------------------------------------------------------
// Sanitisation profiles
// ---------------------------------------------------------------------------

/**
 * Strip ALL HTML — returns plain text only.
 * Used for: dish names, ingredient names, venue names, categories,
 * notification messages, and any field displayed as text.
 *
 * This is the default and should be used for almost everything.
 */
export function sanitizePlainText(input: string): string {
  if (!input || typeof input !== 'string') return ''

  // DOMPurify with no allowed tags = strip everything to plain text
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  })

  // Trim excessive whitespace that stripping tags might leave
  return cleaned.replace(/\s+/g, ' ').trim()
}

/**
 * Strip HTML but preserve basic line breaks.
 * Used for: dish descriptions, venue addresses (multi-line).
 *
 * Converts <br>, <p>, <div> closings to newlines before stripping.
 * Preserves intentional line structure while removing all markup.
 */
export function sanitizeMultilineText(input: string): string {
  if (!input || typeof input !== 'string') return ''

  // Convert block elements and <br> to newlines before stripping
  let processed = input
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')

  // Strip all remaining HTML
  processed = DOMPurify.sanitize(processed, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  })

  // Normalise line breaks: collapse 3+ newlines to 2, trim lines
  return processed
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Sanitise a URL — only allow http/https protocols.
 * Used for: venue website links (if added in future), external links.
 *
 * Returns empty string if the URL contains javascript:, data:, or other
 * potentially dangerous protocols.
 */
export function sanitizeUrl(input: string): string {
  if (!input || typeof input !== 'string') return ''

  const trimmed = input.trim()

  // Only allow http and https protocols
  try {
    const url = new URL(trimmed)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return ''
    }
    return url.toString()
  } catch {
    // If it's not a valid URL, reject it
    return ''
  }
}

// ---------------------------------------------------------------------------
// Batch sanitisation for form submissions
// ---------------------------------------------------------------------------

/**
 * Sanitise all string values in an object (one level deep).
 * Used for sanitising entire form payloads before sending to the API.
 *
 * Non-string values are passed through unchanged.
 * Nested objects are NOT recursively sanitised — flatten first.
 */
export function sanitizeFormData<T extends Record<string, unknown>>(
  data: T
): T {
  const sanitized = { ...data }

  for (const [key, value] of Object.entries(sanitized)) {
    if (typeof value === 'string') {
      ;(sanitized as Record<string, unknown>)[key] = sanitizePlainText(value)
    }
  }

  return sanitized
}

// ---------------------------------------------------------------------------
// Filename sanitisation (Addendum B pattern — for R2 uploads)
// ---------------------------------------------------------------------------

/**
 * Sanitise a filename for safe storage in Cloudflare R2.
 * Strips path traversal characters, special characters, and limits length.
 *
 * Used for: venue logo uploads, badge PDF filenames.
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') return 'unnamed'

  return filename
    .replace(/[^a-zA-Z0-9.\-_]/g, '_')  // Replace unsafe chars with underscore
    .replace(/_{2,}/g, '_')               // Collapse multiple underscores
    .replace(/^\.+/, '')                   // Strip leading dots (hidden files)
    .substring(0, 100)                     // Limit length
    || 'unnamed'
}

// ---------------------------------------------------------------------------
// Content safety checks
// ---------------------------------------------------------------------------

/**
 * Check if a string contains potential script injection patterns.
 * Returns true if the input looks suspicious — used as a quick pre-check
 * before full DOMPurify sanitisation.
 *
 * This is NOT a replacement for DOMPurify — it's an early warning signal
 * for logging/monitoring purposes.
 */
export function containsSuspiciousContent(input: string): boolean {
  if (!input) return false

  const lowerInput = input.toLowerCase()
  const suspiciousPatterns = [
    '<script',
    'javascript:',
    'onerror=',
    'onload=',
    'onclick=',
    'onmouseover=',
    'onfocus=',
    'eval(',
    'document.cookie',
    'window.location',
    'innerHTML',
    'outerHTML',
    'document.write',
    'String.fromCharCode',
    'atob(',
    'btoa(',
    'data:text/html',
    'vbscript:',
  ]

  return suspiciousPatterns.some((pattern) => lowerInput.includes(pattern))
}
