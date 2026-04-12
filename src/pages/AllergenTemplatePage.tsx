import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What is an allergen menu template?',
    a: 'An allergen menu template is a structured document that maps every dish on your menu against the 14 regulated allergens. It typically takes the form of a matrix or grid with dishes listed down the left side and the 14 allergens listed across the top, with marks indicating which allergens each dish contains. It serves as both a customer-facing reference and an internal compliance document for EHO inspections.',
  },
  {
    q: 'Is a paper allergen menu template sufficient for UK compliance?',
    a: 'A paper allergen menu template meets the minimum legal requirement — you must be able to provide allergen information when a customer asks. However, paper templates have significant practical limitations: they become outdated when menus change, they can be lost or damaged, they require manual updating, and they do not provide a timestamped audit trail. The FSA\'s March 2025 best practice guidance recommends proactive written disclosure, which digital systems handle more effectively than paper.',
  },
  {
    q: 'What format should my allergen menu template use?',
    a: 'The most common format is a matrix with dishes on one axis and the 14 allergens on the other. You can use checkmarks, Xs, or colour coding to indicate allergen presence. Some businesses prefer a list format that notes allergens beneath each dish name. The FSA does not mandate a specific format — the requirement is that allergen information is accurate, accessible, and covers all 14 regulated allergens for every item you serve.',
  },
  {
    q: 'How often should I update my allergen menu template?',
    a: 'You should update your allergen template every time your menu changes, every time you change a supplier or ingredient, every time a recipe is modified, and at regular review intervals regardless — ideally weekly, at minimum monthly. Failure to keep your allergen information current is the second most common allergen compliance failure identified during EHO inspections.',
  },
  {
    q: 'Do I need separate allergen templates for food and drinks?',
    a: 'Your allergen information must cover everything you serve, including drinks. However, you can choose whether to use a single combined template or separate food and drinks templates. Drinks that commonly contain allergens include wine and cider (sulphites), beer and lager (cereals containing gluten), cocktails (milk, eggs, nuts), coffee drinks (milk), and smoothies (milk, nuts). A combined template is simpler to maintain and ensures nothing is overlooked.',
  },
  {
    q: 'Should I include "may contain" warnings in my allergen template?',
    a: '"May contain" (precautionary allergen labelling) is voluntary but strongly recommended where genuine cross-contamination risks exist. Your template should distinguish between "contains" (the allergen is a deliberate ingredient) and "may contain" (there is a risk of cross-contamination). EHO officers increasingly expect this distinction, and customers rely on it to make informed decisions about their food.',
  },
  {
    q: 'What are the limitations of spreadsheet-based allergen templates?',
    a: 'Spreadsheet templates (Excel, Google Sheets) are better than nothing but have several limitations: they require manual updating and are easily forgotten, they do not generate audit trails with timestamps, they are not customer-facing (you cannot give a customer your internal spreadsheet), version control is difficult (which version is current?), and they do not integrate with your customer-facing menu. They also cannot filter dishes by allergen for individual customers.',
  },
  {
    q: 'Can I use a free allergen template from the FSA?',
    a: 'The FSA provides a free allergen information template on its website as part of its guidance for food businesses. It covers the basics — listing dishes against the 14 allergens — but it is a static document that requires manual maintenance. It does not provide customer-facing allergen filtering, audit trails, verification reminders, or customer profile functionality. It is a reasonable starting point for very small businesses but is not a long-term compliance solution.',
  },
  {
    q: 'How do I handle daily specials in my allergen template?',
    a: 'Daily specials must be included in your allergen information before they are offered to customers. If you run a paper template, you need a system for adding specials to it each day — a separate specials allergen sheet, for example. Digital systems like SafeEat handle this more efficiently: you add the special through the dashboard with its allergens, and it immediately appears on the customer-facing menu. When the special ends, you deactivate it.',
  },
  {
    q: 'Do food delivery platforms accept my allergen template?',
    a: 'Third-party delivery platforms (Deliveroo, Uber Eats, Just Eat) have their own allergen information fields that you must populate separately. Your internal allergen template should be the source of truth, but you are responsible for ensuring that the allergen information on each platform matches your actual menu. When your menu changes, you must update both your internal template and every delivery platform listing.',
  },
  {
    q: 'What happens during an EHO inspection if I only have a template and no audit trail?',
    a: 'An allergen template without a verification audit trail demonstrates that you created allergen documentation at some point, but it does not prove that the information is current or actively maintained. EHO officers increasingly ask when allergen information was last reviewed and by whom. Without dated verification records, you cannot demonstrate ongoing due diligence, which weakens your compliance position significantly.',
  },
  {
    q: 'Is a digital allergen menu better than a printed allergen template?',
    a: 'For most food businesses, yes. Digital allergen menus update in real time, are accessible to customers via QR code without shared physical menus, provide automatic audit trails with timestamps, send verification reminders, allow customers to filter dishes by their specific allergens, and can build customer profiles for retention. The main advantage of paper is simplicity for very small operations with static menus. For any business with regular menu changes or multiple dishes, digital is more reliable and less prone to human error.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Allergen Menu Template for UK Restaurants: Free Guide and Better Alternatives',
      description:
        'Free allergen menu template guidance for UK restaurants, cafés, and takeaways. Covers the 14 regulated allergens, template formats, limitations of paper systems, and how digital allergen menus replace manual templates.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/allergen-menu-template',
      image: 'https://safeeat.co.uk/og-allergen-template.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: 'Allergen Menu Template', item: 'https://safeeat.co.uk/guides/allergen-menu-template' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'Allergen Menu Template for UK Restaurants',
      url: 'https://safeeat.co.uk/guides/allergen-menu-template',
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
      name: 'Allergen Template Terminology',
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Allergen Matrix',
          description:
            'A grid or chart listing menu items against the 14 regulated allergens, showing which allergens each dish contains.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Precautionary Allergen Labelling',
          description:
            'Voluntary "may contain" warnings indicating a risk of allergen cross-contamination during preparation.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Digital Allergen Menu',
          description:
            'An online allergen information system, typically accessed via QR code, that allows real-time updates and customer-side allergen filtering.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Allergen Verification',
          description:
            'The process of reviewing and confirming that allergen information is accurate and current, typically documented with timestamps.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Create an Allergen Menu Template',
      description: 'Step-by-step guide to creating an allergen menu template for your UK restaurant.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'List every menu item',
          text: 'Document every dish, drink, sauce, condiment, side, garnish, special, and seasonal item you serve. Include children\'s portions if ingredients differ from adult versions.',
        },
        {
          '@type': 'HowToStep',
          name: 'Audit ingredients for each item',
          text: 'For each menu item, list every ingredient including sub-ingredients in composite products. Obtain supplier specifications for any pre-made or packaged ingredients.',
        },
        {
          '@type': 'HowToStep',
          name: 'Map allergens against the 14 categories',
          text: 'Check each ingredient against the 14 regulated allergens. Mark "contains" where the allergen is a deliberate ingredient and "may contain" where cross-contamination risk exists.',
        },
        {
          '@type': 'HowToStep',
          name: 'Choose your format',
          text: 'Create a matrix (grid), list, or digital menu. For paper, use a clear grid with dishes down the left and allergens across the top. For digital, use a system like SafeEat that allows customer-side filtering.',
        },
        {
          '@type': 'HowToStep',
          name: 'Make it accessible',
          text: 'Place your allergen information where customers can see it before ordering. Options include QR codes at tables, printed matrices at the counter, allergen symbols on menus, or clear signage directing customers to ask staff.',
        },
        {
          '@type': 'HowToStep',
          name: 'Set up a review schedule',
          text: 'Establish a regular verification schedule — weekly or monthly — and document each review with the date and reviewer name. This creates the audit trail that EHO officers look for during inspections.',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu management that replaces manual templates with real-time allergen filtering and automated audit trails.',
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

export default function AllergenTemplatePage() {
  return (
    <>
      <Helmet>
        <title>Allergen Menu Template UK | Free Guide for Restaurants 2026 | SafeEat</title>
        <meta
          name="description"
          content="Free allergen menu template guide for UK restaurants. Learn how to create an allergen matrix, the limitations of paper templates, and how digital allergen menus replace manual processes."
        />
        <link rel="canonical" href="https://safeeat.co.uk/guides/allergen-menu-template" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Allergen Menu Template UK | Free Guide | SafeEat" />
        <meta
          property="og:description"
          content="Free allergen menu template guidance for UK restaurants. Create your allergen matrix or switch to a digital system that updates in real time."
        />
        <meta property="og:image" content="https://safeeat.co.uk/og-allergen-template.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/allergen-menu-template" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergen Menu Template UK | SafeEat" />
        <meta
          name="twitter:description"
          content="Free allergen menu template guide. Create your allergen matrix or switch to a digital allergen menu."
        />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-allergen-template.jpg" />
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
            <li className="text-gray-900 font-medium">Allergen Menu Template</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {/* Quick Answer Box */}
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              An allergen menu template is a matrix that maps every dish against the 14 regulated allergens. You can create
              one as a spreadsheet or printed chart, but paper templates require manual updating and provide no audit trail.
              Digital allergen menus like SafeEat replace manual templates with real-time updates, customer-side allergen
              filtering via QR code, and automated verification logs for EHO inspections — from £29.99/month.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Allergen Menu Template for UK Restaurants: Free Guide and Better Alternatives
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
            Every UK food business needs a system for declaring allergens. The most common approach is an allergen menu
            template — a document that lists your dishes alongside the{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              14 regulated allergens
            </Link>
            . This guide explains how to create an effective allergen template, the limitations of paper-based systems, and
            why an increasing number of restaurants are replacing manual templates with digital allergen menus that update in
            real time and generate the audit trails EHO officers now expect.
          </p>

          <p className="text-gray-700 mb-6">
            The need for reliable allergen information has never been more acute. The Food Standards Agency reports that 2.4
            million UK adults have clinically confirmed food allergies, and research shows that 60% of young allergic diners
            avoid eating out because they do not trust restaurants to manage their allergies safely. For restaurant owners,
            accurate allergen information is simultaneously a legal requirement, a customer safety issue, and — when done
            well — a competitive advantage that brings allergy-conscious diners through your door.
          </p>

          {/* What an Allergen Template Looks Like */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">What an Allergen Menu Template Looks Like</h2>

          <p className="text-gray-700 mb-4">
            An allergen menu template is typically a grid or matrix. Dishes are listed down the left column. The 14 regulated
            allergens are listed across the top row. Each cell in the grid indicates whether that dish contains that allergen.
            Common notation systems include checkmarks for "contains", crosses for "does not contain", and a different symbol
            (often "MC" or a triangle) for "may contain" due to cross-contamination risk.
          </p>

          <p className="text-gray-700 mb-4">
            A well-structured template groups dishes by category — starters, mains, desserts, sides, drinks — to make it
            easier for both staff and customers to find the information they need. Each category should include every item
            available, including daily specials (updated each day), seasonal dishes, children's portions (if ingredients differ),
            sauces and condiments served alongside main dishes, and any off-menu items that staff might offer.
          </p>

          <p className="text-gray-700 mb-4">
            The template must be comprehensive. Every item that a customer might consume at your premises needs to be included.
            This means main dishes, sides, bread, butter, garnishes, dressings, drinks, and any complementary items such as
            mints or complimentary snacks. EHO officers specifically check for gaps — a common finding during inspections is
            that sauces, condiments, or sides are missing from the allergen matrix.
          </p>

          <p className="text-gray-700 mb-6">
            Accuracy is paramount. Every allergen declaration must be verified against actual ingredient specifications from
            your suppliers. A template based on assumptions rather than verified ingredient data is worse than no template at
            all, because it gives a false sense of security. The template must be treated as a living document that changes
            whenever your menu, recipes, or suppliers change.
          </p>

          {/* How to Create One */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Create an Allergen Menu Template</h2>

          <p className="text-gray-700 mb-4">
            Creating an allergen template is a methodical process. It requires you to examine every ingredient in every dish
            and map it against the 14 allergen categories. Do not rush this process — errors in your allergen template put
            customers at risk and expose your business to prosecution.
          </p>

          <p className="text-gray-700 mb-4">
            Begin by listing every item on your menu. Include everything: starters, mains, desserts, sides, sauces, dressings,
            garnishes, bread, drinks, and specials. If you serve children's meals with different ingredients, list those
            separately. If you offer condiments at the table (ketchup, mayonnaise, vinegar), include those. The goal is a
            complete inventory of everything a customer might eat or drink at your establishment.
          </p>

          <p className="text-gray-700 mb-4">
            For each item, document every ingredient. This includes sub-ingredients in composite products. A "tomato sauce"
            might contain tomatoes, olive oil, garlic, onion, sugar, salt, and basil — but the garlic granules might also
            contain celery seed powder, and the olive oil might have been blended with soybean oil by the supplier. You need
            supplier specifications for every ingredient that is not a single whole food. Contact your suppliers for full
            ingredient lists and allergen declarations for every product you buy.
          </p>

          <p className="text-gray-700 mb-4">
            Map each ingredient against the 14 allergen categories. Check for obvious allergens (milk in cream, gluten in
            flour) and hidden allergens (wheat in soy sauce, celery in stock cubes, egg in mayonnaise, sulphites in wine).
            The{' '}
            <Link to="/guides/14-allergens-uk" className="text-emerald-700 underline hover:text-emerald-900">
              complete guide to the 14 allergens
            </Link>{' '}
            covers hidden sources for each allergen category in detail.
          </p>

          <p className="text-gray-700 mb-4">
            Assess cross-contamination risks separately from ingredient-based allergens. If you fry battered fish and chips
            in the same fryer, the chips carry a "may contain" risk for cereals containing gluten, fish, and egg (if the
            batter contains egg). Shared preparation surfaces, shared utensils, and airborne allergens (flour dust) all
            create cross-contamination risks that should be documented.
          </p>

          <p className="text-gray-700 mb-6">
            Finally, make your completed template accessible. For paper templates, laminate copies for the kitchen and
            customer-facing areas. For spreadsheets, print updated copies whenever changes are made. For digital systems
            like SafeEat, your allergen information is always accessible via QR code — no printing, no version confusion,
            no risk of presenting outdated information.
          </p>

          {/* Limitations of Paper Templates */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Limitations of Paper and Spreadsheet Templates</h2>

          <p className="text-gray-700 mb-4">
            Paper allergen templates meet the minimum legal requirement, but they carry significant risks that every restaurant
            owner should understand before relying on them as their primary compliance system.
          </p>

          <p className="text-gray-700 mb-4">
            The most critical limitation is maintenance. Paper templates require someone to manually update them every time a
            menu changes, a recipe is modified, or a supplier substitutes an ingredient. In a busy restaurant, these updates
            are frequently missed or delayed. The result is allergen information that does not match what is actually being
            served — the most dangerous allergen compliance failure and the one most likely to result in prosecution.
          </p>

          <p className="text-gray-700 mb-4">
            Version control is another risk. When you print a new template after a menu change, are you certain that every
            copy of the old template has been removed? In kitchens, behind counters, in staff areas — outdated copies of
            allergen templates persist. A member of staff referring to an old template could give a customer incorrect
            allergen information. With paper, there is no single source of truth.
          </p>

          <p className="text-gray-700 mb-4">
            Paper templates provide no audit trail. When an{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              EHO officer asks when your allergen information was last reviewed
            </Link>
            , a paper template cannot answer that question. There is no timestamp, no record of who reviewed it, and no
            evidence that the review actually happened. Officers are trained to look for this evidence of ongoing management,
            and its absence is a significant compliance gap.
          </p>

          <p className="text-gray-700 mb-4">
            Customer experience is also affected. A paper allergen matrix requires the customer to scan a dense grid of
            checkmarks across 14 columns to identify which dishes are safe for them. If they have multiple allergies — which
            is common — this becomes a complex cross-referencing exercise. Compare this with a digital allergen menu where
            the customer selects their allergens and sees only the dishes they can safely eat. The difference in customer
            experience is substantial, and it directly affects whether allergy-conscious customers return.
          </p>

          <p className="text-gray-700 mb-6">
            Spreadsheet-based templates (Excel or Google Sheets) improve on paper by making updates easier, but they share
            many of the same limitations. They require someone to remember to update them. They do not generate audit trails.
            They are not customer-facing. And critically, they do not integrate with the customer experience — a spreadsheet
            on your laptop does not help a customer at a table deciding what to order.
          </p>

          {/* Digital Alternative */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Digital Allergen Menus: The Template Replacement</h2>

          <p className="text-gray-700 mb-4">
            Digital allergen menu systems like SafeEat replace manual templates entirely. Instead of maintaining a static
            document, you manage your menu through an online dashboard. Each dish is entered with its allergens, and the
            information is immediately available to customers via QR code. When you change a dish, the customer-facing menu
            updates in real time — no reprinting, no version confusion, no gaps.
          </p>

          <p className="text-gray-700 mb-4">
            The customer experience is transformative. A diner with allergies to nuts and milk scans your QR code, selects
            "nuts" and "milk" as their allergens, and instantly sees only the dishes they can safely eat. They do not need to
            decode a 14-column matrix. They do not need to ask a busy server. They do not need to trust that the person they
            spoke to understood their allergies correctly. The information is direct, personalised, and always current.
          </p>

          <p className="text-gray-700 mb-4">
            For the business, digital systems solve the maintenance problem. Updates happen through the dashboard and propagate
            immediately. There is one source of truth — the dashboard — so version confusion is eliminated. Staff can check
            allergen information on any device. And every verification creates a timestamped record in your audit trail,
            building the compliance evidence that EHO officers increasingly expect.
          </p>

          <p className="text-gray-700 mb-6">
            SafeEat adds a dimension that no template — paper or digital — can offer: customer retention. When a customer
            saves their allergen profile against your venue, you gain a loyal diner who has actively chosen your restaurant
            because they trust your allergen management. With marketing opt-in, you can notify them about new allergen-safe
            dishes. This turns allergen compliance from a cost centre into a revenue driver — a concept that paper templates
            cannot even approximate.
          </p>

          {/* Cost Comparison */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Cost Comparison: Templates vs Digital Systems</h2>

          <p className="text-gray-700 mb-4">
            The perceived cost advantage of paper templates is misleading when you account for the total cost of compliance.
            A paper template itself is free to create, but the ongoing costs are significant.
          </p>

          <p className="text-gray-700 mb-4">
            Staff time is the largest hidden cost. Maintaining a paper template — updating it after menu changes, reprinting
            laminated copies, checking that old versions are removed, training staff on how to read and present it — requires
            hours each month. If you pay an allergen consultant to create and update your matrix, fees typically range from
            £200-£500 per audit plus ongoing charges for updates.
          </p>

          <p className="text-gray-700 mb-4">
            The risk cost is even higher. A single allergen incident can result in prosecution with{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              fines reaching £43,000
            </Link>
            , loss of your Food Hygiene Rating, reputational damage that takes years to recover from, and — in the worst
            cases — custodial sentences. The gap between what a paper template provides and what is actually needed for
            robust compliance creates this risk.
          </p>

          <p className="text-gray-700 mb-6">
            SafeEat costs £29.99 per month. For that, you get a digital allergen menu accessible via QR code, real-time menu
            management, automated verification reminders, a timestamped audit trail, customer allergen profiles with marketing
            opt-ins, and a system that meets both the current voluntary FSA guidance and any future mandatory requirements
            under{' '}
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen's Law
            </Link>
            . Against the cost of consultant fees, staff time, and prosecution risk, the return on investment is immediate.
          </p>

          {/* Regulatory Direction */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Where Regulation Is Heading</h2>

          <p className="text-gray-700 mb-4">
            The FSA's March 2025 voluntary best practice guidance recommends that food businesses provide written allergen
            information proactively rather than waiting for customers to ask. This guidance is being evaluated through spring
            2026. If uptake is insufficient — and given that 47% of small food businesses still have no written allergen
            information at all, it almost certainly will be — mandatory legislation is expected to follow.
          </p>

          <p className="text-gray-700 mb-4">
            This follows the same pattern as{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha's Law
            </Link>
            , where voluntary measures were attempted, found insufficient, and replaced with mandatory requirements. The
            direction is clear: the era of "just tell them to ask a member of staff" is ending. Written, proactive allergen
            disclosure is becoming the expected standard, and mandatory legislation will enforce it.
          </p>

          <p className="text-gray-700 mb-6">
            For businesses currently using paper templates, this means your current system may become non-compliant. A
            laminated sheet on the counter meets the current minimum requirement, but it does not meet the FSA's best practice
            guidance and will likely not meet mandatory requirements when they arrive. Investing in a digital system now
            positions your business ahead of regulation rather than scrambling to comply when the law changes.
          </p>

          {/* Making the Switch */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Switching from a Template to SafeEat</h2>

          <p className="text-gray-700 mb-4">
            Moving from a paper or spreadsheet template to SafeEat takes less than an hour for most restaurants. Sign up,
            enter your venue details, add your dishes with their allergens, and place your QR code at tables. Your existing
            allergen matrix serves as the input — you already know which allergens each dish contains, so entering them into
            SafeEat is straightforward data entry rather than a new compliance exercise.
          </p>

          <p className="text-gray-700 mb-4">
            Once set up, ongoing management is simpler than maintaining a paper template. Menu changes happen through the
            dashboard and propagate instantly. The system reminds you when verification is due. Your audit trail builds
            automatically. And customers can filter your menu by their allergies without requiring staff intervention,
            reducing the burden on your team during busy service.
          </p>

          <p className="text-gray-700 mb-6">
            The transition also unlocks the customer retention features that paper templates cannot provide. As customers
            save their allergen profiles, you build a database of allergy-conscious diners — a customer segment with high
            loyalty potential that no other UK allergen tool helps you capture. This is the fundamental difference between
            treating allergens as a compliance checkbox and treating them as a business growth opportunity.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Replace your allergen template in 5 minutes</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat replaces paper allergen templates with a digital menu that customers filter by their allergies,
              plus automated audit trails and verification reminders — from £29.99/month.
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
                <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
                  EHO Allergen Inspection Guide for UK Restaurants
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
