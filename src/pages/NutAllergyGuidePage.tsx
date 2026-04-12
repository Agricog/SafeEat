import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'Are peanuts and tree nuts the same allergen?',
    a: 'No. Under UK law, peanuts and tree nuts are two separate allergen categories. Peanuts (groundnuts) are legumes, not true nuts. Tree nuts include almonds, hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts, and macadamia nuts. Some individuals are allergic to peanuts but not tree nuts, or vice versa, while some are allergic to both. You must declare each category separately and accurately.',
  },
  {
    q: 'What are the most dangerous nut allergens in restaurants?',
    a: 'Peanuts and tree nuts are among the most common causes of fatal anaphylaxis in the UK. Peanut allergy affects approximately 2% of children and 1% of adults, making it one of the most prevalent food allergies. Tree nut allergies are similarly common. Unlike some food allergies that may be outgrown, nut allergies are typically lifelong. Even trace amounts can trigger severe reactions in highly sensitive individuals, making accurate declaration and cross-contamination prevention critical.',
  },
  {
    q: 'Where do nuts hide in restaurant food?',
    a: 'Common hidden sources include pesto (traditionally made with pine nuts, sometimes cashews or walnuts), praline and marzipan (almonds), nougat (almonds, pistachios), some curries and Asian sauces (peanuts, cashews), cold-pressed nut oils, some cereals and granolas, baklava and Middle Eastern pastries, some breads (walnut bread, nut-topped rolls), satay sauce (peanuts), some ice creams, some chocolate products, dukkah seasoning (various nuts), and some salad dressings.',
  },
  {
    q: 'How do I prevent nut cross-contamination in my kitchen?',
    a: 'Key measures include storing nuts separately from other ingredients in sealed containers, using dedicated utensils for nut-containing dishes, cleaning surfaces thoroughly between preparing nut-containing and nut-free dishes, never using shared fryer oil for nut-containing and nut-free items, training staff to wash hands after handling nuts, and being aware that airborne nut particles (from grinding or chopping) can contaminate nearby food. Document all procedures.',
  },
  {
    q: 'Do I need to declare nut oils?',
    a: 'It depends on the oil. Highly refined nut oils (such as refined peanut oil or refined almond oil) are generally exempt from allergen labelling because the refining process removes allergenic proteins. However, cold-pressed, unrefined, or crude nut oils retain allergenic proteins and must be declared. If you are unsure whether your oil is fully refined, declare it. The safest approach is to declare all nut-derived oils regardless of refinement.',
  },
  {
    q: 'What should I do if a customer says they have a nut allergy?',
    a: 'Take it seriously — nut allergies can be fatal. Check your allergen records to identify which dishes contain peanuts and/or tree nuts. Ask whether the allergy is to peanuts, tree nuts, or both, and if tree nuts, which specific nuts. Communicate any cross-contamination risks. Never assume a small amount is safe. If you cannot guarantee a dish is nut-free, say so and offer alternatives with confirmed allergen information.',
  },
  {
    q: 'Can a customer with a nut allergy eat food from a kitchen that uses nuts?',
    a: 'This depends on the individual and the severity of their allergy. Some people with nut allergies can safely eat food from a kitchen that handles nuts, provided proper cross-contamination controls are in place. Others are so sensitive that even trace contamination is dangerous. Your responsibility is to accurately declare nut content and communicate cross-contamination risks — the customer then makes an informed decision based on their own medical advice.',
  },
  {
    q: 'What is the difference between "contains nuts" and "may contain nuts"?',
    a: '"Contains nuts" means nuts are a deliberate ingredient in the dish. "May contain nuts" indicates a risk of cross-contamination — nuts are not an ingredient but could be present due to shared equipment, preparation areas, or storage. "Contains" declarations are legally mandatory. "May contain" warnings are voluntary but strongly recommended where genuine cross-contamination risks exist. Both are important information for customers with nut allergies.',
  },
  {
    q: 'Do I need to specify which tree nut is in a dish?',
    a: 'The legal minimum requirement is to declare "nuts" as the allergen category. However, best practice — and what many allergy-aware customers need — is to specify which tree nut is present: "contains nuts (almonds)" is more useful than just "contains nuts." Some individuals are allergic to specific tree nuts but can safely eat others. Providing specific nut identification helps these customers make informed choices and demonstrates thorough allergen management.',
  },
  {
    q: 'Has anyone been prosecuted for nut allergy failures in the UK?',
    a: 'Yes. The most significant case is Mohammed Zaman, owner of the Indian Garden restaurant in Easingwold, who received a six-year prison sentence after a customer died from an allergic reaction to peanut powder in a takeaway meal. The case involved deliberate substitution of cheaper ingredients containing peanuts without updating allergen information. Other prosecutions for nut-related allergen failures have resulted in substantial fines for independent restaurants.',
  },
  {
    q: 'Are coconuts classed as nuts under UK allergen law?',
    a: 'Coconuts are botanically classified as drupes (fruits), not true nuts, and are not included in the "nuts" allergen category under UK Food Information Regulations. However, some individuals with tree nut allergies also react to coconut due to cross-reactivity. While you are not legally required to declare coconut under the "nuts" category, good practice is to identify coconut as an ingredient so customers can make informed decisions based on their own allergy profile.',
  },
  {
    q: 'How does SafeEat help with nut allergy management?',
    a: 'SafeEat allows customers to filter your menu by selecting "peanuts" and/or "nuts" as their allergens. They instantly see only dishes that do not contain those allergens. The system distinguishes between peanuts and tree nuts as separate allergen categories, matching the legal framework. Menu updates propagate instantly, and the verification audit trail documents your ongoing nut allergen management for EHO inspections.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Nut Allergy Restaurant Guide: UK Compliance and Safety 2026',
      description: 'Complete guide to managing nut allergies in UK restaurants. Covers peanut and tree nut requirements, hidden nut sources, cross-contamination prevention, and fatal prosecution cases.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12', dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/nut-allergy-restaurant-guide',
      image: 'https://safeeat.co.uk/og-nut-allergy.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: 'Nut Allergy Guide', item: 'https://safeeat.co.uk/guides/nut-allergy-restaurant-guide' },
      ],
    },
    { '@type': 'WebPage', name: 'Nut Allergy Restaurant Guide', url: 'https://safeeat.co.uk/guides/nut-allergy-restaurant-guide', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] } },
    { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk', description: 'Digital allergen management and customer retention platform for UK restaurants.', sameAs: [] },
    { '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    {
      '@type': 'DefinedTermSet', name: 'Nut Allergy Terminology',
      definedTerm: [
        { '@type': 'DefinedTerm', name: 'Tree Nuts', description: 'Almonds, hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts, and macadamia nuts — one of the 14 regulated UK allergens.' },
        { '@type': 'DefinedTerm', name: 'Peanuts', description: 'Groundnuts — legumes that are a separate regulated allergen category from tree nuts under UK law.' },
        { '@type': 'DefinedTerm', name: 'Anaphylaxis', description: 'A severe, potentially life-threatening allergic reaction requiring immediate treatment with adrenaline (epinephrine).' },
        { '@type': 'DefinedTerm', name: 'Cross-Reactivity', description: 'When an allergy to one substance causes a reaction to a related substance, such as peanut allergy triggering a reaction to lupin.' },
      ],
    },
    {
      '@type': 'HowTo', name: 'How to Manage Nut Allergies in Your Restaurant',
      step: [
        { '@type': 'HowToStep', name: 'Audit for hidden nuts', text: 'Check every ingredient for peanuts and tree nuts, including sauces, oils, garnishes, and bought-in products. Obtain supplier specifications.' },
        { '@type': 'HowToStep', name: 'Separate peanuts from tree nuts', text: 'Declare peanuts and tree nuts as separate allergen categories. Specify which tree nuts are present where possible.' },
        { '@type': 'HowToStep', name: 'Implement cross-contamination controls', text: 'Store nuts separately, use dedicated utensils, clean surfaces between nut and nut-free preparation, and document procedures.' },
        { '@type': 'HowToStep', name: 'Document and display', text: 'Map all dishes against peanut and tree nut allergens. Use SafeEat to let customers filter for nut-free options via QR code.' },
        { '@type': 'HowToStep', name: 'Train all staff', text: 'Ensure every team member understands the severity of nut allergies and knows how to check allergen records and handle nut-free requests.' },
        { '@type': 'HowToStep', name: 'Prepare for emergencies', text: 'Train staff to recognise anaphylaxis symptoms and call 999 immediately. Know how to assist with adrenaline auto-injectors.' },
      ],
    },
    {
      '@type': 'SoftwareApplication', name: 'SafeEat', applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
      description: 'Digital allergen menu with nut allergy filtering for peanuts and tree nuts, customer profiles, and audit trails.',
      url: 'https://safeeat.co.uk',
      offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP', priceValidUntil: '2027-04-12' },
    },
  ],
}

export default function NutAllergyGuidePage() {
  return (
    <>
      <Helmet>
        <title>Nut Allergy Restaurant Guide UK 2026 | Peanuts &amp; Tree Nuts | SafeEat</title>
        <meta name="description" content="Complete guide to managing nut allergies in UK restaurants. Peanut and tree nut requirements, hidden sources, cross-contamination prevention, prosecution cases, and digital allergen management." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/nut-allergy-restaurant-guide" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Nut Allergy Restaurant Guide UK | SafeEat" />
        <meta property="og:description" content="Complete guide to peanut and tree nut allergy management in UK restaurants." />
        <meta property="og:image" content="https://safeeat.co.uk/og-nut-allergy.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/nut-allergy-restaurant-guide" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nut Allergy Restaurant Guide UK | SafeEat" />
        <meta name="twitter:description" content="Managing peanut and tree nut allergies in UK restaurants." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-nut-allergy.jpg" />
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
            <li className="text-gray-900 font-medium">Nut Allergy Guide</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              Peanuts and tree nuts are two separate regulated allergens under UK law. Both must be declared for every dish.
              Nut allergies are among the most common causes of fatal anaphylaxis — even trace amounts can trigger severe
              reactions. Restaurants must accurately declare nut content, manage cross-contamination, and be prepared for
              allergic emergencies. A restaurant owner received a six-year prison sentence after a fatal peanut allergy
              incident.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nut Allergy Restaurant Guide: UK Compliance and Safety for 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>13 min read</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Nut allergies are among the most dangerous food allergies, responsible for a disproportionate number of fatal
            anaphylaxis cases in the UK. For restaurant owners, managing nut allergies is not just a compliance requirement —
            it is a direct matter of customer safety where mistakes have proven fatal. The case of Mohammed Zaman, who received
            a six-year prison sentence after a customer died from undeclared peanut powder in a takeaway meal, demonstrates
            the extreme consequences of failure. This guide covers everything UK restaurants need to know about nut allergy
            management: the legal distinction between peanuts and tree nuts, hidden nut sources, cross-contamination prevention,
            and how to communicate nut risks effectively to customers.
          </p>

          <p className="text-gray-700 mb-6">
            The prevalence of nut allergies is increasing. Peanut allergy affects approximately 2% of UK children and 1% of
            adults. Tree nut allergies are similarly common. Unlike some childhood food allergies that may be outgrown, nut
            allergies are typically lifelong. The severity of potential reactions — from mild symptoms to fatal anaphylaxis —
            means that every nut allergy declaration in your restaurant must be accurate, and every cross-contamination risk
            must be managed and communicated.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Peanuts vs Tree Nuts: The Legal Distinction</h2>

          <p className="text-gray-700 mb-4">
            Under the Food Information Regulations 2014, peanuts and tree nuts are two separate allergen categories from the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>
            . This distinction matters because some individuals are allergic to peanuts but not tree nuts, or to specific
            tree nuts but not peanuts. Declaring &quot;contains nuts&quot; when a dish contains peanuts is technically
            inaccurate — peanuts are legumes, not nuts — and fails to provide the specific information that peanut-allergic
            customers need.
          </p>

          <p className="text-gray-700 mb-4">
            Peanuts (also called groundnuts) are legumes in the same family as chickpeas, lentils, and soybeans. Peanut
            allergy is one of the most common food allergies in the UK and one of the most likely to cause severe anaphylaxis.
            Cross-reactivity exists between peanuts and other legumes — some peanut-allergic individuals also react to lupin
            (another regulated allergen) and occasionally to soy.
          </p>

          <p className="text-gray-700 mb-6">
            Tree nuts comprise eight specific nuts listed under UK regulations: almonds, hazelnuts, walnuts, cashews, pecan
            nuts, Brazil nuts, pistachio nuts, and macadamia nuts. Not all individuals with tree nut allergies react to every
            tree nut — some are allergic to cashews and pistachios (which are botanically related) but tolerate almonds or
            walnuts. This is why specifying which tree nut is present provides more useful information than a generic &quot;contains
            nuts&quot; declaration.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Hidden Nut Sources in Restaurant Food</h2>

          <p className="text-gray-700 mb-4">
            The obvious nut sources — nut toppings, peanut satay, almond desserts — are straightforward to identify and
            declare. The hidden sources are where restaurants fail. Nuts appear in ingredients and products where many kitchen
            staff would not expect them, and these hidden sources are responsible for the majority of nut-related allergen
            incidents in food businesses.
          </p>

          <p className="text-gray-700 mb-4">
            Pesto is one of the most commonly missed nut sources. Traditional pesto contains pine nuts (technically seeds,
            not regulated tree nuts), but many commercial pestos substitute cashews, walnuts, or other tree nuts. Any pesto
            used in your kitchen must have its ingredient list verified against supplier specifications — the specific tree
            nut content varies between brands and batches.
          </p>

          <p className="text-gray-700 mb-4">
            Asian and Middle Eastern cuisines use nuts extensively. Peanuts appear in satay sauce, kung pao dishes, pad Thai,
            and some curry pastes. Cashews feature in many Indian curries, Chinese stir-fries, and Thai dishes. Almonds appear
            in kormas, biryanis, and Middle Eastern pastries. Pistachios feature in baklava, Turkish delight, and some rice
            dishes. Sesame (a separate allergen) is distinct from nuts but often appears alongside them in similar cuisines.
          </p>

          <p className="text-gray-700 mb-4">
            Bakery products and desserts carry significant nut risks. Marzipan (almonds), praline (almonds or hazelnuts),
            nougat (almonds, pistachios), some chocolate (may contain nuts from shared production lines), macarons (almond
            flour), some breads (walnut bread, nut-topped rolls), and frangipane (almonds) all contain tree nuts. Even
            products that do not list nuts as ingredients may carry &quot;may contain nuts&quot; warnings from the
            manufacturer due to shared production facilities.
          </p>

          <p className="text-gray-700 mb-6">
            Nut oils require careful assessment. Highly refined peanut oil and other refined nut oils are generally considered
            safe for nut-allergic individuals because the refining process removes allergenic proteins. However, cold-pressed,
            virgin, and unrefined nut oils retain these proteins and must be declared. If you use any nut-derived oil,
            verify its refinement status through supplier documentation. When in doubt, declare it — the risk of not
            declaring is far greater than the inconvenience of over-declaring.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cross-Contamination: The Critical Risk</h2>

          <p className="text-gray-700 mb-4">
            For highly sensitive nut-allergic individuals, cross-contamination can be as dangerous as direct consumption.
            Nut proteins are resilient — they are not destroyed by cooking, they persist on surfaces after routine cleaning,
            and they can become airborne when nuts are chopped, ground, or processed. Managing nut cross-contamination
            requires specific, documented procedures.
          </p>

          <p className="text-gray-700 mb-4">
            Storage is the first line of defence. Nuts should be stored in sealed containers, separated from other ingredients.
            Never store nuts above other ingredients where particles could fall and contaminate. Label nut storage clearly so
            all staff are aware of their location and the contamination risk they represent.
          </p>

          <p className="text-gray-700 mb-4">
            Preparation requires deliberate separation. Use dedicated utensils — chopping boards, knives, mixing bowls — for
            nut-containing dishes. If dedicated utensils are not practical, clean utensils thoroughly between nut-containing
            and nut-free preparation. Standard rinsing may not remove nut proteins adequately; hot soapy water and physical
            scrubbing are required. Staff should wash hands thoroughly after handling nuts.
          </p>

          <p className="text-gray-700 mb-6">
            Airborne contamination is often overlooked. Grinding, chopping, or toasting nuts releases allergen particles
            into the air that can settle on nearby food and surfaces. If your kitchen grinds or processes nuts, this should
            not happen near the preparation of nut-free dishes. The{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspection guide
            </Link>{' '}
            covers cross-contamination controls in detail.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Fatal Consequences: Prosecution Cases</h2>

          <p className="text-gray-700 mb-4">
            Nut allergy failures have resulted in the most severe penalties in UK food safety enforcement history. The
            Mohammed Zaman case — a six-year prison sentence for manslaughter by gross negligence — established that
            restaurant owners can face custodial sentences, not just fines, when allergen failures cause death.
          </p>

          <p className="text-gray-700 mb-4">
            In that case, the restaurant routinely substituted cheaper peanut powder for almond powder in dishes to reduce
            costs. A customer who had clearly communicated his nut allergy died after eating a dish containing the substituted
            peanut powder. The investigation revealed that the owner had been warned by his own staff and by Environmental
            Health Officers about allergen practices before the fatal incident. The court found that the level of negligence
            was so extreme that it constituted gross negligence manslaughter rather than a regulatory food safety offence.
          </p>

          <p className="text-gray-700 mb-6">
            Other{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              nut-related allergen prosecutions
            </Link>{' '}
            have resulted in substantial fines. The consistent pattern across these cases is the absence of systematic allergen
            management: no written allergen records, no verification process, no staff training documentation, and no audit
            trail demonstrating due diligence. Every case would have had a different outcome if the restaurant had maintained
            a documented allergen management system with regular verification.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Using SafeEat for Nut Allergy Management</h2>

          <p className="text-gray-700 mb-4">
            SafeEat separates peanuts and tree nuts as distinct allergen categories, matching the legal framework exactly.
            Customers scan your QR code, select &quot;peanuts&quot; and/or &quot;nuts&quot; as their allergens, and see only
            the dishes that are safe for their specific allergy. A customer allergic to peanuts but not tree nuts sees
            different results from a customer allergic to both — the precision that nut-allergic diners need and that generic
            allergen charts cannot provide.
          </p>

          <p className="text-gray-700 mb-6">
            The verification system creates the documented due diligence that protects your business. Regular timestamped
            verification entries prove that your nut allergen information is actively maintained. Automated email reminders
            prevent verification from lapsing. And customers who save their nut allergy profile become loyal diners who
            trust your restaurant — the{' '}
            <Link to="/guides/allergen-customer-retention" className="text-emerald-700 underline hover:text-emerald-900">
              retention advantage
            </Link>{' '}
            that transforms compliance into repeat business. £29.99/month for the allergen management system that could
            prevent a six-figure fine or a prison sentence.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Protect your customers and your business</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat separates peanut and tree nut allergens, lets customers filter for nut-free dishes via QR code, and
              builds the audit trail that demonstrates due diligence — from £29.99/month.
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
              <li><Link to="/guides/gluten-free-menu-restaurant" className="text-emerald-700 underline hover:text-emerald-900">Gluten-Free Menu Restaurant Guide</Link></li>
              <li><Link to="/guides/allergen-customer-retention" className="text-emerald-700 underline hover:text-emerald-900">Allergen Customer Retention Guide</Link></li>
              <li><Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">EHO Allergen Inspection Guide</Link></li>
              <li><Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">Allergen Fines UK</Link></li>
              <li><Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">Owen&apos;s Law</Link></li>
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
