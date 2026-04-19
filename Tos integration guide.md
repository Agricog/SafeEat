# SafeEat — ToS Acceptance Flow Integration Guide

**Status:** Ready to deploy after lawyer review of ToS draft.
**Current ToS version tracked in code:** `1.0`
**Deploy order matters.** Steps must run in sequence — running them out of order will break the existing subscribe flow.

---

## What this flow does

A new customer clicks Subscribe on the dashboard. Before anything is sent to Stripe, a modal appears showing the Terms of Service and Data Processing Agreement with two separate tick-boxes:

1. Agreement to the Terms of Service + DPA.
2. Explicit acknowledgement that the venue remains solely responsible for data accuracy, staff training, kitchen practices, and food preparation.

When both are ticked and the user continues, the frontend records the acceptance (venue_id, version, IP, user-agent, timestamp) to the `tos_acceptances` table via `POST /api/dashboard/:venueId/tos/accept`. Only after the server confirms the write does the frontend call the existing `/billing/checkout` endpoint.

The checkout endpoint itself re-validates that a current acceptance exists on record before creating the Stripe session — this is the defence-in-depth layer. A determined user crafting a direct API call to bypass the frontend tick-box would still be refused at the checkout endpoint.

Once the customer completes payment, the `checkout.session.completed` webhook fires. The webhook (a) activates the subscription as before, (b) links the acceptance row to the Stripe session ID, and (c) sends the ToS confirmation email with the real acceptance timestamp and IP.

---

## Prerequisites before you start

You must have:

- [ ] The `/terms` page live at `safeeat.co.uk/terms`
- [ ] The `/dpa` page live at `safeeat.co.uk/dpa`
- [ ] The lawyer-reviewed ToS content on those pages (placeholder is acceptable only if you're testing — real customers should see the reviewed version)
- [ ] A staging/test Stripe key and test Price ID to verify end-to-end without charging a real card

If any of those aren't in place, fix them first and come back to this.

---

## Deployment sequence

### Step 1 — Run the database migration

Open Neon SQL editor and paste the contents of `migration-tos-acceptances.sql`. Run it.

Verify it worked by running this afterwards:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tos_acceptances'
ORDER BY ordinal_position;
```

Expected: 9 rows. `id`, `venue_id`, `tos_version` should be `NOT NULL`. Everything else nullable.

**If this fails:** do not proceed. The server will crash on startup when it hits the new endpoints.

---

### Step 2 — Add the email helper to `server/email.js`

Open `server/email.js` in GitHub web UI.

At the very bottom of the file (after the existing `escapeHtml` function is fine — the ordering doesn't matter because they're all `export async function` declarations hoisted at module load), paste the complete contents of `email-sendToSConfirmation.js`.

**Important:** do not remove, rename, or modify any existing function. The only change is adding one new `export async function sendToSConfirmation(…)` alongside the existing helpers.

Commit with message: `feat(email): add ToS acceptance confirmation email helper`

Do not deploy yet — Step 3 must ship in the same commit-to-main event or Railway will briefly fail to import `sendToSConfirmation` from `server/index.js`.

---

### Step 3 — Replace `server/index.js`

Open `server/index.js` in GitHub web UI. Use "Edit in place" → select all → paste the complete contents of the new `server-index.js` → commit.

Commit with message: `feat(billing): gate Stripe checkout behind ToS acceptance`

What's actually different from the previous version (for your records, not for action):

- New `CURRENT_TOS_VERSION` constant at the top (`'1.0'`)
- `sendToSConfirmation` added to the imports from `./email.js`
- Two new endpoints inside the venue-scoped dashboard block:
  - `GET /api/dashboard/:venueId/tos/acceptance` — checks whether current-version acceptance exists
  - `POST /api/dashboard/:venueId/tos/accept` — records a new acceptance with IP + UA
- `POST /api/dashboard/:venueId/billing/checkout` now refuses with HTTP 403 + `error: 'tos_acceptance_required'` if no valid acceptance exists
- `checkout.session.completed` webhook now fires two additional best-effort writes after the welcome email: link the acceptance row to the Stripe session, and send the ToS confirmation email
- One new line in the startup log confirming the ToS version

Everything else in the file is byte-identical to what was there before, including all quirks (the indentation in `GET /api/dashboard/me`, the lowercase `Where` in the EHO report query, the triple `// ---` separator before photo upload, the out-of-alignment `const allergenMask`).

**After commit: watch Railway.** The deploy must go green. Signals to watch for in Railway logs:

- `SafeEat API running on port 8080` — server booted
- `ToS enforcement: active, current version v1.0` — new constant wired up correctly
- **No errors about `sendToSConfirmation` being undefined** — means Step 2 went in correctly

If you see `ReferenceError: sendToSConfirmation is not defined`, Step 2 didn't ship. Re-check `server/email.js`.

---

### Step 4 — Add `ToSAcceptance.tsx` to the frontend

Create a new file at `src/components/ToSAcceptance.tsx` and paste the full component.

Commit with message: `feat(billing): add ToS acceptance gate component`

This file is inert until Step 5 wires it up. No visible change on the site yet.

---

### Step 5 — Wire the Subscribe button in `DashboardSettings.tsx`

**Share your current `DashboardSettings.tsx` file and I'll give you a targeted edit.**

The pattern will be:

1. Import `ToSAcceptance` and `useState`
2. Add a `showToSGate` state variable
3. Refactor the existing Subscribe click handler into two functions:
   - `handleSubscribeClick` — checks via `GET /tos/acceptance` whether the venue already has a valid acceptance on record. If yes, proceeds straight to Stripe. If no, sets `showToSGate=true`.
   - `redirectToStripe` — the existing POST to `/billing/checkout` + `window.location.href = url` flow, factored out
   - `handleToSAccepted` — called by the ToSAcceptance component on success, which then calls `redirectToStripe`
4. Render `<ToSAcceptance … />` conditionally on `showToSGate` inside the existing return

This needs your actual `DashboardSettings.tsx` to integrate cleanly. I will not guess at your current code — paste the file and I'll do the edit surgically.

---

## Test checklist (do all of these before marking the feature live)

Use Stripe **test mode** for these — your existing Stripe config should support test/live toggle via env vars.

### Happy path — new customer

1. Create a fresh test venue via the signup flow
2. Go to Dashboard → Settings → click Subscribe
3. **Expected:** ToS gate modal appears
4. Tick both boxes → click "Accept and continue to payment"
5. **Expected:** Modal shows "Recording…" spinner briefly, then the page redirects to Stripe checkout
6. Complete checkout with Stripe test card `4242 4242 4242 4242`
7. Redirected back to `/dashboard/settings?billing=success`
8. **Verify in Neon:**
   ```sql
   SELECT venue_id, tos_version, accepted_at, terms_accepted, conduit_accepted,
          stripe_session_id, stripe_linked_at, ip_address
   FROM tos_acceptances
   ORDER BY accepted_at DESC LIMIT 1;
   ```
   Expected: 1 row. `terms_accepted=true`, `conduit_accepted=true`, `stripe_session_id` populated (webhook filled it in), `stripe_linked_at` not null, `ip_address` matches your actual IP.
9. **Verify email:** ToS confirmation email arrives at the venue email, with the correct timestamp, version, and IP.

### Path B — user ticks only one box

1. New test venue → click Subscribe → modal appears
2. Tick only the first box, leave the second unticked
3. **Expected:** "Accept and continue to payment" button stays disabled (greyed out).
4. If you force-click via devtools and bypass the disabled attr: **Expected:** red error panel "Please tick both boxes to continue."

### Path C — user closes the modal

1. Open ToS gate → click Cancel
2. **Expected:** Modal closes, user stays on Settings page, no database row written
3. Click Subscribe again → gate reopens with fresh state (both boxes unticked again)

### Path D — direct API bypass attempt (defence in depth)

1. New test venue with no acceptance on record
2. Open browser devtools → Network tab
3. Manually craft a POST to `/api/dashboard/:venueId/billing/checkout` with the auth header copied from your session
4. **Expected:** HTTP 403 response, body `{ error: "tos_acceptance_required", ... }`. No Stripe session created.

### Path E — existing customer re-subscribing

1. Venue that has already accepted (check via `SELECT * FROM tos_acceptances WHERE venue_id = '…'`)
2. Click Subscribe
3. **Expected:** No ToS gate. Goes straight to Stripe checkout.

### Path F — network failure during acceptance

1. New test venue → click Subscribe → modal appears, tick both boxes
2. Open devtools Network tab → enable Offline mode
3. Click "Accept and continue to payment"
4. **Expected:** Spinner shows briefly, then red error panel "We couldn't record your acceptance…". Button returns to active state. User can retry.

### Path G — ToS version bump (future)

When you update the ToS and need existing customers to re-accept:

1. Change `CURRENT_TOS_VERSION = '1.0'` to `'1.1'` in `server/index.js`
2. Publish the new ToS at `/terms`
3. Deploy
4. **Expected behaviour:** existing customers at `v1.0` can still use the product (the gate only fires on /billing/checkout). If they try to change plan or re-subscribe, they'll hit the gate for `v1.1`. Their old `v1.0` row stays intact for audit.

---

## What to do if something goes wrong

### Railway deploy fails with "sendToSConfirmation is not a function"

Step 2 didn't land. Check `server/email.js` on main — the function must be there as `export async function sendToSConfirmation(…)`.

### Customer reports "couldn't subscribe" and logs show `tos_acceptance_required` loops

The frontend isn't calling `/tos/accept` before `/billing/checkout`, or the accept call is failing silently. Check Sentry for POSTs to `/tos/accept` returning 5xx, and verify the `DashboardSettings.tsx` wiring from Step 5.

### Email not arriving after payment

Check server logs for `ToS session link error` or `ToS confirmation email error`. The subscription activation itself is decoupled from the email — the customer's subscription is active regardless. The email is best-effort. Re-send via a manual query if needed:

```sql
-- Find the acceptance row, re-trigger email via admin console if you build one later.
SELECT * FROM tos_acceptances WHERE venue_id = 'venue-…' ORDER BY accepted_at DESC LIMIT 1;
```

### Need to invalidate an acceptance (e.g. customer disputed it)

```sql
UPDATE tos_acceptances
SET terms_accepted = false, conduit_accepted = false
WHERE id = 'acceptance-row-id-here';
```

The next time they try to access `/billing/checkout` they'll be gated again.

---

## File inventory (what you should have)

- `migration-tos-acceptances.sql` — run once in Neon
- `email-sendToSConfirmation.js` — paste into `server/email.js`
- `server-index.js` — full replacement for `server/index.js`
- `ToSAcceptance.tsx` — new file at `src/components/ToSAcceptance.tsx`
- `TOS-INTEGRATION-GUIDE.md` — this document (keep for reference)

**Step 5 (wiring the Subscribe button) is not in these files yet** — it requires seeing your current `DashboardSettings.tsx`. Share that file when you're ready to do Step 5 and the edit will be targeted.
