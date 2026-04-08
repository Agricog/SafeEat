/**
 * SafeEat — UK 14 Allergen Bitmask System
 *
 * The 14 allergens regulated under the Food Information Regulations 2014
 * (retained EU Regulation 1169/2011) mapped to a single integer bitmask
 * for fast bitwise filtering.
 *
 * A dish's allergen profile = bitwise OR of all its ingredient allergen_flags.
 * A customer's safe dishes = WHERE (dish_allergens & customer_allergens) === 0.
 *
 * @see https://www.food.gov.uk/business-guidance/allergen-guidance-for-food-businesses
 */

// ---------------------------------------------------------------------------
// Bitmask constants — each allergen is a single bit position
// ---------------------------------------------------------------------------

export const ALLERGEN_CELERY = 1 << 0          // 1
export const ALLERGEN_GLUTEN = 1 << 1          // 2
export const ALLERGEN_CRUSTACEANS = 1 << 2     // 4
export const ALLERGEN_EGGS = 1 << 3            // 8
export const ALLERGEN_FISH = 1 << 4            // 16
export const ALLERGEN_LUPIN = 1 << 5           // 32
export const ALLERGEN_MILK = 1 << 6            // 64
export const ALLERGEN_MOLLUSCS = 1 << 7        // 128
export const ALLERGEN_MUSTARD = 1 << 8         // 256
export const ALLERGEN_TREE_NUTS = 1 << 9       // 512
export const ALLERGEN_PEANUTS = 1 << 10        // 1024
export const ALLERGEN_SESAME = 1 << 11         // 2048
export const ALLERGEN_SOYBEANS = 1 << 12       // 4096
export const ALLERGEN_SULPHITES = 1 << 13      // 8192

/** All 14 bits set — used for validation (no bit higher than this is valid) */
export const ALLERGEN_ALL = (1 << 14) - 1      // 16383

// ---------------------------------------------------------------------------
// Allergen metadata — id, bitmask value, label, short label, icon
// ---------------------------------------------------------------------------

export interface AllergenInfo {
  /** Unique slug identifier (e.g., 'celery', 'gluten') */
  readonly id: string
  /** Bitmask value (power of 2) */
  readonly bit: number
  /** Bit position (0–13) */
  readonly position: number
  /** Full display label */
  readonly label: string
  /** Short label for compact UI (badges, chips) */
  readonly shortLabel: string
  /** Emoji icon for visual identification */
  readonly icon: string
  /** FSA description of what the allergen covers */
  readonly description: string
}

export const ALLERGENS: readonly AllergenInfo[] = [
  {
    id: 'celery',
    bit: ALLERGEN_CELERY,
    position: 0,
    label: 'Celery',
    shortLabel: 'Celery',
    icon: '🥬',
    description: 'Including celeriac. Found in celery salt, salads, soups, stock cubes, and some meat products.',
  },
  {
    id: 'gluten',
    bit: ALLERGEN_GLUTEN,
    position: 1,
    label: 'Cereals containing gluten',
    shortLabel: 'Gluten',
    icon: '🌾',
    description: 'Including wheat, rye, barley, oats, spelt, and kamut. Found in bread, pasta, cakes, pastry, sauces, and some meat products.',
  },
  {
    id: 'crustaceans',
    bit: ALLERGEN_CRUSTACEANS,
    position: 2,
    label: 'Crustaceans',
    shortLabel: 'Crustaceans',
    icon: '🦀',
    description: 'Including crab, lobster, prawns, and shrimp. Found in shrimp paste, often used in Thai and south-east Asian curries.',
  },
  {
    id: 'eggs',
    bit: ALLERGEN_EGGS,
    position: 3,
    label: 'Eggs',
    shortLabel: 'Eggs',
    icon: '🥚',
    description: 'Found in cakes, some meat products, mayonnaise, mousses, pasta, quiche, sauces, and pastries.',
  },
  {
    id: 'fish',
    bit: ALLERGEN_FISH,
    position: 4,
    label: 'Fish',
    shortLabel: 'Fish',
    icon: '🐟',
    description: 'Found in some fish sauces, pizzas, relishes, salad dressings, stock cubes, and Worcestershire sauce.',
  },
  {
    id: 'lupin',
    bit: ALLERGEN_LUPIN,
    position: 5,
    label: 'Lupin',
    shortLabel: 'Lupin',
    icon: '🌸',
    description: 'Lupin seeds and flour. Found in some types of bread, pastries, and pasta.',
  },
  {
    id: 'milk',
    bit: ALLERGEN_MILK,
    position: 6,
    label: 'Milk',
    shortLabel: 'Milk',
    icon: '🥛',
    description: 'Including lactose. Found in butter, cheese, cream, milk powders, yoghurt, and many processed foods.',
  },
  {
    id: 'molluscs',
    bit: ALLERGEN_MOLLUSCS,
    position: 7,
    label: 'Molluscs',
    shortLabel: 'Molluscs',
    icon: '🦪',
    description: 'Including mussels, oysters, squid, snails, and whelks. Found in some oyster sauces and fish stews.',
  },
  {
    id: 'mustard',
    bit: ALLERGEN_MUSTARD,
    position: 8,
    label: 'Mustard',
    shortLabel: 'Mustard',
    icon: '🟡',
    description: 'Including mustard powder, liquid, seeds, and leaves. Found in breads, curries, marinades, salad dressings, sauces, and soups.',
  },
  {
    id: 'tree_nuts',
    bit: ALLERGEN_TREE_NUTS,
    position: 9,
    label: 'Tree nuts',
    shortLabel: 'Tree nuts',
    icon: '🌰',
    description: 'Including almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, and macadamia nuts. Found in breads, biscuits, crackers, desserts, nut butters, oils, and sauces.',
  },
  {
    id: 'peanuts',
    bit: ALLERGEN_PEANUTS,
    position: 10,
    label: 'Peanuts',
    shortLabel: 'Peanuts',
    icon: '🥜',
    description: 'Found in biscuits, cakes, curries, desserts, groundnut oil, peanut flour, and sauces. Often used in Chinese, Thai, Indonesian, and African cooking.',
  },
  {
    id: 'sesame',
    bit: ALLERGEN_SESAME,
    position: 11,
    label: 'Sesame',
    shortLabel: 'Sesame',
    icon: '⚪',
    description: 'Including sesame seeds and sesame oil. Found in bread, breadsticks, houmous, sesame oil, and tahini.',
  },
  {
    id: 'soybeans',
    bit: ALLERGEN_SOYBEANS,
    position: 12,
    label: 'Soybeans',
    shortLabel: 'Soya',
    icon: '🫘',
    description: 'Found in bean curd, edamame, miso, soya flour, soya sauce, tempeh, textured soya protein, and tofu.',
  },
  {
    id: 'sulphites',
    bit: ALLERGEN_SULPHITES,
    position: 13,
    label: 'Sulphur dioxide and sulphites',
    shortLabel: 'Sulphites',
    icon: '🍷',
    description: 'At concentrations of more than 10mg/kg or 10mg/litre. Found in dried fruit, meat products, soft drinks, vegetables, wine, and beer.',
  },
] as const

// ---------------------------------------------------------------------------
// Lookup maps for fast access by id or bit value
// ---------------------------------------------------------------------------

/** Map from allergen slug id to AllergenInfo */
export const ALLERGEN_BY_ID: ReadonlyMap<string, AllergenInfo> = new Map(
  ALLERGENS.map((a) => [a.id, a])
)

/** Map from bitmask value to AllergenInfo */
export const ALLERGEN_BY_BIT: ReadonlyMap<number, AllergenInfo> = new Map(
  ALLERGENS.map((a) => [a.bit, a])
)

// ---------------------------------------------------------------------------
// Bitmask utility functions
// ---------------------------------------------------------------------------

/**
 * Compute the combined allergen bitmask for a dish from its ingredient flags.
 * Uses bitwise OR to merge all ingredient allergens into a single value.
 */
export function computeDishAllergens(ingredientFlags: readonly number[]): number {
  let combined = 0
  for (const flags of ingredientFlags) {
    combined |= flags
  }
  return combined
}

/**
 * Check if a dish is safe for a customer.
 * Returns true if the dish contains NONE of the customer's allergens.
 *
 * @param dishAllergens - Combined allergen bitmask of the dish
 * @param customerAllergens - Customer's allergen bitmask (allergens they AVOID)
 */
export function isDishSafe(dishAllergens: number, customerAllergens: number): boolean {
  return (dishAllergens & customerAllergens) === 0
}

/**
 * Get the list of allergens present in a bitmask.
 * Useful for displaying which allergens a dish contains.
 */
export function getAllergensFromMask(mask: number): AllergenInfo[] {
  const result: AllergenInfo[] = []
  for (const allergen of ALLERGENS) {
    if ((mask & allergen.bit) !== 0) {
      result.push(allergen)
    }
  }
  return result
}

/**
 * Build a bitmask from an array of allergen slug ids.
 * Used when constructing a customer profile from UI selections.
 *
 * @param ids - Array of allergen slug ids (e.g., ['milk', 'peanuts', 'gluten'])
 * @returns Combined bitmask, or 0 if no valid ids provided
 */
export function buildMaskFromIds(ids: readonly string[]): number {
  let mask = 0
  for (const id of ids) {
    const allergen = ALLERGEN_BY_ID.get(id)
    if (allergen) {
      mask |= allergen.bit
    }
  }
  return mask
}

/**
 * Build a bitmask from an array of bit positions.
 * Used when reading from database integer columns.
 *
 * @param positions - Array of bit positions (0–13)
 */
export function buildMaskFromPositions(positions: readonly number[]): number {
  let mask = 0
  for (const pos of positions) {
    if (pos >= 0 && pos <= 13) {
      mask |= 1 << pos
    }
  }
  return mask
}

/**
 * Extract allergen slug ids from a bitmask.
 * Inverse of buildMaskFromIds.
 */
export function getIdsFromMask(mask: number): string[] {
  const ids: string[] = []
  for (const allergen of ALLERGENS) {
    if ((mask & allergen.bit) !== 0) {
      ids.push(allergen.id)
    }
  }
  return ids
}

/**
 * Validate that a bitmask contains only valid allergen bits (0–13).
 * Rejects any value with bits set above position 13.
 */
export function isValidAllergenMask(mask: number): boolean {
  if (!Number.isInteger(mask)) return false
  if (mask < 0) return false
  if (mask > ALLERGEN_ALL) return false
  return true
}

/**
 * Count the number of allergens set in a bitmask.
 */
export function countAllergens(mask: number): number {
  let count = 0
  let value = mask
  while (value > 0) {
    count += value & 1
    value >>= 1
  }
  return count
}

/**
 * Human-readable summary of allergens in a bitmask.
 * E.g., "Milk, Peanuts, Gluten" or "No allergens"
 */
export function formatAllergenList(mask: number): string {
  if (mask === 0) return 'No allergens'
  const allergens = getAllergensFromMask(mask)
  return allergens.map((a) => a.shortLabel).join(', ')
}
