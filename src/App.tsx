import { Routes, Route, Navigate } from 'react-router-dom'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'
import DashboardLayout from './pages/DashboardLayout'
import DashboardOverview from './pages/DashboardOverview'
import DashboardMenu from './pages/DashboardMenu'
import DashboardCustomers from './pages/DashboardCustomers'
import DashboardVerification from './pages/DashboardVerification'
import DashboardSettings from './pages/DashboardSettings'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu/:venueId" element={<MenuPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="menu" element={<DashboardMenu />} />
          <Route path="customers" element={<DashboardCustomers />} />
          <Route path="verification" element={<DashboardVerification />} />
          <Route path="settings" element={<DashboardSettings />} />
        </Route>
      </Routes>
    </ClerkProvider>
  )
}
