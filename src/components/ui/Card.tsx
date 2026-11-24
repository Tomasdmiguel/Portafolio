import type { ReactNode } from 'react'
import { WindowControls } from './WindowControls.tsx'

interface CardProps {
  title: string
  /** Id del h3, para nombrar listas con `aria-labelledby`. */
  headingId?: string
  /** Destacada: borde, sombra y título en ámbar. */
  featured?: boolean
  /** Clases extra del contenedor (ej. `md:col-span-2`). */
  className?: string
  children: ReactNode
}

/** Tarjeta como ventana retro: barra de título con h3 y controles decorativos, sombra dura (008 R3). */
export function Card({ title, headingId, featured = false, className = '', children }: CardProps) {
  const borderColor = featured ? 'border-accent' : 'border-border-strong'
  const shadow = featured ? 'shadow-hard-accent' : 'shadow-hard'
  const titleColor = featured ? 'text-accent' : 'text-fg'

  return (
    <div className={`flex flex-col border bg-surface motion-safe:reveal ${borderColor} ${shadow} ${className}`}>
      <div className={`flex items-center justify-between gap-3 border-b px-4 py-2 ${borderColor}`}>
        <h3
          id={headingId}
          className={`flex items-center gap-2 font-mono text-sm tracking-wide uppercase ${titleColor}`}
        >
          <span aria-hidden="true" className={`size-2 shrink-0 ${featured ? 'bg-accent' : 'bg-border-strong'}`} />
          {title}
        </h3>
        <WindowControls />
      </div>
      <div className="flex flex-col gap-4 p-5">{children}</div>
    </div>
  )
}
