import { Link } from 'react-router-dom'
import { Send, Factory, Users, FileText, ArrowLeft } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { EnterpriseProjectForm } from '../components/enterprise/EnterpriseProjectForm'
import { EquipmentByCategoryBlock } from '../components/equipment/EquipmentByCategoryBlock'

const steps = [
  {
    icon: Factory,
    title: 'Vous déposez',
    text: 'Décrivez votre besoin réel : fichiers, contraintes, délais, matériaux.',
  },
  {
    icon: Users,
    title: 'Nous attribuons',
    text: 'Le projet est confié à un apprenant encadré par nos formateurs.',
  },
  {
    icon: FileText,
    title: 'Livraison encadrée',
    text: 'Prototype ou rapport technique validé avant production.',
  },
]

export function EnterpriseProjectSubmit() {
  return (
    <>
      <PageHeader
        icon={Send}
        badge="Dépôt de projet"
        title="Confiez un projet à nos apprenants"
        description="Ateliers d'impression, enseignes et studios : déposez un projet réel traité sous supervision d'experts certifiés Fabeon HubAcademy."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <Link
          to="/projets-entreprises"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-brand-600 dark:hover:text-brand-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour au catalogue
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-xl font-semibold text-heading mb-6">
              Comment ça fonctionne
            </h2>
            <div className="space-y-6">
              {steps.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-heading">{title}</h3>
                    <p className="text-sm text-muted mt-1">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted mt-8 leading-relaxed">
              Les coordonnées de contact ne sont pas affichées publiquement dans le catalogue.
              Seuls le nom de l'entreprise et le descriptif du besoin sont visibles par les apprenants.
            </p>
          </div>

          <EnterpriseProjectForm />
        </div>

        <div className="mt-12 max-w-4xl">
          <EquipmentByCategoryBlock
            title="Matériel disponible pour votre projet"
            description="Indiquez dans votre brief les procédés adaptés : nos apprenants interviennent sur ce parc machines réel à Illkirch-Graffenstaden."
            variant="compact"
          />
        </div>
      </div>
    </>
  )
}
