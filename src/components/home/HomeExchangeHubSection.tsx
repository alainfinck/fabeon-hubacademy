import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessagesSquare, ArrowRight, PlusCircle } from 'lucide-react'
import { api } from '../../api/client'
import { categories } from '../../data/categories'
import { EXCHANGE_HUB } from '../../data/platform'
import { ExchangePostCard } from '../exchange/ExchangePostCard'
import type { ExchangePost } from '../../types'

export function HomeExchangeHubSection() {
  const [posts, setPosts] = useState<ExchangePost[]>([])

  useEffect(() => {
    api.getExchangePosts().then(setPosts).catch(() => setPosts([]))
  }, [])

  const preview = posts.slice(0, 2)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-500/15 border border-brand-500/25 rounded-full px-4 py-1.5 mb-4">
            <MessagesSquare className="w-4 h-4" />
            {EXCHANGE_HUB.shortLabel}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight">
            Échangez sur l&apos;impression, le RIP et l&apos;IA
          </h2>
          <p className="text-muted mt-3 leading-relaxed">{EXCHANGE_HUB.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`${EXCHANGE_HUB.path}?theme=${c.id}`}
                className="text-xs font-medium px-2.5 py-1 rounded-full border border-theme text-muted hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500/30 transition-colors"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link
            to={EXCHANGE_HUB.submitPath}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Publier
          </Link>
          <Link
            to={EXCHANGE_HUB.path}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-theme text-body font-semibold text-sm hover:border-brand-500/40 transition-colors"
          >
            Voir le hub
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {preview.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {preview.map((post) => (
            <ExchangePostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted text-center py-8 rounded-2xl card-base border">
          Aucun échange pour le moment —{' '}
          <Link to={EXCHANGE_HUB.submitPath} className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            soyez le premier à publier
          </Link>
          .
        </p>
      )}
    </section>
  )
}
