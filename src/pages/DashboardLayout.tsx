import { NavLink, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: '📊', end: true },
  { to: '/dashboard/menu', label: 'Menu', icon: '🍽️', end: false },
  { to: '/dashboard/customers', label: 'Customers', icon: '👥', end: false },
  { to: '/dashboard/verification', label: 'Verification', icon: '✅', end: false },
  { to: '/dashboard/settings', label: 'Settings', icon: '⚙️', end: false },
]

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile top nav */}
      <header className="bg-white border-b border-gray-200 lg:hidden">
        <div className="px-4 py-3">
          <h1 className="text-lg font-bold text-gray-900">SafeEat Dashboard</h1>
          <p className="text-xs text-gray-500">The Demo Café</p>
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
          <div className="mb-6">
            <h1 className="text-lg font-bold text-gray-900">SafeEat</h1>
            <p className="text-xs text-gray-500 mt-0.5">The Demo Café</p>
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
  )
}
