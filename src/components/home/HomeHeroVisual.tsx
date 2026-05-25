import { Link } from 'react-router-dom'
import { ArrowRight, Factory } from 'lucide-react'
import type { Category } from '../../types'
import { CategoryIcon } from '../CategoryIcon'
import { SMART_FACTORY } from '../../data/smartFactory'
import { getHomeHeroThemeImage } from '../../data/homeHeroImages'

interface Props {
  categories: Category[]
}

export function HomeHeroVisual({ categories }: Props) {
  return (
    <div className="relative hidden lg:block">
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-lg ring-1 ring-slate-200/60 dark:border-slate-700 dark:bg-slate-900 dark:ring-white/10 min-h-[42rem]">
        <img
          src={SMART_FACTORY.heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.22] dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-slate-50/90 to-brand-50/40 dark:from-slate-900/95 dark:via-slate-900/90 dark:to-brand-950/30" />

        <div className="absolute -top-3 -right-3 w-28 h-28 rounded-2xl overflow-hidden border border-slate-200/90 shadow-md rotate-6 z-10 dark:border-slate-600">
          <img
            src="/smartfactory/machine-massivit.png"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-6 -left-4 w-24 h-24 rounded-2xl overflow-hidden border border-slate-200/90 shadow-md -rotate-6 z-10 hidden xl:block dark:border-slate-600">
          <img
            src="/smartfactory/galerie-atelier-2.jpg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex flex-col min-h-[42rem] h-full p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pr-20">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-700 bg-white/90 border border-slate-200/80 rounded-full px-3.5 py-1.5 dark:text-brand-300 dark:bg-slate-800/90 dark:border-slate-600">
              <Factory className="w-3.5 h-3.5" />
              SmartFactory · Parc réel
            </p>
            <Link
              to={SMART_FACTORY.path}
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors dark:text-brand-400 dark:hover:text-brand-300"
            >
              Voir le parc
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-sm font-display font-semibold text-slate-600 mb-3 dark:text-slate-300">
            7 thématiques — parcours & ateliers
          </p>

          <div className="grid grid-cols-2 gap-3 flex-1 min-h-[26rem] auto-rows-fr">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/formation-en-ligne?theme=${cat.id}`}
                className="group relative flex h-full min-h-[6.25rem] rounded-xl overflow-hidden border border-slate-200/80 hover:border-brand-300/80 transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-slate-600 dark:hover:border-brand-500/50"
              >
                <img
                  src={getHomeHeroThemeImage(cat.id)}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/15 to-transparent" />
                <div className="relative flex h-full items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-white/90 border border-white/60 flex items-center justify-center shrink-0 shadow-sm">
                    <CategoryIcon name={cat.icon} className="w-5 h-5 text-slate-700" />
                  </div>
                  <span className="text-sm font-semibold text-white leading-snug line-clamp-3">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
