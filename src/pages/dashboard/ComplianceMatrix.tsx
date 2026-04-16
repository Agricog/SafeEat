import { useState, useEffect, useMemo, Fragment } from 'react'
import { ALLERGENS, getIdsFromMask } from '../lib/allergens'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface Dish {
  id: string
  name: string
  category: string
  allergenMask: number
  mayContainMask: number
  active: boolean
}

function mapDish(d: any): Dish {
  return {
    id: d.id,
    name: d.name,
    category: d.category,
    allergenMask: d.allergen_mask,
    mayContainMask: d.may_contain_mask || 0,
    active: d.active,
  }
}

const CATEGORY_ORDER = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']

export default function ComplianceMatrix() {
  const { request } = useApi()
  const { venueId, venueName } = useVenue()
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    request<{ dishes: any[] }>(`/api/dashboard/${venueId}/dishes`)
      .then((data) => {
        if (cancelled) return
        setDishes(data.dishes.map(mapDish))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [request, venueId])

  const activeDishes = useMemo(() => dishes.filter((d) => d.active), [dishes])

  const grouped = useMemo(() => {
    const cats: Record<string, Dish[]> = {}
    for (const dish of activeDishes) {
      if (!cats[dish.category]) cats[dish.category] = []
      cats[dish.category].push(dish)
    }
    return cats
  }, [activeDishes])

  const now = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div>
      {/* Screen header - hidden when printing */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Allergen Matrix</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {activeDishes.length} active dishes &middot; 14 FSA allergens
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
        >
          🖨️ Print / Save PDF
        </button>
      </div>

      {/* Print header - hidden on screen */}
      <div className="hidden print:block mb-4">
        <h1 className="text-lg font-bold">{venueName} — Allergen Matrix</h1>
        <p className="text-xs text-gray-500">
          Generated {now} &middot; {activeDishes.length} dishes &middot; SafeEat
        </p>
      </div>

      {activeDishes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-gray-500">No active dishes on the menu yet.</p>
          <p className="text-xs text-gray-400 mt-1">Add dishes in the Menu page to generate the matrix.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 print:border-black print:rounded-none">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 print:bg-gray-200">
                <th className="text-left px-3 py-2 border-b border-gray-200 font-semibold text-gray-700 sticky left-0 bg-gray-50 print:bg-gray-200 min-w-[140px]">
                  Dish
                </th>
                {ALLERGENS.map((a) => (
                  <th
                    key={a.id}
                    className="px-1 py-2 border-b border-gray-200 font-medium text-gray-600 text-center min-w-[44px]"
                    title={a.label}
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-sm">{a.icon}</span>
                      <span className="text-[10px] leading-tight print:text-[8px]">{a.shortLabel}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CATEGORY_ORDER.map((cat) => {
                const catDishes = grouped[cat]
                if (!catDishes || catDishes.length === 0) return null
                return (
                  <Fragment key={cat}>
                    <tr>
                      <td
                        colSpan={ALLERGENS.length + 1}
                        className="px-3 py-1.5 bg-gray-50 print:bg-gray-100 font-semibold text-gray-500 uppercase tracking-wide text-[10px] border-b border-gray-200"
                      >
                        {cat}
                      </td>
                    </tr>
                    {catDishes.map((dish) => {
                      const containsIds = new Set(getIdsFromMask(dish.allergenMask))
                      const mayContainIds = new Set(getIdsFromMask(dish.mayContainMask))
                      return (
                        <tr key={dish.id} className="hover:bg-gray-50 print:hover:bg-transparent">
                          <td className="px-3 py-1.5 border-b border-gray-100 font-medium text-gray-900 sticky left-0 bg-white print:bg-transparent">
                            {dish.name}
                          </td>
                          {ALLERGENS.map((a) => {
                            const contains = containsIds.has(a.id)
                            const mayContain = mayContainIds.has(a.id)
                            return (
                              <td
                                key={a.id}
                                className={`text-center border-b border-gray-100 py-1.5 ${
                                  contains
                                    ? 'bg-red-50 print:bg-red-100'
                                    : mayContain
                                    ? 'bg-amber-50 print:bg-amber-100'
                                    : ''
                                }`}
                              >
                                {contains ? (
                                  <span className="text-red-600 font-bold" title="Contains">✓</span>
                                ) : mayContain ? (
                                  <span className="text-amber-600 font-bold" title="May contain">⚠</span>
                                ) : (
                                  <span className="text-gray-200">–</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center gap-6 text-xs text-gray-500 print:mt-2">
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-red-50 border border-red-200 rounded text-center text-red-600 font-bold leading-4 text-[10px]">✓</span>
          Contains
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-amber-50 border border-amber-200 rounded text-center text-amber-600 font-bold leading-4 text-[10px]">⚠</span>
          May contain (cross-contamination)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-4 h-4 bg-white border border-gray-200 rounded text-center text-gray-200 font-bold leading-4 text-[10px]">–</span>
          Not present
        </span>
      </div>

      {/* EHO footer */}
      <div className="mt-4 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 print:border-black print:rounded-none print:mt-2">
        <p className="text-xs text-gray-500">
          This matrix is auto-generated from live menu data. It updates automatically whenever dishes are added,
          edited, or removed. Print or save as PDF to display in your kitchen for EHO inspections.
        </p>
      </div>
    </div>
  )
}
