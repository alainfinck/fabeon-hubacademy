import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { CONTACT } from '../data/contact'
import { navCategories } from '../data/nav'
import { PartnersLogoCarousel } from './PartnersLogoCarousel'

const linkClass =
  'text-muted hover:text-brand-600 dark:hover:text-brand-400 transition-colors'

function FooterLinkColumn({
  title,
  links,
}: {
  title: string
  links: { to: string; label: string }[]
}) {
  return (
    <div>
      <h4 className="font-display font-semibold text-heading text-sm mb-3">{title}</h4>
      <ul className="space-y-2 text-sm">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className={linkClass}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

const accountLinks = [
  { to: '/connexion', label: 'Connexion' },
  { to: '/inscription', label: 'Inscription' },
]

const entrepriseExtraLinks = [{ to: '/projets-entreprises/deposer', label: 'Déposer un projet' }]

export function Footer() {
  return (
    <footer className="border-t border-theme bg-footer mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <BrandLogo size="lg" />
            </Link>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              La plateforme de formation dédiée aux métiers de l&apos;impression numérique et de la
              communication visuelle. Cours en 5 langues, ateliers pratiques, expertise terrain et
              marketplace pour les formateurs externes.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {navCategories.map((category) => (
                <FooterLinkColumn
                  key={category.id}
                  title={category.label}
                  links={
                    category.id === 'entreprises'
                      ? [
                          ...category.items.map(({ to, label }) => ({ to, label })),
                          ...entrepriseExtraLinks,
                        ]
                      : category.items.map(({ to, label }) => ({ to, label }))
                  }
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display font-semibold text-heading text-sm mb-3">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                <a href={CONTACT.phoneHref} className={linkClass}>
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0 mt-0.5" />
                <address className="not-italic leading-relaxed">
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.addressLine2}
                </address>
              </li>
            </ul>

            <h4 className="font-display font-semibold text-heading text-sm mt-8 mb-3">Compte</h4>
            <ul className="space-y-2 text-sm">
              {accountLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <PartnersLogoCarousel />

        <div className="mt-6 pt-6 border-t border-theme flex flex-col sm:flex-row justify-between gap-4 text-xs text-faint">
          <p>© {new Date().getFullYear()} Fabeon HubAcademy. Tous droits réservés.</p>
          <p>Impression numérique · Communication visuelle · Formation professionnelle</p>
        </div>
      </div>
    </footer>
  )
}
