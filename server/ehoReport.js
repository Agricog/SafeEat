import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const ALLERGEN_NAMES = [
  'Celery', 'Gluten', 'Crustaceans', 'Eggs', 'Fish', 'Lupin', 'Milk',
  'Molluscs', 'Mustard', 'Tree nuts', 'Peanuts', 'Sesame', 'Soya', 'Sulphites',
]

const GREEN = rgb(0.086, 0.639, 0.247)   // #16a34a
const DARK = rgb(0.067, 0.094, 0.153)     // #111827
const GREY = rgb(0.420, 0.447, 0.498)     // #6b7280
const LIGHT_GREY = rgb(0.969, 0.973, 0.976) // #f7f8f9
const WHITE = rgb(1, 1, 1)

/**
 * Generate EHO-ready allergen compliance PDF report.
 * Returns a Uint8Array of the PDF bytes.
 */
export async function generateEhoReport({ venue, dishes, verifications, training }) {
  const pdf = await PDFDocument.create()
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica)

  const pageWidth = 841.89  // A4 landscape
  const pageHeight = 595.28
  const margin = 40
  const contentWidth = pageWidth - margin * 2

  // =========================================================================
  // PAGE 1: Cover + Allergen Matrix
  // =========================================================================
  let page = pdf.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  // Header bar
  page.drawRectangle({ x: 0, y: pageHeight - 60, width: pageWidth, height: 60, color: GREEN })
  page.drawText('SafeEat - Allergen Compliance Report', {
    x: margin, y: pageHeight - 40, size: 18, font: fontBold, color: WHITE,
  })
  page.drawText('EHO Inspection Ready', {
    x: pageWidth - margin - fontRegular.widthOfTextAtSize('EHO Inspection Ready', 11),
    y: pageHeight - 38, size: 11, font: fontRegular, color: WHITE,
  })

  y = pageHeight - 80

  // Venue details
  page.drawText(venue.name || 'Unnamed Venue', { x: margin, y, size: 14, font: fontBold, color: DARK })
  y -= 16
  if (venue.address) {
    page.drawText(venue.address, { x: margin, y, size: 9, font: fontRegular, color: GREY })
    y -= 14
  }
  const reportDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  page.drawText(`Report generated: ${reportDate}`, { x: margin, y, size: 9, font: fontRegular, color: GREY })
  y -= 24

  // Allergen matrix
  page.drawText('Allergen Matrix', { x: margin, y, size: 12, font: fontBold, color: DARK })
  y -= 16

  // Active dishes only
  const activeDishes = dishes.filter((d) => d.active !== false)

  if (activeDishes.length === 0) {
    page.drawText('No active dishes on menu.', { x: margin, y, size: 10, font: fontRegular, color: GREY })
    y -= 20
  } else {
    // Table layout
    const dishColWidth = 160
    const allergenColWidth = Math.min(Math.floor((contentWidth - dishColWidth) / 14), 46)
    const rowHeight = 16
    const headerHeight = 50

    // Header row - allergen names rotated (we'll abbreviate instead since pdf-lib can't rotate text easily)
    const allergenAbbrevs = ['Ce', 'Gl', 'Cr', 'Eg', 'Fi', 'Lu', 'Mi', 'Mo', 'Mu', 'TN', 'Pe', 'Se', 'So', 'Su']

    // Draw header background
    page.drawRectangle({ x: margin, y: y - headerHeight, width: dishColWidth + allergenColWidth * 14, height: headerHeight, color: LIGHT_GREY })

    // Dish column header
    page.drawText('Dish', { x: margin + 4, y: y - 12, size: 8, font: fontBold, color: DARK })

    // Allergen column headers (abbreviated + full below)
    for (let i = 0; i < 14; i++) {
      const colX = margin + dishColWidth + i * allergenColWidth
      page.drawText(allergenAbbrevs[i], { x: colX + 4, y: y - 12, size: 7, font: fontBold, color: DARK })
      // Full name smaller
      const fullName = ALLERGEN_NAMES[i]
      const nameWidth = fontRegular.widthOfTextAtSize(fullName, 5.5)
      page.drawText(fullName, { x: colX + 4, y: y - 24, size: 5.5, font: fontRegular, color: GREY })
    }

    y -= headerHeight

    // Data rows
    for (let di = 0; di < activeDishes.length; di++) {
      // Check if we need a new page
      if (y - rowHeight < margin + 20) {
        page = pdf.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
        // Re-draw header on new page
        page.drawRectangle({ x: margin, y: y - headerHeight, width: dishColWidth + allergenColWidth * 14, height: headerHeight, color: LIGHT_GREY })
        page.drawText('Dish', { x: margin + 4, y: y - 12, size: 8, font: fontBold, color: DARK })
        for (let i = 0; i < 14; i++) {
          const colX = margin + dishColWidth + i * allergenColWidth
          page.drawText(allergenAbbrevs[i], { x: colX + 4, y: y - 12, size: 7, font: fontBold, color: DARK })
          page.drawText(ALLERGEN_NAMES[i], { x: colX + 4, y: y - 24, size: 5.5, font: fontRegular, color: GREY })
        }
        y -= headerHeight
      }

      const dish = activeDishes[di]
      const rowY = y - rowHeight

      // Alternate row shading
      if (di % 2 === 0) {
        page.drawRectangle({ x: margin, y: rowY, width: dishColWidth + allergenColWidth * 14, height: rowHeight, color: rgb(0.98, 0.98, 0.99) })
      }

      // Dish name (truncate if too long)
      let dishName = dish.name || 'Unnamed'
      if (fontRegular.widthOfTextAtSize(dishName, 7.5) > dishColWidth - 8) {
        while (fontRegular.widthOfTextAtSize(dishName + '...', 7.5) > dishColWidth - 8 && dishName.length > 0) {
          dishName = dishName.slice(0, -1)
        }
        dishName += '...'
      }
      page.drawText(dishName, { x: margin + 4, y: rowY + 4, size: 7.5, font: fontRegular, color: DARK })

      // Allergen marks
      const mask = dish.allergen_mask || 0
      for (let i = 0; i < 14; i++) {
        const colX = margin + dishColWidth + i * allergenColWidth
        if (mask & (1 << i)) {
          // Draw a green filled circle for contains
          page.drawCircle({ x: colX + allergenColWidth / 2, y: rowY + rowHeight / 2, size: 5, color: GREEN })
        }
      }

      y -= rowHeight
    }

    // Legend
    y -= 16
    page.drawCircle({ x: margin + 5, y: y + 3, size: 4, color: GREEN })
    page.drawText('= Contains this allergen', { x: margin + 14, y, size: 7.5, font: fontRegular, color: GREY })
  }

  // =========================================================================
  // PAGE 2: Dietary Flags + Ingredients + Verification Log
  // =========================================================================
  page = pdf.addPage([pageWidth, pageHeight])
  y = pageHeight - margin

  // Header bar
  page.drawRectangle({ x: 0, y: pageHeight - 50, width: pageWidth, height: 50, color: GREEN })
  page.drawText('Dietary Information & Verification Audit Trail', {
    x: margin, y: pageHeight - 35, size: 14, font: fontBold, color: WHITE,
  })
  y = pageHeight - 70

  // Dietary flags table
  page.drawText('Dietary Declarations', { x: margin, y, size: 11, font: fontBold, color: DARK })
  y -= 14

  const dietaryFlags = ['Vegan', 'Vegetarian', 'Gluten-free', 'Dairy-free', 'Halal', 'Kosher']
  const dietaryKeys = ['is_vegan', 'is_vegetarian', 'is_gluten_free', 'is_dairy_free', 'is_halal', 'is_kosher']
  const dishesWithDietary = activeDishes.filter((d) => dietaryKeys.some((k) => d[k]))

  if (dishesWithDietary.length === 0) {
    page.drawText('No dietary declarations set on any dishes.', { x: margin, y, size: 9, font: fontRegular, color: GREY })
    y -= 20
  } else {
    for (const dish of dishesWithDietary) {
      if (y < margin + 40) {
        page = pdf.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
      }
      const flags = dietaryKeys
        .map((k, i) => dish[k] ? dietaryFlags[i] : null)
        .filter(Boolean)
        .join(', ')

      page.drawText(`${dish.name}:`, { x: margin, y, size: 8, font: fontBold, color: DARK })
      page.drawText(flags, { x: margin + fontBold.widthOfTextAtSize(`${dish.name}: `, 8), y, size: 8, font: fontRegular, color: GREY })
      y -= 13
    }
  }

  // Ingredients list
  y -= 12
  page.drawText('Ingredients by Dish', { x: margin, y, size: 11, font: fontBold, color: DARK })
  y -= 14

  const dishesWithIngredients = activeDishes.filter((d) => d.ingredients && d.ingredients.trim())
  if (dishesWithIngredients.length === 0) {
    page.drawText('No ingredient data recorded.', { x: margin, y, size: 9, font: fontRegular, color: GREY })
    y -= 20
  } else {
    for (const dish of dishesWithIngredients) {
      if (y < margin + 40) {
        page = pdf.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
      }
      page.drawText(dish.name, { x: margin, y, size: 8, font: fontBold, color: DARK })
      y -= 12
      // Wrap ingredients text
      const ingText = dish.ingredients
      const maxLineWidth = contentWidth - 10
      const words = ingText.split(/\s+/)
      let line = ''
      for (const word of words) {
        const testLine = line ? `${line} ${word}` : word
        if (fontRegular.widthOfTextAtSize(testLine, 7.5) > maxLineWidth) {
          page.drawText(line, { x: margin + 8, y, size: 7.5, font: fontRegular, color: GREY })
          y -= 11
          line = word
          if (y < margin + 20) {
            page = pdf.addPage([pageWidth, pageHeight])
            y = pageHeight - margin
          }
        } else {
          line = testLine
        }
      }
      if (line) {
        page.drawText(line, { x: margin + 8, y, size: 7.5, font: fontRegular, color: GREY })
        y -= 13
      }
    }
  }

  // Verification log
  y -= 12
  if (y < margin + 100) {
    page = pdf.addPage([pageWidth, pageHeight])
    y = pageHeight - margin
  }
  page.drawText('Verification Audit Trail', { x: margin, y, size: 11, font: fontBold, color: DARK })
  y -= 14
  page.drawText(
    'This log demonstrates due diligence under the Food Information Regulations 2014.',
    { x: margin, y, size: 8, font: fontRegular, color: GREY }
  )
  y -= 18

  if (!verifications || verifications.length === 0) {
    page.drawText('No verifications recorded yet.', { x: margin, y, size: 9, font: fontRegular, color: GREY })
  } else {
    // Table header
    page.drawRectangle({ x: margin, y: y - 14, width: contentWidth, height: 14, color: LIGHT_GREY })
    page.drawText('Date', { x: margin + 4, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    page.drawText('Time', { x: margin + 120, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    page.drawText('Type', { x: margin + 200, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    page.drawText('Note', { x: margin + 300, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    y -= 14

    for (const v of verifications.slice(0, 30)) {
      if (y < margin + 20) {
        page = pdf.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
      }
      const vDate = new Date(v.verified_at)
      const dateStr = vDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      const timeStr = vDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      const typeLabel = v.type === 'confirmed' ? 'Confirmed' : v.type === 'updated' ? 'Updated' : 'Missed'

      page.drawText(dateStr, { x: margin + 4, y: y - 11, size: 7.5, font: fontRegular, color: DARK })
      page.drawText(timeStr, { x: margin + 120, y: y - 11, size: 7.5, font: fontRegular, color: DARK })
      page.drawText(typeLabel, { x: margin + 200, y: y - 11, size: 7.5, font: fontBold, color: v.type === 'confirmed' ? GREEN : v.type === 'updated' ? rgb(0.851, 0.467, 0.024) : rgb(0.863, 0.106, 0.106) })

      // Truncate note
      let noteText = v.note || '-'
      const maxNoteWidth = contentWidth - 310
      if (fontRegular.widthOfTextAtSize(noteText, 7.5) > maxNoteWidth) {
        while (fontRegular.widthOfTextAtSize(noteText + '...', 7.5) > maxNoteWidth && noteText.length > 0) {
          noteText = noteText.slice(0, -1)
        }
        noteText += '...'
      }
      page.drawText(noteText, { x: margin + 300, y: y - 11, size: 7.5, font: fontRegular, color: GREY })
      y -= 14
    }
  }

  // Staff training log
  y -= 12
  if (y < margin + 80) {
    page = pdf.addPage([pageWidth, pageHeight])
    y = pageHeight - margin
  }
  page.drawText('Staff Training Records', { x: margin, y, size: 11, font: fontBold, color: DARK })
  y -= 14

  if (!training || training.length === 0) {
    page.drawText('No training records logged.', { x: margin, y, size: 9, font: fontRegular, color: GREY })
    y -= 20
  } else {
    const typeLabels = {
      allergen_awareness: 'Allergen Awareness',
      food_safety_l2: 'Food Safety L2',
      food_safety_l3: 'Food Safety L3',
      anaphylaxis: 'Anaphylaxis',
      other: 'Other',
    }
    page.drawRectangle({ x: margin, y: y - 14, width: contentWidth, height: 14, color: LIGHT_GREY })
    page.drawText('Name', { x: margin + 4, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    page.drawText('Training', { x: margin + 180, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    page.drawText('Certificate', { x: margin + 380, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    page.drawText('Date', { x: margin + 560, y: y - 11, size: 7.5, font: fontBold, color: DARK })
    y -= 14
    for (const t of training) {
      if (y < margin + 20) {
        page = pdf.addPage([pageWidth, pageHeight])
        y = pageHeight - margin
      }
      const tDate = new Date(t.trained_at)
      const dateStr = tDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      page.drawText(t.staff_name || '-', { x: margin + 4, y: y - 11, size: 7.5, font: fontRegular, color: DARK })
      page.drawText(typeLabels[t.training_type] || t.training_type, { x: margin + 180, y: y - 11, size: 7.5, font: fontRegular, color: DARK })
      page.drawText(t.certificate_ref || '-', { x: margin + 380, y: y - 11, size: 7.5, font: fontRegular, color: GREY })
      page.drawText(dateStr, { x: margin + 560, y: y - 11, size: 7.5, font: fontRegular, color: DARK })
      y -= 14
    }
  }

  // Footer on last page
  y -= 20
  if (y > margin) {
    page.drawText(
      `This report was generated by SafeEat (safeeat.co.uk) on ${reportDate}. It reflects the allergen and dietary data entered by the venue at the time of generation.`,
      { x: margin, y, size: 7, font: fontRegular, color: GREY }
    )
  }

  return await pdf.save()
}
