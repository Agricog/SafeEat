import { useState, useEffect } from 'react'
import QRCodeDisplay from '../components/QRCodeDisplay'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface VenueDetails {
  name: string
  address: string
  phone: string
  email: string
}

export default function DashboardSettings() {
  const { request } = useApi()
  const { venueId, venueSlug } = useVenue()

  const [venue, setVenue] = useState<VenueDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<VenueDetails>({ name: '', address: '', phone: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const menuUrl = `${window.location.origin}/menu/${venueSlug}`

  useEffect(() => {
    let cancelled = false
    request<{ venue: { name: string; address: string; phone: string; email: string } }>(
      `/api/dashboard/${venueId}/venue`
    )
      .then((data) => {
        if (cancelled) return
        const v = {
          name: data.venue.name || '',
          address: data.venue.address || '',
          phone: data.venue.phone || '',
          email: data.venue.email || '',
        }
        setVenue(v)
        setDraft(v)
      })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleSave = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ venue: { name: string; address: string; phone: string; email: string } }>(
        `/api/dashboard/${venueId}/venue`,
        { method: 'PUT', body: draft }
      )
      const v = {
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

  const handleCancel = () => {
    if (venue) setDraft(venue)
    setEditing(false)
  }

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
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-se-green-50 border border-se-green-200 flex items-center gap-2">
          <span className="text-se-green-600">✓</span>
          <p className="text-sm text-se-green-700 font-medium">Settings saved</p>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Venue details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Venue details</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Venue name</label>
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Address</label>
                  <input
                    type="text"
                    value={draft.address}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving…' : 'Save'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Venue name</p>
                    <p className="text-sm font-medium text-gray-900">{venue?.name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-sm text-gray-700">{venue?.address || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-sm text-gray-700">{venue?.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-sm text-gray-700">{venue?.email || '—'}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  Edit details
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
                <p className="text-xs text-gray-500">£9.99/month</p>
              </div>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-se-green-50 text-se-green-700">
                Active
              </span>
            </div>
            <div className="text-xs text-gray-500 space-y-1 mb-4">
              <p>✓ Unlimited menu items</p>
              <p>✓ Customer allergen profiles</p>
              <p>✓ Weekly verification & audit trail</p>
              <p>✓ QR code for your menu</p>
              <p>✓ Push notifications to opted-in customers</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200 transition-colors">
                Manage billing
              </button>
              <button className="px-3 py-1.5 rounded-lg text-gray-400 text-xs font-medium hover:text-red-500 hover:bg-red-50 transition-colors">
                Cancel plan
              </button>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Your menu QR code</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <QRCodeDisplay
              url={menuUrl}
              size={220}
              label="Scan to see the allergen-filtered menu"
            />
            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  const link = document.createElement('a')
                  link.href = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(menuUrl)}&margin=8&format=png`
                  link.download = 'safeeat-qr-code.png'
                  link.click()
                }}
                className="w-full px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
              >
                Download QR code (PNG)
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(menuUrl)}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Copy menu link
              </button>
            </div>
          </div>

          {/* Placement tips */}
          <h3 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Where to put it</h3>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-base">🪟</span>
                <p><span className="font-medium text-gray-900">Front window</span> — catches allergy-aware customers walking past</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">📋</span>
                <p><span className="font-medium text-gray-900">On each table</span> — table tent or sticker, scan before ordering</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">🧾</span>
                <p><span className="font-medium text-gray-900">Paper menus</span> — print the QR at the bottom of your existing menu</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-base">💬</span>
                <p><span className="font-medium text-gray-900">Social media</span> — share the link in your bio or stories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
