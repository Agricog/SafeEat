import { useState, useEffect } from 'react'
import { useApi } from '../lib/api'
import { useVenue } from '../lib/VenueContext'

interface TrainingEntry {
  id: number
  staff_name: string
  training_type: string
  certificate_ref: string
  trained_at: string
  recorded_at: string
}

const TRAINING_TYPES: Record<string, string> = {
  allergen_awareness: 'Allergen Awareness',
  food_safety_l2: 'Food Safety Level 2',
  food_safety_l3: 'Food Safety Level 3',
  anaphylaxis: 'Anaphylaxis Training',
  other: 'Other',
}

export default function DashboardTraining() {
  const { request } = useApi()
  const { venueId } = useVenue()

  const [entries, setEntries] = useState<TrainingEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [staffName, setStaffName] = useState('')
  const [trainingType, setTrainingType] = useState('allergen_awareness')
  const [certificateRef, setCertificateRef] = useState('')
  const [trainedAt, setTrainedAt] = useState(new Date().toISOString().slice(0, 10))
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    request<{ training: TrainingEntry[] }>(`/api/dashboard/${venueId}/training`)
      .then((data) => { if (!cancelled) setEntries(data.training) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleAdd = async () => {
    if (!staffName.trim()) { setError('Staff name is required'); return }
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ entry: TrainingEntry }>(
        `/api/dashboard/${venueId}/training`,
        {
          method: 'POST',
          body: {
            staffName: staffName.trim(),
            trainingType,
            certificateRef: certificateRef.trim(),
            trainedAt,
          },
        }
      )
      setEntries([res.entry, ...entries])
      setShowForm(false)
      setStaffName('')
      setCertificateRef('')
      setTrainingType('allergen_awareness')
      setTrainedAt(new Date().toISOString().slice(0, 10))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    setError(null)
    try {
      await request(`/api/dashboard/${venueId}/training/${id}`, { method: 'DELETE' })
      setEntries(entries.filter((e) => e.id !== id))
      setDeleteConfirm(null)
    } catch (err: any) {
      setError(err.message)
    }
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
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold text-gray-900">Staff Training</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
          >
            + Add record
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Record staff allergen and food safety training. This is included in your EHO inspection report.
      </p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">{error}</div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">New training record</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Staff member name</label>
              <input
                type="text"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                placeholder="e.g. John Smith"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Training type</label>
              <select
                value={trainingType}
                onChange={(e) => setTrainingType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
              >
                {Object.entries(TRAINING_TYPES).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Certificate reference (optional)</label>
              <input
                type="text"
                value={certificateRef}
                onChange={(e) => setCertificateRef(e.target.value)}
                placeholder="e.g. CIEH-2026-12345"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date completed</label>
              <input
                type="date"
                value={trainedAt}
                onChange={(e) => setTrainedAt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleAdd}
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save record'}
              </button>
              <button
                onClick={() => { setShowForm(false); setError(null) }}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {entries.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="text-3xl mb-2">📋</div>
          <p className="text-sm text-gray-500">No training records yet.</p>
          <p className="text-xs text-gray-400 mt-1">
            EHOs ask for evidence of allergen training. Add records here and they'll appear in your EHO inspection report.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {entries.map((entry) => (
            <div key={entry.id} className="px-4 py-3 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">{entry.staff_name}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {TRAINING_TYPES[entry.training_type] || entry.training_type}
                  {entry.certificate_ref && (
                    <span className="text-gray-400"> - Ref: {entry.certificate_ref}</span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Completed: {new Date(entry.trained_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <div className="flex-shrink-0">
                {deleteConfirm === entry.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="px-2 py-1 rounded text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-2 py-1 rounded text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(entry.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-xs"
                  >
                    x
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
