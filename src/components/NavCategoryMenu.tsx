import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import type { NavCategory } from '../data/nav'
import { isCategoryActive, isNavItemActive } from '../data/nav'

interface Props {
  category: NavCategory
  pathname: string
  onNavigate?: () => void
  variant?: 'desktop' | 'mobile'
}

export function NavCategoryMenu({
  category,
  pathname,
  onNavigate,
  variant = 'desktop',
}: Props) {
  const active = isCategoryActive(category, pathname)
  const Icon = category.icon
  const singleItem = category.items.length === 1

  if (variant === 'mobile') {
    return (
      <div className="mb-4">
        <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-faint flex items-center gap-1.5">
          <Icon className="w-4 h-4" />
          {category.label}
        </p>
        {category.items.map((item) => {
          const ItemIcon = item.icon
          const itemActive = isNavItemActive(item.to, pathname)
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

  if (singleItem) {
    const item = category.items[0]
    const ItemIcon = item.icon
    const itemActive = isNavItemActive(item.to, pathname)
    return (
      <NavLink
        to={item.to}
        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
          itemActive ? 'nav-active' : 'nav-item'
        }`}
      >
        <ItemIcon className="w-4 h-4 shrink-0 opacity-80" />
        {category.label}
      </NavLink>
    )
  }

  return (
    <div className="group/nav-cat relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg transition-colors whitespace-nowrap ${
          active ? 'nav-active' : 'nav-item'
        }`}
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Icon className="w-4 h-4 shrink-0 opacity-80" />
        {category.label}
        <ChevronDown className="w-4 h-4 opacity-70 transition-transform group-hover/nav-cat:rotate-180 group-focus-within/nav-cat:rotate-180" />
      </button>

      <div
        className="nav-dropdown-panel absolute top-full left-1/2 -translate-x-1/2 opacity-0 invisible translate-y-1 group-hover/nav-cat:opacity-100 group-hover/nav-cat:visible group-hover/nav-cat:translate-y-0 group-focus-within/nav-cat:opacity-100 group-focus-within/nav-cat:visible group-focus-within/nav-cat:translate-y-0 transition-all duration-200 ease-out z-[100]"
        role="menu"
      >
        <div className="w-[24rem] max-w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-theme bg-white dark:bg-slate-950 shadow-xl py-2 overflow-hidden">
          <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-faint">
            {category.label}
          </p>
          {category.items.map((item) => {
            const ItemIcon = item.icon
            const itemActive = isNavItemActive(item.to, pathname)
            return (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                className={`flex items-start gap-3 px-3 py-3 mx-1.5 rounded-lg transition-colors ${
                  itemActive
                    ? 'bg-brand-500/15 text-brand-800 dark:bg-brand-500/20 dark:text-brand-100'
                    : 'text-heading hover:bg-slate-100 dark:hover:bg-slate-900'
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
