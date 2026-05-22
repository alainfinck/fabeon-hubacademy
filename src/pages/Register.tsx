import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Loader2 } from 'lucide-react'
import { AuthFormLayout } from '../components/AuthFormLayout'
import { useAuth } from '../context/AuthContext'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    try {
      await register(name, email, password)
      navigate('/mon-espace', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Inscription impossible')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthFormLayout
      title="Inscription"
      subtitle="Créez votre compte pour suivre vos cours et votre progression."
      footer={
        <>
          Déjà inscrit ?{' '}
          <Link to="/connexion" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
            Se connecter
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-heading mb-1.5">
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-theme bg-surface text-body focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            placeholder="Jean Dupont"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-heading mb-1.5">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-theme bg-surface text-body focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            placeholder="vous@entreprise.fr"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-heading mb-1.5">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-theme bg-surface text-body focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            placeholder="8 caractères minimum"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-heading mb-1.5">
            Confirmer le mot de passe
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-theme bg-surface text-body focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 disabled:opacity-60 text-white font-semibold transition-colors"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <UserPlus className="w-5 h-5" />}
          Créer mon compte
        </button>
      </form>
    </AuthFormLayout>
  )
}
