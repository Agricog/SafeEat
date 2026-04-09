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
  category: string
  active: boolean
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
  }
}

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
    request<{ dishes: Array<{ id: string; name: string; description: string; price_pence: number; category: string; allergen_mask: number; active: boolean }> }>(
      `/api/dashboard/${venueId}/dishes`
    )
      .then((data) => {
        if (cancelled) return
        setDishes(
          data.dishes.map((d) => ({
            id: d.id,
            name: d.name,
            description: d.description,
            pricePence: d.price_pence,
            allergenMask: d.allergen_mask,
            category: d.category,
            active: d.active,
          }))
        )
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleAdd = async (data: DishFormData) => {
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ dish: { id: string; name: string; description: string; price_pence: number; category: string; allergen_mask: number } }>(
        `/api/dashboard/${venueId}/dishes`,
        {
          method: 'POST',
          body: {
            name: data.name.trim(),
            description: data.description.trim(),
            pricePence: Math.round(parseFloat(data.pricePounds) * 100),
            category: data.category,
            allergenMask: buildMaskFromIds(data.allergenIds),
          },
        }
      )
      setDishes([...dishes, {
        id: res.dish.id,
        name: res.dish.name,
        description: res.dish.description,
        pricePence: res.dish.price_pence,
        allergenMask: res.dish.allergen_mask,
        category: res.dish.category,
        active: true,
      }])
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
      const res = await request<{ dish: { id: string; name: string; description: string; price_pence: number; category: string; allergen_mask: number; active: boolean } }>(
        `/api/dashboard/${venueId}/dishes/${editingId}`,
        {
          method: 'PUT',
          body: {
            name: data.name.trim(),
            description: data.description.trim(),
            pricePence: Math.round(parseFloat(data.pricePounds) * 100),
            category: data.category,
            allergenMask: buildMaskFromIds(data.allergenIds),
          },
        }
      )
      setDishes(dishes.map((d) =>
        d.id === editingId
          ? { id: res.dish.id, name: res.dish.name, description: res.dish.description, pricePence: res.dish.price_pence, allergenMask: res.dish.allergen_mask, category: res.dish.category, active: res.dish.active }
          : d
      ))
      setEditingId(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
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
            submitLabel={saving ? 'Saving…' : 'Add dish'}
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
                      submitLabel={saving ? 'Saving…' : 'Save changes'}
                    />
                  ) : (
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900">{dish.name}</h4>
                          {dish.description && (
                            <p className="text-sm text-gray-500 mt-0.5">{dish.description}</p>
                          )}
                          {dish.allergenMask > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {getIdsFromMask(dish.allergenMask).map((aid) => (
                                <AllergenBadge key={aid} allergenId={aid} />
                              ))}
                            </div>
                          )}
                          {dish.allergenMask === 0 && (
                            <p className="text-xs text-se-green-600 mt-2">No allergens — safe for everyone</p>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(dish.pricePence)}
                          </span>
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
                                {saving ? '…' : 'Delete'}
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
