import { useState, useEffect } from 'react'
import AllergenBadge from '../components/AllergenBadge'
import DishForm, { type DishFormData } from '../components/DishForm'
import { buildMaskFromIds, getIdsFromMask } from '../lib/allergens'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface Dish {
  id: string
  name: string
  description: string
  pricePence: number
  allergenMask: number
  ingredients: string
  category: string
  active: boolean
  photoUrl: string
  isVegan: boolean
  isVegetarian: boolean
  isGlutenFree: boolean
  isDairyFree: boolean
  isHalal: boolean
  isKosher: boolean
  calories: number | null
  proteinG: number | null
  carbsG: number | null
  fatG: number | null
  fibreG: number | null
  sugarG: number | null
  saltG: number | null
}

function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`
}

function dishToFormData(dish: Dish): DishFormData {
  return {
    name: dish.name,
    description: dish.description,
    pricePounds: (dish.pricePence / 100).toFixed(2),
    category: dish.category,
    allergenIds: getIdsFromMask(dish.allergenMask),
    ingredients: dish.ingredients || '',
    isVegan: dish.isVegan,
    isVegetarian: dish.isVegetarian,
    isGlutenFree: dish.isGlutenFree,
    isDairyFree: dish.isDairyFree,
    isHalal: dish.isHalal,
    isKosher: dish.isKosher,
    calories: dish.calories != null ? String(dish.calories) : '',
    proteinG: dish.proteinG != null ? String(dish.proteinG) : '',
    carbsG: dish.carbsG != null ? String(dish.carbsG) : '',
    fatG: dish.fatG != null ? String(dish.fatG) : '',
    fibreG: dish.fibreG != null ? String(dish.fibreG) : '',
    sugarG: dish.sugarG != null ? String(dish.sugarG) : '',
    saltG: dish.saltG != null ? String(dish.saltG) : '',
  }
}

function mapDishFromApi(d: any): Dish {
  return {
    id: d.id,
    name: d.name,
    description: d.description,
    pricePence: d.price_pence,
    allergenMask: d.allergen_mask,
    ingredients: d.ingredients || '',
    category: d.category,
    active: d.active,
    photoUrl: d.photo_url || '',
    isVegan: d.is_vegan || false,
    isVegetarian: d.is_vegetarian || false,
    isGlutenFree: d.is_gluten_free || false,
    isDairyFree: d.is_dairy_free || false,
    isHalal: d.is_halal || false,
    isKosher: d.is_kosher || false,
    calories: d.calories ?? null,
    proteinG: d.protein_g ?? null,
    carbsG: d.carbs_g ?? null,
    fatG: d.fat_g ?? null,
    fibreG: d.fibre_g ?? null,
    sugarG: d.sugar_g ?? null,
    saltG: d.salt_g ?? null,
  }
}

function buildDishBody(data: DishFormData) {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    pricePence: Math.round(parseFloat(data.pricePounds) * 100),
    category: data.category,
    allergenMask: buildMaskFromIds(data.allergenIds),
    ingredients: data.ingredients.trim(),
    isVegan: data.isVegan,
    isVegetarian: data.isVegetarian,
    isGlutenFree: data.isGlutenFree,
    isDairyFree: data.isDairyFree,
    isHalal: data.isHalal,
    isKosher: data.isKosher,
    calories: data.calories.trim() || null,
    proteinG: data.proteinG.trim() || null,
    carbsG: data.carbsG.trim() || null,
    fatG: data.fatG.trim() || null,
    fibreG: data.fibreG.trim() || null,
    sugarG: data.sugarG.trim() || null,
    saltG: data.saltG.trim() || null,
  }
}

const DIETARY_BADGES = [
  { key: 'isVegan', label: 'Vegan', icon: '🌱' },
  { key: 'isVegetarian', label: 'Vegetarian', icon: '🥕' },
  { key: 'isGlutenFree', label: 'GF', icon: '🌾' },
  { key: 'isDairyFree', label: 'DF', icon: '🥛' },
  { key: 'isHalal', label: 'Halal' },
  { key: 'isKosher', label: 'Kosher' },
] as const

export default function DashboardMenu() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    request<{ dishes: any[] }>(`/api/dashboard/${venueId}/dishes`)
      .then((data) => {
        if (cancelled) return
        setDishes(data.dishes.map(mapDishFromApi))
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleAdd = async (data: DishFormData) => {
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ dish: any }>(
        `/api/dashboard/${venueId}/dishes`,
        { method: 'POST', body: buildDishBody(data) }
      )
      setDishes([...dishes, { ...mapDishFromApi(res.dish), active: true }])
      setShowAddForm(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = async (data: DishFormData) => {
    if (!editingId) return
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ dish: any }>(
        `/api/dashboard/${venueId}/dishes/${editingId}`,
        { method: 'PUT', body: buildDishBody(data) }
      )
      setDishes(dishes.map((d) => d.id === editingId ? mapDishFromApi(res.dish) : d))
      setEditingId(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handlePhotoUpload = async (dish: Dish, file: File) => {
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5MB'); return }
    if (!file.type.startsWith('image/')) { setError('Only image files allowed'); return }
    setError(null)
    try {
      const token = await (window as any).Clerk?.session?.getToken()
      const res = await fetch(`/api/dashboard/${venueId}/dishes/${dish.id}/photo`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': file.type },
        body: file,
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Upload failed') }
      const data = await res.json()
      setDishes(dishes.map((d) => d.id === dish.id ? { ...d, photoUrl: data.photoUrl } : d))
    } catch (err: any) { setError(err.message || 'Photo upload failed') }
  }

  const handlePhotoDelete = async (dish: Dish) => {
    setError(null)
    try {
      const token = await (window as any).Clerk?.session?.getToken()
      const res = await fetch(`/api/dashboard/${venueId}/dishes/${dish.id}/photo`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Delete failed') }
      setDishes(dishes.map((d) => d.id === dish.id ? { ...d, photoUrl: '' } : d))
    } catch (err: any) { setError(err.message || 'Photo delete failed') }
  }

  const handleToggleActive = async (dish: Dish) => {
    setError(null)
    try {
      const res = await request<{ dish: any }>(
        `/api/dashboard/${venueId}/dishes/${dish.id}`,
        { method: 'PUT', body: { active: !dish.active } }
      )
      setDishes(dishes.map((d) => d.id === dish.id ? mapDishFromApi(res.dish) : d))
    } catch (err: any) {
      setError(err.message)
    }
  }

  const handleDelete = async (id: string) => {
    setSaving(true)
    setError(null)
    try {
      await request(`/api/dashboard/${venueId}/dishes/${id}`, { method: 'DELETE' })
      setDishes(dishes.filter((d) => d.id !== id))
      setDeleteConfirm(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const categories = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <p className="text-sm text-gray-500 mt-0.5">{dishes.length} dishes</p>
        </div>
        {!showAddForm && !editingId && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
          >
            + Add dish
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {showAddForm && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">New dish</h3>
          <DishForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            submitLabel={saving ? 'Saving...' : 'Add dish'}
          />
        </div>
      )}

      {categories.map((cat) => {
        const catDishes = dishes.filter((d) => d.category === cat)
        if (catDishes.length === 0) return null
        return (
          <section key={cat} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{cat}</h3>
            <div className="space-y-2">
              {catDishes.map((dish) => (
                <div key={dish.id}>
                  {editingId === dish.id ? (
                    <DishForm
                      initial={dishToFormData(dish)}
                      onSubmit={handleEdit}
                      onCancel={() => setEditingId(null)}
                      submitLabel={saving ? 'Saving...' : 'Save changes'}
                    />
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {dish.photoUrl && (
                            <img src={dish.photoUrl} alt={dish.name} className="w-16 h-16 rounded-lg object-cover mb-2" />
                          )}
                          <div className="flex items-center gap-2">
                            <h4 className={`font-semibold ${dish.active ? 'text-gray-900' : 'text-gray-400 line-through'}`}>{dish.name}</h4>
                            {!dish.active && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-xs font-medium">86'd</span>
                            )}
                          </div>
                          {dish.description && (
                            <p className="text-sm text-gray-500 mt-0.5">{dish.description}</p>
                          )}
                          {dish.ingredients && (
                            <p className="text-xs text-gray-400 mt-1 italic">
                              Ingredients: {dish.ingredients}
                            </p>
                          )}

                          {/* Dietary badges */}
                          {DIETARY_BADGES.some((b) => dish[b.key as keyof Dish]) && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {DIETARY_BADGES.map((b) =>
                                dish[b.key as keyof Dish] ? (
                                  <span key={b.key} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-se-green-50 border border-se-green-200 text-xs text-se-green-700 font-medium">
                                    {'icon' in b && <span>{b.icon}</span>}
                                    <span>{b.label}</span>
                                  </span>
                                ) : null
                              )}
                            </div>
                          )}

                          {/* Allergen badges */}
                          {dish.allergenMask > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {getIdsFromMask(dish.allergenMask).map((aid) => (
                                <AllergenBadge key={aid} allergenId={aid} />
                              ))}
                            </div>
                          )}
                          {dish.allergenMask === 0 && (
                            <p className="text-xs text-se-green-600 mt-2">No allergens - safe for everyone</p>
                          )}

                          {/* Nutrition summary */}
                          {dish.calories != null && (
                            <p className="text-xs text-gray-400 mt-1">
                              {dish.calories} kcal
                              {dish.proteinG != null && ` - ${dish.proteinG}g protein`}
                              {dish.carbsG != null && ` - ${dish.carbsG}g carbs`}
                              {dish.fatG != null && ` - ${dish.fatG}g fat`}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(dish.pricePence)}
                          </span>
                          <label className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xs cursor-pointer" title="Upload photo">
                            📷
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handlePhotoUpload(dish, f); e.target.value = '' }} />
                          </label>
                          {dish.photoUrl && (
                            <button onClick={() => handlePhotoDelete(dish)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-xs" title="Remove photo">
                              x
                            </button>
                          )}
                          <button
                            onClick={() => handleToggleActive(dish)}
                            className={`p-1.5 rounded-lg text-xs transition-colors ${
                              dish.active
                                ? 'text-se-green-600 hover:bg-se-green-50'
                                : 'text-gray-400 hover:bg-gray-100'
                            }`}
                            title={dish.active ? '86 this dish' : 'Bring back'}
                          >
                            {dish.active ? '✅' : '⏸️'}
                          </button>
                          <button
                            onClick={() => setEditingId(dish.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-xs"
                            title="Edit"
                          >
                            ✏️
                          </button>
                          {deleteConfirm === dish.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(dish.id)}
                                className="px-2 py-1 rounded text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                              >
                                {saving ? '...' : 'Delete'}
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-2 py-1 rounded text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(dish.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-xs"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
