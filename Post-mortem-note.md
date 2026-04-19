# SafeEat Security & Client-Side Audit — 19 April 2026

## Trigger
Cross-referenced a client-side data bleed bug identified in an unrelated
build (cached IndexedDB data from user A's session visible in user B's
session after sign-out). Reviewed SafeEat for the same class of issue
and related defence-in-depth gaps.

## Scope
Full audit across three layers:
- Server-side tenant isolation (Hono + Clerk + Neon)
- Client-side storage (localStorage, IndexedDB, cache storage)
- Service worker behaviour (caching, updates, sign-out hygiene)

## Findings

### Green (no action required)
- Venue scoping is DB-resolved from `clerk_user_id`, not JWT claims.
  The Bob/sites scenario (undefined JWT claim causing cross-tenant
  exposure) cannot occur — claims are never trusted for scoping.
- `enforceVenueAccess` middleware blocks URL tampering as a second layer.
- SQL parameterisation via Neon tagged templates throughout.
- Stripe webhook signature verification in place.
- Service worker explicitly skips /api/dashboard/* — authenticated data
  is never cached.
- Vite hashed filenames self-bust on navigations.
- useLocalProfile scoped by venueId on load — no cross-venue bleed.
- Clerk handles its own session and token cleanup on signOut().

### Red (fixed this session)
1. **Email enumeration on GDPR delete endpoint.**
   DELETE /api/menu/:slug/profile returned different response bodies
   for found vs not-found identifiers ({deleted:true} vs
   {deleted:false, message:"No matching profile found"}). An attacker
   with a venue slug could test whether a specific email was registered.
   **Fix:** Return uniform {deleted:true} regardless of whether a
   profile existed. Log the actual outcome server-side for audit.

2. **ALLERGEN_ENCRYPTION_KEY silent fallback.**
   The encryption key used for Article 9 special-category data (customer
   allergens, marketing emails) had a hardcoded fallback string. If the
   env var was ever missing on deploy, production would silently encrypt
   with a compromised key — worse than no encryption, because it would
   appear protected.
   **Fix:** Added fail-fast check at server boot. If the env var is
   missing or still equal to the default, the process exits with a
   FATAL log before accepting any traffic.

### Amber (fixed this session — defence-in-depth)
3. **No service worker cache purge on sign-out.**
   Low current risk because SW doesn't cache authenticated data, but
   the hook needed to exist before any authenticated caching could
   accidentally be added later.
   **Fix:** Added message listener in sw.js that wipes all safeeat-v*
   caches on receiving {type: 'PURGE_CACHES'}. handleSignOut in
   DashboardSettings.tsx posts this message before calling Clerk's
   signOut(). Try/catch ensures signOut still runs if the SW is
   unreachable.

4. **No service worker update detection.**
   A venue owner with a long-lived dashboard tab would keep running
   stale JavaScript after a deploy until they closed and reopened the
   tab or hard refreshed.
   **Fix:** New UpdateBanner component in main.tsx polls for SW updates
   every hour and listens for 'updatefound'. When a new worker is
   installed and waiting, shows a bottom-centre banner with a Refresh
   button.

## Files changed
- server/index.js (fail-fast + uniform GDPR response)
- public/sw.js (message listener + CACHE_VERSION v2→v3)
- src/components/UpdateBanner.tsx (new)
- src/main.tsx (mount UpdateBanner)
- src/pages/DashboardSettings.tsx (purge caches in sign-out handler)

## Verification
All checks performed from the browser and Neon directly, not from the
Railway dashboard.

- Server fail-fast: server booted, log line
  "Allergen encryption: key configured (fail-fast check passed)"
  present. Key confirmed set to non-default value in Railway.
- GDPR uniform response: Network tab showed 200 {"deleted":true} for
  both existing and non-existent identifiers. Response body identical.
- Encryption at rest (Neon): customer_profiles.encrypted_allergens and
  marketing_email columns show pgcrypto binary output (\xc30d0407...).
  allergen_mask remains plaintext as designed (bitmask for filtering).
- SW cache purge: Before sign-out, 8 entries in safeeat-v3-static.
  After sign-out, 6 entries, all with Date headers timestamped to the
  sign-out moment — meaning the cache was wiped and re-populated by
  the landing page load. The /dashboard and /manifest.json entries
  that were in the original cache did not survive, confirming the
  purge rather than a partial flush.
- Audit trail tables: dish_change_log, notification_log,
  staff_training_log all queryable and populating.
- SW update banner: not testable in one session — will fire on the
  next frontend deploy for tabs already open.

## Learnings worth keeping
- JWT claims should never be used as scoping identifiers directly.
  Always resolve identity to a DB record, scope queries by the DB
  value. If the claim is missing or undefined, the guard blocks by
  default instead of fails open.
- Hardcoded fallback secrets in production code are worse than
  missing ones. A missing env var throws. A fallback silently
  continues with compromised security.
- GDPR delete endpoints must return uniform responses. "Profile
  not found" is an information leak when the identifier is an email.
- Service worker deploys are not equivalent to user-device deploys.
  CI/CD green ≠ running on the client. Always verify from the
  browser after critical fixes.
- Client-side leaks and server-side leaks look identical to the user
  but require completely different fixes. Always compare API response
  to DOM display before rewriting backend code.

## Outstanding / for future consideration
- JWT verification does not currently check issuer/audience claims in
  jwtVerify(). Low practical risk given instance-specific Clerk JWKS,
  but belt-and-braces hardening would add `{ issuer, audience }`.
- requireAuth does a DB lookup on every authenticated request. Not a
  security issue, but a latency tax worth caching in future if volume
  grows.
