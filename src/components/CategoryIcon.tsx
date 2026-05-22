import {
  Palette,
  Printer,
  Scissors,
  Monitor,
  Hammer,
  Layers,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  Palette,
  Printer,
  Scissors,
  Monitor,
  Hammer,
  Layers,
  Sparkles,
}

interface Props {
  name: string
  className?: string
}

export function CategoryIcon({ name, className = 'w-6 h-6' }: Props) {
  const Icon = icons[name] ?? Layers
  return <Icon className={className} />
}
