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
import DashboardTraining from './pages/DashboardTraining'
import DashboardNotifications from './pages/DashboardNotifications'
import AllergensGuidePage from './pages/AllergensGuidePage'
import OwensLawGuidePage from './pages/OwensLawGuidePage'
import EhoGuidePage from './pages/EhoGuidePage'
import AllergenTemplatePage from './pages/AllergenTemplatePage'
import NatashasLawGuidePage from './pages/NatashasLawGuidePage'
import AllergenFinesGuidePage from './pages/AllergenFinesGuidePage'
import CafesPage from './pages/CafesPage'
import TakeawaysPage from './pages/TakeawaysPage'
import PubsPage from './pages/PubsPage'
import GlutenFreeGuidePage from './pages/GlutenFreeGuidePage'
import NutAllergyGuidePage from './pages/NutAllergyGuidePage'
import AllergenRetentionGuidePage from './pages/AllergenRetentionGuidePage'

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

        {/* Guides */}
        <Route path="/guides/14-allergens-uk" element={<AllergensGuidePage />} />
        <Route path="/guides/owens-law" element={<OwensLawGuidePage />} />
        <Route path="/guides/eho-allergen-inspection" element={<EhoGuidePage />} />
        <Route path="/guides/allergen-menu-template" element={<AllergenTemplatePage />} />
        <Route path="/guides/natashas-law-restaurants" element={<NatashasLawGuidePage />} />
        <Route path="/guides/allergen-fines-uk" element={<AllergenFinesGuidePage />} />
        <Route path="/guides/gluten-free-menu-restaurant" element={<GlutenFreeGuidePage />} />
        <Route path="/guides/nut-allergy-restaurant-guide" element={<NutAllergyGuidePage />} />
        <Route path="/guides/allergen-customer-retention" element={<AllergenRetentionGuidePage />} />

        {/* Business-type pages */}
        <Route path="/for/cafes" element={<CafesPage />} />
        <Route path="/for/takeaways" element={<TakeawaysPage />} />
        <Route path="/for/pubs" element={<PubsPage />} />

        {/* Dashboard */}
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
          <Route path="training" element={<DashboardTraining />} />
          <Route path="notifications" element={<DashboardNotifications />} />
        </Route>
      </Routes>
    </ClerkProvider>
  )
}
