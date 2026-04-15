import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What are the 14 allergens UK restaurants must declare?',
    a: 'Under the Food Information Regulations 2014, UK food businesses must declare these 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts (tree nuts), peanuts, sesame, soybeans, and sulphur dioxide (sulphites above 10mg/kg). SafeEat covers all 14 so customers can instantly see which dishes are safe for them.',
  },
  {
    q: 'How does SafeEat help with Natasha\'s Law compliance?',
    a: 'Natasha\'s Law (the UK Allergen Labelling Regulations 2021) requires prepacked for direct sale (PPDS) food to carry a full ingredients list with the 14 allergens emphasised. SafeEat extends this to your dine-in menu with a digital allergen display that customers access via QR code. Our weekly verification flow and timestamped audit trail give you documented proof of allergen diligence for EHO inspections.',
  },
  {
    q: 'What is Owen\'s Law and how does it affect my restaurant?',
    a: 'Owen\'s Law calls for mandatory written allergen information at the point of ordering in UK restaurants, without the customer needing to ask. The FSA published voluntary best-practice guidance in March 2025 and is evaluating uptake in spring 2026 — if compliance is poor, mandatory legislation follows. SafeEat gives you written allergen information via QR code now, putting you ahead of the likely regulation.',
  },
  {
    q: 'How do customers use SafeEat?',
    a: 'Customers scan the QR code on your table, window, or menu. They select their allergens from a simple visual picker, and your menu instantly filters to show only safe dishes. They can save their allergy profile so it remembers them on future visits — turning a one-time scan into a returning customer.',
  },
  {
    q: 'Do I need any special hardware or equipment?',
    a: 'No. SafeEat is entirely web-based. Your customers scan a QR code with their phone camera — no app download required. You manage your menu and allergens from any browser. All you need is the printed QR code or table talker, which you can download from your dashboard.',
  },
  {
    q: 'What happens during an EHO inspection?',
    a: 'SafeEat generates a comprehensive EHO inspection report PDF with one click. It includes your full allergen matrix showing every dish against every allergen, dietary declarations, ingredient records, staff training records, and your complete verification audit trail with timestamps. Environmental Health Officers get clear, documented evidence of your allergen management process.',
  },
  {
    q: 'How is customer allergy data protected?',
    a: 'Customer allergen profiles are special-category health data under UK GDPR Article 9. SafeEat encrypts all allergen data at rest, hashes personal identifiers, stores profiles only with explicit consent, and auto-deletes after 18 months of inactivity. Customers can delete their profile at any time.',
  },
  {
    q: 'Can I send notifications to my allergy customers?',
    a: 'Yes. Customers who opt into marketing can receive targeted notifications when your menu changes. You can filter by specific allergens — for example, notify only gluten-intolerant customers when you add new gluten-free dishes. This turns allergen compliance into a direct retention channel.',
  },
  {
    q: 'Can customers share a pre-filtered menu link?',
    a: 'Yes. When a customer has their allergens selected, they can share a link that pre-filters your menu for the same allergies. This is especially useful for group bookings — one person with a nut allergy can send the filtered menu to the group so everyone can see what the restaurant offers safely.',
  },
  {
    q: 'Can I try SafeEat before paying?',
    a: 'Yes. Every new venue gets a free trial with full access to all features — allergen menus, customer profiles, verification audit trail, analytics, notifications, and QR codes. No credit card required to start.',
  },
  {
    q: 'How much does SafeEat cost?',
    a: 'SafeEat Starter is £29.99 per month per venue. This includes every feature — unlimited menu items, dish photos, customer allergen profiles, EHO inspection reports, analytics dashboard, targeted notifications, staff training log, printable table talkers, and more. No setup fees, no long-term contracts — cancel any time.',
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
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">Features</a>
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
              Natasha&apos;s Law, Owen&apos;s Law &amp; Food Information Regulations 2014 compliant
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Allergen menu software for{' '}
              <span className="text-se-green-600">UK restaurants</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-4 max-w-2xl mx-auto">
              Your customers scan a QR code, filter your menu by their allergies, and see exactly
              what&apos;s safe to eat. You get an EHO-ready audit trail, targeted notifications,
              and customers who come back.
            </p>
            <p className="text-base text-gray-800 font-medium mb-8 max-w-2xl mx-auto">
              The only UK allergen tool that builds a database of your allergy customers —
              turning compliance into repeat business.
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
            TRUST BAR
        ================================================================ */}
        <div className="border-y border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-gray-500">
              <span>Built in compliance with FSA best practice guidance (March 2025)</span>
              <span className="hidden sm:inline">·</span>
              <span>All 14 UK regulated allergens covered</span>
              <span className="hidden sm:inline">·</span>
              <span>UK GDPR Article 9 compliant</span>
            </div>
          </div>
        </div>

        {/* ================================================================
            PROBLEM / SOLUTION
        ================================================================ */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Allergen compliance shouldn&apos;t cost you customers
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-4">
              2.4 million adults in the UK have a clinically confirmed food allergy. 60% of young
              allergic diners avoid eating out entirely because they don&apos;t trust the information.
              SafeEat gives them confidence — and gives you their repeat business.
            </p>
            <p className="text-center text-sm text-red-600 font-medium mb-12">
              Recent fines for allergen failures have reached £43,000 for independent UK restaurants.
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
                  confirmation is timestamped and logged. Download a one-click PDF inspection
                  report when the EHO visits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            OWEN'S LAW CALLOUT
        ================================================================ */}
        <section className="py-12 bg-amber-50 border-y border-amber-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Owen&apos;s Law is coming — are you ready?
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
              Owen&apos;s Law calls for mandatory written allergen information at the point of ordering
              in UK restaurants. The FSA published voluntary guidance in March 2025 and is evaluating
              uptake now. If compliance is poor, mandatory legislation follows. 47% of small food
              businesses still rely on verbal-only allergen communication.
            </p>
            <p className="text-sm text-amber-800 font-semibold">
              SafeEat gives you written allergen information via QR code today — ahead of the regulation.
            </p>
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
                  Enter your dishes with photos, prices, and allergens.
                  Takes about 15 minutes for a typical menu. Upload dish
                  photos so customers see exactly what they&apos;re ordering.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-lg font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Print your table talker</h3>
                <p className="text-sm text-gray-600">
                  Download a print-ready A5 table talker with your QR code.
                  Place it on tables, in the window, or on your paper menus.
                  Customers scan with any phone — no app needed.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-lg font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">Customers filter &amp; return</h3>
                <p className="text-sm text-gray-600">
                  Customers select their allergies and see safe dishes instantly.
                  They save their profile, get remembered on every visit,
                  and you build a customer database that drives loyalty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            USP — unique differentiator section
        ================================================================ */}
        <section className="py-16 bg-se-green-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The only UK allergen tool that builds your customer database
            </h2>
            <p className="text-se-green-100 text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Every other allergen tool stops at compliance — display the data and move on.
              SafeEat is different. When customers save their allergy profile, you build a database
              of diners with their allergen preferences and marketing opt-ins. You know which
              allergens are most common. You know who&apos;s coming back. You can send targeted
              notifications when your menu changes — reaching the right customers with the right message.
            </p>
            <p className="text-white font-semibold text-lg">
              Compliance tools show allergens. SafeEat builds relationships.
            </p>
          </div>
        </section>

        {/* ================================================================
            FEATURES — full feature set with all 10
        ================================================================ */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Everything you need to manage allergens and grow your business
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              10 features. One subscription. No other UK product offers all of this.
            </p>

            {/* Top row — 3 core features */}
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌾</span>
                  <h3 className="font-semibold text-gray-900">14 UK allergens</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Every dish tagged against all 14 regulated allergens. Customers filter your
                  menu in seconds. Dietary preferences — vegan, vegetarian, gluten-free, halal,
                  kosher — included as standard.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📸</span>
                  <h3 className="font-semibold text-gray-900">Dish photos</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Upload photos for every dish. Customers see what they&apos;re ordering alongside
                  allergen information. Photos display on both the dashboard and the customer-facing
                  menu.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📊</span>
                  <h3 className="font-semibold text-gray-900">Analytics dashboard</h3>
                </div>
                <p className="text-sm text-gray-600">
                  30-day scan trends, top allergens among your customers, new profile counts,
                  and return visitor rates. Know exactly how your allergy-aware customers
                  engage with your menu.
                </p>
              </div>
            </div>

            {/* Middle row — 4 features */}
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">🔔</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Allergen-targeted notifications</h3>
                  <p className="text-sm text-gray-600">
                    Send targeted emails to customers filtered by allergen. New gluten-free dishes? Notify
                    only your gluten-intolerant customers. Turn compliance data into a direct marketing channel.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">📄</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">One-click EHO inspection report</h3>
                  <p className="text-sm text-gray-600">
                    Generate a professional PDF with your full allergen matrix, dietary declarations,
                    ingredient records, staff training log, and verification audit trail. One click, ready
                    for the inspector.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Weekly insight emails</h3>
                  <p className="text-sm text-gray-600">
                    Every Monday, a branded report lands in your inbox — scan trends, new profiles,
                    top allergens, and a smart recommendation. Stay on top of your allergen data
                    without logging in.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-4">
                <span className="text-2xl flex-shrink-0">🔗</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">&ldquo;Safe for me&rdquo; shareable link</h3>
                  <p className="text-sm text-gray-600">
                    Customers share a pre-filtered menu link with friends and family. Perfect for group
                    bookings — one person sends the link and everyone sees what&apos;s safe before they
                    arrive.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom row — 3 features */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🖨️</span>
                  <h3 className="font-semibold text-gray-900">Table talker PDF</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Download a print-ready A5 card with your QR code and SafeEat branding. Slide it
                  into a table stand or laminate it. Ready to use in seconds.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">👨‍🍳</span>
                  <h3 className="font-semibold text-gray-900">Staff training log</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Record allergen awareness training for every team member with certificate
                  references. Automatically included in your EHO inspection report.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⭐</span>
                  <h3 className="font-semibold text-gray-900">Review prompts</h3>
                </div>
                <p className="text-sm text-gray-600">
                  After a customer saves their profile, prompt them to leave a Google or
                  TripAdvisor review. Turn satisfied allergy customers into public advocates.
                </p>
              </div>
            </div>

            {/* Bonus row — operational features */}
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">🚫</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">86&apos;d dish toggle</h4>
                    <p className="text-xs text-gray-500">
                      Run out of a dish mid-service? One tap hides it from the customer menu. One tap brings it back tomorrow.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">🔒</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">UK GDPR Article 9</h4>
                    <p className="text-xs text-gray-500">
                      Allergen data encrypted at rest, identifiers hashed, consent enforced, auto-deleted after 18 months.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">⚡</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">No app download</h4>
                    <p className="text-xs text-gray-500">
                      Customers scan, filter, and save — all in their phone browser. No friction, no app store.
                    </p>
                  </div>
                </div>
              </div>
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
                <p className="text-xs text-gray-400 mt-1">Every feature included. Nothing held back.</p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'Unlimited menu items with photos',
                  'All 14 UK allergens + dietary filters',
                  'QR code menu + printable table talker',
                  'Customer allergy profiles with consent',
                  'Allergen-targeted email notifications',
                  'Weekly insight emails every Monday',
                  'One-click EHO inspection report PDF',
                  'Staff allergen training log',
                  'Menu scan analytics dashboard',
                  '"Safe for me" shareable links',
                  'Google & TripAdvisor review prompts',
                  '86\'d dish toggle for daily service',
                  'UK GDPR Article 9 compliant',
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
