/**
 * Email service using Resend REST API.
 * No SDK dependency — uses fetch() directly.
 */
const RESEND_API_URL = 'https://api.resend.com/emails'
const FROM_ADDRESS = 'SafeEat <hello@safeeat.co.uk>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@safeeat.co.uk'
/**
 * Send an email via Resend.
 * Fails silently — logs errors but never throws (emails should not break API responses).
 */
async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping email')
    return null
  }
  try {
    const res = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_ADDRESS, to: [to], subject, html }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error(`Resend error (${res.status}):`, err)
      return null
    }
    const data = await res.json()
    console.log(`Email sent to ${to}: ${subject} (${data.id})`)
    return data.id
  } catch (err) {
    console.error('Email send failed:', err.message || err)
    return null
  }
}
// ---------------------------------------------------------------------------
// 1. Contact form notification → admin inbox
// ---------------------------------------------------------------------------
export async function sendContactNotification({ name, email, message }) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject: `SafeEat contact: ${name}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #111827; font-size: 18px; margin-bottom: 16px;">New contact form submission</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #6b7280; width: 80px;">Name</td>
            <td style="padding: 8px 0; color: #111827; font-weight: 500;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #6b7280;">Email</td>
            <td style="padding: 8px 0; color: #111827;"><a href="mailto:${escapeHtml(email)}" style="color: #16a34a;">${escapeHtml(email)}</a></td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 8px; color: #374151; line-height: 1.6;">
          ${escapeHtml(message).replace(/\n/g, '<br>')}
        </div>
        <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">Reply directly to this email to respond to ${escapeHtml(name)}.</p>
      </div>
    `,
  })
}
// ---------------------------------------------------------------------------
// 2. Welcome email → new subscriber after Stripe checkout
// ---------------------------------------------------------------------------
export async function sendWelcomeEmail({ venueEmail, venueName }) {
  if (!venueEmail) return null
  return sendEmail({
    to: venueEmail,
    subject: `Welcome to SafeEat, ${venueName}!`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 40px;">🍽️</span>
          <h1 style="color: #111827; font-size: 22px; margin: 8px 0 4px;">Welcome to SafeEat</h1>
          <p style="color: #6b7280; margin: 0;">Your subscription is active</p>
        </div>
        <div style="background: #f0fdf4; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="color: #16a34a; font-size: 16px; margin: 0 0 12px;">Get started in 3 steps:</h2>
          <ol style="color: #374151; padding-left: 20px; margin: 0; line-height: 2;">
            <li><strong>Add your menu</strong> — go to Dashboard → Menu and add your dishes with allergen info</li>
            <li><strong>Verify your menu</strong> — tap "Verify now" on the Verification page to create your audit trail</li>
            <li><strong>Print your QR code</strong> — find it on the Settings page, print it, and place it on your tables</li>
          </ol>
        </div>
        <div style="background: #fffbeb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #92400e; margin: 0; font-size: 14px;">
            <strong>Compliance tip:</strong> Verify your menu regularly — especially after any recipe or supplier changes. 
            SafeEat logs every verification with a timestamp, giving you a clear audit trail for EHO inspections.
          </p>
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="https://safeeat.co.uk/dashboard" style="display: inline-block; padding: 12px 32px; background: #16a34a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Go to your dashboard</a>
        </div>
        <p style="color: #6b7280; font-size: 13px; text-align: center;">
          Need help? Reply to this email or visit <a href="https://safeeat.co.uk/contact" style="color: #16a34a;">safeeat.co.uk/contact</a>
        </p>
      </div>
    `,
  })
}
// ---------------------------------------------------------------------------
// 3. Verification reminder → venues that haven't verified in 7+ days
// ---------------------------------------------------------------------------
export async function sendVerificationReminder({ venueEmail, venueName, daysSince }) {
  if (!venueEmail) return null
  return sendEmail({
    to: venueEmail,
    subject: `${venueName}: Menu verification overdue (${daysSince} days)`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 40px;">⚠️</span>
          <h1 style="color: #111827; font-size: 20px; margin: 8px 0 4px;">Menu verification overdue</h1>
          <p style="color: #6b7280; margin: 0;">It's been <strong>${daysSince} days</strong> since your last verification</p>
        </div>
        <div style="background: #fef2f2; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #991b1b; margin: 0; font-size: 14px; line-height: 1.6;">
            Under UK Food Information Regulations, you must ensure allergen information is accurate at all times. 
            Regular verification creates the audit trail that protects you during EHO inspections.
          </p>
        </div>
        <div style="background: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #374151; margin: 0; font-size: 14px; line-height: 1.6;">
            <strong>Quick check:</strong> Have any recipes, suppliers, or ingredients changed since your last verification? 
            If yes, update your menu first. If nothing's changed, a quick confirmation takes 10 seconds.
          </p>
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="https://safeeat.co.uk/dashboard/verification" style="display: inline-block; padding: 12px 32px; background: #16a34a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Verify now</a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">
          This is an automated reminder from SafeEat to help you stay compliant.
        </p>
      </div>
    `,
  })
}
// ---------------------------------------------------------------------------
// 4. Weekly insight email → venue owners every Monday morning
// ---------------------------------------------------------------------------
const ALLERGEN_NAMES = {
  celery: 'Celery', gluten: 'Gluten', crustaceans: 'Crustaceans', eggs: 'Eggs',
  fish: 'Fish', lupin: 'Lupin', milk: 'Milk', molluscs: 'Molluscs',
  mustard: 'Mustard', tree_nuts: 'Tree nuts', peanuts: 'Peanuts',
  sesame: 'Sesame', soybeans: 'Soya', sulphites: 'Sulphites',
}
const ALLERGEN_BITS = [
  'celery', 'gluten', 'crustaceans', 'eggs', 'fish', 'lupin', 'milk',
  'molluscs', 'mustard', 'tree_nuts', 'peanuts', 'sesame', 'soybeans', 'sulphites',
]
export async function sendWeeklyInsight({ venueEmail, venueName, stats }) {
  if (!venueEmail) return null
  const {
    scansThisWeek = 0,
    scansPreviousWeek = 0,
    newProfiles = 0,
    totalProfiles = 0,
    newOptIns = 0,
    totalOptIns = 0,
    topAllergens = [],
    totalDishes = 0,
    lastVerifiedDaysAgo = null,
  } = stats
  const scanDiff = scansThisWeek - scansPreviousWeek
  const scanTrend = scanDiff > 0
    ? `<span style="color: #16a34a;">↑ ${scanDiff} more than last week</span>`
    : scanDiff < 0
      ? `<span style="color: #dc2626;">↓ ${Math.abs(scanDiff)} fewer than last week</span>`
      : '<span style="color: #6b7280;">Same as last week</span>'
  const topAllergenRows = topAllergens.slice(0, 5).map((a) => {
    const name = ALLERGEN_NAMES[a.allergen] || a.allergen
    const pct = a.percentage
    const barWidth = Math.min(Math.round(pct), 100)
    return `
      <tr>
        <td style="padding: 4px 8px 4px 0; color: #374151; font-size: 14px; width: 100px;">${escapeHtml(name)}</td>
        <td style="padding: 4px 0;">
          <div style="background: #f3f4f6; border-radius: 4px; height: 20px; width: 100%; position: relative;">
            <div style="background: #16a34a; border-radius: 4px; height: 20px; width: ${barWidth}%; min-width: 2px;"></div>
          </div>
        </td>
        <td style="padding: 4px 0 4px 8px; color: #6b7280; font-size: 13px; width: 50px; text-align: right;">${pct}%</td>
      </tr>
    `
  }).join('')
  let recommendation = ''
  if (lastVerifiedDaysAgo !== null && lastVerifiedDaysAgo > 7) {
    recommendation = `<strong>Action needed:</strong> Your menu hasn't been verified in ${lastVerifiedDaysAgo} days. <a href="https://safeeat.co.uk/dashboard/verification" style="color: #16a34a;">Verify now</a> to keep your audit trail current.`
  } else if (topAllergens.length > 0 && topAllergens[0].percentage > 50) {
    const topName = ALLERGEN_NAMES[topAllergens[0].allergen] || topAllergens[0].allergen
    recommendation = `<strong>Opportunity:</strong> ${topAllergens[0].percentage}% of your profiled customers filter for ${topName.toLowerCase()}. Consider highlighting your ${topName.toLowerCase()}-free options more prominently.`
  } else if (totalOptIns > 0 && scansThisWeek > 0) {
    recommendation = `<strong>Tip:</strong> You have ${totalOptIns} customers opted in for notifications. Send them an update about new menu items to drive return visits.`
  } else if (scansThisWeek === 0) {
    recommendation = `<strong>Tip:</strong> No scans this week. Make sure your QR code is visible on tables and in your front window. <a href="https://safeeat.co.uk/dashboard/settings" style="color: #16a34a;">Download QR code</a>`
  } else {
    recommendation = `<strong>Looking good:</strong> Your menu is verified and customers are scanning. Keep it up!`
  }
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)
  const dateRange = `${weekStart.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
  return sendEmail({
    to: venueEmail,
    subject: `${venueName}: ${scansThisWeek} menu scans this week`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 36px;">📊</span>
          <h1 style="color: #111827; font-size: 20px; margin: 8px 0 4px;">Your weekly SafeEat report</h1>
          <p style="color: #6b7280; margin: 0; font-size: 13px;">${dateRange}</p>
        </div>
        <div style="display: flex; gap: 12px; margin-bottom: 24px;">
          <div style="flex: 1; background: #f0fdf4; border-radius: 12px; padding: 16px; text-align: center;">
            <p style="color: #16a34a; font-size: 28px; font-weight: 700; margin: 0;">${scansThisWeek}</p>
            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">Menu scans</p>
          </div>
          <div style="flex: 1; background: #eff6ff; border-radius: 12px; padding: 16px; text-align: center;">
            <p style="color: #2563eb; font-size: 28px; font-weight: 700; margin: 0;">${newProfiles}</p>
            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">New profiles</p>
          </div>
          <div style="flex: 1; background: #fef3c7; border-radius: 12px; padding: 16px; text-align: center;">
            <p style="color: #d97706; font-size: 28px; font-weight: 700; margin: 0;">${newOptIns}</p>
            <p style="color: #6b7280; font-size: 12px; margin: 4px 0 0;">New opt-ins</p>
          </div>
        </div>
        <div style="margin-bottom: 20px; padding: 12px 16px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #374151;">
            Scan trend: ${scanTrend}
          </p>
        </div>
        <div style="margin-bottom: 24px; padding: 12px 16px; background: #f9fafb; border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 4px 0; color: #6b7280; font-size: 13px;">Total customer profiles</td>
              <td style="padding: 4px 0; color: #111827; font-size: 13px; font-weight: 600; text-align: right;">${totalProfiles}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #6b7280; font-size: 13px;">Marketing opt-ins</td>
              <td style="padding: 4px 0; color: #111827; font-size: 13px; font-weight: 600; text-align: right;">${totalOptIns}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; color: #6b7280; font-size: 13px;">Active dishes</td>
              <td style="padding: 4px 0; color: #111827; font-size: 13px; font-weight: 600; text-align: right;">${totalDishes}</td>
            </tr>
          </table>
        </div>
        ${topAllergens.length > 0 ? `
          <div style="margin-bottom: 24px;">
            <h2 style="color: #111827; font-size: 15px; margin: 0 0 12px;">Your customers' top allergens</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${topAllergenRows}
            </table>
            <p style="color: #9ca3af; font-size: 11px; margin: 8px 0 0;">Based on saved customer profiles at your venue</p>
          </div>
        ` : ''}
        <div style="background: #fffbeb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
          <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
            ${recommendation}
          </p>
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="https://safeeat.co.uk/dashboard" style="display: inline-block; padding: 12px 32px; background: #16a34a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Go to dashboard</a>
        </div>
        <p style="color: #9ca3af; font-size: 11px; text-align: center;">
          You're receiving this because you have an active SafeEat subscription.<br>
          This report is sent every Monday morning.
        </p>
      </div>
    `,
  })
}
// ---------------------------------------------------------------------------
// 5. Customer notification → allergen-targeted marketing email
// ---------------------------------------------------------------------------
export async function sendCustomerNotification({ to, subject, message, venueName, venueSlug }) {
  if (!to) return null
  return sendEmail({
    to,
    subject,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 36px;">🍽️</span>
          <h1 style="color: #111827; font-size: 20px; margin: 8px 0 4px;">News from ${escapeHtml(venueName)}</h1>
        </div>
        <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="color: #374151; margin: 0; font-size: 15px; line-height: 1.7;">
            ${escapeHtml(message).replace(/\n/g, '<br>')}
          </p>
        </div>
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="https://safeeat.co.uk/menu/${escapeHtml(venueSlug)}" style="display: inline-block; padding: 12px 32px; background: #16a34a; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">View our menu</a>
        </div>
        <div style="border-top: 1px solid #e5e7eb; padding-top: 16px; margin-top: 16px;">
          <p style="color: #9ca3af; font-size: 11px; text-align: center; margin: 0;">
            You're receiving this because you saved your allergen profile at ${escapeHtml(venueName)} and opted in to updates.<br>
            Sent via <a href="https://safeeat.co.uk" style="color: #16a34a;">SafeEat</a>
          </p>
        </div>
      </div>
    `,
  })
}
// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------
function escapeHtml(str) {
  if (!str) return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
