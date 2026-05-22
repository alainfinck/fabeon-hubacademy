import type { LucideIcon } from 'lucide-react'

interface Props {
  icon: LucideIcon
  badge: string
  title: string
  description: string
}

export function PageHeader({ icon: Icon, badge, title, description }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 border-b border-theme">
      <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
        <Icon className="w-4 h-4" />
        {badge}
      </p>
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-heading">{title}</h1>
      <p className="text-muted mt-3 max-w-2xl leading-relaxed">{description}</p>
    </div>
  )
}
