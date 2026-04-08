import { getMetaById } from '../lib/allergens'

const ICONS: Record<number, string> = {
  1: '🌾', 2: '🦀', 3: '🥚', 4: '🐟', 5: '🥜', 6: '🫘',
  7: '🥛', 8: '🌰', 9: '🧅', 10: '🟡', 11: '🌱', 12: '🫙',
  13: '🐺', 14: '🐚',
}

interface AllergenBadgeProps {
  allergenId: number
  size?: 'sm' | 'md'
}

export default function AllergenBadge({ allergenId, size = 'sm' }: AllergenBadgeProps) {
  const meta = getMetaById(allergenId)
  if (!meta) return null

  const cls = size === 'sm'
    ? 'text-xs px-2 py-0.5'
    : 'text-sm px-3 py-1'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 font-medium ${cls}`}
      title={meta.description}
    >
      <span>{ICONS[allergenId] ?? '⚠️'}</span>
      {meta.label}
    </span>
  )
}
