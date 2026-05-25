import { Newspaper } from 'lucide-react'
import { editorialArticles } from '../data/editorialArticles'
import { EditorialArticleCard } from '../components/editorial/EditorialArticleCard'
import { PageHeader } from '../components/PageHeader'

export function EditorialArticles() {
  return (
    <div className="pb-20">
      <PageHeader
        icon={Newspaper}
        badge="À la une"
        title="Actualités & expertise Fabéon"
        description="Articles terrain sur l’impression grand format, les métiers du secteur et les parcours de formation HubAcademy — contenus issus de fabeon.fr."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialArticles.map((article) => (
            <EditorialArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
