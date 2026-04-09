import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — SafeEat</title>
        <meta name="description" content="SafeEat privacy policy. How we collect, use, and protect your data including allergen health data under UK GDPR Article 9." />
        <link rel="canonical" href="https://safeeat.co.uk/privacy" />
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

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: 9 April 2026</p>

          <div className="prose prose-gray prose-sm max-w-none space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">1. Who we are</h2>
              <p>
                SafeEat (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website safeeat.co.uk and the SafeEat
                allergen menu management platform. We are a UK-based company. For data protection purposes,
                we are the data controller for personal data processed through our platform.
              </p>
              <p>Contact: hello@safeeat.co.uk</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">2. What data we collect</h2>

              <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-2">Venue owners (dashboard users)</h3>
              <p>When you create a SafeEat account and set up your venue, we collect:</p>
              <p>
                Your name and email address (via Clerk authentication), venue name, address, phone number,
                and email. We also collect payment information processed securely by Stripe — we never see
                or store your full card details.
              </p>

              <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-2">Customers (menu page users)</h3>
              <p>When a customer scans a venue QR code and uses the allergen-filtered menu, we collect:</p>
              <p>
                If the customer chooses to save their allergy profile: a hashed identifier (we never store
                the original), their selected allergens (encrypted at rest), their consent preferences, and
                visit timestamps. This allergen data constitutes special-category health data under UK GDPR
                Article 9, and we process it solely on the basis of explicit consent (Article 9(2)(a)).
              </p>
              <p>
                If the customer does not save a profile: we log only an anonymised scan event (venue ID,
                timestamp) with no personal data.
              </p>

              <h3 className="text-sm font-semibold text-gray-800 mt-4 mb-2">Automatically collected data</h3>
              <p>
                We collect standard server logs including IP addresses, browser type, and page URLs.
                These are retained for a maximum of 30 days for security and debugging purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">3. How we use your data</h2>
              <p>We use personal data for the following purposes:</p>
              <p>
                To provide the SafeEat service: displaying allergen-filtered menus, storing customer
                allergy profiles, managing venue accounts, processing subscription payments, and
                generating anonymised analytics for venue owners.
              </p>
              <p>
                To maintain allergen verification records: our weekly verification log creates a timestamped
                audit trail for food safety compliance purposes.
              </p>
              <p>
                To send marketing notifications: only to customers who have given explicit, separate consent
                for marketing communications. This consent is recorded with a timestamp and can be withdrawn
                at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">4. Legal basis for processing</h2>
              <p>
                <strong>Venue owners:</strong> Contract performance (Article 6(1)(b)) — processing is necessary
                to provide the SafeEat service you have subscribed to. Legitimate interest (Article 6(1)(f))
                for service improvement and security.
              </p>
              <p>
                <strong>Customer allergen profiles:</strong> Explicit consent (Article 9(2)(a)) — allergen
                data is special-category health data and is only processed when the customer actively saves
                their profile with clear, affirmative consent.
              </p>
              <p>
                <strong>Marketing notifications:</strong> Explicit consent (Article 6(1)(a)) — collected
                separately from the profile consent via a distinct opt-in.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">5. How we protect your data</h2>
              <p>We implement the following technical and organisational measures:</p>
              <p>
                Customer allergen data is encrypted at rest using pgcrypto (AES-256). Personal identifiers
                are hashed with SHA-256 before storage — we cannot reverse them. All data is transmitted over
                TLS 1.2+. API endpoints are protected by rate limiting, input sanitisation, and JWT-based
                authentication. Row-level security is enforced at the database level. Our servers are hosted
                within the EU (Railway, Neon).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">6. Data retention</h2>
              <p>
                <strong>Customer allergen profiles:</strong> Auto-deleted after 18 months of inactivity.
                Customers can delete their profile at any time from the menu page.
              </p>
              <p>
                <strong>Venue accounts:</strong> Retained for the duration of the subscription. On cancellation,
                account data is deleted within 30 days. Verification logs are retained for 6 years to meet
                food safety record-keeping requirements.
              </p>
              <p>
                <strong>Server logs:</strong> Retained for a maximum of 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">7. Third-party processors</h2>
              <p>We use the following third-party services to operate SafeEat:</p>
              <p>
                <strong>Clerk</strong> (authentication) — processes name and email for login.
                <strong> Stripe</strong> (payments) — processes payment information for subscriptions.
                <strong> Neon</strong> (database) — stores encrypted data in EU data centres.
                <strong> Railway</strong> (hosting) — hosts our application servers.
                <strong> Upstash</strong> (rate limiting) — processes anonymised request metadata.
                <strong> Sentry</strong> (error tracking) — may receive anonymised error data.
              </p>
              <p>
                All processors are bound by data processing agreements and process data only on our instructions.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">8. Your rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <p>
                Access your personal data, rectify inaccurate data, erase your data (&quot;right to be
                forgotten&quot;), restrict processing, data portability, object to processing, and withdraw
                consent at any time. Customers can delete their allergen profile directly from the menu page.
                For all other requests, contact hello@safeeat.co.uk and we will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">9. Cookies</h2>
              <p>
                SafeEat uses only essential cookies required for authentication and session management.
                We do not use advertising cookies, tracking cookies, or third-party analytics cookies.
                No cookie consent banner is required as we rely solely on strictly necessary cookies
                (Regulation 6(4) of the Privacy and Electronic Communications Regulations 2003).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">10. Children</h2>
              <p>
                SafeEat is not directed at children under 13. We do not knowingly collect personal data
                from children. If you believe a child has provided us with personal data, please contact
                us at hello@safeeat.co.uk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">11. Changes to this policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify registered venue
                owners of material changes by email. The &quot;last updated&quot; date at the top of this
                page indicates when the policy was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">12. Complaints</h2>
              <p>
                If you have a concern about how we handle your data, please contact us at hello@safeeat.co.uk.
                You also have the right to lodge a complaint with the Information Commissioner&apos;s Office
                (ICO) at ico.org.uk.
              </p>
            </section>
          </div>
        </main>

        <footer className="border-t border-gray-200 py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">© {new Date().getFullYear()} SafeEat</span>
            <div className="flex gap-4">
              <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms</Link>
              <a href="mailto:hello@safeeat.co.uk" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
