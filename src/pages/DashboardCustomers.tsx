import { useState, useEffect } from 'react'
import AllergenBadge from '../components/AllergenBadge'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'
import { getIdsFromMask, ALLERGENS } from '../lib/allergens'

interface CustomerRow {
  id: string
  allergen_mask: number
  marketing_consent: boolean
  last_visit_at: string
  visit_count: number
  created_at: string
}

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

export default function DashboardCustomers() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [customers, setCustomers] = useState<CustomerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    request<{ customers: CustomerRow[] }>(`/api/dashboard/${venueId}/customers`)
      .then((data) => { if (!cancelled) setCustomers(data.customers) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const totalProfiles = customers.length
  const marketingOptIns = customers.filter((c) => c.marketing_consent).length
  const totalVisits = customers.reduce((sum, c) => sum + c.visit_count, 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Customers</h2>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Saved profiles</p>
          <p className="text-2xl font-bold text-gray-900">{totalProfiles}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Marketing opt-ins</p>
          <p className="text-2xl font-bold text-gray-900">{marketingOptIns}</p>
          {totalProfiles > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">{Math.round((marketingOptIns / totalProfiles) * 100)}% of profiles</p>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Total return visits</p>
          <p className="text-2xl font-bold text-gray-900">{totalVisits}</p>
        </div>
      </div>

      {/* Customer list */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">All profiles</h3>
          <p className="text-xs text-gray-400">Anonymised — no personal data shown</p>
        </div>
        {customers.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500">No customer profiles yet.</p>
            <p className="text-xs text-gray-400 mt-1">Profiles appear when customers save their allergens from the menu page.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {customers.map((customer, i) => {
              const allergenIds = getIdsFromMask(customer.allergen_mask)
              return (
                <div key={customer.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          Customer #{i + 1}
                        </span>
                        {customer.marketing_consent && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-se-green-50 text-se-green-600 font-medium">
                            Notifications on
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {allergenIds.map((aid) => (
                          <AllergenBadge key={aid} allergenId={aid} />
                        ))}
                        {allergenIds.length === 0 && (
                          <span className="text-xs text-gray-400">No allergens selected</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-medium text-gray-700">{customer.visit_count} visit{customer.visit_count !== 1 ? 's' : ''}</p>
                      <p className="text-xs text-gray-400">Last: {timeAgo(customer.last_visit_at)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* GDPR note */}
      <div className="mt-6 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500">
          <span className="font-medium">Privacy note:</span> Customer allergy profiles are special-category data under UK GDPR Article 9.
          Profiles are encrypted at rest, stored with explicit consent, and auto-deleted after 18 months of inactivity.
          Customers can delete their profile at any time from the menu page.
        </p>
      </div>
    </div>
  )
}
