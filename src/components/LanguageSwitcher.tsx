import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../lib/LanguageContext'
import { SUPPORTED_LANGUAGES, type Language } from '../lib/i18n'

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === language) ?? SUPPORTED_LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleSelect = (code: Language) => {
    setLanguage(code)
    setOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-2 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-1"
        title="Change language"
        aria-label="Change language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="text-xs uppercase">{current.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[140px] z-20">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                lang.code === language
                  ? 'bg-se-green-50 text-se-green-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
