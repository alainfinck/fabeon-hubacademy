import type { Partner } from '../data/partners'
import { si3m, siEpson, siFujifilm, siHp } from 'simple-icons'

const simpleIconMap = {
  epson: siEpson,
  hp: siHp,
  fujifilm: siFujifilm,
  '3m': si3m,
} as const

interface Props {
  partner: Partner
  className?: string
}

function SimpleIconSvg({
  path,
  title,
  hex,
}: {
  path: string
  title: string
  hex: string
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label={title}
    >
      <path d={path} fill={`#${hex}`} />
    </svg>
  )
}

function WordmarkSvg({ name, color }: { name: string; color: string }) {
  const display = name === 'Avery Dennison' ? 'AVERY' : name.toUpperCase()
  const fontSize = display.length > 10 ? 11 : display.length > 7 ? 13 : 15

  return (
    <svg
      viewBox="0 0 140 32"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      <text
        x="70"
        y="22"
        textAnchor="middle"
        fill={color}
        fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
        fontWeight="700"
        fontSize={fontSize}
        letterSpacing={display.length > 8 ? '0.02em' : '0.04em'}
      >
        {display}
      </text>
    </svg>
  )
}

/** Logos Zünd et Caldera — wordmarks stylisés proches de l’identité marque */
function ZundLogo() {
  return (
    <svg viewBox="0 0 100 32" className="w-full h-full" aria-label="Zünd">
      <text
        x="50"
        y="23"
        textAnchor="middle"
        fill="#00843D"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="-0.02em"
      >
        ZÜND
      </text>
    </svg>
  )
}

function CalderaLogo() {
  return (
    <svg viewBox="0 0 120 32" className="w-full h-full" aria-label="Caldera">
      <text
        x="60"
        y="22"
        textAnchor="middle"
        fill="#D92228"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="0.12em"
      >
        CALDERA
      </text>
    </svg>
  )
}

function MimakiLogo() {
  return (
    <svg viewBox="0 0 110 32" className="w-full h-full" aria-label="Mimaki">
      <text
        x="55"
        y="23"
        textAnchor="middle"
        fill="#E60012"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="20"
        fontStyle="italic"
      >
        Mimaki
      </text>
    </svg>
  )
}

function OnyxLogo() {
  return (
    <svg viewBox="0 0 90 32" className="w-full h-full text-slate-800 dark:text-slate-200" aria-label="Onyx">
      <text
        x="45"
        y="23"
        textAnchor="middle"
        fill="currentColor"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="22"
        letterSpacing="0.08em"
      >
        ONYX
      </text>
    </svg>
  )
}

export function PartnerLogo({ partner, className = '' }: Props) {
  const boxClass = `flex items-center justify-center h-10 sm:h-12 w-full px-2 ${className}`

  if (partner.logoSrc) {
    return (
      <div className={boxClass}>
        <img
          src={partner.logoSrc}
          alt={partner.name}
          className="max-h-8 sm:max-h-10 w-auto max-w-[6.5rem] object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    )
  }

  if (partner.id === 'zund') {
    return (
      <div className={boxClass}>
        <ZundLogo />
      </div>
    )
  }
  if (partner.id === 'caldera') {
    return (
      <div className={boxClass}>
        <CalderaLogo />
      </div>
    )
  }
  if (partner.id === 'mimaki') {
    return (
      <div className={boxClass}>
        <MimakiLogo />
      </div>
    )
  }
  if (partner.id === 'onyx') {
    return (
      <div className={boxClass}>
        <OnyxLogo />
      </div>
    )
  }

  if (partner.iconSlug && partner.iconSlug in simpleIconMap) {
    const icon = simpleIconMap[partner.iconSlug]
    return (
      <div className={boxClass}>
        <div className="h-8 sm:h-10 w-auto max-w-[5.5rem]">
          <SimpleIconSvg path={icon.path} title={icon.title} hex={icon.hex} />
        </div>
      </div>
    )
  }

  return (
    <div className={boxClass}>
      <div className="h-8 sm:h-10 w-full max-w-[7rem]">
        <WordmarkSvg name={partner.name} color={partner.brandColor} />
      </div>
    </div>
  )
}
