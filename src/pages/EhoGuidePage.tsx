import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function EhoGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'EHO Allergen Inspections: What UK Restaurants Need to Know',
    description: 'What Environmental Health Officers look for during allergen inspections, how to prepare, and how to build an audit trail that demonstrates compliance.',
    author: { '@type': 'Organization', name: 'SafeEat' },
    publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
  }

  return (
    <>
      <Helmet>
        <title>EHO Allergen Inspections: What UK Restaurants Must Know | SafeEat</title>
        <meta name="description" content="What EHO inspectors look for during allergen checks in UK restaurants. How to prepare, what documentation you need, and how to build an audit trail that demonstrates compliance." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/eho-allergen-inspection" />
        <meta property="og:title" content="EHO Allergen Inspections: What UK Restaurants Must Know" />
        <meta property="og:description" content="What EHO inspectors look for during allergen checks. How to prepare and build an audit trail." />
        <meta property="og:url" content="https://safeeat.co.uk/guides/eho-allergen-inspection" />
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
            <span className="text-gray-600">EHO Allergen Inspection</span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              EHO allergen inspections: what UK restaurants need to know
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Environmental Health Officers can inspect your allergen management at any time.
              Knowing what they look for — and having the right documentation ready — is the
              difference between a clean pass and a compliance notice. This guide covers what
              to expect, how to prepare, and how to build an audit trail that works in your favour.
            </p>
          </header>

          {/* What EHOs check */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What do EHO inspectors check for allergens?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Allergen management is assessed as part of your Food Hygiene Rating. An EHO will
              typically examine several areas during their inspection, and allergen compliance
              has become an increasingly prominent focus following high-profile prosecution cases
              and the FSA&apos;s strengthened guidance.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              The core areas inspectors assess include: whether you can identify which of the{' '}
              <Link to="/guides/14-allergens-uk" className="text-se-green-600 font-medium hover:underline">
                14 regulated allergens
              </Link>{' '}
              are present in each dish; how you communicate this information to customers;
              whether your staff are trained on allergen procedures; how you prevent
              cross-contamination in the kitchen; and whether your allergen information is
              accurate and up to date.
            </p>
          </section>

          {/* What they want to see */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The documentation EHOs want to see</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              EHOs are looking for evidence that your allergen management is systematic, not
              ad hoc. They want to see that you have a process, not just a one-off effort.
              The key documents and evidence they look for include:
            </p>
            <div className="space-y-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Allergen information for customers</h3>
                <p className="text-sm text-gray-600">Written allergen data for every dish — on the menu, on a board, or in an information pack. The FSA recommends written information over verbal-only communication.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Ingredient records</h3>
                <p className="text-sm text-gray-600">Documentation of ingredients used in each dish, including compound ingredients and bought-in products. You need to know what allergens are in your supplier&apos;s products.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Staff training records</h3>
                <p className="text-sm text-gray-600">Evidence that staff have been trained on allergen management, know the 14 allergens, and understand what to do when a customer declares an allergy.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Review and verification records</h3>
                <p className="text-sm text-gray-600">Evidence that you regularly review and verify your allergen information — especially after recipe changes, supplier changes, or menu updates. This is where an audit trail is critical.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Cross-contamination controls</h3>
                <p className="text-sm text-gray-600">Procedures for preventing allergen cross-contact in the kitchen — separate preparation areas, dedicated utensils, cleaning procedures, and storage practices.</p>
              </div>
            </div>
          </section>

          {/* The audit trail */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why an audit trail matters</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The single most valuable piece of evidence you can show an EHO is a dated record
              proving that your allergen information was reviewed recently. An inspector visiting
              in April who sees your last allergen review was in January will have concerns. One
              who sees weekly verifications with timestamps demonstrates active management.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              This is particularly important because the most common allergen failure is not
              deliberate — it&apos;s drift. A supplier changes an ingredient. A chef substitutes
              one product for another. A recipe evolves over time. Without regular verification,
              your allergen information quietly becomes inaccurate.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In prosecution cases, judges have repeatedly noted the absence of systematic
              allergen review processes. The Rusty Gun Pub in Hitchin was fined £27,803 partly
              because the judge noted the company &quot;had not learnt&quot; from two previous
              allergen incidents — suggesting no systematic review process existed.
            </p>
          </section>

          {/* What happens if you fail */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What happens if you fail an allergen inspection?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Outcomes range from informal advice and a compliance letter to formal enforcement
              action. The severity depends on the nature and extent of the failure:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <span className="text-amber-500 flex-shrink-0 mt-0.5">⚠️</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Minor issues:</strong> Written advice, a compliance letter, and a follow-up visit. Your food hygiene rating may be affected.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-orange-500 flex-shrink-0 mt-0.5">🔶</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Significant failures:</strong> An improvement notice requiring specific changes within a set timeframe. Failure to comply is a criminal offence.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500 flex-shrink-0 mt-0.5">🔴</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Serious or repeat failures:</strong> Prosecution under the Food Information Regulations 2014 or the Food Safety Act 1990. Fines are potentially unlimited. In the most serious cases, a Hygiene Emergency Prohibition Notice can close your business immediately.</p>
              </div>
            </div>
          </section>

          {/* Recent cases */}
          <div className="bg-red-50 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Recent prosecution cases</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Javitri Restaurant, Uxbridge — £43,816 fine (April 2025)</p>
                <p className="text-xs text-gray-600">Customer with nut allergy hospitalised. Inspectors found the allergen menu was still inaccurate on a return visit.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">The Rusty Gun Pub, Hitchin — £27,803 fine (May 2025)</p>
                <p className="text-xs text-gray-600">9-year-old with wheat allergy had a severe reaction. Judge noted the company had not learnt from two previous incidents.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Oxfordshire Thai Restaurant — prosecution (March 2026)</p>
                <p className="text-xs text-gray-600">Lab analysis found 618mg of soy protein in a dish ordered by a soy-allergic trading standards officer — 61 times the safe limit.</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Small&apos;s Kitchen, Derby — £1,920 fine (June 2025)</p>
                <p className="text-xs text-gray-600">Independent business fined for selling protein balls with undeclared nuts despite being asked multiple times.</p>
              </div>
            </div>
          </div>

          {/* How to prepare */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How to prepare for an allergen inspection</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The best preparation is not to prepare at all — in the sense that allergen
              management should be an ongoing process, not something you rush before an
              inspection. EHOs visit unannounced, so the state of your allergen management
              on any given day should reflect your standard practice.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              That said, there are practical steps you can take to strengthen your position.
              Ensure all{' '}
              <Link to="/guides/14-allergens-uk" className="text-se-green-600 font-medium hover:underline">
                14 allergens
              </Link>{' '}
              are documented for every dish. Verify your allergen information at least weekly —
              especially after any supplier or recipe changes. Train every member of staff,
              including temporary workers, on your allergen procedures. Keep a record of when
              you last reviewed your allergen information and who confirmed it.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With{' '}
              <Link to="/guides/owens-law" className="text-se-green-600 font-medium hover:underline">
                Owen&apos;s Law
              </Link>{' '}
              evaluation underway, EHOs are increasingly checking whether allergen information
              is provided in writing. Having a digital allergen menu that customers can access
              via QR code demonstrates you&apos;ve adopted the FSA&apos;s best practice guidance.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Build your allergen audit trail in 15 minutes
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              SafeEat gives you a timestamped verification log that records every time you
              confirm your menu allergen information — exactly the evidence an EHO wants to see.
              Add your menu, verify it, and your audit trail starts immediately.
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
