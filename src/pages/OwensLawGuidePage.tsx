import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function OwensLawGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Owen\'s Law: What UK Restaurants Need to Know in 2026',
    description: 'Owen\'s Law calls for mandatory written allergen information in UK restaurants. The FSA is evaluating voluntary uptake in spring 2026. Here\'s what it means for your business.',
    author: { '@type': 'Organization', name: 'SafeEat' },
    publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
  }

  return (
    <>
      <Helmet>
        <title>Owen's Law UK Restaurants: What You Need to Know in 2026 | SafeEat</title>
        <meta name="description" content="Owen's Law calls for mandatory written allergen information in UK restaurants. The FSA is evaluating uptake in spring 2026. What it means for your restaurant and how to prepare now." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/owens-law" />
        <meta property="og:title" content="Owen's Law UK Restaurants: What You Need to Know in 2026" />
        <meta property="og:description" content="Owen's Law calls for mandatory written allergen information in UK restaurants. What it means and how to prepare." />
        <meta property="og:url" content="https://safeeat.co.uk/guides/owens-law" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Nav */}
        <nav className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-gray-900">SafeEat</span>
            </Link>
            <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors">
              Start free trial
            </Link>
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Guides</span>
            <span>/</span>
            <span className="text-gray-600">Owen&apos;s Law</span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              FSA evaluation in progress — spring 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Owen&apos;s Law: what UK restaurants need to know in 2026
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Owen&apos;s Law calls for mandatory written allergen information at the point of
              ordering in UK restaurants — without the customer needing to ask. The government
              is evaluating voluntary compliance right now. If uptake is poor, legislation follows.
              Here&apos;s what it means for your business and how to get ahead of it.
            </p>
          </header>

          {/* The story */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Who was Owen Carey?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Owen Carey was 18 years old when he died on 22 April 2017 after eating
              buttermilk-marinated chicken at a Byron restaurant in London. Owen had a
              severe dairy allergy. He told staff about his allergy, but the menu did not
              list buttermilk as an ingredient, and the marinade was not disclosed. Owen
              suffered a fatal anaphylactic reaction.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Owen&apos;s family have since campaigned for a change in the law to require restaurants
              to display allergen information in writing on the menu itself — not just verbally
              on request. This campaign became known as Owen&apos;s Law.
            </p>
          </section>

          {/* What it proposes */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What does Owen&apos;s Law propose?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Owen&apos;s Law calls for mandatory written allergen information to be provided
              at the point of ordering in all UK food businesses — on the menu, on a board,
              or through a digital display — without the customer having to ask for it. The
              key principle is that customers with allergies should be able to identify safe
              dishes independently, rather than relying on a conversation with staff that
              may be inaccurate, rushed, or forgotten.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The FSA Board backed this principle in December 2023. Rather than legislating
              immediately, the government took a two-step approach: publish voluntary best-practice
              guidance first, then evaluate whether businesses actually follow it.
            </p>
          </section>

          {/* Timeline */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The timeline: where are we now?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-sm font-semibold text-se-green-600">April 2017</div>
                <p className="text-sm text-gray-600">Owen Carey dies after eating undeclared buttermilk at a Byron restaurant</p>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-sm font-semibold text-se-green-600">Dec 2023</div>
                <p className="text-sm text-gray-600">FSA Board backs the principle of mandatory written allergen disclosure</p>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-sm font-semibold text-se-green-600">March 2025</div>
                <p className="text-sm text-gray-600">Government publishes voluntary best-practice guidance for providing allergen information in writing</p>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-sm font-bold text-amber-600">Spring 2026</div>
                <p className="text-sm text-gray-700 font-medium">Government evaluates uptake of voluntary guidance — results will inform whether mandatory legislation is needed</p>
              </div>
              <div className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-sm font-semibold text-gray-400">2027?</div>
                <p className="text-sm text-gray-500">If uptake is poor, mandatory legislation could follow</p>
              </div>
            </div>
          </section>

          {/* The problem */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why voluntary compliance is likely to fall short</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The FSA&apos;s own Small and Micro FBO survey found that 47% of small food businesses
              still provide allergen information only verbally on request. This is exactly the
              practice Owen&apos;s Law aims to eliminate. If nearly half of small businesses haven&apos;t
              adopted written allergen disclosure even with voluntary guidance in place, the
              evaluation is unlikely to show strong uptake — making mandatory legislation
              significantly more probable.
            </p>
            <p className="text-gray-600 leading-relaxed">
              For context, the{' '}
              <Link to="/guides/14-allergens-uk" className="text-se-green-600 font-medium hover:underline">
                14 allergens that must be declared
              </Link>{' '}
              are already a legal requirement. Owen&apos;s Law doesn&apos;t add new allergens — it
              changes <em>how</em> the information must be presented: in writing, on the menu,
              without the customer asking.
            </p>
          </section>

          {/* What to do */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What should your restaurant do now?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The businesses that comply now — before legislation makes it mandatory — will be
              ahead of the curve. The voluntary guidance is clear: provide written allergen
              information that customers can access independently, supported by staff conversations.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Practically, this means having allergen information visible on your menu, on a
              board, or through a digital system. A QR code linking to a filterable allergen
              menu meets the guidance perfectly — it provides written information at the point
              of ordering, customers can access it without asking, and it can be updated instantly
              when recipes change.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Beyond compliance, an{' '}
              <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">
                EHO inspection
              </Link>{' '}
              will look more favourably on a business that has adopted best practice voluntarily
              than one that was forced to comply after legislation.
            </p>
          </section>

          {/* Prosecution context */}
          <div className="bg-red-50 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">The cost of getting it wrong</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              Owen Carey&apos;s death was not an isolated incident. Recent cases involving
              independent UK food businesses include fines of £43,816 (Javitri Restaurant,
              Uxbridge), £27,803 (The Rusty Gun Pub, Hitchin), and £1,920 (Small&apos;s Kitchen,
              Derby). Under the Food Information Regulations 2014, fines are potentially unlimited.
            </p>
            <p className="text-sm text-red-700 font-medium">
              Hospital admissions for anaphylaxis reached 4,323 in 2023/24 — a 154% increase
              over 20 years.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Get ahead of Owen&apos;s Law today
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              SafeEat gives your customers written allergen information via QR code — exactly what
              Owen&apos;s Law calls for. Add your menu in 15 minutes and you&apos;re compliant with
              the FSA&apos;s best practice guidance before it becomes law.
            </p>
            <Link
              to="/dashboard"
              className="inline-block px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors"
            >
              Start your free trial
            </Link>
            <p className="text-xs text-gray-400 mt-3">£29.99/month. No credit card required.</p>
          </div>
        </article>

        {/* Footer */}
        <footer className="border-t border-gray-200 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                <span className="text-sm font-bold text-gray-900">SafeEat</span>
                <span className="text-xs text-gray-400">© {new Date().getFullYear()}</span>
              </div>
              <nav className="flex items-center gap-6">
                <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy</Link>
                <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms</Link>
                <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
