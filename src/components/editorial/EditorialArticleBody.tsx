import type { EditorialBlock } from '../../data/editorialArticles'

interface Props {
  blocks: EditorialBlock[]
}

export function EditorialArticleBody({ blocks }: Props) {
  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'intro':
            return (
              <p
                key={index}
                className="text-lg sm:text-xl text-heading font-display font-semibold leading-relaxed border-l-4 border-brand-500 pl-5"
              >
                {block.text}
              </p>
            )
          case 'heading':
            return (
              <h2
                key={index}
                className="font-display text-xl sm:text-2xl font-bold text-heading pt-2"
              >
                {block.text}
              </h2>
            )
          case 'paragraph':
            return (
              <p key={index} className="text-body leading-relaxed">
                {block.text}
              </p>
            )
          case 'list':
            return (
              <ul
                key={index}
                className="space-y-2 text-body leading-relaxed list-disc pl-6 marker:text-brand-600 dark:marker:text-brand-400"
              >
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
