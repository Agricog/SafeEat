import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — SafeEat</title>
        <meta
          name="description"
          content="SafeEat Terms of Service. SafeEat is a conduit for the allergen information food businesses are legally required to provide."
        />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-gray-900">SafeEat</span>
            </Link>
            <Link
              to="/"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Home
            </Link>
          </div>
        </nav>

        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Terms of Service
            </h1>
            <p className="text-sm text-gray-500">
              Plain-English summary. Full terms currently being finalised with legal counsel.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Last updated: {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* The core conduit clause — set at the top so it's unmissable */}
          <section className="mb-10 p-6 rounded-xl bg-se-green-50 border border-se-green-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              What SafeEat is, in one paragraph
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              SafeEat is a <strong>conduit</strong> for the allergen information food businesses
              are legally required to provide. We display and record the information supplied by
              the venue, and we help the venue communicate that information to customers
              accessibly and consistently. We do not prepare food. We do not verify ingredient
              accuracy. We do not train staff. The venue remains solely responsible for data
              accuracy, staff training, kitchen practices, cross-contamination controls, and all
              aspects of food preparation and service.
            </p>
          </section>

          {/* Venue responsibilities */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Venue responsibilities
            </h2>
            <p className="text-sm text-gray-700 mb-3">
              By using SafeEat, the venue agrees that it is solely responsible for:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>The accuracy, completeness, and currency of all allergen information, ingredients, and dish descriptions entered into SafeEat.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Training staff in allergen awareness, food safety, and the correct use of the Service.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>All aspects of food preparation, handling, and service, including cross-contamination controls, hygiene, temperature, and supplier management.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Compliance with all applicable laws and regulations, including the Food Information Regulations 2014, the Allergen Labelling Regulations 2021 ("Natasha&apos;s Law"), and UK GDPR.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Maintaining a valid food business registration and responding appropriately to EHO inspections.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Verifying that the allergen information displayed through SafeEat matches the food actually served to each customer.</span>
              </li>
            </ul>
          </section>

          {/* Our responsibilities */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What SafeEat commits to
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Provide the SafeEat software with reasonable care and skill.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Process personal data in accordance with UK GDPR and our Data Processing Agreement.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Encrypt allergen data at rest; use TLS in transit; maintain appropriate security measures.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Maintain registration with the Information Commissioner&apos;s Office (ICO).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-se-green-600 mt-0.5 flex-shrink-0">✓</span>
                <span>Honour the 30-Day Allergen-Ready Guarantee as set out below.</span>
              </li>
            </ul>
          </section>

          {/* Guarantee */}
          <section className="mb-10 p-6 rounded-xl bg-amber-50 border border-amber-200">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              The 30-Day Allergen-Ready Guarantee
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Within 30 days of subscription, SafeEat will make available: (1) a live QR-code
              customer menu; (2) an active dish change audit trail; (3) a staff training log;
              and (4) a downloadable EHO allergen report. If all four are not available within
              30 days, the next 3 monthly subscription fees are waived.
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              The guarantee relates to the availability of these deliverables within SafeEat. It
              does not relate to the outcome of any inspection or incident, which depends on the
              venue&apos;s own food preparation, staff, and practices.
            </p>
          </section>

          {/* Liability */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Limitation of liability
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              SafeEat&apos;s total liability under this agreement is capped at the subscription
              fees paid by the venue in the 12 months preceding any claim.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              SafeEat is not liable for any allergic reaction, illness, injury, or death arising
              from food prepared or served at the venue&apos;s premises. The venue remains solely
              responsible for the food it serves and for the information it supplies into
              SafeEat. Nothing in these terms excludes liability for death or personal injury
              caused by our negligence, or for any liability that cannot be excluded by law.
            </p>
          </section>

          {/* Subscription */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Subscription &amp; payment
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              SafeEat is £29.99/month per venue, charged in advance via Stripe. No setup fees.
              No contracts. The venue may cancel any time from the dashboard — cancellation
              takes effect at the end of the current billing period. No refunds for partial
              months except where required by the Allergen-Ready Guarantee or by law.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Founding Cornwall pricing, where offered, is locked for 3 years from the date of
              subscription.
            </p>
          </section>

          {/* Data protection */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Data protection
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              The venue is the data controller for all personal data processed through SafeEat.
              SafeEat is the data processor. End User allergen data is special-category personal
              data under Article 9 UK GDPR — the venue is responsible for obtaining explicit
              consent where required.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              End User allergen profiles auto-delete after 18 months of inactivity, or at any
              time on request. A full Data Processing Agreement is provided as part of the
              signed Terms of Service at signup.
            </p>
          </section>

          {/* Governing law */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Governing law
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              These Terms are governed by the laws of England and Wales. The courts of England
              and Wales have exclusive jurisdiction over any dispute.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Contact
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              SafeEat is a trading name of Autaimate Ltd.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Questions about these Terms:{' '}
              <a
                href="mailto:hello@safeeat.co.uk"
                className="text-se-green-700 underline hover:text-se-green-800"
              >
                hello@safeeat.co.uk
              </a>
            </p>
          </section>

          {/* Banner */}
          <div className="mt-12 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              <strong>Note:</strong> this page is a plain-English summary of SafeEat&apos;s
              position. Full legally-reviewed Terms of Service and Data Processing Agreement
              are being finalised and will be provided to every customer at signup for
              electronic acceptance. Customers who subscribe before that date will receive the
              final Terms by email on publication.
            </p>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-10 bg-gray-50 mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                <span className="text-sm font-bold text-gray-900">SafeEat</span>
                <span className="text-xs text-gray-400">© {new Date().getFullYear()}</span>
              </div>
              <nav className="flex items-center gap-6">
                <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Terms of Service
                </Link>
                <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
