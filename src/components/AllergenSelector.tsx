import { useState } from 'react'
import { ALLERGEN_LIST, buildMaskFromIds, type AllergenMeta } from '../lib/allergens'

interface AllergenSelectorProps {
  selected: number[]
  onChange: (selected: number[]) => void
  compact?: boolean
}

const ICONS: Record<number, string> = {
  1: '🌾', 2: '🦀', 3: '🥚', 4: '🐟', 5: '🥜', 6: '🫘',
  7: '🥛', 8: '🌰', 9: '🧅', 10: '🟡', 11: '🌱', 12: '🫙',
  13: '🐺', 14: '🐚',
}

export default function AllergenSelector({ selected, onChange, compact }: AllergenSelectorProps) {
  const toggle = (id: number) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    )
  }

  return (
    <div className={compact ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 gap-3'}>
      {ALLERGEN_LIST.map((a) => {
        const active = selected.includes(a.id)
        return (
          <button
            key={a.id}
            type="button"
            onClick={() => toggle(a.id)}
            aria-pressed={active}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors
              ${active
                ? 'border-se-green-600 bg-se-green-50 text-se-green-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
          >
            <span className="text-lg">{ICONS[a.id] ?? '⚠️'}</span>
            <span>{a.label}</span>
          </button>
        )
      })}
    </div>
  )
}
