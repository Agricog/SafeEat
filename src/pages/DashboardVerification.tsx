import { useState, useEffect } from 'react'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface VerificationEntry {
  id: string
  verified_at: string
  type: 'confirmed' | 'updated' | 'missed'
  note: string
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

function daysSince(iso: string): number {
  return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
}

export default function DashboardVerification() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [log, setLog] = useState<VerificationEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showConfirmForm, setShowConfirmForm] = useState(false)
  const [note, setNote] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    request<{ verifications: VerificationEntry[] }>(`/api/dashboard/${venueId}/verifications`)
      .then((data) => { if (!cancelled) setLog(data.verifications) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleConfirm = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ verification: VerificationEntry }>(
        `/api/dashboard/${venueId}/verifications`,
        {
          method: 'POST',
          body: {
            type: hasChanges ? 'updated' : 'confirmed',
            note: hasChanges
              ? (note.trim() || 'Menu updated — changes made')
              : 'Menu confirmed — no changes',
          },
        }
      )
      setLog([res.verification, ...log])
      setShowConfirmForm(false)
      setNote('')
      setHasChanges(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const lastVerified = log.find((e) => e.type !== 'missed')
  const daysSinceVerified = lastVerified ? daysSince(lastVerified.verified_at) : 999

  let statusColour: string
  let statusBg: string
  let statusDot: string
  let statusText: string

  if (daysSinceVerified <= 7) {
    statusColour = 'text-se-green-700'
    statusBg = 'bg-se-green-50 border-se-green-200'
    statusDot = 'bg-se-green-500'
    statusText = `Verified ${daysSinceVerified === 0 ? 'today' : daysSinceVerified === 1 ? 'yesterday' : `${daysSinceVerified} days ago`}`
  } else if (daysSinceVerified <= 14) {
    statusColour = 'text-amber-700'
    statusBg = 'bg-amber-50 border-amber-200'
    statusDot = 'bg-amber-500'
    statusText = `Verified ${daysSinceVerified} days ago — due for review`
  } else {
    statusColour = 'text-red-700'
    statusBg = 'bg-red-50 border-red-200'
    statusDot = 'bg-red-500'
    statusText = `Overdue — last verified ${daysSinceVerified} days ago`
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
      <h2 className="text-xl font-bold text-gray-900 mb-6">Menu Verification</h2>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Current status */}
      <div className={`rounded-xl border p-5 mb-6 ${statusBg}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`w-2 h-2 rounded-full ${statusDot}`} />
              <p className={`text-sm font-semibold ${statusColour}`}>{statusText}</p>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Your customers see a "Verified" badge with this date. Weekly verification keeps their trust
              and gives you an audit trail for EHO inspections.
            </p>
          </div>
          {!showConfirmForm && (
            <button
              onClick={() => setShowConfirmForm(true)}
              className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Verify now
            </button>
          )}
        </div>

        {showConfirmForm && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Has your menu changed since last verification?
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setHasChanges(false)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  !hasChanges
                    ? 'bg-se-green-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                No changes
              </button>
              <button
                onClick={() => setHasChanges(true)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  hasChanges
                    ? 'bg-amber-500 text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Yes, changes made
              </button>
            </div>

            {hasChanges && (
              <div className="mb-3">
                <label className="block text-xs text-gray-500 mb-1">
                  Briefly describe what changed (for your audit trail)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Changed bread supplier — now contains sesame"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleConfirm}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Confirm verification'}
              </button>
              <button
                onClick={() => { setShowConfirmForm(false); setHasChanges(false); setNote('') }}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Verification log */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Verification history</h3>
        <p className="text-xs text-gray-400 mb-3">
          This log is your FSA audit trail. It shows every verification, update, and missed review.
        </p>
        {log.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            <p className="text-sm text-gray-500">No verifications yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {log.map((entry) => (
              <div key={entry.id} className="px-4 py-3 flex items-start gap-3">
                <div className="mt-1 flex-shrink-0">
                  {entry.type === 'confirmed' && (
                    <span className="w-5 h-5 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-xs">✓</span>
                  )}
                  {entry.type === 'updated' && (
                    <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs">↻</span>
                  )}
                  {entry.type === 'missed' && (
                    <span className="w-5 h-5 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs">!</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{entry.note}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {formatDate(entry.verified_at)} at {formatTime(entry.verified_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
