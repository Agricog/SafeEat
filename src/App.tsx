import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import DashboardLayout from './pages/DashboardLayout'
import DashboardOverview from './pages/DashboardOverview'
import DashboardMenu from './pages/DashboardMenu'
import DashboardVerification from './pages/DashboardVerification'
import DashboardCustomers from './pages/DashboardCustomers'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-sm text-gray-500">Coming in next batch.</p>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu/:venueId" element={<MenuPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardOverview />} />
        <Route path="menu" element={<DashboardMenu />} />
        <Route path="customers" element={<DashboardCustomers />} />
        <Route path="verification" element={<DashboardVerification />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
    </Routes>
  )
}
