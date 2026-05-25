import { Link } from 'react-router-dom'
import { Building2, Calendar, ArrowRight, Tag } from 'lucide-react'
import type { EnterpriseProject } from '../../types'
import { CardCoverImage } from '../CardCoverImage'
import { coverFallbackSeed, getEnterpriseProjectCoverImage } from '../../data/coverImages'
import {
  excerpt,
  formatProjectDate,
  projectStatusColors,
  projectStatusLabels,
} from '../../lib/enterpriseProjectUtils'

interface Props {
  project: EnterpriseProject
}

export function EnterpriseProjectCard({ project }: Props) {
  return (
    <Link
      to={`/projets-entreprises/${project.id}`}
      className="group block rounded-2xl card-base overflow-hidden hover:border-brand-500/30 transition-all card-glow"
    >
      <CardCoverImage
        src={getEnterpriseProjectCoverImage(project)}
        imageGradient="from-brand-600 to-slate-800"
        alt={project.projectType}
        className="h-28"
        overlay="light"
        fallbackSeed={coverFallbackSeed(`project-${project.id}`)}
      />
      <div className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <span
          className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full border ${projectStatusColors[project.status]}`}
        >
          {projectStatusLabels[project.status]}
        </span>
        <span className="inline-flex items-center gap-1 text-xs text-faint">
          <Tag className="w-3 h-3" />
          {project.projectType}
        </span>
      </div>

      <h3 className="font-display font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors flex items-center gap-2">
        <Building2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
        {project.company}
      </h3>

      <p className="text-sm text-muted mt-3 leading-relaxed line-clamp-3">
        {excerpt(project.description)}
      </p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-theme-subtle">
        <span className="inline-flex items-center gap-1.5 text-xs text-faint">
          <Calendar className="w-3.5 h-3.5" />
          Échéance {formatProjectDate(project.deadline)}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 dark:text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Voir le projet
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
      </div>
    </Link>
  )
}
