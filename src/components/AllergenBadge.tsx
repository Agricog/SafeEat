import { ALLERGEN_BY_ID } from '../lib/allergens'
 
interface AllergenBadgeProps {
  allergenId: string
  size?: 'sm' | 'md'
}
 
export default function AllergenBadge({ allergenId, size = 'sm' }: AllergenBadgeProps) {
  const meta = ALLERGEN_BY_ID.get(allergenId)
  if (!meta) return null
 
  const cls = size === 'sm'
    ? 'text-xs px-2 py-0.5'
    : 'text-sm px-3 py-1'
 
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-800 font-medium ${cls}`}
      title={meta.description}
    >
      <span>{meta.icon}</span>
      {meta.shortLabel}
    </span>
  )
}
