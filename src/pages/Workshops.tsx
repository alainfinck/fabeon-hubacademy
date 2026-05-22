import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Sparkles, Wrench } from 'lucide-react'
import { useData } from '../context/DataContext'
import { PageHeader } from '../components/PageHeader'
import { PageError, PageLoader } from '../components/PageLoader'
import { HomeWorkshopsSection } from '../components/home/HomeWorkshopsSection'

export function Workshops() {
  const { workshops, loading, error, refresh } = useData()
  const [searchParams] = useSearchParams()
  const iaOnly = searchParams.get('ia') === '1'

  const filtered = useMemo(
    () => (iaOnly ? workshops.filter((w) => w.ia) : workshops),
    [workshops, iaOnly]
  )

  if (loading) return <PageLoader />
  if (error) return <PageError message={error} onRetry={refresh} />

  return (
    <>
      <PageHeader
        icon={iaOnly ? Sparkles : Wrench}
        badge={iaOnly ? 'Ateliers IA' : 'Ateliers physiques'}
        title={iaOnly ? 'Labs IA & création assistée' : 'Sessions sur machines réelles'}
        description={
          iaOnly
            ? 'Prompting print, visuels génératifs et prototypes PLV : ateliers IA au HubAcademy, avec impression et découpe sur machines réelles.'
            : 'Imprimantes grand format, tables Zünd, LED, audit colorimétrique et ateliers IA à Illkirch-Graffenstaden. Places limitées.'
        }
      />
      <HomeWorkshopsSection workshops={filtered} embedded iaHighlight={iaOnly} />
    </>
  )
}
