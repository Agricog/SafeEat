import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const FAQ_ITEMS = [
  {
    q: 'What are the 14 allergens UK restaurants must declare?',
    a: 'The 14 regulated allergens under the Food Information Regulations 2014 are: celery, cereals containing gluten (wheat, rye, barley, oats), crustaceans, eggs, fish, lupin, milk, molluscs, mustard, nuts (almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, macadamia nuts), peanuts, sesame, soybeans, and sulphur dioxide (sulphites at concentrations above 10mg/kg or 10mg/litre).',
  },
  {
    q: 'Do I need to declare allergens in drinks as well as food?',
    a: 'Yes. All 14 allergens must be declared in drinks as well as food. Common allergen risks in drinks include sulphites in wine and cider, milk in cocktails and coffee drinks, cereals containing gluten in beer, nuts in liqueurs, and egg in some wines that use egg white for fining. If you serve any drink that contains or may contain a regulated allergen, this must be declared.',
  },
  {
    q: 'What is the difference between "contains" and "may contain" allergens?',
    a: '"Contains" means the allergen is a deliberate ingredient in the dish. "May contain" (also called precautionary allergen labelling or PAL) indicates a risk of cross-contamination during preparation, cooking, or storage — the allergen is not an ingredient but could be present due to shared equipment or preparation areas. "Contains" declarations are legally mandatory. "May contain" warnings are voluntary but strongly recommended where genuine cross-contamination risks exist, and are increasingly expected by EHO officers.',
  },
  {
    q: 'Are tree nuts and peanuts the same allergen category?',
    a: 'No. Peanuts (groundnuts) and tree nuts are separate allergen categories under UK law. Peanuts are legumes, not true nuts. Tree nuts include almonds, hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts, and macadamia nuts. A dish containing peanut oil must declare peanuts. A dish containing almond flour must declare nuts. Some individuals are allergic to peanuts but not tree nuts, or vice versa, so accurate differentiation is essential.',
  },
  {
    q: 'Do I need to declare allergens for specials and seasonal dishes?',
    a: 'Yes. Every item offered to customers must have allergen information available, including daily specials, seasonal dishes, limited-time offers, off-menu items, children\'s portions (if ingredients differ), sauces, sides, garnishes, and condiments. EHO officers specifically check whether specials are included in allergen documentation, as these are frequently missed.',
  },
  {
    q: 'What happens if I do not declare allergens correctly?',
    a: 'Failure to provide accurate allergen information is a criminal offence under the Food Information Regulations 2014 and the Food Safety Act 1990. Penalties range from written warnings and improvement notices to prosecution with unlimited fines. Recent prosecutions have resulted in fines of £43,000 for an independent restaurant and custodial sentences where allergen failures caused death. Beyond legal penalties, allergen incidents cause severe reputational damage and loss of customer trust.',
  },
  {
    q: 'How should I present allergen information to customers?',
    a: 'The law requires allergen information to be available to customers before they order. This can be through allergen labelling on menus, a separate allergen matrix, digital menus accessible via QR code, or clear signage directing customers to ask staff (with written records available when they do). The FSA\'s March 2025 best practice guidance recommends proactive written disclosure rather than relying on customers to request information verbally.',
  },
  {
    q: 'Do I need to worry about allergens in cooking oil?',
    a: 'Yes. Highly refined oils (such as refined peanut oil or refined soybean oil) are exempt from allergen labelling under EU-retained law because the refining process removes allergenic proteins. However, cold-pressed, unrefined, or crude oils do contain allergenic proteins and must be declared. If you are unsure whether your oil is fully refined, declare the allergen. Additionally, if you reuse oil that has previously been used to cook allergen-containing food (e.g., battered fish in a fryer), the oil itself becomes a cross-contamination risk.',
  },
  {
    q: 'What is the legal basis for allergen requirements in UK restaurants?',
    a: 'UK allergen requirements derive from several pieces of legislation. The Food Information Regulations 2014 (FIR) implement EU Regulation 1169/2011 (retained in UK law after Brexit) and require allergen information for non-prepacked food. The Food Safety Act 1990 provides the enforcement framework. Natasha\'s Law (2021) added specific requirements for prepacked for direct sale (PPDS) food. Owen\'s Law is expected to introduce further requirements for non-prepacked food served in restaurants and cafés.',
  },
  {
    q: 'Do I need to declare allergens for food sold through delivery platforms?',
    a: 'Yes. Allergen information must be available at the point of ordering, which includes online ordering through delivery platforms like Deliveroo, Uber Eats, and Just Eat. While these platforms have their own allergen information fields, the legal responsibility for accuracy remains with you as the food business operator. You must ensure that allergen information on third-party platforms matches your actual menu and is updated whenever your menu changes.',
  },
  {
    q: 'How often should I review my allergen information?',
    a: 'You should review allergen information every time your menu changes, every time you change a supplier or ingredient, and at regular intervals regardless — weekly or monthly at minimum. The FSA recommends regular documented reviews as part of your food safety management system. SafeEat automates verification reminders and creates a timestamped audit trail of every review, ensuring your allergen information stays current.',
  },
  {
    q: 'What allergen training do my staff need?',
    a: 'All staff who handle, prepare, or serve food must understand allergen risks. Training should cover the 14 regulated allergens and where they commonly appear, your specific menu allergens, how to respond to customer allergen queries, cross-contamination prevention, what to do in an allergic reaction emergency, and how to use your allergen management system. Training must be documented with dates and should be refreshed at least annually and whenever significant menu changes occur. EHO officers test staff knowledge directly during inspections.',
  },
]

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'The 14 Allergens UK Restaurants Must Declare: Complete Guide 2026',
      description:
        'Complete guide to the 14 regulated food allergens that UK restaurants, cafés, and takeaways must declare under the Food Information Regulations 2014. Covers every allergen, where they hide, and how to declare them correctly.',
      author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' },
      datePublished: '2026-04-12',
      dateModified: '2026-04-12',
      mainEntityOfPage: 'https://safeeat.co.uk/guides/14-allergens-uk',
      image: 'https://safeeat.co.uk/og-14-allergens.jpg',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
        { '@type': 'ListItem', position: 3, name: '14 Allergens UK', item: 'https://safeeat.co.uk/guides/14-allergens-uk' },
      ],
    },
    {
      '@type': 'WebPage',
      name: 'The 14 Allergens UK Restaurants Must Declare',
      url: 'https://safeeat.co.uk/guides/14-allergens-uk',
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
      name: 'UK Food Allergen Terminology',
      definedTerm: [
        {
          '@type': 'DefinedTerm',
          name: 'Food Information Regulations 2014',
          description:
            'UK legislation requiring food businesses to provide allergen information for non-prepacked food, implementing EU Regulation 1169/2011.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Allergen Matrix',
          description:
            'A chart or document listing all menu items against the 14 regulated allergens, indicating which allergens each dish contains.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Precautionary Allergen Labelling',
          description:
            'Voluntary "may contain" warnings indicating a risk of allergen cross-contamination, distinct from mandatory "contains" declarations.',
        },
        {
          '@type': 'DefinedTerm',
          name: 'Cross-Contamination',
          description:
            'The unintentional transfer of an allergen from one food to another during storage, preparation, or cooking.',
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Declare the 14 Allergens in Your Restaurant',
      description: 'Step-by-step guide to declaring the 14 regulated allergens in your UK restaurant menu.',
      step: [
        {
          '@type': 'HowToStep',
          name: 'Audit every ingredient',
          text: 'Review every ingredient in every dish on your menu, including sauces, garnishes, sides, and drinks. Check supplier specifications for each ingredient to identify allergen content.',
        },
        {
          '@type': 'HowToStep',
          name: 'Map allergens to dishes',
          text: 'Create an allergen matrix listing each dish against all 14 regulated allergens. Mark which allergens are present as ingredients and which represent cross-contamination risks.',
        },
        {
          '@type': 'HowToStep',
          name: 'Assess cross-contamination risks',
          text: 'Identify where allergen cross-contact could occur during storage, preparation, and cooking. Document these risks and your procedures for managing them.',
        },
        {
          '@type': 'HowToStep',
          name: 'Make information accessible',
          text: 'Present your allergen information to customers before they order — through digital menus, printed allergen matrices, menu labelling, or clear signage directing them to ask staff.',
        },
        {
          '@type': 'HowToStep',
          name: 'Train your staff',
          text: 'Ensure every team member can identify the 14 allergens, knows which allergens are in your dishes, and understands how to handle allergen queries from customers.',
        },
        {
          '@type': 'HowToStep',
          name: 'Verify and maintain',
          text: 'Review your allergen information every time your menu changes and at regular intervals. Use SafeEat to create a timestamped audit trail proving ongoing verification.',
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'SafeEat',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'Digital allergen menu management covering all 14 UK regulated allergens with customer filtering and audit trails.',
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

export default function AllergensGuidePage() {
  return (
    <>
      <Helmet>
        <title>The 14 Allergens UK Restaurants Must Declare | Complete Guide 2026 | SafeEat</title>
        <meta
          name="description"
          content="Complete guide to the 14 regulated food allergens UK restaurants must declare under the Food Information Regulations 2014. Covers every allergen, hidden sources, cross-contamination, and how to comply."
        />
        <link rel="canonical" href="https://safeeat.co.uk/guides/14-allergens-uk" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="The 14 Allergens UK Restaurants Must Declare | SafeEat" />
        <meta
          property="og:description"
          content="Complete guide to the 14 regulated food allergens UK restaurants must declare. Covers every allergen, hidden sources, and how to comply."
        />
        <meta property="og:image" content="https://safeeat.co.uk/og-14-allergens.jpg" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/14-allergens-uk" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The 14 Allergens UK Restaurants Must Declare | SafeEat" />
        <meta
          name="twitter:description"
          content="Complete guide to all 14 regulated food allergens UK restaurants must declare under UK food law."
        />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-14-allergens.jpg" />
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
            <li className="text-gray-900 font-medium">14 Allergens UK</li>
          </ol>
        </nav>

        <article className="max-w-3xl mx-auto px-4 py-10">
          {/* Quick Answer Box */}
          <div id="quick-answer" className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <p className="text-sm font-semibold text-emerald-800 mb-2">Quick answer</p>
            <p className="text-gray-800">
              The 14 allergens UK restaurants must declare are: celery, cereals containing gluten, crustaceans, eggs, fish,
              lupin, milk, molluscs, mustard, nuts, peanuts, sesame, soybeans, and sulphur dioxide (sulphites). These must
              be declared for every dish under the Food Information Regulations 2014. Failure to provide accurate allergen
              information is a criminal offence with fines reaching £43,000.
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The 14 Allergens UK Restaurants Must Declare: Complete Guide for 2026
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
            Every food business in the United Kingdom — restaurants, cafés, takeaways, pubs, street food vendors, canteens, and
            catering companies — is legally required to provide accurate information about 14 specific allergens. These 14
            allergens were identified by the European Food Safety Authority as responsible for the vast majority of food allergy
            reactions and were codified into UK law through the Food Information Regulations 2014. Understanding each allergen,
            where it commonly hides in restaurant ingredients, and how to declare it correctly is fundamental to legal compliance
            and customer safety.
          </p>

          <p className="text-gray-700 mb-6">
            The consequences of getting allergen declarations wrong are severe. The Food Standards Agency reports that food
            allergies affect approximately 2.4 million adults in the UK with clinically confirmed conditions, and around 200,000
            people in the UK are hospitalised each year due to allergic reactions. For restaurant owners, inaccurate allergen
            information can result in customer harm, criminal prosecution, and fines that have reached £43,000 for independent
            businesses. This guide covers every one of the 14 allergens in detail, including the hidden sources that catch
            restaurants out.
          </p>

          {/* The 14 Allergens */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The 14 Regulated Allergens Explained</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">1. Celery</h3>
          <p className="text-gray-700 mb-4">
            Celery allergy covers the stalks, leaves, seeds, and celeriac (celery root). Hidden sources include stock cubes,
            soups, sauces, ready-made salads, crisps, some spice blends, Bloody Mary cocktails, and Waldorf salads. Celery
            salt — commonly used as a seasoning — must be declared. Many restaurant kitchens use celery as a base vegetable
            in stocks and mirepoix without considering it an allergen, but it must be declared whenever present.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">2. Cereals Containing Gluten</h3>
          <p className="text-gray-700 mb-4">
            This category covers wheat, rye, barley, oats, spelt, and kamut — plus any hybrid strains. Hidden sources extend
            far beyond obvious bread and pasta. Soy sauce contains wheat. Many gravies use wheat flour as a thickener. Beer
            and lager contain barley. Batter contains wheat. Breadcrumbs used for coating contain wheat. Some stock cubes
            contain wheat. Communion wafers contain wheat. Even some processed meats use wheat-based fillers. This is one of
            the most pervasive allergens in a restaurant kitchen and requires careful mapping across every dish.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3. Crustaceans</h3>
          <p className="text-gray-700 mb-4">
            Crustaceans include prawns, shrimp, crab, lobster, crayfish, scampi, and langoustine. Hidden sources include shrimp
            paste (common in Thai and Southeast Asian cooking), fish sauce (some varieties contain crustacean extract), bouillabaisse,
            bisques, paella, and some pre-made sauces and condiments. Cross-contamination risks are high in kitchens that handle
            both crustacean and non-crustacean seafood, particularly through shared fryers and preparation surfaces.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">4. Eggs</h3>
          <p className="text-gray-700 mb-4">
            Egg allergy covers all forms — whole egg, egg white, egg yolk, and any derivative including lecithin (when derived
            from egg), albumen, lysozyme, and ovomucin. Hidden sources are extensive: mayonnaise, many sauces (béarnaise,
            hollandaise, tartare), some pasta (fresh pasta typically contains egg), cakes and pastries, meringue, some breads,
            egg wash on pastry, some wines fined with egg white, marshmallows, and some processed meats. Egg is used as a
            binding agent in many dishes where it may not be obvious.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">5. Fish</h3>
          <p className="text-gray-700 mb-4">
            Fish allergy covers all species of finned fish. Hidden sources include Worcestershire sauce (contains anchovies),
            Caesar salad dressing (contains anchovies), some Asian sauces and condiments, fish sauce, fish stock used as a base
            in soups and risottos, some pizza toppings, and gentlemen's relish. Some individuals with fish allergy can tolerate
            certain species but not others — however, you must declare "fish" for any species present. Cross-contamination
            through shared fryers is a common risk.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">6. Lupin</h3>
          <p className="text-gray-700 mb-4">
            Lupin is the least well-known of the 14 allergens but is increasingly common in UK food production. Lupin flour and
            lupin seeds are used as a protein supplement in baked goods, pasta, sausages, and some gluten-free products. It is
            particularly common in continental European bread and pastries. Lupin is botanically related to peanuts, and some
            individuals with peanut allergy also react to lupin — cross-reactivity is estimated at 20-50%. Check ingredient
            labels on any continental baked goods or speciality flours you use.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">7. Milk</h3>
          <p className="text-gray-700 mb-4">
            Milk allergy covers cow's milk and products derived from it, including butter, cheese, cream, yoghurt, ghee, casein,
            whey, lactalbumin, and lactoglobulin. Hidden sources are pervasive: many margarines contain milk derivatives, some
            crisps use milk powder, chocolate contains milk, some processed meats contain milk proteins, many sauces and soups
            use milk or cream, and some breads contain milk. Note that milk allergy is different from lactose intolerance — lactose
            intolerance is a digestive issue, while milk allergy is an immune response that can be life-threatening.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">8. Molluscs</h3>
          <p className="text-gray-700 mb-4">
            Molluscs include mussels, oysters, clams, scallops, squid (calamari), snails (escargot), octopus, and abalone.
            Hidden sources include oyster sauce (widely used in Chinese and Asian cooking), some fish sauces, paella, seafood
            platters, and some pre-made Asian sauces. As with crustaceans, cross-contamination through shared cooking equipment
            in kitchens that handle multiple types of seafood is a significant risk.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">9. Mustard</h3>
          <p className="text-gray-700 mb-4">
            Mustard allergy covers mustard seeds, mustard powder, mustard flour, mustard oil, and prepared mustard. Hidden sources
            include salad dressings, marinades, sauces (many BBQ sauces contain mustard), pickles, chutneys, spice blends
            (including curry powder), sausages, processed meats, and some breads. Mustard is used as an emulsifier in some
            products, so it may not be listed as "mustard" on ingredient labels. Check for "mustard flour" or "mustard powder"
            in composite ingredients.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">10. Nuts (Tree Nuts)</h3>
          <p className="text-gray-700 mb-4">
            Tree nuts include almonds, hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts, and macadamia nuts
            (Queensland nuts). Hidden sources include pesto (contains pine nuts, which are seeds but cashews or walnuts are
            sometimes substituted), praline, marzipan, nougat, many desserts and cakes, some cereals, nut oils (cold-pressed
            oils retain allergenic proteins), and some Asian and Middle Eastern dishes. You must specify which tree nut is present
            — "contains nuts (almonds)" is more useful than just "contains nuts" — although the legal minimum is to declare "nuts".
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">11. Peanuts</h3>
          <p className="text-gray-700 mb-4">
            Peanuts (groundnuts) are legumes, not true nuts, and are a separate allergen category from tree nuts. Peanut allergy
            is one of the most common causes of fatal anaphylaxis. Hidden sources include peanut oil (unrefined — refined peanut
            oil is generally exempt), satay sauce, some Asian sauces and dishes, peanut butter as a thickener in soups and stews,
            some chocolate products, some ice creams, and groundnut flour in some baked goods. Cross-contamination with peanuts
            is a critical risk in kitchens that prepare Asian cuisine.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">12. Sesame</h3>
          <p className="text-gray-700 mb-4">
            Sesame covers sesame seeds, sesame oil, sesame paste (tahini), and sesame flour. Hidden sources include hummus
            (contains tahini), many breads and burger buns (sesame seed toppings), some Asian sauces and dressings, halva, some
            salads, falafel, and some spice blends including dukkah and za'atar. Sesame allergy has been increasing in prevalence
            in the UK, and it is particularly dangerous because even small amounts can trigger severe reactions. Cross-contamination
            from sesame seeds falling off bread products is a common risk in bakeries and kitchens.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">13. Soybeans</h3>
          <p className="text-gray-700 mb-4">
            Soybean allergy covers soybeans and all soy-derived products including soy sauce, tofu, tempeh, miso, soy flour,
            soy protein, soy lecithin, and edamame. Hidden sources are extremely widespread: most processed foods contain soy
            in some form. Check for soy in bread, chocolate, margarine, biscuits, sauces, ice cream, stock cubes, and processed
            meats. Soy lecithin is used as an emulsifier in many products and while some soy-allergic individuals tolerate
            lecithin, it must still be declared. Soybean oil that is fully refined is generally exempt.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">14. Sulphur Dioxide and Sulphites</h3>
          <p className="text-gray-700 mb-6">
            Sulphur dioxide (SO₂) and sulphites must be declared when present at concentrations above 10mg/kg or 10mg/litre in
            the finished product. They are used as preservatives. Hidden sources include wine (especially white wine), cider,
            beer, dried fruits (apricots, raisins, sultanas), some soft drinks, some sausages and burgers, some pickled foods
            and vinegars, and some pre-prepared salads. Sulphites are particularly problematic because they are present in many
            common ingredients and accumulate — a dish with wine sauce, dried fruit garnish, and a side salad dressed with
            vinegar may have significant total sulphite content even if each individual ingredient is below the threshold.
          </p>

          {/* Where Allergens Hide */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Where Allergens Hide in Restaurant Kitchens</h2>

          <p className="text-gray-700 mb-4">
            The individual allergen descriptions above identify hidden sources within specific ingredients, but there are
            broader patterns that catch restaurants out. Understanding these patterns helps you audit your menu more effectively.
          </p>

          <p className="text-gray-700 mb-4">
            Sauces and condiments are the most common source of undeclared allergens. A simple gravy may contain wheat (flour
            thickener), celery (stock base), and milk (cream finish). Mayonnaise contains egg. Soy sauce contains wheat and
            soybeans. Pesto contains nuts. Worcestershire sauce contains fish. Many restaurants accurately declare allergens in
            main dishes but forget to account for the sauces, dressings, and condiments served alongside them.
          </p>

          <p className="text-gray-700 mb-4">
            Composite ingredients — ingredients that are themselves made from multiple components — are another high-risk area.
            Stock cubes, spice blends, marinades, pre-made sauces, and seasoning mixes often contain multiple allergens that
            are not obvious from the product name. You must check supplier specifications for every composite ingredient and
            update your allergen information if your supplier changes their recipe.
          </p>

          <p className="text-gray-700 mb-4">
            Supplier substitutions represent an ongoing risk. If your regular supplier is out of stock and you use an alternative
            product, the allergen profile may differ. A different brand of bread may contain sesame when your usual brand does
            not. A different stock cube may contain celery. Any supplier change must trigger an allergen review of all affected
            dishes before those dishes are served to customers.
          </p>

          <p className="text-gray-700 mb-6">
            Cross-contamination during preparation is distinct from allergen content but equally important. Shared fryers
            (gluten from batter, crustaceans from prawns), shared chopping boards, shared utensils, airborne flour dust, and
            inadequate cleaning between allergen and non-allergen food preparation all create cross-contamination risks that
            should be communicated to customers, either through "may contain" declarations or by informing customers of the
            risk when they disclose an allergy.
          </p>

          {/* Legal Framework */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">The Legal Framework</h2>

          <p className="text-gray-700 mb-4">
            The requirement to declare the 14 allergens comes from the Food Information Regulations 2014, which implemented
            EU Regulation 1169/2011 into UK law. This regulation was retained after Brexit and continues to apply in full. It
            requires food businesses to provide allergen information for non-prepacked food (food sold loose in restaurants,
            cafés, and takeaways) either in writing or by directing customers to ask staff, with written records available.
          </p>

          <p className="text-gray-700 mb-4">
            In 2021,{' '}
            <Link to="/guides/natashas-law-restaurants" className="text-emerald-700 underline hover:text-emerald-900">
              Natasha's Law
            </Link>{' '}
            added requirements for prepacked for direct sale (PPDS) food — items prepared and packed on the same premises where
            they are sold, such as sandwiches made in-house and wrapped for display. PPDS items must carry a full ingredient
            list with allergens emphasised in bold, italics, or contrasting colour.
          </p>

          <p className="text-gray-700 mb-4">
            <Link to="/guides/owens-law" className="text-emerald-700 underline hover:text-emerald-900">
              Owen's Law
            </Link>{' '}
            is the next regulatory development, expected to introduce mandatory written allergen disclosure for non-prepacked
            food — removing the option to rely on verbal communication alone. The FSA published voluntary best practice guidance
            in March 2025 and is evaluating compliance through spring 2026. Poor uptake is expected to trigger mandatory
            legislation.
          </p>

          <p className="text-gray-700 mb-6">
            Enforcement is carried out by local authority Environmental Health Officers as part of routine food hygiene
            inspections. Allergen failures can result in improvement notices, hygiene emergency prohibition orders, and
            prosecution. The{' '}
            <Link to="/guides/allergen-fines-uk" className="text-emerald-700 underline hover:text-emerald-900">
              financial penalties for allergen failures
            </Link>{' '}
            are substantial and increasing, with recent prosecutions resulting in fines of £43,000 for independent restaurants.
            In cases where allergen failures cause death, custodial sentences have been imposed.
          </p>

          {/* How to Comply */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">How to Comply: Practical Steps</h2>

          <p className="text-gray-700 mb-4">
            Compliance with the 14 allergen requirements involves three ongoing activities: documenting allergens accurately,
            making that information available to customers, and maintaining the accuracy of your records over time.
          </p>

          <p className="text-gray-700 mb-4">
            Start by auditing every ingredient in every dish. This includes main ingredients, secondary ingredients, sauces,
            garnishes, sides, condiments, drinks, and anything else you serve. For each composite ingredient, obtain the full
            ingredient list from your supplier. Map each dish against all 14 allergens, creating a comprehensive allergen matrix.
          </p>

          <p className="text-gray-700 mb-4">
            Make your allergen information accessible to customers before they order. The FSA March 2025 guidance recommends
            proactive written disclosure — putting allergen information where customers can see it without having to ask. Digital
            allergen menus accessible via QR code are the most effective method: customers scan, filter by their allergens, and
            see only safe dishes. This eliminates the embarrassment of asking staff, reduces the risk of verbal miscommunication,
            and works equally well for dine-in, takeaway, and delivery.
          </p>

          <p className="text-gray-700 mb-4">
            Maintain your allergen information with documented reviews. Every menu change requires an allergen review. Every
            supplier change requires an allergen review. And regular verification reviews — ideally weekly, at minimum monthly
            — ensure that your allergen information has not drifted from reality. Document every review with a date and the name
            of the person who conducted it. This creates an{' '}
            <Link to="/guides/eho-allergen-inspection" className="text-emerald-700 underline hover:text-emerald-900">
              audit trail for EHO inspections
            </Link>
            .
          </p>

          <p className="text-gray-700 mb-6">
            SafeEat handles all three activities in a single platform. Restaurant owners enter their dishes and allergens through
            the dashboard. Customers access a filtered allergen menu via QR code. The system generates a timestamped verification
            log and sends automated email reminders when verification is overdue. At £29.99 per month, it replaces manual
            spreadsheets, paper allergen matrices, and the risk of human error with a digital system that EHO officers
            recognise as best practice.
          </p>

          {/* The Retention Angle */}
          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Beyond Compliance: Allergen Information as a Customer Retention Tool</h2>

          <p className="text-gray-700 mb-4">
            Most allergen compliance tools stop at legal box-ticking. SafeEat goes further by turning your allergen management
            into a customer retention engine. When a customer with allergies finds a restaurant they trust — where allergen
            information is clear, accurate, and easy to access — they return. Research indicates that 60% of young adults with
            food allergies avoid eating out because they do not trust restaurants to manage their allergies safely.
          </p>

          <p className="text-gray-700 mb-4">
            SafeEat captures this loyalty by allowing customers to save their allergen profile against your venue. The customer
            scans your QR code, filters your menu by their allergens, and optionally saves their preferences. Next time they
            visit, their allergens are already loaded. You build a database of customers with allergies — customers who are
            actively choosing your restaurant because they trust your allergen management. With marketing opt-in, you can notify
            these customers when you add new allergen-safe dishes.
          </p>

          <p className="text-gray-700 mb-6">
            No other UK allergen tool combines compliance, customer profiles, and marketing opt-ins. This is what makes SafeEat
            unique: it transforms a legal obligation into a competitive advantage.
          </p>

          {/* CTA */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 my-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Cover all 14 allergens in 5 minutes</h2>
            <p className="text-gray-700 mb-6 max-w-xl mx-auto">
              SafeEat gives your restaurant a digital allergen menu that customers filter by their allergies, plus a
              timestamped audit trail for EHO inspections — from £29.99/month.
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
