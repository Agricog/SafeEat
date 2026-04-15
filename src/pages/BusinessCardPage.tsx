import { Helmet } from 'react-helmet-async'

export default function BusinessCardPage() {
  const phone = '07501439406'
  const phoneFormatted = '07501 439 406'
  const email = 'hello@safeeat.co.uk'
  const website = 'safeeat.co.uk'
  const demoUrl = 'https://safeeat.co.uk/menu/demo'
  const name = 'Mick'
  const role = 'Founder'
  const company = 'SafeEat'

  const handleSaveContact = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name} - ${company}`,
      `ORG:${company}`,
      `TITLE:${role}`,
      `TEL;TYPE=CELL:${phone}`,
      `EMAIL:${email}`,
      `URL:https://${website}`,
      `NOTE:SafeEat - Allergen menu software for UK restaurants`,
      'END:VCARD',
    ].join('\n')

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name}-SafeEat.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet>
        <title>Mick - SafeEat</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Green header */}
            <div className="bg-se-green-600 px-6 pt-8 pb-6 text-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🍽️</span>
              </div>
              <h1 className="text-2xl font-bold text-white">{name}</h1>
              <p className="text-se-green-100 text-sm mt-1">{role} at {company}</p>
            </div>

            {/* Contact details */}
            <div className="px-6 py-5 space-y-1">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-se-green-50 flex items-center justify-center text-se-green-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </span>
                <div>
                  <p className="text-xs text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{phoneFormatted}</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-se-green-50 flex items-center justify-center text-se-green-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                </span>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-900">{email}</p>
                </div>
              </a>

              <a
                href={`https://${website}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="w-10 h-10 rounded-full bg-se-green-50 flex items-center justify-center text-se-green-600 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                </span>
                <div>
                  <p className="text-xs text-gray-400">Website</p>
                  <p className="text-sm font-medium text-gray-900">{website}</p>
                </div>
              </a>
            </div>

            {/* Save contact button */}
            <div className="px-6 pb-3">
              <button
                onClick={handleSaveContact}
                className="w-full px-6 py-3 rounded-xl bg-se-green-600 text-white font-medium hover:bg-se-green-700 transition-colors text-center text-sm"
              >
                Save to contacts
              </button>
            </div>

            {/* Demo menu QR */}
            <div className="px-6 pb-6 pt-2">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-3">Scan to see a live SafeEat demo menu</p>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(demoUrl)}&margin=4&format=png`}
                  alt="SafeEat demo menu QR code"
                  className="w-36 h-36 mx-auto"
                />
                <p className="text-xs text-gray-400 mt-2">safeeat.co.uk/menu/demo</p>
              </div>
            </div>
          </div>

          {/* Powered by */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Allergen menu software for UK restaurants
          </p>
        </div>
      </div>
    </>
  )
}
