import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What are the 14 allergens UK restaurants must declare?',
    a: 'Under the Food Information Regulations 2014, UK food businesses must declare these 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts (tree nuts), peanuts, sesame, soybeans, and sulphur dioxide (sulphites above 10mg/kg). SafeEat covers all 14 with our bitmask filtering system so customers can instantly see which dishes are safe for them.',
  },
  {
    q: 'How does SafeEat help with Natasha\'s Law compliance?',
    a: 'Natasha\'s Law (the UK Allergen Labelling Regulations 2021) requires prepacked for direct sale (PPDS) food to carry a full ingredients list with the 14 allergens emphasised. SafeEat extends this to your dine-in menu with a digital allergen display that customers access via QR code. Our weekly verification flow and timestamped audit trail give you documented proof of allergen diligence for EHO inspections.',
  },
  {
    q: 'How do customers use SafeEat?',
    a: 'Customers scan the QR code on your table, window, or menu. They select their allergens from a simple visual picker, and your menu instantly filters to show only safe dishes. They can save their allergy profile so it remembers them on future visits — turning a one-time scan into a returning customer.',
  },
  {
    q: 'Do I need any special hardware or equipment?',
    a: 'No. SafeEat is entirely web-based. Your customers scan a QR code with their phone camera — no app download required. You manage your menu and allergens from any browser. All you need is the printed QR code, which you can download from your dashboard.',
  },
  {
    q: 'What happens during an EHO inspection?',
    a: 'SafeEat keeps a timestamped, append-only verification log that records every time you confirm or update your menu allergen information. This gives Environmental Health Officers a clear audit trail showing your ongoing allergen diligence — dates, times, and any changes made.',
  },
  {
    q: 'How is customer allergy data protected?',
    a: 'Customer allergen profiles are special-category health data under UK GDPR Article 9. SafeEat encrypts all allergen data at rest using pgcrypto, hashes personal identifiers with SHA-256, stores profiles only with explicit consent, and auto-deletes after 18 months of inactivity. Customers can delete their profile at any time.',
  },
  {
    q: 'Can I try SafeEat before paying?',
    a: 'Yes. Every new venue gets a free trial with full access to all features — allergen menus, customer profiles, verification audit trail, and QR codes. No credit card required to start.',
  },
  {
    q: 'How much does SafeEat cost?',
    a: 'SafeEat Starter is £29.99 per month per venue. This includes unlimited menu items, customer allergen profiles, the weekly verification audit trail, your QR code, and push notifications to opted-in customers. No setup fees, no long-term contracts — cancel any time.',
  },
]

export default function HomePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* ================================================================
            NAV
        ================================================================ */}
        <nav className="border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-gray-900">SafeEat</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">Pricing</a>
              <a href="#faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">FAQ</a>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </nav>

        {/* ================================================================
            HERO — H1 targets "allergen menu software UK restaurants"
        ================================================================ */}
        <header className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-se-green-50 text-se-green-700 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-se-green-500 animate-pulse" />
              Natasha&apos;s Law &amp; Food Information Regulations 2014 compliant
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Allergen menu software for{' '}
              <span className="text-se-green-600">UK restaurants</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Your customers scan a QR code, filter your menu by their allergies, and see exactly
              what&apos;s safe to eat. You get an EHO-ready audit trail and customers who come back.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors text-center"
              >
                Start your free trial
              </Link>
              <a
                href="/menu/demo"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-center"
              >
                See a live demo menu
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">No credit card required. Cancel any time.</p>
          </div>
        </header>

        {/* ================================================================
            PROBLEM / SOLUTION
        ================================================================ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Allergen compliance shouldn&apos;t cost you customers
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              2 million people in the UK have a diagnosed food allergy. They eat out less because
              they don&apos;t trust the information. SafeEat gives them confidence — and gives you
              their repeat business.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">📋</div>
                <h3 className="font-semibold text-gray-900 mb-2">The 14 UK allergens, handled</h3>
                <p className="text-sm text-gray-600">
                  Every dish tagged against all 14 allergens regulated under UK law. Gluten, nuts,
                  milk, eggs, fish, crustaceans, molluscs, sesame, soy, mustard, celery, lupin,
                  and sulphites — all covered.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-900 mb-2">QR code allergen menus</h3>
                <p className="text-sm text-gray-600">
                  Customers scan your QR code and filter your menu by their specific allergies.
                  Safe dishes highlighted, unsafe dishes faded. No app download — works in any
                  phone browser.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-semibold text-gray-900 mb-2">EHO audit trail built in</h3>
                <p className="text-sm text-gray-600">
                  Weekly verification prompts you to confirm your menu is current. Every
                  confirmation is timestamped and logged — ready for your next Environmental
                  Health Officer inspection.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            HOW IT WORKS
        ================================================================ */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              How SafeEat works
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-lg font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">Add your menu</h3>
                <p className="text-sm text-gray-600">
                  Enter your dishes, prices, and tag each one with its allergens.
                  Takes about 15 minutes for a typical menu.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Print your QR code</h3>
                <p className="text-sm text-gray-600">
                  Download your unique QR code and place it on tables, in the window,
                  or on your paper menus. Customers scan with any phone.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">Customers filter &amp; return</h3>
                <p className="text-sm text-gray-600">
                  Customers select their allergies and see safe dishes instantly.
                  They save their profile and get remembered on every visit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            FEATURES — deeper keyword targeting
        ================================================================ */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Built for allergen compliance and customer retention
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Everything a UK food business needs to manage allergens properly and turn
              allergy-aware diners into loyal regulars.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🌾', title: 'All 14 UK regulated allergens', desc: 'Bitmask-based filtering covers every allergen required under Food Information Regulations 2014 — fast, accurate, zero lag.' },
                { icon: '🔒', title: 'UK GDPR Article 9 compliant', desc: 'Allergen data is special-category health data. We encrypt at rest, hash identifiers, enforce consent, and auto-delete after 18 months.' },
                { icon: '📊', title: 'Customer insights dashboard', desc: 'See which allergens are most common among your customers, track scan volumes, and identify returning visitors — all anonymised.' },
                { icon: '🔔', title: 'Marketing notifications', desc: 'Customers who opt in can receive updates when your menu changes. Turn allergen compliance into a direct marketing channel.' },
                { icon: '🏛️', title: 'FSA &amp; EHO ready', desc: 'Append-only verification log with timestamps gives Environmental Health Officers clear evidence of your allergen management process.' },
                { icon: '⚡', title: 'No app download required', desc: 'Customers scan, filter, and save — all in their phone browser. No friction, no app store, no barrier to adoption.' },
              ].map((f) => (
                <div key={f.title} className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
                  <span className="text-2xl flex-shrink-0">{f.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-gray-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            PRICING
        ================================================================ */}
        <section id="pricing" className="py-16">
          <div className="max-w-lg mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Simple pricing, no surprises
            </h2>
            <div className="bg-white rounded-2xl border-2 border-se-green-600 p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">SafeEat Starter</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">£29.99</span>
                  <span className="text-gray-500">/month per venue</span>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'Unlimited menu items',
                  'All 14 UK allergens supported',
                  'QR code allergen menu for customers',
                  'Customer allergy profiles with consent',
                  'Weekly verification & EHO audit trail',
                  'Customer insights dashboard',
                  'Marketing notifications to opted-in customers',
                  'UK GDPR compliant data handling',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-se-green-600 mt-0.5">✓</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/dashboard"
                className="block w-full px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors text-center"
              >
                Start your free trial
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">
                No credit card required. No setup fees. Cancel any time.
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            FAQ — targets long-tail keywords, generates FAQPage rich snippets
        ================================================================ */}
        <section id="faq" className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
                >
                  <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 list-none flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                    <span>{item.q}</span>
                    <span className="text-gray-400 group-open:rotate-45 transition-transform text-lg flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            FINAL CTA
        ================================================================ */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Turn allergen compliance into your competitive advantage
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join UK restaurants using SafeEat to protect their customers, pass EHO
              inspections with confidence, and build a loyal allergy-aware customer base.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors"
            >
              Start your free trial
            </Link>
          </div>
        </section>

        {/* ================================================================
            FOOTER
        ================================================================ */}
        <footer className="border-t border-gray-200 py-10">
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
