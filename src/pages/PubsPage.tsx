import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'Do pubs need to provide allergen information for food?',
    a: 'Yes. Every pub that serves food must provide allergen information covering the 14 regulated allergens under the Food Information Regulations 2014. This applies regardless of whether food is your primary business or a secondary offering alongside drinks. Allergen information must be available for every food item before the customer orders, including bar snacks, pub meals, specials, children\'s meals, sauces, sides, and condiments.',
  },
  {
    q: 'Do pubs need to declare allergens in drinks?',
    a: 'Yes. Drinks commonly contain regulated allergens: sulphites in wine and cider, cereals containing gluten in beer and lager, milk in cocktails and cream liqueurs, eggs in some wines fined with egg white, and nuts in nut-based liqueurs like Amaretto and Frangelico. Every drink you serve must have its allergens documented and available to customers on request.',
  },
  {
    q: 'What allergens are in beer and lager?',
    a: 'Most beers and lagers contain cereals containing gluten — specifically barley, and sometimes wheat. This includes ales, stouts, IPAs, and most mainstream lagers. Gluten-free beers are available but must be verified as genuinely gluten-free through supplier specifications. Some craft beers contain additional allergens such as milk (in milk stouts), nuts (in nut brown ales or flavoured beers), and oats (in oatmeal stouts). Check each product individually.',
  },
  {
    q: 'What allergens are in wine?',
    a: 'Wine contains sulphites (sulphur dioxide), which must be declared when present above 10mg/litre. Most wines exceed this threshold. Some wines are fined using egg white (albumin) or milk protein (casein) during production, which may need to be declared depending on residual levels. Check supplier specifications for fining agent declarations. Organic and natural wines may have lower sulphite levels but are rarely sulphite-free.',
  },
  {
    q: 'Do I need allergen information for bar snacks?',
    a: 'Yes. Packets of crisps, nuts, and other prepacked bar snacks carry their own ingredient labels. However, if you serve loose bar snacks — such as bowls of nuts, olives, or bread — these are non-prepacked food and require allergen information from you. Even prepacked snacks should be accounted for in your allergen awareness, as customers may ask about allergens in products you sell.',
  },
  {
    q: 'How do I handle allergens for a frequently changing pub menu?',
    a: 'Many pubs change their menu regularly — weekly specials, seasonal dishes, Sunday roasts with varying accompaniments. Every menu change requires an allergen review and update. Digital allergen systems like SafeEat handle this efficiently: add or modify a dish through the dashboard and the customer-facing menu updates instantly. No reprinting, no version confusion, no risk of serving a new dish before its allergens are documented.',
  },
  {
    q: 'What allergen risks exist with pub Sunday roasts?',
    a: 'Sunday roasts carry multiple allergen risks: cereals containing gluten (in Yorkshire puddings, stuffing, gravy thickened with flour), milk (in mashed potato, cream-based sauces, butter on vegetables), eggs (in Yorkshire puddings and some stuffings), celery (in stuffing and gravy stock), mustard (in some gravies and condiments), and sulphites (in wine-based gravies). The variety of components means each element needs individual allergen assessment, and allergens change when accompaniments vary week to week.',
  },
  {
    q: 'Do I need separate allergen information for the restaurant and bar areas?',
    a: 'If you serve different menus in different areas — for example, a full restaurant menu in the dining area and a reduced bar menu at the bar — each menu needs its own allergen information. If the same menu is available throughout, one set of allergen information suffices. However, drinks allergen information must be available wherever drinks are served, including at the bar.',
  },
  {
    q: 'What are the most common allergen inspection failures in pubs?',
    a: 'The most common failures are: no allergen information for drinks (especially wine and beer), missing allergen coverage for sauces, condiments, and accompaniments, allergen information that does not match the current specials or seasonal menu, inadequate staff training (particularly bar staff who may not have received the same food safety training as kitchen staff), and no evidence of regular allergen verification reviews.',
  },
  {
    q: 'Can EHO officers inspect pubs for allergen compliance?',
    a: 'Yes. Pubs that serve food are food businesses and subject to the same EHO inspection regime as restaurants. Allergen compliance is assessed as part of routine food hygiene inspections and can affect your Food Hygiene Rating. Complaint-driven inspections can also be triggered if a customer reports an allergen incident. Pubs are held to the same legal standards and face the same prosecution risks as restaurants.',
  },
  {
    q: 'How should pub staff handle allergen questions from customers?',
    a: 'Staff should never guess or assume. The correct response is to check the written allergen records — either the allergen matrix, the digital menu system, or the ingredient specifications. If the information is not available for a specific item, the staff member should say so and offer alternatives that have confirmed allergen information. Staff should be trained to take allergen queries seriously, as the consequence of incorrect information can be fatal.',
  },
  {
    q: 'What is the best allergen management system for a pub?',
    a: 'A digital allergen menu via QR code is particularly effective for pubs because it covers both food and drinks in one system, handles frequently changing specials and seasonal menus, allows customers to filter by their specific allergies, and generates an audit trail for EHO inspections. SafeEat costs £29.99/month and can be set up in under an hour, covering your full food and drinks menu.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Allergen Compliance for Pubs: Complete UK Guide 2026',
      description: 'Complete allergen compliance guide for UK pubs. Covers food and drink allergens, beer and wine allergens, bar snacks, Sunday roasts, EHO inspections, and digital allergen management.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/for/pubs',
      image: 'https://safeeat.co.uk/og-pubs.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'For Pubs', item: 'https://safeeat.co.uk/for/pubs' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'Allergen Compliance for Pubs',
      url: 'https://safeeat.co.uk/for/pubs',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] },
    },
    {
      '@type': 'Organization',
      name: 'SafeEat',
      url: 'https://safeeat.co.uk',
      description: 'Digital allergen management and customer retention platform for UK pubs and restaurants.',
      sameAs: [],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@type': 'DefinedTermSet',
      name: 'Pub Allergen Terminology',
      definedTerm: [
        { '@type': 'DefinedTerm', name: 'Sulphites', description: 'Sulphur dioxide and sulphites, regulated allergens commonly found in wine, cider, beer, and dried fruits. Must be declared above 10mg/kg or 10mg/litre.' },
        { '@type': 'DefinedTerm', name: 'Fining Agents', description: 'Substances used to clarify wine and beer during production, including egg white (albumin) and milk protein (casein), which may require allergen declaration.' },
        { '@type': 'DefinedTerm', name: 'Non-Prepacked Food', description: 'Food prepared after the customer orders it, requiring allergen information but not full ingredient labelling.' },
        { '@type': 'DefinedTerm', name: 'Food Business Operator', description: 'The person legally responsible for food safety compliance in a pub, whether the landlord, tenant, or management company.' },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Set Up Allergen Compliance in Your Pub',
      description: 'Step-by-step guide to achieving allergen compliance in a UK pub.',
      step: [
        { '@type': 'HowToStep', name: 'Audit food and drinks', text: 'List every food item, drink, bar snack, sauce, and condiment you serve. Include specials, seasonal items, and Sunday roast accompaniments.' },
        { '@type': 'HowToStep', name: 'Map allergens', text: 'Document allergens for every item against all 14 regulated allergens. Check supplier specifications for beers, wines, spirits, and bought-in food products.' },
        { '@type': 'HowToStep', name: 'Cover drink allergens', text: 'Document sulphites in wines and ciders, gluten in beers, milk in cocktails and cream liqueurs, and any other drink allergens.' },
        { '@type': 'HowToStep', name: 'Set up digital access', text: 'Create a QR code menu covering food and drinks. Place codes at tables, the bar, and in any restaurant or dining area.' },
        { '@type': 'HowToStep', name: 'Train all staff', text: 'Train bar staff on drink allergens and kitchen staff on food allergens. Ensure front-of-house staff can handle allergen queries for both.' },
        { '@type': 'HowToStep', name: 'Verify and maintain', text: 'Review allergen information weekly — especially for specials and seasonal menus. Document each review with timestamps.' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu for pubs covering food and drinks with QR code access, customer allergen filtering, and automated audit trails.',
      url: 'https://safeeat.co.uk',
      offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP', priceValidUntil: '2027-04-12' },
    },
  ],
}

export default function PubsPage() {
  return (
    <>
      <Helmet>
        <title>Allergen Compliance for Pubs UK 2026 | Complete Guide | SafeEat</title>
        <meta name="description" content="Complete allergen compliance guide for UK pubs. Covers food and drink allergens, beer and wine declarations, bar snacks, Sunday roasts, EHO inspections, and digital allergen management." />
        <link rel="canonical" href="https://safeeat.co.uk/for/pubs" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Allergen Compliance for Pubs UK | SafeEat" />
        <meta property="og:description" content="Complete allergen compliance guide for UK pubs. Food, drinks, beer, wine, and digital allergen management." />
        <meta property="og:image" content="https://safeeat.co.uk/og-pubs.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/for/pubs" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergen Compliance for Pubs UK | SafeEat" />
        <meta name="twitter:description" content="Complete allergen compliance guide for UK pubs." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-pubs.jpg" />
        <meta name="author" content="SafeEat" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        <nav className="max-w-3xl mx-auto px-4 pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link to="/" className="hover:text-emerald-700">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">For Pubs</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              Every UK pub that serves food or drinks must provide allergen information under the Food Information Regulations
              2014. This covers food and drinks — including sulphites in wine, gluten in beer, and milk in cocktails. Pubs
              are subject to the same EHO inspections and prosecution risks as restaurants. A digital allergen system covering
              both food and drinks simplifies compliance across your full offering.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allergen Compliance for Pubs: Complete UK Guide for 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>12 min read</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Pubs face an allergen compliance challenge that most restaurant-focused guidance does not address: you serve both
            food and drinks, often with different menus in different areas, and your staff typically spans kitchen, bar, and
            front-of-house roles with varying levels of food safety training. The legal requirement to declare allergens applies
            equally to a pint of lager, a glass of wine, a Sunday roast, and a packet of crisps behind the bar. Getting any
            of these wrong carries the same prosecution risk as a restaurant allergen failure.
          </p>

          <p className="text-gray-700 mb-6">
            This guide covers allergen compliance specifically for pubs in 2026: where allergens hide in drinks, the specific
            risks of pub food menus, how to train bar staff alongside kitchen staff, and how digital allergen systems simplify
            compliance across your full food and drinks offering. Whether you run a village local, a gastropub, or a managed
            house in a chain, the legal obligations are identical.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Drink Allergens: The Blind Spot Most Pubs Miss</h2>

          <p className="text-gray-700 mb-4">
            Drink allergens are the most commonly overlooked area of pub allergen compliance. Many pub operators manage food
            allergens reasonably well but have no allergen information whatsoever for their drinks range. EHO officers
            increasingly check drink allergen coverage during inspections, and the gap is often the difference between a
            satisfactory and unsatisfactory assessment.
          </p>

          <p className="text-gray-700 mb-4">
            Wine is the most straightforward drink allergen to manage: virtually all wines contain sulphites above the
            declaration threshold of 10mg/litre. White wines typically contain higher sulphite levels than red wines, and
            sweet wines higher still. Some wines are fined using egg white or milk protein, which may require declaration
            depending on residual levels in the finished product. Check supplier data sheets for fining agent declarations —
            many wine suppliers now provide this information as standard.
          </p>

          <p className="text-gray-700 mb-4">
            Beer and lager allergens centre on cereals containing gluten. Standard beers contain barley; wheat beers contain
            wheat; some craft beers include oats. Milk stouts contain lactose (milk). Some fruit beers contain sulphites.
            Nut brown ales and flavoured craft beers may contain nuts. The increasing variety of craft and speciality beers
            means that pub operators cannot assume all beers share the same allergen profile — each product needs individual
            assessment.
          </p>

          <p className="text-gray-700 mb-4">
            Cider typically contains sulphites, particularly commercial ciders. Some ciders are made with concentrate that
            may have different allergen profiles from fresh-pressed alternatives. Perry contains pears but is not a regulated
            allergen — however, some perries contain added sulphites that must be declared.
          </p>

          <p className="text-gray-700 mb-4">
            Spirits are generally allergen-free in their pure form, but mixers, flavourings, and cocktail ingredients
            introduce allergens. Cream liqueurs contain milk. Amaretto and Frangelico contain nuts. Some flavoured vodkas
            and gins may contain allergens from flavouring agents. Cocktails are high-risk because they combine multiple
            ingredients — a Whisky Sour contains egg white, a White Russian contains milk, a Piña Colada may contain milk
            in the coconut cream, and a Margarita with a salted rim may contain celery salt.
          </p>

          <p className="text-gray-700 mb-6">
            Soft drinks are generally lower risk but not allergen-free. Some squashes contain sulphites. Smoothies may
            contain milk, nuts, or soy. Hot chocolate contains milk. Tonic water and mixers are typically allergen-free
            but should be verified against supplier specifications rather than assumed. The key principle for drink allergens
            is the same as for food: check every product, document the allergens, and make the information available to
            customers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Pub Food Allergen Challenges</h2>

          <p className="text-gray-700 mb-4">
            Pub food presents specific allergen challenges beyond those in a standard restaurant. Menus often change
            frequently — weekly specials, Sunday roasts with varying accompaniments, seasonal menus, and event-specific
            offerings. Each change requires an allergen review and update, and the frequency of changes means paper-based
            allergen systems quickly become outdated.
          </p>

          <p className="text-gray-700 mb-4">
            Sunday roasts are particularly complex. A typical Sunday roast includes meat (which may be marinated — check for
            milk and mustard), roast potatoes (cooked in what fat?), Yorkshire puddings (contain{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              cereals containing gluten, eggs, and milk
            </Link>
            ), stuffing (may contain celery, cereals, egg), gravy (often thickened with wheat flour, may contain celery from
            stock), vegetables (may be buttered — milk), and condiments (horseradish may contain mustard, mint sauce may
            contain sulphites). When the meat, vegetables, or accompaniments change week to week, the allergen profile of
            &quot;Sunday roast&quot; changes too.
          </p>

          <p className="text-gray-700 mb-4">
            Bar snacks occupy a grey area that many pubs handle poorly. Pre-packaged crisps and nuts carry their own labels.
            But loose snacks — bowls of mixed nuts at the bar, bread and dipping oil, olives, cheese boards — are non-prepacked
            food requiring allergen information from you. Cheese boards are particularly high-risk: different cheeses contain
            different allergens (milk obviously, but also potential nut inclusions, celery in some flavoured cheeses), and the
            specific cheeses available may change with supply.
          </p>

          <p className="text-gray-700 mb-6">
            Cross-contamination in pub kitchens follows similar patterns to restaurants but with additional considerations.
            Many pub kitchens are smaller than restaurant kitchens, meaning less separation between allergen and non-allergen
            preparation. Some pubs use bought-in pre-prepared components (frozen chips, pre-made sauces, bought-in desserts)
            that need supplier allergen specifications verified. And the pace of service during busy periods — a Friday night
            food rush combined with a full bar — increases the risk of allergen procedures being shortcuts.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Staff Training for Pubs</h2>

          <p className="text-gray-700 mb-4">
            Pub staff training must cover both food and drink allergens — a broader scope than most food safety training
            addresses. The challenge is that pubs typically employ staff in distinct roles (bar, kitchen, front-of-house) with
            different training backgrounds, yet any of them may face allergen queries from customers.
          </p>

          <p className="text-gray-700 mb-4">
            Bar staff need specific training on drink allergens: which beers contain gluten, which wines have sulphites (all
            of them), which spirits and liqueurs contain milk or nuts, and how to check allergen information for drinks they
            are less familiar with. Bar staff often have food hygiene training focused on drink service (cellar management,
            glass hygiene) rather than allergen management, so drink allergen training fills a critical gap.
          </p>

          <p className="text-gray-700 mb-4">
            Kitchen staff need standard food allergen training covering the 14 regulated allergens, your specific menu
            allergens, cross-contamination prevention, and how to handle allergen requests passed from front-of-house.
            Front-of-house staff are the bridge — they take orders, relay allergen queries to bar or kitchen, and present food
            and drinks to customers. They must understand allergen procedures for both food and drinks.
          </p>

          <p className="text-gray-700 mb-6">
            Training records must be maintained for all staff — dated, with attendee names, covering both food and drink
            allergens. EHO officers check training records during inspections and may test any staff member&apos;s knowledge.
            Temporary, seasonal, and agency staff need the same allergen training as permanent team members — a common gap
            in pub compliance where casual bar staff may start work without allergen awareness training.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Regulatory Compliance for Pubs in 2026</h2>

          <p className="text-gray-700 mb-4">
            Pubs that serve food are classified as food businesses and subject to the full range of food safety regulations.
            The Food Information Regulations 2014 require allergen information for all food and drinks. The FSA&apos;s March
            2025 best practice guidance recommends written allergen disclosure. And{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>
            , under active evaluation in spring 2026, is expected to make written disclosure mandatory for non-prepacked food.
          </p>

          <p className="text-gray-700 mb-4">
            The prosecution case against The Rusty Gun Pub in Hitchin — which resulted in a £27,803 fine for allergen
            management failures — demonstrates that pubs are not treated leniently because food is secondary to drinks. Courts
            apply the same standards and penalties to pubs as to restaurants. The{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              fines for allergen failures
            </Link>{' '}
            are potentially unlimited, and the reputational damage of prosecution is equally devastating whether you are a
            gastropub or a village local.
          </p>

          <p className="text-gray-700 mb-6">
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>{' '}
            of pubs assess allergen compliance as part of the overall food hygiene rating. Allergen failures can directly
            reduce your rating, which is publicly visible and increasingly influences customer decisions. For pubs competing
            for food trade — particularly gastropubs and dining pubs — a low hygiene rating caused by allergen non-compliance
            directly impacts revenue.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why SafeEat Works for Pubs</h2>

          <p className="text-gray-700 mb-4">
            SafeEat is designed to handle the pub-specific challenge of managing food and drink allergens in one system.
            Your full menu — meals, bar snacks, beers, wines, spirits, cocktails, soft drinks — lives in a single dashboard.
            Customers scan the QR code at their table or at the bar, select their allergens, and see which food and drinks
            are safe across your entire offering.
          </p>

          <p className="text-gray-700 mb-4">
            Weekly specials and changing menus are handled through instant dashboard updates. Add a new special, enter its
            allergens, and it appears on the customer-facing menu immediately. Remove last week&apos;s special and it
            disappears. No reprinting, no forgetting to update the allergen matrix, no risk of customers seeing outdated
            information. For Sunday roasts where accompaniments change weekly, update the roast listing each week with the
            current allergens.
          </p>

          <p className="text-gray-700 mb-6">
            The audit trail covers your full food and drink allergen management. Automated verification reminders ensure
            your allergen information stays current. Timestamped records demonstrate ongoing due diligence to EHO officers.
            And customers who save their allergen profile become loyal regulars who trust your pub with their safety — the
            retention angle that turns compliance into competitive advantage. £29.99/month covers everything.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Food and drink allergens in one system</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat covers your full pub menu — meals, bar snacks, beers, wines, and cocktails. Customers filter by their
              allergies via QR code. You get automated verification and a timestamped audit trail — from £29.99/month.
            </p>
            <Link to="/dashboard" className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 transition">
              Start your free trial
            </Link>
            <p className="text-xs text-gray-500 mt-3">£29.99/month · No credit card required</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
            <ul className="space-y-2">
              <li><Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">The 14 Allergens UK Restaurants Must Declare</Link></li>
              <li><Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">Owen&apos;s Law: What UK Restaurants Need to Know</Link></li>
              <li><Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">EHO Allergen Inspection Guide</Link></li>
              <li><Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">Allergen Fines UK: Prosecutions and Penalties</Link></li>
              <li><Link to="/for/cafes" className="text-emerald-700 underline hover:text-emerald-900">Allergen Compliance for Cafés</Link></li>
              <li><Link to="/for/takeaways" className="text-emerald-700 underline hover:text-emerald-900">Allergen Compliance for Takeaways</Link></li>
            </ul>
          </div>

          <div className="mt-8">
            <Link to="/" className="text-emerald-700 underline hover:text-emerald-900">← Back to SafeEat</Link>
          </div>
        </article>
      </main>
    </>
  )
}
