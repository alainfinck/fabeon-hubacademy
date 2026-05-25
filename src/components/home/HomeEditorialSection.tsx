import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import { editorialArticles } from '../../data/editorialArticles'
import { EditorialArticleCard } from '../editorial/EditorialArticleCard'

export function HomeEditorialSection() {
  const featured = editorialArticles[0]
  if (!featured) return null

  return (
    <section className="border-y border-theme bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-2">
              <Newspaper className="w-4 h-4" />
              À la une
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              Impression grand format & métiers du secteur
            </h2>
            <p className="text-muted mt-3 max-w-2xl leading-relaxed">
              Découvrez les enjeux du grand format, les technologies et les profils métiers en
              pleine expansion — contenu issu de l&apos;expertise Fabéon.
            </p>
          </div>
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:gap-3 transition-all shrink-0"
          >
            Tous les articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="max-w-xl">
          <EditorialArticleCard article={featured} />
        </div>
      </div>
    </section>
  )
}
