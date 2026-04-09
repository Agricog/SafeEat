import { useState } from 'react'

interface VerificationEntry {
  id: string
  timestamp: string
  type: 'confirmed' | 'updated' | 'missed'
  note: string
}

const DEMO_LOG: VerificationEntry[] = [
  { id: '5', timestamp: '2026-04-07T09:15:00Z', type: 'confirmed', note: 'Menu confirmed — no changes' },
  { id: '4', timestamp: '2026-03-31T10:02:00Z', type: 'updated', note: 'Swapped milk supplier for Brownie — allergens unchanged' },
  { id: '3', timestamp: '2026-03-24T08:45:00Z', type: 'confirmed', note: 'Menu confirmed — no changes' },
  { id: '2', timestamp: '2026-03-17T11:30:00Z', type: 'missed', note: 'Verification missed — reminder sent' },
  { id: '1', timestamp: '2026-03-10T09:00:00Z', type: 'confirmed', note: 'Menu confirmed — no changes' },
]

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
  const [log, setLog] = useState<VerificationEntry[]>(DEMO_LOG)
  const [showConfirmForm, setShowConfirmForm] = useState(false)
  const [note, setNote] = useState('')
  const [hasChanges, setHasChanges] = useState(false)

  const lastVerified = log.find((e) => e.type !== 'missed')
  const daysSinceVerified = lastVerified ? daysSince(lastVerified.timestamp) : 999

  const handleConfirm = () => {
    const entry: VerificationEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      type: hasChanges ? 'updated' : 'confirmed',
      note: hasChanges
        ? (note.trim() || 'Menu updated — changes made')
        : 'Menu confirmed — no changes',
    }
    setLog([entry, ...log])
    setShowConfirmForm(false)
    setNote('')
    setHasChanges(false)
  }

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

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Menu Verification</h2>

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

        {/* Confirm form */}
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
                className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
              >
                Confirm verification
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
                  {formatDate(entry.timestamp)} at {formatTime(entry.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
