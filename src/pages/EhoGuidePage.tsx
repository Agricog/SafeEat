import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What do EHO officers check during an allergen inspection?',
    a: 'Environmental Health Officers assess your allergen management system across several areas: written allergen information available to customers, staff training records and knowledge, cross-contamination prevention procedures, ingredient records and supplier specifications, labelling accuracy for pre-packed and pre-packed for direct sale items, cleaning schedules that address allergen residue, and your ability to provide accurate allergen information on request. They may also conduct spot checks by asking staff about specific dishes.',
  },
  {
    q: 'How often do EHO allergen inspections happen?',
    a: 'The frequency depends on your Food Hygiene Rating and risk category. High-risk premises (rating 0-2) may be inspected every 6 months. Medium-risk premises (rating 3) typically receive annual inspections. Low-risk premises (rating 4-5) may go 18-24 months between inspections. However, complaint-driven inspections can happen at any time with no advance notice, and allergen complaints are treated as high priority.',
  },
  {
    q: 'Can I fail an inspection solely for allergen issues?',
    a: 'Yes. Allergen management failures can result in a lower Food Hygiene Rating, formal warnings, improvement notices, or prosecution. Under the Food Information Regulations 2014, failing to provide accurate allergen information is a criminal offence. Even if your kitchen is spotless, inadequate allergen controls can result in enforcement action. Since the introduction of Natasha\'s Law in 2021, officers have been specifically trained to scrutinise allergen procedures more closely.',
  },
  {
    q: 'What records should I keep for EHO allergen compliance?',
    a: 'You should maintain: a complete allergen matrix for every dish on your menu, dated records showing when allergen information was last reviewed and verified, staff training logs with dates and signatures, supplier ingredient specifications, records of any allergen-related incidents or near-misses, cleaning schedules that address allergen cross-contamination, and documentation of any menu changes with corresponding allergen updates. Digital records with timestamps are preferred by officers as they are harder to fabricate.',
  },
  {
    q: 'What is an allergen verification audit trail?',
    a: 'An allergen verification audit trail is a timestamped record proving that your allergen information has been reviewed and confirmed as accurate at regular intervals. It demonstrates due diligence — that you actively check your allergen data rather than setting it once and forgetting it. SafeEat generates this automatically with every verification, creating a digital log that EHO officers can review during inspections.',
  },
  {
    q: 'How do I prove allergen compliance during an inspection?',
    a: 'The most effective approach combines three elements: a current allergen matrix showing every dish and its allergens, a verification log with dated entries proving regular reviews, and evidence of staff training. Digital systems are increasingly preferred because they provide tamper-proof timestamps and are easier to present than paper records. Officers specifically look for evidence that allergen information is actively maintained, not just created once.',
  },
  {
    q: 'What happens if a customer makes an allergen complaint to the council?',
    a: 'The local authority must investigate every allergen complaint. An officer will visit your premises, usually without notice, to assess your allergen management system. They will examine your records, interview staff, and check whether the complaint indicates a systemic failure or an isolated incident. If they find evidence of poor allergen management, enforcement action ranges from written warnings to prosecution. Having a documented audit trail significantly strengthens your position during complaint investigations.',
  },
  {
    q: 'Do I need different allergen procedures for takeaway versus dine-in?',
    a: 'Yes. For dine-in, allergen information must be available on request and clearly signposted (e.g., "Please ask staff about allergens"). For takeaway and delivery, allergen information must be available at the point of ordering — this means on your website, app, phone ordering system, and on any delivery platform you use. Third-party delivery platforms have their own allergen information requirements, but the legal responsibility remains with you as the food business operator.',
  },
  {
    q: 'What are the most common allergen inspection failures?',
    a: 'The five most frequent failures are: no written allergen information available (relying on verbal communication alone), allergen information that does not match actual ingredients (especially after supplier or recipe changes), no evidence of staff training on allergen procedures, inadequate cross-contamination controls in the kitchen, and failure to update allergen information when menus change. Of these, the gap between documented allergens and actual ingredients is the most dangerous and most heavily penalised.',
  },
  {
    q: 'How should I handle allergen cross-contamination risks?',
    a: 'EHO officers expect documented cross-contamination procedures including: separate storage for major allergens (especially nuts, gluten-containing flour), dedicated preparation areas or thorough cleaning between allergen and non-allergen food preparation, separate utensils or validated cleaning between uses, clear labelling in storage areas, and staff awareness of which dishes contain which allergens. Where cross-contamination cannot be fully prevented, you must communicate this risk clearly with appropriate "may contain" warnings.',
  },
  {
    q: 'Is verbal allergen communication sufficient for EHO compliance?',
    a: 'Verbal communication alone is not recommended and puts you at significant risk. While the law allows allergen information to be provided verbally if customers are directed to ask, you must still maintain written records of allergen content for every dish. The FSA\'s best practice guidance published in March 2025 explicitly recommends written allergen information be available to customers, and EHO officers increasingly expect this. Relying solely on verbal communication means one staff member\'s mistake or absence could result in a fatal allergic reaction and criminal prosecution.',
  },
  {
    q: 'What is the role of the FSA March 2025 guidance in EHO inspections?',
    a: 'The FSA published voluntary best practice guidance in March 2025 encouraging food businesses to provide written allergen information proactively rather than waiting for customers to ask. While currently voluntary, EHO officers use this guidance as a benchmark for what constitutes good practice. The FSA is evaluating uptake through spring 2026, and poor compliance is expected to trigger mandatory legislation. Businesses already following the guidance will be ahead of any future legal requirements.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'EHO Allergen Inspection Guide: What UK Restaurants Need to Know in 2026',
      description:
        'Complete guide to passing EHO allergen inspections in the UK. Learn what officers check, common failures, how to build an audit trail, and how to prepare your restaurant for inspection.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/eho-allergen-inspection',
      image: 'https://safeeat.co.uk/og-eho-inspection.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: 'EHO Allergen Inspection', item: 'https://safeeat.co.uk/guides/eho-allergen-inspection' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'EHO Allergen Inspection Guide for UK Restaurants',
      url: 'https://safeeat.co.uk/guides/eho-allergen-inspection',
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
      name: 'EHO Allergen Inspection Terminology',
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Environmental Health Officer',
          description:
            'A local authority officer responsible for enforcing food safety legislation including allergen compliance in food businesses.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Allergen Audit Trail',
          description:
            'A timestamped record of allergen verification activities demonstrating ongoing due diligence in allergen management.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Food Hygiene Rating',
          description:
            'A rating from 0-5 given to food businesses by local authorities based on hygiene standards, food safety management, and structural compliance.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Improvement Notice',
          description:
            'A formal enforcement notice requiring a food business to take specific corrective action within a set timeframe.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Prepare for an EHO Allergen Inspection',
      description: 'Step-by-step guide to preparing your restaurant for an Environmental Health Officer allergen inspection.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Create your allergen matrix',
          text: 'Document every dish on your menu with its corresponding allergens from the 14 regulated allergens list. Include all variations, specials, and seasonal items.',
        },
        {
          '@type': 'HowToStep',
          name: 'Verify ingredient specifications',
          text: 'Cross-check every allergen declaration against current supplier specifications. Contact suppliers directly for any ingredients where allergen content is unclear.',
        },
        {
          '@type': 'HowToStep',
          name: 'Train all staff',
          text: 'Ensure every team member can explain allergen procedures, identify the 14 regulated allergens, and knows how to handle allergen queries from customers. Record training dates.',
        },
        {
          '@type': 'HowToStep',
          name: 'Implement cross-contamination controls',
          text: 'Document your procedures for preventing allergen cross-contact during storage, preparation, and cooking. Include cleaning protocols between allergen and non-allergen food.',
        },
        {
          '@type': 'HowToStep',
          name: 'Set up regular verification',
          text: 'Schedule weekly or monthly allergen verification reviews. Use a digital system like SafeEat to create timestamped audit trails that prove ongoing compliance.',
        },
        {
          '@type': 'HowToStep',
          name: 'Make allergen information accessible',
          text: 'Ensure customers can access allergen information before ordering — whether through a digital menu, printed allergen matrix, or clear signage directing them to ask staff.',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu management with automated audit trails for EHO compliance.',
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

export default function EhoGuidePage() {
  return (
    <>
      <Helmet>
        <title>EHO Allergen Inspection Guide 2026 | What UK Restaurants Must Know | SafeEat</title>
        <meta
          name="description"
          content="Complete guide to EHO allergen inspections for UK restaurants. Learn what officers check, common failures, how to build an audit trail, and prepare for inspection in 2026."
        />
        <link rel="canonical" href="https://safeeat.co.uk/guides/eho-allergen-inspection" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="EHO Allergen Inspection Guide 2026 | SafeEat" />
        <meta
          property="og:description"
          content="What EHO officers check during allergen inspections, the most common failures, and how to build an audit trail that protects your business."
        />
        <meta property="og:image" content="https://safeeat.co.uk/og-eho-inspection.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/eho-allergen-inspection" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EHO Allergen Inspection Guide 2026 | SafeEat" />
        <meta
          name="twitter:description"
          content="What EHO officers check during allergen inspections and how to build an audit trail that protects your restaurant."
        />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-eho-inspection.jpg" />
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
            <li className="text-gray-900 font-medium">EHO Allergen Inspection</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {/* Quick Answer Box */}
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              EHO officers check your allergen management system during food hygiene inspections. They assess whether you have
              written allergen information for every dish, evidence of regular verification, documented staff training, and
              cross-contamination controls. Failing allergen checks can lower your Food Hygiene Rating, result in improvement
              notices, or lead to prosecution with fines reaching £43,000 for independent restaurants.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            EHO Allergen Inspection Guide: What UK Restaurants Need to Know in 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>12 min read</span>
          </div>

          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-6">
            Environmental Health Officer inspections are one of the most stressful experiences for restaurant owners. When it
            comes to allergen compliance, the stakes are particularly high — mistakes in allergen management can result in
            customer hospitalisations, criminal prosecution, and business closure. This guide explains exactly what EHO officers
            look for during allergen inspections, the most common reasons restaurants fail, and how to build an audit trail that
            demonstrates genuine compliance rather than paperwork theatre.
          </p>

          <p className="text-gray-700 mb-6">
            The landscape has shifted significantly in recent years. The deaths of Natasha Ednan-Laperouse in 2016 and Owen Carey
            in 2017 led to major legislative changes and increased enforcement. EHO officers now receive specific training on
            allergen compliance assessment, and allergen failures are treated with the same seriousness as hygiene failures.
            Understanding what officers look for — and preparing accordingly — is essential for every food business in the UK.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What EHO Officers Assess During Allergen Inspections</h2>

          <p className="text-gray-700 mb-4">
            Allergen compliance is assessed as part of your routine food hygiene inspection, not as a separate visit. Officers
            evaluate allergen management under the "confidence in management" scoring criteria, which directly affects your Food
            Hygiene Rating. A business can score perfectly on physical hygiene and structural compliance but still receive a low
            rating if allergen management is inadequate.
          </p>

          <p className="text-gray-700 mb-4">
            The assessment covers six core areas. First, officers check whether written allergen information is available to
            customers. This means either a visible allergen matrix, allergen labelling on menus, or clear signage directing
            customers to ask staff — with written records available when they do ask. The March 2025 FSA voluntary guidance
            recommends proactive written disclosure rather than relying on customers to request information.
          </p>

          <p className="text-gray-700 mb-4">
            Second, officers evaluate your allergen documentation. They want to see an up-to-date allergen matrix covering every
            dish on your menu, including specials, seasonal items, and children's meals. Each dish must be mapped against all 14
            regulated allergens. Officers pay particular attention to whether this documentation matches your actual current menu
            — discrepancies between documented allergens and what is actually being served are treated as a serious failure.
          </p>

          <p className="text-gray-700 mb-4">
            Third, staff knowledge is tested. Officers may ask any member of staff — not just the head chef or manager — about
            allergen procedures. Questions include which allergens are in specific dishes, what to do if a customer reports an
            allergy, and where allergen information is stored. If front-of-house staff cannot answer basic allergen questions,
            this indicates inadequate training regardless of what your training records say.
          </p>

          <p className="text-gray-700 mb-4">
            Fourth, cross-contamination controls are assessed. Officers examine your kitchen layout, storage practices, cleaning
            procedures, and preparation workflows to determine whether allergen cross-contact risks are managed. This includes
            checking whether allergen-containing ingredients are stored separately, whether dedicated utensils or colour-coded
            equipment is used, and whether cleaning protocols between allergen and non-allergen preparation are documented and
            followed.
          </p>

          <p className="text-gray-700 mb-4">
            Fifth, supplier management is reviewed. Officers may ask to see ingredient specifications from your suppliers,
            particularly for composite ingredients where allergens may not be obvious. If you cannot demonstrate that you know
            what is in your ingredients, you cannot accurately declare allergens in your dishes — and officers recognise this gap
            immediately.
          </p>

          <p className="text-gray-700 mb-6">
            Sixth, and increasingly important, officers look for evidence of ongoing management. A static allergen chart created
            two years ago and never updated does not demonstrate active compliance. Officers want to see dated records of reviews,
            evidence that allergen information is updated when menus change, and a system for managing allergen information that
            is clearly embedded in your daily operations rather than existing as a one-off exercise.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Five Most Common Allergen Inspection Failures</h2>

          <p className="text-gray-700 mb-4">
            Data from local authority enforcement actions reveals consistent patterns in allergen compliance failures. Understanding
            these common failures helps you address the areas where EHO officers focus their attention.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. No Written Allergen Information Available</h3>
          <p className="text-gray-700 mb-4">
            The most basic and most common failure. Despite being a legal requirement since 2014, a significant number of food
            businesses still rely entirely on verbal communication for allergen information. The FSA's own research indicates that
            47% of small food businesses have no written allergen information available to customers. When an officer asks to see
            your allergen information and you point to a staff member's head, that is an automatic compliance failure.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Allergen Information That Does Not Match Actual Ingredients</h3>
          <p className="text-gray-700 mb-4">
            This is the most dangerous failure and the one most likely to result in prosecution. It typically occurs when a
            restaurant creates an allergen matrix but fails to update it after recipe changes, supplier substitutions, or new menu
            additions. Officers specifically look for discrepancies by comparing your documented allergens against actual
            ingredient lists. A dish documented as milk-free that contains butter in the recipe is a critical failure that
            demonstrates systemic risk to customers.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Inadequate Staff Training</h3>
          <p className="text-gray-700 mb-4">
            Officers test staff knowledge, not just training records. Common failures include staff who cannot name the 14
            regulated allergens, staff who do not know where to find allergen information, staff who do not understand
            cross-contamination risks, and staff who give incorrect allergen information about specific dishes when asked.
            Training must be regular, documented, and effective — signing a sheet once during induction does not constitute
            adequate training if the staff member cannot demonstrate allergen awareness when questioned.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. No Cross-Contamination Procedures</h3>
          <p className="text-gray-700 mb-4">
            Even if your allergen documentation is accurate, failing to manage cross-contamination risks undermines your entire
            allergen management system. Officers look for documented cleaning procedures, evidence of separate preparation areas
            or validated cleaning between uses, and staff awareness of cross-contact risks. Using the same fryer oil for battered
            fish and chips without declaring cereals containing gluten as a risk for the chips is a classic cross-contamination
            failure.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. No Evidence of Regular Review</h3>
          <p className="text-gray-700 mb-4">
            A growing area of focus for officers. An allergen chart created in 2022 and never updated suggests that allergen
            management is not actively maintained. Officers now ask when allergen information was last reviewed, who reviewed it,
            and what evidence exists of that review. The absence of any verification history is itself a compliance concern,
            because it means you cannot demonstrate that your allergen information is current and accurate.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Building an Allergen Audit Trail</h2>

          <p className="text-gray-700 mb-4">
            An allergen audit trail is a chronological record of your allergen management activities. It serves two purposes:
            demonstrating to EHO officers that you actively maintain allergen information, and protecting your business in the
            event of an allergen-related incident or complaint. A robust audit trail is increasingly the difference between a
            business that receives a verbal warning and one that faces prosecution.
          </p>

          <p className="text-gray-700 mb-4">
            Your audit trail should capture several types of events. Verification entries record when you reviewed and confirmed
            your allergen information as accurate — ideally weekly or at minimum monthly. Update entries record when allergen
            information changed due to recipe modifications, supplier changes, or menu additions. Training entries record when
            staff received allergen training. Incident entries record any allergen-related complaints, near-misses, or customer
            feedback.
          </p>

          <p className="text-gray-700 mb-4">
            The key characteristic of a credible audit trail is that it cannot be easily fabricated. Paper records with undated
            entries or entries clearly written at the same time carry less weight than digital records with automatic timestamps.
            Officers are experienced at identifying records that were created retrospectively — a logbook with identical
            handwriting and ink across six months of entries is obviously not genuine. Digital systems with immutable timestamps
            provide significantly stronger evidence of ongoing compliance.
          </p>

          <p className="text-gray-700 mb-6">
            SafeEat generates this audit trail automatically. Every time a venue owner verifies their allergen information
            through the dashboard, a timestamped entry is created in the verification log. This creates an irrefutable record
            of due diligence that can be presented to EHO officers during inspections. The system also sends automated reminders
            when verification is overdue, ensuring that the audit trail remains current rather than lapsing during busy periods.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Enforcement: What Happens When You Fail</h2>

          <p className="text-gray-700 mb-4">
            EHO enforcement follows a graduated approach, but allergen failures are treated more seriously than many other food
            safety issues because of the direct risk to life. The enforcement ladder typically progresses through verbal advice,
            written warnings, improvement notices, prohibition orders, and prosecution — but officers can escalate directly to
            prosecution if the failure poses an imminent risk to health.
          </p>

          <p className="text-gray-700 mb-4">
            Improvement notices require you to take specific corrective action within a set timeframe, typically 14 days.
            Failure to comply with an improvement notice is itself a criminal offence. Hygiene improvement notices specifically
            related to allergen management have increased substantially since 2021, reflecting the heightened regulatory focus
            following Natasha's Law.
          </p>

          <p className="text-gray-700 mb-4">
            Prosecution for allergen failures typically results from incidents where a customer suffered an allergic reaction, or
            where inspection findings reveal such serious deficiencies that customer harm is considered likely. Recent
            prosecutions have resulted in fines of £43,000 for an independent restaurant in North Yorkshire and £27,000 for a
            London takeaway. In the most serious cases, prison sentences have been imposed — the owner of the Indian Garden
            restaurant in Easingwold received a six-year custodial sentence after a customer died from an allergic reaction to
            peanuts.
          </p>

          <p className="text-gray-700 mb-6">
            Beyond formal enforcement, allergen failures affect your Food Hygiene Rating. A low rating is publicly visible on
            the FSA website and must be displayed at your premises in Wales and Northern Ireland (with England expected to make
            display mandatory). For many restaurants, the reputational damage of a low hygiene rating is as damaging as any fine.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Prepare for an EHO Allergen Inspection</h2>

          <p className="text-gray-700 mb-4">
            Preparation should be continuous rather than reactive. If your allergen management system only works when you know
            an inspection is coming, it is not a genuine system — and officers are trained to identify performative compliance.
            The following steps establish a permanent state of inspection readiness.
          </p>

          <p className="text-gray-700 mb-4">
            Start with your allergen matrix. Every dish on your current menu — including specials, seasonal items, children's
            meals, sauces, sides, and drinks — must be documented with its allergen content against all{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>
            . This matrix must be accessible to all staff and available to customers. Digital allergen menus like SafeEat make
            this information instantly accessible via QR code, eliminating the risk of paper menus being lost, outdated, or
            unavailable.
          </p>

          <p className="text-gray-700 mb-4">
            Cross-check every allergen declaration against your actual ingredients. This means reviewing supplier specifications,
            checking composite ingredient labels, and verifying that any recent recipe changes have been reflected in your allergen
            information. This verification process should happen every time your menu changes and at regular intervals regardless
            — monthly at minimum. Under{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen's Law
            </Link>
            , the FSA is pushing for this kind of proactive verification to become standard practice across all food businesses.
          </p>

          <p className="text-gray-700 mb-4">
            Train all staff — not just chefs. Front-of-house staff are typically the first point of contact for allergen queries,
            and officers will test their knowledge. Training should cover the 14 regulated allergens, your specific menu allergens,
            how to handle allergen requests from customers, cross-contamination awareness, and what to do in an emergency.
            Training records should include dates, attendee names, and ideally a brief assessment of understanding.
          </p>

          <p className="text-gray-700 mb-4">
            Document your cross-contamination controls. Write down your procedures for preventing allergen cross-contact during
            storage, preparation, and cooking. Include cleaning schedules that specifically address allergen residue — standard
            cleaning may not remove allergen proteins effectively. If you use shared equipment (fryers, griddles, utensils),
            document what allergen risks this creates and how you communicate those risks to customers.
          </p>

          <p className="text-gray-700 mb-6">
            Establish a verification schedule. This is the element that separates good compliance from excellent compliance.
            Regular, documented verification of your allergen information — with timestamps — creates an audit trail that
            demonstrates genuine due diligence. SafeEat automates this entirely: venue owners verify their menu through the
            dashboard, creating a timestamped log, and receive automated reminders if verification lapses beyond seven days.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Complaint-Driven Inspections</h2>

          <p className="text-gray-700 mb-4">
            Routine inspections are scheduled, but complaint-driven inspections arrive without warning. When a customer reports
            an allergen incident to their local authority, the Environmental Health team must investigate. These investigations
            are treated as high priority because of the potential for serious harm.
          </p>

          <p className="text-gray-700 mb-4">
            During a complaint-driven visit, officers focus specifically on the allergen that caused the complaint. They will
            examine your documentation for that specific allergen, check whether the dish in question is correctly documented,
            interview staff about their awareness of that allergen in your menu, and assess whether your cross-contamination
            controls are adequate to prevent the type of incident reported.
          </p>

          <p className="text-gray-700 mb-4">
            Your audit trail becomes critical during complaint investigations. If you can demonstrate that you verified your
            allergen information recently, that staff were trained, and that your documentation was accurate at the time of the
            incident, you have a strong defence against allegations of negligence. If you have no verification records, outdated
            documentation, or no evidence of staff training, the complaint is much more likely to escalate to formal enforcement.
          </p>

          <p className="text-gray-700 mb-6">
            The{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              financial consequences of allergen prosecution
            </Link>{' '}
            are severe. But the non-financial consequences — reputational damage, loss of customer trust, and the psychological
            impact on business owners involved in an incident that harmed a customer — are often worse. Proactive compliance is
            not just a legal requirement; it is a moral responsibility to the people you feed.
          </p>

          {/* Section 7 */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The March 2025 FSA Guidance and What It Means for Inspections</h2>

          <p className="text-gray-700 mb-4">
            In March 2025, the Food Standards Agency published voluntary best practice guidance encouraging all food businesses to
            provide written allergen information proactively. While this guidance is not yet mandatory, it sets a clear direction
            for where regulation is heading. EHO officers are already using this guidance as a benchmark — businesses that follow
            it are viewed favourably, while those that fall short are flagged for closer scrutiny.
          </p>

          <p className="text-gray-700 mb-4">
            The FSA is evaluating uptake of this guidance through spring 2026. If voluntary compliance is insufficient — and
            early indicators suggest it will be, given that nearly half of small food businesses still have no written allergen
            information — mandatory legislation is expected to follow. This mirrors the pathway that led to{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha's Law
            </Link>
            , where voluntary measures were tried first and found insufficient before legislation was introduced.
          </p>

          <p className="text-gray-700 mb-6">
            For restaurant owners, the strategic move is to adopt the guidance now rather than waiting for it to become law.
            Businesses that are already compliant with best practice guidance will face no disruption when mandatory requirements
            arrive. Those that wait will face a scramble to comply, with potential inspection failures during the transition
            period. SafeEat is designed to meet both the current voluntary guidance and any future mandatory requirements, so
            venues that adopt it now are positioned ahead of the regulatory curve.
          </p>

          {/* Section 8 - Digital vs Paper */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Digital Versus Paper Allergen Management</h2>

          <p className="text-gray-700 mb-4">
            EHO officers do not mandate a specific format for allergen records — paper systems are technically acceptable. However,
            the practical advantages of digital allergen management are so significant that officers increasingly view paper-only
            systems as a risk indicator.
          </p>

          <p className="text-gray-700 mb-4">
            Paper allergen matrices get lost, damaged, and outdated. They require manual updates whenever your menu changes. They
            cannot be verified with tamper-proof timestamps. They are difficult to present to customers efficiently — a laminated
            sheet passed between tables is neither hygienic nor practical during busy service. And critically, paper systems
            provide no automated reminders when verification lapses, meaning the audit trail typically degrades over time.
          </p>

          <p className="text-gray-700 mb-4">
            Digital systems like SafeEat address every one of these weaknesses. The allergen menu is always current because it
            updates in real time when dishes are modified. Customers access it via QR code on their own devices — no shared
            physical menus. Verification creates immutable timestamped records. Automated email reminders ensure verification
            does not lapse. And the digital format means allergen information is available 24/7, including for takeaway and
            delivery orders where paper systems are impractical.
          </p>

          <p className="text-gray-700 mb-6">
            The cost difference is also worth considering. A professional allergen consultant charges £200-£500 for an initial
            allergen assessment and ongoing fees for updates and reviews. Paper printing, laminating, and reprinting after every
            menu change adds up. SafeEat provides the complete digital system — allergen menu, audit trail, customer profiles,
            and automated reminders — for £29.99 per month, with self-service menu management that eliminates consultant
            dependency.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Be inspection-ready, every day</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat gives your restaurant a digital allergen menu, automated verification reminders, and a timestamped audit
              trail that EHO officers trust — from £29.99/month.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-emerald-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-emerald-700 transition"
            >
              Start your free trial
            </Link>
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
                  Owen's Law: What UK Restaurants Need to Know in 2026
                </Link>
              </li>
              <li>
                <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
                  Natasha's Law: Complete Compliance Guide for Restaurants
                </Link>
              </li>
              <li>
                <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
                  Allergen Fines UK: Recent Prosecutions and Penalties
                </Link>
              </li>
              <li>
                <Link to="/guides/allergen-menu-template" className="text-emerald-700 underline hover:text-emerald-900">
                  Free Allergen Menu Template for UK Restaurants
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
