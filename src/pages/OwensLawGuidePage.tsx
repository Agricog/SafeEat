import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: "What is Owen's Law?",
    a: "Owen's Law is a campaign calling for mandatory written allergen information at the point of ordering in UK restaurants, without the customer needing to ask. It is named after Owen Carey, who died aged 18 in April 2017 after eating buttermilk-marinated chicken at a Byron restaurant in London. The buttermilk — a dairy product — was not declared on the menu, and Owen suffered a fatal anaphylactic reaction despite informing staff of his dairy allergy before ordering.",
  },
  {
    q: "Is Owen's Law already in force?",
    a: "No. Owen's Law is not yet legislation. The Food Standards Agency published voluntary best-practice guidance in March 2025 recommending written allergen disclosure. The government committed to evaluating uptake one year after publication — meaning the evaluation is underway in spring 2026. If voluntary compliance is poor, mandatory legislation is expected to follow. Given that 47% of small food businesses still rely on verbal-only allergen communication, the evidence strongly suggests voluntary uptake will fall short.",
  },
  {
    q: "How is Owen's Law different from Natasha's Law?",
    a: "Natasha's Law (October 2021) requires full ingredient labelling on prepacked for direct sale (PPDS) food — items like sandwiches made on-site and wrapped before the customer selects them. Owen's Law addresses non-prepacked food — meals cooked to order in restaurants, cafés, pubs, and takeaways. Natasha's Law closed the labelling gap for packaged food; Owen's Law would close the gap for everything else. Together, they would create a comprehensive framework covering all food types.",
  },
  {
    q: "What does the FSA March 2025 guidance say?",
    a: "The FSA's best practice guidance recommends that food businesses provide written allergen information that customers can access independently, supported by a conversation with staff. It explicitly discourages the 'just ask staff' approach as falling below best practice. The guidance is voluntary but forms the basis of the spring 2026 evaluation that will determine whether mandatory legislation follows.",
  },
  {
    q: "What percentage of UK restaurants comply with written allergen disclosure?",
    a: "The FSA's Small and Micro FBO survey found that 47% of small food businesses still provide allergen information only verbally on request — the exact practice Owen's Law aims to eliminate. This figure suggests that voluntary compliance is poor across almost half of the sector, making mandatory legislation substantially more probable.",
  },
  {
    q: "What should my restaurant do to prepare for Owen's Law?",
    a: "Provide written allergen information at the point of ordering — on your menu, on a board, or via a digital QR code system like SafeEat. Build a verification audit trail showing regular allergen reviews with timestamps. Train all staff on allergen procedures so written information is supported by knowledgeable conversations. Businesses that adopt these practices now will be fully compliant when legislation arrives, with no scramble to implement changes under pressure.",
  },
  {
    q: "Can a QR code allergen menu satisfy Owen's Law requirements?",
    a: "Yes. A QR code linking to a digital allergen menu provides written allergen information at the point of ordering that customers can access independently — exactly what Owen's Law calls for. Digital menus also allow customers to filter dishes by their specific allergies, update instantly when recipes change, work offline after the first load, and generate timestamped audit trails for EHO inspections.",
  },
  {
    q: "What happens if Owen's Law becomes mandatory and I don't comply?",
    a: "If mandatory legislation follows, non-compliance would be a criminal offence under food information regulations, with potentially unlimited fines. Current prosecution cases for allergen failures have resulted in fines from £1,920 to £43,816 for independent restaurants, and custodial sentences have been imposed where allergen failures caused death.",
  },
  {
    q: "Does Owen's Law apply to takeaways and delivery services?",
    a: "Yes. Owen's Law would apply to all food businesses serving non-prepacked food, including takeaways and delivery services. For distance selling — online, phone, and delivery orders — allergen information must already be provided before purchase and again at delivery under existing regulations. Owen's Law would strengthen the requirement for written disclosure at every ordering touchpoint.",
  },
  {
    q: "Will Owen's Law require specific allergen symbols on menus?",
    a: "The FSA guidance does not mandate a specific format. Written allergen information can be presented as text on the menu, allergen symbols or icons, a separate allergen matrix, or a digital system via QR code. The requirement is that information is in writing and accessible without asking — the format is flexible, allowing businesses to choose the approach that best suits their operation.",
  },
  {
    q: "How does Owen's Law affect online food ordering platforms?",
    a: "Online ordering platforms — Deliveroo, Uber Eats, Just Eat — must already provide allergen information before purchase under distance selling regulations. Owen's Law would reinforce the requirement for written disclosure. The legal responsibility for allergen accuracy remains with the food business operator, not the platform, so you must ensure allergen information on third-party platforms matches your actual menu and is updated whenever your menu changes.",
  },
  {
    q: "Is there likely to be a grace period when Owen's Law becomes mandatory?",
    a: "When Natasha's Law was introduced, businesses were given approximately 12 months between Royal Assent and enforcement to prepare. A similar transition period would be expected for Owen's Law. However, since the voluntary guidance has been available since March 2025, the government may argue businesses have already had time to prepare, potentially shortening any grace period. Businesses that adopt written disclosure now eliminate this risk entirely.",
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: "Owen's Law: What UK Restaurants Need to Know in 2026",
      description:
        "Owen's Law calls for mandatory written allergen information in UK restaurants. The FSA is evaluating voluntary uptake in spring 2026. Complete guide for restaurants, cafés, and takeaways.",
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/owens-law',
      image: 'https://safeeat.co.uk/og-owens-law.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: "Owen's Law", item: 'https://safeeat.co.uk/guides/owens-law' },
      ],
    },
    {
      '@type': 'WebPage',
      name: "Owen's Law: What UK Restaurants Need to Know",
      url: 'https://safeeat.co.uk/guides/owens-law',
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
      name: 'UK Allergen Legislation Terminology',
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: "Owen's Law",
          description:
            'Campaign for mandatory written allergen information at the point of ordering in UK restaurants, named after Owen Carey who died from an undeclared allergen in 2017.',
        },
        {
          '@type': 'DefinedTerm',
          name: "Natasha's Law",
          description:
            'UK legislation (October 2021) requiring full ingredient labelling with allergens emphasised on prepacked for direct sale (PPDS) food.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Food Information Regulations 2014',
          description:
            'UK law requiring declaration of 14 regulated allergens in all food sold to consumers, implementing EU Regulation 1169/2011.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'FSA Best Practice Guidance (March 2025)',
          description:
            'Voluntary guidance recommending written allergen information supported by staff conversations, forming the basis of the spring 2026 evaluation.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: "How to Prepare Your Restaurant for Owen's Law",
      description: "Step-by-step guide to preparing your UK restaurant for Owen's Law mandatory allergen disclosure.",
      step: [
        {
          '@type': 'HowToStep',
          name: 'Provide written allergen information',
          text: 'Display allergen information in writing at the point of ordering — on menus, boards, or via QR code. Customers must be able to access this information independently without asking staff.',
        },
        {
          '@type': 'HowToStep',
          name: 'Map all dishes against the 14 allergens',
          text: 'Create a comprehensive allergen matrix covering every dish, drink, sauce, condiment, and side on your menu. Verify each declaration against actual supplier specifications.',
        },
        {
          '@type': 'HowToStep',
          name: 'Build a verification audit trail',
          text: 'Verify allergen information at least weekly with dated, timestamped records. This creates the due diligence evidence that EHO officers look for during inspections.',
        },
        {
          '@type': 'HowToStep',
          name: 'Train all staff',
          text: 'Ensure every team member — including temporary and seasonal workers — understands allergen procedures, can answer customer queries, and knows where to find allergen information.',
        },
        {
          '@type': 'HowToStep',
          name: 'Establish a review process',
          text: 'Update allergen information whenever recipes, suppliers, or ingredients change. Schedule regular verification reviews to ensure information remains current.',
        },
        {
          '@type': 'HowToStep',
          name: 'Consider customer retention',
          text: 'Use a digital allergen system like SafeEat that allows customers to save their allergen profile, building a database of loyal allergy-conscious diners.',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description:
        "Digital allergen menu management that meets Owen's Law requirements with QR code access, customer allergen filtering, and automated audit trails.",
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

export default function OwensLawGuidePage() {
  return (
    <>
      <Helmet>
        <title>Owen&apos;s Law UK Restaurants 2026: What You Need to Know | SafeEat</title>
        <meta
          name="description"
          content="Owen's Law calls for mandatory written allergen information in UK restaurants. The FSA is evaluating voluntary uptake in spring 2026. What it means for your restaurant and how to prepare now."
        />
        <link rel="canonical" href="https://safeeat.co.uk/guides/owens-law" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Owen's Law UK Restaurants 2026: What You Need to Know | SafeEat" />
        <meta
          property="og:description"
          content="Owen's Law calls for mandatory written allergen information in UK restaurants. How to prepare now before legislation arrives."
        />
        <meta property="og:image" content="https://safeeat.co.uk/og-owens-law.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/owens-law" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Owen's Law UK Restaurants 2026: What You Need to Know | SafeEat" />
        <meta
          name="twitter:description"
          content="Owen's Law and the FSA spring 2026 evaluation. What it means for UK restaurants and how to get ahead of mandatory allergen disclosure."
        />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-owens-law.jpg" />
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
            <li className="text-gray-900 font-medium">Owen&apos;s Law</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {/* Quick Answer Box */}
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              Owen&apos;s Law calls for mandatory written allergen disclosure in UK restaurants — without the customer needing
              to ask. The FSA published voluntary guidance in March 2025 and is evaluating compliance in spring 2026. If
              uptake is poor (47% of small food businesses still rely on verbal-only communication), mandatory legislation
              follows. Prepare now by providing written allergen info via menus, boards, or QR code systems like SafeEat.
            </p>
          </div>

          {/* Regulatory status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            FSA evaluation in progress — spring 2026
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Owen&apos;s Law: What UK Restaurants Need to Know in 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>14 min read</span>
          </div>

          {/* Introduction */}
          <p className="text-lg text-gray-700 mb-6">
            Owen&apos;s Law calls for a fundamental change in how UK restaurants communicate allergen information to customers.
            The core principle is straightforward: customers with food allergies should be able to identify safe dishes by
            reading written information at the point of ordering, rather than relying on a verbal conversation with staff that
            may be inaccurate, incomplete, rushed, or forgotten. The government published voluntary guidance in March 2025 and
            is evaluating whether businesses are adopting it right now, in spring 2026. If uptake is poor — and with 47% of
            small food businesses still relying on verbal-only allergen communication, it likely will be — mandatory legislation
            follows.
          </p>

          <p className="text-gray-700 mb-6">
            This guide explains the background behind Owen&apos;s Law, the regulatory timeline, what it means for independent
            restaurants, cafés, pubs, and takeaways, and how to position your business ahead of the regulation. For restaurant
            owners, the strategic move is to adopt written allergen disclosure now rather than waiting for it to become compulsory
            — the businesses that act first gain compliance, customer trust, and a competitive advantage simultaneously.
          </p>

          {/* Who Was Owen Carey */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Who Was Owen Carey?</h2>

          <p className="text-gray-700 mb-4">
            Owen Carey was 18 years old when he died on 22 April 2017 after eating buttermilk-marinated chicken at a Byron
            restaurant in London. Owen had a severe dairy allergy that he had managed carefully throughout his life. He informed
            staff about his allergy before ordering, specifically asking about allergens in his food. But the menu did not list
            buttermilk as an ingredient in the chicken dish, and the marinade was not disclosed verbally despite Owen&apos;s
            explicit request. Owen suffered a fatal anaphylactic reaction within minutes of eating.
          </p>

          <p className="text-gray-700 mb-4">
            The inquest into Owen&apos;s death revealed systemic failures in how allergen information was communicated at the
            restaurant. The menu did not declare allergens for any dish. Staff relied on a verbal communication chain — customer
            to server to kitchen — that proved fatally inadequate. There was no written allergen information available at the
            point of ordering that Owen could have used to independently identify the danger in his food. The coroner explicitly
            supported a change in the law, calling for restaurants to provide allergen information in writing on the main menu.
          </p>

          <p className="text-gray-700 mb-6">
            Owen&apos;s parents, Paul and Moira Carey, have since campaigned tirelessly for a change in UK law. Their campaign,
            supported by allergy charities and food safety organisations, became known as Owen&apos;s Law. It seeks to ensure
            that no other family experiences what theirs did — a preventable death caused by the absence of written allergen
            information that should have been available before the food was ordered.
          </p>

          {/* What Owen's Law Proposes */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What Owen&apos;s Law Proposes</h2>

          <p className="text-gray-700 mb-4">
            Owen&apos;s Law would require all UK food businesses serving non-prepacked food — restaurants, cafés, pubs,
            takeaways, canteens, and caterers — to provide written allergen information clearly showing which of the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>{' '}
            are present in each dish. This could be on the menu itself, on a separate allergen board, through a digital display,
            or via a QR code linking to allergen information. The format is flexible — the requirement is that it exists in
            writing and is accessible without asking.
          </p>

          <p className="text-gray-700 mb-4">
            The key distinction from current law is the word &quot;mandatory.&quot; Under the Food Information Regulations 2014,
            businesses can choose to provide allergen information verbally with a written sign directing customers to ask. This
            means a restaurant can legally meet its obligations by putting up a sign saying &quot;Please ask staff about
            allergens&quot; and relying on verbal communication from that point. Owen&apos;s Law would remove this option —
            written information would be compulsory, not a choice between written and verbal. Staff conversations would
            supplement written information, not replace it.
          </p>

          <p className="text-gray-700 mb-6">
            This is not a radical change in practice for well-run restaurants. Many food businesses already provide written
            allergen information because they recognise it as safer and more reliable than verbal communication. What Owen&apos;s
            Law would change is the baseline — ensuring that every food business, not just the conscientious ones, provides
            written allergen disclosure. The law would create the floor that voluntary guidance has failed to establish.
          </p>

          {/* Owen's Law vs Natasha's Law */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Owen&apos;s Law vs Natasha&apos;s Law: Understanding the Difference</h2>

          <p className="text-gray-700 mb-4">
            Owen&apos;s Law and{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha&apos;s Law
            </Link>{' '}
            are frequently confused because both address allergen information and both are named after young people who died
            from allergic reactions. However, they address different categories of food and different gaps in the law.
          </p>

          <p className="text-gray-700 mb-4">
            Natasha&apos;s Law, which came into force on 1 October 2021, requires full ingredient labelling with allergens
            emphasised on prepacked for direct sale (PPDS) food — items like sandwiches made on-site and wrapped before the
            customer selects them. It was prompted by the death of Natasha Ednan-Laperouse, who died in 2016 after eating a
            Pret a Manger baguette containing undeclared sesame seeds.
          </p>

          <p className="text-gray-700 mb-4">
            Owen&apos;s Law addresses non-prepacked food — meals cooked to order in restaurants, loose food from a deli counter,
            takeaway food prepared after ordering. This is the category where verbal-only communication is still permitted under
            current law, and where Owen Carey&apos;s fatal incident occurred. Natasha&apos;s Law closed the gap for packaged
            food; Owen&apos;s Law would close the gap for everything else.
          </p>

          <p className="text-gray-700 mb-6">
            Together, the two laws would create a comprehensive framework where every type of food sold in the UK — prepacked,
            PPDS, and non-prepacked — requires mandatory written allergen information. The gap that currently exists is for
            non-prepacked food, and that is precisely the gap Owen&apos;s Law aims to close. For a detailed guide on Natasha&apos;s
            Law requirements and how they differ from what Owen&apos;s Law proposes, see our{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha&apos;s Law compliance guide
            </Link>.
          </p>

          {/* Regulatory Timeline */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Regulatory Timeline: Where Are We Now?</h2>

          <p className="text-gray-700 mb-4">
            The path from campaign to legislation has been deliberate and phased. The FSA Board endorsed the principle of
            mandatory written allergen disclosure in December 2023 after years of campaigning and evidence gathering. Rather
            than legislating immediately, the government adopted a two-step approach: publish voluntary guidance first, evaluate
            whether businesses adopt it voluntarily, then decide whether mandatory legislation is needed based on the evidence.
          </p>

          <p className="text-gray-700 mb-4">
            The voluntary best practice guidance was published in March 2025. It recommends that food businesses provide written
            allergen information that customers can access independently, supported by a conversation with staff. The guidance
            explicitly discourages the &quot;just ask staff&quot; approach as falling below best practice. The government committed
            to evaluating uptake one year after publication — meaning the evaluation window opened in March 2026 and is underway
            now, in spring 2026.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Key dates</h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <span className="text-sm font-semibold text-gray-500 w-28 flex-shrink-0">April 2017</span>
                <p className="text-sm text-gray-700">Owen Carey dies after eating undeclared buttermilk at a Byron restaurant. His family begins campaigning for written allergen disclosure.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-semibold text-gray-500 w-28 flex-shrink-0">October 2021</span>
                <p className="text-sm text-gray-700">Natasha&apos;s Law comes into force for PPDS food. The gap for non-prepacked food remains.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-semibold text-gray-500 w-28 flex-shrink-0">December 2023</span>
                <p className="text-sm text-gray-700">FSA Board endorses the principle of mandatory written allergen disclosure for non-prepacked food.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-semibold text-gray-500 w-28 flex-shrink-0">March 2025</span>
                <p className="text-sm text-gray-700">Government publishes voluntary best-practice guidance recommending written allergen information supported by staff conversations.</p>
              </div>
              <div className="flex gap-4 bg-amber-50 border border-amber-200 rounded-lg p-3 -mx-3">
                <span className="text-sm font-bold text-amber-700 w-28 flex-shrink-0">Spring 2026</span>
                <p className="text-sm text-gray-900 font-medium">Government evaluates uptake of voluntary guidance. Results will inform whether mandatory legislation follows.</p>
              </div>
              <div className="flex gap-4">
                <span className="text-sm font-semibold text-gray-500 w-28 flex-shrink-0">2027?</span>
                <p className="text-sm text-gray-700">If voluntary uptake is poor, mandatory legislation could follow — making written allergen disclosure a legal requirement for all UK food businesses.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            The critical moment is now. The evaluation of the March 2025 guidance is happening in spring 2026. The outcome will
            determine whether Owen&apos;s Law becomes enforceable legislation. Businesses that have already adopted written
            allergen disclosure are positioned to meet whatever comes next. Those that haven&apos;t will face a scramble to
            comply under pressure, with tight implementation deadlines and the risk of inspection failures during the transition.
          </p>

          {/* Why Voluntary Compliance Will Fall Short */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why Voluntary Compliance Is Likely to Fall Short</h2>

          <p className="text-gray-700 mb-4">
            The evidence strongly suggests that voluntary adoption will not meet the government&apos;s expectations. The FSA&apos;s
            own Small and Micro FBO survey found that 47% of small food businesses still provide allergen information only
            verbally on request — the exact practice Owen&apos;s Law aims to eliminate. If nearly half of small businesses have
            not moved to written disclosure even with published guidance and increasing public awareness, the spring 2026
            evaluation is unlikely to demonstrate sufficient uptake.
          </p>

          <p className="text-gray-700 mb-4">
            There are structural reasons for poor voluntary adoption. Many small restaurant owners perceive allergen management
            as a compliance burden rather than a business opportunity. Paper-based{' '}
            <Link to="/guides/allergen-menu-template" className="text-emerald-700 underline hover:text-emerald-900">
              allergen matrices
            </Link>{' '}
            are time-consuming to create and difficult to keep updated when recipes change. Verbal communication feels easier in
            the moment, even though it is statistically more error-prone and has proven fatal in multiple documented cases.
            And without enforcement pressure, there is limited incentive to change established practices that seem to be
            &quot;working&quot; — until they catastrophically fail.
          </p>

          <p className="text-gray-700 mb-6">
            The lesson from Natasha&apos;s Law is instructive. Before Natasha&apos;s Law made PPDS labelling mandatory in 2021,
            many businesses were already aware they should label PPDS food — the guidance existed, the awareness was there. But
            voluntary compliance was inconsistent and patchy. Legislation created the clarity, universality, and enforcement
            mechanism that voluntary guidance could not. Owen&apos;s Law appears to be following the same trajectory, and the
            spring 2026 evaluation is the data point that will determine the speed of that trajectory.
          </p>

          {/* The Cost of Getting It Wrong */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Cost of Getting It Wrong</h2>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-sm font-semibold text-red-800 mb-2">Recent UK allergen prosecution fines</p>
            <p className="text-gray-800 mb-3">
              Even before Owen&apos;s Law becomes mandatory, the consequences of poor allergen management are severe. Recent
              prosecutions of independent UK food businesses include fines of £43,816 (Javitri Restaurant, Uxbridge), £27,803
              (The Rusty Gun Pub, Hitchin), and £1,920 (Small&apos;s Kitchen, Derby). Under the Food Safety Act 1990, fines
              are potentially unlimited. In cases where allergen failures caused death, custodial sentences of up to six years
              have been imposed.
            </p>
            <p className="text-sm text-gray-700">
              Hospital admissions for anaphylaxis reached 4,323 in 2023/24 — a 154% increase over 20 years. Read our{' '}
              <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
                allergen fines guide
              </Link>{' '}
              for detailed prosecution cases.
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            The financial penalties are significant, but the non-financial consequences are often worse. A single allergen
            incident can result in loss of your Food Hygiene Rating — publicly visible on the FSA website and increasingly
            checked by customers before choosing where to eat. Reputational damage from a prosecution or serious incident
            takes years to recover from. The psychological impact on business owners involved in an incident that harmed a
            customer is devastating and lasting.
          </p>

          <p className="text-gray-700 mb-6">
            The risk is not theoretical. Allergen incidents continue to occur across the UK food industry, and enforcement is
            intensifying. EHO officers receive specific training on allergen compliance assessment, and{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              allergen failures during inspections
            </Link>{' '}
            are treated with the same seriousness as hygiene failures. The direction of regulation is unambiguous: the standards
            are rising, enforcement is tightening, and the grace period for businesses that rely on verbal-only communication
            is closing.
          </p>

          {/* What Should Your Restaurant Do Now */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What Should Your Restaurant Do Now?</h2>

          <p className="text-gray-700 mb-4">
            The businesses that act now — before legislation makes it mandatory — gain three advantages. First, they are
            immediately safer for their customers, reducing the risk of an allergen incident that could result in prosecution,
            fines, and reputational damage. Second, they demonstrate best practice to EHO inspectors, who are increasingly
            checking for written allergen information during routine inspections even though it is not yet legally required.
            Third, they avoid the scramble to comply when legislation arrives, which typically comes with tight implementation
            deadlines and the pressure of last-minute system changes.
          </p>

          <p className="text-gray-700 mb-4">
            Practically, preparing for Owen&apos;s Law means providing written allergen information that customers can access
            independently at the point of ordering. This could take several forms: allergen symbols or abbreviations next to
            each dish on your printed menu, a separate allergen information board displayed in the dining area, an allergen
            matrix available at the counter, or a digital allergen menu accessible via QR code. The QR code approach is
            particularly effective because it allows customers to filter your menu by their specific allergies, can be updated
            instantly when recipes change, works offline for venues with poor mobile signal, and generates a digital audit trail
            that serves as evidence for{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>.
          </p>

          <p className="text-gray-700 mb-4">
            You should also establish a regular verification process. Review your allergen information at least weekly, especially
            after any recipe or supplier changes. Date-stamp each verification to build the audit trail that proves ongoing
            diligence — not just a one-off compliance exercise. This is exactly what EHO inspectors want to see, and it protects
            you in the event of an incident by demonstrating that your allergen management was systematic and current.
          </p>

          <p className="text-gray-700 mb-6">
            Finally, train every member of staff on your allergen procedures — including temporary, agency, and seasonal workers.
            Written information should be supported by, not replaced by, staff knowledge. The FSA&apos;s best practice guidance
            explicitly recommends &quot;written allergen information, supported by a conversation&quot; — both elements working
            together to protect customers. Staff who cannot answer basic allergen questions undermine your compliance position
            regardless of how good your written information is.
          </p>

          {/* The Business Opportunity */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Business Opportunity in Allergen Compliance</h2>

          <p className="text-gray-700 mb-4">
            Owen&apos;s Law is typically framed as a regulatory burden, but for forward-thinking restaurants it represents a
            significant competitive opportunity. There are 2.4 million adults in the UK with a clinically confirmed food
            allergy — a number that has doubled in the last decade and continues to rise. Research shows that 60% of young
            allergic diners aged 16-25 avoid eating out entirely because they do not trust the allergen information provided.
            42% of all food-allergic adults have stopped dining out or ordering takeaway. These are customers who want to spend
            money in restaurants but cannot find venues they trust.
          </p>

          <p className="text-gray-700 mb-4">
            The economic data is compelling. 86% of food-allergic consumers say their loyalty is directly influenced by how
            well a restaurant accommodates their allergy. These customers are measurably less price-sensitive than average
            diners — only 39% prioritise price compared to 65% of non-allergic diners. They bring groups: 44% of non-allergic
            consumers also consider allergy accommodations when choosing where to eat with friends or family, meaning one
            allergic person in a group of four makes your allergy policy relevant to all four covers. Research suggests
            restaurants can see a 10-15% revenue increase by becoming trusted allergy-safe destinations.
          </p>

          <p className="text-gray-700 mb-6">
            The venue that provides clear, written allergen information — and goes further by letting customers save their allergy
            profile for future visits — turns compliance into retention. SafeEat is the only UK allergen tool that connects
            allergen data (compliance) with customer profiles (retention) in a single platform. When a customer saves their
            allergen profile against your venue, you gain a loyal diner who has actively chosen your restaurant because they
            trust your allergen management. With marketing opt-in, you can notify these customers when you add new allergen-safe
            dishes. No paper template and no other digital system offers this.
          </p>

          {/* Impact on Different Business Types */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Impact on Different Business Types</h2>

          <p className="text-gray-700 mb-4">
            Owen&apos;s Law will affect different types of food businesses in different ways. Sit-down restaurants with printed
            menus face the simplest transition — adding allergen information to existing menus or providing a supplementary
            allergen matrix. Restaurants with frequently changing menus (seasonal restaurants, specials-heavy establishments)
            face a greater challenge because paper-based allergen information must be updated every time the menu changes, making
            digital systems significantly more practical.
          </p>

          <p className="text-gray-700 mb-4">
            Takeaways and delivery businesses face specific requirements. For distance selling — online, phone, and delivery
            orders — allergen information must already be provided before purchase under existing regulations. Owen&apos;s Law
            would strengthen these requirements by mandating written disclosure at every ordering touchpoint. If you sell through
            third-party platforms like Deliveroo, Uber Eats, or Just Eat, you must ensure allergen information is accurate on
            those platforms as well as in your own venue. The legal responsibility remains with you as the food business operator,
            not the platform.
          </p>

          <p className="text-gray-700 mb-4">
            Pubs and bars serving food need to cover allergen information for their food menu, but also for any allergens in
            drinks — sulphites in wine, cereals containing gluten in beer, milk in cocktails, nuts in liqueurs. Many pub
            operators overlook drink allergens because they are less obvious than food allergens, but they carry the same legal
            obligations and the same prosecution risks.
          </p>

          <p className="text-gray-700 mb-6">
            Cafés that serve PPDS food (pre-made sandwiches, wraps, salads) already have labelling obligations under{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha&apos;s Law
            </Link>
            . Owen&apos;s Law would extend the written disclosure requirement to everything else they serve — hot food, drinks,
            anything prepared to order. Cafés that already comply with Natasha&apos;s Law are partway there; they simply need
            to extend written allergen information to their non-PPDS offerings as well.
          </p>

          {/* How SafeEat Prepares You */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How SafeEat Positions You Ahead of Owen&apos;s Law</h2>

          <p className="text-gray-700 mb-4">
            SafeEat is designed to meet both the current voluntary FSA guidance and any future mandatory requirements under
            Owen&apos;s Law. Customers scan a QR code at your table or counter and access your full menu with allergen
            information — exactly the &quot;written information accessible independently&quot; that Owen&apos;s Law calls for.
            They can filter dishes by their specific allergies, seeing only the items they can safely eat. No paper menus to
            print, no version confusion, no risk of outdated information.
          </p>

          <p className="text-gray-700 mb-4">
            The verification system generates the audit trail that EHO officers increasingly expect. Every time you confirm your
            allergen information through the dashboard, a timestamped entry is created. Automated email reminders ensure
            verification does not lapse during busy periods. This creates irrefutable evidence of ongoing due diligence — the
            kind of evidence that protects your business during inspections and in the event of an incident.
          </p>

          <p className="text-gray-700 mb-6">
            And uniquely, SafeEat turns compliance into customer retention. When diners save their allergen profile, you build
            a database of allergy-conscious customers who chose your restaurant because they trust your allergen management.
            With marketing opt-ins, you can reach these customers when you add new allergen-safe dishes. No other UK allergen
            tool combines compliance, audit trails, and customer retention in a single platform at a price independent
            restaurants can afford — £29.99 per month, self-service setup, menu live in 15 minutes.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Get ahead of Owen&apos;s Law today</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat gives your customers written allergen information via QR code — exactly what Owen&apos;s Law calls for.
              Add your menu in 15 minutes, verify weekly, and build the audit trail that protects your business. The only UK
              allergen tool that also builds a database of your allergy customers.
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
                <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
                  EHO Allergen Inspection Guide for UK Restaurants
                </Link>
              </li>
              <li>
                <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
                  Natasha&apos;s Law: Complete Compliance Guide for Restaurants
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
