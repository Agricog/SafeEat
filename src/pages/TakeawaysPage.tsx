import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'Do takeaways need to provide allergen information?',
    a: 'Yes. Every UK takeaway must provide allergen information covering the 14 regulated allergens under the Food Information Regulations 2014. This applies to all takeaways regardless of cuisine, size, or whether you have a physical shop or operate from a delivery kitchen. Allergen information must be available for every item on your menu before the customer orders.',
  },
  {
    q: 'What allergen rules apply to takeaway delivery orders?',
    a: 'For delivery orders, allergen information must be provided at two points: before the customer places the order (on your website, app, phone ordering system, or delivery platform) and again when the food is delivered (either on the packaging or on a separate sheet included with the delivery). This is a legal requirement under distance selling regulations, not optional.',
  },
  {
    q: 'Am I responsible for allergen information on Deliveroo, Uber Eats, and Just Eat?',
    a: 'Yes. While delivery platforms provide fields for allergen information, the legal responsibility for accuracy remains with you as the food business operator, not the platform. You must ensure allergen information on every platform you use matches your actual menu and is updated whenever your menu changes. If a customer suffers an allergic reaction due to inaccurate allergen information on a platform, you are liable.',
  },
  {
    q: 'How do I provide allergen information for phone orders?',
    a: 'For phone orders, the person taking the call must be able to provide allergen information before the customer commits to ordering. This means having written allergen records accessible at the phone — not relying on memory. Staff must ask about allergies, check the allergen records, and confirm which dishes are safe. The allergen information should also be available with the delivered food.',
  },
  {
    q: 'Do I need allergen information for sauces and condiments included with takeaway orders?',
    a: 'Yes. Every item included in a takeaway order must have allergen information — this includes sauces, dips, rice, naan bread, chips, salads, garnishes, and any extras. These items are frequently missed in allergen documentation and are specifically checked by EHO officers. If you include a complimentary sauce or condiment with every order, its allergens must be documented.',
  },
  {
    q: 'What are the most common allergen risks for takeaways?',
    a: 'The most common risks vary by cuisine but consistently include: cross-contamination through shared fryers (gluten from batter, crustaceans from prawns), undeclared allergens in sauces and marinades (peanuts in satay, sesame in dressings, milk in curry sauces), shared cooking equipment transferring allergens between dishes, and ingredient substitutions by suppliers that change the allergen profile of a dish without the takeaway owner being aware.',
  },
  {
    q: 'Can a QR code on takeaway packaging replace written allergen information?',
    a: 'A QR code linking to your digital allergen menu can complement written information but should not be the sole method for delivery orders, because the customer may not have signal or a charged phone at the point of receiving their delivery. Best practice is to include basic allergen information on or with the packaging and make comprehensive digital information available via QR code.',
  },
  {
    q: 'What happens if a delivery customer has an allergic reaction?',
    a: 'You face the same legal liability as if the customer ate in your premises. If your allergen information was inaccurate or unavailable, you can be prosecuted under the Food Information Regulations 2014 and the Food Safety Act 1990. Recent fines for takeaway allergen failures have reached £27,803. In fatal cases, custodial sentences have been imposed. Having documented allergen records and a verification audit trail is your strongest defence.',
  },
  {
    q: 'Do I need to update allergen information when I change a recipe?',
    a: 'Yes — immediately and before serving the modified dish to any customer. Recipe changes, ingredient substitutions, and supplier changes all require allergen information to be reviewed and updated. This includes temporary substitutions due to supply shortages. Serving a dish with different allergens than what your records show is one of the most dangerous and most prosecuted allergen failures.',
  },
  {
    q: 'How should a takeaway handle cross-contamination risks?',
    a: 'Document your cross-contamination risks and controls: which items share fryers, grills, and preparation surfaces, what cleaning procedures you use between different foods, and how you communicate cross-contamination risks to customers. Where cross-contamination cannot be fully prevented, declare "may contain" warnings. EHO officers expect documented cross-contamination procedures, not just verbal assurances.',
  },
  {
    q: 'Do allergen rules apply to takeaway-only businesses without a dining area?',
    a: 'Yes. Allergen requirements apply to all food businesses regardless of whether they have customer seating. A delivery-only kitchen, a market stall, a food truck, and a traditional takeaway shop are all held to the same allergen compliance standards as a sit-down restaurant. The format of your business does not reduce your allergen obligations.',
  },
  {
    q: 'What is the best allergen management system for a takeaway?',
    a: 'A digital allergen menu via QR code is the most practical system for takeaways because it works for counter orders, phone orders (staff can check it quickly), and delivery (QR code on packaging links to full allergen information). SafeEat costs £29.99/month, updates instantly when your menu changes, and generates the audit trail EHO officers expect.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Allergen Compliance for Takeaways: Complete UK Guide 2026',
      description: 'Complete allergen compliance guide for UK takeaways. Covers delivery allergen requirements, platform responsibilities, phone orders, cross-contamination, and digital allergen management.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/for/takeaways',
      image: 'https://safeeat.co.uk/og-takeaways.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'For Takeaways', item: 'https://safeeat.co.uk/for/takeaways' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'Allergen Compliance for Takeaways',
      url: 'https://safeeat.co.uk/for/takeaways',
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] },
    },
    {
      '@type': 'Organization',
      name: 'SafeEat',
      url: 'https://safeeat.co.uk',
      description: 'Digital allergen management and customer retention platform for UK takeaways and restaurants.',
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
      name: 'Takeaway Allergen Terminology',
      definedTerm: [
        { '@type': 'DefinedTerm', name: 'Distance Selling', description: 'Sales where the customer orders without being physically present, including online, phone, and app orders. Requires allergen information before purchase and at delivery.' },
        { '@type': 'DefinedTerm', name: 'Food Business Operator', description: 'The person or company legally responsible for food safety compliance, regardless of the platform or channel through which food is sold.' },
        { '@type': 'DefinedTerm', name: 'Cross-Contamination', description: 'The unintentional transfer of an allergen from one food to another through shared equipment, surfaces, or cooking methods.' },
        { '@type': 'DefinedTerm', name: 'Precautionary Allergen Labelling', description: 'Voluntary "may contain" warnings indicating a risk of allergen cross-contamination, used when contamination cannot be fully prevented.' },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Set Up Allergen Compliance in Your Takeaway',
      description: 'Step-by-step guide to achieving allergen compliance in a UK takeaway.',
      step: [
        { '@type': 'HowToStep', name: 'Audit every menu item', text: 'List every dish, side, sauce, condiment, and drink you offer. Include items that are always included with orders, such as complimentary sauces.' },
        { '@type': 'HowToStep', name: 'Map allergens for each item', text: 'Document allergens for every item against all 14 regulated allergens. Check supplier specifications for all bought-in ingredients and composite products.' },
        { '@type': 'HowToStep', name: 'Assess cross-contamination risks', text: 'Identify shared fryers, grills, preparation surfaces, and utensils. Document which cross-contamination risks exist and how you manage them.' },
        { '@type': 'HowToStep', name: 'Set up digital allergen access', text: 'Create a QR code menu covering all items. Make it accessible at the counter, on packaging, and on your website for online and phone orders.' },
        { '@type': 'HowToStep', name: 'Update delivery platforms', text: 'Populate allergen information fields on Deliveroo, Uber Eats, Just Eat, and any other platform you use. Verify accuracy regularly.' },
        { '@type': 'HowToStep', name: 'Train staff and verify', text: 'Train all staff on allergen procedures including phone order handling. Verify allergen information weekly and document each review.' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu for takeaways with QR code access, customer allergen filtering, and automated audit trails.',
      url: 'https://safeeat.co.uk',
      offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP', priceValidUntil: '2027-04-12' },
    },
  ],
}

export default function TakeawaysPage() {
  return (
    <>
      <Helmet>
        <title>Allergen Compliance for Takeaways UK 2026 | Complete Guide | SafeEat</title>
        <meta name="description" content="Complete allergen compliance guide for UK takeaways. Covers delivery requirements, platform responsibilities, phone orders, cross-contamination, and digital allergen management for takeaway businesses." />
        <link rel="canonical" href="https://safeeat.co.uk/for/takeaways" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Allergen Compliance for Takeaways UK | SafeEat" />
        <meta property="og:description" content="Complete allergen compliance guide for UK takeaways. Delivery requirements, platform responsibilities, and digital allergen management." />
        <meta property="og:image" content="https://safeeat.co.uk/og-takeaways.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/for/takeaways" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergen Compliance for Takeaways UK | SafeEat" />
        <meta name="twitter:description" content="Complete allergen compliance guide for UK takeaways." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-takeaways.jpg" />
        <meta name="author" content="SafeEat" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA)}</script>
      </Helmet>

      <main className="min-h-screen bg-white">
        <nav className="max-w-3xl mx-auto px-4 pt-6 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center gap-1">
            <li><Link to="/" className="hover:text-emerald-700">Home</Link></li>
            <li>/</li>
            <li className="text-gray-900 font-medium">For Takeaways</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              Every UK takeaway must provide allergen information for all menu items under the Food Information Regulations
              2014. For delivery orders, allergen information must be available before ordering and again at delivery. You
              are legally responsible for allergen accuracy on third-party platforms (Deliveroo, Uber Eats, Just Eat) — not
              the platform. Fines for takeaway allergen failures have reached £27,803.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allergen Compliance for Takeaways: Complete UK Guide for 2026
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>13 min read</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Takeaways face unique allergen compliance challenges that differ significantly from sit-down restaurants. You serve
            customers through multiple channels — counter, phone, website, and third-party delivery platforms — and each channel
            has specific allergen information requirements. The customer is often not present when the food is prepared, meaning
            verbal allergen communication is even less reliable than in a restaurant setting. And the legal responsibility for
            allergen accuracy sits with you regardless of which platform or channel the order comes through.
          </p>

          <p className="text-gray-700 mb-6">
            This guide covers every aspect of allergen compliance for UK takeaways in 2026: the legal requirements for counter,
            phone, and delivery orders, your responsibilities on third-party platforms, how to manage cross-contamination risks
            in a fast-paced takeaway kitchen, and how digital allergen systems simplify compliance across all your ordering
            channels. Whether you operate a chip shop, a Chinese takeaway, an Indian restaurant with delivery, or a pizza
            business, the core requirements are the same.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Allergen Requirements by Ordering Channel</h2>

          <p className="text-gray-700 mb-4">
            Different ordering channels have different allergen information requirements, and takeaways typically operate across
            several simultaneously. Understanding the requirements for each channel is essential.
          </p>

          <p className="text-gray-700 mb-4">
            For counter orders where the customer is physically present, allergen information must be available at the point of
            ordering. This can be on the menu board, on a printed menu, on a separate allergen matrix, or via a QR code linked
            to a digital allergen menu. The FSA&apos;s March 2025 best practice guidance recommends written allergen information
            that customers can access independently — meaning a sign saying &quot;ask staff&quot; is no longer considered best
            practice, even though it currently meets the minimum legal requirement.
          </p>

          <p className="text-gray-700 mb-4">
            For phone orders, the staff member taking the call must be able to provide allergen information before the customer
            commits to ordering. This requires written allergen records accessible at the phone — not reliance on memory or
            shouting to the kitchen. The staff member should proactively ask about allergies, check the written records, and
            confirm which items are safe. Allergen information should also accompany the delivered food.
          </p>

          <p className="text-gray-700 mb-4">
            For online orders through your own website, allergen information must be available before the customer places the
            order. This can be integrated into your online menu, available on a separate allergen page linked from the ordering
            process, or accessible via a link to your SafeEat digital allergen menu. The customer must be able to identify
            allergens in their selected items before completing their order.
          </p>

          <p className="text-gray-700 mb-6">
            For delivery platform orders (Deliveroo, Uber Eats, Just Eat), allergen information must be populated in the
            platform&apos;s allergen fields. These platforms provide structured allergen information options — you are required
            to complete them accurately. However, the platform does not verify the accuracy of your allergen declarations. If
            your allergen information on a platform is wrong and a customer suffers a reaction, you are liable — not the
            platform. You must also update platform allergen information whenever your menu changes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cross-Contamination in Takeaway Kitchens</h2>

          <p className="text-gray-700 mb-4">
            Takeaway kitchens present high cross-contamination risks due to the speed of service, shared equipment, and the
            volume of different dishes prepared simultaneously. Understanding and documenting these risks is a legal
            requirement — and a practical necessity for customer safety.
          </p>

          <p className="text-gray-700 mb-4">
            Shared fryers are the most significant cross-contamination source in many takeaways. Battered fish introduces
            cereals containing gluten and fish allergens into the oil. Prawns introduce crustacean allergens. Anything
            subsequently fried in the same oil carries these risks. If you use one fryer for multiple products, every item
            fried in it must carry &quot;may contain&quot; declarations for the allergens present in all other items that share
            the fryer. The alternative — separate dedicated fryers for different allergen categories — is the safest approach
            but requires space and investment.
          </p>

          <p className="text-gray-700 mb-4">
            Shared cooking surfaces — grills, griddles, and woks — transfer allergens between dishes. A wok used for a
            peanut-containing stir-fry and then used for a customer&apos;s nut-free order without thorough cleaning creates
            a peanut cross-contamination risk. Standard rinsing between dishes may not remove allergen proteins effectively.
            Document your cleaning procedures, specify what constitutes adequate cleaning between allergen-containing and
            allergen-free dishes, and train staff to follow these procedures consistently.
          </p>

          <p className="text-gray-700 mb-6">
            Ingredient storage creates additional risks. Allergen-containing ingredients stored above non-allergen ingredients
            can contaminate through spillage or dust. Open containers of nuts, sesame seeds, or flour can contaminate nearby
            products. Document your storage procedures, separate high-risk allergens from other ingredients, and train staff
            on safe storage practices. EHO officers check storage arrangements during inspections and look for evidence that
            cross-contamination risks from storage have been considered and managed.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cuisine-Specific Allergen Risks</h2>

          <p className="text-gray-700 mb-4">
            Different takeaway cuisines carry different primary allergen risks. Understanding the specific risks for your
            cuisine helps you focus your allergen management on the areas of greatest danger.
          </p>

          <p className="text-gray-700 mb-4">
            Chinese and East Asian takeaways face high risks from soy (in soy sauce, tofu, and many sauces), peanuts (in
            satay, kung pao, and some cooking oils), sesame (in sesame oil, seeds, and paste), crustaceans and molluscs (in
            seafood dishes and oyster sauce), cereals containing gluten (in soy sauce, noodles, and batter), and eggs (in egg
            fried rice and egg noodles). The widespread use of soy sauce means that almost every dish in a Chinese takeaway
            contains both soy and wheat allergens.
          </p>

          <p className="text-gray-700 mb-4">
            Indian takeaways face significant risks from milk (in ghee, cream, yoghurt marinades, and paneer), nuts (in
            kormas, biryanis, and desserts), peanuts (sometimes substituted for more expensive tree nuts), celery (in
            spice blends), mustard (in some curries and pickles), and sesame (in naan bread). The case of Mohammed Zaman —
            who received a six-year prison sentence after a customer died from peanut powder substituted for almond — is a
            stark reminder of the consequences of undeclared allergen substitution.
          </p>

          <p className="text-gray-700 mb-4">
            Fish and chip shops face risks from fish, crustaceans (if prawns are also fried), cereals containing gluten (in
            batter and breadcrumbs), eggs (in some batters), and milk (in some batters and side items). Shared fryer oil is
            the primary cross-contamination vector — chips fried in oil previously used for battered fish carry both gluten
            and fish allergen risks.
          </p>

          <p className="text-gray-700 mb-6">
            Pizza takeaways face risks from cereals containing gluten (in dough), milk (in cheese and some dough recipes),
            eggs (in some dough recipes), fish (anchovy toppings), and potentially any of the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>{' '}
            depending on topping options. Cross-contamination through shared preparation surfaces and pizza ovens is a
            consistent risk that must be documented and communicated to customers.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Delivery Platform Responsibility Gap</h2>

          <p className="text-gray-700 mb-4">
            One of the most misunderstood areas of takeaway allergen compliance is the division of responsibility between
            you and third-party delivery platforms. Many takeaway operators assume that the platform handles allergen
            compliance. They do not. The legal responsibility is entirely yours.
          </p>

          <p className="text-gray-700 mb-4">
            Delivery platforms provide allergen information fields for you to populate. They provide the infrastructure for
            displaying that information to customers. But they do not verify the accuracy of what you enter, they do not
            update your information when your menu changes, and they do not take legal responsibility if your allergen
            information is wrong. If a customer orders through Deliveroo and suffers an allergic reaction because your allergen
            information on the platform was inaccurate, you are prosecuted — not Deliveroo.
          </p>

          <p className="text-gray-700 mb-6">
            This creates a practical challenge: you must maintain accurate allergen information on your own systems and on
            every delivery platform you use. When your menu changes, you must update every platform. When a supplier
            substitutes an ingredient, you must update every platform. When you add or remove a dish, every platform must
            reflect the change. A digital allergen management system like SafeEat serves as your single source of truth —
            you update it once, and the QR code menu is immediately current. You then need to manually update each delivery
            platform to match, but having one authoritative source makes this process manageable and reduces the risk of
            inconsistent information across channels.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Preparing for{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">Owen&apos;s Law</Link>
          </h2>

          <p className="text-gray-700 mb-4">
            Owen&apos;s Law would require mandatory written allergen information at the point of ordering — removing the
            option to rely on verbal communication. For takeaways, this means written allergen information must be available
            at the counter, on your website, on delivery platforms, and accessible during phone orders. The FSA is evaluating
            voluntary uptake of written disclosure in spring 2026, and mandatory legislation is expected if uptake is poor.
          </p>

          <p className="text-gray-700 mb-6">
            Takeaways that adopt written allergen disclosure now — through a digital QR code system, allergen information on
            their website, and complete allergen fields on delivery platforms — will be fully compliant when legislation
            arrives. Those that continue relying on verbal communication will face a scramble to implement written systems
            under time pressure, with the risk of{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              prosecution and fines
            </Link>{' '}
            during the transition.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why SafeEat Works for Takeaways</h2>

          <p className="text-gray-700 mb-4">
            SafeEat addresses the specific challenges takeaways face. Your QR code can be displayed at the counter for
            walk-in customers, printed on packaging for delivery orders, and linked from your website for online orders.
            Customers scan, filter by their allergies, and see which dishes are safe — across all your ordering channels.
          </p>

          <p className="text-gray-700 mb-4">
            Staff taking phone orders can pull up the SafeEat dashboard on any device to check allergen information
            instantly — no flipping through paper records or guessing. Menu updates propagate immediately, ensuring your
            QR code menu is always current even during busy service when specials are added or items sell out.
          </p>

          <p className="text-gray-700 mb-6">
            The audit trail protects you during{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>{' '}
            and in the event of an allergen incident. Timestamped verification records demonstrate ongoing due diligence.
            Automated email reminders ensure verification does not lapse. And customers who save their allergen profile
            become repeat orderers who trust your takeaway with their safety — the loyalty advantage that no paper system
            provides. All for £29.99/month.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Allergen compliance across every ordering channel</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat covers counter, phone, online, and delivery orders with one digital allergen menu. Customers filter
              by their allergies. You get automated verification and a timestamped audit trail — from £29.99/month.
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
