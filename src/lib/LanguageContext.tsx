import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { type Language, detectBrowserLanguage, translate, translateAllergen } from './i18n'

const STORAGE_KEY = 'safeeat_language'

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tAllergen: (allergenId: string) => { label: string; shortLabel: string }
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function loadStoredLanguage(): Language | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === 'en' || raw === 'fr' || raw === 'es' || raw === 'de') return raw
    return null
  } catch {
    return null
  }
}

function persistLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    // Fail silently
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return loadStoredLanguage() ?? detectBrowserLanguage()
  })

  useEffect(() => {
    persistLanguage(language)
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const t = useCallback((key: string) => translate(key, language), [language])
  const tAllergen = useCallback(
    (allergenId: string) => translateAllergen(allergenId, language),
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tAllergen }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
