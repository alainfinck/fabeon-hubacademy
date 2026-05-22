import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Building2, Calendar, Tag, User } from 'lucide-react'
import type { EnterpriseProjectDetail } from '../types'
import { api } from '../api/client'
import { PageError, PageLoader } from '../components/PageLoader'
import {
  formatProjectDate,
  projectStatusColors,
  projectStatusLabels,
} from '../lib/enterpriseProjectUtils'

export function EnterpriseProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<EnterpriseProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    api
      .getEnterpriseProject(id)
      .then(setProject)
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Projet introuvable')
      )
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <PageLoader />
  if (error || !project) {
    return (
      <PageError
        message={error || 'Projet introuvable'}
        onRetry={() => window.location.reload()}
      />
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
      <Link
        to="/projets-entreprises"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour au catalogue
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span
          className={`inline-flex text-xs font-medium px-2.5 py-0.5 rounded-full border ${projectStatusColors[project.status]}`}
        >
          {projectStatusLabels[project.status]}
        </span>
        <span className="inline-flex items-center gap-1 text-sm text-muted">
          <Tag className="w-4 h-4" />
          {project.projectType}
        </span>
      </div>

      <h1 className="font-display text-3xl font-bold text-heading flex items-center gap-3">
        <Building2 className="w-8 h-8 text-brand-600 dark:text-brand-400 shrink-0" />
        {project.company}
      </h1>

      <dl className="grid sm:grid-cols-2 gap-4 mt-8 p-5 rounded-2xl card-base border text-sm">
        <div>
          <dt className="text-faint uppercase text-xs tracking-wide">Contact interne</dt>
          <dd className="mt-1 font-medium text-heading flex items-center gap-1.5">
            <User className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            {project.contactName}
          </dd>
        </div>
        <div>
          <dt className="text-faint uppercase text-xs tracking-wide">Échéance</dt>
          <dd className="mt-1 font-medium text-heading flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            {formatProjectDate(project.deadline)}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-faint uppercase text-xs tracking-wide">Déposé le</dt>
          <dd className="mt-1 text-muted">{formatProjectDate(project.createdAt)}</dd>
        </div>
      </dl>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-heading mb-3">Description du projet</h2>
        <p className="text-body leading-relaxed whitespace-pre-wrap">{project.description}</p>
      </section>

      <p className="mt-10 text-sm text-muted card-base border rounded-xl px-4 py-3">
        Vous êtes apprenant ? Contactez votre formateur pour vous attribuer ce projet.
        Entreprise partenaire ?{' '}
        <Link
          to="/projets-entreprises/deposer"
          className="text-brand-600 dark:text-brand-400 font-medium hover:underline"
        >
          Déposez votre propre projet
        </Link>
        .
      </p>
    </div>
  )
}
