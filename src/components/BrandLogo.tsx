import { FABEON_LOGO_ALT, FABEON_LOGO_SRC } from '../data/brand'

const heights = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
  xl: 'h-16',
} as const

interface BrandLogoProps {
  size?: keyof typeof heights
  className?: string
}

export function BrandLogo({ size = 'md', className = '' }: BrandLogoProps) {
  return (
    <img
      src={FABEON_LOGO_SRC}
      alt={FABEON_LOGO_ALT}
      width={300}
      height={182}
      decoding="async"
      className={`w-auto max-w-full object-contain ${heights[size]} ${className}`.trim()}
    />
  )
}
