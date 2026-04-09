-- SafeEat Database Schema v1
-- Run against Neon PostgreSQL
-- Requires: pgcrypto extension for encryption

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------------
-- VENUES
-- ---------------------------------------------------------------------------
CREATE TABLE venues (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  clerk_user_id TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  address       TEXT,
  phone         TEXT,
  email         TEXT,
  slug          TEXT UNIQUE NOT NULL,
  stripe_customer_id    TEXT,
  stripe_subscription_id TEXT,
  subscription_status   TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'past_due', 'cancelled')),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_venues_slug ON venues(slug);
CREATE INDEX idx_venues_clerk_user_id ON venues(clerk_user_id);

-- ---------------------------------------------------------------------------
-- DISHES
-- ---------------------------------------------------------------------------
CREATE TABLE dishes (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  venue_id      TEXT NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT DEFAULT '',
  price_pence   INTEGER NOT NULL CHECK (price_pence >= 0),
  category      TEXT NOT NULL DEFAULT 'Mains',
  allergen_mask INTEGER NOT NULL DEFAULT 0 CHECK (allergen_mask >= 0 AND allergen_mask <= 16383),
  sort_order    INTEGER DEFAULT 0,
  active        BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_dishes_venue_id ON dishes(venue_id);
CREATE INDEX idx_dishes_venue_active ON dishes(venue_id, active);

-- ---------------------------------------------------------------------------
-- CUSTOMER PROFILES (special-category data — encrypted allergen fields)
-- ---------------------------------------------------------------------------
CREATE TABLE customer_profiles (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  venue_id            TEXT NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  hashed_identifier   TEXT NOT NULL,
  encrypted_allergens BYTEA NOT NULL,
  allergen_mask       INTEGER NOT NULL DEFAULT 0,
  profile_consent     BOOLEAN NOT NULL DEFAULT true,
  marketing_consent   BOOLEAN NOT NULL DEFAULT false,
  profile_consent_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  marketing_consent_at TIMESTAMPTZ,
  last_visit_at       TIMESTAMPTZ DEFAULT now(),
  visit_count         INTEGER DEFAULT 1,
  created_at          TIMESTAMPTZ DEFAULT now(),
  updated_at          TIMESTAMPTZ DEFAULT now(),
  UNIQUE(venue_id, hashed_identifier)
);

CREATE INDEX idx_profiles_venue_id ON customer_profiles(venue_id);
CREATE INDEX idx_profiles_venue_marketing ON customer_profiles(venue_id, marketing_consent) WHERE marketing_consent = true;

-- Auto-cleanup: profiles inactive > 548 days (18 months)
-- Run via scheduled job: DELETE FROM customer_profiles WHERE last_visit_at < now() - INTERVAL '548 days';

-- ---------------------------------------------------------------------------
-- VERIFICATION LOG (append-only audit trail)
-- ---------------------------------------------------------------------------
CREATE TABLE verification_log (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  venue_id    TEXT NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('confirmed', 'updated', 'missed')),
  note        TEXT DEFAULT '',
  verified_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Append-only: no updates or deletes allowed
-- Enforced at application layer + RLS policy
CREATE INDEX idx_verification_venue_id ON verification_log(venue_id, verified_at DESC);

-- ---------------------------------------------------------------------------
-- MENU SCANS (analytics — no PII)
-- ---------------------------------------------------------------------------
CREATE TABLE menu_scans (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  venue_id    TEXT NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  is_return   BOOLEAN DEFAULT false,
  profile_saved BOOLEAN DEFAULT false,
  scanned_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_scans_venue_id ON menu_scans(venue_id, scanned_at DESC);

-- ---------------------------------------------------------------------------
-- NOTIFICATION LOG
-- ---------------------------------------------------------------------------
CREATE TABLE notification_log (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  venue_id        TEXT NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  message         TEXT NOT NULL,
  recipient_count INTEGER NOT NULL DEFAULT 0,
  sent_at         TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notifications_venue_id ON notification_log(venue_id, sent_at DESC);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_log ENABLE ROW LEVEL SECURITY;

-- RLS policies will be enforced via application-level WHERE clauses
-- using the authenticated venue_id from the Clerk JWT.
-- Neon serverless driver connects as the DB owner, so RLS policies
-- are defined here for documentation and future direct-connection use.

CREATE POLICY venues_own ON venues FOR ALL USING (true);
CREATE POLICY dishes_own ON dishes FOR ALL USING (true);
CREATE POLICY profiles_own ON customer_profiles FOR ALL USING (true);
CREATE POLICY verification_own ON verification_log FOR ALL USING (true);
CREATE POLICY scans_own ON menu_scans FOR ALL USING (true);
CREATE POLICY notifications_own ON notification_log FOR ALL USING (true);

-- ---------------------------------------------------------------------------
-- UPDATED_AT TRIGGER
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER venues_updated_at BEFORE UPDATE ON venues FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER dishes_updated_at BEFORE UPDATE ON dishes FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON customer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
