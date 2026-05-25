import { Link, useSearchParams } from 'react-router-dom'
import { Send, ArrowLeft, MessagesSquare } from 'lucide-react'
import type { CategoryId } from '../types'
import { categories } from '../data/categories'
import { EXCHANGE_HUB } from '../data/platform'
import { PageHeader } from '../components/PageHeader'
import { ExchangePostForm } from '../components/exchange/ExchangePostForm'

export function ExchangeHubSubmit() {
  const [searchParams] = useSearchParams()
  const theme = searchParams.get('theme') as CategoryId | null
  const initialTopic =
    theme && categories.some((c) => c.id === theme) ? theme : undefined

  return (
    <>
      <PageHeader
        icon={Send}
        badge="Publier un échange"
        title="Partagez votre question ou astuce"
        description="Impression, calibration, RIP, découpe, communication visuelle ou IA : choisissez la thématique et décrivez votre retour terrain."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <Link
          to={EXCHANGE_HUB.path}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au hub
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <div>
            <h2 className="font-display text-xl font-semibold text-heading mb-4">
              Bonnes pratiques
            </h2>
            <ul className="space-y-3 text-sm text-muted leading-relaxed">
              <li className="flex gap-2">
                <MessagesSquare className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                Précisez machine, logiciel ou support concerné.
              </li>
              <li className="flex gap-2">
                <MessagesSquare className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                Partagez réglages testés, captures ou valeurs mesurées si possible.
              </li>
              <li className="flex gap-2">
                <MessagesSquare className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                Restez courtois : le hub sert à l&apos;entraide entre professionnels.
              </li>
            </ul>
          </div>

          <ExchangePostForm initialTopic={initialTopic} />
        </div>
      </div>
    </>
  )
}
