import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'Do UK restaurants have to offer gluten-free options?',
    a: 'No. UK law does not require restaurants to offer gluten-free dishes. However, the law does require you to accurately declare which of your dishes contain cereals containing gluten — one of the 14 regulated allergens under the Food Information Regulations 2014. If a customer asks about gluten-free options, you must be able to tell them accurately which dishes do and do not contain gluten. Offering clearly labelled gluten-free options is a commercial decision, not a legal requirement, but it opens your restaurant to a significant and loyal customer segment.',
  },
  {
    q: 'What counts as "cereals containing gluten" under UK law?',
    a: 'The regulated allergen category is "cereals containing gluten" and covers wheat, rye, barley, oats, spelt, kamut, and any hybrid strains of these cereals. This is broader than many people realise — soy sauce contains wheat, many gravies use wheat flour, beer contains barley, and oats (while naturally gluten-free) are included because they are frequently cross-contaminated with wheat during processing. You must declare "cereals containing gluten" whenever any of these cereals are present as an ingredient.',
  },
  {
    q: 'Can I call a dish "gluten-free" if it is made in a kitchen that handles gluten?',
    a: 'This is a grey area. There is no legal definition of "gluten-free" for non-prepacked food served in restaurants under UK law. For prepacked food, "gluten-free" means below 20 parts per million (ppm) of gluten. Many restaurants use the term "gluten-free" for dishes that do not contain gluten ingredients but are prepared in a kitchen that also handles gluten. Best practice is to be transparent: declare that the dish contains no gluten ingredients but is prepared in a kitchen that handles gluten, so the customer can make an informed decision about cross-contamination risk.',
  },
  {
    q: 'What are the most common hidden sources of gluten in restaurants?',
    a: 'The most frequently missed gluten sources include soy sauce (contains wheat), gravies and sauces thickened with wheat flour, batter and breadcrumbs, stock cubes (many contain wheat), some spice blends, beer and lager (barley), communion wafers, some processed meats (wheat-based fillers), and some desserts using wheat flour. Cross-contamination through shared fryers (from battered items), shared pasta water, shared toasters, and shared preparation surfaces also introduces gluten risk.',
  },
  {
    q: 'How do I prevent gluten cross-contamination in my kitchen?',
    a: 'Key measures include using separate preparation areas or thoroughly cleaning surfaces between gluten and gluten-free preparation, using dedicated fryers for gluten-free items, using separate pasta water, using separate toasters, storing gluten-free ingredients above gluten-containing ingredients to prevent contamination from falling particles, using colour-coded utensils, and training staff to change gloves between handling gluten and gluten-free items. Document your procedures and communicate any remaining cross-contamination risks to customers.',
  },
  {
    q: 'Should I use a separate fryer for gluten-free items?',
    a: 'If you want to offer genuinely gluten-free fried items, a separate dedicated fryer is the only reliable method. Gluten proteins are not destroyed by frying temperatures and persist in oil used for battered or breaded items. If a separate fryer is not practical, you must declare that items fried in shared oil carry a cross-contamination risk for cereals containing gluten. This "may contain" declaration is the legally and ethically responsible approach.',
  },
  {
    q: 'How many people in the UK need gluten-free food?',
    a: 'Approximately 1 in 100 people in the UK have coeliac disease — around 670,000 people, though only about 36% are diagnosed. Beyond coeliac disease, an estimated 6-7% of the UK population report non-coeliac gluten sensitivity. Combined with people who choose gluten-free diets for other health reasons, the gluten-free market is one of the largest allergen-driven food segments in the UK, valued at over £1 billion annually.',
  },
  {
    q: 'What is the difference between coeliac disease and gluten sensitivity?',
    a: 'Coeliac disease is an autoimmune condition where gluten triggers the immune system to attack the lining of the small intestine, causing serious long-term health damage. Even tiny amounts of gluten (below 20ppm) can trigger a reaction. Non-coeliac gluten sensitivity causes symptoms (bloating, pain, fatigue) but does not damage the intestine. Both conditions require gluten avoidance, but coeliac disease demands stricter avoidance due to the risk of intestinal damage from even trace amounts.',
  },
  {
    q: 'Do I need to declare gluten in drinks as well as food?',
    a: 'Yes. Beer, lager, ales, and stouts contain cereals containing gluten (primarily barley). Some ciders may contain barley. Some flavoured syrups used in coffee drinks may contain wheat. Spirits distilled from gluten-containing cereals (whisky, vodka from wheat) are generally considered gluten-free after distillation, but some individuals with coeliac disease prefer to avoid them. Document gluten content for all your drinks and make the information available to customers.',
  },
  {
    q: 'Can I get certified as a gluten-free restaurant?',
    a: 'Coeliac UK offers a Gluten Free accreditation scheme for food businesses that meet their standards for gluten-free food preparation and service. Accreditation involves an assessment of your procedures, staff training, and kitchen practices. While not legally required, the Coeliac UK accreditation mark is widely recognised and trusted by people with coeliac disease, providing a significant competitive advantage for restaurants targeting this customer segment.',
  },
  {
    q: 'What should I do if a customer tells me they have coeliac disease?',
    a: 'Take it seriously — coeliac disease is a medical condition, not a preference. Check your allergen records to identify which dishes are free from cereals containing gluten. Communicate any cross-contamination risks honestly. If you cannot guarantee a dish is safe, say so and offer alternatives. Never assume a small amount of gluten is acceptable — for people with coeliac disease, even trace contamination causes intestinal damage.',
  },
  {
    q: 'How does SafeEat help with gluten-free menu management?',
    a: 'SafeEat allows customers to filter your menu by selecting "cereals containing gluten" as their allergen. They instantly see only the dishes that do not contain gluten ingredients. You can add notes about cross-contamination risks to individual dishes. The system updates in real time when your menu changes, and the verification audit trail documents your ongoing gluten management for EHO inspections.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Gluten-Free Menu for Restaurants: Complete UK Guide 2026',
      description: 'Complete guide to offering and managing a gluten-free menu in UK restaurants. Covers legal requirements, hidden gluten sources, cross-contamination prevention, and the commercial opportunity.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12', dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/gluten-free-menu-restaurant',
      image: 'https://safeeat.co.uk/og-gluten-free.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: 'Gluten-Free Menu', item: 'https://safeeat.co.uk/guides/gluten-free-menu-restaurant' },
      ],
    },
    { '@type': 'WebPage', name: 'Gluten-Free Menu for Restaurants', url: 'https://safeeat.co.uk/guides/gluten-free-menu-restaurant', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] } },
    { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk', description: 'Digital allergen management and customer retention platform for UK restaurants.', sameAs: [] },
    { '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    {
      '@type': 'DefinedTermSet', name: 'Gluten-Free Terminology',
      definedTerm: [
        { '@type': 'DefinedTerm', name: 'Coeliac Disease', description: 'An autoimmune condition where gluten triggers the immune system to attack the small intestine, affecting approximately 1 in 100 people in the UK.' },
        { '@type': 'DefinedTerm', name: 'Cereals Containing Gluten', description: 'One of the 14 regulated UK allergens, covering wheat, rye, barley, oats, spelt, kamut, and hybrid strains.' },
        { '@type': 'DefinedTerm', name: 'Cross-Contamination', description: 'The unintentional transfer of gluten from one food to another through shared equipment, surfaces, or cooking methods.' },
        { '@type': 'DefinedTerm', name: 'Parts Per Million (ppm)', description: 'A measurement of gluten concentration. Prepacked food labelled "gluten-free" must contain less than 20ppm of gluten.' },
      ],
    },
    {
      '@type': 'HowTo', name: 'How to Offer a Gluten-Free Menu in Your Restaurant',
      description: 'Step-by-step guide to creating and managing gluten-free options in a UK restaurant.',
      step: [
        { '@type': 'HowToStep', name: 'Identify naturally gluten-free dishes', text: 'Review your menu for dishes that are already free from cereals containing gluten. Many grilled meats, rice dishes, salads, and vegetable-based dishes are naturally gluten-free.' },
        { '@type': 'HowToStep', name: 'Check for hidden gluten', text: 'Audit every ingredient including sauces, stock cubes, marinades, and spice blends. Soy sauce, many gravies, and some processed ingredients contain wheat.' },
        { '@type': 'HowToStep', name: 'Assess cross-contamination risks', text: 'Identify shared fryers, toasters, preparation surfaces, and utensils that could transfer gluten to gluten-free dishes. Implement separation procedures.' },
        { '@type': 'HowToStep', name: 'Document and display', text: 'Mark gluten-free dishes clearly on your menu or digital allergen system. Use SafeEat to let customers filter for gluten-free options via QR code.' },
        { '@type': 'HowToStep', name: 'Train staff', text: 'Ensure all staff understand what cereals containing gluten are, where gluten hides, and how to prevent cross-contamination.' },
        { '@type': 'HowToStep', name: 'Communicate transparently', text: 'Be honest about cross-contamination risks. Customers with coeliac disease prefer transparency over false assurance.' },
      ],
    },
    {
      '@type': 'SoftwareApplication', name: 'SafeEat', applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
      description: 'Digital allergen menu with gluten-free filtering, customer profiles, and automated audit trails.',
      url: 'https://safeeat.co.uk',
      offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP', priceValidUntil: '2027-04-12' },
    },
  ],
}

export default function GlutenFreeGuidePage() {
  return (
    <>
      <Helmet>
        <title>Gluten-Free Menu for UK Restaurants 2026 | Complete Guide | SafeEat</title>
        <meta name="description" content="Complete guide to offering and managing a gluten-free menu in UK restaurants. Legal requirements, hidden gluten sources, cross-contamination prevention, and the commercial opportunity of gluten-free dining." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/gluten-free-menu-restaurant" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Gluten-Free Menu for UK Restaurants | SafeEat" />
        <meta property="og:description" content="Complete guide to gluten-free menus in UK restaurants. Legal requirements, hidden gluten, cross-contamination, and the commercial opportunity." />
        <meta property="og:image" content="https://safeeat.co.uk/og-gluten-free.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/gluten-free-menu-restaurant" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gluten-Free Menu for UK Restaurants | SafeEat" />
        <meta name="twitter:description" content="Complete guide to offering gluten-free options in UK restaurants." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-gluten-free.jpg" />
        <meta name="author" content="SafeEat" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        <nav className="max-w-3xl mx-auto px-4 pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link to="/" className="hover:text-emerald-700">Home</Link></li>
            <li>/</li>
            <li><Link to="/guides/14-allergens-uk" className="hover:text-emerald-700">Guides</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Gluten-Free Menu</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              UK restaurants must declare &quot;cereals containing gluten&quot; (wheat, rye, barley, oats) as one of the 14
              regulated allergens. You are not required to offer gluten-free dishes, but you must accurately identify which
              dishes contain gluten. Approximately 1 in 100 UK adults have coeliac disease, and the gluten-free food market
              exceeds £1 billion annually — making gluten-free options a significant commercial opportunity.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Gluten-Free Menu for Restaurants: Complete UK Guide for 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>13 min read</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Gluten is the most searched-for allergen by UK restaurant customers. Approximately 670,000 people in the UK have
            coeliac disease — an autoimmune condition where even trace amounts of gluten cause intestinal damage — and
            millions more avoid gluten for other health reasons. For restaurants, this represents both a compliance obligation
            and a substantial commercial opportunity. Restaurants that clearly identify gluten-free options and manage
            cross-contamination transparently earn the trust and loyalty of a customer segment that actively seeks out safe
            dining venues.
          </p>

          <p className="text-gray-700 mb-6">
            This guide covers everything UK restaurant owners need to know about gluten-free menu management: the legal
            requirements for declaring cereals containing gluten, where gluten hides in common restaurant ingredients, how to
            prevent cross-contamination, how to communicate honestly with customers about gluten risks, and how digital
            allergen systems make gluten-free management practical and reliable.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Legal Requirement</h2>

          <p className="text-gray-700 mb-4">
            Under the Food Information Regulations 2014, &quot;cereals containing gluten&quot; is one of the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>{' '}
            that must be declared for every dish you serve. The category specifically covers wheat, rye, barley, oats, spelt,
            kamut, and any hybrid strains of these cereals. Whenever any of these cereals is present as an ingredient — whether
            as the main component or a trace element in a composite ingredient — it must be declared.
          </p>

          <p className="text-gray-700 mb-4">
            The legal obligation is to declare accurately, not to offer alternatives. You are not required to have gluten-free
            dishes on your menu. But you must be able to tell a customer with coeliac disease exactly which of your dishes
            contain cereals containing gluten and which do not. If you cannot provide this information, you are in breach of
            the Food Information Regulations — regardless of whether you choose to offer gluten-free options.
          </p>

          <p className="text-gray-700 mb-6">
            The FSA&apos;s March 2025 best practice guidance recommends that this information be provided in writing rather
            than verbally.{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>
            , under evaluation in spring 2026, would make written allergen disclosure mandatory. For gluten-free customers,
            written information is particularly important because even well-intentioned verbal communication can be imprecise
            about the difference between &quot;no gluten ingredients&quot; and &quot;genuinely gluten-free with no
            cross-contamination risk.&quot;
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Where Gluten Hides</h2>

          <p className="text-gray-700 mb-4">
            The obvious sources of gluten are straightforward: bread, pasta, pastry, cakes, biscuits, battered items, and
            anything made with wheat, rye, barley, or oat flour. But gluten appears in many less obvious places, and these
            hidden sources are where restaurants most commonly fail to declare the allergen correctly.
          </p>

          <p className="text-gray-700 mb-4">
            Soy sauce is one of the most frequently missed gluten sources. Standard soy sauce contains wheat — it is
            fermented from a wheat-soy mixture. Tamari is a wheat-free alternative, but you must verify that your specific
            tamari product is genuinely wheat-free, as some brands contain small amounts. Any dish seasoned with soy sauce
            must declare cereals containing gluten, including stir-fries, marinades, dressings, and dipping sauces.
          </p>

          <p className="text-gray-700 mb-4">
            Thickeners and binders introduce gluten across a wide range of dishes. Wheat flour is used to thicken gravies,
            sauces, and soups. Roux-based sauces (béchamel, velouté) contain wheat flour. Some processed meats use wheat-based
            fillers or breadcrumb coatings. Dusting flour used on preparation surfaces contaminates otherwise gluten-free food.
            Even some stock cubes and bouillon powders contain wheat — always check supplier specifications.
          </p>

          <p className="text-gray-700 mb-4">
            Beer and lager contain barley and must be declared as cereals containing gluten. This extends to any dish cooked
            with beer — beer-battered fish, beer-braised dishes, beer-based sauces. Some desserts use beer or stout as an
            ingredient. Wine, while typically gluten-free, should still be verified against supplier data.
          </p>

          <p className="text-gray-700 mb-6">
            The oat question is particularly nuanced. Oats do not naturally contain gluten, but they are almost always
            contaminated with wheat or barley during growing, harvesting, or processing. Under UK law, oats are listed under
            &quot;cereals containing gluten&quot; and must be declared. Certified gluten-free oats exist (processed in
            dedicated facilities), but standard oats are not gluten-free. If you use oats in porridge, flapjacks, or oat
            milk, you must declare cereals containing gluten unless using certified gluten-free oats — and you must verify
            this through supplier documentation.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cross-Contamination Management</h2>

          <p className="text-gray-700 mb-4">
            For customers with coeliac disease, cross-contamination is as dangerous as direct gluten consumption. Gluten
            proteins are not destroyed by cooking temperatures. They persist on surfaces, in oil, and in water. A single
            breadcrumb in an otherwise gluten-free dish can trigger an immune response in a person with coeliac disease.
            Managing cross-contamination is therefore essential if you want to serve genuinely safe gluten-free food.
          </p>

          <p className="text-gray-700 mb-4">
            The highest-risk cross-contamination points in a restaurant kitchen are shared fryers (gluten from batter persists
            in the oil), shared pasta water, shared toasters (crumbs from regular bread contaminate gluten-free bread), shared
            preparation surfaces where flour has been used, shared utensils (serving spoons, tongs, ladles used across multiple
            dishes), and airborne flour in busy kitchens. Each of these risks needs a documented control measure.
          </p>

          <p className="text-gray-700 mb-4">
            Effective controls include dedicated fryers for gluten-free items, separate pasta water for gluten-free pasta,
            designated gluten-free preparation areas cleaned before use, colour-coded utensils reserved for gluten-free
            preparation, staff trained to change gloves between handling gluten and gluten-free items, and storage that keeps
            gluten-free ingredients above gluten-containing ingredients to prevent contamination from falling particles.
          </p>

          <p className="text-gray-700 mb-6">
            Transparency is more important than perfection. If your kitchen handles both gluten and gluten-free food, there
            will always be some level of cross-contamination risk. The responsible approach is to document your controls,
            communicate honestly about residual risks, and let the customer make an informed decision. Saying &quot;this dish
            contains no gluten ingredients but is prepared in a kitchen that handles wheat flour&quot; is far more responsible
            than claiming a dish is gluten-free when you cannot guarantee zero cross-contamination.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Commercial Opportunity</h2>

          <p className="text-gray-700 mb-4">
            The UK gluten-free market is valued at over £1 billion annually and continues to grow. Beyond the 670,000 people
            with coeliac disease, millions of UK consumers actively seek gluten-free options — whether for diagnosed non-coeliac
            gluten sensitivity, wheat allergy, or dietary preference. This is not a niche market; it is a mainstream consumer
            trend with measurable revenue impact.
          </p>

          <p className="text-gray-700 mb-4">
            Research from Coeliac UK consistently shows that people with coeliac disease are exceptionally loyal to restaurants
            that accommodate them safely. Finding a trusted restaurant is difficult for coeliac customers — 76% report
            difficulty eating out — so when they find one, they return repeatedly and recommend it within their community.
            Coeliac support groups and forums actively share restaurant recommendations, creating organic word-of-mouth
            marketing that is impossible to buy.
          </p>

          <p className="text-gray-700 mb-6">
            The group dining effect amplifies the revenue impact. When one person in a group has coeliac disease, the entire
            group&apos;s restaurant choice is influenced by gluten-free availability. A table of four where one diner needs
            gluten-free options represents four covers — not one — that your gluten-free capability secures. Research suggests
            that 44% of non-allergic diners consider allergy accommodations when choosing where to eat with friends or family.
            Offering clear, trustworthy gluten-free options is a revenue decision as much as a compliance decision.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Using SafeEat for Gluten-Free Management</h2>

          <p className="text-gray-700 mb-4">
            SafeEat makes gluten-free management practical for restaurants of any size. Every dish on your menu is mapped
            against the 14 regulated allergens through your dashboard, including cereals containing gluten. Customers scan
            your QR code, select &quot;cereals containing gluten&quot; as their allergen, and instantly see only the dishes
            they can safely eat. No scanning a dense allergen matrix. No waiting for a busy server to check with the kitchen.
          </p>

          <p className="text-gray-700 mb-4">
            You can add notes to individual dishes — for example, &quot;Prepared in a kitchen that handles wheat flour&quot;
            — giving coeliac customers the transparency they need to make informed decisions. When your menu changes, updates
            propagate instantly. The verification system and automated reminders ensure your gluten-free information stays
            current, and the timestamped audit trail documents your ongoing management for{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>.
          </p>

          <p className="text-gray-700 mb-6">
            Customers who save their allergen profile — including gluten — become repeat diners who trust your restaurant.
            With marketing opt-in, you can notify them when you add new gluten-free dishes. This turns your gluten-free
            compliance into a retention engine: every new gluten-free option is a reason for these customers to return and
            an opportunity to reach them directly. No other UK allergen tool connects gluten-free menu management with
            customer{' '}
            <Link to="/guides/allergen-customer-retention" className="text-emerald-700 underline hover:text-emerald-900">
              retention
            </Link>.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Make your gluten-free options visible</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat lets customers filter your menu for gluten-free dishes via QR code. You get real-time updates,
              automated verification, and a database of loyal gluten-free diners — from £29.99/month.
            </p>
            <Link to="/dashboard" className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 transition">Start your free trial</Link>
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
              <li><Link to="/guides/nut-allergy-restaurant-guide" className="text-emerald-700 underline hover:text-emerald-900">Nut Allergy Restaurant Guide</Link></li>
              <li><Link to="/guides/allergen-customer-retention" className="text-emerald-700 underline hover:text-emerald-900">Allergen Customer Retention Guide</Link></li>
              <li><Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">EHO Allergen Inspection Guide</Link></li>
              <li><Link to="/guides/allergen-menu-template" className="text-emerald-700 underline hover:text-emerald-900">Allergen Menu Template</Link></li>
              <li><Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">Allergen Fines UK</Link></li>
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
