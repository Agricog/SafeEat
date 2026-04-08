/**
 * SafeEat — Input Validation (Autaimate Build Standard v2 — Layer 1)
 *
 * NEVER trust user input. Always validate AND sanitise.
 *
 * This module provides:
 * - Type-specific validation (email, phone, text, number, currency, allergen_ids)
 * - XSS character escaping
 * - Field-specific validators for SafeEat domain objects
 * - UK phone number validation (customer profiles)
 *
 * All validation runs on BOTH client and server (Hono middleware).
 * Client validation provides instant feedback; server validation is the authority.
 */

import DOMPurify from 'dompurify'
import type { ValidationResult, ValidationType } from '../types/api'
import { ALLERGEN_BY_ID, ALLERGENS, isValidAllergenMask, buildMaskFromIds } from '../lib/allergens'

// ---------------------------------------------------------------------------
// Core validation function (matches Build Standard Layer 1 signature)
// ---------------------------------------------------------------------------

/**
 * Validate and sanitise a single input value.
 *
 * @param input - Raw user input string
 * @param type - Validation type to apply
 * @param maxLength - Maximum allowed character length (default 255)
 * @returns ValidationResult with isValid, errors, and sanitised value
 */
export function validateInput(
  input: string,
  type: ValidationType,
  maxLength: number = 255
): ValidationResult {
  const errors: Record<string, string> = {}
  let sanitized = input.trim()

  // Length check
  if (sanitized.length === 0) {
    errors.required = 'This field is required'
  } else if (sanitized.length > maxLength) {
    errors.length = `Maximum ${maxLength} characters allowed`
  }

  // Type-specific validation
  switch (type) {
    case 'email':
      if (sanitized.length > 0 && !isValidEmail(sanitized)) {
        errors.email = 'Please enter a valid email address'
      }
      break

    case 'phone':
      if (sanitized.length > 0 && !isValidUKPhone(sanitized)) {
        errors.phone = 'Please enter a valid UK phone number'
      }
      break

    case 'number':
      if (sanitized.length > 0 && isNaN(Number(sanitized))) {
        errors.number = 'Must be a valid number'
      }
      break

    case 'currency':
      if (sanitized.length > 0 && !isValidCurrency(sanitized)) {
        errors.currency = 'Invalid price format (e.g., 12.50)'
      }
      break

    case 'text':
      // Text is validated by length only — sanitisation handles XSS
      break

    case 'allergen_ids':
      // Allergen IDs are validated by validateAllergenIds() — this is a passthrough
      break
  }

  // XSS protection: escape dangerous characters
  sanitized = escapeHtml(sanitized)

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  }
}

// ---------------------------------------------------------------------------
// HTML escaping & sanitisation
// ---------------------------------------------------------------------------

/**
 * Escape HTML special characters to prevent XSS.
 * Applied to ALL user input before storage or display.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * Sanitise HTML content using DOMPurify.
 * Used for any rich text or content that might contain HTML.
 * In SafeEat, this is applied to dish descriptions.
 */
export function sanitiseHtml(input: string): string {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],       // Strip ALL HTML tags
    ALLOWED_ATTR: [],       // Strip ALL attributes
    KEEP_CONTENT: true,     // Keep text content
  })
}

// ---------------------------------------------------------------------------
// Email validation
// ---------------------------------------------------------------------------

/** Basic email format check — server also validates via confirmation email */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) && email.length <= 254
}

// ---------------------------------------------------------------------------
// UK phone number validation
// ---------------------------------------------------------------------------

/**
 * Validate a UK phone number.
 * Accepts formats: 07xxx, +447xxx, 447xxx, 01xxx, 02xxx
 * Normalises to +44 format for consistent storage.
 */
function isValidUKPhone(phone: string): boolean {
  // Strip spaces, dashes, brackets
  const cleaned = phone.replace(/[\s\-()]/g, '')
  // UK mobile: 07xxx (11 digits) or +447xxx (13 chars) or 447xxx (12 digits)
  // UK landline: 01xxx or 02xxx (10-11 digits) or +441xxx/+442xxx
  const ukMobileRegex = /^(?:(?:\+44|44)7\d{9}|07\d{9})$/
  const ukLandlineRegex = /^(?:(?:\+44|44)[12]\d{8,9}|0[12]\d{8,9})$/
  return ukMobileRegex.test(cleaned) || ukLandlineRegex.test(cleaned)
}

/**
 * Normalise a UK phone number to +44 international format.
 * Returns null if the number is not a valid UK number.
 *
 * @example normaliseUKPhone('07911 123456') => '+447911123456'
 * @example normaliseUKPhone('+447911123456') => '+447911123456'
 * @example normaliseUKPhone('invalid') => null
 */
export function normaliseUKPhone(phone: string): string | null {
  const cleaned = phone.replace(/[\s\-()]/g, '')

  if (!isValidUKPhone(phone)) return null

  if (cleaned.startsWith('+44')) return cleaned
  if (cleaned.startsWith('44')) return `+${cleaned}`
  if (cleaned.startsWith('0')) return `+44${cleaned.slice(1)}`

  return null
}

// ---------------------------------------------------------------------------
// Currency validation
// ---------------------------------------------------------------------------

/** Validate a currency string in pounds (e.g., "12.50", "5", "0.99") */
function isValidCurrency(value: string): boolean {
  const currencyRegex = /^\d+(\.\d{1,2})?$/
  if (!currencyRegex.test(value)) return false
  const num = parseFloat(value)
  return num >= 0 && num <= 99999.99
}

/**
 * Convert a currency string in pounds to pence (integer).
 * Returns null if the input is not a valid currency value.
 *
 * @example poundsToPence('12.50') => 1250
 * @example poundsToPence('5') => 500
 * @example poundsToPence('invalid') => null
 */
export function poundsToPence(value: string): number | null {
  if (!isValidCurrency(value)) return null
  return Math.round(parseFloat(value) * 100)
}

// ---------------------------------------------------------------------------
// SafeEat domain-specific validators
// ---------------------------------------------------------------------------

/**
 * Validate an array of allergen slug IDs.
 * Returns validation errors if any ID is unrecognised.
 */
export function validateAllergenIds(ids: unknown): {
  isValid: boolean
  errors: string[]
  validIds: string[]
  mask: number
} {
  const errors: string[] = []
  const validIds: string[] = []

  if (!Array.isArray(ids)) {
    return { isValid: false, errors: ['Allergen selection must be an array'], validIds: [], mask: 0 }
  }

  if (ids.length > 14) {
    return { isValid: false, errors: ['Cannot select more than 14 allergens'], validIds: [], mask: 0 }
  }

  for (const id of ids) {
    if (typeof id !== 'string') {
      errors.push(`Invalid allergen identifier: ${String(id)}`)
      continue
    }

    if (!ALLERGEN_BY_ID.has(id)) {
      errors.push(`Unknown allergen: ${escapeHtml(id)}`)
      continue
    }

    if (validIds.includes(id)) {
      // Duplicate — silently skip, don't error
      continue
    }

    validIds.push(id)
  }

  const mask = buildMaskFromIds(validIds)

  return {
    isValid: errors.length === 0,
    errors,
    validIds,
    mask,
  }
}

/**
 * Validate a venue name.
 * Must be 2–100 characters, no script tags or excessive special characters.
 */
export function validateVenueName(name: string): ValidationResult {
  const result = validateInput(name, 'text', 100)

  if (result.isValid && name.trim().length < 2) {
    return {
      isValid: false,
      errors: { minLength: 'Venue name must be at least 2 characters' },
      sanitized: result.sanitized,
    }
  }

  return result
}

/**
 * Validate a dish name.
 * Must be 1–150 characters.
 */
export function validateDishName(name: string): ValidationResult {
  return validateInput(name, 'text', 150)
}

/**
 * Validate a dish description.
 * Optional field — max 500 characters, HTML stripped.
 */
export function validateDishDescription(description: string): ValidationResult {
  if (description.trim().length === 0) {
    return { isValid: true, errors: {}, sanitized: '' }
  }
  const sanitised = sanitiseHtml(description)
  return validateInput(sanitised, 'text', 500)
}

/**
 * Validate an ingredient name.
 * Must be 1–200 characters.
 */
export function validateIngredientName(name: string): ValidationResult {
  return validateInput(name, 'text', 200)
}

/**
 * Validate a dish price in pounds.
 * Must be a valid currency value or empty (price is optional).
 */
export function validateDishPrice(price: string): ValidationResult {
  if (price.trim().length === 0) {
    return { isValid: true, errors: {}, sanitized: '' }
  }
  return validateInput(price, 'currency', 10)
}

/**
 * Validate a dish category.
 * Optional field — max 50 characters if provided.
 */
export function validateDishCategory(category: string): ValidationResult {
  if (category.trim().length === 0) {
    return { isValid: true, errors: {}, sanitized: '' }
  }
  return validateInput(category, 'text', 50)
}

/**
 * Validate a notification message.
 * Must be 1–280 characters (SMS-friendly length).
 * Allergen data MUST NOT appear in the message — this is a business constraint.
 */
export function validateNotificationMessage(message: string): ValidationResult {
  const result = validateInput(message, 'text', 280)

  // Check the message doesn't accidentally contain raw allergen names as data
  // This is a safety check — the UI should prevent this, but validate server-side too
  const allergenNames = ALLERGENS.map((a) => a.label.toLowerCase())
  const lowerMessage = message.toLowerCase()
  const containsAllergenAsData = allergenNames.some(
    (name) => lowerMessage.includes(`allergen: ${name}`) || lowerMessage.includes(`allergy: ${name}`)
  )

  if (containsAllergenAsData) {
    return {
      isValid: false,
      errors: { content: 'Notification messages must not contain specific allergen data' },
      sanitized: result.sanitized,
    }
  }

  return result
}

// ---------------------------------------------------------------------------
// Allergen bitmask validation (server-side — for database values)
// ---------------------------------------------------------------------------

/**
 * Validate an allergen bitmask value from the database or API.
 * Must be a non-negative integer with only bits 0–13 set.
 */
export function validateAllergenMask(mask: unknown): {
  isValid: boolean
  error: string | null
  value: number
} {
  if (typeof mask !== 'number' || !Number.isInteger(mask)) {
    return { isValid: false, error: 'Allergen mask must be an integer', value: 0 }
  }

  if (!isValidAllergenMask(mask)) {
    return { isValid: false, error: 'Allergen mask contains invalid bits', value: 0 }
  }

  return { isValid: true, error: null, value: mask }
}
