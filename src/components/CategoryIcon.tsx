import {
  Palette,
  Printer,
  Scissors,
  Monitor,
  Hammer,
  Layers,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  Palette,
  Printer,
  Scissors,
  Monitor,
  Hammer,
  Layers,
}

interface Props {
  name: string
  className?: string
}

export function CategoryIcon({ name, className = 'w-6 h-6' }: Props) {
  const Icon = icons[name] ?? Layers
  return <Icon className={className} />
}
