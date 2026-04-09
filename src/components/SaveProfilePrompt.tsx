import { useState } from 'react'

interface SaveProfilePromptProps {
  venueName: string
  allergenCount: number
  onSave: (marketingConsent: boolean) => void
  onDismiss: () => void
}

export default function SaveProfilePrompt({
  venueName,
  allergenCount,
  onSave,
  onDismiss,
}: SaveProfilePromptProps) {
  const [marketingOptIn, setMarketingOptIn] = useState(false)

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
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-se-green-600 focus:ring-se-green-500"
            />
            <span className="text-xs text-gray-600">
              Let {venueName} notify me when they add new dishes that are safe for me
            </span>
          </label>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => onSave(marketingOptIn)}
              className="flex-1 px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
            >
              Save my profile
            </button>
            <button
              onClick={onDismiss}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
