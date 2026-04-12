import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const ALLERGENS = [
  { name: 'Celery', desc: 'Includes celery stalks, leaves, seeds, celeriac, and celery salt. Found in salads, soups, stocks, and many processed foods. Celery is one of the most commonly overlooked allergens because it appears in spice blends, seasoning mixes, Bloody Mary cocktails, and stock cubes. Many restaurant kitchens use celery as a base for mirepoix — the foundational flavour base for sauces, gravies, and stews — meaning it can appear in dishes where customers would never expect it. Always check bought-in stocks, bouillon, and ready-made sauces for celery content.' },
  { name: 'Cereals containing gluten', desc: 'Wheat, rye, barley, oats, spelt, kamut, and their hybridised strains. Present in bread, pasta, pastry, batter, cakes, breakfast cereals, sauces thickened with flour, beer, and many processed foods. Gluten is one of the most pervasive allergens in UK restaurant kitchens. It appears in soy sauce (which contains wheat), gravy granules, breadcrumbs used for coating, and even in some ice creams and processed meats. Cross-contamination is a significant risk — shared fryers, chopping boards, and toasters can all transfer gluten to otherwise gluten-free dishes.' },
  { name: 'Crustaceans', desc: 'Prawns, crab, lobster, crayfish, shrimp, langoustines, and scampi. Used in seafood dishes, Thai curries, paella, bisques, and some Asian sauces and pastes. Crustacean allergens are heat-stable, meaning cooking does not reduce their allergenic potential. Shrimp paste is widely used in Southeast Asian cuisine and may not be obvious to customers. Surimi (imitation crab) often contains crustacean extract. Cross-contamination can occur in shared fryers where battered prawns are cooked alongside other items.' },
  { name: 'Eggs', desc: 'All bird eggs, including chicken, duck, quail, and goose eggs. Found in cakes, mayonnaise, pasta (fresh and some dried), quiche, sauces (béarnaise, hollandaise), pastries, meringue, mousse, and some glazed breads. Eggs are used as binding agents in burgers, meatballs, and fishcakes, as glazing agents on pastry and bread, and as emulsifiers in dressings. Egg wash on bread rolls is a common hidden source. Some wines and beers use egg white as a fining agent.' },
  { name: 'Fish', desc: 'All species of fish, including cod, salmon, tuna, anchovy, and sardines. Present in obvious seafood dishes but also hidden in Worcestershire sauce, Caesar dressing, some Asian fish sauces (nam pla), and supplements. Anchovies are used in many Italian and Mediterranean recipes where customers might not expect fish — tapenade, puttanesca sauce, and some olive oils. Some beers and wines use isinglass (derived from fish swim bladders) as a fining agent. Fish allergens can become airborne during cooking, particularly frying.' },
  { name: 'Lupin', desc: 'A legume in the same family as peanuts, found in some types of bread, pastries, and pasta — particularly in continental European recipes. Lupin flour and lupin seeds are increasingly used as high-protein, gluten-free alternatives in UK baking. Lupin can trigger severe allergic reactions, including anaphylaxis, and there is significant cross-reactivity between lupin and peanut allergies — meaning people allergic to peanuts may also react to lupin. Check imported bakery products and speciality flours.' },
  { name: 'Milk', desc: 'All mammalian milks — cow, goat, sheep, and buffalo — and all products derived from them, including butter, cheese, cream, yoghurt, ghee, casein, whey, and milk powder. Present in sauces, desserts, baked goods, chocolate, margarine (some contain milk derivatives), and processed meats (some sausages contain milk powder). Lactose-free products still contain milk proteins and are NOT safe for milk allergy sufferers — lactose intolerance and milk allergy are different conditions. Milk is the most common food allergy in children under three.' },
  { name: 'Molluscs', desc: 'Mussels, oysters, squid (calamari), octopus, snails (escargot), scallops, clams, cockles, whelks, and abalone. Found in seafood dishes, paella, sushi, chowder, and oyster sauce used extensively in Chinese and Thai cooking. Mollusc allergens are distinct from crustacean allergens — a customer allergic to molluscs may not be allergic to crustaceans and vice versa. Oyster sauce is one of the most common hidden sources of mollusc allergen in UK restaurants.' },
  { name: 'Mustard', desc: 'Mustard seeds, mustard powder, mustard oil, mustard leaves, and mustard flour. Present in English mustard, Dijon mustard, wholegrain mustard, salad dressings, marinades, barbecue sauces, curries, pickles, chutneys, and processed meats (particularly sausages). Mustard is used in many spice mixes and rubs. It is heat-stable, so cooking does not reduce its allergenic potential. Small amounts can trigger severe reactions. Always check bought-in sauces, dressings, and processed foods.' },
  { name: 'Peanuts', desc: 'Also known as groundnuts or monkey nuts. Peanuts are legumes (not tree nuts) and are found in peanut butter, satay sauce, groundnut oil, some desserts, and many Asian dishes. Refined peanut oil is generally considered safe for most peanut-allergic individuals, but cold-pressed or crude peanut oil retains allergenic proteins. Peanut flour is sometimes used as a thickener. Cross-contamination is a major risk in kitchens that handle peanuts. Peanut allergy is the most common cause of fatal food-induced anaphylaxis in the UK.' },
  { name: 'Sesame', desc: 'Sesame seeds and sesame oil. Found in bread, breadsticks, bagels, hummus, tahini (ground sesame paste), halva, some Asian dishes, and salad dressings. Sesame is increasingly common in UK cuisine and is one of the fastest-growing allergens. Seeds can fall off bread and contaminate other foods. Sesame oil is used in many Chinese, Japanese, and Korean dishes. The EU added sesame to its regulated allergens list because of the increasing prevalence and severity of sesame allergy reactions.' },
  { name: 'Soybeans', desc: 'Soya beans and soya-based products including tofu, tempeh, miso, soy sauce, soya milk, soya flour, soya protein, edamame, and soya lecithin. Widely used in processed foods, vegetarian and vegan products, and Asian cuisine. Soy sauce contains wheat as well as soy, making it a dual allergen risk. Soya lecithin (E322) is used as an emulsifier in chocolate, margarine, and many processed foods. Always check vegetarian alternatives, protein bars, and Asian condiments.' },
  { name: 'Sulphur dioxide and sulphites', desc: 'Chemical preservatives used in dried fruit, wine, beer, cider, soft drinks, sausages, burgers, and some processed foods. Must be declared when present at concentrations above 10mg/kg or 10mg/litre. Sulphites are also produced naturally during wine fermentation. Reactions to sulphites are more common in people with asthma. Dried fruits (apricots, raisins, cranberries) and wines are the most common high-sulphite foods. Some salad bars use sulphite solutions to prevent browning.' },
  { name: 'Tree nuts', desc: 'Almonds, hazelnuts, walnuts, cashews, pecans, Brazil nuts, pistachios, macadamia nuts, and Queensland nuts. Found in cakes, biscuits, praline, marzipan, nougat, pesto, nut butters, nut milks, and many desserts. Tree nut allergies are among the most common causes of fatal anaphylaxis. Each tree nut is a separate allergen — a customer allergic to almonds may not be allergic to walnuts — but many tree nut allergic individuals react to multiple types. Ground almonds are widely used in gluten-free baking.' },
]

const PAGE_FAQS = [
  { q: 'What are the 14 allergens UK restaurants must declare?', a: 'The 14 regulated allergens under UK food law are: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, peanuts, sesame, soybeans, sulphur dioxide and sulphites (above 10mg/kg), and tree nuts. These must be declared for all food sold — prepacked, prepacked for direct sale, or non-prepacked.' },
  { q: 'Do I have to display allergens on my menu?', a: 'You must provide allergen information for non-prepacked food either in writing or verbally with a written sign directing customers to ask. The FSA\'s March 2025 best practice guidance recommends written information supported by staff conversations. Owen\'s Law, under evaluation in 2026, may make written disclosure mandatory.' },
  { q: 'What is the penalty for not declaring allergens?', a: 'Fines under the Food Information Regulations 2014 are potentially unlimited. Recent prosecutions of independent restaurants have resulted in fines from £1,920 to £43,816. Businesses can face closure via a Hygiene Emergency Prohibition Notice in serious cases.' },
  { q: 'Do I need to declare allergens in takeaway food?', a: 'Yes. Allergen declaration is required for all food sold to consumers, including takeaway, delivery, and phone orders. For distance selling, allergen information must be provided before purchase and again at delivery.' },
  { q: 'What is the difference between a food allergy and intolerance?', a: 'A food allergy is an immune system response that can cause anaphylaxis, which can be fatal. A food intolerance causes digestive discomfort but is not life-threatening. Both are covered by the 14 regulated allergens and must be declared.' },
  { q: 'Are "may contain" warnings a legal requirement?', a: 'No. Precautionary allergen labelling is voluntary and used for possible cross-contamination. It is not a substitute for proper allergen management. The FSA has criticised blanket "may contain" disclaimers used to avoid managing allergens properly.' },
  { q: 'How often should I update allergen information?', a: 'Review whenever a recipe changes, a supplier changes, a new dish is added, or an ingredient is substituted. Best practice is weekly verification with a dated audit trail that demonstrates ongoing diligence to EHO inspectors.' },
  { q: 'Do I need to train staff on allergens?', a: 'Yes. The FSA requires all staff who handle food or take orders to be trained on allergen management — understanding the 14 allergens, providing accurate information, and preventing cross-contamination. Free FSA online training has been completed by over 915,000 users.' },
]

export default function AllergensGuidePage() {
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: 'The 14 Allergens UK Restaurants Must Declare — Complete Guide 2026', description: 'Comprehensive guide to the 14 regulated allergens under UK food law.', author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' }, publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' }, datePublished: '2026-04-12', dateModified: '2026-04-12', mainEntityOfPage: 'https://safeeat.co.uk/guides/14-allergens-uk', image: 'https://safeeat.co.uk/og-14-allergens.jpg' },
      { '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk/' }, { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://safeeat.co.uk/guides/' }, { '@type': 'ListItem', position: 3, name: '14 Allergens UK', item: 'https://safeeat.co.uk/guides/14-allergens-uk' } ] },
      { '@type': 'WebPage', name: 'The 14 Allergens UK Restaurants Must Declare', url: 'https://safeeat.co.uk/guides/14-allergens-uk', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] } },
      { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk', description: 'Allergen menu management software for UK restaurants.', address: { '@type': 'PostalAddress', addressCountry: 'GB' } },
      { '@type': 'FAQPage', mainEntity: PAGE_FAQS.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'DefinedTermSet', name: 'UK Regulated Food Allergens', definedTerm: ALLERGENS.map((a) => ({ '@type': 'DefinedTerm', name: a.name, description: a.desc.substring(0, 200) })) },
      { '@type': 'HowTo', name: 'How to declare allergens in a UK restaurant', step: [ { '@type': 'HowToStep', name: 'Audit your menu', text: 'List all ingredients for every dish and identify which of the 14 allergens are present.' }, { '@type': 'HowToStep', name: 'Make information available', text: 'Provide allergen information in writing — on menus, boards, or via a digital QR code system.' }, { '@type': 'HowToStep', name: 'Verify regularly', text: 'Review allergen information weekly, especially after recipe or supplier changes. Date-stamp each verification.' }, { '@type': 'HowToStep', name: 'Train your team', text: 'Ensure all staff understand the 14 allergens, your procedures, and cross-contamination prevention.' } ] },
      { '@type': 'SoftwareApplication', name: 'SafeEat', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP' } },
    ],
  }

  return (
    <>
      <Helmet>
        <title>14 Allergens UK Restaurants Must Declare — Complete Guide 2026 | SafeEat</title>
        <meta name="description" content="Complete guide to the 14 regulated allergens UK restaurants, cafés, and takeaways must declare under Food Information Regulations 2014. What they are, where they hide, and how to comply." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/14-allergens-uk" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/14-allergens-uk" />
        <meta property="og:title" content="14 Allergens UK Restaurants Must Declare — Complete Guide 2026" />
        <meta property="og:description" content="Complete guide to the 14 regulated allergens UK restaurants must declare. What they are, where they hide, and how to comply." />
        <meta property="og:image" content="https://safeeat.co.uk/og-14-allergens.jpg" />
        <meta property="og:site_name" content="SafeEat" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="14 Allergens UK Restaurants Must Declare — Complete Guide 2026" />
        <meta name="twitter:description" content="Complete guide to the 14 regulated allergens UK restaurants must declare under Food Information Regulations 2014." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-14-allergens.jpg" />
        <meta name="author" content="SafeEat" />
        <meta property="article:publisher" content="https://safeeat.co.uk" />
        <meta property="article:published_time" content="2026-04-12" />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍽️</span>
              <span className="text-lg font-bold text-gray-900">SafeEat</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link to="/guides/owens-law" className="text-xs text-gray-500 hover:text-gray-700 hidden sm:block">Owen&apos;s Law</Link>
              <Link to="/guides/eho-allergen-inspection" className="text-xs text-gray-500 hover:text-gray-700 hidden sm:block">EHO Guide</Link>
              <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors">Start free trial</Link>
            </div>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-600">Home</Link><span>/</span><span className="text-gray-600">Guides</span><span>/</span><span className="text-gray-600">14 Allergens UK</span>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <header className="mb-10">
            <p className="text-xs text-se-green-600 font-semibold uppercase tracking-wide mb-2">Allergen Compliance Guide</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">The 14 allergens UK restaurants must declare</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">Under the Food Information Regulations 2014, every UK food business — restaurants, cafés, pubs, takeaways, and caterers — must declare 14 specific allergens whenever they are used as ingredients. This guide covers each allergen in detail, where it commonly hides in restaurant menus, the legal requirements for disclosure, common compliance mistakes, and how to build a systematic approach to allergen management that satisfies Environmental Health Officers.</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Published by SafeEat</span><span>·</span><span>Updated April 2026</span><span>·</span><span>15 min read</span>
            </div>
          </header>

          <div id="quick-answer" className="bg-se-green-50 border border-se-green-200 rounded-xl p-5 mb-10">
            <p className="text-xs font-semibold text-se-green-700 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-sm text-gray-800 font-medium leading-relaxed">UK restaurants must declare 14 allergens: celery, gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, peanuts, sesame, soy, sulphites, and tree nuts. Required under the Food Information Regulations 2014 for all food sold.</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">All 14 at a glance</h2>
            <div className="flex flex-wrap gap-2">
              {ALLERGENS.map((a) => (<span key={a.name} className="px-3 py-1 rounded-full bg-white border border-gray-200 text-sm text-gray-700">{a.name}</span>))}
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What does UK law require?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">The Food Information Regulations 2014 (implementing retained EU Regulation 1169/2011) require all UK food businesses to inform customers about the presence of any of the 14 regulated allergens in the food they sell. This applies across three categories: prepacked food (sealed packaging), prepacked for direct sale (PPDS) under <Link to="/guides/natashas-law-restaurants" className="text-se-green-600 font-medium hover:underline">Natasha&apos;s Law</Link>, and non-prepacked food served in restaurants and takeaways.</p>
            <p className="text-gray-600 leading-relaxed mb-4">For restaurants serving non-prepacked food, allergen information can be provided in writing (menus, chalkboards, information packs) or verbally with a written notice directing customers to ask. The FSA&apos;s best practice guidance published on 5 March 2025 explicitly recommends written allergen information supported by staff conversations — moving firmly away from the verbal-only approach that 47% of small food businesses still rely on.</p>
            <p className="text-gray-600 leading-relaxed mb-4"><Link to="/guides/owens-law" className="text-se-green-600 font-medium hover:underline">Owen&apos;s Law</Link>, currently under evaluation by the UK government in spring 2026, may make written allergen disclosure at the point of ordering mandatory. Businesses that adopt written allergen systems now will be ahead of probable legislation.</p>
            <p className="text-gray-600 leading-relaxed">The regulations apply regardless of business size — from a single-person street food stall to a multi-site chain. There is no small business exemption. The FSA found undeclared allergens in 16% of foods tested during targeted surveillance, demonstrating that enforcement is active and non-compliance is widespread.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">The 14 allergens explained</h2>
            <p className="text-gray-600 leading-relaxed mb-6">Each allergen is described below with details on where it commonly appears in restaurant menus, hidden sources that are frequently missed, and specific cross-contamination risks.</p>
            <div className="space-y-8">
              {ALLERGENS.map((a, i) => (
                <div key={a.name} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2"><span className="text-se-green-600 mr-2">{i + 1}.</span>{a.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Common allergen management mistakes</h2>
            <p className="text-gray-600 leading-relaxed mb-4">The FSA&apos;s targeted surveillance found undeclared allergens in 16% of foods tested. The most common failures are systemic breakdowns that accumulate over time — not deliberate negligence.</p>
            <div className="space-y-4 mb-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Not accounting for compound ingredients</h3>
                <p className="text-sm text-gray-600">Bought-in sauces, stocks, marinades, and spice mixes often contain hidden allergens. A Thai curry paste may contain fish sauce, peanuts, and shrimp paste — three allergens in one ingredient. Every compound ingredient must be checked against its own ingredients list.</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Failing to update after recipe changes</h3>
                <p className="text-sm text-gray-600">When a chef substitutes an ingredient or a supplier changes a product formulation, the allergen information must be updated immediately. This is the single most common cause of allergen incidents — information that was accurate once but drifted as the kitchen changed.</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Relying entirely on verbal communication</h3>
                <p className="text-sm text-gray-600">A customer tells a waiter about their allergy, the waiter tells the kitchen, and the message is incomplete, forgotten, or misunderstood. This verbal chain is the most dangerous point of failure, and exactly what <Link to="/guides/owens-law" className="text-se-green-600 hover:underline">Owen&apos;s Law</Link> aims to eliminate.</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Not training temporary staff</h3>
                <p className="text-sm text-gray-600">Permanent staff may be well-trained, but temporary, agency, and seasonal workers often miss allergen training. The FSA requires that all staff who handle food or take orders understand allergen procedures — including casual staff on a busy Saturday night.</p>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">Ignoring cross-contamination</h3>
                <p className="text-sm text-gray-600">Shared fryers, chopping boards, utensils, and preparation surfaces can transfer allergens between dishes. Gluten from battered fish can contaminate chips. Nut traces can persist on work surfaces. A robust cross-contamination prevention procedure is essential.</p>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">Recent prosecutions demonstrate the consequences — fines for independent restaurants have exceeded £43,000. Read our <Link to="/guides/allergen-fines-uk" className="text-se-green-600 font-medium hover:underline">allergen fines guide</Link> for case studies, and our <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">EHO inspection guide</Link> for what inspectors look for.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Managing cross-contamination in your kitchen</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Cross-contact occurs when an allergen is unintentionally transferred from one food to another. In a commercial kitchen, the most common routes are shared cooking equipment (fryers, grills, griddles), shared preparation surfaces and utensils, shared storage, and splash or airborne transfer during cooking.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Effective prevention requires designated preparation areas for allergen-free dishes where possible, colour-coded utensils and chopping boards, cleaning protocols between preparations (wash, rinse, sanitise — not just wipe), separate storage for common allergens, and clear labelling of all stored ingredients and prepped items.</p>
            <p className="text-gray-600 leading-relaxed">Be honest with customers about cross-contamination risks. If your kitchen cannot guarantee a dish is free from a particular allergen due to shared equipment, communicate this. Using precautionary allergen labelling appropriately — rather than as a blanket disclaimer — is the responsible approach.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">How to comply: a practical four-step approach</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Allergen compliance does not need to be complicated. The core requirement is straightforward: know what allergens are in each dish, communicate that to customers, and keep it up to date.</p>
            <p className="text-gray-600 leading-relaxed mb-4"><strong>Step 1: Audit every dish.</strong> List all ingredients, including compound ingredients and bought-in products, and identify which of the 14 allergens are present. Check supplier specifications for every product you do not make yourself.</p>
            <p className="text-gray-600 leading-relaxed mb-4"><strong>Step 2: Make information available in writing.</strong> Whether on your menu, a board, or through a digital system like a <Link to="/guides/allergen-menu-template" className="text-se-green-600 font-medium hover:underline">QR code allergen menu</Link>, customers should be able to identify safe dishes without having to ask.</p>
            <p className="text-gray-600 leading-relaxed mb-4"><strong>Step 3: Verify regularly.</strong> Set a weekly schedule to review your allergen information. Check for recipe changes, supplier changes, and new dishes. Date-stamp each verification to build an audit trail for <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">EHO inspections</Link>.</p>
            <p className="text-gray-600 leading-relaxed"><strong>Step 4: Train your team.</strong> Every staff member who handles food or takes orders must understand the 14 allergens, know your procedures, and know what to do when a customer declares an allergy. The FSA provides free online allergen training completed by over 915,000 people.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-4">
              {PAGE_FAQS.map((item, i) => (
                <details key={i} className="bg-gray-50 rounded-xl overflow-hidden group">
                  <summary className="px-5 py-4 cursor-pointer text-sm font-semibold text-gray-900 list-none flex items-center justify-between gap-4 hover:bg-gray-100 transition-colors">
                    <span>{item.q}</span>
                    <span className="text-gray-400 group-open:rotate-45 transition-transform text-lg flex-shrink-0">+</span>
                  </summary>
                  <div className="px-5 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{item.a}</p></div>
                </details>
              ))}
            </div>
          </section>

          <div className="bg-gray-50 rounded-xl p-8 text-center mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Managing 14 allergens doesn&apos;t have to be manual</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">SafeEat lets you tag every dish against all 14 allergens, gives customers a QR code to filter your menu, and keeps a timestamped verification audit trail. The only UK allergen tool that also builds a database of your allergy customers.</p>
            <Link to="/dashboard" className="inline-block px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors">Start your free trial</Link>
            <p className="text-xs text-gray-400 mt-3">£29.99/month. No credit card required.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Related guides</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/guides/owens-law" className="bg-white rounded-xl border border-gray-200 p-4 hover:border-se-green-300 transition-colors">
                <p className="font-semibold text-gray-900 text-sm mb-1">Owen&apos;s Law 2026</p>
                <p className="text-xs text-gray-500">What mandatory written allergen disclosure means for your restaurant</p>
              </Link>
              <Link to="/guides/eho-allergen-inspection" className="bg-white rounded-xl border border-gray-200 p-4 hover:border-se-green-300 transition-colors">
                <p className="font-semibold text-gray-900 text-sm mb-1">EHO Inspections</p>
                <p className="text-xs text-gray-500">What inspectors look for and how to build your audit trail</p>
              </Link>
              <Link to="/guides/allergen-fines-uk" className="bg-white rounded-xl border border-gray-200 p-4 hover:border-se-green-300 transition-colors">
                <p className="font-semibold text-gray-900 text-sm mb-1">Allergen Fines UK</p>
                <p className="text-xs text-gray-500">Recent prosecution cases and how to protect your business</p>
              </Link>
            </div>
          </div>
        </article>

        <footer className="border-t border-gray-200 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🍽️</span>
                <span className="text-sm font-bold text-gray-900">SafeEat</span>
                <span className="text-xs text-gray-400">© {new Date().getFullYear()}</span>
              </div>
              <nav className="flex items-center gap-6">
                <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Privacy</Link>
                <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Terms</Link>
                <Link to="/contact" className="text-xs text-gray-500 hover:text-gray-700 transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
