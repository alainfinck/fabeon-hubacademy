import { useData } from '../context/DataContext'
import type { CategoryId } from '../types'

interface Props {
  categoryId: CategoryId
  size?: 'sm' | 'md'
}

export function CategoryBadge({ categoryId, size = 'sm' }: Props) {
  const { categories } = useData()
  const cat = categories.find((c) => c.id === categoryId)
  if (!cat) return null
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
  return (
    <span
      className={`inline-flex rounded-full badge-muted font-medium backdrop-blur-sm ${sizeClass}`}
    >
      {cat.label}
    </span>
  )
}
