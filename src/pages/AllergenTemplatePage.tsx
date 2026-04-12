import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const TEMPLATE_ROWS = [
  { dish: 'Caesar Salad', gluten: true, eggs: true, fish: true, milk: true },
  { dish: 'Margherita Pizza', gluten: true, milk: true },
  { dish: 'Grilled Chicken Breast' },
  { dish: 'Fish & Chips', gluten: true, fish: true },
  { dish: 'Chocolate Brownie', gluten: true, eggs: true, milk: true },
]

const ALLERGEN_COLS = [
  'Celery', 'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk',
  'Molluscs', 'Mustard', 'Peanuts', 'Sesame', 'Soy', 'Sulphites', 'Tree nuts',
]

export default function AllergenTemplatePage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Free Allergen Menu Template for UK Restaurants',
    description: 'Download a free allergen menu template or use SafeEat\'s digital allergen menu with QR code filtering. Covers all 14 UK regulated allergens.',
    author: { '@type': 'Organization', name: 'SafeEat' },
    publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
  }

  return (
    <>
      <Helmet>
        <title>Free Allergen Menu Template for UK Restaurants | SafeEat</title>
        <meta name="description" content="Free allergen menu template for UK restaurants, cafés, and takeaways. Covers all 14 regulated allergens. Download the matrix or switch to SafeEat's digital QR code menu." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/allergen-menu-template" />
        <meta property="og:title" content="Free Allergen Menu Template for UK Restaurants" />
        <meta property="og:description" content="Free allergen menu template covering all 14 UK regulated allergens. Download or go digital with SafeEat." />
        <meta property="og:url" content="https://safeeat.co.uk/guides/allergen-menu-template" />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
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

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Guides</span>
            <span>/</span>
            <span className="text-gray-600">Allergen Menu Template</span>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Free allergen menu template for UK restaurants
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every UK food business needs to declare the{' '}
              <Link to="/guides/14-allergens-uk" className="text-se-green-600 font-medium hover:underline">
                14 regulated allergens
              </Link>{' '}
              in their menu. This page shows you the standard allergen matrix format, explains
              how to fill it in correctly, and offers a better alternative — a digital allergen
              menu that customers can filter themselves.
            </p>
          </header>

          {/* The matrix */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The allergen matrix: standard format</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The most common way UK restaurants display allergen information is an allergen
              matrix — a grid with dishes listed down the left side and the 14 allergens across
              the top. Each cell is marked if that allergen is present in the dish. This is the
              format recommended by the FSA for written allergen disclosure.
            </p>

            {/* Example matrix */}
            <div className="overflow-x-auto mb-4 border border-gray-200 rounded-xl">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left px-3 py-2 font-semibold text-gray-900 border-b border-gray-200 sticky left-0 bg-gray-50 min-w-[140px]">Dish</th>
                    {ALLERGEN_COLS.map((col) => (
                      <th key={col} className="px-2 py-2 font-medium text-gray-500 border-b border-gray-200 text-center whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TEMPLATE_ROWS.map((row) => (
                    <tr key={row.dish} className="border-b border-gray-100 last:border-0">
                      <td className="px-3 py-2 font-medium text-gray-900 sticky left-0 bg-white">{row.dish}</td>
                      {ALLERGEN_COLS.map((col) => {
                        const key = col.toLowerCase().replace(/\s+/g, '') as keyof typeof row
                        const hasAllergen = col === 'Gluten' ? row.gluten : col === 'Eggs' ? row.eggs : col === 'Fish' ? row.fish : col === 'Milk' ? row.milk : false
                        return (
                          <td key={col} className="px-2 py-2 text-center">
                            {hasAllergen ? (
                              <span className="inline-block w-5 h-5 rounded-full bg-red-100 text-red-600 text-xs leading-5 font-bold">✓</span>
                            ) : (
                              <span className="text-gray-200">-</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 italic">Example allergen matrix — not representative of real dishes</p>
          </section>

          {/* Problems with paper */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The problem with paper allergen matrices</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Paper allergen matrices are better than nothing, but they come with real problems
              that put both your customers and your business at risk.
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <span className="text-red-500 flex-shrink-0 mt-0.5">✕</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">They go stale.</strong> When a recipe changes, a supplier substitutes an ingredient, or a new dish is added, the paper matrix is wrong until someone remembers to reprint it. This is the number one cause of allergen failures in UK restaurants.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500 flex-shrink-0 mt-0.5">✕</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">No audit trail.</strong> A paper matrix can&apos;t prove when it was last reviewed. During an{' '}
                  <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 hover:underline">EHO inspection</Link>,
                  you have no timestamped evidence of when your allergen information was verified.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500 flex-shrink-0 mt-0.5">✕</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Customers can&apos;t filter.</strong> A matrix shows all allergens for all dishes. A customer with a nut allergy still has to scan every row manually to find safe options — easy to make mistakes under social pressure.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-red-500 flex-shrink-0 mt-0.5">✕</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">No customer data.</strong> A paper matrix is a one-way information display. You learn nothing about which allergens your customers have, how often they visit, or whether they&apos;d come back if you added allergy-friendly options.</p>
              </div>
            </div>
          </section>

          {/* The digital alternative */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The digital alternative: QR code allergen menus</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A digital allergen menu solves every problem with paper. Your menu is always
              current because you update it in one place. Every verification is timestamped
              for your audit trail. Customers filter by their specific allergens and see only
              safe dishes. And you build a database of allergy customers who opted in to
              hear from you.
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <span className="text-se-green-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Always accurate.</strong> Update once, reflected everywhere instantly. No reprinting.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-se-green-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Timestamped audit trail.</strong> Every verification logged with date and time for EHO evidence.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-se-green-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Customer filtering.</strong> Customers select their allergens and see only safe dishes — no manual scanning.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-se-green-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Customer profiles.</strong> Build a database of allergy customers with marketing opt-ins.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-se-green-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">Works offline.</strong> Cached menu loads even without phone signal — common in restaurants.</p>
              </div>
              <div className="flex gap-3">
                <span className="text-se-green-600 flex-shrink-0 mt-0.5">✓</span>
                <p className="text-sm text-gray-600"><strong className="text-gray-900">
                  <Link to="/guides/owens-law" className="text-se-green-600 hover:underline">Owen&apos;s Law</Link> ready.
                </strong> Written allergen information at point of ordering via QR code — exactly what the regulation calls for.</p>
              </div>
            </div>
          </section>

          {/* How to set up */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How to create your allergen menu in 15 minutes</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you want to skip the spreadsheet and go straight to a digital allergen menu
              that your customers can filter from their phone, here&apos;s how:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                <p className="text-sm text-gray-600">Sign up at safeeat.co.uk — takes 30 seconds, no credit card needed</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                <p className="text-sm text-gray-600">Add your dishes — name, price, category, and tick which of the 14 allergens apply</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-se-green-50 text-se-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0">3</div>
                <p className="text-sm text-gray-600">Print your QR code and place it on tables — customers scan and filter instantly</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Skip the spreadsheet
            </h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              SafeEat replaces your paper allergen matrix with a digital menu that customers
              filter themselves. All 14 allergens, verification audit trail, and customer
              profiles — set up in 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/dashboard"
                className="px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors"
              >
                Start your free trial
              </Link>
              <a
                href="/menu/demo"
                className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                See a live demo menu
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3">£29.99/month. No credit card required.</p>
          </div>
        </article>

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
