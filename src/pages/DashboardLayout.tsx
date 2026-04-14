import { useState, useEffect, useCallback } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { useApi } from '../lib/api'
import { VenueProvider, type VenueContext } from '../lib/VenueContext'
import DashboardOnboarding from './DashboardOnboarding'
const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: '📊', end: true },
  { to: '/dashboard/menu', label: 'Menu', icon: '🍽️', end: false },
  { to: '/dashboard/customers', label: 'Customers', icon: '👥', end: false },
  { to: '/dashboard/notifications', label: 'Notifications', icon: '📣', end: false },
  { to: '/dashboard/verification', label: 'Verification', icon: '✅', end: false },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙️', end: false },
]
export default function DashboardLayout() {
  const { request } = useApi()
  const [venue, setVenue] = useState<VenueContext | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const fetchVenue = useCallback(() => {
    setLoading(true)
    setError(null)
    setNeedsOnboarding(false)
    request<{ venue: { id: string; name: string; slug: string; address: string } }>('/api/dashboard/me')
      .then((data) => {
        setVenue({
          venueId: data.venue.id,
          venueName: data.venue.name,
          venueSlug: data.venue.slug,
          venueAddress: data.venue.address,
        })
      })
      .catch((err) => {
        if (err.message === 'No venue linked to this account' || err.status === 404) {
          setNeedsOnboarding(true)
        } else {
          setError(err.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [request])
  useEffect(() => {
    fetchVenue()
  }, [fetchVenue])
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading dashboard…</p>
        </div>
      </div>
    )
  }
  if (needsOnboarding) {
    return <DashboardOnboarding onComplete={fetchVenue} />
  }
  if (error || !venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-3">⚠️</div>
          <h1 className="text-lg font-bold text-gray-900 mb-1">Something went wrong</h1>
          <p className="text-sm text-gray-500 mb-4">
            {error || 'Could not load your dashboard.'}
          </p>
          <button
            onClick={fetchVenue}
            className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }
  return (
    <VenueProvider value={venue}>
      <div className="min-h-screen bg-gray-50">
        {/* Mobile top nav */}
        <header className="bg-white border-b border-gray-200 lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">SafeEat Dashboard</h1>
              <p className="text-xs text-gray-500">{venue.venueName}</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <nav className="flex overflow-x-auto px-4 gap-1 pb-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-se-green-50 text-se-green-700'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <div className="lg:flex">
          {/* Desktop sidebar */}
          <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:border-r lg:border-gray-200 lg:bg-white lg:min-h-screen lg:p-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-gray-900">SafeEat</h1>
                <p className="text-xs text-gray-500 mt-0.5">{venue.venueName}</p>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-se-green-50 text-se-green-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>
          {/* Main content */}
          <main className="flex-1 p-4 lg:p-8 max-w-4xl">
            <Outlet />
          </main>
        </div>
      </div>
    </VenueProvider>
  )
}
