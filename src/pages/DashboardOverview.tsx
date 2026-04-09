import { useState, useEffect } from 'react'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'
import { getIdsFromMask, ALLERGENS } from '../lib/allergens'

interface Stats {
  scansWeek: number
  totalProfiles: number
  marketingOptIns: number
  lastVerified: string | null
}

interface CustomerRow {
  id: string
  allergen_mask: number
  marketing_consent: boolean
  last_visit_at: string
  visit_count: number
}

function daysAgo(iso: string | null): string {
  if (!iso) return 'Never'
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

export default function DashboardOverview() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [stats, setStats] = useState<Stats | null>(null)
  const [customers, setCustomers] = useState<CustomerRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      request<Stats>(`/api/dashboard/${venueId}/stats`),
      request<{ customers: CustomerRow[] }>(`/api/dashboard/${venueId}/customers`),
    ])
      .then(([statsData, custData]) => {
        if (cancelled) return
        setStats(statsData)
        setCustomers(custData.customers)
      })
      .catch((err) => console.error('Overview fetch error:', err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [request, venueId])

  // Compute top allergens from real customer data
  const topAllergens = (() => {
    if (customers.length === 0) return []

    const counts: Record<number, number> = {}
    for (const c of customers) {
      for (const id of getIdsFromMask(c.allergen_mask)) {
        counts[id] = (counts[id] || 0) + 1
      }
    }

    return Object.entries(counts)
      .map(([id, count]) => {
        const meta = ALLERGENS.find((a) => a.id === Number(id))
        return {
          label: meta?.label ?? `Allergen ${id}`,
          count,
          pct: Math.round((count / customers.length) * 100),
        }
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
  })()

  // Recent customers as activity-like feed
  const recentCustomers = customers
    .sort((a, b) => new Date(b.last_visit_at).getTime() - new Date(a.last_visit_at).getTime())
    .slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const statCards = [
    { label: 'Menu scans (7d)', value: stats?.scansWeek ?? 0 },
    { label: 'Saved profiles', value: stats?.totalProfiles ?? 0 },
    { label: 'Marketing opt-ins', value: stats?.marketingOptIns ?? 0 },
    { label: 'Menu verified', value: daysAgo(stats?.lastVerified ?? null) },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent customers */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent profiles</h3>
          {recentCustomers.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-500">No customer profiles yet.</p>
              <p className="text-xs text-gray-400 mt-1">Profiles appear when customers save their allergens.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {recentCustomers.map((c) => {
                const allergenIds = getIdsFromMask(c.allergen_mask)
                const labels = allergenIds
                  .map((id) => ALLERGENS.find((a) => a.id === id)?.label)
                  .filter(Boolean)
                  .slice(0, 3)
                const extra = allergenIds.length - labels.length

                return (
                  <div key={c.id} className="px-4 py-3 flex items-start gap-3">
                    <span className="text-xs text-gray-400 whitespace-nowrap mt-0.5 w-20 flex-shrink-0">
                      {daysAgo(c.last_visit_at)}
                    </span>
                    <div className="text-sm text-gray-700">
                      <span>Avoids {labels.join(', ')}</span>
                      {extra > 0 && <span className="text-gray-400"> +{extra} more</span>}
                      {c.visit_count > 1 && (
                        <span className="text-xs text-gray-400 ml-2">({c.visit_count} visits)</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Top allergens */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Top allergens among your customers
          </h3>
          {topAllergens.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-500">No data yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="space-y-3">
                {topAllergens.map((a) => (
                  <div key={a.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{a.label}</span>
                      <span className="text-xs text-gray-500">
                        {a.count} customer{a.count !== 1 ? 's' : ''} ({a.pct}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-se-green-500 rounded-full"
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
