import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ALLERGENS = [
  { name: 'Celery', desc: 'Includes celery stalks, leaves, seeds, and celeriac. Found in salads, soups, stocks, and some processed foods. Often hidden in spice blends and seasoning mixes.' },
  { name: 'Cereals containing gluten', desc: 'Wheat, rye, barley, oats, spelt, and kamut. Present in bread, pasta, pastry, batter, cakes, sauces thickened with flour, and many processed foods.' },
  { name: 'Crustaceans', desc: 'Prawns, crab, lobster, crayfish, and shrimp. Used in seafood dishes, Thai curries, paella, bisques, and some Asian sauces and pastes.' },
  { name: 'Eggs', desc: 'All bird eggs. Found in cakes, mayonnaise, pasta, quiche, sauces, pastries, and some glazed breads. Used as a binding or glazing agent in many dishes.' },
  { name: 'Fish', desc: 'All species of fish. Present in fish sauce, Worcestershire sauce, Caesar dressing, some Asian dishes, and supplements. Can be found in unexpected places like beer fining agents.' },
  { name: 'Lupin', desc: 'A legume found in some types of bread, pastries, and pasta, particularly in continental European recipes. Lupin flour and seeds can trigger reactions in people with peanut allergies.' },
  { name: 'Milk', desc: 'Cow\'s milk and products derived from it, including butter, cheese, cream, yoghurt, and milk powder. Also includes goat\'s and sheep\'s milk. Present in many sauces, desserts, and baked goods.' },
  { name: 'Molluscs', desc: 'Mussels, oysters, squid, octopus, snails, and scallops. Found in seafood dishes, paella, sushi, and oyster sauce used in Chinese and Thai cooking.' },
  { name: 'Mustard', desc: 'Mustard seeds, powder, oil, and leaves. Present in salad dressings, marinades, sauces, curries, and processed meats. Often used in spice mixes and condiments.' },
  { name: 'Peanuts', desc: 'Also known as groundnuts. Found in peanut butter, satay sauce, groundnut oil, some desserts, and many Asian dishes. Can be present as refined oil in unexpected products.' },
  { name: 'Sesame', desc: 'Sesame seeds and oil. Found in bread, breadsticks, hummus, tahini, some Asian dishes, and salad dressings. Increasingly common in UK cuisine.' },
  { name: 'Soybeans', desc: 'Soya beans and soya-based products including tofu, soy sauce, soya milk, and soya flour. Widely used in processed foods, vegetarian products, and Asian cuisine.' },
  { name: 'Sulphur dioxide and sulphites', desc: 'Used as preservatives in dried fruit, wine, beer, soft drinks, sausages, and some processed foods. Must be declared when present at concentrations above 10mg/kg or 10mg/litre.' },
  { name: 'Tree nuts', desc: 'Almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, and macadamia nuts. Found in cakes, biscuits, praline, pesto, nut oils, marzipan, and many desserts.' },
]

export default function AllergensGuidePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'The 14 Allergens UK Restaurants Must Declare — Complete Guide',
    description: 'A comprehensive guide to the 14 regulated allergens under UK food law. What they are, where they hide, and how to declare them properly in your restaurant.',
    author: { '@type': 'Organization', name: 'SafeEat' },
    publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
  }

  return (
    <>
      <Helmet>
        <title>14 Allergens UK Restaurants Must Declare — Complete Guide | SafeEat</title>
        <meta name="description" content="Complete guide to the 14 regulated allergens UK restaurants must declare under the Food Information Regulations 2014. What they are, where they hide in your menu, and how to comply." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/14-allergens-uk" />
        <meta property="og:title" content="14 Allergens UK Restaurants Must Declare — Complete Guide" />
        <meta property="og:description" content="Complete guide to the 14 regulated allergens UK restaurants must declare. What they are, where they hide, and how to comply." />
        <meta property="og:url" content="https://safeeat.co.uk/guides/14-allergens-uk" />
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
            <span className="text-gray-600">14 Allergens UK</span>
          </div>
        </div>

        {/* Article */}
        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              The 14 allergens UK restaurants must declare
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Under the Food Information Regulations 2014, every UK food business — restaurants,
              cafés, pubs, and takeaways — must declare 14 specific allergens whenever they are
              used as ingredients. This guide covers each allergen, where it commonly hides in
              restaurant menus, and how to comply with UK food law.
            </p>
          </header>

          {/* Quick reference */}
          <div className="bg-se-green-50 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Quick reference: all 14 at a glance</h2>
            <div className="flex flex-wrap gap-2">
              {ALLERGENS.map((a) => (
                <span key={a.name} className="px-3 py-1 rounded-full bg-white border border-se-green-200 text-sm text-gray-700">
                  {a.name}
                </span>
              ))}
            </div>
          </div>

          {/* The law */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What does UK law require?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Food Information Regulations 2014 (implementing EU Regulation 1169/2011) require
              all UK food businesses to inform customers about the presence of any of the 14
              regulated allergens in the food they sell. This applies to prepacked food, prepacked
              for direct sale (PPDS) under Natasha&apos;s Law, and non-prepacked food served in
              restaurants and takeaways.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              For restaurants serving non-prepacked food, allergen information can be provided in
              writing (menus, chalkboards, information packs) or verbally with a written notice
              directing customers to ask. However, the FSA&apos;s best practice guidance published
              in March 2025 explicitly recommends written allergen information supported by staff
              conversations — moving away from the &quot;just ask&quot; approach.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Owen&apos;s Law, currently under evaluation by the UK government, may make written
              allergen disclosure mandatory. Read our{' '}
              <Link to="/guides/owens-law" className="text-se-green-600 font-medium hover:underline">
                Owen&apos;s Law guide
              </Link>{' '}
              for details on the timeline and how to prepare.
            </p>
          </section>

          {/* Each allergen */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">The 14 allergens explained</h2>
            <div className="space-y-6">
              {ALLERGENS.map((a, i) => (
                <div key={a.name} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    <span className="text-se-green-600 mr-2">{i + 1}.</span>
                    {a.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Common mistakes */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Common mistakes restaurants make</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The FSA&apos;s targeted surveillance found undeclared allergens in 16% of foods tested.
              The most common failures include not accounting for allergens in stocks, sauces,
              and marinades; failing to update allergen information when recipes or suppliers change;
              relying entirely on verbal communication without a written backup; and not training
              all staff — including temporary and agency workers — on allergen procedures.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Recent prosecutions of independent restaurants have resulted in fines exceeding
              £43,000. Read our{' '}
              <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">
                EHO inspection guide
              </Link>{' '}
              to understand what inspectors look for and how to prepare.
            </p>
          </section>

          {/* CTA */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Managing 14 allergens across your menu doesn&apos;t have to be manual
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              SafeEat lets you tag every dish against all 14 allergens, gives customers a QR code
              to filter your menu by their allergies, and keeps a verification audit trail for
              EHO inspections. Set up in 15 minutes.
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
