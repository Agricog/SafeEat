import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service — SafeEat</title>
        <meta name="description" content="SafeEat terms of service. The agreement between SafeEat and venue owners using the allergen menu management platform." />
        <link rel="canonical" href="https://safeeat.co.uk/terms" />
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: 9 April 2026</p>

          <div className="prose prose-gray prose-sm max-w-none space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">1. Agreement</h2>
              <p>
                These terms of service (&quot;Terms&quot;) govern your use of the SafeEat platform at
                safeeat.co.uk (&quot;Service&quot;) operated by SafeEat (&quot;we&quot;, &quot;us&quot;,
                &quot;our&quot;). By creating an account or using the Service, you agree to these Terms.
                If you do not agree, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">2. The Service</h2>
              <p>
                SafeEat provides a web-based allergen menu management platform for UK food businesses.
                The Service includes: a customer-facing allergen-filtered menu accessed via QR code,
                a venue management dashboard for menu items and allergen tagging, customer allergy
                profile storage with consent management, weekly menu verification with audit logging,
                and subscription billing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">3. Your responsibilities</h2>
              <p>As a venue owner using SafeEat, you are responsible for:</p>
              <p>
                <strong>Accuracy of allergen information.</strong> You must ensure that the allergen
                tags on your dishes are accurate and up to date. SafeEat is a tool to display allergen
                information — it does not verify the accuracy of the data you enter. You remain legally
                responsible for the allergen information you provide to customers under the Food
                Information Regulations 2014 and Natasha&apos;s Law.
              </p>
              <p>
                <strong>Regular verification.</strong> You should use the weekly verification feature
                to confirm your menu allergen data is current. While SafeEat prompts you to verify,
                the responsibility for keeping information accurate rests with you.
              </p>
              <p>
                <strong>Account security.</strong> You must keep your login credentials secure and
                notify us immediately if you suspect unauthorised access to your account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">4. Customer data</h2>
              <p>
                When customers save allergen profiles through your venue&apos;s menu page, we act as
                the data controller for their personal data. You can view anonymised customer insights
                (allergen trends, visit counts, marketing opt-in rates) but you cannot access individual
                customer identities or raw personal data.
              </p>
              <p>
                Customer allergen data is special-category health data under UK GDPR Article 9. We
                collect it only with the customer&apos;s explicit consent, encrypt it at rest, and
                provide customers with the ability to delete their profile at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">5. Subscription and payment</h2>
              <p>
                SafeEat Starter costs £29.99 per month per venue, billed monthly through Stripe.
                Your subscription begins when you complete the checkout process. You can cancel at
                any time through the &quot;Manage billing&quot; button in your dashboard settings.
                On cancellation, you retain access until the end of your current billing period.
              </p>
              <p>
                We may change our pricing with 30 days&apos; notice by email. Price changes do not
                affect your current billing period.
              </p>
              <p>
                We offer a free trial period for new venues. No credit card is required to start
                the trial. At the end of the trial, you will need to subscribe to continue using
                the Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">6. Intellectual property</h2>
              <p>
                The SafeEat platform, including its design, code, and documentation, is owned by us
                and protected by copyright. You retain ownership of the content you create (menu items,
                descriptions, venue information). By using the Service, you grant us a licence to
                display your content as necessary to operate the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">7. Limitation of liability</h2>
              <p>
                SafeEat provides a tool to display and manage allergen information. We do not guarantee
                the accuracy of allergen data entered by venue owners. To the maximum extent permitted
                by law, we are not liable for:
              </p>
              <p>
                Any allergic reaction or adverse health event resulting from inaccurate allergen
                information entered by a venue owner. Any loss of business, revenue, or data arising
                from service interruptions. Any indirect, incidental, or consequential damages.
              </p>
              <p>
                Our total liability to you in any 12-month period shall not exceed the total fees
                you paid to us during that period. Nothing in these Terms limits our liability for
                death or personal injury caused by our negligence, fraud, or any other liability
                that cannot be excluded by law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">8. Availability</h2>
              <p>
                We aim to keep SafeEat available at all times but do not guarantee uninterrupted
                service. We may perform maintenance with reasonable notice. We are not liable for
                downtime beyond our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">9. Termination</h2>
              <p>
                You may terminate your account at any time by cancelling your subscription and
                contacting us at hello@safeeat.co.uk. We may terminate or suspend your account
                if you breach these Terms, fail to pay subscription fees, or use the Service in
                a way that could harm other users or our infrastructure. On termination, your
                venue data is deleted within 30 days, except for verification logs which are
                retained for 6 years for food safety compliance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">10. Governing law</h2>
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes shall be
                subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">11. Changes</h2>
              <p>
                We may update these Terms from time to time. We will notify registered venue owners
                of material changes by email at least 30 days before they take effect. Continued use
                of the Service after changes take effect constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-3">12. Contact</h2>
              <p>
                Questions about these Terms? Contact us at hello@safeeat.co.uk.
              </p>
            </section>
          </div>
        </main>

        <footer className="border-t border-gray-200 py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-between">
            <span className="text-xs text-gray-400">© {new Date().getFullYear()} SafeEat</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy</Link>
              <a href="mailto:hello@safeeat.co.uk" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
