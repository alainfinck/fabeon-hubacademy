interface Props {
  value: number
  label?: string
  size?: 'sm' | 'md'
}

export function ProgressBar({ value, label, size = 'md' }: Props) {
  const h = size === 'sm' ? 'h-1.5' : 'h-2'
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs text-muted mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className={`w-full ${h} rounded-full bg-muted overflow-hidden`}>
        <div
          className={`${h} rounded-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-500`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
