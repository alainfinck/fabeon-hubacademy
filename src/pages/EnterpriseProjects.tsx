import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, PlusCircle, Filter } from 'lucide-react'
import type { EnterpriseProject, EnterpriseProjectStatus } from '../types'
import { api } from '../api/client'
import { PageHeader } from '../components/PageHeader'
import { PageError, PageLoader } from '../components/PageLoader'
import { EnterpriseProjectCard } from '../components/enterprise/EnterpriseProjectCard'
import { projectStatusLabels } from '../lib/enterpriseProjectUtils'
import { EquipmentByCategoryBlock } from '../components/equipment/EquipmentByCategoryBlock'

type FilterValue = 'all' | EnterpriseProjectStatus

const filters: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'pending', label: projectStatusLabels.pending },
  { value: 'assigned', label: projectStatusLabels.assigned },
  { value: 'in_progress', label: projectStatusLabels.in_progress },
  { value: 'completed', label: projectStatusLabels.completed },
]

export function EnterpriseProjects() {
  const [allProjects, setAllProjects] = useState<EnterpriseProject[]>([])
  const [filter, setFilter] = useState<FilterValue>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.getEnterpriseProjects()
      setAllProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger les projets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const projects = useMemo(
    () =>
      filter === 'all'
        ? allProjects
        : allProjects.filter((p) => p.status === filter),
    [allProjects, filter]
  )

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allProjects.length }
    for (const p of allProjects) {
      c[p.status] = (c[p.status] ?? 0) + 1
    }
    return c
  }, [allProjects])

  if (loading && allProjects.length === 0) return <PageLoader />
  if (error && allProjects.length === 0) return <PageError message={error} onRetry={load} />

  return (
    <>
      <PageHeader
        icon={Briefcase}
        badge="Projets entreprises"
        title="Catalogue des projets terrain"
        description="Consultez les projets déposés par les ateliers partenaires. Les apprenants peuvent s'y inscrire sous supervision formateur."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <Link
            to="/projets-entreprises/deposer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors w-fit"
          >
            <PlusCircle className="w-5 h-5" />
            Déposer un projet
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-faint shrink-0" />
            {filters.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFilter(f.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f.value
                    ? 'bg-brand-500/15 text-brand-700 dark:text-brand-300 border border-brand-500/30'
                    : 'text-muted hover:text-heading border border-transparent'
                }`}
              >
                {f.label}
                {(counts[f.value] ?? 0) > 0 && (
                  <span className="ml-1 opacity-70">({counts[f.value] ?? counts.all})</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">{error}</p>
        )}

        <div className="mb-10">
          <EquipmentByCategoryBlock variant="compact" />
        </div>

        {loading ? (
          <PageLoader />
        ) : projects.length === 0 ? (
          <div className="text-center py-16 rounded-2xl card-base border">
            <Briefcase className="w-12 h-12 text-faint mx-auto mb-4" />
            <p className="font-medium text-heading">Aucun projet pour ce filtre</p>
            <p className="text-sm text-muted mt-2">
              Soyez le premier à déposer un projet pour nos apprenants.
            </p>
            <Link
              to="/projets-entreprises/deposer"
              className="inline-flex items-center gap-2 mt-6 text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              <PlusCircle className="w-4 h-4" />
              Déposer un projet
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <EnterpriseProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
