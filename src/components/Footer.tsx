import { Link } from 'react-router-dom'
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-theme bg-footer mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-heading">Fabeon HubAcademy</span>
            </div>
            <p className="text-muted text-sm max-w-md leading-relaxed">
              La plateforme de formation dédiée aux métiers de l'impression numérique et de la
              communication visuelle. Cours en ligne, ateliers pratiques et expertise terrain.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-heading mb-3">Formation</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link to="/cours" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Catalogue cours</Link></li>
              <li><Link to="/ateliers" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Ateliers présentiel</Link></li>
              <li><Link to="/mon-espace" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Mon espace</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-heading mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                formation@fabeon.fr
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                +33 4 00 00 00 00
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-500" />
                Lyon & Paris
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-theme flex flex-col sm:flex-row justify-between gap-4 text-xs text-faint">
          <p>© {new Date().getFullYear()} Fabeon HubAcademy. Tous droits réservés.</p>
          <p>Impression numérique · Communication visuelle · Formation professionnelle</p>
        </div>
      </div>
    </footer>
  )
}
