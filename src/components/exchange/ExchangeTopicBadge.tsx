import type { CategoryId } from '../../types'
import { getCategoryLabel } from '../../lib/exchangeUtils'

interface Props {
  topic: CategoryId
}

export function ExchangeTopicBadge({ topic }: Props) {
  return (
    <span className="inline-flex rounded-full badge-muted text-xs px-2 py-0.5 font-medium">
      {getCategoryLabel(topic)}
    </span>
  )
}
