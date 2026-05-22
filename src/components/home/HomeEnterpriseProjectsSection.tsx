import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, ArrowRight, PlusCircle, Loader2 } from 'lucide-react'
import type { EnterpriseProject } from '../../types'
import { api } from '../../api/client'
import { EnterpriseProjectCard } from '../enterprise/EnterpriseProjectCard'

const ACTIVE_STATUSES = new Set(['pending', 'assigned', 'in_progress'])

export function HomeEnterpriseProjectsSection() {
  const [projects, setProjects] = useState<EnterpriseProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getEnterpriseProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [])

  const featured = useMemo(() => {
    return [...projects]
      .filter((p) => ACTIVE_STATUSES.has(p.status))
      .sort((a, b) => {
        const order = { pending: 0, assigned: 1, in_progress: 2, completed: 3 }
        const diff = order[a.status] - order[b.status]
        if (diff !== 0) return diff
        return (a.deadline ?? '').localeCompare(b.deadline ?? '')
      })
      .slice(0, 3)
  }, [projects])

  return (
    <section className="border-y border-theme bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
              <Briefcase className="w-4 h-4" />
              Projets terrain
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              Projets réels pour nos apprenants
            </h2>
            <p className="text-muted mt-3 leading-relaxed">
              Ateliers et enseignes partenaires déposent des projets concrets : calibration,
              grand format, découpe Zünd, signalétique… Traités sous supervision de formateurs experts.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/projets-entreprises"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors"
            >
              Voir tous les projets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/projets-entreprises/deposer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-theme hover:border-brand-500/50 text-body font-semibold text-sm transition-colors bg-surface"
            >
              <PlusCircle className="w-4 h-4" />
              Déposer un projet
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-muted">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-12 rounded-2xl card-base border">
            <Briefcase className="w-10 h-10 text-faint mx-auto mb-3" />
            <p className="font-medium text-heading">Aucun projet ouvert pour le moment</p>
            <p className="text-sm text-muted mt-2 mb-6">
              Soyez le premier à proposer un projet terrain à nos apprenants.
            </p>
            <Link
              to="/projets-entreprises/deposer"
              className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline"
            >
              <PlusCircle className="w-4 h-4" />
              Déposer un projet
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <EnterpriseProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
