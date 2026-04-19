import { useState } from 'react'
import { useApi } from '../lib/api'

interface ToSAcceptanceProps {
  venueId: string
  venueName: string
  /**
   * Called after a successful acceptance record has been written to the server.
   * The parent is expected to then initiate the Stripe checkout redirect.
   */
  onAccepted: () => void | Promise<void>
  /**
   * Called if the user cancels the modal. Parent closes the gate.
   */
  onDismiss: () => void
}

interface AcceptResponse {
  acceptance: {
    id: string
    tos_version: string
    accepted_at: string
    terms_accepted: boolean
    conduit_accepted: boolean
  }
}

/**
 * Pre-payment Terms of Service gate.
 *
 * Shown modally before the Stripe checkout redirect. Two separate tick-boxes:
 *   1. Terms of Service + DPA acceptance (the standard SaaS agreement)
 *   2. Explicit acknowledgement that the venue remains solely responsible for
 *      data accuracy, staff training, kitchen practices, and food preparation
 *
 * Separating the two is deliberate — in any future dispute, the venue cannot
 * claim "I agreed to the Terms but didn't realise that specific bit was in
 * there." Each responsibility is its own distinct consent event.
 *
 * The component calls the venue-scoped /tos/accept endpoint, which writes an
 * immutable row with IP, user agent, and timestamp. Only on server-confirmed
 * success does the parent get the callback to redirect to Stripe.
 */
export default function ToSAcceptance({
  venueId,
  venueName,
  onAccepted,
  onDismiss,
}: ToSAcceptanceProps) {
  const { request } = useApi()
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [conduitAccepted, setConduitAccepted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const bothTicked = termsAccepted && conduitAccepted

  const handleSubmit = async () => {
    if (!bothTicked) {
      setError('Please tick both boxes to continue.')
      return
    }
    setError(null)
    setSubmitting(true)

    try {
      await request<AcceptResponse>(
        `/api/dashboard/${venueId}/tos/accept`,
        {
          method: 'POST',
          body: { termsAccepted, conduitAccepted },
        },
      )
      // Server confirmed — hand off to parent for Stripe redirect
      await onAccepted()
    } catch (err) {
      console.error('ToS acceptance error:', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(`We couldn't record your acceptance. ${msg}. Please try again.`)
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="tos-acceptance-title"
    >
      <div className="bg-white rounded-2xl border border-se-green-200 shadow-lg max-w-lg w-full my-8 p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-se-green-50 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">📄</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 id="tos-acceptance-title" className="font-semibold text-gray-900 text-base">
              Before you subscribe
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Please review and accept the Terms of Service and Data Processing Agreement
              for <span className="font-medium text-gray-700">{venueName}</span>. This is a
              one-time step and is required to process your subscription.
            </p>
          </div>
        </div>

        {/* Consent 1: Terms of Service + DPA */}
        <label className="flex items-start gap-3 mt-4 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked)
              if (error) setError(null)
            }}
            disabled={submitting}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-se-green-600 focus:ring-se-green-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I have read and agree to the{' '}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-se-green-600 font-medium underline hover:text-se-green-700"
            >
              Terms of Service
            </a>
            {' '}and the{' '}
            <a
              href="/dpa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-se-green-600 font-medium underline hover:text-se-green-700"
            >
              Data Processing Agreement
            </a>
            .
          </span>
        </label>

        {/* Consent 2: Conduit / venue responsibility acknowledgement */}
        <label className="flex items-start gap-3 mt-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
          <input
            type="checkbox"
            checked={conduitAccepted}
            onChange={(e) => {
              setConduitAccepted(e.target.checked)
              if (error) setError(null)
            }}
            disabled={submitting}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-se-green-600 focus:ring-se-green-500 disabled:opacity-50"
          />
          <span className="text-sm text-gray-700 leading-relaxed">
            I understand that <span className="font-medium">{venueName}</span> remains solely
            responsible for the accuracy of allergen information entered into SafeEat, staff
            training, kitchen practices, cross-contamination controls, and all aspects of food
            preparation and service. SafeEat is a tool that helps display this information and
            keep records; it does not replace these responsibilities.
          </span>
        </label>

        {/* Helper note */}
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          We'll record your acceptance with a timestamp and send you a confirmation email
          once payment is complete, for your records. You can review or re-download the
          documents any time at safeeat.co.uk/terms and safeeat.co.uk/dpa.
        </p>

        {/* Error panel */}
        {error && (
          <div className="mt-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
            <p className="text-xs text-red-700">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!bothTicked || submitting}
            className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Recording…
              </>
            ) : (
              'Accept and continue to payment'
            )}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            disabled={submitting}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
