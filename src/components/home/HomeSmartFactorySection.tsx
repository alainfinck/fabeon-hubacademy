import { Link } from 'react-router-dom'
import { ArrowRight, Factory, MapPin } from 'lucide-react'
import { CardCoverImage } from '../CardCoverImage'
import { SMART_FACTORY, smartFactoryServices } from '../../data/smartFactory'
import { coverFallbackSeed } from '../../data/coverImages'

export function HomeSmartFactorySection() {
  return (
    <section className="border-y border-theme bg-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-300 bg-brand-500/15 border border-brand-500/25 rounded-full px-4 py-1.5 mb-5">
              <Factory className="w-4 h-4" />
              Accélérateur industriel
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight">
              {SMART_FACTORY.title}
            </h2>
            <p className="text-muted mt-4 leading-relaxed">{SMART_FACTORY.tagline}</p>
            <p className="text-body mt-3 leading-relaxed text-sm sm:text-base">
              {SMART_FACTORY.intro[0]}
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-muted mt-4">
              <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
              Parc d&apos;Innovation — Illkirch-Graffenstaden
            </p>
            <Link
              to={SMART_FACTORY.path}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold transition-colors"
            >
              Découvrir la SmartFactory
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="order-1 lg:order-2 rounded-2xl overflow-hidden border border-theme shadow-lg dark:shadow-xl">
            <CardCoverImage
              src={SMART_FACTORY.heroImage}
              imageGradient="from-slate-800 to-brand-900"
              alt={SMART_FACTORY.heroImageAlt}
              className="h-56 sm:h-64 lg:h-72"
              overlay="strong"
              fallbackSeed={coverFallbackSeed('home-smartfactory')}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          {smartFactoryServices.map((service) => (
            <Link
              key={service.id}
              to={SMART_FACTORY.path}
              className="group rounded-2xl card-base border overflow-hidden card-glow hover:border-brand-500/30 transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden bg-surface">
                <img
                  src={service.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-heading group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted mt-2 line-clamp-2">
                  {'paragraphs' in service ? service.paragraphs[0] : service.list[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
