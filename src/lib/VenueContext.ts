import { createContext, useContext } from 'react'

export interface VenueContext {
  venueId: string
  venueName: string
  venueSlug: string
  venueAddress: string
}

const Ctx = createContext<VenueContext | null>(null)

export const VenueProvider = Ctx.Provider

export function useVenue(): VenueContext {
  const v = useContext(Ctx)
  if (!v) throw new Error('useVenue must be used inside VenueProvider')
  return v
}
