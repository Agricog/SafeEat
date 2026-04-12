import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'Do cafés need to provide allergen information?',
    a: 'Yes. Every UK café that serves food or drinks must provide allergen information covering the 14 regulated allergens under the Food Information Regulations 2014. This applies regardless of the size of your café — from a single-person coffee shop to a multi-branch chain. Allergen information must be available for every item you serve, including food, drinks, sauces, condiments, and anything else a customer might consume on your premises.',
  },
  {
    q: 'Does Natasha\'s Law apply to my café?',
    a: 'If your café prepares and packages any food before the customer selects it — sandwiches in a display fridge, wrapped cakes, boxed salads, or any other grab-and-go items — those items are prepacked for direct sale (PPDS) and must carry full ingredient labels with allergens emphasised under Natasha\'s Law. Food made to order after the customer requests it is non-prepacked and requires allergen information but not ingredient labelling.',
  },
  {
    q: 'Do I need to declare allergens in coffee and other drinks?',
    a: 'Yes. Drinks commonly contain regulated allergens: milk in lattes and cappuccinos, cereals containing gluten in some flavoured syrups, nuts in nut milks and flavoured drinks, soy in soy milk alternatives, and sulphites in some fruit juices. Every drink you serve must have its allergens documented and available to customers.',
  },
  {
    q: 'How do I handle allergens for daily specials and seasonal items?',
    a: 'Every item offered to customers must have allergen information available before ordering, including daily specials, seasonal dishes, and limited-time offers. Digital allergen systems like SafeEat handle this efficiently — you add the special through the dashboard with its allergens, it appears immediately on the customer-facing menu, and you deactivate it when it ends.',
  },
  {
    q: 'What allergen information do I need for bought-in cakes and pastries?',
    a: 'If you sell cakes or pastries from an external supplier, you need their full ingredient and allergen specifications. If the items arrive prepacked with ingredient labels, those labels satisfy the requirement. If the items arrive unpackaged or you remove the packaging for display, you must provide allergen information separately — either on a sign, in your allergen matrix, or through your digital allergen menu.',
  },
  {
    q: 'Can I use a QR code menu for allergen information in my café?',
    a: 'Yes. A QR code linking to a digital allergen menu is one of the most effective methods for cafés because it handles both food and drinks, updates instantly when your menu changes, allows customers to filter by their specific allergies, works for dine-in and takeaway, and generates an audit trail for EHO inspections. It is also more hygienic than shared paper menus.',
  },
  {
    q: 'What happens if a café customer has an allergic reaction?',
    a: 'Call 999 immediately if the customer shows signs of anaphylaxis. Help them use their adrenaline auto-injector if they have one. After the emergency, preserve all evidence and report the incident to your local Environmental Health team. Do not alter any records. If your allergen information was accurate and you can demonstrate due diligence, this significantly strengthens your legal position.',
  },
  {
    q: 'Do I need different allergen procedures for eat-in and takeaway?',
    a: 'The allergen information requirement applies equally to eat-in and takeaway. For eat-in, allergen information must be available at the point of ordering. For takeaway, allergen information must also be available before the customer orders. If you also offer delivery, allergen information must be provided at the point of ordering and again at delivery. A digital QR code system covers all three scenarios.',
  },
  {
    q: 'How often should a café review its allergen information?',
    a: 'Review allergen information every time your menu changes, every time you change a supplier or ingredient, and at regular intervals regardless — weekly or monthly at minimum. Cafés with frequently changing specials should build allergen review into the daily routine of adding new items to the menu.',
  },
  {
    q: 'What are the most common allergen risks in cafés?',
    a: 'The most common café allergen risks are: milk in coffee drinks and baked goods, cereals containing gluten in cakes, pastries, sandwiches, and some syrups, eggs in baked goods and some sauces, nuts in cakes, pastries, and nut milk alternatives, soy in alternative milks and some chocolate, and sesame in bread and baked goods. Cross-contamination through shared preparation surfaces, toasters, and display cases is also a significant risk.',
  },
  {
    q: 'Do I need allergen information for condiments and extras?',
    a: 'Yes. Every item a customer might consume needs allergen coverage — this includes sugar, sweeteners, syrups, sauces, butter, jam, cream, milk alternatives, and any other extras or condiments you offer. These are frequently missed during allergen audits and are specifically checked by EHO officers.',
  },
  {
    q: 'What is the best allergen management approach for a small café?',
    a: 'For small cafés, a digital allergen menu via QR code is the most practical approach. It requires no printing or reprinting when menus change, handles both food and drinks in one system, provides the audit trail EHO officers expect, and allows customers to filter by their allergies. SafeEat costs £29.99/month — less than a single professional allergen audit — and can be set up in under an hour.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Allergen Compliance for Cafés: Complete UK Guide 2026',
      description: 'Complete allergen compliance guide for UK cafés. Covers food and drink allergens, PPDS labelling, Natasha\'s Law, EHO inspections, and digital allergen management.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/for/cafes',
      image: 'https://safeeat.co.uk/og-cafes.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'For Cafés', item: 'https://safeeat.co.uk/for/cafes' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'Allergen Compliance for Cafés',
      url: 'https://safeeat.co.uk/for/cafes',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] },
    },
    {
      '@type': 'Organization',
      name: 'SafeEat',
      url: 'https://safeeat.co.uk',
      description: 'Digital allergen management and customer retention platform for UK restaurants and cafés.',
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
      name: 'Café Allergen Terminology',
      definedTerm: [
        { '@type': 'DefinedTerm', name: 'Prepacked for Direct Sale (PPDS)', description: 'Food prepared and packaged on the same premises before the customer selects it, requiring full ingredient labelling under Natasha\'s Law.' },
        { '@type': 'DefinedTerm', name: 'Non-Prepacked Food', description: 'Food prepared after the customer orders it, requiring allergen information but not full ingredient labelling.' },
        { '@type': 'DefinedTerm', name: 'Cross-Contamination', description: 'The unintentional transfer of an allergen from one food to another during storage, preparation, or serving.' },
        { '@type': 'DefinedTerm', name: 'Allergen Matrix', description: 'A chart listing all menu items against the 14 regulated allergens, showing which allergens each item contains.' },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Set Up Allergen Compliance in Your Café',
      description: 'Step-by-step guide to achieving allergen compliance in a UK café.',
      step: [
        { '@type': 'HowToStep', name: 'Audit your full menu', text: 'List every food item, drink, sauce, condiment, and extra you serve. Include specials, seasonal items, and bought-in products.' },
        { '@type': 'HowToStep', name: 'Classify PPDS items', text: 'Identify which items are prepacked for direct sale and need full ingredient labels under Natasha\'s Law.' },
        { '@type': 'HowToStep', name: 'Map allergens', text: 'Document allergens for every item against all 14 regulated allergens. Verify against supplier specifications.' },
        { '@type': 'HowToStep', name: 'Set up customer access', text: 'Make allergen information available to customers via QR code, printed menu, or allergen board.' },
        { '@type': 'HowToStep', name: 'Train all staff', text: 'Ensure every team member understands allergen procedures for both food and drinks.' },
        { '@type': 'HowToStep', name: 'Verify regularly', text: 'Review allergen information weekly and after any menu, recipe, or supplier changes. Document each review.' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu for cafés with QR code access, customer allergen filtering, and automated audit trails.',
      url: 'https://safeeat.co.uk',
      offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP', priceValidUntil: '2027-04-12' },
    },
  ],
}

export default function CafesPage() {
  return (
    <>
      <Helmet>
        <title>Allergen Compliance for Cafés UK 2026 | Complete Guide | SafeEat</title>
        <meta name="description" content="Complete allergen compliance guide for UK cafés. Covers food and drink allergens, PPDS labelling under Natasha's Law, EHO inspections, and how digital allergen menus simplify compliance." />
        <link rel="canonical" href="https://safeeat.co.uk/for/cafes" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Allergen Compliance for Cafés UK | SafeEat" />
        <meta property="og:description" content="Complete allergen compliance guide for UK cafés. Food, drinks, PPDS labelling, and digital allergen management." />
        <meta property="og:image" content="https://safeeat.co.uk/og-cafes.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/for/cafes" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergen Compliance for Cafés UK | SafeEat" />
        <meta name="twitter:description" content="Complete allergen compliance guide for UK cafés." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-cafes.jpg" />
        <meta name="author" content="SafeEat" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        <nav className="max-w-3xl mx-auto px-4 pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link to="/" className="hover:text-emerald-700">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">For Cafés</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              Every UK café must provide allergen information for all food and drinks under the Food Information Regulations
              2014. Cafés that sell grab-and-go items (sandwiches, wrapped cakes, boxed salads) must also comply with
              Natasha&apos;s Law PPDS labelling. A digital allergen menu via QR code covers both dine-in and takeaway,
              updates instantly when menus change, and generates the audit trail EHO officers expect.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allergen Compliance for Cafés: Complete UK Guide for 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>12 min read</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Cafés face a unique allergen compliance challenge. Unlike restaurants that primarily serve cooked-to-order meals,
            most cafés operate across multiple food categories simultaneously: hot drinks with milk alternatives, baked goods
            with hidden allergens, grab-and-go sandwiches requiring PPDS labelling, and made-to-order food requiring allergen
            information. Each category has different legal requirements, and managing them all without a systematic approach is
            where cafés most commonly fail during{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>.
          </p>

          <p className="text-gray-700 mb-6">
            This guide covers everything café owners need to know about allergen compliance in 2026: which regulations apply
            to which items, where allergens hide in common café products, how to manage the dual PPDS and non-prepacked
            requirements, and how digital allergen systems like SafeEat simplify the entire process. Whether you run a
            single-site independent or a small chain, the principles are the same — and the consequences of getting it wrong
            are equally severe regardless of your size.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Dual Compliance Challenge</h2>

          <p className="text-gray-700 mb-4">
            Most cafés serve both PPDS and non-prepacked food, which means you need two parallel compliance systems.
            Understanding which items fall into which category is the first step.
          </p>

          <p className="text-gray-700 mb-4">
            PPDS items — anything you prepare and package before the customer selects it — require full ingredient labelling
            with allergens emphasised under{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha&apos;s Law
            </Link>
            . In a typical café, this includes pre-made sandwiches and wraps in the display fridge, boxed salads and grain
            bowls, wrapped cakes and pastries, bottled smoothies or juices made in-house, and any other grab-and-go items
            sealed before the customer picks them up. Each individual item needs its own physical label with the food name and
            full ingredient list.
          </p>

          <p className="text-gray-700 mb-4">
            Non-prepacked items — everything made to order after the customer requests it — require allergen information but
            not full ingredient labelling. In a café, this includes coffee drinks made to order, toasted sandwiches and paninis
            prepared after ordering, hot food cooked on demand, and plated cakes or pastries served from an unwrapped display.
            For these items, allergen information must be available at the point of ordering, either in writing on the menu,
            via a digital QR code system, or through staff who can access written allergen records.
          </p>

          <p className="text-gray-700 mb-6">
            The boundary between PPDS and non-prepacked can shift within the same café during the day. A sandwich made fresh
            to a customer&apos;s order at 11am is non-prepacked. The same sandwich recipe made at 7am, wrapped, and placed in
            the display fridge for the lunchtime rush is PPDS. This means the sandwich needs a full ingredient label when
            pre-made but only allergen information when made to order. Understanding and managing this distinction is essential
            for compliance.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Where Allergens Hide in Café Products</h2>

          <p className="text-gray-700 mb-4">
            Cafés handle a wide variety of products with overlapping allergen risks. The most commonly missed allergens in café
            settings are not in the obvious items — they are in the ingredients and additions that staff do not think of as
            allergen risks.
          </p>

          <p className="text-gray-700 mb-4">
            Coffee drinks are the biggest blind spot. A standard latte contains milk — obvious. But flavoured syrups may
            contain cereals containing gluten. Whipped cream contains milk. Chocolate powder on a cappuccino may contain milk
            and soy. Chai lattes often contain milk powder in the concentrate. Nut milk alternatives contain nuts (almond milk)
            or are processed on lines that handle nuts. Oat milk contains cereals containing gluten. Every variation of every
            drink needs its allergens mapped — and cafés offering 20+ drink combinations can easily have 100+ allergen
            declarations to manage.
          </p>

          <p className="text-gray-700 mb-4">
            Baked goods carry multiple allergens simultaneously. A standard muffin typically contains cereals containing gluten
            (flour), eggs, milk (butter), and potentially nuts, soy (lecithin in chocolate), and sesame (in toppings). Bought-in
            cakes and pastries from external suppliers need the same allergen scrutiny as items you make in-house — you must
            obtain full ingredient specifications from your supplier and update your allergen records if they change their
            recipes.
          </p>

          <p className="text-gray-700 mb-4">
            Cross-contamination is a significant risk in café environments. Shared toasters contaminate bread with gluten from
            previous items. Shared milk jugs and steam wands transfer milk proteins between drinks. Cake knives used across
            multiple products transfer allergens between cakes. Display cases where items are stored together create
            cross-contact risks. These risks should be documented and communicated to customers through &quot;may contain&quot;
            warnings where cross-contamination cannot be fully prevented.
          </p>

          <p className="text-gray-700 mb-6">
            Condiments and extras are frequently missed. Sugar and sweeteners may contain allergens. Syrups and sauces need
            allergen checks. Butter, spreads, and jams need declarations. Even items you consider &quot;simple&quot; — like a
            pot of jam on the table — may contain allergens that need to be documented. EHO officers specifically look for
            gaps in condiment and extras allergen coverage during inspections.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Managing Allergens with a Changing Menu</h2>

          <p className="text-gray-700 mb-4">
            Cafés typically change their menu more frequently than restaurants. Daily specials, seasonal drinks, rotating cake
            selections, and supplier-dependent ingredients create an allergen management challenge that static paper systems
            cannot handle effectively.
          </p>

          <p className="text-gray-700 mb-4">
            Every menu change requires an allergen update. When you introduce a new special, add a seasonal drink, switch to a
            different cake supplier, or substitute an ingredient due to a supply shortage, the allergen information must be
            updated before the item is offered to customers. With paper-based{' '}
            <Link to="/guides/allergen-menu-template" className="text-emerald-700 underline hover:text-emerald-900">
              allergen templates
            </Link>
            , this means reprinting, redistributing, and removing old copies — a process that is frequently skipped during
            busy periods.
          </p>

          <p className="text-gray-700 mb-6">
            Digital allergen systems solve this problem directly. With SafeEat, you add a new item through your dashboard,
            enter its allergens, and it appears immediately on the customer-facing QR code menu. When the item is removed or
            changed, the update propagates instantly. No reprinting, no version confusion, no risk of a customer seeing
            outdated information. For cafés with daily specials or rotating selections, this difference is the gap between
            compliant and non-compliant.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Staff Training for Café Environments</h2>

          <p className="text-gray-700 mb-4">
            Café staff need allergen training that covers both food and drinks — a broader scope than restaurant training
            which typically focuses on food alone. Every team member who takes orders, prepares food, makes drinks, or serves
            customers must understand allergen procedures.
          </p>

          <p className="text-gray-700 mb-4">
            Baristas need specific training on drink allergens: which milks contain which allergens, which syrups carry risks,
            how to prevent cross-contamination between milk types (separate jugs, purging steam wands), and how to communicate
            allergen information to customers who ask about drinks. Kitchen staff need the standard food allergen training
            covering the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>
            , cross-contamination prevention, and your specific menu allergens.
          </p>

          <p className="text-gray-700 mb-6">
            Front-of-house staff are the critical link. They take orders, relay allergen queries to the kitchen, and are the
            point of contact when a customer discloses an allergy. They must know how to handle allergen requests, where to
            find allergen information quickly, and what to do if they are unsure about a specific item. Training records with
            dates and attendee names must be maintained — EHO officers test staff knowledge during inspections and check that
            training is documented and current.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Regulatory Landscape for Cafés in 2026</h2>

          <p className="text-gray-700 mb-4">
            Cafés in 2026 operate under multiple overlapping regulations. The Food Information Regulations 2014 require
            allergen information for all food and drinks.{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha&apos;s Law
            </Link>{' '}
            (2021) requires full ingredient labelling on PPDS items. The FSA&apos;s March 2025 voluntary guidance recommends
            written allergen disclosure for non-prepacked food. And{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>{' '}
            — under active government evaluation in spring 2026 — is expected to make written allergen disclosure mandatory
            for non-prepacked food.
          </p>

          <p className="text-gray-700 mb-4">
            For cafés, this means that every food and drink item needs allergen coverage, PPDS items need physical ingredient
            labels, and non-prepacked items should have written allergen information available proactively. The voluntary
            guidance makes written disclosure best practice; probable legislation will make it compulsory.
          </p>

          <p className="text-gray-700 mb-6">
            The{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              penalties for non-compliance
            </Link>{' '}
            are severe and apply equally to cafés as to restaurants. Recent fines for independent food businesses have reached
            £43,816, and custodial sentences have been imposed where allergen failures caused death. A café owner is held to
            the same legal standard as a restaurant owner — the size of your business does not reduce your obligations or
            limit your liability.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why SafeEat Works for Cafés</h2>

          <p className="text-gray-700 mb-4">
            SafeEat is built for the way cafés actually operate. Your menu includes both food and drinks — SafeEat covers
            both in one system. Your specials change daily — SafeEat updates are instant through the dashboard. You serve
            both dine-in and takeaway — SafeEat&apos;s QR code works for both. Your team is small and busy — SafeEat
            reduces the allergen workload rather than adding to it.
          </p>

          <p className="text-gray-700 mb-4">
            Customers scan the QR code at your counter or table, select their allergens, and see only the food and drinks
            they can safely order. No awkward conversations with busy baristas. No scanning a dense paper allergen matrix.
            No trusting that the person who took their order correctly passed the allergy information to the kitchen. The
            allergen information is direct, personalised, and always current.
          </p>

          <p className="text-gray-700 mb-6">
            The verification system keeps your compliance on track. Automated email reminders prompt you to verify your
            allergen information regularly. Each verification creates a timestamped record in your audit trail. When an EHO
            officer asks when you last reviewed your allergens, you have a clear, dated answer. And uniquely, SafeEat lets
            customers save their allergen profile — building a database of loyal allergy-conscious regulars who chose your
            café because they trust your allergen management. At £29.99/month, it costs less than one professional allergen
            audit and works every day, not just on audit day.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Allergen compliance made simple for your café</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat covers food and drinks in one digital menu. Customers filter by their allergies via QR code. You get
              automated verification reminders and a timestamped audit trail — from £29.99/month.
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
              <li><Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">Natasha&apos;s Law: Complete Compliance Guide</Link></li>
              <li><Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">Owen&apos;s Law: What UK Restaurants Need to Know</Link></li>
              <li><Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">EHO Allergen Inspection Guide</Link></li>
              <li><Link to="/for/takeaways" className="text-emerald-700 underline hover:text-emerald-900">Allergen Compliance for Takeaways</Link></li>
              <li><Link to="/for/pubs" className="text-emerald-700 underline hover:text-emerald-900">Allergen Compliance for Pubs</Link></li>
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
