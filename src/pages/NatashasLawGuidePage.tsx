import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: "What is Natasha's Law?",
    a: "Natasha's Law is UK legislation that came into force on 1 October 2021 requiring full ingredient labelling with allergens emphasised on all prepacked for direct sale (PPDS) food. It is named after Natasha Ednan-Laperouse, who died aged 15 in 2016 after eating a Pret a Manger baguette containing undeclared sesame seeds. The law ensures customers can read a full ingredient list before purchasing PPDS food, rather than relying on staff to provide allergen information verbally.",
  },
  {
    q: "What is prepacked for direct sale (PPDS) food?",
    a: "PPDS food is food that is prepared and packaged on the same premises where it is sold to the customer, before the customer orders or selects it. Examples include sandwiches made in a café kitchen and placed in a display fridge, salads prepared and boxed in-house, bakery items wrapped before display, and burritos or wraps made in advance and packaged for grab-and-go. The key distinction is that the food is packed before the specific customer requests it, and on the same premises where it is sold.",
  },
  {
    q: "How is PPDS different from prepacked and non-prepacked food?",
    a: "Prepacked food is manufactured and sealed off-site before arriving at the point of sale (e.g., a branded packet of crisps or a factory-sealed ready meal) — this already required full ingredient labelling before Natasha's Law. Non-prepacked food is food prepared after the customer orders it (e.g., a meal cooked to order in a restaurant) — this requires allergen information but not full ingredient labelling. PPDS sits between the two: prepared and packaged on-site before the customer selects it. Natasha's Law closed the labelling gap for this middle category.",
  },
  {
    q: "What must a Natasha's Law label include?",
    a: "Every PPDS item must display a label showing the name of the food and a full ingredients list. Within that ingredients list, any of the 14 regulated allergens must be emphasised — typically using bold, italics, underlining, or a contrasting colour. The label must be attached to the individual item, not just displayed on the shelf or counter. The ingredients must be listed in descending order of weight, following the same format as prepacked food labelling.",
  },
  {
    q: "Does Natasha's Law apply to restaurants?",
    a: "Natasha's Law applies to any food business that produces PPDS food — this includes restaurants, cafés, bakeries, delis, canteens, and any other establishment that prepares and packages food on-site before the customer selects it. If your restaurant makes sandwiches, wraps, or salads in advance and packages them for display, those items are PPDS and must carry full ingredient labels. Food cooked to order and served directly to the customer is non-prepacked and is not covered by Natasha's Law — that category is addressed by Owen's Law.",
  },
  {
    q: "What are the penalties for not complying with Natasha's Law?",
    a: "Non-compliance with Natasha's Law is a criminal offence under the Food Information Regulations 2014 (as amended). Penalties include improvement notices, prohibition orders, and prosecution with potentially unlimited fines. EHO officers check PPDS labelling during routine food hygiene inspections, and non-compliance can lower your Food Hygiene Rating. In cases where mislabelling or absent labelling leads to a customer suffering an allergic reaction, prosecution is highly likely with substantial fines.",
  },
  {
    q: "Do I need to label every individual PPDS item?",
    a: "Yes. Every individual PPDS item must carry its own label with the food name and full ingredients list with allergens emphasised. A sign on the shelf or display case is not sufficient — the label must be physically attached to or printed on the packaging of each item. This ensures the customer can read the ingredient information before purchasing, even if the item is moved from its original display position.",
  },
  {
    q: "What if my PPDS recipe changes — do I need new labels?",
    a: "Yes. Every time a recipe changes, the ingredient label must be updated to reflect the new ingredients. This includes changes to main ingredients, substitutions by suppliers, and any modification that affects allergen content. Using outdated labels that do not match actual ingredients is a serious compliance failure — it is the same as having no label at all, because it provides false information to the customer.",
  },
  {
    q: "Does Natasha's Law apply to food sold at farmers' markets and food festivals?",
    a: "Yes. If you prepare and package food before selling it at a market or festival — for example, jars of chutney made in your kitchen, pre-wrapped cakes, or boxed salads — these are PPDS and must carry full ingredient labels with allergens emphasised. The requirement applies regardless of where the food is sold, as long as it was prepared and packaged on the same premises (your kitchen counts as the premises even if you sell at a different location).",
  },
  {
    q: "How do I emphasise allergens on my ingredient labels?",
    a: "Allergens must be visually distinct from the rest of the ingredient list. The most common approaches are bold text (e.g., 'flour (WHEAT), sugar, EGGS, butter (MILK)'), italics, underlining, or a contrasting text colour. The method must be consistent across all your labels. Bold is the most widely used and most easily readable approach. The allergen emphasis must make it possible for a customer to quickly identify which of the 14 regulated allergens are present by scanning the ingredient list.",
  },
  {
    q: "Can I use a digital label or QR code for PPDS compliance?",
    a: "No. Natasha's Law requires physical labelling on each PPDS item. A QR code or digital display does not satisfy the requirement because the customer must be able to read the ingredients directly on the product packaging without needing a smartphone or any other device. However, digital allergen systems like SafeEat are valuable for your non-prepacked food — meals cooked to order — which are covered by different allergen information requirements.",
  },
  {
    q: "What is the difference between Natasha's Law and Owen's Law?",
    a: "Natasha's Law (2021) requires full ingredient labelling on prepacked for direct sale (PPDS) food. Owen's Law — not yet legislation but under active government evaluation in spring 2026 — calls for mandatory written allergen information for non-prepacked food served in restaurants, cafés, and takeaways. Natasha's Law addressed packaged food; Owen's Law would address everything else. Together, they would create comprehensive written allergen disclosure across all food types.",
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: "Natasha's Law: Complete Compliance Guide for UK Restaurants and Cafés 2026",
      description:
        "Complete guide to Natasha's Law (PPDS labelling) for UK restaurants, cafés, and food businesses. Covers what PPDS food is, labelling requirements, penalties, and how it connects to Owen's Law.",
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/natashas-law-restaurants',
      image: 'https://safeeat.co.uk/og-natashas-law.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: "Natasha's Law", item: 'https://safeeat.co.uk/guides/natashas-law-restaurants' },
      ],
    },
    {
      '@type': 'WebPage',
      name: "Natasha's Law: Complete Compliance Guide for UK Restaurants",
      url: 'https://safeeat.co.uk/guides/natashas-law-restaurants',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#quick-answer'],
      },
    },
    {
      '@type': 'Organization',
      name: 'SafeEat',
      url: 'https://safeeat.co.uk',
      description: 'Digital allergen management and customer retention platform for UK restaurants.',
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
      name: "Natasha's Law Terminology",
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: "Natasha's Law",
          description: 'UK legislation (October 2021) requiring full ingredient labelling with allergens emphasised on all prepacked for direct sale (PPDS) food.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Prepacked for Direct Sale (PPDS)',
          description: 'Food that is prepared and packaged on the same premises where it is sold, before the customer orders or selects it.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Allergen Emphasis',
          description: 'The requirement to visually distinguish allergens within an ingredient list using bold, italics, underlining, or contrasting colour.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Non-Prepacked Food',
          description: 'Food prepared after the customer orders it, such as meals cooked to order in restaurants. Requires allergen information but not full ingredient labelling.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: "How to Comply with Natasha's Law",
      description: "Step-by-step guide to achieving Natasha's Law compliance for PPDS food in your restaurant or café.",
      step: [
        {
          '@type': 'HowToStep',
          name: 'Identify your PPDS food',
          text: 'Audit every item you prepare and package on-site before the customer selects it. This includes sandwiches, wraps, salads, boxed meals, pastries, and any other grab-and-go items.',
        },
        {
          '@type': 'HowToStep',
          name: 'Document full ingredient lists',
          text: 'For each PPDS item, create a complete ingredient list in descending order of weight. Include all sub-ingredients from composite products.',
        },
        {
          '@type': 'HowToStep',
          name: 'Identify and emphasise allergens',
          text: 'Check each ingredient against the 14 regulated allergens. Emphasise every allergen in the ingredient list using bold, italics, or contrasting colour.',
        },
        {
          '@type': 'HowToStep',
          name: 'Create and apply labels',
          text: 'Print labels showing the food name and full ingredient list with allergens emphasised. Attach a label to every individual PPDS item before display.',
        },
        {
          '@type': 'HowToStep',
          name: 'Establish an update process',
          text: 'Create a system for updating labels whenever recipes change, suppliers substitute ingredients, or new PPDS items are added to your range.',
        },
        {
          '@type': 'HowToStep',
          name: 'Train staff and verify regularly',
          text: 'Ensure all staff involved in PPDS preparation understand labelling requirements. Verify label accuracy regularly and document your verification with dates.',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu management for non-prepacked food, complementing Natasha\'s Law PPDS labelling with QR code menus and audit trails.',
      url: 'https://safeeat.co.uk',
      offers: {
        '@type': 'Offer',
        price: '29.99',
        priceCurrency: 'GBP',
        priceValidUntil: '2027-04-12',
      },
    },
  ],
}

export default function NatashasLawGuidePage() {
  return (
    <>
      <Helmet>
        <title>Natasha&apos;s Law: Complete Compliance Guide for UK Restaurants 2026 | SafeEat</title>
        <meta
          name="description"
          content="Complete guide to Natasha's Law PPDS labelling for UK restaurants, cafés, and food businesses. What PPDS food is, labelling requirements, allergen emphasis rules, penalties, and how it connects to Owen's Law."
        />
        <link rel="canonical" href="https://safeeat.co.uk/guides/natashas-law-restaurants" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Natasha's Law: Complete Compliance Guide for UK Restaurants | SafeEat" />
        <meta
          property="og:description"
          content="Complete guide to Natasha's Law PPDS labelling. What counts as PPDS, how to label correctly, and what penalties apply."
        />
        <meta property="og:image" content="https://safeeat.co.uk/og-natashas-law.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/natashas-law-restaurants" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Natasha's Law: Complete Compliance Guide | SafeEat" />
        <meta
          name="twitter:description"
          content="Natasha's Law PPDS labelling requirements for UK restaurants and cafés. Full compliance guide."
        />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-natashas-law.jpg" />
        <meta name="author" content="SafeEat" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <nav className="max-w-3xl mx-auto px-4 pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link to="/" className="hover:text-emerald-700">Home</Link></li>
            <li>/</li>
            <li><Link to="/guides/14-allergens-uk" className="hover:text-emerald-700">Guides</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">Natasha&apos;s Law</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {/* Quick Answer Box */}
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              Natasha&apos;s Law requires full ingredient labelling with allergens emphasised on all prepacked for direct sale
              (PPDS) food — items prepared and packaged on the same premises before the customer selects them. It has been in
              force since 1 October 2021. Every PPDS item must carry a label showing the food name and complete ingredient
              list with the 14 regulated allergens highlighted in bold or similar emphasis. Non-compliance is a criminal offence.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Natasha&apos;s Law: Complete Compliance Guide for UK Restaurants and Cafés
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>13 min read</span>
          </div>

          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-6">
            Natasha&apos;s Law changed how food businesses in the United Kingdom label prepacked for direct sale food. Since
            1 October 2021, every PPDS item — sandwiches made in your kitchen and placed in a display fridge, salads prepared
            and boxed in-house, bakery items wrapped before display — must carry a full ingredient list with all{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>{' '}
            clearly emphasised. This guide explains what PPDS food is, how to label it correctly, common compliance mistakes,
            enforcement penalties, and how Natasha&apos;s Law connects to the broader allergen regulatory landscape including{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>.
          </p>

          <p className="text-gray-700 mb-6">
            The law is named after Natasha Ednan-Laperouse, who died aged 15 in July 2016 after eating an artichoke, olive,
            and tapenade baguette from Pret a Manger at Heathrow Airport. The baguette contained sesame seeds baked into the
            dough, but because the product was classified as PPDS — made and packaged on-site — it was not required to carry
            an ingredient label under the law as it stood at the time. Natasha, who had a severe sesame allergy, had no way of
            knowing the baguette contained sesame without asking staff. She suffered a fatal anaphylactic reaction on the flight.
          </p>

          {/* What Is PPDS */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What Is Prepacked for Direct Sale (PPDS) Food?</h2>

          <p className="text-gray-700 mb-4">
            Understanding the PPDS classification is essential because it determines which of your products require full
            ingredient labelling under Natasha&apos;s Law. PPDS food must meet three criteria simultaneously: the food is
            packaged (fully or partly enclosed), the packaging is done on the same premises where it is offered for sale, and
            the food is packaged before the specific customer selects or orders it.
          </p>

          <p className="text-gray-700 mb-4">
            Common examples of PPDS food include sandwiches, wraps, and baguettes made in your kitchen and placed in a display
            cabinet for customers to select; salads and grain bowls prepared in advance and packaged in containers; bakery items
            such as pastries, cakes, and muffins wrapped or boxed before display; pizza slices boxed and placed in a heated
            display; sushi prepared and packaged in-house; and any grab-and-go items where the food is sealed before the customer
            picks it up.
          </p>

          <p className="text-gray-700 mb-4">
            Items that are not PPDS include food cooked to order after the customer requests it (this is non-prepacked), food
            packaged by the customer themselves (e.g., from a self-service salad bar where the customer fills their own
            container), food packaged off-site by a different business and delivered to you for resale (this is standard
            prepacked food and already required full labelling before Natasha&apos;s Law), and unpackaged food displayed loose
            (e.g., unwrapped cakes on a counter).
          </p>

          <p className="text-gray-700 mb-6">
            The grey areas cause the most confusion. A sandwich made to order at a customer&apos;s request is non-prepacked —
            no Natasha&apos;s Law label required, but allergen information must still be provided under the Food Information
            Regulations 2014. The same sandwich made 30 minutes earlier and placed in a display fridge for the next customer to
            select is PPDS — full ingredient label required. The timing and customer interaction determine the classification,
            not the food itself. If you are unsure about a specific product, the FSA provides decision tools on its website, and
            your local authority Environmental Health team can advise.
          </p>

          {/* How to Label Correctly */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Label PPDS Food Correctly</h2>

          <p className="text-gray-700 mb-4">
            Every PPDS item must carry a label that includes two things: the name of the food and a full ingredients list with
            allergens emphasised. The label must be physically attached to or printed on the individual item — a sign on the
            shelf or display case does not satisfy the requirement, because the customer must be able to read the ingredients
            on the product itself.
          </p>

          <p className="text-gray-700 mb-4">
            The ingredients list must include every ingredient in descending order of weight, following the same format as
            standard prepacked food. This means listing primary ingredients first, then secondary ingredients, including all
            sub-ingredients from composite products. If your sandwich uses a bread that contains wheat flour, water, yeast, salt,
            and soybean oil, all of those sub-ingredients must appear in the label — not just &quot;bread.&quot;
          </p>

          <p className="text-gray-700 mb-4">
            Allergen emphasis is the critical compliance element. Any ingredient that is or contains one of the 14 regulated
            allergens must be visually distinguished from the rest of the list. The most common and recommended approach is bold
            text — for example: &quot;Wheat flour (<strong>WHEAT</strong>), water, butter (<strong>MILK</strong>), free-range
            <strong> EGGS</strong>, salt, yeast.&quot; Alternatives include italics, underlining, capitalisation, or a
            contrasting text colour. Whichever method you choose, it must be consistent across all your PPDS labels and must
            make it possible for a customer to quickly scan the list and identify allergens.
          </p>

          <p className="text-gray-700 mb-4">
            Label accuracy is paramount. The ingredient list on the label must exactly match what is actually in the product.
            If you substitute an ingredient — even temporarily due to a supply shortage — the label must be updated before the
            product is displayed for sale. Using a label that does not match the actual ingredients is worse than having no label
            at all, because it provides false reassurance to a customer who may have a life-threatening allergy to the
            undeclared ingredient.
          </p>

          <p className="text-gray-700 mb-6">
            For businesses with multiple PPDS products or frequently changing recipes, label management can become complex.
            Label printing systems range from simple approaches — handwritten stickers with ingredient lists — to professional
            label printers connected to recipe management software. The investment in a reliable labelling system is minimal
            compared to the cost of non-compliance, which includes prosecution, fines, and the catastrophic consequences of
            a customer suffering an allergic reaction due to missing or inaccurate labelling.
          </p>

          {/* Common Compliance Mistakes */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Common Natasha&apos;s Law Compliance Mistakes</h2>

          <p className="text-gray-700 mb-4">
            Several compliance failures appear repeatedly during{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>
            . Understanding these common mistakes helps you avoid them.
          </p>

          <p className="text-gray-700 mb-4">
            The most frequent failure is missing labels entirely — PPDS items displayed without any ingredient information.
            This often happens with items that staff do not recognise as PPDS, such as wrapped cakes, boxed pastries, or
            pre-portioned desserts. Any item that is packaged before the customer selects it needs a label, regardless of how
            simple the product seems.
          </p>

          <p className="text-gray-700 mb-4">
            The second most common failure is incomplete ingredient lists. Labels that say &quot;cheese and ham sandwich&quot;
            without listing the individual ingredients of the bread, the type of cheese, the specific ham product, any butter or
            spread, and any garnishes do not comply. The law requires a full ingredient list, not a product description. Every
            component must be listed, including sub-ingredients of composite products.
          </p>

          <p className="text-gray-700 mb-4">
            Allergen emphasis failures are also common — labels that list ingredients correctly but do not emphasise the
            allergens. A customer scanning a long ingredient list cannot quickly identify allergens if they are not visually
            distinct. Some businesses use a separate &quot;contains: milk, wheat, eggs&quot; statement at the end instead of
            emphasising allergens within the ingredient list. While a separate allergen summary is good practice as an
            additional measure, it does not replace the requirement to emphasise allergens within the ingredient list itself.
          </p>

          <p className="text-gray-700 mb-6">
            Outdated labels — labels that do not reflect current recipes or ingredient substitutions — represent the most
            dangerous compliance failure. A customer relying on a label that says the product is milk-free, when the recipe
            has changed to include butter, is at direct risk. Establishing a process for updating labels whenever recipes
            change is essential. This process should include who is responsible for updates, how quickly labels must be changed
            after a recipe modification, and how old labels are removed from circulation.
          </p>

          {/* Enforcement and Penalties */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Enforcement and Penalties</h2>

          <p className="text-gray-700 mb-4">
            Natasha&apos;s Law compliance is checked during routine food hygiene inspections by Environmental Health Officers.
            PPDS labelling is assessed as part of your overall food safety management system and can affect your Food Hygiene
            Rating. Officers check that every PPDS item has a label, that ingredient lists are complete, that allergens are
            properly emphasised, and that labels match actual product contents.
          </p>

          <p className="text-gray-700 mb-4">
            Enforcement follows a graduated approach. First offences or minor deficiencies typically result in verbal advice
            or written warnings with a timeframe for correction. Repeated failures, systemic non-compliance, or refusal to
            correct identified problems can result in improvement notices — legally binding orders requiring specific corrective
            action. Persistent non-compliance or situations where customer safety is at risk can lead to prosecution.
          </p>

          <p className="text-gray-700 mb-4">
            Prosecution for PPDS labelling failures carries potentially unlimited fines under the Food Information Regulations
            2014 (as amended). While standalone labelling prosecution fines have generally been lower than fines for allergen
            incidents that cause customer harm, the financial penalties are increasing as enforcement priorities elevate allergen
            compliance. More significantly, a labelling failure that contributes to a customer suffering an allergic reaction
            transforms a regulatory offence into a food safety incident with much more severe consequences — including the{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              fines of £43,000+
            </Link>{' '}
            that have been imposed in recent allergen prosecution cases.
          </p>

          <p className="text-gray-700 mb-6">
            Beyond formal penalties, PPDS labelling failures damage your Food Hygiene Rating. A lower rating is publicly visible
            on the FSA website and must be displayed at your premises in Wales and Northern Ireland. In England, mandatory display
            is expected to follow. For many food businesses, the reputational cost of a reduced hygiene rating exceeds any fine.
          </p>

          {/* The Broader Allergen Landscape */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Natasha&apos;s Law in the Broader Allergen Landscape</h2>

          <p className="text-gray-700 mb-4">
            Natasha&apos;s Law addressed one specific gap in UK allergen regulation — the absence of ingredient labelling on
            PPDS food. However, it exists within a broader regulatory framework that is actively evolving. Understanding where
            Natasha&apos;s Law fits helps food businesses prepare for what comes next.
          </p>

          <p className="text-gray-700 mb-4">
            The Food Information Regulations 2014 established the baseline requirement to declare the 14 regulated allergens
            in all food sold to consumers. For prepacked food (manufactured and sealed off-site), full ingredient labelling was
            already mandatory. For non-prepacked food (cooked to order), allergen information must be available but can be
            provided verbally. Natasha&apos;s Law filled the gap for PPDS food, bringing it in line with prepacked food
            requirements.
          </p>

          <p className="text-gray-700 mb-4">
            The remaining gap is non-prepacked food — meals served in restaurants, cafés, pubs, and takeaways. This is exactly
            the gap that{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>{' '}
            aims to close. The FSA published voluntary best practice guidance in March 2025 recommending written allergen
            disclosure for non-prepacked food, and is evaluating uptake in spring 2026. If voluntary compliance is insufficient
            — and the evidence strongly suggests it will be — mandatory legislation will follow.
          </p>

          <p className="text-gray-700 mb-6">
            For food businesses that serve both PPDS and non-prepacked food (which includes most cafés, many bakeries, and some
            restaurants), this means managing two parallel compliance systems. PPDS items need physical ingredient labels under
            Natasha&apos;s Law. Non-prepacked food needs allergen information — currently via verbal or written communication
            under the Food Information Regulations, and likely via mandatory written disclosure if Owen&apos;s Law becomes
            legislation. SafeEat handles the non-prepacked side: digital allergen menus via QR code, customer allergen filtering,
            and automated audit trails. Combined with your PPDS labelling system, it creates comprehensive allergen compliance
            across everything you serve.
          </p>

          {/* Practical Implementation */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Practical Implementation for Cafés and Restaurants</h2>

          <p className="text-gray-700 mb-4">
            Implementing Natasha&apos;s Law compliance involves three phases: initial setup, daily operations, and ongoing
            maintenance. The initial setup is the most labour-intensive but only needs to be done once. Daily operations should
            become routine quickly. Ongoing maintenance ensures labels stay accurate as recipes evolve.
          </p>

          <p className="text-gray-700 mb-4">
            Start by auditing every item you sell that could be PPDS. Walk through your entire product range and classify each
            item: is it packaged before the customer selects it? If yes, it needs a Natasha&apos;s Law label. Common items that
            businesses miss include wrapped portions of cake, boxed pastries, pre-made salad pots, bottled smoothies or juices
            made in-house, pre-portioned desserts, and any item placed in a container or wrapper before being displayed for sale.
          </p>

          <p className="text-gray-700 mb-4">
            For each PPDS item, document the complete recipe with every ingredient, including sub-ingredients of any composite
            products. Contact your suppliers for full ingredient specifications of any bought-in components. Identify which
            ingredients contain or are derived from the 14 regulated allergens. Then create your label template with the food
            name and full ingredient list, emphasising all allergens in bold.
          </p>

          <p className="text-gray-700 mb-4">
            Establish a labelling process for daily operations. Whoever prepares and packages PPDS items must apply the correct
            label to each item. Build checks into your workflow: a quick visual verification that every displayed PPDS item has
            a label, and spot-checks to confirm label accuracy against actual recipes. Train all staff involved in PPDS
            preparation on the labelling requirements and the reasons behind them — staff who understand that incorrect labelling
            could cause a fatal allergic reaction take the process more seriously than those who see it as paperwork.
          </p>

          <p className="text-gray-700 mb-6">
            Ongoing maintenance is about keeping labels accurate as your business evolves. Create a rule: any recipe change
            triggers a label review. Any supplier change triggers an ingredient specification check and potential label update.
            Any new PPDS product requires a new label before it can be displayed. Document these reviews with dates to create
            the audit trail that{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO officers
            </Link>{' '}
            look for during inspections. A dated log showing &quot;label reviewed after supplier change — 15 March 2026 — no
            allergen changes&quot; is exactly the kind of evidence that demonstrates genuine compliance management.
          </p>

          {/* Where SafeEat Fits */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Where SafeEat Fits Alongside Natasha&apos;s Law</h2>

          <p className="text-gray-700 mb-4">
            Natasha&apos;s Law requires physical labels on PPDS food — a digital system cannot replace that requirement. SafeEat
            does not claim to solve PPDS labelling. What SafeEat solves is the other half of your allergen compliance: the
            non-prepacked food you cook to order.
          </p>

          <p className="text-gray-700 mb-4">
            If your café serves both PPDS items (pre-made sandwiches in the fridge) and non-prepacked food (hot meals cooked to
            order, coffee drinks, plated desserts), you need two systems. PPDS items get physical ingredient labels under
            Natasha&apos;s Law. Non-prepacked items get digital allergen information through SafeEat — a QR code menu that
            customers can filter by their specific allergies, updated in real time when recipes change, with automated
            verification reminders and a timestamped audit trail.
          </p>

          <p className="text-gray-700 mb-6">
            Together, these two systems create comprehensive allergen compliance across everything you serve. Your PPDS labels
            cover packaged items. SafeEat covers everything cooked to order. Your EHO inspection demonstrates both physical
            labelling compliance and digital allergen management with an audit trail — the complete picture that officers want
            to see. And SafeEat adds the customer retention dimension that no labelling system provides: allergen-conscious
            diners who save their profile, return because they trust you, and opt in to hear about new allergen-safe dishes.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Complete your allergen compliance</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              Natasha&apos;s Law covers your PPDS food. SafeEat covers everything else — digital allergen menus via QR code,
              customer allergen filtering, automated verification reminders, and timestamped audit trails. From £29.99/month.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Start your free trial
            </Link>
            <p className="text-xs text-gray-500 mt-3">£29.99/month · No credit card required</p>
          </div>

          {/* FAQ Section */}
          <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Related Guides */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Guides</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
                  The 14 Allergens UK Restaurants Must Declare
                </Link>
              </li>
              <li>
                <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
                  Owen&apos;s Law: What UK Restaurants Need to Know in 2026
                </Link>
              </li>
              <li>
                <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
                  EHO Allergen Inspection Guide for UK Restaurants
                </Link>
              </li>
              <li>
                <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
                  Allergen Fines UK: Recent Prosecutions and Penalties
                </Link>
              </li>
              <li>
                <Link to="/guides/allergen-menu-template" className="text-emerald-700 underline hover:text-emerald-900">
                  Allergen Menu Template for UK Restaurants
                </Link>
              </li>
            </ul>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <Link to="/" className="text-emerald-700 underline hover:text-emerald-900">
              ← Back to SafeEat
            </Link>
          </div>
        </article>
      </main>
    </>
  )
}
