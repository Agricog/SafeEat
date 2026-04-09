import AllergenBadge from '../components/AllergenBadge'

interface CustomerProfile {
  id: string
  savedAt: string
  allergenIds: string[]
  marketingOptIn: boolean
  lastVisit: string
  visits: number
}

const DEMO_CUSTOMERS: CustomerProfile[] = [
  { id: '1', savedAt: '2026-04-07T14:20:00Z', allergenIds: ['milk', 'eggs'], marketingOptIn: true, lastVisit: '2026-04-09T12:30:00Z', visits: 4 },
  { id: '2', savedAt: '2026-04-05T10:15:00Z', allergenIds: ['peanuts', 'tree_nuts'], marketingOptIn: true, lastVisit: '2026-04-08T13:00:00Z', visits: 3 },
  { id: '3', savedAt: '2026-04-03T16:45:00Z', allergenIds: ['gluten'], marketingOptIn: false, lastVisit: '2026-04-07T18:30:00Z', visits: 2 },
  { id: '4', savedAt: '2026-04-01T11:00:00Z', allergenIds: ['fish', 'crustaceans', 'molluscs'], marketingOptIn: true, lastVisit: '2026-04-06T12:15:00Z', visits: 5 },
  { id: '5', savedAt: '2026-03-28T09:30:00Z', allergenIds: ['milk', 'gluten', 'eggs'], marketingOptIn: false, lastVisit: '2026-04-04T19:00:00Z', visits: 2 },
  { id: '6', savedAt: '2026-03-25T14:00:00Z', allergenIds: ['sesame', 'mustard'], marketingOptIn: true, lastVisit: '2026-04-02T13:45:00Z', visits: 3 },
  { id: '7', savedAt: '2026-03-20T12:30:00Z', allergenIds: ['soybeans'], marketingOptIn: false, lastVisit: '2026-03-30T11:00:00Z', visits: 1 },
]

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  return `${days}d ago`
}

export default function DashboardCustomers() {
  const totalProfiles = DEMO_CUSTOMERS.length
  const marketingOptIns = DEMO_CUSTOMERS.filter((c) => c.marketingOptIn).length
  const totalVisits = DEMO_CUSTOMERS.reduce((sum, c) => sum + c.visits, 0)

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Customers</h2>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Saved profiles</p>
          <p className="text-2xl font-bold text-gray-900">{totalProfiles}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-xs text-gray-500 mb-1">Marketing opt-ins</p>
          <p className="text-2xl font-bold text-gray-900">{marketingOptIns}</p>
          <p className="text-xs text-gray-400 mt-0.5">{Math.round((marketingOptIns / totalProfiles) * 100)}% of profiles</p>
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
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {DEMO_CUSTOMERS.map((customer) => (
            <div key={customer.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      Customer #{customer.id}
                    </span>
                    {customer.marketingOptIn && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-se-green-50 text-se-green-600 font-medium">
                        Notifications on
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {customer.allergenIds.map((aid) => (
                      <AllergenBadge key={aid} allergenId={aid} />
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-medium text-gray-700">{customer.visits} visits</p>
                  <p className="text-xs text-gray-400">Last: {timeAgo(customer.lastVisit)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
