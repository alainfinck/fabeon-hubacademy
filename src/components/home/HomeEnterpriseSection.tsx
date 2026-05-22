import { useState } from 'react'
import {
  Briefcase,
  Send,
  CheckCircle2,
  Users,
  FileText,
  Factory,
} from 'lucide-react'
import { api } from '../../api/client'
import { CONTACT } from '../../data/contact'

const projectTypes = [
  'Calibration & profils ICC',
  'Impression grand format',
  'Découpe & finition (Zünd)',
  'Signalétique / retail',
  'Workflow RIP (Caldera, Onyx)',
  'Autre projet atelier',
]

const steps = [
  {
    icon: Factory,
    title: 'Vous déposez',
    text: 'Décrivez votre besoin réel : fichiers, contraintes, délais, matériaux.',
  },
  {
    icon: Users,
    title: 'Nous attribuons',
    text: 'Le projet est confié à un apprenant ou une équipe encadrée par nos formateurs.',
  },
  {
    icon: FileText,
    title: 'Livraison encadrée',
    text: 'Prototype, rapport technique ou prestation — validé avant mise en production.',
  },
]

export function HomeEnterpriseSection() {
  const [form, setForm] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: projectTypes[0],
    description: '',
    deadline: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await api.submitEnterpriseProject(form)
      setStatus('success')
      setForm({
        company: '',
        contactName: '',
        email: '',
        phone: '',
        projectType: projectTypes[0],
        description: '',
        deadline: '',
      })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erreur lors de l\'envoi')
    }
  }

  return (
    <section
      id="projets-entreprises"
      className="border-t border-theme bg-section scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 mb-3">
              <Briefcase className="w-4 h-4" />
              Projets entreprises
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
              Imprimeurs : déposez vos projets réels
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              Ateliers d'impression, enseignes et studios : confiez-nous vos briefs terrain
              (calibration, prototypage, découpe, signalétique). Nos apprenants les traitent
              sous supervision d'experts — vous recevez une solution exploitable.
            </p>

            <div className="mt-8 space-y-6">
              {steps.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-heading">{title}</h3>
                    <p className="text-sm text-muted mt-1">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-faint mt-8">
              Réservé aux abonnés Enterprise ou sur devis. Questions :{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-brand-600 dark:text-brand-400">
                {CONTACT.email}
              </a>
            </p>
          </div>

          <div className="rounded-2xl card-base p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-heading mb-6">
              Déposer un projet
            </h3>

            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <p className="font-medium text-heading">Projet enregistré</p>
                <p className="text-sm text-muted mt-2">
                  Nous vous recontactons sous 48 h ouvrées pour l'attribution à un apprenant.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm text-brand-600 dark:text-brand-400 font-medium"
                >
                  Déposer un autre projet
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs text-faint uppercase tracking-wide">
                      Entreprise *
                    </span>
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
                      placeholder="Nom de l'atelier"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-faint uppercase tracking-wide">
                      Contact *
                    </span>
                    <input
                      required
                      value={form.contactName}
                      onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
                      placeholder="Prénom Nom"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-xs text-faint uppercase tracking-wide">Email *</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
                    />
                  </label>
                  <label className="block">
                    <span className="text-xs text-faint uppercase tracking-wide">Téléphone</span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
                      placeholder={CONTACT.phone}
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="text-xs text-faint uppercase tracking-wide">
                    Type de projet *
                  </span>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-body text-sm focus:outline-none focus:border-brand-500/50"
                  >
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-faint uppercase tracking-wide">
                    Description du besoin *
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50 resize-y"
                    placeholder="Contexte, livrables attendus, fichiers disponibles, contraintes techniques…"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-faint uppercase tracking-wide">
                    Échéance souhaitée
                  </span>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
                  />
                </label>
                {status === 'error' && (
                  <p className="text-sm text-red-500">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold text-sm transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {status === 'loading' ? 'Envoi…' : 'Envoyer le projet'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
