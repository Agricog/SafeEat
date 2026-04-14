import { useState, useEffect, useCallback } from 'react'
import AllergenSelector from '../components/AllergenSelector'
import { getIdsFromMask, buildMaskFromIds } from '../lib/allergens'
import { detectAllergens } from '../lib/ingredientAllergens'

export interface DishFormData {
  name: string
  description: string
  pricePounds: string
  category: string
  allergenIds: string[]
  ingredients: string
}

interface DishFormProps {
  initial?: DishFormData
  onSubmit: (data: DishFormData) => void
  onCancel: () => void
  submitLabel?: string
}

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']

const EMPTY: DishFormData = {
  name: '',
  description: '',
  pricePounds: '',
  category: 'Mains',
  allergenIds: [],
  ingredients: '',
}

export default function DishForm({ initial, onSubmit, onCancel, submitLabel = 'Add dish' }: DishFormProps) {
  const [form, setForm] = useState<DishFormData>(initial ?? EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof DishFormData, string>>>({})
  const [detectedMatches, setDetectedMatches] = useState<
    { keyword: string; displayName: string; allergenIds: readonly string[] }[]
  >([])
  const [manualOverrides, setManualOverrides] = useState<Set<string>>(new Set())

  // Auto-detect allergens when ingredients change
  const runDetection = useCallback((ingredientsText: string, currentAllergenIds: string[]) => {
    const { allergenIds: detected, matches } = detectAllergens(ingredientsText)
    setDetectedMatches(matches)

    // Merge detected allergens with any manual overrides
    // Keep manually added allergens that aren't from detection
    const manuallyAdded = currentAllergenIds.filter((id) => manualOverrides.has(id))
    const merged = Array.from(new Set([...detected, ...manuallyAdded]))

    return merged
  }, [manualOverrides])

  // Run detection when ingredients text changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.ingredients.trim()) {
        const merged = runDetection(form.ingredients, form.allergenIds)
        setForm((prev) => ({ ...prev, allergenIds: merged }))
      }
    }, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.ingredients])

  const handleAllergenChange = (ids: string[]) => {
    // Track which allergens were manually toggled
    const { allergenIds: autoDetected } = detectAllergens(form.ingredients)
    const newManual = new Set(manualOverrides)

    for (const id of ids) {
      if (!autoDetected.includes(id)) {
        newManual.add(id)
      }
    }
    // Remove manual overrides for allergens that were unticked
    for (const id of manualOverrides) {
      if (!ids.includes(id)) {
        newManual.delete(id)
      }
    }

    setManualOverrides(newManual)
    setForm({ ...form, allergenIds: ids })
  }

  const validate = (): boolean => {
    const errs: typeof errors = {}
    if (!form.name.trim()) errs.name = 'Dish name is required'
    if (!form.pricePounds.trim()) {
      errs.pricePounds = 'Price is required'
    } else if (isNaN(parseFloat(form.pricePounds)) || parseFloat(form.pricePounds) <= 0) {
      errs.pricePounds = 'Enter a valid price'
    }
    if (!form.category) errs.category = 'Pick a category'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (validate()) onSubmit(form)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dish name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="e.g. Margherita Pizza"
          className={`w-full px-3 py-2 rounded-lg border text-sm ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent`}
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="e.g. Tomato, mozzarella, fresh basil"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
        />
      </div>

      {/* Price + Category row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (£)</label>
          <input
            type="text"
            inputMode="decimal"
            value={form.pricePounds}
            onChange={(e) => setForm({ ...form, pricePounds: e.target.value })}
            placeholder="10.95"
            className={`w-full px-3 py-2 rounded-lg border text-sm ${
              errors.pricePounds ? 'border-red-300 bg-red-50' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent`}
          />
          {errors.pricePounds && <p className="text-xs text-red-500 mt-1">{errors.pricePounds}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ingredients
          <span className="text-xs text-gray-400 font-normal ml-2">Allergens auto-detected as you type</span>
        </label>
        <textarea
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          placeholder="e.g. wheat flour, butter, eggs, mozzarella, tomato, basil, olive oil, salt"
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent resize-none"
        />

        {/* Auto-detection results */}
        {detectedMatches.length > 0 && (
          <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-2">
              Auto-detected allergens from ingredients
            </p>
            <div className="flex flex-wrap gap-1.5">
              {detectedMatches.map((match, i) => (
                <span
                  key={`${match.keyword}-${i}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs"
                >
                  <span className="font-medium">{match.displayName}</span>
                  <span className="text-amber-500">→</span>
                  <span>{match.allergenIds.join(', ')}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {form.ingredients.trim() && detectedMatches.length === 0 && (
          <p className="text-xs text-gray-400 mt-1">No allergens detected — check ingredients are separated by commas</p>
        )}
      </div>

      {/* Allergens */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Allergens in this dish
          <span className="text-xs text-gray-400 font-normal ml-2">Auto-ticked from ingredients — adjust if needed</span>
        </label>
        <AllergenSelector
          selected={form.allergenIds}
          onChange={handleAllergenChange}
          compact
        />
        {form.allergenIds.length === 0 && (
          <p className="text-xs text-gray-400 mt-2">No allergens selected — dish will show as safe for everyone</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={handleSubmit}
          className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
        >
          {submitLabel}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
