import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.')
      return
    }

    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Something went wrong' }))
        throw new Error(data.error || 'Something went wrong')
      }

      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — SafeEat</title>
        <meta name="description" content="Get in touch with the SafeEat team. Questions about allergen menu software, pricing, or getting your restaurant set up — we're here to help." />
        <link rel="canonical" href="https://safeeat.co.uk/contact" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-gray-900">SafeEat</span>
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              ← Back to home
            </Link>
          </div>
        </nav>

        <main className="max-w-lg mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Get in touch</h1>
          <p className="text-gray-600 mb-8">
            Questions about SafeEat, pricing, or getting your restaurant set up? We&apos;d love to hear from you.
          </p>

          {sent ? (
            <div className="rounded-xl bg-se-green-50 border border-se-green-200 p-6 text-center">
              <div className="text-3xl mb-3">✓</div>
              <h2 className="text-lg font-semibold text-se-green-700 mb-2">Message sent</h2>
              <p className="text-sm text-se-green-600 mb-4">
                Thanks for getting in touch. We&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setSent(false)}
                className="text-sm text-se-green-700 underline hover:no-underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <div>
              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@myrestaurant.co.uk"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us about your restaurant and what you're looking for..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-se-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={sending}
                  className="w-full px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors disabled:opacity-50"
                >
                  {sending ? 'Sending…' : 'Send message'}
                </button>
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Or email us directly at{' '}
                <a href="mailto:hello@safeeat.co.uk" className="underline hover:text-gray-600">
                  hello@safeeat.co.uk
                </a>
              </p>
            </div>
          )}
        </main>

        <footer className="border-t border-gray-200 py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">© {new Date().getFullYear()} SafeEat</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy</Link>
              <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
