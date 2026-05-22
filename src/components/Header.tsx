import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const nav = [
  { to: '/#formation-en-ligne', label: 'En ligne' },
  { to: '/#ateliers-physiques', label: 'Ateliers' },
  { to: '/#abonnement', label: 'Abonnement' },
  { to: '/cours', label: 'Catalogue' },
  { to: '/mon-espace', label: 'Mon espace' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-theme-subtle bg-header backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-heading text-lg leading-none block">
                Fabeon
              </span>
              <span className="text-[10px] text-brand-600 dark:text-brand-400 font-medium tracking-wider uppercase">
                HubAcademy
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'nav-active' : 'nav-item'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/cours"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors"
            >
              Commencer
            </Link>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-navigation hover:text-slate-900 dark:hover:text-white"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-theme bg-page px-4 py-4 space-y-1">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium ${
                  isActive ? 'nav-active' : 'text-body'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/cours"
            onClick={() => setOpen(false)}
            className="block mt-2 text-center px-4 py-3 rounded-lg bg-accent-500 text-white font-semibold"
          >
            Commencer
          </Link>
        </div>
      )}
    </header>
  )
}
