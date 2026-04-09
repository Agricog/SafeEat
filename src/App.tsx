import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import DashboardLayout from './pages/DashboardLayout'
import DashboardOverview from './pages/DashboardOverview'
import DashboardMenu from './pages/DashboardMenu'
import DashboardCustomers from './pages/DashboardCustomers'
import DashboardVerification from './pages/DashboardVerification'
import DashboardSettings from './pages/DashboardSettings'

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
        <Route path="settings" element={<DashboardSettings />} />
      </Route>
    </Routes>
  )
}
