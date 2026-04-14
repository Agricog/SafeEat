/**
 * SafeEat — Ingredient-to-Allergen Auto-Detection
 *
 * Maps ~200 common restaurant ingredients to the 14 regulated UK allergens.
 * Used to auto-detect allergens when a chef types ingredients into the dish form.
 *
 * Each entry maps a lowercase ingredient keyword to an array of allergen IDs.
 * The matching is substring-based: if the ingredient input contains the keyword,
 * the associated allergens are flagged.
 *
 * Keywords are ordered longest-first within each allergen category to ensure
 * specific matches take priority over generic ones (e.g., "peanut oil" before "peanut").
 */

export interface IngredientMatch {
  /** The keyword to match against (lowercase) */
  readonly keyword: string
  /** Allergen IDs that this ingredient triggers */
  readonly allergenIds: readonly string[]
  /** Display name shown in the auto-detection UI */
  readonly displayName: string
}

export const INGREDIENT_ALLERGEN_MAP: readonly IngredientMatch[] = [
  // -------------------------------------------------------------------------
  // CELERY
  // -------------------------------------------------------------------------
  { keyword: 'celeriac', allergenIds: ['celery'], displayName: 'Celeriac' },
  { keyword: 'celery salt', allergenIds: ['celery'], displayName: 'Celery salt' },
  { keyword: 'celery seed', allergenIds: ['celery'], displayName: 'Celery seeds' },
  { keyword: 'celery', allergenIds: ['celery'], displayName: 'Celery' },

  // -------------------------------------------------------------------------
  // CEREALS CONTAINING GLUTEN
  // -------------------------------------------------------------------------
  { keyword: 'wheat flour', allergenIds: ['gluten'], displayName: 'Wheat flour' },
  { keyword: 'plain flour', allergenIds: ['gluten'], displayName: 'Plain flour (wheat)' },
  { keyword: 'self-raising flour', allergenIds: ['gluten'], displayName: 'Self-raising flour (wheat)' },
  { keyword: 'self raising flour', allergenIds: ['gluten'], displayName: 'Self-raising flour (wheat)' },
  { keyword: 'strong flour', allergenIds: ['gluten'], displayName: 'Strong flour (wheat)' },
  { keyword: 'bread flour', allergenIds: ['gluten'], displayName: 'Bread flour (wheat)' },
  { keyword: 'pasta', allergenIds: ['gluten', 'eggs'], displayName: 'Pasta (wheat, often egg)' },
  { keyword: 'noodles', allergenIds: ['gluten'], displayName: 'Noodles (wheat)' },
  { keyword: 'egg noodle', allergenIds: ['gluten', 'eggs'], displayName: 'Egg noodles' },
  { keyword: 'breadcrumb', allergenIds: ['gluten'], displayName: 'Breadcrumbs (wheat)' },
  { keyword: 'panko', allergenIds: ['gluten'], displayName: 'Panko (wheat)' },
  { keyword: 'batter', allergenIds: ['gluten'], displayName: 'Batter (wheat)' },
  { keyword: 'tortilla', allergenIds: ['gluten'], displayName: 'Tortilla (wheat)' },
  { keyword: 'wrap', allergenIds: ['gluten'], displayName: 'Wrap (wheat)' },
  { keyword: 'pitta', allergenIds: ['gluten'], displayName: 'Pitta bread (wheat)' },
  { keyword: 'pita', allergenIds: ['gluten'], displayName: 'Pita bread (wheat)' },
  { keyword: 'naan', allergenIds: ['gluten', 'milk', 'eggs'], displayName: 'Naan bread' },
  { keyword: 'ciabatta', allergenIds: ['gluten'], displayName: 'Ciabatta (wheat)' },
  { keyword: 'focaccia', allergenIds: ['gluten'], displayName: 'Focaccia (wheat)' },
  { keyword: 'sourdough', allergenIds: ['gluten'], displayName: 'Sourdough (wheat)' },
  { keyword: 'brioche', allergenIds: ['gluten', 'milk', 'eggs'], displayName: 'Brioche' },
  { keyword: 'croissant', allergenIds: ['gluten', 'milk', 'eggs'], displayName: 'Croissant' },
  { keyword: 'bread', allergenIds: ['gluten'], displayName: 'Bread (wheat)' },
  { keyword: 'flour', allergenIds: ['gluten'], displayName: 'Flour (wheat)' },
  { keyword: 'couscous', allergenIds: ['gluten'], displayName: 'Couscous (wheat)' },
  { keyword: 'bulgur', allergenIds: ['gluten'], displayName: 'Bulgur wheat' },
  { keyword: 'semolina', allergenIds: ['gluten'], displayName: 'Semolina (wheat)' },
  { keyword: 'rye', allergenIds: ['gluten'], displayName: 'Rye' },
  { keyword: 'barley', allergenIds: ['gluten'], displayName: 'Barley' },
  { keyword: 'spelt', allergenIds: ['gluten'], displayName: 'Spelt' },
  { keyword: 'oat', allergenIds: ['gluten'], displayName: 'Oats (gluten)' },
  { keyword: 'porridge', allergenIds: ['gluten', 'milk'], displayName: 'Porridge' },
  { keyword: 'beer', allergenIds: ['gluten', 'sulphites'], displayName: 'Beer (barley)' },
  { keyword: 'lager', allergenIds: ['gluten', 'sulphites'], displayName: 'Lager (barley)' },
  { keyword: 'ale', allergenIds: ['gluten'], displayName: 'Ale (barley)' },
  { keyword: 'stout', allergenIds: ['gluten'], displayName: 'Stout (barley)' },
  { keyword: 'soy sauce', allergenIds: ['gluten', 'soybeans'], displayName: 'Soy sauce (wheat + soy)' },
  { keyword: 'teriyaki', allergenIds: ['gluten', 'soybeans'], displayName: 'Teriyaki sauce (wheat + soy)' },
  { keyword: 'hoisin', allergenIds: ['gluten', 'soybeans'], displayName: 'Hoisin sauce (wheat + soy)' },
  { keyword: 'yorkshire pudding', allergenIds: ['gluten', 'eggs', 'milk'], displayName: 'Yorkshire pudding' },
  { keyword: 'stuffing', allergenIds: ['gluten', 'celery'], displayName: 'Stuffing' },
  { keyword: 'gravy', allergenIds: ['gluten', 'celery'], displayName: 'Gravy (often wheat + celery)' },
  { keyword: 'stock cube', allergenIds: ['gluten', 'celery'], displayName: 'Stock cube' },
  { keyword: 'bouillon', allergenIds: ['gluten', 'celery'], displayName: 'Bouillon' },

  // -------------------------------------------------------------------------
  // CRUSTACEANS
  // -------------------------------------------------------------------------
  { keyword: 'prawn', allergenIds: ['crustaceans'], displayName: 'Prawns' },
  { keyword: 'shrimp', allergenIds: ['crustaceans'], displayName: 'Shrimp' },
  { keyword: 'crab', allergenIds: ['crustaceans'], displayName: 'Crab' },
  { keyword: 'lobster', allergenIds: ['crustaceans'], displayName: 'Lobster' },
  { keyword: 'crayfish', allergenIds: ['crustaceans'], displayName: 'Crayfish' },
  { keyword: 'scampi', allergenIds: ['crustaceans', 'gluten'], displayName: 'Scampi (crustacean + batter)' },
  { keyword: 'langoustine', allergenIds: ['crustaceans'], displayName: 'Langoustine' },
  { keyword: 'shrimp paste', allergenIds: ['crustaceans'], displayName: 'Shrimp paste' },

  // -------------------------------------------------------------------------
  // EGGS
  // -------------------------------------------------------------------------
  { keyword: 'mayonnaise', allergenIds: ['eggs', 'mustard'], displayName: 'Mayonnaise (egg + mustard)' },
  { keyword: 'mayo', allergenIds: ['eggs', 'mustard'], displayName: 'Mayo (egg + mustard)' },
  { keyword: 'aioli', allergenIds: ['eggs'], displayName: 'Aioli (egg)' },
  { keyword: 'hollandaise', allergenIds: ['eggs', 'milk'], displayName: 'Hollandaise (egg + milk)' },
  { keyword: 'bearnaise', allergenIds: ['eggs', 'milk'], displayName: 'Béarnaise (egg + milk)' },
  { keyword: 'meringue', allergenIds: ['eggs'], displayName: 'Meringue (egg)' },
  { keyword: 'custard', allergenIds: ['eggs', 'milk'], displayName: 'Custard (egg + milk)' },
  { keyword: 'quiche', allergenIds: ['eggs', 'gluten', 'milk'], displayName: 'Quiche' },
  { keyword: 'egg wash', allergenIds: ['eggs'], displayName: 'Egg wash' },
  { keyword: 'egg', allergenIds: ['eggs'], displayName: 'Egg' },
  { keyword: 'omelette', allergenIds: ['eggs', 'milk'], displayName: 'Omelette' },
  { keyword: 'scrambled', allergenIds: ['eggs', 'milk'], displayName: 'Scrambled eggs' },
  { keyword: 'pancake', allergenIds: ['eggs', 'gluten', 'milk'], displayName: 'Pancake' },
  { keyword: 'waffle', allergenIds: ['eggs', 'gluten', 'milk'], displayName: 'Waffle' },

  // -------------------------------------------------------------------------
  // FISH
  // -------------------------------------------------------------------------
  { keyword: 'worcestershire', allergenIds: ['fish'], displayName: 'Worcestershire sauce (anchovies)' },
  { keyword: 'anchovy', allergenIds: ['fish'], displayName: 'Anchovy' },
  { keyword: 'anchovies', allergenIds: ['fish'], displayName: 'Anchovies' },
  { keyword: 'caesar dressing', allergenIds: ['fish', 'eggs', 'milk'], displayName: 'Caesar dressing' },
  { keyword: 'caesar salad', allergenIds: ['fish', 'eggs', 'milk'], displayName: 'Caesar salad' },
  { keyword: 'fish sauce', allergenIds: ['fish'], displayName: 'Fish sauce' },
  { keyword: 'fish', allergenIds: ['fish'], displayName: 'Fish' },
  { keyword: 'salmon', allergenIds: ['fish'], displayName: 'Salmon' },
  { keyword: 'cod', allergenIds: ['fish'], displayName: 'Cod' },
  { keyword: 'haddock', allergenIds: ['fish'], displayName: 'Haddock' },
  { keyword: 'tuna', allergenIds: ['fish'], displayName: 'Tuna' },
  { keyword: 'mackerel', allergenIds: ['fish'], displayName: 'Mackerel' },
  { keyword: 'sardine', allergenIds: ['fish'], displayName: 'Sardines' },
  { keyword: 'trout', allergenIds: ['fish'], displayName: 'Trout' },
  { keyword: 'sea bass', allergenIds: ['fish'], displayName: 'Sea bass' },
  { keyword: 'plaice', allergenIds: ['fish'], displayName: 'Plaice' },
  { keyword: 'pollock', allergenIds: ['fish'], displayName: 'Pollock' },

  // -------------------------------------------------------------------------
  // LUPIN
  // -------------------------------------------------------------------------
  { keyword: 'lupin flour', allergenIds: ['lupin'], displayName: 'Lupin flour' },
  { keyword: 'lupin seed', allergenIds: ['lupin'], displayName: 'Lupin seeds' },
  { keyword: 'lupin', allergenIds: ['lupin'], displayName: 'Lupin' },

  // -------------------------------------------------------------------------
  // MILK
  // -------------------------------------------------------------------------
  { keyword: 'double cream', allergenIds: ['milk'], displayName: 'Double cream' },
  { keyword: 'single cream', allergenIds: ['milk'], displayName: 'Single cream' },
  { keyword: 'clotted cream', allergenIds: ['milk'], displayName: 'Clotted cream' },
  { keyword: 'sour cream', allergenIds: ['milk'], displayName: 'Sour cream' },
  { keyword: 'cream cheese', allergenIds: ['milk'], displayName: 'Cream cheese' },
  { keyword: 'cream', allergenIds: ['milk'], displayName: 'Cream' },
  { keyword: 'cheddar', allergenIds: ['milk'], displayName: 'Cheddar cheese' },
  { keyword: 'mozzarella', allergenIds: ['milk'], displayName: 'Mozzarella' },
  { keyword: 'parmesan', allergenIds: ['milk'], displayName: 'Parmesan' },
  { keyword: 'stilton', allergenIds: ['milk'], displayName: 'Stilton' },
  { keyword: 'brie', allergenIds: ['milk'], displayName: 'Brie' },
  { keyword: 'camembert', allergenIds: ['milk'], displayName: 'Camembert' },
  { keyword: 'gouda', allergenIds: ['milk'], displayName: 'Gouda' },
  { keyword: 'gruyere', allergenIds: ['milk'], displayName: 'Gruyère' },
  { keyword: 'feta', allergenIds: ['milk'], displayName: 'Feta' },
  { keyword: 'halloumi', allergenIds: ['milk'], displayName: 'Halloumi' },
  { keyword: 'ricotta', allergenIds: ['milk'], displayName: 'Ricotta' },
  { keyword: 'mascarpone', allergenIds: ['milk'], displayName: 'Mascarpone' },
  { keyword: 'paneer', allergenIds: ['milk'], displayName: 'Paneer' },
  { keyword: 'cheese', allergenIds: ['milk'], displayName: 'Cheese' },
  { keyword: 'butter', allergenIds: ['milk'], displayName: 'Butter' },
  { keyword: 'buttermilk', allergenIds: ['milk'], displayName: 'Buttermilk' },
  { keyword: 'ghee', allergenIds: ['milk'], displayName: 'Ghee' },
  { keyword: 'yoghurt', allergenIds: ['milk'], displayName: 'Yoghurt' },
  { keyword: 'yogurt', allergenIds: ['milk'], displayName: 'Yogurt' },
  { keyword: 'milk powder', allergenIds: ['milk'], displayName: 'Milk powder' },
  { keyword: 'skimmed milk', allergenIds: ['milk'], displayName: 'Skimmed milk' },
  { keyword: 'whole milk', allergenIds: ['milk'], displayName: 'Whole milk' },
  { keyword: 'milk', allergenIds: ['milk'], displayName: 'Milk' },
  { keyword: 'whey', allergenIds: ['milk'], displayName: 'Whey' },
  { keyword: 'casein', allergenIds: ['milk'], displayName: 'Casein' },
  { keyword: 'lactose', allergenIds: ['milk'], displayName: 'Lactose' },
  { keyword: 'bechamel', allergenIds: ['milk', 'gluten'], displayName: 'Béchamel sauce' },
  { keyword: 'white sauce', allergenIds: ['milk', 'gluten'], displayName: 'White sauce' },
  { keyword: 'lasagne', allergenIds: ['milk', 'gluten', 'eggs'], displayName: 'Lasagne' },
  { keyword: 'ice cream', allergenIds: ['milk', 'eggs'], displayName: 'Ice cream' },
  { keyword: 'chocolate', allergenIds: ['milk'], displayName: 'Chocolate (often milk)' },

  // -------------------------------------------------------------------------
  // MOLLUSCS
  // -------------------------------------------------------------------------
  { keyword: 'oyster sauce', allergenIds: ['molluscs'], displayName: 'Oyster sauce' },
  { keyword: 'oyster', allergenIds: ['molluscs'], displayName: 'Oysters' },
  { keyword: 'mussel', allergenIds: ['molluscs'], displayName: 'Mussels' },
  { keyword: 'clam', allergenIds: ['molluscs'], displayName: 'Clams' },
  { keyword: 'scallop', allergenIds: ['molluscs'], displayName: 'Scallops' },
  { keyword: 'squid', allergenIds: ['molluscs'], displayName: 'Squid' },
  { keyword: 'calamari', allergenIds: ['molluscs', 'gluten'], displayName: 'Calamari (mollusc + batter)' },
  { keyword: 'octopus', allergenIds: ['molluscs'], displayName: 'Octopus' },
  { keyword: 'snail', allergenIds: ['molluscs'], displayName: 'Snails' },
  { keyword: 'escargot', allergenIds: ['molluscs'], displayName: 'Escargot' },
  { keyword: 'whelk', allergenIds: ['molluscs'], displayName: 'Whelks' },

  // -------------------------------------------------------------------------
  // MUSTARD
  // -------------------------------------------------------------------------
  { keyword: 'mustard powder', allergenIds: ['mustard'], displayName: 'Mustard powder' },
  { keyword: 'mustard seed', allergenIds: ['mustard'], displayName: 'Mustard seeds' },
  { keyword: 'english mustard', allergenIds: ['mustard'], displayName: 'English mustard' },
  { keyword: 'dijon', allergenIds: ['mustard'], displayName: 'Dijon mustard' },
  { keyword: 'wholegrain mustard', allergenIds: ['mustard'], displayName: 'Wholegrain mustard' },
  { keyword: 'mustard', allergenIds: ['mustard'], displayName: 'Mustard' },

  // -------------------------------------------------------------------------
  // TREE NUTS
  // -------------------------------------------------------------------------
  { keyword: 'almond flour', allergenIds: ['tree_nuts'], displayName: 'Almond flour' },
  { keyword: 'almond milk', allergenIds: ['tree_nuts'], displayName: 'Almond milk' },
  { keyword: 'almond', allergenIds: ['tree_nuts'], displayName: 'Almonds' },
  { keyword: 'hazelnut', allergenIds: ['tree_nuts'], displayName: 'Hazelnuts' },
  { keyword: 'walnut', allergenIds: ['tree_nuts'], displayName: 'Walnuts' },
  { keyword: 'cashew', allergenIds: ['tree_nuts'], displayName: 'Cashews' },
  { keyword: 'pecan', allergenIds: ['tree_nuts'], displayName: 'Pecans' },
  { keyword: 'pistachio', allergenIds: ['tree_nuts'], displayName: 'Pistachios' },
  { keyword: 'macadamia', allergenIds: ['tree_nuts'], displayName: 'Macadamia nuts' },
  { keyword: 'brazil nut', allergenIds: ['tree_nuts'], displayName: 'Brazil nuts' },
  { keyword: 'pine nut', allergenIds: ['tree_nuts'], displayName: 'Pine nuts' },
  { keyword: 'marzipan', allergenIds: ['tree_nuts', 'eggs'], displayName: 'Marzipan (almond + egg)' },
  { keyword: 'praline', allergenIds: ['tree_nuts'], displayName: 'Praline (nuts)' },
  { keyword: 'nougat', allergenIds: ['tree_nuts', 'eggs'], displayName: 'Nougat (nuts + egg)' },
  { keyword: 'frangipane', allergenIds: ['tree_nuts', 'eggs', 'milk'], displayName: 'Frangipane' },
  { keyword: 'pesto', allergenIds: ['tree_nuts', 'milk'], displayName: 'Pesto (nuts + parmesan)' },
  { keyword: 'baklava', allergenIds: ['tree_nuts', 'gluten'], displayName: 'Baklava' },
  { keyword: 'nutella', allergenIds: ['tree_nuts', 'milk'], displayName: 'Nutella' },
  { keyword: 'amaretti', allergenIds: ['tree_nuts', 'eggs'], displayName: 'Amaretti (almond)' },
  { keyword: 'dukkah', allergenIds: ['tree_nuts', 'sesame'], displayName: 'Dukkah (nuts + sesame)' },

  // -------------------------------------------------------------------------
  // PEANUTS
  // -------------------------------------------------------------------------
  { keyword: 'peanut butter', allergenIds: ['peanuts'], displayName: 'Peanut butter' },
  { keyword: 'peanut oil', allergenIds: ['peanuts'], displayName: 'Peanut oil (unrefined)' },
  { keyword: 'groundnut oil', allergenIds: ['peanuts'], displayName: 'Groundnut oil' },
  { keyword: 'groundnut', allergenIds: ['peanuts'], displayName: 'Groundnuts (peanuts)' },
  { keyword: 'peanut', allergenIds: ['peanuts'], displayName: 'Peanuts' },
  { keyword: 'satay', allergenIds: ['peanuts'], displayName: 'Satay sauce (peanut)' },
  { keyword: 'pad thai', allergenIds: ['peanuts', 'fish', 'eggs'], displayName: 'Pad Thai' },

  // -------------------------------------------------------------------------
  // SESAME
  // -------------------------------------------------------------------------
  { keyword: 'sesame oil', allergenIds: ['sesame'], displayName: 'Sesame oil' },
  { keyword: 'sesame seed', allergenIds: ['sesame'], displayName: 'Sesame seeds' },
  { keyword: 'sesame', allergenIds: ['sesame'], displayName: 'Sesame' },
  { keyword: 'tahini', allergenIds: ['sesame'], displayName: 'Tahini (sesame)' },
  { keyword: 'hummus', allergenIds: ['sesame'], displayName: 'Hummus (contains tahini)' },
  { keyword: 'houmous', allergenIds: ['sesame'], displayName: 'Houmous (contains tahini)' },
  { keyword: 'halva', allergenIds: ['sesame', 'tree_nuts'], displayName: 'Halva' },

  // -------------------------------------------------------------------------
  // SOYBEANS
  // -------------------------------------------------------------------------
  { keyword: 'soy milk', allergenIds: ['soybeans'], displayName: 'Soy milk' },
  { keyword: 'soya milk', allergenIds: ['soybeans'], displayName: 'Soya milk' },
  { keyword: 'soya', allergenIds: ['soybeans'], displayName: 'Soya' },
  { keyword: 'soy', allergenIds: ['soybeans'], displayName: 'Soy' },
  { keyword: 'tofu', allergenIds: ['soybeans'], displayName: 'Tofu (soy)' },
  { keyword: 'tempeh', allergenIds: ['soybeans'], displayName: 'Tempeh (soy)' },
  { keyword: 'edamame', allergenIds: ['soybeans'], displayName: 'Edamame (soy)' },
  { keyword: 'miso', allergenIds: ['soybeans', 'gluten'], displayName: 'Miso (soy + often wheat)' },
  { keyword: 'bean curd', allergenIds: ['soybeans'], displayName: 'Bean curd (soy)' },

  // -------------------------------------------------------------------------
  // SULPHITES
  // -------------------------------------------------------------------------
  { keyword: 'white wine', allergenIds: ['sulphites'], displayName: 'White wine (sulphites)' },
  { keyword: 'red wine', allergenIds: ['sulphites'], displayName: 'Red wine (sulphites)' },
  { keyword: 'wine', allergenIds: ['sulphites'], displayName: 'Wine (sulphites)' },
  { keyword: 'cider', allergenIds: ['sulphites'], displayName: 'Cider (sulphites)' },
  { keyword: 'vinegar', allergenIds: ['sulphites'], displayName: 'Vinegar (sulphites)' },
  { keyword: 'balsamic', allergenIds: ['sulphites'], displayName: 'Balsamic (sulphites)' },
  { keyword: 'dried apricot', allergenIds: ['sulphites'], displayName: 'Dried apricots (sulphites)' },
  { keyword: 'dried fruit', allergenIds: ['sulphites'], displayName: 'Dried fruit (sulphites)' },
  { keyword: 'raisin', allergenIds: ['sulphites'], displayName: 'Raisins (sulphites)' },
  { keyword: 'sultana', allergenIds: ['sulphites'], displayName: 'Sultanas (sulphites)' },
  { keyword: 'pickle', allergenIds: ['sulphites'], displayName: 'Pickles (sulphites)' },

  // -------------------------------------------------------------------------
  // MULTI-ALLERGEN COMPOSITE ITEMS
  // -------------------------------------------------------------------------
  { keyword: 'korma', allergenIds: ['tree_nuts', 'milk'], displayName: 'Korma (nuts + cream)' },
  { keyword: 'biryani', allergenIds: ['tree_nuts', 'milk'], displayName: 'Biryani (often nuts + dairy)' },
  { keyword: 'carbonara', allergenIds: ['eggs', 'milk', 'gluten'], displayName: 'Carbonara' },
  { keyword: 'tiramisu', allergenIds: ['eggs', 'milk', 'gluten'], displayName: 'Tiramisu' },
  { keyword: 'cheesecake', allergenIds: ['milk', 'gluten', 'eggs'], displayName: 'Cheesecake' },
  { keyword: 'brownie', allergenIds: ['eggs', 'milk', 'gluten'], displayName: 'Brownie' },
  { keyword: 'scone', allergenIds: ['gluten', 'milk', 'eggs'], displayName: 'Scone' },
  { keyword: 'crumble', allergenIds: ['gluten', 'milk'], displayName: 'Crumble' },
  { keyword: 'trifle', allergenIds: ['gluten', 'milk', 'eggs', 'sulphites'], displayName: 'Trifle' },
  { keyword: 'curry paste', allergenIds: ['crustaceans', 'fish'], displayName: 'Curry paste (often shrimp/fish)' },
]

/**
 * Detect allergens from a comma-separated ingredients string.
 * Returns an array of unique allergen IDs and the matched ingredients.
 *
 * @param ingredientsText - Raw text input, e.g. "butter, wheat flour, eggs, soy sauce"
 * @returns Object with detected allergen IDs and matched ingredient details
 */
export function detectAllergens(ingredientsText: string): {
  allergenIds: string[]
  matches: { keyword: string; displayName: string; allergenIds: readonly string[] }[]
} {
  if (!ingredientsText.trim()) {
    return { allergenIds: [], matches: [] }
  }

  const input = ingredientsText.toLowerCase()
  const allergenSet = new Set<string>()
  const matches: { keyword: string; displayName: string; allergenIds: readonly string[] }[] = []
  const matchedKeywords = new Set<string>()

  for (const entry of INGREDIENT_ALLERGEN_MAP) {
    if (input.includes(entry.keyword) && !matchedKeywords.has(entry.keyword)) {
      matchedKeywords.add(entry.keyword)
      matches.push({
        keyword: entry.keyword,
        displayName: entry.displayName,
        allergenIds: entry.allergenIds,
      })
      for (const id of entry.allergenIds) {
        allergenSet.add(id)
      }
    }
  }

  return {
    allergenIds: Array.from(allergenSet),
    matches,
  }
}
