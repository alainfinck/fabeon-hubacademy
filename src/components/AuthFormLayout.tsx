import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { BrandLogo } from './BrandLogo'

interface Props {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthFormLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-8 group">
          <BrandLogo size="xl" />
        </Link>

        <div className="rounded-2xl card-base border p-8 shadow-lg dark:shadow-xl">
          <h1 className="font-display text-2xl font-bold text-heading text-center">{title}</h1>
          <p className="text-sm text-muted text-center mt-2 mb-8">{subtitle}</p>
          {children}
        </div>

        <p className="text-center text-sm text-muted mt-6">{footer}</p>
      </div>
    </div>
  )
}
