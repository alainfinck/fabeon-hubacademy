import { smartFactoryGallery } from '../../data/smartFactory'

interface Props {
  title?: string
  className?: string
}

export function SmartFactoryGallery({
  title = 'La SmartFactory en images',
  className = '',
}: Props) {
  return (
    <section className={className}>
      <h2 className="font-display text-2xl font-bold text-heading mb-2">{title}</h2>
      <p className="text-sm text-muted mb-6 max-w-2xl">
        Photos de l&apos;atelier et du parc machines — visuels issus de{' '}
        <a
          href="https://fabeon.fr/smartfactory/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 dark:text-brand-400 hover:underline"
        >
          fabeon.fr/smartfactory
        </a>
        .
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {smartFactoryGallery.map((photo) => (
          <figure
            key={photo.src}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-theme bg-muted/30"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
              <span className="text-xs text-white/95 line-clamp-2 leading-snug">
                {photo.alt}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
