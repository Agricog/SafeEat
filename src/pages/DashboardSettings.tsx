import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import QRCodeDisplay from '../components/QRCodeDisplay'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface VenueDetails {
  name: string
  address: string
  phone: string
  email: string
  showNutrition: boolean
  googleReviewUrl: string
  tripadvisorUrl: string
  showReviewPrompt: boolean
}

interface SubscriptionInfo {
  status: string
  subscriptionId: string | null
  customerId: string | null
}

const STATUS_LABELS: Record<string, { label: string; colour: string }> = {
  active: { label: 'Active', colour: 'bg-se-green-50 text-se-green-700' },
  trialing: { label: 'Free trial', colour: 'bg-blue-50 text-blue-700' },
  trial: { label: 'Free trial', colour: 'bg-blue-50 text-blue-700' },
  past_due: { label: 'Past due', colour: 'bg-amber-50 text-amber-700' },
  canceled: { label: 'Canceled', colour: 'bg-red-50 text-red-700' },
  unpaid: { label: 'Unpaid', colour: 'bg-red-50 text-red-700' },
}

export default function DashboardSettings() {
  const { request } = useApi()
  const { venueId, venueSlug } = useVenue()
  const [searchParams, setSearchParams] = useSearchParams()

  const [venue, setVenue] = useState<VenueDetails | null>(null)
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<VenueDetails>({
    name: '', address: '', phone: '', email: '', showNutrition: false,
    googleReviewUrl: '', tripadvisorUrl: '', showReviewPrompt: false,
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [billingLoading, setBillingLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [nutritionSaving, setNutritionSaving] = useState(false)
  const [reviewSaving, setReviewSaving] = useState(false)
  const [reviewEditing, setReviewEditing] = useState(false)
  const [reviewDraft, setReviewDraft] = useState({ googleReviewUrl: '', tripadvisorUrl: '' })

  const menuUrl = `${window.location.origin}/menu/${venueSlug}`
  const billingResult = searchParams.get('billing')

  useEffect(() => {
    if (billingResult) {
      setSearchParams({}, { replace: true })
    }
  }, [billingResult, setSearchParams])

  useEffect(() => {
    let cancelled = false
    Promise.all([
      request<{ venue: any }>(`/api/dashboard/${venueId}/venue`),
      request<SubscriptionInfo>(`/api/dashboard/${venueId}/subscription`),
    ])
      .then(([venueData, subData]) => {
        if (cancelled) return
        const v: VenueDetails = {
          name: venueData.venue.name || '',
          address: venueData.venue.address || '',
          phone: venueData.venue.phone || '',
          email: venueData.venue.email || '',
          showNutrition: venueData.venue.show_nutrition || false,
          googleReviewUrl: venueData.venue.google_review_url || '',
          tripadvisorUrl: venueData.venue.tripadvisor_url || '',
          showReviewPrompt: venueData.venue.show_review_prompt || false,
        }
        setVenue(v)
        setDraft(v)
        setReviewDraft({ googleReviewUrl: v.googleReviewUrl, tripadvisorUrl: v.tripadvisorUrl })
        setSubscription(subData)
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ venue: any }>(
        `/api/dashboard/${venueId}/venue`,
        { method: 'PUT', body: { name: draft.name, address: draft.address, phone: draft.phone, email: draft.email } }
      )
      const v: VenueDetails = {
        ...venue!,
        name: res.venue.name || '',
        address: res.venue.address || '',
        phone: res.venue.phone || '',
        email: res.venue.email || '',
      }
      setVenue(v)
      setDraft(v)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleNutritionToggle = async () => {
    if (!venue) return
    const newValue = !venue.showNutrition
    setNutritionSaving(true)
    setError(null)
    try {
      await request(`/api/dashboard/${venueId}/venue`, { method: 'PUT', body: { showNutrition: newValue } })
      setVenue({ ...venue, showNutrition: newValue })
      setDraft((prev) => ({ ...prev, showNutrition: newValue }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setNutritionSaving(false)
    }
  }

  const handleReviewToggle = async () => {
    if (!venue) return
    const newValue = !venue.showReviewPrompt
    setReviewSaving(true)
    setError(null)
    try {
      await request(`/api/dashboard/${venueId}/venue`, { method: 'PUT', body: { showReviewPrompt: newValue } })
      setVenue({ ...venue, showReviewPrompt: newValue })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setReviewSaving(false)
    }
  }

  const handleReviewUrlsSave = async () => {
    if (!venue) return
    setReviewSaving(true)
    setError(null)
    try {
      await request(`/api/dashboard/${venueId}/venue`, {
        method: 'PUT',
        body: { googleReviewUrl: reviewDraft.googleReviewUrl, tripadvisorUrl: reviewDraft.tripadvisorUrl },
      })
      setVenue({ ...venue, googleReviewUrl: reviewDraft.googleReviewUrl, tripadvisorUrl: reviewDraft.tripadvisorUrl })
      setReviewEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setReviewSaving(false)
    }
  }

  const handleCancel = () => {
    if (venue) setDraft(venue)
    setEditing(false)
  }

  const handleSubscribe = async () => {
    setBillingLoading(true)
    setError(null)
    try {
      const res = await request<{ url: string }>(`/api/dashboard/${venueId}/billing/checkout`, { method: 'POST' })
      window.location.href = res.url
    } catch (err: any) {
      setError(err.message)
      setBillingLoading(false)
    }
  }

  const handleManageBilling = async () => {
    setBillingLoading(true)
    setError(null)
    try {
      const res = await request<{ url: string }>(`/api/dashboard/${venueId}/billing/portal`, { method: 'POST' })
      window.location.href = res.url
    } catch (err: any) {
      setError(err.message)
      setBillingLoading(false)
    }
  }

  const subStatus = STATUS_LABELS[subscription?.status || 'trial'] || STATUS_LABELS.trial
  const hasSubscription = subscription?.subscriptionId !== null

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
      )}
      {billingResult === 'success' && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-se-green-50 border border-se-green-200 flex items-center gap-2">
          <span className="text-se-green-600">&#10003;</span>
          <p className="text-sm text-se-green-700 font-medium">Subscription activated! Welcome to SafeEat.</p>
        </div>
      )}
      {saved && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-se-green-50 border border-se-green-200 flex items-center gap-2">
          <span className="text-se-green-600">&#10003;</span>
          <p className="text-sm text-se-green-700 font-medium">Settings saved</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left column */}
        <div>
          {/* Venue details */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Venue details</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Venue name</label>
                  <input type="text" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Address</label>
                  <input type="text" value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone</label>
                  <input type="tel" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={handleSave} disabled={saving}
                    className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50">
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={handleCancel}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-2 mb-4">
                  <div><p className="text-xs text-gray-400">Venue name</p><p className="text-sm font-medium text-gray-900">{venue?.name || '-'}</p></div>
                  <div><p className="text-xs text-gray-400">Address</p><p className="text-sm text-gray-700">{venue?.address || '-'}</p></div>
                  <div><p className="text-xs text-gray-400">Phone</p><p className="text-sm text-gray-700">{venue?.phone || '-'}</p></div>
                  <div><p className="text-xs text-gray-400">Email</p><p className="text-sm text-gray-700">{venue?.email || '-'}</p></div>
                </div>
                <button onClick={() => setEditing(true)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                  Edit details
                </button>
              </div>
            )}
          </div>

          {/* Menu display settings */}
          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Menu display</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Show nutrition information</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Display calories, protein, carbs, fat, fibre, sugar, and salt on your customer-facing menu.
                  Only shown for dishes where you've entered nutrition data.
                </p>
              </div>
              <button onClick={handleNutritionToggle} disabled={nutritionSaving}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ml-4 ${
                  venue?.showNutrition ? 'bg-se-green-600' : 'bg-gray-300'
                } ${nutritionSaving ? 'opacity-50' : ''}`}
                role="switch" aria-checked={venue?.showNutrition}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  venue?.showNutrition ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Review prompt settings */}
          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Customer reviews</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Show review prompt</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  After a customer saves their allergen profile, prompt them to leave a Google or TripAdvisor review.
                </p>
              </div>
              <button onClick={handleReviewToggle} disabled={reviewSaving}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ml-4 ${
                  venue?.showReviewPrompt ? 'bg-se-green-600' : 'bg-gray-300'
                } ${reviewSaving ? 'opacity-50' : ''}`}
                role="switch" aria-checked={venue?.showReviewPrompt}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  venue?.showReviewPrompt ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {reviewEditing ? (
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Google Review URL</label>
                  <input type="url" value={reviewDraft.googleReviewUrl}
                    onChange={(e) => setReviewDraft({ ...reviewDraft, googleReviewUrl: e.target.value })}
                    placeholder="https://g.page/r/your-venue/review"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
                  <p className="text-xs text-gray-400 mt-1">Find this in Google Business Profile &gt; Get more reviews</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">TripAdvisor URL</label>
                  <input type="url" value={reviewDraft.tripadvisorUrl}
                    onChange={(e) => setReviewDraft({ ...reviewDraft, tripadvisorUrl: e.target.value })}
                    placeholder="https://www.tripadvisor.co.uk/Restaurant_Review-..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent" />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleReviewUrlsSave} disabled={reviewSaving}
                    className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50">
                    {reviewSaving ? 'Saving...' : 'Save URLs'}
                  </button>
                  <button onClick={() => { setReviewEditing(false); setReviewDraft({ googleReviewUrl: venue?.googleReviewUrl || '', tripadvisorUrl: venue?.tripadvisorUrl || '' }) }}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100">
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${venue?.googleReviewUrl ? 'bg-se-green-500' : 'bg-gray-300'}`} />
                    <span className="text-xs text-gray-600">
                      Google: {venue?.googleReviewUrl ? 'configured' : 'not set'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${venue?.tripadvisorUrl ? 'bg-se-green-500' : 'bg-gray-300'}`} />
                    <span className="text-xs text-gray-600">
                      TripAdvisor: {venue?.tripadvisorUrl ? 'configured' : 'not set'}
                    </span>
                  </div>
                </div>
                <button onClick={() => setReviewEditing(true)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                  Edit review URLs
                </button>
              </div>
            )}
          </div>

          {/* Subscription */}
          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Subscription</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">SafeEat Starter</p>
                <p className="text-xs text-gray-500">29.99/month</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${subStatus.colour}`}>
                {subStatus.label}
              </span>
            </div>
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>Unlimited menu items</p>
              <p>Customer allergen profiles</p>
              <p>Weekly verification & audit trail</p>
              <p>QR code for your menu</p>
              <p>Push notifications to opted-in customers</p>
              <p>Dietary preference filters</p>
              <p>Calorie & nutrition display</p>
              <p>Ingredient auto-detection</p>
              <p>EHO inspection report PDF</p>
              <p>Menu scan analytics</p>
              <p>Customer review prompts</p>
            </div>
            <div className="flex gap-2">
              {!hasSubscription ? (
                <button onClick={handleSubscribe} disabled={billingLoading}
                  className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50">
                  {billingLoading ? 'Redirecting...' : 'Subscribe now'}
                </button>
              ) : (
                <button onClick={handleManageBilling} disabled={billingLoading}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-colors disabled:opacity-50">
                  {billingLoading ? 'Loading...' : 'Manage billing'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right column - QR Code */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Your menu QR code</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <QRCodeDisplay url={menuUrl} size={220} label="Scan to see the allergen-filtered menu" />
            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(menuUrl)}&margin=8&format=png`
                  link.download = 'safeeat-qr-code.png'
                  link.click()
                }}
                className="w-full px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors">
                Download QR code (PNG)
              </button>
              <button onClick={() => navigator.clipboard.writeText(menuUrl)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                Copy menu link
              </button>
            </div>
          </div>

          {/* Placement tips */}
          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Where to put it</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <p><span className="font-medium text-gray-900">Front window</span> - catches allergy-aware customers walking past</p>
              </div>
              <div className="flex items-start gap-2">
                <p><span className="font-medium text-gray-900">On each table</span> - table tent or sticker, scan before ordering</p>
              </div>
              <div className="flex items-start gap-2">
                <p><span className="font-medium text-gray-900">Paper menus</span> - print the QR at the bottom of your existing menu</p>
              </div>
              <div className="flex items-start gap-2">
                <p><span className="font-medium text-gray-900">Social media</span> - share the link in your bio or stories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
