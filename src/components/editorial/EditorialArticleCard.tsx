import { Link } from 'react-router-dom'
import { ArrowRight, Calendar } from 'lucide-react'
import type { EditorialArticle } from '../../data/editorialArticles'
import { formatEditorialDate } from '../../data/editorialArticles'
import { CardCoverImage } from '../CardCoverImage'
import { CategoryBadge } from '../CategoryBadge'
import { coverFallbackSeed } from '../../data/coverImages'

interface Props {
  article: EditorialArticle
}

export function EditorialArticleCard({ article }: Props) {
  return (
    <Link
      to={`/actualites/${article.slug}`}
      className="group flex flex-col rounded-2xl card-base overflow-hidden hover:border-brand-500/40 transition-all card-glow h-full"
    >
      <CardCoverImage
        src={article.heroImage}
        imageGradient={article.imageGradient}
        alt={article.heroImageAlt}
        className="h-44 sm:h-48"
        overlay="strong"
        fallbackSeed={coverFallbackSeed(article.id)}
      />
      <div className="p-6 flex flex-col flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <CategoryBadge categoryId={article.category} />
          <span className="inline-flex items-center gap-1 text-xs text-faint">
            <Calendar className="w-3.5 h-3.5" />
            {formatEditorialDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-sm text-muted mt-2 leading-relaxed flex-1 line-clamp-3">
          {article.excerpt}
        </p>
        <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-brand-600 dark:text-brand-400 group-hover:gap-2 transition-all">
          Lire l&apos;article
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}
