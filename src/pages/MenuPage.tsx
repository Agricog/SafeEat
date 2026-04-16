import { useState, useMemo, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import AllergenSelector from '../components/AllergenSelector'
import AllergenBadge from '../components/AllergenBadge'
import VerifiedBadge from '../components/VerifiedBadge'
import SaveProfilePrompt from '../components/SaveProfilePrompt'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { isDishSafe, buildMaskFromIds, getIdsFromMask } from '../lib/allergens'
import { useLocalProfile } from '../hooks/useLocalProfile'
import { useLanguage } from '../lib/LanguageContext'

interface Dish {
  id: string
  name: string
  description: string
  pricePence: number
  allergenMask: number
  mayContainMask: number
  category: string
  isVegan: boolean
  isVegetarian: boolean
  isGlutenFree: boolean
  isDairyFree: boolean
  isHalal: boolean
  isKosher: boolean
  photoUrl: string
  calories: number | null
  proteinG: number | null
  carbsG: number | null
  fatG: number | null
  fibreG: number | null
  sugarG: number | null
  saltG: number | null
}

interface Venue {
  id: string
  name: string
  slug: string
  address: string
  showNutrition: boolean
  showReviewPrompt: boolean
  googleReviewUrl: string
  tripadvisorUrl: string
  crossContaminationNotice: string
}

interface MenuData {
  venue: Venue
  dishes: Dish[]
  verification: { verifiedAt: string; type: string } | null
}

function formatPrice(pence: number): string {
  return `\u00A3${(pence / 100).toFixed(2)}`
}

const DIETARY_FILTERS = [
  { key: 'isVegan', labelKey: 'Vegan', icon: '🌱' },
  { key: 'isVegetarian', labelKey: 'Vegetarian', icon: '🥕' },
  { key: 'isGlutenFree', labelKey: 'Gluten-free', icon: '🌾' },
  { key: 'isDairyFree', labelKey: 'Dairy-free', icon: '🥛' },
  { key: 'isHalal', labelKey: 'Halal' },
  { key: 'isKosher', labelKey: 'Kosher' },
] as const

export default function MenuPage() {
  const { venueId } = useParams<{ venueId: string }>()
  const [searchParams] = useSearchParams()
  const { t } = useLanguage()
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

  const venue = menuData?.venue
  const dishes = menuData?.dishes ?? []
  const verification = menuData?.verification
  const { profile, saveProfile, deleteProfile } = useLocalProfile(venue?.id ?? '')
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<Set<string>>(new Set())
  const [showSelector, setShowSelector] = useState(false)
  const [showSavePrompt, setShowSavePrompt] = useState(false)
  const [promptDismissed, setPromptDismissed] = useState(false)
  const [savedConfirmation, setSavedConfirmation] = useState(false)
  const [shareCopied, setShareCopied] = useState(false)
  const [deletingData, setDeletingData] = useState(false)
  const [deleteResult, setDeleteResult] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleDeleteProfile = async () => {
    if (!venue || !profile) return
    try {
      const res = await fetch(`/api/menu/${venue.slug}/profile`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: profile.email || '' }),
      })
      const data = await res.json()
      console.log('Server delete result:', data)
    } catch (err) {
      console.error('Server profile deletion failed:', err)
    }
    deleteProfile()
    setSelectedAllergens([])
    setPromptDismissed(false)
    setSavedConfirmation(false)
    setShowDeleteConfirm(false)
  }

  const handleDeleteByEmail = async () => {
    if (!venue) return
    const email = prompt(t('enterEmailPrompt'))
    if (!email || !email.includes('@')) return
    setDeletingData(true)
    setDeleteResult(null)
    try {
      const res = await fetch(`/api/menu/${venue.slug}/profile`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: email.trim() }),
      })
      const data = await res.json()
      if (data.deleted) {
        if (profile && profile.email && profile.email.trim().toLowerCase() === email.trim().toLowerCase()) {
          deleteProfile()
          setSelectedAllergens([])
          setPromptDismissed(false)
          setSavedConfirmation(false)
        }
        setDeleteResult(t('dataDeleted'))
      } else {
        setDeleteResult(t('noProfileFound'))
      }
    } catch {
      setDeleteResult(t('deleteFailed'))
    } finally {
      setDeletingData(false)
    }
  }

  // Load allergens from URL params (shareable link)
  const [urlAllergensApplied, setUrlAllergensApplied] = useState(false)
  useEffect(() => {
    if (urlAllergensApplied) return
    const allergenParam = searchParams.get('allergens')
    if (allergenParam && !profile) {
      const ids = allergenParam.split(',').filter((id) => id.trim())
      if (ids.length > 0) {
        setSelectedAllergens(ids)
        setUrlAllergensApplied(true)
      }
    }
  }, [searchParams, profile, urlAllergensApplied])

  useEffect(() => {
    if (profile) {
      setSelectedAllergens(profile.allergenIds)
      setSavedConfirmation(true)
    }
  }, [profile])

  const [selectorWasOpen, setSelectorWasOpen] = useState(false)
  useEffect(() => {
    if (showSelector) setSelectorWasOpen(true)
  }, [showSelector])

  useEffect(() => {
    if (selectorWasOpen && !showSelector && selectedAllergens.length > 0 && !profile && !promptDismissed && !savedConfirmation) {
      setShowSavePrompt(true)
      setSelectorWasOpen(false)
    }
  }, [showSelector, selectorWasOpen, selectedAllergens.length, profile, promptDismissed, savedConfirmation])

  const handleSave = (marketingConsent: boolean, email: string) => {
    if (!venue) return
    saveProfile(selectedAllergens, venue.name, marketingConsent, email)
    setShowSavePrompt(false)
    setSavedConfirmation(true)
    setTimeout(() => setSavedConfirmation(false), 30000)
  }

  const handleDismiss = () => {
    setShowSavePrompt(false)
    setPromptDismissed(true)
  }

  const handleDietaryToggle = (key: string) => {
    setActiveDietaryFilters((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handleShare = async () => {
    if (!venue || selectedAllergens.length === 0) return
    const url = `${window.location.origin}/menu/${venue.slug}?allergens=${selectedAllergens.join(',')}`
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${venue.name} - Safe menu`,
          text: `Check out the allergen-filtered menu at ${venue.name}`,
          url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      }
    } catch {
      try {
        await navigator.clipboard.writeText(url)
        setShareCopied(true)
        setTimeout(() => setShareCopied(false), 2000)
      } catch {
        prompt('Copy this link:', url)
      }
    }
  }

  const hasDietaryData = useMemo(
    () =>
      dishes.some((d) => d.isVegan || d.isVegetarian || d.isGlutenFree || d.isDairyFree || d.isHalal || d.isKosher),
    [dishes]
  )

  const customerMask = buildMaskFromIds(selectedAllergens)
  const categorised = useMemo(() => {
    const cats: Record<string, (Dish & { safe: boolean; mayContainConflict: boolean; dietaryMatch: boolean })[]> = {}
    for (const dish of dishes) {
      const safe = isDishSafe(dish.allergenMask, customerMask)
      const mayContainConflict = (dish.mayContainMask & customerMask) > 0
      let dietaryMatch = true
      for (const key of activeDietaryFilters) {
        if (!dish[key as keyof Dish]) {
          dietaryMatch = false
          break
        }
      }
      if (!cats[dish.category]) cats[dish.category] = []
      cats[dish.category].push({ ...dish, safe, mayContainConflict, dietaryMatch })
    }
    return cats
  }, [dishes, customerMask, activeDietaryFilters])

  const categoryOrder = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks']
  const hasActiveFilters = customerMask > 0 || activeDietaryFilters.size > 0

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-3">🍽️</div>
          <p className="text-sm text-gray-500">{t('loadingMenu')}</p>
        </div>
      </div>
    )
  }

  if (error || !venue) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="text-4xl mb-3">😕</div>
          <h1 className="text-lg font-bold text-gray-900 mb-1">
            {error === 'Venue not found' ? t('venueNotFound') : t('somethingWentWrong')}
          </h1>
          <p className="text-sm text-gray-500">
            {error === 'Venue not found' ? t('venueNotFoundBody') : t('tryAgain')}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold text-gray-900 truncate">{venue.name}</h1>
              <VerifiedBadge verifiedAt={verification?.verifiedAt ?? null} />
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <LanguageSwitcher />
              {selectedAllergens.length > 0 && (
                <button
                  onClick={handleShare}
                  className="px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                  title="Share filtered menu"
                >
                  {shareCopied ? t('copied') : t('share')}
                </button>
              )}
              {profile && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-2 py-1 rounded-full text-xs text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Delete saved profile"
                >
                  {t('deleteProfile')}
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
                  ? `${selectedAllergens.length} ${selectedAllergens.length > 1 ? t('allergens') : t('allergen')}`
                  : t('setAllergies')}
              </button>
            </div>
          </div>
          {showSelector && (
            <div className="mt-3 pb-1">
              <p className="text-xs text-gray-500 mb-2">{t('selectYourAllergens')}</p>
              <AllergenSelector selected={selectedAllergens} onChange={setSelectedAllergens} compact />
            </div>
          )}
          {hasDietaryData && (
            <div className="mt-3 flex flex-wrap gap-1.5 pb-1">
              {DIETARY_FILTERS.map((f) => {
                const hasFlag = dishes.some((d) => d[f.key as keyof Dish])
                if (!hasFlag) return null
                const active = activeDietaryFilters.has(f.key)
                return (
                  <button
                    key={f.key}
                    onClick={() => handleDietaryToggle(f.key)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      active
                        ? 'bg-se-green-50 border-se-green-300 text-se-green-800'
                        : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {'icon' in f && <span>{f.icon}</span>}
                    <span>{t(f.labelKey)}</span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </header>

      {urlAllergensApplied && !profile && (
        <div className="max-w-lg mx-auto">
          <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2">
            <span className="text-blue-500">i</span>
            <p className="text-sm text-blue-700">{t('preFilteredFromLink')}</p>
          </div>
        </div>
      )}

      {savedConfirmation && !showSavePrompt && (
        <div className="max-w-lg mx-auto">
          <div className="mx-4 mt-4 px-4 py-3 rounded-xl bg-se-green-50 border border-se-green-200 flex items-center gap-2">
            <span className="text-se-green-600">&#10003;</span>
            <p className="text-sm text-se-green-700 font-medium">{t('profileSaved')}</p>
          </div>
         {venue.showReviewPrompt && (venue.googleReviewUrl || venue.tripadvisorUrl) && (
            <div className="mx-4 mt-3 px-4 py-4 rounded-xl bg-white border border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {t('enjoying')} {venue.name}?
              </p>
              <p className="text-xs text-gray-500 mb-3">{t('reviewHelps')}</p>
              <div className="flex gap-2">
                {venue.googleReviewUrl && (
                  <a
                    href={venue.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium text-center hover:bg-blue-100 transition-colors"
                  >
                    {t('googleReview')}
                  </a>
                )}
                {venue.tripadvisorUrl && (
                  <a
                    href={venue.tripadvisorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-3 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium text-center hover:bg-green-100 transition-colors"
                  >
                    {t('tripadvisor')}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

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
        {/* Emergency notice */}
        <div className="mb-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
          <p className="text-sm font-semibold text-red-800 mb-0.5">{t('emergencyTitle')}</p>
          <p className="text-xs text-red-700">{t('emergencyBody')}</p>
        </div>

        {/* Venue cross-contamination notice */}
        {venue.crossContaminationNotice && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs font-semibold text-amber-800 mb-0.5">{t('kitchenNotice')}</p>
            <p className="text-xs text-amber-700">{venue.crossContaminationNotice}</p>
          </div>
        )}

        {dishes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('noDishes')}</p>
          </div>
        ) : (
          categoryOrder.map((cat) => {
            const catDishes = categorised[cat]
            if (!catDishes || catDishes.length === 0) return null
            return (
              <section key={cat} className="mb-8">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">{t(cat)}</h2>
                <div className="space-y-3">
                  {catDishes.map((dish) => {
                    const dimmed = hasActiveFilters && (!dish.safe || !dish.dietaryMatch)
                    return (
                      <div
                        key={dish.id}
                        className={`bg-white rounded-xl border p-4 transition-opacity ${
                          dimmed ? 'opacity-40 border-gray-100' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              {dish.photoUrl && (
                                <img
                                  src={dish.photoUrl}
                                  alt={dish.name}
                                  className="w-full h-40 rounded-lg object-cover mb-2"
                                />
                              )}
                              <h3 className="font-semibold text-gray-900">{dish.name}</h3>
                              {hasActiveFilters && dish.safe && dish.dietaryMatch && (
                                <span className="text-xs font-medium text-se-green-600 bg-se-green-50 px-1.5 py-0.5 rounded">
                                  {t('safe')}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mt-0.5">{dish.description}</p>
                            {(dish.isVegan ||
                              dish.isVegetarian ||
                              dish.isGlutenFree ||
                              dish.isDairyFree ||
                              dish.isHalal ||
                              dish.isKosher) && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {dish.isVegan && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                                    {t('Vegan')}
                                  </span>
                                )}
                                {dish.isVegetarian && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                                    {t('Vegetarian')}
                                  </span>
                                )}
                                {dish.isGlutenFree && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-medium">
                                    {t('Gluten-free')}
                                  </span>
                                )}
                                {dish.isDairyFree && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                    {t('Dairy-free')}
                                  </span>
                                )}
                                {dish.isHalal && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                                    {t('Halal')}
                                  </span>
                                )}
                                {dish.isKosher && (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium">
                                    {t('Kosher')}
                                  </span>
                                )}
                              </div>
                            )}
                            {dish.allergenMask > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {getIdsFromMask(dish.allergenMask).map((aid) => (
                                  <AllergenBadge key={aid} allergenId={aid} />
                                ))}
                              </div>
                            )}
                            {dish.mayContainMask > 0 && (
                              <div className="mt-2">
                                <p
                                  className={`text-xs font-medium mb-1 ${
                                    dish.mayContainConflict ? 'text-amber-700' : 'text-gray-500'
                                  }`}
                                >
                                  {t('mayContainLabel')}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {getIdsFromMask(dish.mayContainMask).map((aid) => (
                                    <AllergenBadge key={`mc-${aid}`} allergenId={aid} />
                                  ))}
                                </div>
                              </div>
                            )}
                            {venue.showNutrition && dish.calories != null && (
                              <div className="mt-2 text-xs text-gray-400">
                                <span className="font-medium text-gray-500">
                                  {dish.calories} {t('kcal')}
                                </span>
                                {dish.proteinG != null && (
                                  <span>
                                    {' '}
                                    - {dish.proteinG}g {t('protein')}
                                  </span>
                                )}
                                {dish.carbsG != null && (
                                  <span>
                                    {' '}
                                    - {dish.carbsG}g {t('carbs')}
                                  </span>
                                )}
                                {dish.fatG != null && (
                                  <span>
                                    {' '}
                                    - {dish.fatG}g {t('fat')}
                                  </span>
                                )}
                                {dish.fibreG != null && (
                                  <span>
                                    {' '}
                                    - {dish.fibreG}g {t('fibre')}
                                  </span>
                                )}
                                {dish.sugarG != null && (
                                  <span>
                                    {' '}
                                    - {dish.sugarG}g {t('sugar')}
                                  </span>
                                )}
                                {dish.saltG != null && (
                                  <span>
                                    {' '}
                                    - {dish.saltG}g {t('salt')}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            {formatPrice(dish.pricePence)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })
        )}

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-xl max-w-sm w-full p-5">
              <h3 className="text-base font-semibold text-gray-900 mb-2">{t('deleteProfileTitle')}</h3>
              <p className="text-sm text-gray-600 mb-4">{t('deleteProfileBody')}</p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteProfile}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  {t('delete')}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* GDPR data deletion link */}
        <div className="mt-12 pb-8 text-center">
          <button
            onClick={handleDeleteByEmail}
            disabled={deletingData}
            className="text-xs text-gray-400 hover:text-red-500 underline transition-colors disabled:opacity-50"
          >
            {deletingData ? t('deleting') : t('deleteMyData')}
          </button>
          {deleteResult && <p className="text-xs text-gray-500 mt-2">{deleteResult}</p>}
        </div>
      </main>
    </div>
  )
}
