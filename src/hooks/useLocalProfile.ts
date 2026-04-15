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

  const saveProfile = useCallback(
    (allergenIds: string[], venueName: string, marketingConsent: boolean, email: string) => {
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

      // Send to server — fire and forget
      const mask = buildMaskFromIds(allergenIds)
      fetch(`/api/menu/${venueId}/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: email || `anon-${Date.now()}`,
          allergenMask: mask,
          allergenIds,
          marketingConsent: marketingConsent && !!email,
        }),
      }).catch((err) => console.error('Profile save error:', err))
    },
    [venueId]
  )

  const deleteProfile = useCallback(() => {
    setProfile(null)
    clearPersistedProfile()
  }, [])

  return { profile, saveProfile, deleteProfile }
}
