import { useState } from 'react'
import AllergenBadge from '../components/AllergenBadge'
import DishForm, { type DishFormData } from '../components/DishForm'
import { buildMaskFromIds, getIdsFromMask } from '../lib/allergens'

interface Dish {
  id: string
  name: string
  description: string
  pricePence: number
  allergenMask: number
  category: string
}

const INITIAL_DISHES: Dish[] = [
  { id: '1', name: 'Margherita Pizza', description: 'Tomato, mozzarella, fresh basil', pricePence: 1095, allergenMask: (1 << 1) | (1 << 6), category: 'Mains' },
  { id: '2', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, anchovy dressing', pricePence: 895, allergenMask: (1 << 1) | (1 << 3) | (1 << 4) | (1 << 6), category: 'Starters' },
  { id: '3', name: 'Grilled Chicken Breast', description: 'Free-range chicken, seasonal veg, new potatoes', pricePence: 1495, allergenMask: 0, category: 'Mains' },
  { id: '4', name: 'Chocolate Brownie', description: 'Warm brownie, vanilla ice cream', pricePence: 695, allergenMask: (1 << 3) | (1 << 6) | (1 << 1), category: 'Desserts' },
  { id: '5', name: 'Fish & Chips', description: 'Beer-battered cod, triple-cooked chips, mushy peas', pricePence: 1395, allergenMask: (1 << 1) | (1 << 4), category: 'Mains' },
  { id: '6', name: 'Fruit Sorbet', description: 'Rotating seasonal flavours, dairy-free', pricePence: 595, allergenMask: 0, category: 'Desserts' },
]

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

function formDataToDish(data: DishFormData, id: string): Dish {
  return {
    id,
    name: data.name.trim(),
    description: data.description.trim(),
    pricePence: Math.round(parseFloat(data.pricePounds) * 100),
    allergenMask: buildMaskFromIds(data.allergenIds),
    category: data.category,
  }
}

export default function DashboardMenu() {
  const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const categories = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']

  const handleAdd = (data: DishFormData) => {
    const id = Date.now().toString()
    setDishes([...dishes, formDataToDish(data, id)])
    setShowAddForm(false)
  }

  const handleEdit = (data: DishFormData) => {
    if (!editingId) return
    setDishes(dishes.map((d) => (d.id === editingId ? formDataToDish(data, d.id) : d)))
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    setDishes(dishes.filter((d) => d.id !== id))
    setDeleteConfirm(null)
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

      {/* Add form */}
      {showAddForm && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">New dish</h3>
          <DishForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            submitLabel="Add dish"
          />
        </div>
      )}

      {/* Dish list by category */}
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
                      submitLabel="Save changes"
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
                                Delete
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
