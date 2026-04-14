import { useState, useEffect } from 'react'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

const ALLERGEN_OPTIONS = [
  { id: 'celery', label: 'Celery' },
  { id: 'gluten', label: 'Gluten' },
  { id: 'crustaceans', label: 'Crustaceans' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'fish', label: 'Fish' },
  { id: 'lupin', label: 'Lupin' },
  { id: 'milk', label: 'Milk' },
  { id: 'molluscs', label: 'Molluscs' },
  { id: 'mustard', label: 'Mustard' },
  { id: 'tree_nuts', label: 'Tree nuts' },
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'sesame', label: 'Sesame' },
  { id: 'soybeans', label: 'Soya' },
  { id: 'sulphites', label: 'Sulphites' },
]

interface NotificationStats {
  total: number
  allergenCounts: Record<string, number>
}

interface NotificationEntry {
  id: number
  subject: string
  message: string
  allergen_filter: string | null
  dietary_filter: string | null
  recipients_count: number
  sent_at: string
}

export default function DashboardNotifications() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [stats, setStats] = useState<NotificationStats | null>(null)
  const [history, setHistory] = useState<NotificationEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Form state
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [allergenFilter, setAllergenFilter] = useState<string>('all')
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState<{ sent: number; total: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      request<{ total: number; allergenCounts: Record<string, number> }>(
        `/api/dashboard/${venueId}/notifications/stats`
      ),
      request<{ notifications: NotificationEntry[] }>(
        `/api/dashboard/${venueId}/notifications`
      ),
    ])
      .then(([statsData, histData]) => {
        setStats(statsData)
        setHistory(histData.notifications)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [request, venueId])

  const audienceCount = (): number => {
    if (!stats) return 0
    if (allergenFilter === 'all') return stats.total
    return stats.allergenCounts[allergenFilter] || 0
  }

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      setError('Subject and message are required')
      return
    }
    const count = audienceCount()
    if (count === 0) {
      setError('No customers match this filter')
      return
    }
    if (!confirm(`Send "${subject}" to ${count} customer${count !== 1 ? 's' : ''}?`)) {
      return
    }
    setSending(true)
    setError(null)
    setResult(null)
    try {
      const data = await request<{ sent: number; total: number }>(
        `/api/dashboard/${venueId}/notifications`,
        {
          method: 'POST',
          body: {
            subject,
            message,
            allergenFilter: allergenFilter === 'all' ? null : allergenFilter,
          },
        }
      )
      setResult(data)
      setSubject('')
      setMessage('')
      setAllergenFilter('all')
      // Refresh history
      const histData = await request<{ notifications: NotificationEntry[] }>(
        `/api/dashboard/${venueId}/notifications`
      )
      setHistory(histData.notifications)
    } catch (err: any) {
      setError(err.message || 'Failed to send notification')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-se-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-1">Customer Notifications</h1>
      <p className="text-sm text-gray-500 mb-6">
        Send targeted updates to customers who saved their allergen profile and opted in to marketing.
      </p>

      {/* Audience overview */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Your audience</h2>
        {stats && stats.total > 0 ? (
          <>
            <p className="text-sm text-gray-600 mb-3">
              <span className="text-2xl font-bold text-se-green-600">{stats.total}</span>{' '}
              customer{stats.total !== 1 ? 's' : ''} opted in for notifications
            </p>
            <div className="flex flex-wrap gap-2">
              {ALLERGEN_OPTIONS.filter((a) => stats.allergenCounts[a.id] > 0).map((a) => (
                <span
                  key={a.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-50 rounded-full text-xs text-gray-600"
                >
                  {a.label}
                  <span className="font-semibold text-gray-900">{stats.allergenCounts[a.id]}</span>
                </span>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-3xl mb-2">📭</div>
            <p className="text-sm text-gray-500">
              No customers have opted in yet. When customers save their allergen profile on your
              menu page and tick "receive updates", they'll appear here.
            </p>
          </div>
        )}
      </div>

      {/* Compose notification */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Compose notification</h2>

        <div className="space-y-4">
          {/* Target audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Send to customers with
            </label>
            <select
              value={allergenFilter}
              onChange={(e) => setAllergenFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-se-green-500 focus:border-se-green-500"
            >
              <option value="all">All opted-in customers ({stats?.total || 0})</option>
              {ALLERGEN_OPTIONS.filter((a) => stats?.allergenCounts[a.id]).map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} allergy ({stats?.allergenCounts[a.id] || 0} customer{(stats?.allergenCounts[a.id] || 0) !== 1 ? 's' : ''})
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. New gluten-free options on our menu!"
              maxLength={200}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-se-green-500 focus:border-se-green-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here. Keep it short and relevant — tell customers what's new, what's safe for them, or invite them back."
              maxLength={2000}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-se-green-500 focus:border-se-green-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{message.length}/2000 characters</p>
          </div>

          {/* Preview count */}
          {subject && message && (
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                This will be sent to{' '}
                <span className="font-bold">{audienceCount()}</span>{' '}
                customer{audienceCount() !== 1 ? 's' : ''}.
                {allergenFilter !== 'all' && (
                  <span>
                    {' '}Filtered by: {ALLERGEN_OPTIONS.find((a) => a.id === allergenFilter)?.label} allergy.
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Success */}
          {result && (
            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-sm text-green-700">
                Sent successfully to {result.sent} of {result.total} customer{result.total !== 1 ? 's' : ''}.
              </p>
            </div>
          )}

          {/* Send button */}
          <button
            onClick={handleSend}
            disabled={sending || !subject.trim() || !message.trim() || audienceCount() === 0}
            className="w-full py-2.5 rounded-lg bg-se-green-600 text-white text-sm font-semibold hover:bg-se-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? 'Sending…' : `Send to ${audienceCount()} customer${audienceCount() !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>

      {/* Notification history */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Notification history</h2>

        {history.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-6">
            No notifications sent yet. Compose your first one above.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((n) => (
              <div key={n.id} className="border border-gray-100 rounded-lg p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{n.subject}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{n.message}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center px-2 py-0.5 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                      {n.recipients_count} sent
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span>{new Date(n.sent_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                  {n.allergen_filter && (
                    <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 rounded">
                      {ALLERGEN_OPTIONS.find((a) => a.id === n.allergen_filter)?.label || n.allergen_filter}
                    </span>
                  )}
                  {!n.allergen_filter && (
                    <span className="px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded">All customers</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
