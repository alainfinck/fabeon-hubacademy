import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, MessageCircle, User } from 'lucide-react'
import type { ExchangePost } from '../types'
import { api } from '../api/client'
import { EXCHANGE_HUB } from '../data/platform'
import { PageError, PageLoader } from '../components/PageLoader'
import { ExchangeTopicBadge } from '../components/exchange/ExchangeTopicBadge'
import { formatExchangeDate } from '../lib/exchangeUtils'
import { CONTACT } from '../data/contact'

export function ExchangeHubPost() {
  const { id } = useParams()
  const [post, setPost] = useState<ExchangePost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api
      .getExchangePost(id)
      .then(setPost)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Échange introuvable')
      )
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <PageLoader />
  if (error || !post) return <PageError message={error || 'Échange introuvable'} />

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
      <Link
        to={EXCHANGE_HUB.path}
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au hub
      </Link>

      <article className="rounded-2xl card-base border p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <ExchangeTopicBadge topic={post.topic} />
          <span className="text-sm text-faint">{formatExchangeDate(post.createdAt)}</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 mt-4 text-sm text-muted">
          <User className="w-4 h-4 text-faint shrink-0" />
          <span>
            <span className="font-medium text-body">{post.authorName}</span>
            {post.authorRole && (
              <span className="text-faint"> · {post.authorRole}</span>
            )}
          </span>
        </div>

        <p className="text-body mt-8 leading-relaxed whitespace-pre-wrap">{post.body}</p>

        <div className="mt-10 pt-8 border-t border-theme flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <MessageCircle className="w-4 h-4" />
            {post.replyCount} réponse{post.replyCount !== 1 ? 's' : ''} dans la communauté
          </span>
          <a
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Réponse hub — ${post.title}`)}`}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-theme text-sm font-semibold text-body hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Répondre par e-mail
          </a>
        </div>
      </article>

      <p className="text-center text-sm text-muted mt-8">
        <Link
          to={EXCHANGE_HUB.submitPath}
          className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
        >
          Publier un nouvel échange
        </Link>
      </p>
    </div>
  )
}
