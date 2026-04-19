import { useState, useCallback } from 'react'
import { buildMaskFromIds } from '../lib/allergens'

export interface SavedProfile {
  allergenIds: string[]
  venueName: string
  venueId: string
  savedAt: string
  marketingConsent: boolean
  email: string
}

export interface SaveResult {
  ok: boolean
  error?: string
}

const STORAGE_KEY = 'safeeat_profile'

function loadProfile(): SavedProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedProfile
  } catch {
    return null
  }
}

function persistProfile(profile: SavedProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // Storage full or unavailable — fail silently
  }
}

function clearPersistedProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Fail silently
  }
}

export function useLocalProfile(venueId: string) {
  const [profile, setProfile] = useState<SavedProfile | null>(() => {
    const saved = loadProfile()
    if (saved && saved.venueId === venueId) return saved
    return null
  })

  /**
   * Save the profile to the server first, then persist locally only on
   * confirmed success. This prevents the "silent failure" pattern where the
   * UI shows success based on local state but the server never received
   * the data — a customer would believe they're in the venue's CRM when
   * they are not.
   */
  const saveProfile = useCallback(
    async (
      allergenIds: string[],
      venueName: string,
      marketingConsent: boolean,
      email: string
    ): Promise<SaveResult> => {
      const mask = buildMaskFromIds(allergenIds)
      const identifier = email || `anon-${Date.now()}`

      let res: Response
      try {
        res = await fetch(`/api/menu/${venueId}/profile`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier,
            allergenMask: mask,
            allergenIds,
            marketingConsent: marketingConsent && !!email,
          }),
        })
      } catch (err) {
        console.error('Profile save network error:', err)
        return { ok: false, error: 'network' }
      }

      if (res.status === 429) {
        return { ok: false, error: 'rate_limit' }
      }

      if (!res.ok) {
        let body: any = null
        try {
          body = await res.json()
        } catch {
          // ignore — body may not be JSON
        }
        console.error('Profile save server error:', res.status, body)
        return { ok: false, error: 'server' }
      }

      let data: any = null
      try {
        data = await res.json()
      } catch {
        console.error('Profile save: invalid JSON response')
        return { ok: false, error: 'server' }
      }

      if (!data?.saved) {
        console.error('Profile save: server did not confirm save', data)
        return { ok: false, error: 'server' }
      }

      // Server confirmed — now persist locally
      const newProfile: SavedProfile = {
        allergenIds,
        venueName,
        venueId,
        savedAt: new Date().toISOString(),
        marketingConsent,
        email,
      }
      setProfile(newProfile)
      persistProfile(newProfile)

      return { ok: true }
    },
    [venueId]
  )

  const deleteProfile = useCallback(() => {
    setProfile(null)
    clearPersistedProfile()
  }, [])

  return { profile, saveProfile, deleteProfile }
}
