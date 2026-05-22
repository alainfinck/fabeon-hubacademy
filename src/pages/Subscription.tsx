import { Link } from 'react-router-dom'
import { Infinity } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { HomeSubscriptionSection } from '../components/home/HomeSubscriptionSection'

export function Subscription() {
  return (
    <>
      <PageHeader
        icon={Infinity}
        badge="Abonnement entreprise"
        title="Accès illimité aux cours"
        description="Formez toute votre équipe avec un abonnement mensuel adapté à la taille de votre atelier."
      />
      <HomeSubscriptionSection embedded />
      <p className="text-center text-sm text-muted pb-16">
        Une question ?{' '}
        <Link to="/a-propos" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
          Contactez-nous
        </Link>
      </p>
    </>
  )
}
