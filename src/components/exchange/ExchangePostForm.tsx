import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../../api/client'
import { categories } from '../../data/categories'
import type { CategoryId } from '../../types'
import { EXCHANGE_HUB } from '../../data/platform'

interface Props {
  initialTopic?: CategoryId
}

export function ExchangePostForm({ initialTopic }: Props) {
  const [form, setForm] = useState({
    topic: (initialTopic ?? 'impression') as CategoryId,
    title: '',
    body: '',
    authorName: '',
    authorRole: '',
    email: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [createdId, setCreatedId] = useState<number | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const { id } = await api.submitExchangePost({
        topic: form.topic,
        title: form.title,
        body: form.body,
        authorName: form.authorName,
        authorRole: form.authorRole || undefined,
        email: form.email || undefined,
      })
      setCreatedId(id)
      setStatus('success')
      setForm({
        topic: initialTopic ?? 'impression',
        title: '',
        body: '',
        authorName: '',
        authorRole: '',
        email: '',
      })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : "Erreur lors de l'envoi")
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-10 rounded-2xl card-base border">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
        <p className="font-display text-lg font-semibold text-heading">Échange publié</p>
        <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
          Votre message est visible dans le hub. La communauté peut y répondre.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {createdId != null && (
            <Link
              to={`${EXCHANGE_HUB.path}/${createdId}`}
              className="text-sm text-brand-600 dark:text-brand-400 font-medium hover:underline"
            >
              Voir mon échange
            </Link>
          )}
          <button
            type="button"
            onClick={() => {
              setStatus('idle')
              setCreatedId(null)
            }}
            className="text-sm text-muted font-medium hover:underline"
          >
            Publier un autre échange
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl card-base border p-6 sm:p-8">
      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">Thématique *</span>
        <select
          required
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value as CategoryId })}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">Titre *</span>
        <input
          required
          maxLength={200}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Ex. : Réglage white ink sur support sombre"
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
        />
      </label>

      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">Votre message *</span>
        <textarea
          required
          rows={6}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          placeholder="Décrivez votre question, astuce ou retour terrain…"
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50 resize-y"
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs text-faint uppercase tracking-wide">Votre nom *</span>
          <input
            required
            value={form.authorName}
            onChange={(e) => setForm({ ...form, authorName: e.target.value })}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
          />
        </label>
        <label className="block">
          <span className="text-xs text-faint uppercase tracking-wide">Fonction / atelier</span>
          <input
            value={form.authorRole}
            onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
            placeholder="Ex. : Opérateur latex"
            className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs text-faint uppercase tracking-wide">E-mail (optionnel)</span>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-input border border-theme text-heading text-sm focus:outline-none focus:border-brand-500/50"
        />
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white font-semibold transition-colors"
      >
        <Send className="w-5 h-5" />
        {status === 'loading' ? 'Publication…' : 'Publier dans le hub'}
      </button>
    </form>
  )
}
