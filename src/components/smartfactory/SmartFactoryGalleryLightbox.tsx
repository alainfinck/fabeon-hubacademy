import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export type GalleryPhoto = {
  readonly src: string
  readonly alt: string
}

interface Props {
  photos: readonly GalleryPhoto[]
  startIndex: number
  onClose: () => void
}

export function SmartFactoryGalleryLightbox({ photos, startIndex, onClose }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex,
    loop: true,
    align: 'center',
  })
  const [selectedIndex, setSelectedIndex] = useState(startIndex)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose, scrollPrev, scrollNext])

  const current = photos[selectedIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie photo en plein écran"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-default"
        aria-label="Fermer la galerie"
        onClick={onClose}
      />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Fermer"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="overflow-hidden rounded-xl" ref={emblaRef}>
          <div className="flex">
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="min-w-0 shrink-0 grow-0 basis-full flex flex-col items-center justify-center px-2"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="max-h-[min(75vh,720px)] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Photo suivante"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="mt-4 text-center px-4">
          <p className="text-sm text-white/90 leading-snug">{current?.alt}</p>
          <p className="mt-1 text-xs text-white/60 tabular-nums">
            {selectedIndex + 1} / {photos.length}
          </p>
        </div>
      </div>
    </div>
  )
}
