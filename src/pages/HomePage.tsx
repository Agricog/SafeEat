import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What are the 14 allergens UK restaurants must declare?',
    a: 'Under the Food Information Regulations 2014, UK food businesses must declare these 14 allergens: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts (tree nuts), peanuts, sesame, soybeans, and sulphur dioxide (sulphites above 10mg/kg). SafeEat covers all 14 so customers can instantly see which dishes are safe for them.',
  },
  {
    q: "How does SafeEat help with Natasha's Law compliance?",
    a: "Natasha's Law (the UK Allergen Labelling Regulations 2021) requires prepacked for direct sale (PPDS) food to carry a full ingredients list with the 14 allergens emphasised. SafeEat extends this to your dine-in menu with a digital allergen display that customers access via QR code. Our weekly verification flow and timestamped audit trail give you documented proof of allergen diligence for EHO inspections.",
  },
  {
    q: "What is Owen's Law and how does it affect my restaurant?",
    a: "Owen's Law calls for mandatory written allergen information at the point of ordering in UK restaurants, without the customer needing to ask. The FSA published voluntary best-practice guidance in March 2025 and is evaluating uptake in spring 2026 \u2014 if compliance is poor, mandatory legislation follows. SafeEat gives you written allergen information via QR code now, putting you ahead of the likely regulation.",
  },
  {
    q: 'Does SafeEat handle cross-contamination?',
    a: 'Yes \u2014 and this is unique to SafeEat among UK allergen tools for independents. You can set a venue-wide kitchen notice disclosing shared equipment (for example: "Our kitchen handles nuts, gluten, and shellfish \u2014 cross-contamination cannot be guaranteed"), and you can also flag per-dish cross-contamination risks. Each dish shows "Contains" allergens separately from "May contain" allergens. Customers see both, which is what UK allergen law actually requires \u2014 not just intentional ingredients.',
  },
  {
    q: 'What if a customer has an allergic reaction \u2014 can you prove what was disclosed?',
    a: 'Yes. SafeEat keeps a full audit trail of every dish change. When you edit allergens, ingredients, or cross-contamination flags, the old and new values are logged with a timestamp. If an EHO officer investigates an incident, you can pull up exactly what a dish was declared as on the date of the customer\'s visit. This is the single biggest legal protection SafeEat offers \u2014 and no other UK independent-focused tool has it.',
  },
  {
    q: 'Is SafeEat liable if something goes wrong at my venue?',
    a: 'No. SafeEat is a conduit for the allergen information you are legally required to provide as the food business. We display and record the information you supply \u2014 we don\'t prepare food, train your staff, or verify ingredients. You remain responsible for data accuracy, staff training, kitchen practices, and food preparation, exactly as you are today. Our Terms of Service make this allocation of responsibility explicit.',
  },
  {
    q: 'Can international customers use SafeEat?',
    a: 'Yes. Your customer menu is available in English, French, Spanish, and German \u2014 so a German tourist scanning your QR code sees the allergens and interface in German automatically, with a flag picker to switch languages manually. Allergen names and UI labels are hand-verified translations, not machine translation, so allergen accuracy is guaranteed in every supported language. Essential for tourist regions like Cornwall, the Lake District, Edinburgh, and Bath.',
  },
  {
    q: 'How do customers use SafeEat?',
    a: "Customers scan the QR code on your table, window, or menu. They select their allergens from a simple visual picker, and your menu instantly filters to show only safe dishes. They can save their allergy profile so it remembers them on future visits \u2014 turning a one-time scan into a returning customer.",
  },
  {
    q: 'Do I need any special hardware or equipment?',
    a: 'No. SafeEat is entirely web-based. Your customers scan a QR code with their phone camera \u2014 no app download required. You manage your menu and allergens from any browser. All you need is the printed QR code or table talker, which you can download from your dashboard.',
  },
  {
    q: 'What happens during an EHO inspection?',
    a: 'SafeEat generates a comprehensive EHO inspection report PDF with one click. It includes your full allergen matrix showing every dish against every allergen, dietary declarations, ingredient records, staff training records, and your complete verification audit trail with timestamps. Environmental Health Officers get clear, documented evidence of your allergen management process.',
  },
  {
    q: 'How is customer allergy data protected?',
    a: 'Customer allergen profiles are special-category health data under UK GDPR Article 9. SafeEat encrypts all allergen data at rest, hashes personal identifiers, stores profiles only with explicit consent, and auto-deletes after 18 months of inactivity. Customers can delete their profile at any time \u2014 both from their own device and from your database \u2014 satisfying the GDPR right to erasure.',
  },
  {
    q: 'Can I send notifications to my allergy customers?',
    a: "Yes. Customers who opt into marketing can receive targeted notifications when your menu changes. You can filter by specific allergens \u2014 for example, notify only gluten-intolerant customers when you add new gluten-free dishes. This turns allergen compliance into a direct retention channel.",
  },
  {
    q: 'Can customers share a pre-filtered menu link?',
    a: "Yes. When a customer has their allergens selected, they can share a link that pre-filters your menu for the same allergies. This is especially useful for group bookings \u2014 one person with a nut allergy can send the filtered menu to the group so everyone can see what the restaurant offers safely.",
  },
  {
    q: 'Is there a contract or commitment?',
    a: "No. SafeEat is \u00a329.99 per month with no setup fees and no long-term contracts. You can cancel any time from your dashboard. If you cancel, your subscription runs until the end of the billing period.",
  },
  {
    q: 'How much does SafeEat cost?',
    a: "SafeEat is \u00a329.99 per month per venue. This includes every feature \u2014 unlimited menu items, dish photos, cross-contamination disclosure, dish change audit trail, multi-language menu, customer allergen profiles, EHO inspection reports, analytics dashboard, targeted notifications, staff training log, printable table talkers, and more. No setup fees, no long-term contracts \u2014 cancel any time.",
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
        <title>SafeEat \u2014 The Three-Lock Allergen System for UK venues</title>
        <meta
          name="description"
          content="SafeEat is the Three-Lock Allergen System for UK independent venues. Before they order, every allergy customer can see exactly what's safe \u2014 in their language, up front, in seconds. Inspection-ready in 30 days or your next 3 months are free."
        />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-gray-900">SafeEat</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#how" className="text-sm text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">How it works</a>
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
                Get started
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO \u2014 customer-first framing */}
        <header className="py-16 sm:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-se-green-50 text-se-green-700 text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-se-green-500 animate-pulse" />
              The Three-Lock Allergen System for UK venues
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Before they order,{' '}
              <span className="text-se-green-600">they can see exactly what&apos;s safe.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              Every allergy customer. In their language. Up front. In seconds.
            </p>
            <p className="text-base text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              SafeEat is a conduit for the allergen information you are already legally required to provide.
              We make it accessible to customers, drive repeat visits, and keep the records that prove
              you met your obligations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors text-center"
              >
                Get started
              </Link>
              <a
                href="/menu/joes-cafe-39vs"
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors text-center"
              >
                See a live demo menu
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              £29.99/month. No setup fee. No lock-in. Cancel any time.
            </p>
            <p className="text-sm text-gray-500 mt-6 max-w-2xl mx-auto inline-flex items-center justify-center gap-1.5 flex-wrap">
              <span>Customer menu available in</span>
              <span className="inline-flex items-center gap-1 font-medium text-gray-700">
                🇬🇧 English <span className="text-gray-300">·</span>
                🇫🇷 French <span className="text-gray-300">·</span>
                🇪🇸 Spanish <span className="text-gray-300">·</span>
                🇩🇪 German
              </span>
            </p>
          </div>
        </header>

        {/* Trust strip */}
        <div className="border-y border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500">
              <span>Natasha&apos;s Law compliant</span>
              <span className="hidden sm:inline">·</span>
              <span>All 14 UK regulated allergens</span>
              <span className="hidden sm:inline">·</span>
              <span>Cross-contamination disclosure</span>
              <span className="hidden sm:inline">·</span>
              <span>UK GDPR Article 9 compliant</span>
            </div>
          </div>
        </div>

        {/* THE THREE-LOCK ALLERGEN SYSTEM */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                The Three-Lock Allergen System
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three layers working together \u2014 so every allergy customer orders with confidence,
                and you have the record to prove you did everything right.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-se-green-50 rounded-xl border border-se-green-200 p-6">
                <div className="text-xs font-bold text-se-green-700 uppercase tracking-wide mb-2">Lock 1</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Confidence at the table</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Every allergy customer sees what&apos;s safe for them \u2014 in seconds, in their language,
                  before they order. One scan. No app. Works on every phone.
                </p>
              </div>
              <div className="bg-se-green-50 rounded-xl border border-se-green-200 p-6">
                <div className="text-xs font-bold text-se-green-700 uppercase tracking-wide mb-2">Lock 2</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Accuracy in the kitchen</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Every dish, every allergen, always current. Change a recipe and the menu updates.
                  Staff trained, logged, and confident in what they serve.
                </p>
              </div>
              <div className="bg-se-green-50 rounded-xl border border-se-green-200 p-6">
                <div className="text-xs font-bold text-se-green-700 uppercase tracking-wide mb-2">Lock 3</div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">Record behind the scenes</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Every dish change, scan, and training session \u2014 time-stamped and inspection-ready.
                  If anyone ever asks, the record is already there.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE GUARANTEE */}
        <section className="py-16 bg-amber-50 border-y border-amber-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-800 text-xs font-bold uppercase tracking-wide mb-4">
              The 30-Day Allergen-Ready Guarantee
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Your allergen system, inspection-ready in 30 days.
            </h2>
            <p className="text-lg text-gray-800 font-semibold mb-3">
              If not \u2014 your next 3 months are free.
            </p>
            <p className="text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
              Within 30 days we&apos;ll have your live QR menu, dish audit trail, staff training log,
              and EHO allergen report in place. No forms, no small print, no argument.
            </p>
          </div>
        </section>

        {/* CUSTOMER STATS */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Allergen care shouldn&apos;t cost you customers
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-4">
              2.4 million adults in the UK have a clinically confirmed food allergy. 60% of young
              allergic diners avoid eating out entirely because they don&apos;t trust the information.
              SafeEat gives them confidence \u2014 and gives you their repeat business.
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
                  and sulphites \u2014 all covered.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-gray-900 mb-2">QR-code allergen menus</h3>
                <p className="text-sm text-gray-600">
                  Customers scan your QR code and filter your menu by their specific allergies.
                  Safe dishes highlighted, unsafe dishes faded. No app download \u2014 works in any
                  phone browser.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-semibold text-gray-900 mb-2">Inspection-ready audit trail</h3>
                <p className="text-sm text-gray-600">
                  Weekly verification prompts you to confirm your menu is current. Every
                  confirmation is timestamped and logged. Download a one-click PDF allergen
                  report when the EHO visits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OWEN'S LAW CALLOUT */}
        <section className="py-12 bg-amber-50 border-y border-amber-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Owen&apos;s Law is coming \u2014 are you ready?
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl mx-auto mb-4">
              Owen&apos;s Law calls for mandatory written allergen information at the point of ordering
              in UK restaurants. The FSA published voluntary guidance in March 2025 and is evaluating
              uptake now. If compliance is poor, mandatory legislation follows. 47% of small food
              businesses still rely on verbal-only allergen communication.
            </p>
            <p className="text-sm text-amber-800 font-semibold">
              SafeEat gives you written allergen information via QR code today \u2014 ahead of the regulation.
            </p>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="py-16">
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
                  Customers scan with any phone \u2014 no app needed.
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

        {/* CRM BONUS STRIP */}
        <section className="py-16 bg-se-green-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Compliance that compounds into repeat visits
            </h2>
            <p className="text-se-green-100 text-base leading-relaxed max-w-2xl mx-auto mb-6">
              Every other allergen tool stops at compliance \u2014 display the data and move on.
              SafeEat is different. When allergy customers save their profile, you build a database
              of diners with their allergen needs and opt-ins. Notify them when you add dishes that
              are safe for them. Ask them for a Google or TripAdvisor review after their visit.
              Turn allergen care into lasting loyalty.
            </p>
            <p className="text-white font-semibold text-lg">
              Compliance tools show allergens. SafeEat builds relationships.
            </p>
          </div>
        </section>

        {/* FULL FEATURES */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Everything you need, in one subscription
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Every feature included at £29.99/month. No add-ons. No surprises.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌾</span>
                  <h3 className="font-semibold text-gray-900">14 UK allergens</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Every dish tagged against all 14 regulated allergens. Customers filter your
                  menu in seconds. Dietary preferences \u2014 vegan, vegetarian, gluten-free, halal,
                  kosher \u2014 included as standard.
                </p>
              </div>
              <div className="bg-white rounded-xl border-2 border-se-green-200 bg-se-green-50/30 p-5 relative">
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-se-green-600 text-white text-[10px] font-bold uppercase tracking-wide">New</span>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="font-semibold text-gray-900">Cross-contamination</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Set a kitchen-wide disclosure for shared equipment, plus flag per-dish
                  &ldquo;may contain&rdquo; allergens separately from intentional ingredients.
                  No other UK independent-focused tool covers this.
                </p>
              </div>
              <div className="bg-white rounded-xl border-2 border-se-green-200 bg-se-green-50/30 p-5 relative">
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-se-green-600 text-white text-[10px] font-bold uppercase tracking-wide">New</span>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📜</span>
                  <h3 className="font-semibold text-gray-900">Dish change audit trail</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Every allergen, ingredient, and cross-contamination edit is logged with a
                  timestamp. If an incident happens, you can prove exactly what a dish was
                  declared as on any past date.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-xl border-2 border-se-green-200 bg-se-green-50/30 p-5 relative">
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-se-green-600 text-white text-[10px] font-bold uppercase tracking-wide">New</span>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌍</span>
                  <h3 className="font-semibold text-gray-900">Multi-language menu</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Customers switch between 🇬🇧 English, 🇫🇷 French, 🇪🇸 Spanish, and 🇩🇪 German
                  with one tap. Hand-verified allergen translations \u2014 not machine translation
                  \u2014 so accuracy is guaranteed. Perfect for tourist regions.
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
                  <h3 className="font-semibold text-gray-900 mb-1">One-click EHO allergen report</h3>
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
                    Every Monday, a branded report lands in your inbox \u2014 scan trends, new profiles,
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
                    bookings \u2014 one person sends the link and everyone sees what&apos;s safe before they
                    arrive.
                  </p>
                </div>
              </div>
            </div>
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
            <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
              <div className="grid sm:grid-cols-4 gap-6">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">🚫</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">86&apos;d dish toggle</h4>
                    <p className="text-xs text-gray-500">
                      Run out of a dish mid-service? One tap hides it from the customer menu.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">🔒</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">UK GDPR Article 9</h4>
                    <p className="text-xs text-gray-500">
                      Encrypted at rest, hashed identifiers, consent enforced, full right to erasure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">🆘</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Emergency 999 notice</h4>
                    <p className="text-xs text-gray-500">
                      Every menu carries a clear 999 emergency notice \u2014 EHO-recommended best practice.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">⚡</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">No app download</h4>
                    <p className="text-xs text-gray-500">
                      Customers scan, filter, and save \u2014 all in their phone browser. No friction.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-16">
          <div className="max-w-lg mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              Simple pricing, no surprises
            </h2>
            <div className="bg-white rounded-2xl border-2 border-se-green-600 p-8">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">SafeEat</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">£29.99</span>
                  <span className="text-gray-500">/month per venue</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Founding Cornwall price. Locked for 3 years.
                </p>
              </div>
              <div className="space-y-3 mb-8">
                {[
                  'Unlimited menu items with photos',
                  'All 14 UK allergens + dietary filters',
                  'Cross-contamination disclosure (kitchen + per-dish)',
                  'Full dish change audit trail (EHO-defensible)',
                  'Multi-language menu (EN / FR / ES / DE)',
                  'QR code menu + printable table talker',
                  'Customer allergy profiles with consent',
                  'GDPR right to erasure built in',
                  'Allergen-targeted email notifications',
                  'Weekly insight emails every Monday',
                  'One-click EHO allergen report PDF',
                  'Staff allergen training log',
                  'Menu scan analytics dashboard',
                  '"Safe for me" shareable links',
                  'Google & TripAdvisor review prompts',
                  "86'd dish toggle for daily service",
                  'Emergency 999 notice on every menu',
                  'UK GDPR Article 9 compliant',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="text-se-green-600 mt-0.5">✓</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1">
                  The 30-Day Allergen-Ready Guarantee
                </p>
                <p className="text-sm text-gray-700">
                  Inspection-ready in 30 days \u2014 or your next 3 months are free.
                </p>
              </div>
              <Link
                to="/dashboard"
                className="block w-full px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors text-center"
              >
                Get started
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">
                No setup fees. No contracts. Cancel any time.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
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

        {/* FINAL CTA */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Before they order, they&apos;ll know exactly what&apos;s safe.
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              Join UK independent venues using SafeEat to care for their allergy customers,
              keep inspection-ready records, and build a loyal customer base.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-8 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors"
            >
              Get started
            </Link>
            <p className="text-xs text-gray-400 mt-4">
              £29.99/month. Inspection-ready in 30 days or your next 3 months are free.
            </p>
          </div>
        </section>

        {/* FOOTER with DISCLAIMER */}
        <footer className="border-t border-gray-200 py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="mb-6 pb-6 border-b border-gray-200">
              <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
                <span className="font-semibold text-gray-700">What SafeEat is:</span>{' '}
                SafeEat is a conduit for the allergen information businesses are legally required to provide.
                We display and record the information supplied by the venue. The venue remains responsible for
                the accuracy of that information, staff training, kitchen practices, and food preparation.
                Full terms and conditions at{' '}
                <Link to="/terms" className="text-se-green-700 underline hover:text-se-green-800">
                  safeeat.co.uk/terms
                </Link>.
              </p>
            </div>
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
