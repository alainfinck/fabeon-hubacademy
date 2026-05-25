import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { MessagesSquare, PlusCircle, Filter } from 'lucide-react'
import type { CategoryId } from '../types'
import { api } from '../api/client'
import { categories } from '../data/categories'
import { EXCHANGE_HUB } from '../data/platform'
import { PageHeader } from '../components/PageHeader'
import { PageError, PageLoader } from '../components/PageLoader'
import { ExchangePostCard } from '../components/exchange/ExchangePostCard'

type FilterValue = 'all' | CategoryId

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Toutes' },
  ...categories.map((c) => ({ value: c.id as FilterValue, label: c.label })),
]

export function ExchangeHub() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramTopic = searchParams.get('theme') as CategoryId | null
  const initialFilter: FilterValue =
    paramTopic && categories.some((c) => c.id === paramTopic) ? paramTopic : 'all'

  const [posts, setPosts] = useState<Awaited<ReturnType<typeof api.getExchangePosts>>>([])
  const [filter, setFilter] = useState<FilterValue>(initialFilter)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async (topic: FilterValue) => {
    setLoading(true)
    setError('')
    try {
      const data = await api.getExchangePosts(topic === 'all' ? undefined : topic)
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les échanges')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(filter)
  }, [filter])

  const handleFilter = (value: FilterValue) => {
    setFilter(value)
    const next = new URLSearchParams(searchParams)
    if (value === 'all') next.delete('theme')
    else next.set('theme', value)
    setSearchParams(next, { replace: true })
  }

  if (loading && posts.length === 0) return <PageLoader />
  if (error && posts.length === 0) return <PageError message={error} onRetry={() => load(filter)} />

  return (
    <>
      <PageHeader
        icon={MessagesSquare}
        badge={EXCHANGE_HUB.shortLabel}
        title="Partagez avec la communauté impression"
        description={EXCHANGE_HUB.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            to={EXCHANGE_HUB.submitPath}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors w-fit"
          >
            <PlusCircle className="w-5 h-5" />
            Publier un échange
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-faint shrink-0" />
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => handleFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.value
                    ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/30'
                    : 'text-muted hover:text-heading border border-transparent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted">Chargement…</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 rounded-2xl card-base border">
            <MessagesSquare className="w-10 h-10 text-faint mx-auto mb-3" />
            <p className="font-medium text-heading">Aucun échange pour cette thématique</p>
            <p className="text-sm text-muted mt-2">
              Soyez le premier à partager une question ou une astuce.
            </p>
            <Link
              to={EXCHANGE_HUB.submitPath}
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Publier un échange
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-faint mb-6">
              {posts.length} échange{posts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {posts.map((post) => (
                <ExchangePostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
