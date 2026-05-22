import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandLogo } from './BrandLogo'
import { CONTACT } from '../data/contact'
import { PartnersLogoCarousel } from './PartnersLogoCarousel'

export function Footer() {
  return (
    <footer className="border-t border-theme bg-footer mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <BrandLogo size="lg" />
            </Link>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              La plateforme de formation dédiée aux métiers de l'impression numérique et de la
              communication visuelle. Cours en ligne, ateliers pratiques et expertise terrain.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-heading mb-3">Formation</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/formation-en-ligne" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Formation en ligne</Link></li>
              <li><Link to="/ateliers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Ateliers présentiel</Link></li>
              <li><Link to="/ateliers?ia=1" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Ateliers IA</Link></li>
              <li><Link to="/formation-en-ligne?theme=ia" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Parcours IA</Link></li>
              <li><Link to="/evenements" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Événements & conférences</Link></li>
              <li><Link to="/abonnement" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Abonnement entreprise</Link></li>
              <li><Link to="/cours" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Catalogue cours</Link></li>
              <li><Link to="/projets-entreprises" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Catalogue projets</Link></li>
              <li><Link to="/projets-entreprises/deposer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Déposer un projet</Link></li>
              <li><Link to="/mon-espace" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Mon espace</Link></li>
              <li><Link to="/connexion" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Connexion</Link></li>
              <li><Link to="/inscription" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Inscription</Link></li>
              <li><Link to="/a-propos" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">À propos</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-heading mb-3">Contact</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600 dark:text-brand-500 shrink-0" />
                <a
                  href={CONTACT.phoneHref}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
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
