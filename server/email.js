/**
 * Email service using Resend REST API.
 * No SDK dependency — uses fetch() directly.
 */

const RESEND_API_URL = 'https://api.eu.resend.com/emails'
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
