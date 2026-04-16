import { useState, useEffect } from 'react'
import { useApi } from '../../lib/api'
import { useVenue } from '../../lib/VenueContext'
import { ALLERGENS } from '../../lib/allergens'

interface Incident {
  id: number
  incident_date: string
  dish_id: string | null
  dish_name: string
  customer_description: string
  allergens_involved: string
  severity: string
  outcome: string
  actions_taken: string
  reported_to_eho: boolean
  created_at: string
}

interface Dish {
  id: string
  name: string
  category: string
  active: boolean
}

const SEVERITY_OPTIONS = [
  { value: 'mild', label: 'Mild', colour: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { value: 'moderate', label: 'Moderate', colour: 'bg-orange-50 text-orange-700 border-orange-200' },
  { value: 'severe', label: 'Severe', colour: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'anaphylaxis', label: 'Anaphylaxis', colour: 'bg-red-100 text-red-800 border-red-300' },
]

function severityBadge(severity: string) {
  const opt = SEVERITY_OPTIONS.find((s) => s.value === severity) || SEVERITY_OPTIONS[0]
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${opt.colour}`}>
      {opt.label}
    </span>
  )
}

export default function IncidentLog() {
  const { request } = useApi()
  const { venueId } = useVenue()
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [incidentDate, setIncidentDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [dishId, setDishId] = useState('')
  const [dishName, setDishName] = useState('')
  const [customerDescription, setCustomerDescription] = useState('')
  const [allergensInvolved, setAllergensInvolved] = useState<string[]>([])
  const [severity, setSeverity] = useState('mild')
  const [outcome, setOutcome] = useState('')
  const [actionsTaken, setActionsTaken] = useState('')
  const [reportedToEho, setReportedToEho] = useState(false)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      request<{ incidents: Incident[] }>(`/api/dashboard/${venueId}/incidents`),
      request<{ dishes: any[] }>(`/api/dashboard/${venueId}/dishes`),
    ])
      .then(([incData, dishData]) => {
        if (cancelled) return
        setIncidents(incData.incidents)
        setDishes(dishData.dishes.map((d: any) => ({ id: d.id, name: d.name, category: d.category, active: d.active })))
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [request, venueId])

  const handleDishSelect = (id: string) => {
    setDishId(id)
    if (id) {
      const dish = dishes.find((d) => d.id === id)
      if (dish) setDishName(dish.name)
    }
  }

  const handleAllergenToggle = (allergenId: string) => {
    setAllergensInvolved((prev) =>
      prev.includes(allergenId) ? prev.filter((a) => a !== allergenId) : [...prev, allergenId]
    )
  }

  const resetForm = () => {
    setIncidentDate(new Date().toISOString().slice(0, 10))
    setDishId('')
    setDishName('')
    setCustomerDescription('')
    setAllergensInvolved([])
    setSeverity('mild')
    setOutcome('')
    setActionsTaken('')
    setReportedToEho(false)
  }

  const handleSubmit = async () => {
    if (!dishName.trim()) {
      setError('Dish name is required')
      return
    }
    setSaving(true)
    setError(null)
    try {
      const res = await request<{ incident: Incident }>(`/api/dashboard/${venueId}/incidents`, {
        method: 'POST',
        body: {
          incidentDate,
          dishId: dishId || null,
          dishName: dishName.trim(),
          customerDescription: customerDescription.trim(),
          allergensInvolved: allergensInvolved.join(', '),
          severity,
          outcome: outcome.trim(),
          actionsTaken: actionsTaken.trim(),
          reportedToEho,
        },
      })
      setIncidents([res.incident, ...incidents])
      setShowForm(false)
      resetForm()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Incident Log</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {incidents.length} {incidents.length === 1 ? 'incident' : 'incidents'} recorded
          </p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
          >
            + Log incident
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
          <button onClick={() => setError(null)} className="ml-2 text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {/* New incident form */}
      {showForm && (
        <div className="mb-6 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Log new incident</h3>
          <div className="space-y-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Date of incident</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500"
              />
            </div>

            {/* Dish */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Dish involved</label>
              <select
                value={dishId}
                onChange={(e) => handleDishSelect(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500"
              >
                <option value="">Select a dish or type below</option>
                {dishes.filter((d) => d.active).map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
              <input
                type="text"
                value={dishName}
                onChange={(e) => { setDishName(e.target.value); setDishId('') }}
                placeholder="Or type dish name manually"
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500"
              />
            </div>

            {/* Allergens involved */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Allergens involved</label>
              <div className="flex flex-wrap gap-1.5">
                {ALLERGENS.map((a) => {
                  const active = allergensInvolved.includes(a.id)
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => handleAllergenToggle(a.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-colors ${
                        active
                          ? 'border-se-green-600 bg-se-green-50 text-se-green-700'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      <span>{a.icon}</span>
                      <span>{a.shortLabel}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Severity */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Severity</label>
              <div className="flex gap-2">
                {SEVERITY_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setSeverity(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      severity === opt.value
                        ? opt.colour
                        : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer description */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Customer description</label>
              <textarea
                value={customerDescription}
                onChange={(e) => setCustomerDescription(e.target.value)}
                placeholder="What symptoms did the customer report?"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 resize-none"
              />
            </div>

            {/* Outcome */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Outcome</label>
              <textarea
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                placeholder="What happened? e.g. Customer recovered, ambulance called"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 resize-none"
              />
            </div>

            {/* Actions taken */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Actions taken</label>
              <textarea
                value={actionsTaken}
                onChange={(e) => setActionsTaken(e.target.value)}
                placeholder="What did you do in response? e.g. Updated menu, retrained staff"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 resize-none"
              />
            </div>

            {/* Reported to EHO */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={reportedToEho}
                onChange={(e) => setReportedToEho(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-se-green-600 focus:ring-se-green-500"
              />
              <span className="text-sm text-gray-700">Reported to Environmental Health Officer</span>
            </label>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Log incident'}
              </button>
              <button
                onClick={() => { setShowForm(false); resetForm() }}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Incident list */}
      {incidents.length === 0 && !showForm ? (
        <div className="text-center py-12">
          <div className="text-3xl mb-3">📋</div>
          <p className="text-sm text-gray-500">No incidents recorded.</p>
          <p className="text-xs text-gray-400 mt-1">
            Log any allergic reactions here to maintain a defensible record for EHO inspections.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {incidents.map((inc) => (
            <div key={inc.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{inc.dish_name}</h4>
                  {severityBadge(inc.severity)}
                  {inc.reported_to_eho && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                      EHO notified
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {new Date(inc.incident_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              {inc.allergens_involved && (
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-600">Allergens:</span> {inc.allergens_involved}
                </p>
              )}
              {inc.customer_description && (
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-600">Customer:</span> {inc.customer_description}
                </p>
              )}
              {inc.outcome && (
                <p className="text-xs text-gray-500 mb-1">
                  <span className="font-medium text-gray-600">Outcome:</span> {inc.outcome}
                </p>
              )}
              {inc.actions_taken && (
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-600">Actions:</span> {inc.actions_taken}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* EHO footer */}
      <div className="mt-6 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
        <p className="text-xs text-gray-500">
          This log provides a documented response record for allergen-related incidents. When linked with your
          dish audit trail, it demonstrates due diligence during EHO inspections or legal proceedings.
        </p>
      </div>
    </div>
  )
}
