import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'How many people with food allergies avoid eating out?',
    a: 'Research shows that 60% of young allergic diners aged 16-25 avoid eating out entirely because they do not trust restaurant allergen information. 42% of all food-allergic adults have stopped dining out or ordering takeaway. These are not people who dislike restaurants — they are people who want to eat out but cannot find venues they trust to manage their allergies safely.',
  },
  {
    q: 'Are allergy customers more loyal than average diners?',
    a: 'Yes, significantly. 86% of food-allergic consumers say their loyalty is directly influenced by how well a restaurant accommodates their allergy. When someone with a serious food allergy finds a restaurant they trust, they return repeatedly because safe dining options are scarce. This makes them among the most loyal customer segments in the restaurant industry.',
  },
  {
    q: 'Are allergy customers less price-sensitive?',
    a: 'Research indicates that only 39% of food-allergic consumers prioritise price when choosing a restaurant, compared to 65% of non-allergic diners. Safety and trust are more important than price for this segment. This means allergy-aware restaurants can maintain premium pricing without losing allergy customers, who value safety over discounts.',
  },
  {
    q: 'How do food-allergic customers affect group dining decisions?',
    a: '44% of non-allergic consumers consider allergy accommodations when choosing where to eat with friends or family. One allergic person in a group of four makes your allergy policy relevant to all four covers. This multiplier effect means that allergy-friendly restaurants capture entire group bookings, not just individual allergy customers.',
  },
  {
    q: 'What revenue increase can allergy-friendly restaurants expect?',
    a: 'Research suggests restaurants can see a 10-15% revenue increase by becoming trusted allergy-safe destinations. This comes from three sources: capturing new customers who currently avoid eating out, increasing visit frequency from loyal allergy customers, and securing group bookings where the allergy customer drives the venue choice.',
  },
  {
    q: 'How does allergen compliance turn into customer retention?',
    a: 'Standard allergen compliance tools stop at box-ticking: here are the allergens, done. Customer retention requires a second step — capturing the relationship. When a customer saves their allergen profile at your venue, you gain their loyalty because they have invested in trusting you. With marketing opt-in, you can reach them with new allergen-safe dishes, creating an ongoing relationship that generic compliance cannot provide.',
  },
  {
    q: 'What is an allergen customer profile?',
    a: 'An allergen customer profile is a record of a customer\'s specific allergens saved against your venue. When a customer scans your SafeEat QR code and saves their allergen preferences, their allergies are stored so they do not need to re-enter them on future visits. This creates a personalised, trusted relationship between your venue and the customer.',
  },
  {
    q: 'Can I use allergen customer data for marketing?',
    a: 'Only with explicit opt-in consent. SafeEat collects marketing consent separately from allergen profile consent, in compliance with UK GDPR. Customers who opt in to marketing can receive notifications about new allergen-safe dishes or menu changes relevant to their specific allergies. This is targeted, permission-based marketing that customers actually want to receive — unlike generic promotions.',
  },
  {
    q: 'How do allergy customers find restaurants they trust?',
    a: 'Allergy customers rely heavily on word-of-mouth within allergy communities, online reviews mentioning allergy accommodation, allergy-specific apps and directories, social media recommendations in allergy support groups, and personal experience from previous visits. Becoming trusted within these networks creates organic referral traffic that is highly valuable and difficult for competitors to replicate.',
  },
  {
    q: 'Does any other UK tool combine allergen compliance with customer retention?',
    a: 'No. Existing UK allergen tools focus exclusively on compliance — declaring allergens, generating allergen matrices, and passing inspections. SafeEat is the only UK platform that combines allergen compliance (digital menus, audit trails, verification) with customer retention (saved allergen profiles, marketing opt-ins, customer database). This dual function is what makes SafeEat unique in the UK market.',
  },
  {
    q: 'How does SafeEat build my allergy customer database?',
    a: 'When a customer scans your SafeEat QR code and saves their allergen profile, their anonymised allergen data and optional contact preferences are stored against your venue. Over time, this builds a database of allergy-conscious customers who have actively chosen your restaurant. Your dashboard shows how many profiles have been saved, allergen distribution, and marketing opt-in rates.',
  },
  {
    q: 'What is the long-term value of an allergy customer?',
    a: 'An allergy customer who trusts your restaurant has a significantly higher lifetime value than an average diner. They visit more frequently (because safe options are limited), they bring groups (influencing 3-4 additional covers per visit), they are less price-sensitive (39% vs 65% prioritising price), and they actively refer others within allergy communities. A single trusted allergy customer can generate thousands of pounds in revenue over their lifetime.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Allergen Customer Retention: How Allergy Compliance Drives Restaurant Revenue',
      description: 'How UK restaurants can turn allergen compliance into customer retention and revenue growth. Data on allergy customer loyalty, spending patterns, and the unique opportunity of allergen-driven CRM.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12', dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/allergen-customer-retention',
      image: 'https://safeeat.co.uk/og-customer-retention.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: 'Customer Retention', item: 'https://safeeat.co.uk/guides/allergen-customer-retention' },
      ],
    },
    { '@type': 'WebPage', name: 'Allergen Customer Retention', url: 'https://safeeat.co.uk/guides/allergen-customer-retention', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] } },
    { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk', description: 'Digital allergen management and customer retention platform for UK restaurants.', sameAs: [] },
    { '@type': 'FAQPage', mainEntity: FAQ_ITEMS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    {
      '@type': 'DefinedTermSet', name: 'Allergen Customer Retention Terminology',
      definedTerm: [
        { '@type': 'DefinedTerm', name: 'Allergen Customer Profile', description: 'A record of a customer\'s specific allergens saved against a restaurant venue, enabling personalised safe dining on return visits.' },
        { '@type': 'DefinedTerm', name: 'Marketing Opt-In', description: 'Explicit consent from a customer to receive marketing communications about allergen-relevant menu updates.' },
        { '@type': 'DefinedTerm', name: 'Customer Lifetime Value', description: 'The total revenue a customer generates for a business over the entire duration of their relationship.' },
        { '@type': 'DefinedTerm', name: 'Group Dining Multiplier', description: 'The effect where one allergy customer\'s restaurant choice influences the dining decision of their entire group.' },
      ],
    },
    {
      '@type': 'HowTo', name: 'How to Turn Allergen Compliance into Customer Retention',
      step: [
        { '@type': 'HowToStep', name: 'Provide excellent allergen information', text: 'Make allergen information clear, accurate, and accessible via QR code. Customers who trust your allergen information trust your restaurant.' },
        { '@type': 'HowToStep', name: 'Enable profile saving', text: 'Let customers save their allergen profile against your venue using SafeEat. This creates a personalised relationship and eliminates the need to re-enter allergies on return visits.' },
        { '@type': 'HowToStep', name: 'Collect marketing consent', text: 'Offer customers the option to opt in to marketing communications about new allergen-safe dishes and menu changes relevant to their specific allergies.' },
        { '@type': 'HowToStep', name: 'Add new allergen-safe options', text: 'Regularly add dishes that cater to common allergens — gluten-free, nut-free, dairy-free. Each new option is a reason for allergy customers to return.' },
        { '@type': 'HowToStep', name: 'Notify opted-in customers', text: 'When you add new allergen-safe dishes, notify customers who have those specific allergies. Targeted, relevant communication drives return visits.' },
        { '@type': 'HowToStep', name: 'Build community trust', text: 'Allergy communities share restaurant recommendations actively. Consistent, trustworthy allergen management generates organic referrals.' },
      ],
    },
    {
      '@type': 'SoftwareApplication', name: 'SafeEat', applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
      description: 'The only UK allergen platform combining compliance (digital menus, audit trails) with customer retention (saved profiles, marketing opt-ins).',
      url: 'https://safeeat.co.uk',
      offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP', priceValidUntil: '2027-04-12' },
    },
  ],
}

export default function AllergenRetentionGuidePage() {
  return (
    <>
      <Helmet>
        <title>Allergen Customer Retention: How Allergy Compliance Drives Revenue | SafeEat</title>
        <meta name="description" content="How UK restaurants turn allergen compliance into customer retention and revenue. Data on allergy customer loyalty, the group dining multiplier, and the only UK tool combining compliance with CRM." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/allergen-customer-retention" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Allergen Customer Retention | SafeEat" />
        <meta property="og:description" content="How allergy compliance drives restaurant revenue. Data on loyalty, spending, and the retention opportunity." />
        <meta property="og:image" content="https://safeeat.co.uk/og-customer-retention.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/allergen-customer-retention" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergen Customer Retention | SafeEat" />
        <meta name="twitter:description" content="Turn allergen compliance into customer loyalty and revenue." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-customer-retention.jpg" />
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
            <li className="text-gray-900 font-medium">Customer Retention</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              2.4 million UK adults have food allergies, yet 60% of young allergic diners avoid eating out. Allergy customers
              are 86% loyalty-driven, less price-sensitive than average, and influence group dining decisions. The gap: every
              UK allergen tool stops at compliance. SafeEat is the only platform that combines allergen compliance with
              customer retention — saved allergen profiles, marketing opt-ins, and a database of loyal allergy customers.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allergen Customer Retention: How Allergy Compliance Drives Restaurant Revenue
          </h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span>Published by <strong className="text-gray-700">SafeEat</strong></span>
            <span>·</span>
            <time dateTime="2026-04-12">12 April 2026</time>
            <span>·</span>
            <span>12 min read</span>
          </div>

          <p className="text-lg text-gray-700 mb-6">
            Most restaurant owners think about allergen compliance as a cost: time spent on paperwork, staff training hours,
            inspection preparation. This framing misses the commercial opportunity hiding inside the compliance obligation.
            There are 2.4 million adults in the UK with clinically confirmed food allergies — a customer segment that is
            underserved, exceptionally loyal, less price-sensitive than average, and growing. Restaurants that move beyond
            compliance checkbox-ticking and into genuine allergen-driven customer retention are capturing revenue that their
            competitors leave on the table.
          </p>

          <p className="text-gray-700 mb-6">
            This guide presents the data behind allergen customer retention, explains why allergy customers behave differently
            from average diners, describes the mechanics of turning compliance into a retention engine, and makes the case for
            why this represents the single biggest untapped opportunity in independent restaurant marketing. No other guide
            exists on this topic — because no other allergen tool in the UK does what this requires.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Untapped Market</h2>

          <p className="text-gray-700 mb-4">
            The Food Standards Agency reports that 2.4 million UK adults have a clinically confirmed food allergy. This
            figure has doubled in the last decade and continues to rise. Among children, food allergy prevalence is even
            higher — approximately 7-8% of UK children have a diagnosed food allergy. These are not dietary preferences;
            they are medical conditions where consuming the wrong food can cause hospitalisation or death.
          </p>

          <p className="text-gray-700 mb-4">
            The critical data point for restaurant owners is not prevalence — it is avoidance. 60% of young adults aged
            16-25 with food allergies avoid eating out entirely. 42% of all food-allergic adults have reduced or stopped
            dining out. These are customers who want to eat in restaurants but cannot find venues they trust. The market is
            not saturated — it is actively being avoided by the very customers who would be most loyal if their needs were
            met.
          </p>

          <p className="text-gray-700 mb-6">
            Hospital admissions for anaphylaxis reached 4,323 in 2023/24, a 154% increase over 20 years. The allergy
            community is acutely aware of these statistics. Every news report of a restaurant allergen incident reinforces
            the fear that keeps allergic diners at home. Restaurants that demonstrably manage allergens well — with clear
            written information, transparent cross-contamination communication, and systems that prove ongoing verification
            — stand out in this context. They become the exception that allergy customers seek out, trust, and return to.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Why Allergy Customers Are Uniquely Valuable</h2>

          <p className="text-gray-700 mb-4">
            Allergy customers do not behave like average diners. Three characteristics make them exceptionally valuable
            to restaurants that earn their trust.
          </p>

          <p className="text-gray-700 mb-4">
            First, extraordinary loyalty. 86% of food-allergic consumers say their restaurant loyalty is directly influenced
            by allergen accommodation quality. When a person with a severe nut allergy finds a restaurant where they feel
            safe — where the allergen information is clear, the staff are knowledgeable, and the kitchen manages
            cross-contamination — they return. They return because their alternative options are limited, because finding a
            trusted venue takes significant effort, and because the relief of dining without anxiety is valuable enough to
            create deep loyalty. This loyalty is not easily disrupted by competitors because switching restaurants means
            undertaking the trust-building process from scratch.
          </p>

          <p className="text-gray-700 mb-4">
            Second, reduced price sensitivity. Only 39% of food-allergic consumers prioritise price when choosing a
            restaurant, compared to 65% of non-allergic diners. Safety and trust outweigh price for this segment. This
            means allergy-friendly restaurants can maintain standard or premium pricing without losing allergy customers —
            they are not competing on cost but on capability. A restaurant that charges £2 more per main course but provides
            excellent allergen management will retain allergy customers who would switch away from a cheaper competitor with
            poor allergen practices.
          </p>

          <p className="text-gray-700 mb-6">
            Third, the group dining multiplier. 44% of non-allergic consumers consider allergy accommodations when choosing
            where to eat with friends or family. This means one allergy customer in a group of four makes your allergen
            policy relevant to all four covers. The allergic person does not dine alone — they bring partners, families,
            friends, and colleagues who all eat at your restaurant because it is the venue the allergic person trusts. A
            single allergy customer profile can represent 3-4x its face value in covers per visit.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Compliance-to-Retention Gap</h2>

          <p className="text-gray-700 mb-4">
            Every allergen tool currently available in the UK stops at compliance. They help you declare allergens, generate
            matrices, and pass{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO inspections
            </Link>
            . This is necessary but insufficient. Compliance gets you to legal baseline; it does not capture the customer
            relationship.
          </p>

          <p className="text-gray-700 mb-4">
            The gap is between &quot;we can tell you what allergens are in our food&quot; and &quot;we know you, we remember
            your allergies, and we can tell you when we add something new that&apos;s safe for you.&quot; The first is
            compliance. The second is retention. No UK allergen tool bridges this gap except SafeEat.
          </p>

          <p className="text-gray-700 mb-6">
            The mechanics of the gap are straightforward. A customer scans your QR code, filters by their allergens, and
            orders a safe meal. They leave. They may return — or they may try another restaurant next time, start the
            allergen-checking process from scratch, and never think about your venue again. Without capturing the
            relationship, you rely on the customer remembering you, finding you again, and choosing you over alternatives.
            With a saved allergen profile and marketing opt-in, you can reach them directly — &quot;We just added three new
            gluten-free mains&quot; — and give them a reason to return.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How SafeEat Bridges the Gap</h2>

          <p className="text-gray-700 mb-4">
            SafeEat combines two functions that no other UK platform offers together: allergen compliance and customer
            retention.
          </p>

          <p className="text-gray-700 mb-4">
            The compliance side handles everything restaurants need for legal obligations: a digital allergen menu accessible
            via QR code, covering all{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>
            , with real-time updates when menus change, automated verification reminders, and a timestamped audit trail for
            EHO inspections. This meets the current Food Information Regulations, the FSA&apos;s March 2025 best practice
            guidance, and the anticipated requirements of{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen&apos;s Law
            </Link>.
          </p>

          <p className="text-gray-700 mb-4">
            The retention side is what makes SafeEat unique. When a customer saves their allergen profile against your venue,
            three things happen. First, their experience improves — on return visits, their allergies are already loaded, so
            filtering is instant. Second, you build a database — your dashboard shows how many allergy customers have profiled
            with you, their allergen distribution, and their visit patterns. Third, with marketing opt-in, you gain a direct
            communication channel to customers who are demonstrably interested in your restaurant and specifically in
            allergen-safe dining.
          </p>

          <p className="text-gray-700 mb-6">
            The marketing capability is where compliance becomes revenue. When you add a new{' '}
            <Link to="/guides/gluten-free-menu-restaurant" className="text-emerald-700 underline hover:text-emerald-900">
              gluten-free
            </Link>{' '}
            main course, you can notify every customer who has flagged gluten as their allergen and opted in to marketing.
            When you introduce a{' '}
            <Link to="/guides/nut-allergy-restaurant-guide" className="text-emerald-700 underline hover:text-emerald-900">
              nut-free
            </Link>{' '}
            dessert menu, you can reach every nut-allergic customer who trusts your venue. This is not spam — it is targeted,
            permission-based communication about exactly the information these customers want. &quot;Your trusted restaurant
            now has more options for you&quot; is a message that drives return visits, not unsubscribes.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Revenue Case</h2>

          <p className="text-gray-700 mb-4">
            Research suggests restaurants can see a 10-15% revenue increase by becoming trusted allergy-safe destinations.
            This revenue comes from three sources.
          </p>

          <p className="text-gray-700 mb-4">
            New customer acquisition: capturing diners from the 60% of young allergic adults and 42% of all allergic adults
            who currently avoid eating out. These are customers no restaurant in your area is actively pursuing with a
            dedicated retention strategy. By being the venue that demonstrably manages allergens well and builds customer
            relationships around that capability, you capture market share that your competitors are not even competing for.
          </p>

          <p className="text-gray-700 mb-4">
            Increased visit frequency: allergy customers who trust your restaurant visit more often than average because
            their alternative options are limited. If a customer with coeliac disease has three trusted restaurants in their
            area and eats out twice a week, each restaurant gets approximately 35 visits per year. If you are the only
            trusted option, that customer visits you 100+ times per year. Building trust through excellent allergen management
            directly increases your share of their dining occasions.
          </p>

          <p className="text-gray-700 mb-6">
            Group booking capture: the 44% multiplier means that allergy customers bring groups. A nut-allergic customer
            who books a birthday dinner for 8 people at your restaurant — because yours is the venue they trust — represents
            8 covers you would not have received without your allergen capability. Over a year, the group dining effect from
            even a modest allergy customer base generates meaningful incremental revenue.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Building Community Trust</h2>

          <p className="text-gray-700 mb-4">
            Allergy communities are tight-knit and actively share information. Coeliac UK forums, food allergy Facebook
            groups, allergy parent networks, and condition-specific social media accounts are the primary channels through
            which allergy customers discover and recommend restaurants. A positive recommendation in these communities is
            worth more than any paid advertising because it carries the credibility of personal experience.
          </p>

          <p className="text-gray-700 mb-4">
            To earn these recommendations, consistency matters more than perfection. A restaurant that consistently provides
            accurate allergen information, communicates cross-contamination risks honestly, and treats allergen queries
            seriously builds trust over time. A single bad experience — inaccurate information, dismissive staff, or an
            allergen incident — can undo years of trust and spread through allergy communities rapidly. The audit trail and
            verification system in SafeEat supports consistency by ensuring allergen information is regularly reviewed and
            never allowed to drift from reality.
          </p>

          <p className="text-gray-700 mb-6">
            The{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              consequences of allergen failure
            </Link>{' '}
            are severe — fines, prosecution, prison. But the consequences of allergen excellence are equally significant in
            the positive direction: a loyal, less price-sensitive, group-dining customer base that actively markets your
            restaurant to their community for free. The choice between compliance-as-cost and compliance-as-opportunity is
            the difference between a restaurant that meets minimum standards and one that builds a competitive advantage from
            the same regulatory requirement.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Turn compliance into your competitive advantage</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat is the only UK allergen tool that combines compliance with customer retention. Digital allergen menus,
              saved customer profiles, marketing opt-ins, and a database of loyal allergy customers — from £29.99/month.
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
              <li><Link to="/guides/nut-allergy-restaurant-guide" className="text-emerald-700 underline hover:text-emerald-900">Nut Allergy Restaurant Guide</Link></li>
              <li><Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">Owen&apos;s Law</Link></li>
              <li><Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">EHO Allergen Inspection Guide</Link></li>
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
