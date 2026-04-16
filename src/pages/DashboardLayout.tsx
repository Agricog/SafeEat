import { useState, useEffect, useCallback } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { useApi } from '../lib/api'
import { VenueProvider, type VenueContext } from '../lib/VenueContext'
import DashboardOnboarding from './DashboardOnboarding'

const ADMIN_USER_ID = 'user_3COitKCjwIaPKHCW0yDyYfHIzMh'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: '📊', end: true },
  { to: '/dashboard/menu', label: 'Menu', icon: '🍽️', end: false },
  { to: '/dashboard/customers', label: 'Customers', icon: '👥', end: false },
  { to: '/dashboard/notifications', label: 'Notifications', icon: '📣', end: false },
  { to: '/dashboard/verification', label: 'Verification', icon: '✅', end: false },
  { to: '/dashboard/training', label: 'Training', icon: '📋', end: false },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙️', end: false },
]

const COMPLIANCE_ITEMS = [
  { to: '/dashboard/compliance/matrix', label: 'Allergen Matrix', icon: '📋', end: false },
  { to: '/dashboard/compliance/incidents', label: 'Incident Log', icon: '🚨', end: false },
  { to: '/dashboard/compliance/quiz', label: 'Staff Quiz', icon: '✏️', end: false },
]

function NavLinkItem({ item }: { item: { to: string; label: string; icon: string; end: boolean } }) {
  return (
    <NavLink
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
  )
}

function MobileNavLinkItem({ item }: { item: { to: string; label: string; icon: string; end: boolean } }) {
  return (
    <NavLink
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
  )
}

export default function DashboardLayout() {
  const { request } = useApi()
  const [venue, setVenue] = useState<VenueContext | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsOnboarding, setNeedsOnboarding] = useState(false)
  const [needsPayment, setNeedsPayment] = useState(false)
  const [venueId, setVenueId] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const fetchVenue = useCallback(() => {
    setLoading(true)
    setError(null)
    setNeedsOnboarding(false)
    setNeedsPayment(false)
    request<{ venue: { id: string; name: string; slug: string; address: string; subscription_status: string; clerk_user_id: string } }>('/api/dashboard/me')
      .then((data) => {
        const v = data.venue
        const isAdmin = v.clerk_user_id === ADMIN_USER_ID
        const isPaid = ['active', 'trialing'].includes(v.subscription_status)

        if (!isAdmin && !isPaid) {
          setVenueId(v.id)
          setNeedsPayment(true)
        } else {
          setVenue({
            venueId: v.id,
            venueName: v.name,
            venueSlug: v.slug,
            venueAddress: v.address,
          })
        }
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

  const handleCheckout = async () => {
    if (!venueId) return
    setCheckoutLoading(true)
    try {
      const res = await request<{ url: string }>(`/api/dashboard/${venueId}/billing/checkout`, {
        method: 'POST',
      })
      window.location.href = res.url
    } catch (err: any) {
      setError(err.message || 'Could not start checkout')
      setCheckoutLoading(false)
    }
  }

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

  if (needsPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="text-4xl mb-4">🍽️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Subscribe to get started</h1>
          <p className="text-sm text-gray-500 mb-6">
            SafeEat is £29.99/month per venue. All features included, no contracts, cancel any time.
          </p>
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="w-full py-3 rounded-lg bg-se-green-600 text-white font-semibold hover:bg-se-green-700 transition-colors disabled:opacity-50"
          >
            {checkoutLoading ? 'Redirecting to checkout…' : 'Subscribe — £29.99/month'}
          </button>
          <p className="text-xs text-gray-400 mt-3">Powered by Stripe. Cancel any time.</p>
        </div>
      </div>
    )
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
        <header className="bg-white border-b border-gray-200 lg:hidden print:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">SafeEat Dashboard</h1>
              <p className="text-xs text-gray-500">{venue.venueName}</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <nav className="flex overflow-x-auto px-4 gap-1 pb-2">
            {NAV_ITEMS.map((item) => (
              <MobileNavLinkItem key={item.to} item={item} />
            ))}
            {COMPLIANCE_ITEMS.map((item) => (
              <MobileNavLinkItem key={item.to} item={item} />
            ))}
          </nav>
        </header>
        <div className="lg:flex">
          {/* Desktop sidebar */}
          <aside className="hidden lg:flex lg:flex-col lg:w-56 lg:border-r lg:border-gray-200 lg:bg-white lg:min-h-screen lg:p-4 print:hidden">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-bold text-gray-900">SafeEat</h1>
                <p className="text-xs text-gray-500 mt-0.5">{venue.venueName}</p>
              </div>
              <UserButton afterSignOutUrl="/" />
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLinkItem key={item.to} item={item} />
              ))}
              <div className="mt-4 mb-1 px-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Compliance</p>
              </div>
              {COMPLIANCE_ITEMS.map((item) => (
                <NavLinkItem key={item.to} item={item} />
              ))}
            </nav>
          </aside>
          {/* Main content */}
          <main className="flex-1 p-4 lg:p-8 max-w-4xl print:p-0 print:max-w-none">
            <Outlet />
          </main>
        </div>
      </div>
    </VenueProvider>
  )
}
