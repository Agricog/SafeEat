import { useState, useMemo, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AllergenSelector from '../components/AllergenSelector'
import AllergenBadge from '../components/AllergenBadge'
import VerifiedBadge from '../components/VerifiedBadge'
import SaveProfilePrompt from '../components/SaveProfilePrompt'
import { isDishSafe, buildMaskFromIds, getIdsFromMask } from '../lib/allergens'
import { useLocalProfile } from '../hooks/useLocalProfile'

interface Dish {
  id: string
  name: string
  description: string
  pricePence: number
  allergenMask: number
  category: string
}

interface Venue {
  id: string
  name: string
  slug: string
  address: string
}

interface MenuData {
  venue: Venue
  dishes: Dish[]
  verification: { verifiedAt: string; type: string } | null
}

function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`
}

export default function MenuPage() {
  const { venueId } = useParams<{ venueId: string }>()

  // ---------------------------------------------------------------------------
  // Fetch menu data from API
  // ---------------------------------------------------------------------------
  const [menuData, setMenuData] = useState<MenuData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!venueId) return

    setLoading(true)
    setError(null)

    fetch(`/api/menu/${venueId}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? 'Venue not found' : 'Failed to load menu')
        return res.json()
      })
      .then((data: MenuData) => {
        setMenuData(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [venueId])

  // ---------------------------------------------------------------------------
  // Profile management
  // ---------------------------------------------------------------------------
  const venue = menuData?.venue
  const dishes = menuData?.dishes ?? []
  const verification = menuData?.verification

  const { profile, saveProfile, deleteProfile } = useLocalProfile(venue?.id ?? '')

  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [showSelector, setShowSelector] = useState(false)
  const [showSavePrompt, setShowSavePrompt] = useState(false)
  const [promptDismissed, setPromptDismissed] = useState(false)
  const [savedConfirmation, setSavedConfirmation] = useState(false)

  // Load profile allergens once venue data arrives
  useEffect(() => {
    if (profile) {
      setSelectedAllergens(profile.allergenIds)
      setSavedConfirmation(true)
    }
  }, [profile])

  // Show save prompt after user selects allergens and closes the selector
  const [selectorWasOpen, setSelectorWasOpen] = useState(false)

  useEffect(() => {
    if (showSelector) {
      setSelectorWasOpen(true)
    }
  }, [showSelector])

  useEffect(() => {
    if (
      selectorWasOpen &&
      !showSelector &&
      selectedAllergens.length > 0 &&
      !profile &&
      !promptDismissed &&
      !savedConfirmation
    ) {
      setShowSavePrompt(true)
      setSelectorWasOpen(false)
    }
  }, [showSelector, selectorWasOpen, selectedAllergens.length, profile, promptDismissed, savedConfirmation])

  const handleSave = (marketingConsent: boolean) => {
    if (!venue) return
    saveProfile(selectedAllergens, venue.name, marketingConsent)
    setShowSavePrompt(false)
    setSavedConfirmation(true)
    setTimeout(() => setSavedConfirmation(false), 3000)
  }

  const handleDismiss = () => {
    setShowSavePrompt(false)
    setPromptDismissed(true)
  }

  const handleDeleteProfile = () => {
    deleteProfile()
    setSelectedAllergens([])
    setPromptDismissed(false)
    setSavedConfirmation(false)
  }

  // ---------------------------------------------------------------------------
  // Allergen filtering
  // ---------------------------------------------------------------------------
  const customerMask = buildMaskFromIds(selectedAllergens)

  const categorised = useMemo(() => {
    const cats: Record<string, (Dish & { safe: boolean })[]> = {}
    for (const dish of dishes) {
      const safe = isDishSafe(dish.allergenMask, customerMask)
      if (!cats[dish.category]) cats[dish.category] = []
      cats[dish.category].push({ ...dish, safe })
    }
    return cats
  }, [dishes, customerMask])

  // Derive category order from actual data
  const categoryOrder = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']

  // ---------------------------------------------------------------------------
  // Loading state
  // ---------------------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🍽️</div>
          <p className="text-sm text-gray-500">Loading menu…</p>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Error state
  // ---------------------------------------------------------------------------
  if (error || !venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-3">😕</div>
          <h1 className="text-lg font-bold text-gray-900 mb-1">
            {error === 'Venue not found' ? 'Venue not found' : 'Something went wrong'}
          </h1>
          <p className="text-sm text-gray-500">
            {error === 'Venue not found'
              ? 'This QR code may be outdated or the venue may have been removed.'
              : 'Please try again in a moment.'}
          </p>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{venue.name}</h1>
              <VerifiedBadge verifiedAt={verification?.verifiedAt ?? null} />
            </div>
            <div className="flex items-center gap-2">
              {profile && (
                <button
                  onClick={handleDeleteProfile}
                  className="px-2 py-1 rounded-full text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete saved profile"
                >
                  ✕ Profile
                </button>
              )}
              <button
                onClick={() => setShowSelector(!showSelector)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedAllergens.length > 0
                    ? 'bg-se-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {selectedAllergens.length > 0
                  ? `${selectedAllergens.length} allergen${selectedAllergens.length > 1 ? 's' : ''}`
                  : 'Set allergies'}
              </button>
            </div>
          </div>

          {showSelector && (
            <div className="mt-3 pb-1">
              <p className="text-xs text-gray-500 mb-2">Select your allergens to filter the menu</p>
              <AllergenSelector
                selected={selectedAllergens}
                onChange={setSelectedAllergens}
                compact
              />
            </div>
          )}
        </div>
      </header>

      {/* Saved confirmation toast */}
      {savedConfirmation && !showSavePrompt && (
        <div className="max-w-lg mx-auto">
          <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-se-green-50 border border-se-green-200 flex items-center gap-2">
            <span className="text-se-green-600">✓</span>
            <p className="text-sm text-se-green-700 font-medium">
              Profile saved — your menu is personalised
            </p>
          </div>
        </div>
      )}

      {/* Save profile consent prompt */}
      {showSavePrompt && (
        <div className="max-w-lg mx-auto">
          <SaveProfilePrompt
            venueName={venue.name}
            allergenCount={selectedAllergens.length}
            onSave={handleSave}
            onDismiss={handleDismiss}
          />
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-6">
        {dishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No dishes on the menu yet.</p>
          </div>
        ) : (
          categoryOrder.map((cat) => {
            const catDishes = categorised[cat]
            if (!catDishes || catDishes.length === 0) return null
            return (
              <section key={cat} className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{cat}</h2>
                <div className="space-y-3">
                  {catDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className={`bg-white rounded-xl border p-4 transition-opacity ${
                        customerMask > 0 && !dish.safe ? 'opacity-40 border-gray-100' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                            {customerMask > 0 && dish.safe && (
                              <span className="text-xs font-medium text-se-green-600 bg-se-green-50 px-1.5 py-0.5 rounded">
                                Safe
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-0.5">{dish.description}</p>
                          {dish.allergenMask > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {getIdsFromMask(dish.allergenMask).map((aid) => (
                                <AllergenBadge key={aid} allergenId={aid} />
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                          {formatPrice(dish.pricePence)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })
        )}
      </main>
    </div>
  )
}
