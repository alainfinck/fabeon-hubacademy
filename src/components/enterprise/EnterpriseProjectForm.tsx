import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { api } from '../../api/client'

const projectTypes = [
  'Calibration & profils ICC',
  'Impression grand format',
  'Découpe & finition (Zünd)',
  'Signalétique / retail',
  'Workflow RIP (Caldera, Onyx)',
  'Autre projet atelier',
]

export function EnterpriseProjectForm() {
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

  if (status === 'success') {
    return (
      <div className="text-center py-10 rounded-2xl card-base border">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <p className="font-display text-lg font-semibold text-heading">Projet enregistré</p>
        <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
          Votre projet apparaîtra dans le catalogue après validation. Nous vous recontactons sous 48 h ouvrées.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
        >
          Déposer un autre projet
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl card-base border p-6 sm:p-8">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs text-faint uppercase tracking-wide">Entreprise *</span>
          <input
            required
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
          />
        </label>
        <label className="block">
          <span className="text-xs text-faint uppercase tracking-wide">Contact *</span>
          <input
            required
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
          />
        </label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs text-faint uppercase tracking-wide">E-mail *</span>
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
          />
        </label>
      </div>
      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">Type de projet *</span>
        <select
          value={form.projectType}
          onChange={(e) => setForm({ ...form, projectType: e.target.value })}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-body text-sm focus:outline-none focus:border-brand-500/50"
        >
          {projectTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">Description du besoin *</span>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Fichiers, matériaux, contraintes colorimétriques, dimensions…"
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50 resize-y"
        />
      </label>
      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">Échéance souhaitée</span>
        <input
          type="date"
          value={form.deadline}
          onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
        />
      </label>
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
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
  )
}
