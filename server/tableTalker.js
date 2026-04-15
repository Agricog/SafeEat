import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const GREEN = rgb(0.086, 0.639, 0.247)
const DARK = rgb(0.067, 0.094, 0.153)
const GREY = rgb(0.420, 0.447, 0.498)
const WHITE = rgb(1, 1, 1)
const LIGHT_GREEN = rgb(0.941, 0.992, 0.957)

/**
 * Generate a printable A5 table talker PDF with QR code.
 * Returns Uint8Array of PDF bytes.
 */
export async function generateTableTalker({ venueName, menuUrl }) {
  const pdf = await PDFDocument.create()
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica)

  // A5 portrait: 420 x 595 points
  const pageWidth = 420
  const pageHeight = 595
  const page = pdf.addPage([pageWidth, pageHeight])

  // Full green header bar
  page.drawRectangle({ x: 0, y: pageHeight - 80, width: pageWidth, height: 80, color: GREEN })

  // SafeEat branding in header
  const titleText = 'SafeEat'
  const titleWidth = fontBold.widthOfTextAtSize(titleText, 28)
  page.drawText(titleText, {
    x: (pageWidth - titleWidth) / 2,
    y: pageHeight - 52,
    size: 28,
    font: fontBold,
    color: WHITE,
  })

  // Venue name below header
  const venueText = venueName || 'Our Menu'
  const venueFontSize = venueText.length > 25 ? 16 : 20
  const venueWidth = fontBold.widthOfTextAtSize(venueText, venueFontSize)
  page.drawText(venueText, {
    x: (pageWidth - venueWidth) / 2,
    y: pageHeight - 115,
    size: venueFontSize,
    font: fontBold,
    color: DARK,
  })

  // Main instruction text
  const scanText = 'Scan for our allergen-safe menu'
  const scanWidth = fontRegular.widthOfTextAtSize(scanText, 14)
  page.drawText(scanText, {
    x: (pageWidth - scanWidth) / 2,
    y: pageHeight - 145,
    size: 14,
    font: fontRegular,
    color: GREY,
  })

  // QR code placeholder area (light green rounded rectangle)
  const qrSize = 180
  const qrX = (pageWidth - qrSize) / 2
  const qrY = pageHeight - 350
  page.drawRectangle({
    x: qrX - 15,
    y: qrY - 15,
    width: qrSize + 30,
    height: qrSize + 30,
    color: LIGHT_GREEN,
    borderColor: GREEN,
    borderWidth: 2,
  })

  // Fetch QR code image from API and embed it
  try {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=360x360&data=${encodeURIComponent(menuUrl)}&margin=4&format=png`
    const qrResponse = await fetch(qrUrl)
    if (qrResponse.ok) {
      const qrBytes = await qrResponse.arrayBuffer()
      const qrImage = await pdf.embedPng(new Uint8Array(qrBytes))
      page.drawImage(qrImage, { x: qrX, y: qrY, width: qrSize, height: qrSize })
    }
  } catch (err) {
    // If QR fetch fails, draw placeholder text
    const placeholderText = 'QR Code'
    const placeholderWidth = fontBold.widthOfTextAtSize(placeholderText, 18)
    page.drawText(placeholderText, {
      x: (pageWidth - placeholderWidth) / 2,
      y: qrY + qrSize / 2 - 9,
      size: 18,
      font: fontBold,
      color: GREY,
    })
  }

  // Instructions below QR
  const instructions = [
    'Select your allergies',
    'See only safe dishes',
    'No app needed',
  ]
  let instrY = qrY - 40
  for (const line of instructions) {
    const bulletText = `- ${line}`
    const bulletWidth = fontRegular.widthOfTextAtSize(bulletText, 13)
    page.drawText(bulletText, {
      x: (pageWidth - bulletWidth) / 2,
      y: instrY,
      size: 13,
      font: fontRegular,
      color: DARK,
    })
    instrY -= 22
  }

  // Allergen compliance note
  instrY -= 10
  const complianceText = 'Allergen information verified regularly'
  const complianceWidth = fontRegular.widthOfTextAtSize(complianceText, 10)
  page.drawText(complianceText, {
    x: (pageWidth - complianceWidth) / 2,
    y: instrY,
    size: 10,
    font: fontRegular,
    color: GREY,
  })

  // Bottom bar
  page.drawRectangle({ x: 0, y: 0, width: pageWidth, height: 40, color: GREEN })
  const footerText = 'safeeat.co.uk'
  const footerWidth = fontRegular.widthOfTextAtSize(footerText, 12)
  page.drawText(footerText, {
    x: (pageWidth - footerWidth) / 2,
    y: 14,
    size: 12,
    font: fontRegular,
    color: WHITE,
  })

  return await pdf.save()
}
