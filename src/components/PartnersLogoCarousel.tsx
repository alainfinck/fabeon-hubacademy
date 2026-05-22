import { partnerLogoFiles } from '../data/partnerLogos'

export function PartnersLogoCarousel() {
  const track = [...partnerLogoFiles, ...partnerLogoFiles]

  return (
    <div className="partners-carousel overflow-hidden border-t border-theme py-8">
      <p className="text-center text-[10px] font-semibold uppercase tracking-wider text-faint mb-6 px-4">
        Partenaires & technologies
      </p>
      <div className="relative">
        <div className="partners-carousel-fade-left pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-r from-[var(--carousel-fade)] to-transparent" />
        <div className="partners-carousel-fade-right pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-20 z-10 bg-gradient-to-l from-[var(--carousel-fade)] to-transparent" />

        <div className="partners-carousel-track flex items-center gap-10 sm:gap-14 w-max">
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex items-center justify-center shrink-0 h-12 sm:h-14 w-28 sm:w-36 px-4 rounded-lg bg-white dark:bg-slate-950 border border-theme"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-8 sm:max-h-10 w-auto max-w-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
