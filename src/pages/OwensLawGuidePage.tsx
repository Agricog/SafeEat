import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const PAGE_FAQS = [
  { q: 'What is Owen\'s Law?', a: 'Owen\'s Law is a campaign calling for mandatory written allergen information at the point of ordering in UK restaurants, without the customer needing to ask. It is named after Owen Carey, who died aged 18 in 2017 after eating buttermilk-marinated chicken at a Byron restaurant. The buttermilk was not declared on the menu.' },
  { q: 'Is Owen\'s Law already in force?', a: 'No. Owen\'s Law is not yet legislation. The FSA published voluntary best-practice guidance in March 2025 recommending written allergen disclosure. The government committed to evaluating uptake one year after publication — meaning the evaluation is underway in spring 2026. If voluntary compliance is poor, mandatory legislation is expected to follow.' },
  { q: 'How is Owen\'s Law different from Natasha\'s Law?', a: 'Natasha\'s Law (2021) requires full ingredients labelling on prepacked for direct sale (PPDS) food. Owen\'s Law addresses non-prepacked food — meals served in restaurants, cafés, and takeaways. Natasha\'s Law changed how packaged food is labelled; Owen\'s Law would change how restaurant menus communicate allergen information.' },
  { q: 'What does the FSA March 2025 guidance say?', a: 'The FSA\'s best practice guidance recommends that food businesses provide written allergen information that customers can access independently, supported by a conversation with staff. It explicitly discourages the "just ask staff" approach as falling below best practice. The guidance is voluntary but forms the basis of the evaluation that may trigger mandatory legislation.' },
  { q: 'What percentage of restaurants comply with written allergen disclosure?', a: 'The FSA\'s Small and Micro FBO survey found that 47% of small food businesses still provide allergen information only verbally on request — the exact practice Owen\'s Law aims to eliminate. This suggests voluntary compliance is poor, making mandatory legislation more probable.' },
  { q: 'What should my restaurant do to prepare for Owen\'s Law?', a: 'Provide written allergen information at the point of ordering — on your menu, on a board, or via a digital QR code system. Build a verification audit trail showing regular allergen reviews. Train all staff on allergen procedures. Businesses that adopt these practices now will be ahead of probable legislation.' },
  { q: 'Can a QR code menu satisfy Owen\'s Law requirements?', a: 'Yes. A QR code linking to a digital allergen menu provides written allergen information at the point of ordering that customers can access independently — exactly what Owen\'s Law calls for. It also allows customers to filter by their specific allergies and can be updated instantly when recipes change.' },
  { q: 'What happens if Owen\'s Law becomes mandatory and I don\'t comply?', a: 'If mandatory legislation follows, non-compliance would be a criminal offence under food information regulations, with potentially unlimited fines. Current prosecution cases for allergen failures have resulted in fines from £1,920 to £43,816 for independent restaurants.' },
  { q: 'Does Owen\'s Law apply to takeaways and delivery services?', a: 'Yes. Owen\'s Law would apply to all food businesses serving non-prepacked food, including takeaways and delivery services. For distance selling (online, phone, delivery), allergen information must already be provided before purchase and again at delivery under existing regulations. Owen\'s Law would strengthen written disclosure requirements further.' },
  { q: 'Will Owen\'s Law require specific allergen symbols on menus?', a: 'The FSA guidance does not mandate a specific format. Written allergen information can be presented as text on the menu, allergen symbols or icons, a separate allergen matrix, or a digital system via QR code. The requirement is that information is in writing and accessible without asking — the format is flexible.' },
  { q: 'How does Owen\'s Law affect online food ordering platforms?', a: 'Online ordering platforms must already provide allergen information before purchase under distance selling regulations. Owen\'s Law would reinforce the requirement for written disclosure. If you sell through Deliveroo, Uber Eats, or Just Eat, you should ensure allergen information is accurate on those platforms as well as in your own venue.' },
  { q: 'Is there likely to be a grace period when Owen\'s Law becomes mandatory?', a: 'When Natasha\'s Law was introduced, businesses were given approximately 12 months between Royal Assent and enforcement to prepare. A similar transition period would be expected for Owen\'s Law. However, since the voluntary guidance has been published since March 2025, the government may argue businesses have already had time to prepare, potentially shortening any grace period.' },
]

export default function OwensLawGuidePage() {
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Article', headline: 'Owen\'s Law: What UK Restaurants Need to Know in 2026', description: 'Owen\'s Law calls for mandatory written allergen information in UK restaurants. The FSA is evaluating uptake in spring 2026.', author: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' }, publisher: { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk' }, datePublished: '2026-04-12', dateModified: '2026-04-12', mainEntityOfPage: 'https://safeeat.co.uk/guides/owens-law', image: 'https://safeeat.co.uk/og-owens-law.jpg' },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://safeeat.co.uk/' }, { '@type': 'ListItem', position: 2, name: 'Guides' }, { '@type': 'ListItem', position: 3, name: 'Owen\'s Law', item: 'https://safeeat.co.uk/guides/owens-law' }] },
      { '@type': 'WebPage', name: 'Owen\'s Law: What UK Restaurants Need to Know', url: 'https://safeeat.co.uk/guides/owens-law', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['#quick-answer'] } },
      { '@type': 'Organization', name: 'SafeEat', url: 'https://safeeat.co.uk', description: 'Allergen menu management software for UK restaurants.', address: { '@type': 'PostalAddress', addressCountry: 'GB' } },
      { '@type': 'FAQPage', mainEntity: PAGE_FAQS.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      { '@type': 'HowTo', name: 'How to prepare for Owen\'s Law', step: [{ '@type': 'HowToStep', name: 'Provide written allergen information', text: 'Display allergen information in writing at the point of ordering — on menus, boards, or via QR code.' }, { '@type': 'HowToStep', name: 'Build a verification audit trail', text: 'Verify allergen information weekly with dated records.' }, { '@type': 'HowToStep', name: 'Train all staff', text: 'Ensure every team member understands allergen procedures.' }, { '@type': 'HowToStep', name: 'Review regularly', text: 'Update allergen information whenever recipes, suppliers, or ingredients change.' }] },
      { '@type': 'SoftwareApplication', name: 'SafeEat', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '29.99', priceCurrency: 'GBP' } },
      { '@type': 'DefinedTermSet', name: 'UK Allergen Legislation', definedTerm: [{ '@type': 'DefinedTerm', name: 'Owen\'s Law', description: 'Campaign for mandatory written allergen information at point of ordering in UK restaurants.' }, { '@type': 'DefinedTerm', name: 'Natasha\'s Law', description: 'UK legislation requiring full ingredient labelling on prepacked for direct sale food (2021).' }, { '@type': 'DefinedTerm', name: 'Food Information Regulations 2014', description: 'UK law requiring declaration of 14 regulated allergens in all food sold to consumers.' }, { '@type': 'DefinedTerm', name: 'FSA Best Practice Guidance', description: 'Voluntary guidance published March 2025 recommending written allergen information supported by staff conversations.' }] },
    ],
  }

  return (
    <>
      <Helmet>
        <title>Owen&apos;s Law UK Restaurants 2026: What You Need to Know | SafeEat</title>
        <meta name="description" content="Owen's Law calls for mandatory written allergen information in UK restaurants. The FSA is evaluating voluntary uptake in spring 2026. What it means for your restaurant and how to prepare now." />
        <link rel="canonical" href="https://safeeat.co.uk/guides/owens-law" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://safeeat.co.uk/guides/owens-law" />
        <meta property="og:title" content="Owen's Law UK Restaurants 2026: What You Need to Know" />
        <meta property="og:description" content="Owen's Law calls for mandatory written allergen information in UK restaurants. How to prepare now." />
        <meta property="og:image" content="https://safeeat.co.uk/og-owens-law.jpg" />
        <meta property="og:site_name" content="SafeEat" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Owen's Law UK Restaurants 2026: What You Need to Know" />
        <meta name="twitter:description" content="Owen's Law and the FSA spring 2026 evaluation. What it means for UK restaurants." />
        <meta name="twitter:image" content="https://safeeat.co.uk/og-owens-law.jpg" />
        <meta name="author" content="SafeEat" />
        <meta property="article:publisher" content="https://safeeat.co.uk" />
        <meta property="article:published_time" content="2026-04-12" />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <nav className="border-b border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2"><span className="text-2xl">🍽️</span><span className="text-lg font-bold text-gray-900">SafeEat</span></Link>
            <div className="flex items-center gap-3">
              <Link to="/guides/14-allergens-uk" className="text-xs text-gray-500 hover:text-gray-700 hidden sm:block">14 Allergens</Link>
              <Link to="/guides/eho-allergen-inspection" className="text-xs text-gray-500 hover:text-gray-700 hidden sm:block">EHO Guide</Link>
              <Link to="/dashboard" className="px-4 py-2 rounded-lg bg-se-green-600 text-white text-sm font-medium hover:bg-se-green-700 transition-colors">Start free trial</Link>
            </div>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-gray-600">Home</Link><span>/</span><span className="text-gray-600">Guides</span><span>/</span><span className="text-gray-600">Owen&apos;s Law</span>
          </div>
        </div>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              FSA evaluation in progress — spring 2026
            </div>
            <p className="text-xs text-se-green-600 font-semibold uppercase tracking-wide mb-2">Regulatory Guide</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">Owen&apos;s Law: what UK restaurants need to know in 2026</h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">Owen&apos;s Law calls for mandatory written allergen information at the point of ordering in UK restaurants — without the customer needing to ask. The government published voluntary guidance in March 2025 and is evaluating compliance right now in spring 2026. If uptake is poor — and with 47% of small food businesses still relying on verbal-only communication, it likely will be — mandatory legislation follows. This guide explains the background, the timeline, what it means for independent restaurants, cafés, pubs, and takeaways, and how to position your business ahead of the regulation.</p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Published by SafeEat</span><span>·</span><span>Updated April 2026</span><span>·</span><span>14 min read</span>
            </div>
          </header>

          <div id="quick-answer" className="bg-se-green-50 border border-se-green-200 rounded-xl p-5 mb-10">
            <p className="text-xs font-semibold text-se-green-700 uppercase tracking-wide mb-2">Quick Answer</p>
            <p className="text-sm text-gray-800 font-medium leading-relaxed">Owen&apos;s Law calls for mandatory written allergen disclosure in UK restaurants. The FSA is evaluating voluntary compliance in spring 2026. If uptake is poor, legislation follows. Prepare now with written allergen info via menus or QR codes.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Who was Owen Carey?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Owen Carey was 18 years old when he died on 22 April 2017 after eating buttermilk-marinated chicken at a Byron restaurant in London. Owen had a severe dairy allergy that he had managed carefully throughout his life. He informed staff about his allergy before ordering, specifically asking about allergens in his food. But the menu did not list buttermilk as an ingredient in the chicken dish, and the marinade was not disclosed verbally despite Owen&apos;s explicit request. Owen suffered a fatal anaphylactic reaction within minutes of eating.</p>
            <p className="text-gray-600 leading-relaxed mb-4">The inquest into Owen&apos;s death revealed systemic failures in how allergen information was communicated at the restaurant. The menu did not declare allergens for any dish. Staff relied on a verbal communication chain — customer to server to kitchen — that proved fatally inadequate. There was no written allergen information available at the point of ordering that Owen could have used to independently identify the danger in his food.</p>
            <p className="text-gray-600 leading-relaxed">Owen&apos;s parents, Paul and Moira Carey, have since campaigned tirelessly for a change in UK law to ensure that written allergen information is provided on restaurant menus without the customer needing to ask. Their campaign, supported by allergy charities and food safety organisations, became known as Owen&apos;s Law. The coroner at Owen&apos;s inquest explicitly supported the campaign, calling for restaurants to provide allergen information in writing on the main menu.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What does Owen&apos;s Law propose?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Owen&apos;s Law calls for a fundamental change in how allergen information is communicated in UK food businesses. The core principle is straightforward: customers with food allergies should be able to identify safe dishes independently by reading written information at the point of ordering, rather than relying on a conversation with staff that may be inaccurate, incomplete, rushed, or forgotten.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Specifically, Owen&apos;s Law would require all UK food businesses serving non-prepacked food — restaurants, cafés, pubs, takeaways, canteens, and caterers — to provide written allergen information clearly showing which of the <Link to="/guides/14-allergens-uk" className="text-se-green-600 font-medium hover:underline">14 regulated allergens</Link> are present in each dish. This could be on the menu itself, on a separate allergen board, through a digital display, or via a QR code linking to allergen information. The format is flexible — the requirement is that it exists in writing and is accessible without asking.</p>
            <p className="text-gray-600 leading-relaxed">The key distinction from current law is the word &quot;mandatory.&quot; Under the Food Information Regulations 2014, businesses can choose to provide allergen information verbally with a written sign directing customers to ask. Owen&apos;s Law would remove this option — written information would be compulsory, not a choice between written and verbal. Staff conversations would supplement written information, not replace it.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Owen&apos;s Law vs Natasha&apos;s Law: understanding the difference</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Owen&apos;s Law and <Link to="/guides/natashas-law-restaurants" className="text-se-green-600 font-medium hover:underline">Natasha&apos;s Law</Link> are frequently confused because both address allergen information and both are named after young people who died from allergic reactions. However, they address different categories of food and different gaps in the law.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Natasha&apos;s Law, which came into force on 1 October 2021, requires full ingredients labelling with allergens emphasised on prepacked for direct sale (PPDS) food — items like sandwiches made on-site and wrapped before the customer selects them. It was prompted by the death of Natasha Ednan-Laperouse, who died after eating a Pret a Manger baguette containing undeclared sesame.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Owen&apos;s Law addresses non-prepacked food — meals cooked to order in restaurants, loose food from a deli counter, takeaway food prepared after ordering. This is the category where verbal-only communication is still permitted under current law, and where Owen Carey&apos;s fatal incident occurred. Natasha&apos;s Law closed the gap for packaged food; Owen&apos;s Law would close the gap for everything else.</p>
            <p className="text-gray-600 leading-relaxed">Together, the two laws would create a comprehensive framework where every type of food sold in the UK — prepacked, PPDS, and non-prepacked — requires mandatory written allergen information. The gap that currently exists is for non-prepacked food, and that is precisely the gap Owen&apos;s Law aims to close.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The regulatory timeline: where are we now?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">The path from campaign to legislation has been deliberate and phased. The FSA Board endorsed the principle of mandatory written allergen disclosure in December 2023 after years of campaigning and evidence gathering. Rather than legislating immediately, the government adopted a two-step approach: publish voluntary guidance first, evaluate whether businesses adopt it voluntarily, then decide whether mandatory legislation is needed based on the evidence.</p>
            <div className="space-y-4 my-6 border-l-2 border-se-green-200 pl-4">
              {[
                { date: 'April 2017', text: 'Owen Carey dies after eating undeclared buttermilk at a Byron restaurant in London. His family begin campaigning for written allergen disclosure.', active: false },
                { date: 'October 2021', text: 'Natasha\'s Law comes into force, requiring full ingredient labelling on PPDS food. The gap for non-prepacked food remains.', active: false },
                { date: 'December 2023', text: 'FSA Board backs the principle of mandatory written allergen disclosure for non-prepacked food served in restaurants.', active: false },
                { date: 'March 2025', text: 'Government publishes voluntary best-practice guidance recommending written allergen information supported by staff conversations.', active: false },
                { date: 'Spring 2026', text: 'Government evaluates uptake of voluntary guidance. Results will "better inform Ministers on the need for any potential legislation."', active: true },
                { date: '2027?', text: 'If voluntary uptake is poor, mandatory legislation could follow — making written allergen disclosure a legal requirement for all UK food businesses.', active: false },
              ].map((item) => (
                <div key={item.date} className={`${item.active ? 'bg-amber-50 rounded-lg p-3 -ml-1 border-l-2 border-amber-500' : ''}`}>
                  <p className={`text-sm font-semibold mb-1 ${item.active ? 'text-amber-700' : 'text-se-green-600'}`}>{item.date}</p>
                  <p className={`text-sm ${item.active ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{item.text}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-600 leading-relaxed">The critical moment is now. The evaluation of the March 2025 guidance is happening in spring 2026. The outcome will determine whether Owen&apos;s Law becomes enforceable legislation. Businesses that have already adopted written allergen disclosure are positioned to meet whatever comes next; those that haven&apos;t will face a scramble to comply.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why voluntary compliance is likely to fall short</h2>
            <p className="text-gray-600 leading-relaxed mb-4">The evidence strongly suggests that voluntary adoption will not meet the government&apos;s expectations. The FSA&apos;s own Small and Micro FBO survey found that 47% of small food businesses still provide allergen information only verbally on request — the exact practice Owen&apos;s Law aims to eliminate. If nearly half of small businesses have not moved to written disclosure even with published guidance and increasing public awareness, the spring 2026 evaluation is unlikely to demonstrate strong uptake.</p>
            <p className="text-gray-600 leading-relaxed mb-4">There are structural reasons for poor voluntary adoption. Many small restaurant owners perceive allergen management as a compliance burden rather than a business opportunity. Paper-based allergen matrices are time-consuming to create and difficult to keep updated when recipes change. Verbal communication feels easier in the moment, even though it is statistically more error-prone. And without enforcement pressure, there is limited incentive to change established practices that seem to be &quot;working&quot; — until they catastrophically fail.</p>
            <p className="text-gray-600 leading-relaxed">The lesson from Natasha&apos;s Law is instructive. Before Natasha&apos;s Law made PPDS labelling mandatory in 2021, many businesses were already aware they should label PPDS food — the guidance existed, the awareness was there. But voluntary compliance was inconsistent and patchy. Legislation created the clarity, universality, and enforcement mechanism that voluntary guidance could not. Owen&apos;s Law appears to be following the same trajectory, and the spring 2026 evaluation is the data point that will determine the speed of that trajectory.</p>
          </section>

          <div className="bg-red-50 rounded-xl p-6 mb-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">The cost of getting it wrong</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-3">Even before Owen&apos;s Law becomes mandatory, the consequences of poor allergen management are severe. Recent prosecutions of independent UK food businesses include fines of £43,816 (Javitri Restaurant, Uxbridge), £27,803 (The Rusty Gun Pub, Hitchin), and £1,920 (Small&apos;s Kitchen, Derby). Under the Food Information Regulations 2014, fines are potentially unlimited. Hospital admissions for anaphylaxis reached 4,323 in 2023/24 — a 154% increase over 20 years.</p>
            <p className="text-sm text-gray-700 leading-relaxed">Read our <Link to="/guides/allergen-fines-uk" className="text-se-green-600 font-medium hover:underline">allergen fines guide</Link> for detailed prosecution cases and our <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">EHO inspection guide</Link> for what inspectors look for.</p>
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">What should your restaurant do now?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">The businesses that act now — before legislation makes it mandatory — gain three advantages. First, they are immediately safer for their customers, reducing the risk of an allergen incident that could result in prosecution, fines, and reputational damage. Second, they demonstrate best practice to <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">EHO inspectors</Link>, who are increasingly checking for written allergen information during routine inspections. Third, they avoid the scramble to comply when legislation arrives, which typically comes with tight implementation deadlines and the pressure of last-minute system changes.</p>
            <p className="text-gray-600 leading-relaxed mb-4">Practically, preparing for Owen&apos;s Law means providing written allergen information that customers can access independently at the point of ordering. This could take several forms: allergen symbols or abbreviations next to each dish on your printed menu, a separate allergen information board displayed in the dining area, an <Link to="/guides/allergen-menu-template" className="text-se-green-600 font-medium hover:underline">allergen matrix</Link> available on request, or a digital allergen menu accessible via QR code. The QR code approach is particularly effective because it allows customers to filter your menu by their specific allergies, can be updated instantly when recipes change, works offline for venues with poor mobile signal, and generates a digital audit trail that serves as evidence for EHO inspections.</p>
            <p className="text-gray-600 leading-relaxed mb-4">You should also establish a regular verification process. Review your allergen information at least weekly, especially after any recipe or supplier changes. Date-stamp each verification to build the audit trail that proves ongoing diligence — not just a one-off compliance exercise. This is exactly what <Link to="/guides/eho-allergen-inspection" className="text-se-green-600 font-medium hover:underline">EHO inspectors</Link> want to see, and it protects you in the event of an incident by demonstrating that your allergen management was systematic and current.</p>
            <p className="text-gray-600 leading-relaxed">Finally, train every member of staff on your allergen procedures — including temporary, agency, and seasonal workers. Written information should be supported by, not replaced by, staff knowledge. The FSA&apos;s best practice guidance explicitly recommends &quot;written allergen information, supported by a conversation&quot; — both elements working together to protect customers.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-3">The business opportunity in allergen compliance</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Owen&apos;s Law is typically framed as a regulatory burden, but for forward-thinking restaurants it represents a significant competitive opportunity. There are 2.4 million adults in the UK with a clinically confirmed food allergy — a number that has doubled in the last decade and continues to rise. 60% of young allergic diners aged 16-25 avoid eating out entirely because they do not trust the allergen information provided. 42% of all food-allergic adults have stopped dining out or ordering takeaway. These are customers who want to spend money in restaurants but cannot find venues they trust.</p>
            <p className="text-gray-600 leading-relaxed mb-4">The economic data is compelling. 86% of food-allergic consumers say their loyalty is directly influenced by how well a restaurant accommodates their allergy. These customers are measurably less price-sensitive than average diners — only 39% prioritise price compared to 65% of non-allergic diners. They bring groups: 44% of non-allergic consumers also consider allergy accommodations when choosing where to eat with friends or family, meaning one allergic person in a group of four makes your allergy policy relevant to all four covers. Research suggests restaurants can see a 10-15% revenue increase by becoming trusted allergy-safe destinations.</p>
            <p className="text-gray-600 leading-relaxed">The venue that provides clear, written allergen information — and goes further by letting customers save their allergy profile for future visits — turns compliance into retention. That is the gap no other UK allergen tool fills: connecting allergen data (compliance) with customer profiles (retention) in a single system that independent restaurants can afford.</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">Get ahead of Owen&apos;s Law today</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">SafeEat gives your customers written allergen information via QR code — exactly what Owen&apos;s Law calls for. Add your menu in 15 minutes, verify weekly, and build the audit trail that protects your business. The only UK allergen tool that also builds a database of your allergy customers.</p>
            <Link to="/dashboard" className="inline-block px-6 py-3 rounded-lg bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors">Start your free trial</Link>
            <p className="text-xs text-gray-400 mt-3">£29.99/month. No credit card required.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Related guides</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/guides/14-allergens-uk" className="bg-white rounded-xl border border-gray-200 p-4 hover:border-se-green-300 transition-colors">
                <p className="font-semibold text-gray-900 text-sm mb-1">14 Allergens UK</p>
                <p className="text-xs text-gray-500">Complete guide to every allergen your restaurant must declare</p>
              </Link>
              <Link to="/guides/eho-allergen-inspection" className="bg-white rounded-xl border border-gray-200 p-4 hover:border-se-green-300 transition-colors">
                <p className="font-semibold text-gray-900 text-sm mb-1">EHO Inspections</p>
                <p className="text-xs text-gray-500">What inspectors look for and how to build your audit trail</p>
              </Link>
              <Link to="/guides/natashas-law-restaurants" className="bg-white rounded-xl border border-gray-200 p-4 hover:border-se-green-300 transition-colors">
                <p className="font-semibold text-gray-900 text-sm mb-1">Natasha&apos;s Law</p>
                <p className="text-xs text-gray-500">PPDS labelling requirements for cafés and food businesses</p>
              </Link>
            </div>
          </div>
        </article>

        <footer className="border-t border-gray-200 py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2"><span className="text-xl">🍽️</span><span className="text-sm font-bold text-gray-900">SafeEat</span><span className="text-xs text-gray-400">© {new Date().getFullYear()}</span></div>
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
