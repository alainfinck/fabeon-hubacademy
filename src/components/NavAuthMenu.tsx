import { NavLink } from 'react-router-dom'
import { ChevronDown, LogIn, User, UserPlus } from 'lucide-react'

const authItems = [
  {
    to: '/connexion',
    label: 'Connexion',
    description: 'Accédez à votre espace et reprenez vos cours.',
    icon: LogIn,
  },
  {
    to: '/inscription',
    label: 'Inscription',
    description: 'Créez un compte gratuit en quelques minutes.',
    icon: UserPlus,
  },
] as const

function isAuthActive(pathname: string) {
  return authItems.some(
    (item) => pathname === item.to || pathname.startsWith(`${item.to}/`)
  )
}

interface Props {
  pathname: string
  onNavigate?: () => void
  variant?: 'desktop' | 'mobile'
  /** Bouton intégré dans un groupe header (Compte + Commencer). */
  embedded?: boolean
}

export function NavAuthMenu({
  pathname,
  onNavigate,
  variant = 'desktop',
  embedded = false,
}: Props) {
  const active = isAuthActive(pathname)

  if (variant === 'mobile') {
    return (
      <div className="mb-4">
        <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-faint flex items-center gap-1.5">
          <User className="w-4 h-4" />
          Compte
        </p>
        {authItems.map((item) => {
          const ItemIcon = item.icon
          const itemActive = pathname === item.to
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={`block px-4 py-3 rounded-xl mb-1 transition-colors ${
                itemActive ? 'nav-active' : 'hover:bg-muted'
              }`}
            >
              <span className="flex items-center gap-2 text-lg font-semibold text-heading">
                <ItemIcon className="w-5 h-5 text-brand-600 dark:text-brand-400 shrink-0" />
                {item.label}
              </span>
              <span className="block mt-1 ml-7 text-sm text-muted leading-relaxed">
                {item.description}
              </span>
            </NavLink>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`group/nav-auth relative ${embedded ? 'flex' : ''}`}>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 transition-colors whitespace-nowrap ${
          embedded ? 'rounded-none h-full border-r border-theme' : 'rounded-lg'
        } ${active ? 'nav-active' : 'nav-item'}`}
        aria-haspopup="true"
        aria-expanded="false"
      >
        <User className="w-4 h-4 shrink-0 opacity-80" />
        Compte
        <ChevronDown className="w-4 h-4 opacity-70 transition-transform group-hover/nav-auth:rotate-180 group-focus-within/nav-auth:rotate-180" />
      </button>

      <div
        className="nav-dropdown-panel absolute top-full right-0 opacity-0 invisible translate-y-1 group-hover/nav-auth:opacity-100 group-hover/nav-auth:visible group-hover/nav-auth:translate-y-0 group-focus-within/nav-auth:opacity-100 group-focus-within/nav-auth:visible group-focus-within/nav-auth:translate-y-0 transition-all duration-200 ease-out z-[100]"
        role="menu"
      >
        <div className="nav-dropdown-menu">
          <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-faint">
            Compte
          </p>
          {authItems.map((item) => {
            const ItemIcon = item.icon
            const itemActive = pathname === item.to
            return (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                className={`flex items-start gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                  itemActive
                    ? 'bg-brand-500/15 text-brand-800'
                    : 'text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ItemIcon className="w-5 h-5 shrink-0 mt-0.5 text-brand-600 dark:text-brand-400" />
                <span>
                  <span className="block text-base font-semibold leading-snug">{item.label}</span>
                  <span className="block text-sm text-muted mt-1 leading-relaxed">
                    {item.description}
                  </span>
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </div>
  )
}
