import { Link } from 'react-router-dom'
import { ArrowRight, Factory, Play } from 'lucide-react'
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
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-700 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 min-h-[34rem]">
        <img
          src={SMART_FACTORY.heroImage}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-brand-950/75 to-slate-900/88" />

        <div className="absolute -top-3 -right-3 w-28 h-28 rounded-2xl overflow-hidden border-2 border-white/90 shadow-xl rotate-6 z-10">
          <img
            src="/smartfactory/machine-massivit.png"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-24 -left-4 w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/90 shadow-lg -rotate-6 z-10 hidden xl:block">
          <img
            src="/smartfactory/galerie-atelier-2.jpg"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative flex flex-col h-full p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pr-20">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/95 bg-white/15 backdrop-blur-md border border-white/25 rounded-full px-3.5 py-1.5">
              <Factory className="w-3.5 h-3.5" />
              SmartFactory · Parc réel
            </p>
            <Link
              to={SMART_FACTORY.path}
              className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 hover:text-white transition-colors"
            >
              Voir le parc
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-sm font-display font-semibold text-white/90 mb-3">
            7 thématiques — parcours & ateliers
          </p>

          <div className="grid grid-cols-2 gap-2 flex-1 content-start">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/formation-en-ligne?theme=${cat.id}`}
                className="group relative rounded-xl overflow-hidden min-h-[4.25rem] border border-white/15 hover:border-white/40 transition-all hover:shadow-lg hover:shadow-black/30 hover:-translate-y-0.5"
              >
                <img
                  src={getHomeHeroThemeImage(cat.id)}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-75 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                <div className="relative flex items-center gap-2.5 p-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shrink-0">
                    <CategoryIcon name={cat.icon} className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-white leading-snug line-clamp-2 drop-shadow-sm">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <Link
            to="/formation-en-ligne"
            className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/50 shadow-lg hover:bg-white transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-500 to-cyan-600 flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
              <Play className="w-5 h-5 text-white ml-0.5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                Reprendre la leçon
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 truncate">
                Delta E — Interprétation
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </div>
  )
}
