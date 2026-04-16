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
  mayContainIds: string[]
  ingredients: string
  isVegan: boolean
  isVegetarian: boolean
  isGlutenFree: boolean
  isDairyFree: boolean
  isHalal: boolean
  isKosher: boolean
  calories: string
  proteinG: string
  carbsG: string
  fatG: string
  fibreG: string
  sugarG: string
  saltG: string
}

interface DishFormProps {
  initial?: DishFormData
  onSubmit: (data: DishFormData) => void
  onCancel: () => void
  submitLabel?: string
}

const CATEGORIES = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']

const DIETARY_OPTIONS = [
  { key: 'isVegan', label: 'Vegan', icon: '🌱' },
  { key: 'isVegetarian', label: 'Vegetarian', icon: '🥕' },
  { key: 'isGlutenFree', label: 'Gluten-free', icon: '🌾' },
  { key: 'isDairyFree', label: 'Dairy-free', icon: '🥛' },
  { key: 'isHalal', label: 'Halal', icon: '☪️' },
  { key: 'isKosher', label: 'Kosher', icon: '✡️' },
] as const

const EMPTY: DishFormData = {
  name: '',
  description: '',
  pricePounds: '',
  category: 'Mains',
  allergenIds: [],
  mayContainIds: [],
  ingredients: '',
  isVegan: false,
  isVegetarian: false,
  isGlutenFree: false,
  isDairyFree: false,
  isHalal: false,
  isKosher: false,
  calories: '',
  proteinG: '',
  carbsG: '',
  fatG: '',
  fibreG: '',
  sugarG: '',
  saltG: '',
}

export default function DishForm({ initial, onSubmit, onCancel, submitLabel = 'Add dish' }: DishFormProps) {
  const [form, setForm] = useState<DishFormData>(initial ?? EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof DishFormData, string>>>({})
  const [detectedMatches, setDetectedMatches] = useState<
    { keyword: string; displayName: string; allergenIds: readonly string[] }[]
  >([])
  const [manualOverrides, setManualOverrides] = useState<Set<string>>(new Set())
  const [showNutrition, setShowNutrition] = useState(
    !!(initial?.calories || initial?.proteinG || initial?.carbsG || initial?.fatG)
  )

  const runDetection = useCallback((ingredientsText: string, currentAllergenIds: string[]) => {
    const { allergenIds: detected, matches } = detectAllergens(ingredientsText)
    setDetectedMatches(matches)
    const manuallyAdded = currentAllergenIds.filter((id) => manualOverrides.has(id))
    const merged = Array.from(new Set([...detected, ...manuallyAdded]))
    return merged
  }, [manualOverrides])

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
    const { allergenIds: autoDetected } = detectAllergens(form.ingredients)
    const newManual = new Set(manualOverrides)
    for (const id of ids) {
      if (!autoDetected.includes(id)) newManual.add(id)
    }
    for (const id of manualOverrides) {
      if (!ids.includes(id)) newManual.delete(id)
    }
    setManualOverrides(newManual)
    setForm({ ...form, allergenIds: ids })
  }

  const handleDietaryToggle = (key: string) => {
    setForm({ ...form, [key]: !form[key as keyof DishFormData] })
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

      {/* Price + Category */}
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
        {detectedMatches.length > 0 && (
          <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-amber-800 mb-2">Auto-detected allergens from ingredients</p>
            <div className="flex flex-wrap gap-1.5">
              {detectedMatches.map((match, i) => (
                <span key={`${match.keyword}-${i}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs">
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
        <AllergenSelector selected={form.allergenIds} onChange={handleAllergenChange} compact />
        {form.allergenIds.length === 0 && (
          <p className="text-xs text-gray-400 mt-2">No allergens selected — dish will show as safe for everyone</p>
        )}
      </div>
      {/* May contain (cross-contamination) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          May contain (cross-contamination risk)
          <span className="text-xs text-gray-400 font-normal ml-2">Tick allergens that could be present from shared equipment</span>
        </label>
        <AllergenSelector
          selected={form.mayContainIds}
          onChange={(ids) => setForm({ ...form, mayContainIds: ids })}
          compact
        />
        <p className="text-xs text-gray-400 mt-2">
          e.g. shared fryer with fish, prep surface used for nuts. Don't tick allergens already in the dish above.
        </p>
      </div>
      {/* Dietary Preferences */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dietary preferences</label>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((opt) => {
            const active = form[opt.key as keyof DishFormData] as boolean
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleDietaryToggle(opt.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  active
                    ? 'bg-se-green-50 border-se-green-300 text-se-green-800'
                    : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                <span>{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Nutrition (collapsible) */}
      <div>
        <button
          type="button"
          onClick={() => setShowNutrition(!showNutrition)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
        >
          <span className={`text-xs transition-transform ${showNutrition ? 'rotate-90' : ''}`}>▶</span>
          Nutrition information
          <span className="text-xs text-gray-400 font-normal">(optional)</span>
        </button>

        {showNutrition && (
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Calories (kcal)</label>
              <input type="text" inputMode="numeric" value={form.calories} onChange={(e) => setForm({ ...form, calories: e.target.value })} placeholder="450"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Protein (g)</label>
              <input type="text" inputMode="decimal" value={form.proteinG} onChange={(e) => setForm({ ...form, proteinG: e.target.value })} placeholder="25.0"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Carbs (g)</label>
              <input type="text" inputMode="decimal" value={form.carbsG} onChange={(e) => setForm({ ...form, carbsG: e.target.value })} placeholder="55.0"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Fat (g)</label>
              <input type="text" inputMode="decimal" value={form.fatG} onChange={(e) => setForm({ ...form, fatG: e.target.value })} placeholder="18.0"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Fibre (g)</label>
              <input type="text" inputMode="decimal" value={form.fibreG} onChange={(e) => setForm({ ...form, fibreG: e.target.value })} placeholder="3.5"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Sugar (g)</label>
              <input type="text" inputMode="decimal" value={form.sugarG} onChange={(e) => setForm({ ...form, sugarG: e.target.value })} placeholder="8.0"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Salt (g)</label>
              <input type="text" inputMode="decimal" value={form.saltG} onChange={(e) => setForm({ ...form, saltG: e.target.value })} placeholder="1.20"
                className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button onClick={handleSubmit} className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors">
          {submitLabel}
        </button>
        <button onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}
