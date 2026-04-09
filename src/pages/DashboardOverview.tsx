const DEMO_STATS = [
  { label: 'Menu scans (7d)', value: '147', change: '+23%', up: true },
  { label: 'Saved profiles', value: '34', change: '+8', up: true },
  { label: 'Marketing opt-ins', value: '19', change: '+5', up: true },
  { label: 'Menu verified', value: '2d ago', change: '', up: true },
]

const RECENT_ACTIVITY = [
  { time: '2 min ago', text: 'New profile saved — avoids Milk, Eggs' },
  { time: '15 min ago', text: 'Menu scanned (no profile saved)' },
  { time: '1 hr ago', text: 'New profile saved — avoids Peanuts, Tree nuts' },
  { time: '3 hr ago', text: 'Profile deleted by customer' },
  { time: '5 hr ago', text: 'Menu scanned (returning customer)' },
]

const TOP_ALLERGENS = [
  { label: 'Milk', count: 14, pct: 41 },
  { label: 'Gluten', count: 11, pct: 32 },
  { label: 'Peanuts', count: 8, pct: 24 },
  { label: 'Eggs', count: 6, pct: 18 },
  { label: 'Tree nuts', count: 5, pct: 15 },
]

export default function DashboardOverview() {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {DEMO_STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            {stat.change && (
              <p className={`text-xs font-medium mt-1 ${stat.up ? 'text-se-green-600' : 'text-red-500'}`}>
                {stat.change}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent activity</h3>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className="px-4 py-3 flex items-start gap-3">
                <span className="text-xs text-gray-400 whitespace-nowrap mt-0.5 w-16 flex-shrink-0">
                  {item.time}
                </span>
                <p className="text-sm text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top allergens among saved profiles */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Top allergens among your customers
          </h3>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="space-y-3">
              {TOP_ALLERGENS.map((a) => (
                <div key={a.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{a.label}</span>
                    <span className="text-xs text-gray-500">{a.count} customers ({a.pct}%)</span>
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
        </div>
      </div>
    </div>
  )
}
