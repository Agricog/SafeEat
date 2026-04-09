import { useState, useMemo, useEffect } from 'react'
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

const DEMO_VENUE_ID = 'demo'
const DEMO_VENUE_NAME = 'The Demo Café'

const DEMO_DISHES: Dish[] = [
  { id: '1', name: 'Margherita Pizza', description: 'Tomato, mozzarella, fresh basil', pricePence: 1095, allergenMask: (1 << 1) | (1 << 6), category: 'Mains' },
  { id: '2', name: 'Caesar Salad', description: 'Romaine, parmesan, croutons, anchovy dressing', pricePence: 895, allergenMask: (1 << 1) | (1 << 3) | (1 << 4) | (1 << 6), category: 'Starters' },
  { id: '3', name: 'Grilled Chicken Breast', description: 'Free-range chicken, seasonal veg, new potatoes', pricePence: 1495, allergenMask: 0, category: 'Mains' },
  { id: '4', name: 'Chocolate Brownie', description: 'Warm brownie, vanilla ice cream', pricePence: 695, allergenMask: (1 << 3) | (1 << 6) | (1 << 1), category: 'Desserts' },
  { id: '5', name: 'Fish & Chips', description: 'Beer-battered cod, triple-cooked chips, mushy peas', pricePence: 1395, allergenMask: (1 << 1) | (1 << 4), category: 'Mains' },
  { id: '6', name: 'Fruit Sorbet', description: 'Rotating seasonal flavours, dairy-free', pricePence: 595, allergenMask: 0, category: 'Desserts' },
]

function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`
}

export default function MenuPage() {
  const { profile, saveProfile, deleteProfile } = useLocalProfile(DEMO_VENUE_ID)

  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(
    profile?.allergenIds ?? []
  )
  const [showSelector, setShowSelector] = useState(false)
  const [showSavePrompt, setShowSavePrompt] = useState(false)
  const [promptDismissed, setPromptDismissed] = useState(false)
  const [savedConfirmation, setSavedConfirmation] = useState(!!profile)

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
    saveProfile(selectedAllergens, DEMO_VENUE_NAME, marketingConsent)
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

  const customerMask = buildMaskFromIds(selectedAllergens)

  const categorised = useMemo(() => {
    const cats: Record<string, (Dish & { safe: boolean })[]> = {}
    for (const dish of DEMO_DISHES) {
      const safe = isDishSafe(dish.allergenMask, customerMask)
      if (!cats[dish.category]) cats[dish.category] = []
      cats[dish.category].push({ ...dish, safe })
    }
    return cats
  }, [customerMask])

  const categoryOrder = ['Starters', 'Mains', 'Desserts']

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-gray-900">{DEMO_VENUE_NAME}</h1>
              <VerifiedBadge verifiedAt={new Date(Date.now() - 86400000 * 2).toISOString()} />
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
            venueName={DEMO_VENUE_NAME}
            allergenCount={selectedAllergens.length}
            onSave={handleSave}
            onDismiss={handleDismiss}
          />
        </div>
      )}

      <main className="max-w-lg mx-auto px-4 py-6">
        {categoryOrder.map((cat) => {
          const dishes = categorised[cat]
          if (!dishes) return null
          return (
            <section key={cat} className="mb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{cat}</h2>
              <div className="space-y-3">
                {dishes.map((dish) => (
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
        })}
      </main>
    </div>
  )
}
