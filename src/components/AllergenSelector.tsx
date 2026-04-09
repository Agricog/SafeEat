import { useState } from 'react'
import { ALLERGENS, buildMaskFromIds, type AllergenInfo } from '../lib/allergens'

interface AllergenSelectorProps {
  selected: string[]
  onChange: (selected: string[]) => void
  compact?: boolean
}

export default function AllergenSelector({ selected, onChange, compact }: AllergenSelectorProps) {
  const toggle = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((s) => s !== id)
        : [...selected, id]
    )
  }

  return (
    <div className={compact ? 'flex flex-wrap gap-2' : 'grid grid-cols-2 gap-3'}>
      {ALLERGENS.map((a) => {
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
            <span className="text-lg">{a.icon}</span>
            <span>{a.shortLabel}</span>
          </button>
        )
      })}
    </div>
  )
}
