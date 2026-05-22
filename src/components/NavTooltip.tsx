import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  title: string
  description: string
  side?: 'bottom' | 'top'
}

export function NavTooltip({
  children,
  title,
  description,
  side = 'bottom',
}: Props) {
  const position =
    side === 'bottom'
      ? 'top-full left-1/2 -translate-x-1/2 mt-2'
      : 'bottom-full left-1/2 -translate-x-1/2 mb-2'

  const arrow =
    side === 'bottom'
      ? 'bottom-full left-1/2 -translate-x-1/2 border-b-white dark:border-b-slate-950 border-x-transparent border-t-transparent'
      : 'top-full left-1/2 -translate-x-1/2 border-t-white dark:border-t-slate-950 border-x-transparent border-b-transparent'

  return (
    <div className="group/nav-tip relative flex items-center">
      {children}
      <div
        role="tooltip"
        className={`nav-tooltip-panel nav-tooltip-compact ${position} pointer-events-none absolute z-[100] opacity-0 invisible translate-y-1 group-hover/nav-tip:opacity-100 group-hover/nav-tip:visible group-hover/nav-tip:translate-y-0 group-focus-within/nav-tip:opacity-100 group-focus-within/nav-tip:visible transition-all duration-200 ease-out`}
      >
        <span className={`absolute ${arrow} border-[5px]`} aria-hidden />
        <div className="rounded-lg border border-theme bg-white dark:bg-slate-950 shadow-lg px-4 py-2.5">
          <p className="font-semibold text-heading text-sm leading-snug">{title}</p>
          <p className="text-muted text-sm leading-snug mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}
