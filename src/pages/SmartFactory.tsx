import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Factory,
  Leaf,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react'
import { CardCoverImage } from '../components/CardCoverImage'
import { EquipmentByCategoryBlock } from '../components/equipment/EquipmentByCategoryBlock'
import { EquipmentCard } from '../components/equipment/EquipmentCard'
import { SmartFactoryGallery } from '../components/smartfactory/SmartFactoryGallery'
import { EquipmentRelatedFormations } from '../components/equipment/EquipmentRelatedFormations'
import { getAllEquipmentWithCategory } from '../data/equipment'
import {
  SMART_FACTORY,
  smartFactoryEnvironment,
  smartFactoryServices,
} from '../data/smartFactory'
import { coverFallbackSeed } from '../data/coverImages'
import { CONTACT } from '../data/contact'

export function SmartFactory() {
  return (
    <div className="pb-20">
      <CardCoverImage
        src={SMART_FACTORY.heroImage}
        imageGradient="from-slate-800 to-brand-900"
        alt={SMART_FACTORY.heroImageAlt}
        className="h-48 sm:h-64 lg:h-72"
        overlay="strong"
        fallbackSeed={coverFallbackSeed('smartfactory-hero')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative">
        <div className="rounded-2xl card-base border px-4 sm:px-6 py-4 shadow-lg dark:shadow-xl inline-flex flex-wrap items-center gap-2">
          <Factory className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span className="font-display font-bold text-heading">{SMART_FACTORY.title}</span>
          <span className="text-sm text-muted hidden sm:inline">·</span>
          <span className="text-sm text-muted">{SMART_FACTORY.tagline}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="rounded-3xl hero-card border overflow-hidden mb-12">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-6 sm:p-10 flex flex-col justify-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-heading">
                La SmartFactory, c&apos;est quoi ?
              </h2>
              <div className="mt-4 space-y-4 text-body leading-relaxed">
                {SMART_FACTORY.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted">
                <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                {CONTACT.addressFull}
              </p>
              <a
                href={`mailto:${SMART_FACTORY.contactEmail}?subject=Projet%20SmartFactory`}
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold text-sm transition-colors w-fit"
              >
                <Mail className="w-4 h-4" />
                Une demande, un projet ? {SMART_FACTORY.contactEmail}
              </a>
            </div>
            <div className="relative min-h-[220px] lg:min-h-full bg-muted/30 border-t lg:border-t-0 lg:border-l border-theme">
              <img
                src={SMART_FACTORY.bannerImage}
                alt={SMART_FACTORY.bannerImageAlt}
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-heading mb-2">
            Parc machines
          </h2>
          <p className="text-muted text-sm mb-8 max-w-2xl">
            Équipements réels du site Fabéon — photos issues de l&apos;atelier et du campus.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {getAllEquipmentWithCategory().map(({ item, category }) => (
              <EquipmentCard key={item.id} item={item} category={category} />
            ))}
          </div>
        </section>

        <EquipmentRelatedFormations
          className="mb-12"
          description="Apprenez à piloter le parc SmartFactory : cours vidéo, modules hybrides et ateliers pratiques sur les mêmes équipements que nos projets entreprises."
        />

        <SmartFactoryGallery className="mb-12" />

        <EquipmentByCategoryBlock
          variant="detailed"
          showMachinePhotos
          showFooterLink={false}
          title="Liste du parc par catégorie"
          description="Synthèse des machines et formats — pour cadrer votre projet ou votre formation."
          className="mb-12"
        />

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-heading text-center mb-8">
            Nos expertises
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {smartFactoryServices.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl card-base overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-muted/40 border-b border-theme">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-heading">
                    {service.title}
                  </h3>
                  {'paragraphs' in service &&
                    service.paragraphs.map((p) => (
                      <p key={p} className="text-sm text-muted mt-3 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  {'list' in service && (
                    <ul className="mt-4 space-y-2 text-sm text-body flex-1">
                      {service.list.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-brand-600 dark:text-brand-500 shrink-0">
                            ·
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-emerald-500/25 bg-emerald-500/5 p-6 sm:p-10 mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-heading">
              {smartFactoryEnvironment.title}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {smartFactoryEnvironment.sections.map((s) => (
              <div key={s.heading}>
                <h3 className="font-display font-semibold text-heading">{s.heading}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            to="/projets-entreprises/deposer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-500 hover:bg-accent-600 text-white font-semibold transition-colors"
          >
            Déposer un projet
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/materiel"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme font-semibold text-heading hover:border-brand-500/40 transition-colors"
          >
            Matériel de formation
          </Link>
          <a
            href={SMART_FACTORY.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-theme text-body font-semibold hover:border-brand-500/40 transition-colors"
          >
            fabeon.fr
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
