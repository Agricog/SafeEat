import { useState } from 'react'
import { useApi } from '../lib/api'

interface OnboardingProps {
  onComplete: () => void
}

export default function DashboardOnboarding({ onComplete }: OnboardingProps) {
  const { request } = useApi()

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Venue name is required')
      return
    }

    setSubmitting(true)

    try {
      await request('/api/dashboard/venues', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          address: address.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      })
      onComplete()
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🍽️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Set up your venue</h1>
          <p className="text-sm text-gray-500">
            Tell us about your restaurant, café, or takeaway. You can update these details later.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Venue name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Corner Café"
              maxLength={200}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. 12 High Street, London, E1 6PQ"
              maxLength={500}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 020 7946 0958"
              maxLength={20}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. hello@thecornercafe.co.uk"
              maxLength={254}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">
              Used for verification reminders and billing notifications
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting || !name.trim()}
            className="w-full py-2.5 rounded-lg bg-se-green-600 text-white text-sm font-semibold hover:bg-se-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creating venue…' : 'Create venue'}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          By creating a venue you agree to our{' '}
          <a href="/terms" className="text-se-green-600 hover:underline">terms of service</a>{' '}
          and{' '}
          <a href="/privacy" className="text-se-green-600 hover:underline">privacy policy</a>.
        </p>
      </div>
    </div>
  )
}
