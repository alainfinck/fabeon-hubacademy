import { useEffect, useState } from 'react'
import { picsumFallback } from '../data/coverImages'

interface Props {
  src: string
  imageGradient: string
  alt?: string
  className?: string
  sizes?: string
  overlay?: 'default' | 'light' | 'strong'
  /** Clé stable pour image de secours (ex. id du cours). */
  fallbackSeed?: string
}

export function CardCoverImage({
  src,
  imageGradient,
  alt = '',
  className = 'h-36',
  sizes,
  overlay = 'default',
  fallbackSeed = 'default',
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [useGradientOnly, setUseGradientOnly] = useState(false)

  useEffect(() => {
    setCurrentSrc(src)
    setUseGradientOnly(false)
  }, [src])

  const overlayClass =
    overlay === 'strong'
      ? 'from-black/65 via-black/35 to-black/15'
      : overlay === 'light'
        ? 'from-black/35 via-black/10 to-transparent'
        : 'from-black/50 via-black/15 to-transparent'

  const handleError = () => {
    if (currentSrc.includes('picsum.photos')) {
      setUseGradientOnly(true)
      return
    }
    setCurrentSrc(picsumFallback(fallbackSeed))
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!useGradientOnly ? (
        <img
          src={currentSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          sizes={sizes}
          onError={handleError}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${imageGradient}`}
          aria-hidden
        />
      )}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlayClass}`}
        aria-hidden
      />
    </div>
  )
}
