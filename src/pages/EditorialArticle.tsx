import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Mail } from 'lucide-react'
import {
  formatEditorialDate,
  getEditorialArticleBySlug,
} from '../data/editorialArticles'
import { CardCoverImage } from '../components/CardCoverImage'
import { CategoryBadge } from '../components/CategoryBadge'
import { EditorialArticleBody } from '../components/editorial/EditorialArticleBody'
import { coverFallbackSeed } from '../data/coverImages'
import { CONTACT } from '../data/contact'

export function EditorialArticle() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getEditorialArticleBySlug(slug) : undefined

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-muted">Article introuvable.</p>
        <Link
          to="/actualites"
          className="inline-flex items-center gap-1.5 mt-6 text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux actualités
        </Link>
      </div>
    )
  }

  const mailSubject = encodeURIComponent(`Formation — ${article.title}`)

  return (
    <div className="pb-20">
      <CardCoverImage
        src={article.heroImage}
        imageGradient={article.imageGradient}
        alt={article.heroImageAlt}
        className="h-48 sm:h-72 lg:h-80"
        overlay="strong"
        fallbackSeed={coverFallbackSeed(article.id)}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative">
        <Link
          to="/actualites"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          À la une
        </Link>

        <article className="rounded-2xl card-base border p-6 sm:p-10 shadow-lg dark:shadow-xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <CategoryBadge categoryId={article.category} />
            <span className="inline-flex items-center gap-1 text-sm text-faint">
              <Calendar className="w-4 h-4" />
              {formatEditorialDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-heading leading-tight">
            {article.title}
          </h1>

          <div className="mt-10">
            <EditorialArticleBody blocks={article.blocks} />
          </div>

          <section className="mt-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <img
                src={article.cta.image}
                alt={article.cta.imageAlt}
                width={300}
                height={182}
                loading="lazy"
                decoding="async"
                className="w-full sm:w-48 shrink-0 rounded-xl object-contain bg-white/80 dark:bg-white/10 p-3"
              />
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-heading">
                  {article.cta.title}
                </h2>
                {article.cta.paragraphs.map((p) => (
                  <p key={p} className="text-body mt-3 leading-relaxed">
                    {p}
                  </p>
                ))}
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={`mailto:${CONTACT.email}?subject=${mailSubject}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Nous contacter
                  </a>
                  <Link
                    to="/formation-en-ligne?theme=impression"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-theme text-sm font-semibold text-body hover:border-brand-500/40 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    Parcours grand format
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <p className="mt-8 text-xs text-faint">
            Article publié sur{' '}
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-brand-600 dark:text-brand-400 hover:underline"
            >
              fabeon.fr
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </article>
      </div>
    </div>
  )
}
