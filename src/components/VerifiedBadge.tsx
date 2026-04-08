interface VerifiedBadgeProps {
  verifiedAt: string | null
}

export default function VerifiedBadge({ verifiedAt }: VerifiedBadgeProps) {
  if (!verifiedAt) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 text-gray-500 px-3 py-1 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
        Unverified
      </div>
    )
  }

  const date = new Date(verifiedAt)
  const now = new Date()
  const days = Math.floor((now.getTime() - date.getTime()) / 86400000)

  let colour: string
  let dotColour: string
  let label: string

  if (days <= 7) {
    colour = 'bg-se-green-50 text-se-green-700'
    dotColour = 'bg-se-green-500'
    label = `Verified ${days === 0 ? 'today' : days === 1 ? 'yesterday' : `${days}d ago`}`
  } else if (days <= 14) {
    colour = 'bg-amber-50 text-amber-700'
    dotColour = 'bg-amber-500'
    label = `Verified ${days}d ago`
  } else {
    colour = 'bg-red-50 text-red-700'
    dotColour = 'bg-red-500'
    label = `Last verified ${days}d ago`
  }

  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colour}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColour}`} />
      {label}
    </div>
  )
}
