import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function DpaPage() {
  return (
    <>
      <Helmet>
        <title>Data Processing Agreement — SafeEat</title>
        <meta
          name="description"
          content="SafeEat Data Processing Agreement. Governs the processing of personal data by SafeEat on behalf of venue customers, in accordance with UK GDPR Article 28."
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
              Data Processing Agreement
            </h1>
            <p className="text-sm text-gray-500">
              Required under UK GDPR Article 28. Forms part of the SafeEat Terms of Service.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Version 1.0 · Last updated:{' '}
              {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Plain-English summary */}
          <section className="mb-10 p-6 rounded-xl bg-se-green-50 border border-se-green-200">
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              In plain English
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed">
              When a venue uses SafeEat, SafeEat handles some personal data on the venue&apos;s
              behalf — mainly allergen information from end customers who scan the QR code. Under
              UK GDPR, the venue is the <strong>data controller</strong> (they decide what data is
              collected and why) and SafeEat is the <strong>data processor</strong> (we act on
              their instructions). This agreement sets out the rules for how that works.
            </p>
          </section>

          {/* A.1 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.1 Scope and Roles
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              The Customer (the venue) is the Controller of all personal data processed through
              the Service. SafeEat is the Processor. Each party shall comply with its respective
              obligations under the UK General Data Protection Regulation (UK GDPR) and the Data
              Protection Act 2018.
            </p>
          </section>

          {/* A.2 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.2 Subject Matter and Duration
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              <strong>Subject matter:</strong> the provision of the SafeEat Service to the Customer.{' '}
              <strong>Duration:</strong> for as long as the Customer maintains an active
              subscription, plus any retention period required by law or specified in this
              Agreement.
            </p>
          </section>

          {/* A.3 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.3 Nature and Purpose of Processing
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              SafeEat processes personal data to enable the Customer to:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 pl-5">
              <li className="list-disc">Display allergen and dish information to End Users;</li>
              <li className="list-disc">Collect and store End User allergen preferences;</li>
              <li className="list-disc">Send communications to End Users who have opted in;</li>
              <li className="list-disc">Generate records and reports for the Customer.</li>
            </ul>
          </section>

          {/* A.4 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.4 Categories of Data Subjects
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              Data subjects include:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 pl-5">
              <li className="list-disc">The Customer&apos;s authorised users (venue staff);</li>
              <li className="list-disc">End Users who interact with the Service via QR codes;</li>
              <li className="list-disc">End Users who save an allergen profile.</li>
            </ul>
          </section>

          {/* A.5 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.5 Categories of Personal Data
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              Personal data processed may include:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 pl-5">
              <li className="list-disc">
                <strong>Contact data</strong> — name, email address, phone number (as applicable);
              </li>
              <li className="list-disc">
                <strong>Usage data</strong> — IP address, device information, interaction timestamps;
              </li>
              <li className="list-disc">
                <strong>Special-category data under Article 9 UK GDPR</strong> — End User allergen
                information and dietary requirements, which constitute health data;
              </li>
              <li className="list-disc">
                <strong>Consent records</strong> — marketing opt-ins and data retention preferences.
              </li>
            </ul>
            <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-sm text-gray-800 leading-relaxed">
                <strong>Important:</strong> End User allergen data is special-category personal data
                under Article 9 UK GDPR. The Customer is responsible for ensuring a valid legal basis
                under Article 9(2) exists before such data is collected, and for obtaining explicit
                consent from End Users where required.
              </p>
            </div>
          </section>

          {/* A.6 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.6 Processor Obligations
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              SafeEat shall:
            </p>
            <ul className="space-y-3 text-sm text-gray-700 pl-5">
              <li className="list-disc">
                Process personal data only on the documented instructions of the Customer, unless
                required otherwise by law;
              </li>
              <li className="list-disc">
                Ensure that persons authorised to process personal data are bound by confidentiality;
              </li>
              <li className="list-disc">
                Implement appropriate technical and organisational measures to protect personal
                data, including encryption of allergen data at rest, hashed identifiers, access
                controls, and regular backups;
              </li>
              <li className="list-disc">
                Assist the Customer in responding to data subject access requests, rectification
                requests, erasure requests, and other rights under UK GDPR;
              </li>
              <li className="list-disc">
                Notify the Customer without undue delay, and in any event within 72 hours, of any
                personal data breach;
              </li>
              <li className="list-disc">
                At the Customer&apos;s choice, delete or return all personal data at the end of the
                provision of services, subject to any legal retention requirements;
              </li>
              <li className="list-disc">
                Make available to the Customer all information necessary to demonstrate compliance
                with this DPA, and allow for and contribute to audits conducted by the Customer or
                an auditor mandated by the Customer, subject to reasonable notice and
                confidentiality.
              </li>
            </ul>
          </section>

          {/* A.7 Sub-processors */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.7 Sub-processors
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              SafeEat may engage the following sub-processors to provide the Service. The Customer
              consents to SafeEat&apos;s use of these sub-processors, who are bound by data
              protection terms at least as protective as this DPA:
            </p>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left text-gray-700">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Sub-processor</th>
                    <th className="px-4 py-3 font-semibold">Purpose</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {[
                    ['Neon, Inc.', 'Database hosting', 'US / EU regions'],
                    ['Railway Corp', 'Application hosting', 'United States'],
                    ['Cloudflare, Inc.', 'CDN, security, object storage (R2)', 'Global'],
                    ['Stripe Payments Europe Ltd', 'Payment processing', 'European Union'],
                    ['Clerk, Inc.', 'Authentication services', 'United States'],
                    ['Resend, Inc.', 'Transactional email', 'United States'],
                    ['Upstash, Inc.', 'Rate limiting and caching', 'United States'],
                    ['Sentry (Functional Software, Inc.)', 'Error monitoring', 'United States'],
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-gray-200">
                      <td className="px-4 py-3 font-medium">{row[0]}</td>
                      <td className="px-4 py-3">{row[1]}</td>
                      <td className="px-4 py-3 text-gray-600">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 italic mt-3 leading-relaxed">
              SafeEat will notify Customers of any intended addition or replacement of
              sub-processors, giving the Customer an opportunity to object.
            </p>
          </section>

          {/* A.8 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.8 International Transfers
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              Where personal data is transferred outside the United Kingdom, SafeEat ensures such
              transfers are protected by appropriate safeguards, including UK International Data
              Transfer Agreements (IDTAs) or adequacy decisions as applicable.
            </p>
          </section>

          {/* A.9 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.9 Security Measures
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              SafeEat implements, at minimum, the following measures:
            </p>
            <ul className="space-y-2 text-sm text-gray-700 pl-5">
              <li className="list-disc">Encryption of allergen data at rest using pgcrypto;</li>
              <li className="list-disc">TLS 1.2 or higher for data in transit;</li>
              <li className="list-disc">Role-based access controls with least-privilege principles;</li>
              <li className="list-disc">Multi-factor authentication for SafeEat administrative access;</li>
              <li className="list-disc">Regular vulnerability scanning and security reviews;</li>
              <li className="list-disc">Encrypted backups with defined retention periods;</li>
              <li className="list-disc">Segregation of Customer data using database-level tenant isolation.</li>
            </ul>
          </section>

          {/* A.10 */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              A.10 Data Retention and Deletion
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              End User allergen profiles are retained for 18 months from the last End User
              activity, after which they are auto-deleted. End Users may delete their profiles at
              any time — both from their own device and from the Customer&apos;s database — in
              accordance with the right to erasure under UK GDPR.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              On termination of the Agreement, Customer Data is retained for 30 days to allow the
              Customer to export it, after which the data is deleted or anonymised.
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Contact
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-2">
              SafeEat is a trading name of Autaimate Ltd. We are registered with the UK Information
              Commissioner&apos;s Office (ICO).
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              Questions about this DPA, data subject access requests, or to notify us of a data
              protection concern:{' '}
              <a
                href="mailto:hello@safeeat.co.uk"
                className="text-se-green-700 underline hover:text-se-green-800"
              >
                hello@safeeat.co.uk
              </a>
            </p>
          </section>

          {/* Cross-link to Terms */}
          <div className="mt-12 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              This Data Processing Agreement forms part of the{' '}
              <Link to="/terms" className="text-se-green-700 underline hover:text-se-green-800">
                SafeEat Terms of Service
              </Link>{' '}
              and applies to every Customer using the Service.
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
                <Link to="/dpa" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                  DPA
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
