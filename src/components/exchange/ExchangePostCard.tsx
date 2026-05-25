import { Link } from 'react-router-dom'
import { MessageCircle, User } from 'lucide-react'
import type { ExchangePost } from '../../types'
import { ExchangeTopicBadge } from './ExchangeTopicBadge'
import { excerptBody, formatExchangeDate } from '../../lib/exchangeUtils'
import { EXCHANGE_HUB } from '../../data/platform'

interface Props {
  post: ExchangePost
}

export function ExchangePostCard({ post }: Props) {
  return (
    <Link
      to={`${EXCHANGE_HUB.path}/${post.id}`}
      className="block rounded-2xl card-base border p-5 sm:p-6 hover:border-brand-500/30 transition-colors group"
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <ExchangeTopicBadge topic={post.topic} />
        <span className="text-xs text-faint">{formatExchangeDate(post.createdAt)}</span>
      </div>
      <h3 className="font-display font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-muted mt-2 leading-relaxed line-clamp-2">
        {excerptBody(post.body)}
      </p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-theme">
        <div className="flex items-center gap-2 text-sm text-muted min-w-0">
          <User className="w-4 h-4 shrink-0 text-faint" />
          <span className="truncate">
            <span className="font-medium text-body">{post.authorName}</span>
            {post.authorRole && (
              <span className="text-faint"> · {post.authorRole}</span>
            )}
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-xs text-faint shrink-0">
          <MessageCircle className="w-3.5 h-3.5" />
          {post.replyCount} réponse{post.replyCount !== 1 ? 's' : ''}
        </span>
      </div>
    </Link>
  )
}
