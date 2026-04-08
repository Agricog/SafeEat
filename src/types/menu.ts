/**
 * SafeEat — Menu Domain Types
 *
 * TypeScript interfaces for venues, dishes, and ingredients.
 * All types mirror the Neon PostgreSQL schema defined in SAFEEAT-BUILD-REFERENCE.md.
 *
 * IMPORTANT: price_pence is stored as integer (pence), never as float.
 * Display formatting happens in the UI layer only.
 */

// ---------------------------------------------------------------------------
// Subscription & Status Enums
// ---------------------------------------------------------------------------

export type SubscriptionTier = 'solo' | 'growing' | 'multi'

export type SubscriptionStatus = 'trial' | 'active' | 'past_due' | 'cancelled'

// ---------------------------------------------------------------------------
// Venue
// ---------------------------------------------------------------------------

export interface Venue {
  readonly id: string
  readonly clerkUserId: string
  readonly name: string
  readonly address: string | null
  readonly logoR2Key: string | null
  readonly qrCodeId: string
  readonly subscriptionTier: SubscriptionTier
  readonly subscriptionStatus: SubscriptionStatus
  readonly stripeCustomerId: string | null
  readonly lastVerifiedAt: string | null
  readonly lastVerifiedBy: string | null
  readonly createdAt: string
  readonly updatedAt: string
}

/** Fields required when creating a new venue */
export interface CreateVenueInput {
  readonly name: string
  readonly address?: string
}

/** Fields that can be updated on an existing venue */
export interface UpdateVenueInput {
  readonly name?: string
  readonly address?: string
  readonly logoR2Key?: string
}

/**
 * Verification status derived from lastVerifiedAt.
 * Used by the customer-facing menu to display trust badges.
 *
 * - 'verified': last verified within 7 days (green badge)
 * - 'stale': last verified 8–14 days ago (amber badge)
 * - 'expired': last verified 15–28 days ago (warning shown)
 * - 'suppressed': not verified for 28+ days (personalised claims hidden)
 * - 'never': venue has never completed a verification
 */
export type VerificationStatus = 'verified' | 'stale' | 'expired' | 'suppressed' | 'never'

/** Public-facing venue info shown to customers on the menu page */
export interface VenuePublic {
  readonly id: string
  readonly name: string
  readonly address: string | null
  readonly logoUrl: string | null
  readonly verificationStatus: VerificationStatus
  readonly lastVerifiedAt: string | null
}

// ---------------------------------------------------------------------------
// Dish
// ---------------------------------------------------------------------------

export interface Dish {
  readonly id: string
  readonly venueId: string
  readonly name: string
  readonly category: string | null
  readonly description: string | null
  /** Price in pence. Display as £ in UI: (pricePence / 100).toFixed(2) */
  readonly pricePence: number | null
  readonly isActive: boolean
  readonly createdAt: string
  readonly updatedAt: string
}

/** Fields required when creating a new dish */
export interface CreateDishInput {
  readonly name: string
  readonly category?: string
  readonly description?: string
  /** Price in pence */
  readonly pricePence?: number
  /** Ingredient IDs to link to this dish */
  readonly ingredientIds?: readonly string[]
}

/** Fields that can be updated on an existing dish */
export interface UpdateDishInput {
  readonly name?: string
  readonly category?: string
  readonly description?: string
  readonly pricePence?: number
  readonly isActive?: boolean
  readonly ingredientIds?: readonly string[]
}

/**
 * Dish with its computed allergen bitmask — used in menu display.
 * The allergenMask is computed server-side from the dish's ingredients.
 */
export interface DishWithAllergens extends Dish {
  /** Bitwise OR of all ingredient allergen_flags for this dish */
  readonly allergenMask: number
}

/**
 * Customer-facing dish view — includes safety status for a specific customer.
 * Only returned when a customer profile (allergen bitmask) is provided.
 */
export interface DishSafetyView {
  readonly id: string
  readonly name: string
  readonly category: string | null
  readonly description: string | null
  readonly pricePence: number | null
  /** Combined allergen bitmask of this dish */
  readonly allergenMask: number
  /** true if (allergenMask & customerAllergens) === 0 */
  readonly isSafe: boolean
}

// ---------------------------------------------------------------------------
// Ingredient
// ---------------------------------------------------------------------------

export interface Ingredient {
  readonly id: string
  readonly venueId: string
  readonly name: string
  /** Bitmask of the 14 UK allergens this ingredient contains */
  readonly allergenFlags: number
  readonly supplierName: string | null
  readonly createdAt: string
  readonly updatedAt: string
}

/** Fields required when creating a new ingredient */
export interface CreateIngredientInput {
  readonly name: string
  /** Bitmask of allergen flags — validated against ALLERGEN_ALL */
  readonly allergenFlags: number
  readonly supplierName?: string
}

/** Fields that can be updated on an existing ingredient */
export interface UpdateIngredientInput {
  readonly name?: string
  readonly allergenFlags?: number
  readonly supplierName?: string
}

// ---------------------------------------------------------------------------
// Dish–Ingredient junction
// ---------------------------------------------------------------------------

export interface DishIngredient {
  readonly dishId: string
  readonly ingredientId: string
}

// ---------------------------------------------------------------------------
// Verification Log
// ---------------------------------------------------------------------------

export interface VerificationLogEntry {
  readonly id: string
  readonly venueId: string
  readonly verifiedBy: string
  readonly changesMade: DishChange[] | null
  readonly verifiedAt: string
}

/** Records a specific change made during a verification event */
export interface DishChange {
  readonly dishId: string
  readonly dishName: string
  readonly changeType: 'ingredient_added' | 'ingredient_removed' | 'ingredient_updated' | 'dish_deactivated' | 'dish_activated' | 'no_change'
  readonly detail: string | null
}

// ---------------------------------------------------------------------------
// Menu Page — composite response for the customer-facing QR scan
// ---------------------------------------------------------------------------

/**
 * Complete menu response returned when a customer scans a venue QR code.
 * Contains everything needed to render the filtered menu in a single request.
 */
export interface MenuResponse {
  readonly venue: VenuePublic
  readonly dishes: readonly DishSafetyView[]
  /** Distinct categories present in the active menu, sorted alphabetically */
  readonly categories: readonly string[]
  /** Total number of active dishes (before filtering) */
  readonly totalDishes: number
  /** Number of safe dishes (after filtering, if customer profile provided) */
  readonly safeDishes: number | null
}

// ---------------------------------------------------------------------------
// Utility types
// ---------------------------------------------------------------------------

/** Standard paginated list response */
export interface PaginatedList<T> {
  readonly items: readonly T[]
  readonly total: number
  readonly page: number
  readonly pageSize: number
  readonly hasMore: boolean
}

/**
 * Format price in pence to display string.
 * Returns null if pricePence is null/undefined.
 *
 * @example formatPrice(1250) => "£12.50"
 * @example formatPrice(500) => "£5.00"
 * @example formatPrice(null) => null
 */
export function formatPrice(pricePence: number | null | undefined): string | null {
  if (pricePence == null) return null
  return `£${(pricePence / 100).toFixed(2)}`
}
