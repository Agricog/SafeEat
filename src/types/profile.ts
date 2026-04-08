/**
 * SafeEat — Customer Profile Domain Types
 *
 * TypeScript interfaces for customer allergen profiles, consent records,
 * venue relationships, and notification/audit logs.
 *
 * CRITICAL: Customer allergen data is UK GDPR Article 9 special-category data.
 * - Stored encrypted via pgcrypto in Neon (contact_encrypted, allergens_encrypted)
 * - hashed_identifier is SHA-256 of phone/email — never reversible
 * - Allergen data NEVER appears in logs, Sentry, or analytics
 * - Two separate consents: profile storage and marketing — never bundled
 *
 * These types represent the DECRYPTED application-layer view.
 * The database stores bytea columns; decryption happens in the Worker crypto layer.
 */

// ---------------------------------------------------------------------------
// Customer Profile
// ---------------------------------------------------------------------------

export interface CustomerProfile {
  readonly id: string
  /** SHA-256 hash of phone number or email — used as lookup key */
  readonly hashedIdentifier: string
  /** Decrypted contact — phone number or email address */
  readonly contact: string
  /** Decrypted allergen bitmask (matches lib/allergens.ts bitmask system) */
  readonly allergenMask: number
  /** Has the customer consented to profile storage? */
  readonly consentProfile: boolean
  readonly consentProfileAt: string | null
  /** Has the customer consented to marketing notifications? */
  readonly consentMarketing: boolean
  readonly consentMarketingAt: string | null
  /** Version of the consent text agreed to (e.g., '1.0') */
  readonly consentVersion: string
  readonly createdAt: string
  readonly updatedAt: string
  /** Last time this profile was used (scan, filter, notification click) */
  readonly lastActiveAt: string
}

/**
 * Input for creating a new customer profile.
 * Arrives from the customer-facing consent flow after allergen selection.
 */
export interface CreateProfileInput {
  /** Raw contact — will be SHA-256 hashed for storage and pgcrypto encrypted */
  readonly contact: string
  /** Contact type determines validation rules */
  readonly contactType: 'phone' | 'email'
  /** Array of allergen slug ids (e.g., ['milk', 'peanuts']) — converted to bitmask */
  readonly allergenIds: readonly string[]
  /** Must be true — explicit consent required */
  readonly consentProfile: true
  /** Optional — separate marketing consent */
  readonly consentMarketing: boolean
}

/**
 * Input for updating an existing customer profile.
 * Customer can update allergens or change consent independently.
 */
export interface UpdateProfileInput {
  /** Updated allergen slug ids — replaces existing, not additive */
  readonly allergenIds?: readonly string[]
  /** Can revoke marketing consent without affecting profile consent */
  readonly consentMarketing?: boolean
}

/**
 * Minimal profile view used during menu filtering.
 * Contains only what's needed to filter dishes — no PII.
 */
export interface ProfileFilterView {
  readonly id: string
  readonly allergenMask: number
}

// ---------------------------------------------------------------------------
// Consent
// ---------------------------------------------------------------------------

/**
 * Consent scope — the two independent consents SafeEat requires.
 * These are NEVER bundled into a single checkbox.
 */
export type ConsentScope = 'profile_storage' | 'marketing'

/**
 * Consent action — what happened to a consent record.
 * Logged to the audit_log table for GDPR accountability.
 */
export type ConsentAction =
  | 'granted'
  | 'revoked'
  | 'renewed'  // Same consent re-confirmed (e.g., after consent text version update)

/**
 * Full consent record — stored in audit_log, not the profile itself.
 * The profile only stores the boolean + timestamp. The audit log stores the full history.
 */
export interface ConsentRecord {
  readonly scope: ConsentScope
  readonly action: ConsentAction
  readonly consentVersion: string
  readonly ipHash: string
  readonly timestamp: string
}

/**
 * Consent display state — used in the UI to show what the customer has consented to.
 */
export interface ConsentStatus {
  readonly profileStorage: {
    readonly granted: boolean
    readonly grantedAt: string | null
    readonly version: string
  }
  readonly marketing: {
    readonly granted: boolean
    readonly grantedAt: string | null
    readonly version: string
  }
}

/** Current consent text version — increment when consent wording changes */
export const CURRENT_CONSENT_VERSION = '1.0'

// ---------------------------------------------------------------------------
// Customer–Venue relationship
// ---------------------------------------------------------------------------

export interface CustomerVenue {
  readonly customerId: string
  readonly venueId: string
  readonly firstScanAt: string
  readonly lastScanAt: string
  readonly scanCount: number
}

// ---------------------------------------------------------------------------
// Notification Log
// ---------------------------------------------------------------------------

export type NotificationType = 'new_dish' | 'menu_update' | 'custom'

export type NotificationChannel = 'email' | 'sms'

export interface NotificationLogEntry {
  readonly id: string
  readonly venueId: string
  readonly customerId: string
  readonly notificationType: NotificationType
  readonly channel: NotificationChannel
  /** Truncated preview — never contains allergen data */
  readonly messagePreview: string
  readonly sentAt: string
  readonly delivered: boolean | null
}

/**
 * Input for sending a notification to matching customers.
 * The system determines recipients by cross-referencing the dish's allergen mask
 * against customer profiles with marketing consent.
 */
export interface SendNotificationInput {
  readonly notificationType: NotificationType
  /** The message to send — sanitised before storage/dispatch */
  readonly message: string
  /** If notificationType is 'new_dish', the dish ID that triggered this notification */
  readonly dishId?: string
}

// ---------------------------------------------------------------------------
// Audit Log
// ---------------------------------------------------------------------------

/**
 * Actor types — who performed the action.
 * Used for GDPR accountability and compliance evidence.
 */
export type AuditActorType = 'venue_owner' | 'customer' | 'system'

/**
 * Audit actions — what was done.
 * Append-only — rows are never updated or deleted.
 */
export type AuditAction =
  | 'profile_created'
  | 'profile_updated'
  | 'profile_deleted'
  | 'consent_profile_granted'
  | 'consent_profile_revoked'
  | 'consent_marketing_granted'
  | 'consent_marketing_revoked'
  | 'menu_verified'
  | 'dish_created'
  | 'dish_updated'
  | 'dish_deactivated'
  | 'ingredient_created'
  | 'ingredient_updated'
  | 'notification_sent'
  | 'profile_auto_deleted' // 18-month inactivity cleanup

export interface AuditLogEntry {
  readonly id: string
  readonly venueId: string | null
  readonly actorType: AuditActorType
  readonly action: AuditAction
  /** Structured metadata — NEVER contains raw allergen data or PII */
  readonly metadata: Record<string, unknown> | null
  /** SHA-256 of the IP address — never stored in plain text */
  readonly ipHash: string | null
  readonly createdAt: string
}

// ---------------------------------------------------------------------------
// Profile deletion
// ---------------------------------------------------------------------------

/**
 * Profile deletion request — triggered by customer one-tap delete.
 * Deletion is immediate and irreversible.
 * A confirmation is sent via the original contact method.
 */
export interface DeleteProfileRequest {
  readonly hashedIdentifier: string
  /** Must match the stored (decrypted) contact for verification */
  readonly contact: string
  readonly contactType: 'phone' | 'email'
}

/**
 * Profile deletion result.
 */
export interface DeleteProfileResult {
  readonly deleted: boolean
  /** Number of venue relationships removed */
  readonly venueLinksRemoved: number
  /** Confirmation sent via email/SMS */
  readonly confirmationSent: boolean
}

// ---------------------------------------------------------------------------
// Profile auto-cleanup
// ---------------------------------------------------------------------------

/** Profiles inactive for longer than this are automatically deleted */
export const PROFILE_INACTIVITY_THRESHOLD_DAYS = 548 // ~18 months

/**
 * Result from the scheduled auto-cleanup worker.
 * Logged to audit_log with action 'profile_auto_deleted'.
 */
export interface AutoCleanupResult {
  readonly profilesDeleted: number
  readonly venueLinksRemoved: number
  readonly executedAt: string
}
