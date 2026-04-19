import { useState } from 'react'
import { useLanguage } from '../lib/LanguageContext'

interface SaveProfilePromptProps {
  venueName: string
  allergenCount: number
  onSave: (marketingConsent: boolean, email: string) => Promise<{ ok: boolean; error?: string }>
  onDismiss: () => void
}

function isValidEmail(email: string): boolean {
  if (!email) return true // email is optional overall — validate only if provided
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export default function SaveProfilePrompt({
  venueName,
  allergenCount,
  onSave,
  onDismiss,
}: SaveProfilePromptProps) {
  const { t } = useLanguage()
  const [marketingOptIn, setMarketingOptIn] = useState(false)
  const [email, setEmail] = useState('')
  const [saving, setSaving] = useState(false)
  const [errorKey, setErrorKey] = useState<string | null>(null)
  const [emailError, setEmailError] = useState(false)

  const handleSubmit = async () => {
    // Validate — email format if provided, or required if marketing opt-in ticked
    if (marketingOptIn && !email.trim()) {
      setEmailError(true)
      setErrorKey('emailRequiredForMarketing')
      return
    }
    if (email.trim() && !isValidEmail(email)) {
      setEmailError(true)
      setErrorKey('emailInvalid')
      return
    }
    setEmailError(false)
    setErrorKey(null)
    setSaving(true)

    const result = await onSave(marketingOptIn, email.trim())

    if (result.ok) {
      // Parent component handles dismissing + showing confirmation
      return
    }

    setSaving(false)
    if (result.error === 'network') setErrorKey('saveErrorNetwork')
    else if (result.error === 'rate_limit') setErrorKey('saveErrorRateLimit')
    else setErrorKey('saveErrorServer')
  }

  return (
    <div className="bg-white rounded-2xl border border-se-green-200 shadow-sm p-5 mx-4 mt-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-se-green-50 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">🛡️</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm">
            Save your allergy profile?
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {venueName} will remember your {allergenCount} allergen{allergenCount > 1 ? 's' : ''} so
            the menu is filtered for you every time you visit.
          </p>

          {/* Email input */}
          <div className="mt-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setEmailError(false)
                if (errorKey === 'emailInvalid' || errorKey === 'emailRequiredForMarketing') {
                  setErrorKey(null)
                }
              }}
              disabled={saving}
              placeholder="Your email address"
              className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:border-transparent disabled:opacity-50 ${
                emailError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-200 focus:ring-se-green-500'
              }`}
            />
          </div>

          {/* Consent 1: Profile save — implied by tapping Save */}
          <p className="text-xs text-gray-400 mt-3">
            Your allergy data is stored securely and only used to filter this venue's menu.
            You can delete it at any time.
          </p>

          {/* Consent 2: Marketing — separate explicit opt-in */}
          <label className="flex items-start gap-2 mt-3 cursor-pointer">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              disabled={saving}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-se-green-600 focus:ring-se-green-500 disabled:opacity-50"
            />
            <span className="text-xs text-gray-600">
              Let {venueName} notify me when they add new dishes that are safe for me
            </span>
          </label>

          {/* Error message */}
          {errorKey && (
            <div className="mt-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200">
              <p className="text-xs text-red-700">{t(errorKey)}</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={handleSubmit}
              disabled={saving}
              className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('savingProfile')}
                </>
              ) : (
                'Save my profile'
              )}
            </button>
            <button
              onClick={onDismiss}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
