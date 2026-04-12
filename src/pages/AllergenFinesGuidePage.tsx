import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What is the maximum fine for allergen offences in the UK?',
    a: 'Under the Food Safety Act 1990, fines for allergen offences are potentially unlimited for cases tried in the Crown Court. There is no statutory cap. Magistrates\' Courts can impose fines up to £20,000 per offence for certain food safety breaches, but serious allergen cases are typically referred to the Crown Court where sentencing is unrestricted. Recent prosecutions have resulted in fines ranging from £1,920 to £43,816 for independent food businesses.',
  },
  {
    q: 'Can a restaurant owner go to prison for an allergen offence?',
    a: 'Yes. Custodial sentences have been imposed in cases where allergen failures caused death. The most significant case is Mohammed Zaman, owner of the Indian Garden restaurant in Easingwold, North Yorkshire, who was sentenced to six years in prison after a customer died from an allergic reaction to peanuts in a takeaway meal. The dish contained peanut powder despite being ordered as nut-free, and the restaurant had a pattern of substituting cheaper ingredients containing allergens without updating allergen information.',
  },
  {
    q: 'What laws cover allergen offences in UK restaurants?',
    a: 'Allergen prosecutions in the UK are brought under several pieces of legislation: the Food Information Regulations 2014 (failure to provide accurate allergen information), the Food Safety Act 1990 (selling food not of the nature, substance, or quality demanded), the Food Hygiene (England) Regulations 2013 (failure to implement adequate food safety management), and in fatal cases, the Health and Safety at Work Act 1974 or gross negligence manslaughter charges. The specific charges depend on the nature and severity of the offence.',
  },
  {
    q: 'How do EHO officers decide whether to prosecute for allergen failures?',
    a: 'Environmental Health Officers follow a graduated enforcement approach. Minor first-time failures typically receive verbal advice or written warnings. Repeated failures, systemic non-compliance, or refusal to correct identified problems can lead to improvement notices. Prosecution is pursued when the failure poses a significant risk to public health, when previous warnings have been ignored, when the failure has caused or could cause serious harm, or when the food business operator has demonstrated negligence or disregard for food safety requirements.',
  },
  {
    q: 'Are allergen fines increasing in the UK?',
    a: 'Yes. Both the frequency and severity of allergen prosecutions have increased since the introduction of Natasha\'s Law in 2021 and the heightened regulatory focus on allergen compliance. Sentencing guidelines emphasise the seriousness of food safety offences, and courts are imposing larger fines to reflect the potential for fatal consequences. The average fine for allergen-related food safety offences has risen substantially over the past five years.',
  },
  {
    q: 'What happens to my Food Hygiene Rating if I fail on allergens?',
    a: 'Allergen management failures can directly reduce your Food Hygiene Rating. Allergen compliance is assessed under the "confidence in management" scoring criteria, which is one of the three components determining your overall rating. A business with excellent physical hygiene but poor allergen management can still receive a low rating. The rating is publicly visible on the FSA website and must be displayed at premises in Wales and Northern Ireland.',
  },
  {
    q: 'Can I be prosecuted for allergen failures even if no customer was harmed?',
    a: 'Yes. Prosecution does not require a customer to have suffered an allergic reaction. Providing inaccurate allergen information is a criminal offence under the Food Information Regulations 2014 regardless of whether anyone was harmed. EHO officers can identify allergen compliance failures during routine inspections and pursue enforcement action based on the risk to public health, not just actual harm.',
  },
  {
    q: 'What evidence do I need to defend against an allergen prosecution?',
    a: 'The strongest defence against allergen prosecution is demonstrating a due diligence system: accurate and current allergen documentation covering every menu item, dated verification records showing regular reviews, documented staff training with dates and attendee signatures, supplier ingredient specifications on file, cross-contamination risk assessments and procedures, and evidence of corrective actions when issues were identified. A robust audit trail significantly strengthens your legal position.',
  },
  {
    q: 'Are verbal allergen communication failures prosecuted?',
    a: 'Yes. Multiple prosecution cases have involved failures in verbal allergen communication — staff giving incorrect allergen information, failing to pass allergen requests from customer to kitchen, or providing generic reassurance without checking specific ingredients. This is one of the key reasons the FSA and Owen\'s Law campaign advocate for written allergen disclosure: verbal communication is inherently more error-prone and harder to verify or audit than written systems.',
  },
  {
    q: 'What insurance implications do allergen prosecutions have?',
    a: 'Allergen prosecutions can affect your business insurance significantly. Public liability insurance may not cover criminal prosecution costs or fines. Some insurers increase premiums or exclude allergen-related claims after a prosecution. In severe cases, insurers may refuse to renew cover. Additionally, if an allergen incident results in a civil lawsuit from an injured customer, the damages can be substantial and separate from any criminal fine.',
  },
  {
    q: 'How much does an allergen incident cost beyond the fine?',
    a: 'The fine is typically the smallest financial impact of an allergen prosecution. Additional costs include legal representation (criminal defence solicitors and barristers), business closure during investigation, loss of revenue during and after prosecution, reduced Food Hygiene Rating leading to customer loss, reputational damage requiring marketing investment to recover, increased insurance premiums, potential civil compensation claims from affected customers, and staff recruitment costs if team members leave after an incident.',
  },
  {
    q: 'What should I do immediately if a customer has an allergic reaction at my restaurant?',
    a: 'Call 999 immediately if the customer shows signs of anaphylaxis (difficulty breathing, swelling, rapid deterioration). Do not delay. While waiting for emergency services, help the customer use their adrenaline auto-injector (EpiPen) if they have one. After the immediate emergency, preserve all evidence: the food served, the allergen records for that dish, and details of staff involved. Report the incident to your local Environmental Health team. Do not alter any records. Contact your insurer. Document everything with timestamps.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Allergen Fines UK: Recent Prosecutions and Penalties for Restaurants 2026',
      description:
        'Comprehensive guide to UK allergen prosecution fines for restaurants. Recent cases, penalty ranges, custodial sentences, and how to protect your business with proper allergen compliance.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/allergen-fines-uk',
      image: 'https://safeeat.co.uk/og-allergen-fines.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: 'Allergen Fines UK', item: 'https://safeeat.co.uk/guides/allergen-fines-uk' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'Allergen Fines UK: Recent Prosecutions and Penalties',
      url: 'https://safeeat.co.uk/guides/allergen-fines-uk',
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
      name: 'UK Allergen Enforcement Terminology',
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Improvement Notice',
          description: 'A formal enforcement notice requiring a food business to take specific corrective action within a set timeframe.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Prohibition Order',
          description: 'A court order prohibiting a food business from operating, or restricting specific processes, until compliance is achieved.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Due Diligence Defence',
          description: 'A legal defence demonstrating that all reasonable precautions were taken and all due diligence exercised to avoid committing an offence.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Anaphylaxis',
          description: 'A severe, potentially life-threatening allergic reaction that can occur within minutes of exposure to an allergen.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Protect Your Restaurant from Allergen Prosecution',
      description: 'Steps to minimise your risk of allergen prosecution and build a due diligence defence.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Create comprehensive allergen documentation',
          text: 'Document allergens for every dish on your menu against all 14 regulated allergens. Verify each declaration against supplier ingredient specifications.',
        },
        {
          '@type': 'HowToStep',
          name: 'Build a verification audit trail',
          text: 'Review and verify allergen information regularly with timestamped records. This demonstrates ongoing due diligence, not just one-off compliance.',
        },
        {
          '@type': 'HowToStep',
          name: 'Train and document staff training',
          text: 'Train all staff on allergen procedures with dated training records. Include front-of-house, kitchen, and temporary staff.',
        },
        {
          '@type': 'HowToStep',
          name: 'Implement cross-contamination controls',
          text: 'Document procedures for preventing allergen cross-contact during storage, preparation, and cooking. Include cleaning protocols.',
        },
        {
          '@type': 'HowToStep',
          name: 'Provide written allergen information',
          text: 'Make allergen information available in writing — on menus, boards, or via QR code — rather than relying on verbal communication alone.',
        },
        {
          '@type': 'HowToStep',
          name: 'Use a digital allergen management system',
          text: 'Implement a system like SafeEat that generates automatic audit trails, sends verification reminders, and provides customer-facing allergen filtering via QR code.',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen management with automated audit trails that strengthen due diligence defence against allergen prosecution.',
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

export default function AllergenFinesGuidePage() {
  return (
    <>
      <Helmet>
        <title>Allergen Fines UK 2026: Recent Prosecutions and Penalties for Restaurants | SafeEat</title>
        <meta
          name="description"
          content="UK allergen prosecution fines for restaurants in 2026. Recent cases with fines from £1,920 to £43,816, custodial sentences, and how to protect your business with proper allergen compliance and audit trails."
        />
        <link rel="canonical" href="https://safeeat.co.uk/guides/allergen-fines-uk" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Allergen Fines UK 2026: Recent Prosecutions and Penalties | SafeEat" />
        <meta
          property="og:description"
          content="UK allergen prosecution fines for restaurants. Recent cases, penalty ranges, and how to protect your business."
        />
        <meta property="og:image" content="https://safeeat.co.uk/og-allergen-fines.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/allergen-fines-uk" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergen Fines UK 2026 | SafeEat" />
        <meta
          name="twitter:description"
          content="Recent UK allergen prosecution fines and how to protect your restaurant from prosecution."
        />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-allergen-fines.jpg" />
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
            <li className="text-gray-900 font-medium">Allergen Fines UK</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {/* Quick Answer Box */}
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              UK allergen prosecution fines are potentially unlimited for cases tried in the Crown Court. Recent fines for
              independent restaurants have ranged from £1,920 to £43,816. Custodial sentences of up to six years have been
              imposed where allergen failures caused death. The strongest protection is a documented allergen management
              system with timestamped verification records that demonstrate ongoing due diligence.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allergen Fines UK: Recent Prosecutions and Penalties for Restaurants
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
            Allergen compliance is not optional. It is a criminal law obligation, and UK courts are imposing increasingly severe
            penalties on food businesses that fail to provide accurate allergen information. This guide documents recent
            prosecution cases, explains the penalty framework, and outlines how to protect your business from the financial,
            legal, and reputational consequences of allergen failure. The cases described here are not edge cases or extreme
            examples — they represent the reality of enforcement that any food business could face if allergen management is
            inadequate.
          </p>

          <p className="text-gray-700 mb-6">
            The regulatory direction is clear: enforcement is intensifying. The introduction of{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha&apos;s Law
            </Link>{' '}
            in 2021 elevated allergen compliance as an enforcement priority. The FSA&apos;s voluntary guidance published in
            March 2025 — and the{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>{' '}
            evaluation underway in spring 2026 — signal that further mandatory requirements are coming. EHO officers receive
            specific training on allergen compliance assessment. The grace period for businesses that have not taken allergen
            management seriously is closing rapidly.
          </p>

          {/* Recent Prosecution Cases */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Recent UK Allergen Prosecution Cases</h2>

          <p className="text-gray-700 mb-4">
            The following cases illustrate the range of penalties imposed for allergen offences in independent UK food
            businesses. They demonstrate that prosecution is not reserved for large chains — small restaurants, pubs, and
            takeaways face the same enforcement standards and penalties.
          </p>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Indian Garden, Easingwold — 6 years imprisonment</h3>
            <p className="text-gray-700 mb-2">
              Mohammed Zaman, owner of the Indian Garden restaurant in Easingwold, North Yorkshire, was sentenced to six years
              in prison after customer Paul Wilson died from an allergic reaction to peanuts in a takeaway meal in January 2014.
              The dish was ordered as nut-free, but contained peanut powder. Investigation revealed that Zaman had routinely
              substituted cheaper ingredients containing allergens — including groundnut powder in place of almond powder — to
              reduce costs. He ignored warnings from his own staff and from Environmental Health Officers about allergen risks.
              Zaman was convicted of manslaughter by gross negligence.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Javitri Restaurant, Uxbridge — £43,816 fine</h3>
            <p className="text-gray-700 mb-2">
              The highest recent fine imposed on an independent restaurant for allergen offences. The restaurant was prosecuted
              after an investigation revealed systematic failures in allergen management — including inadequate allergen
              information, poor staff training, and failure to implement corrective actions after previous warnings. The fine
              reflected the court&apos;s assessment of the seriousness of the offence and the ongoing risk to customers.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">The Rusty Gun Pub, Hitchin — £27,803 fine</h3>
            <p className="text-gray-700 mb-2">
              A pub fined for allergen management failures that put customers at risk. The case demonstrated that pubs serving
              food are held to the same allergen compliance standards as restaurants. The prosecution highlighted failures in
              allergen documentation, staff knowledge, and the absence of systematic allergen management procedures.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Small&apos;s Kitchen, Derby — £1,920 fine</h3>
            <p className="text-gray-700 mb-2">
              A smaller fine reflecting a less severe offence, but still a criminal prosecution resulting in a criminal record
              for the operator. The case demonstrates that even lower-severity allergen failures result in prosecution, legal
              costs, and the lasting consequences of a criminal conviction for a food safety offence.
            </p>
          </div>

          <p className="text-gray-700 mb-6">
            These cases share common patterns: inadequate or absent allergen documentation, reliance on verbal communication
            rather than written records, failure to act on previous warnings from Environmental Health, and gaps between what
            allergen information said and what was actually in the food. In every case, a systematic allergen management system
            with documented verification would have either prevented the incident or provided a significantly stronger
            defence.
          </p>

          {/* The Penalty Framework */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Penalty Framework</h2>

          <p className="text-gray-700 mb-4">
            Allergen offences in the UK are prosecuted under several pieces of legislation, each carrying its own penalty
            framework. The specific charges and penalties depend on the nature and severity of the offence.
          </p>

          <p className="text-gray-700 mb-4">
            The Food Information Regulations 2014 cover failure to provide accurate allergen information. Offences tried in
            the Magistrates&apos; Court carry fines up to £5,000 per offence. Offences referred to the Crown Court carry
            potentially unlimited fines. Multiple charges can be brought for a single incident — for example, separate charges
            for each menu item with inaccurate allergen information.
          </p>

          <p className="text-gray-700 mb-4">
            The Food Safety Act 1990 covers selling food not of the nature, substance, or quality demanded — which applies when
            a customer orders a dish free from a specific allergen and receives food containing that allergen. Penalties include
            unlimited fines and up to two years&apos; imprisonment. This legislation is used when allergen failures result in
            food being materially different from what the customer ordered or expected.
          </p>

          <p className="text-gray-700 mb-4">
            The Food Hygiene (England) Regulations 2013 (with equivalent regulations in Scotland, Wales, and Northern Ireland)
            cover failure to implement adequate food safety management, which includes allergen management procedures. Penalties
            include fines and improvement notices. Failure to comply with an improvement notice is itself a criminal offence.
          </p>

          <p className="text-gray-700 mb-6">
            In fatal cases, charges can escalate to gross negligence manslaughter — as in the Indian Garden case — which carries
            a maximum sentence of life imprisonment. The Health and Safety at Work Act 1974 can also be applied, with penalties
            including unlimited fines and up to two years&apos; imprisonment. Fatal allergen cases are investigated by police as
            well as Environmental Health, and the Crown Prosecution Service decides whether criminal charges are brought.
          </p>

          {/* Beyond the Fine */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Beyond the Fine: The True Cost of Allergen Prosecution</h2>

          <p className="text-gray-700 mb-4">
            The headline fine is typically the smallest financial impact of an allergen prosecution. The true cost includes
            several elements that are often more damaging than the fine itself.
          </p>

          <p className="text-gray-700 mb-4">
            Legal costs are substantial. Criminal defence solicitors and barristers for a food safety prosecution typically
            cost £5,000-£30,000 depending on complexity, and significantly more if the case goes to trial in the Crown Court.
            These costs are incurred regardless of the outcome — even a successful defence generates legal fees.
          </p>

          <p className="text-gray-700 mb-4">
            Business disruption during investigation can be severe. In serious cases, premises may be subject to a Hygiene
            Emergency Prohibition Order — effectively closing the business until compliance is demonstrated. Even without
            formal closure, the investigation process consumes management time and attention, staff morale drops, and customer
            footfall typically declines once a prosecution becomes public knowledge.
          </p>

          <p className="text-gray-700 mb-4">
            Reputational damage is the longest-lasting consequence. Allergen prosecutions are reported in local media and
            increasingly shared on social media. A Google search for your business name may show prosecution reports for years
            after the event. Rebuilding customer trust after an allergen incident — particularly one involving customer harm —
            requires sustained effort and investment. Some businesses never fully recover their pre-incident reputation.
          </p>

          <p className="text-gray-700 mb-4">
            Your Food Hygiene Rating drops following an allergen compliance failure. The rating is publicly visible on the
            FSA website and at your premises. Research consistently shows that customers check hygiene ratings before choosing
            where to eat, and a low rating directly reduces footfall. Improving a rating after a drop requires demonstrating
            sustained compliance over subsequent inspections — a process that typically takes 6-18 months.
          </p>

          <p className="text-gray-700 mb-6">
            Insurance consequences compound the financial impact. Insurers may increase premiums, add allergen exclusions to
            your policy, or refuse to renew cover after a prosecution. If a customer pursues a civil compensation claim for
            injury caused by an allergen incident, the damages can be substantial and are separate from any criminal fine.
            Some businesses face both criminal prosecution and civil litigation simultaneously.
          </p>

          {/* Building Your Defence */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Building Your Due Diligence Defence</h2>

          <p className="text-gray-700 mb-4">
            The Food Safety Act 1990 provides a &quot;due diligence&quot; defence — if you can demonstrate that you took all
            reasonable precautions and exercised all due diligence to avoid committing an offence, this can serve as a complete
            defence against prosecution. The key word is &quot;demonstrate&quot; — you must be able to show evidence, not just
            claim that you had procedures in place.
          </p>

          <p className="text-gray-700 mb-4">
            A credible due diligence defence requires documented evidence across several areas. First, comprehensive allergen
            documentation covering every item on your menu, verified against supplier ingredient specifications. Second, a
            verification audit trail with dated entries showing that allergen information was regularly reviewed and confirmed
            as accurate — not created once and forgotten. Third, staff training records with dates, attendee names, and evidence
            of competence assessment. Fourth, cross-contamination risk assessments and documented control procedures. Fifth,
            evidence of corrective actions taken when issues were identified — showing that problems were fixed, not ignored.
          </p>

          <p className="text-gray-700 mb-4">
            The audit trail is the most critical element. A stack of allergen documentation created after an incident is
            worthless — it demonstrates reaction, not prevention. What courts and{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO officers
            </Link>{' '}
            look for is evidence of ongoing, systematic management: regular dated verification entries, documented responses to
            supplier changes, and a pattern of active allergen management that predates any incident.
          </p>

          <p className="text-gray-700 mb-6">
            Digital audit trails are significantly stronger than paper records. Timestamped digital entries are harder to
            fabricate than handwritten logs. Automated systems that generate verification records each time allergen information
            is reviewed provide consistent evidence of ongoing management. And digital records are easier to present to
            investigators, lawyers, and courts than boxes of paper files.
          </p>

          {/* The Rising Tide of Enforcement */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Rising Tide of Enforcement</h2>

          <p className="text-gray-700 mb-4">
            Several factors are driving increased allergen enforcement in the UK. The deaths of Natasha Ednan-Laperouse and
            Owen Carey — and the legislative responses they triggered — elevated allergen compliance as a national priority.
            EHO officers now receive specific training on allergen assessment. The FSA has made allergen compliance a strategic
            priority in its regulatory framework.
          </p>

          <p className="text-gray-700 mb-4">
            Hospital admissions for anaphylaxis reached 4,323 in 2023/24, representing a 154% increase over 20 years. This
            trend demonstrates that food allergy prevalence is rising, which means more customers are at risk and more incidents
            are statistically likely. Courts are responding with heavier penalties to reflect the growing scale of the public
            health issue.
          </p>

          <p className="text-gray-700 mb-4">
            The regulatory trajectory is towards greater accountability. The FSA&apos;s March 2025 voluntary guidance and the{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>{' '}
            evaluation in spring 2026 signal that mandatory written allergen disclosure is coming. When it arrives, the enforcement
            framework will have clear, auditable requirements — and businesses that fail to meet them will face prosecution
            under regulations specifically designed to prevent the kind of incidents documented in this guide.
          </p>

          <p className="text-gray-700 mb-6">
            For restaurant owners, the message is unambiguous: allergen compliance is not a box-ticking exercise. It is a legal
            obligation that, when done well, protects your customers from harm and your business from the devastating
            consequences documented in the cases above. The cost of compliance — time, training, and systems — is trivial
            compared to the cost of failure.
          </p>

          {/* How SafeEat Protects You */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How SafeEat Strengthens Your Legal Position</h2>

          <p className="text-gray-700 mb-4">
            SafeEat creates the documented allergen management system that forms the foundation of a due diligence defence.
            Every dish on your menu is mapped against the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>{' '}
            through your dashboard. Customers access this information via QR code, receiving accurate allergen data directly
            rather than through verbal communication chains that introduce error.
          </p>

          <p className="text-gray-700 mb-4">
            The verification system generates timestamped audit trail entries every time you confirm your allergen information
            is accurate. Automated email reminders ensure verification does not lapse during busy periods. This creates a
            chronological record of ongoing allergen management — exactly the evidence that strengthens a due diligence defence
            and demonstrates to EHO officers that your allergen compliance is active, not passive.
          </p>

          <p className="text-gray-700 mb-6">
            At £29.99 per month, SafeEat is the cheapest insurance against allergen prosecution you can buy. Compare this to
            the cases documented above: £43,816 in fines, £30,000+ in legal costs, months of business disruption, and
            reputational damage that persists for years. A digital allergen management system with automated audit trails does
            not guarantee immunity from prosecution — but it provides the documented due diligence that is your strongest legal
            protection, while simultaneously making your customers safer and your business more attractive to allergy-conscious
            diners.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Protect your business with a documented audit trail</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat gives your restaurant digital allergen menus, automated verification reminders, and timestamped audit
              trails that strengthen your due diligence defence — from £29.99/month. The cheapest protection against
              prosecution you can buy.
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
                <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
                  Natasha&apos;s Law: Complete Compliance Guide for Restaurants
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
