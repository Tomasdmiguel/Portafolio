import type { ReactNode } from 'react'

interface ButtonProps {
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
  ariaLabel?: string
  children: ReactNode
}

const base =
  'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-medium transition-colors'

const variants = {
  primary: 'bg-accent text-accent-fg hover:bg-fg',
  secondary: 'border border-border text-fg hover:border-accent hover:text-accent',
} as const

export function Button({ href, variant, external = false, ariaLabel, children }: ButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
