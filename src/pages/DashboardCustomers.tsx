import { useState, useEffect } from 'react'
import { getIdsFromMask } from '../lib/allergens'
import AllergenBadge from '../components/AllergenBadge'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface CustomerProfile {
  id: string
  allergenMask: number
  visitCount: number
  marketingOptIn: boolean
  createdAt: string
  lastVisit: string
}

export default function DashboardCustomers() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [profiles, setProfiles] = useState<CustomerProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    request<{ profiles: Array<{
      id: string
      allergen_mask: number
      visit_count: number
      marketing_opt_in: boolean
      created_at: string
      last_visit: string
    }> }>(`/api/dashboard/${venueId}/customers`)
      .then((data) => {
        if (cancelled) return
        setProfiles(
          data.profiles.map((p) => ({
            id: p.id,
            allergenMask: p.allergen_mask,
            visitCount: p.visit_count,
            marketingOptIn: p.marketing_opt_in,
            createdAt: p.created_at,
            lastVisit: p.last_visit,
          }))
        )
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Customers</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {profiles.length} saved profile{profiles.length !== 1 ? 's' : ''}
          {' · '}
          {profiles.filter((p) => p.marketingOptIn).length} opted into notifications
        </p>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {profiles.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-4xl mb-3">👥</div>
          <h3 className="font-semibold text-gray-900 mb-1">No customer profiles yet</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            When customers scan your QR code and save their allergy profile, they'll appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {profiles.map((profile) => (
            <div key={profile.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {getIdsFromMask(profile.allergenMask).map((aid) => (
                      <AllergenBadge key={aid} allergenId={aid} />
                    ))}
                    {profile.allergenMask === 0 && (
                      <span className="text-xs text-gray-400">No allergens selected</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{profile.visitCount} visit{profile.visitCount !== 1 ? 's' : ''}</span>
                    <span>·</span>
                    <span>Joined {new Date(profile.createdAt).toLocaleDateString('en-GB')}</span>
                    <span>·</span>
                    <span>Last visit {new Date(profile.lastVisit).toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {profile.marketingOptIn ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-se-green-50 text-se-green-700 text-xs font-medium">
                      📧 Opted in
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                      No marketing
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
