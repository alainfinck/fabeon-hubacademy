import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, LogIn, UserPlus, LogOut, User } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'
import { NavTooltip } from './NavTooltip'
import { NavCategoryMenu } from './NavCategoryMenu'
import { navCategories } from '../data/nav'
import { useAuth } from '../context/AuthContext'

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  async function handleLogout() {
    await logout()
    setOpen(false)
  }

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-header backdrop-blur-md dark:shadow-md dark:shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem] gap-2">
          <NavTooltip
            title="Fabeon HubAcademy"
            description="Formation impression numérique & communication visuelle."
          >
            <Link to="/" className="flex items-center shrink-0 group rounded-lg py-1">
              <BrandLogo size="md" className="sm:h-12" />
            </Link>
          </NavTooltip>

          <nav
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center min-w-0"
            aria-label="Navigation principale"
          >
            {navCategories.map((category) => (
              <NavCategoryMenu
                key={category.id}
                category={category}
                pathname={pathname}
                variant="desktop"
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <NavTooltip title="Thème" description="Mode clair ou sombre.">
              <ThemeToggle />
            </NavTooltip>

            {user ? (
              <>
                <NavTooltip title="Mon compte" description={`Connecté : ${user.name}`}>
                  <Link
                    to="/mon-espace"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg nav-item max-w-[11rem] truncate"
                  >
                    <User className="w-4 h-4 shrink-0" />
                    <span className="truncate hidden xl:inline">{user.name.split(' ')[0]}</span>
                  </Link>
                </NavTooltip>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1 px-2.5 py-2.5 rounded-lg text-base text-muted hover:text-heading transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg nav-item"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden xl:inline">Connexion</span>
                </Link>
                <Link
                  to="/inscription"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-brand-500/40 text-brand-600 dark:text-brand-300 text-base font-semibold hover:bg-brand-500/10 dark:hover:bg-brand-500/20 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden xl:inline">Inscription</span>
                </Link>
              </>
            )}

            <NavTooltip title="Commencer" description="Ouvrir le catalogue des cours.">
              <Link
                to="/cours"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-base font-semibold transition-colors"
              >
                <span className="hidden xl:inline">Commencer</span>
                <span className="xl:hidden">Go</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </NavTooltip>
          </div>

          <div className="flex md:hidden items-center gap-1 shrink-0">
            <ThemeToggle />
            <button
              type="button"
              className="p-2.5 text-navigation hover:text-heading rounded-lg"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-theme bg-page px-4 py-4 max-h-[min(75vh,36rem)] overflow-y-auto">
          {user && (
            <p className="px-4 py-2 mb-2 text-sm text-muted border-b border-theme">
              Connecté : <span className="font-medium text-heading">{user.name}</span>
            </p>
          )}

          {navCategories.map((category) => (
            <NavCategoryMenu
              key={category.id}
              category={category}
              pathname={pathname}
              onNavigate={closeMenu}
              variant="mobile"
            />
          ))}

          <div className="flex gap-2 mt-2 pt-3 border-t border-theme">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-theme text-heading font-medium"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            ) : (
              <>
                <Link
                  to="/connexion"
                  onClick={closeMenu}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-theme font-medium text-heading"
                >
                  <LogIn className="w-4 h-4" />
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  onClick={closeMenu}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-500/15 text-brand-700 dark:text-brand-300 font-semibold"
                >
                  <UserPlus className="w-4 h-4" />
                  Inscription
                </Link>
              </>
            )}
          </div>
          <Link
            to="/cours"
            onClick={closeMenu}
            className="flex items-center justify-center gap-2 mt-2 px-4 py-3 rounded-xl bg-accent-500 text-white font-semibold"
          >
            Commencer
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  )
}
