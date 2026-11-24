import type { ReactNode } from 'react'

interface CardProps {
  title: string
  /** Clases extra del contenedor (ej. `md:col-span-2`). */
  className?: string
  children: ReactNode
}

/** Tarjeta con título h3 en Geist Mono y marcador píxel, mismo estilo que las de "Stack" (005 R2). */
export function Card({ title, className = '', children }: CardProps) {
  return (
    <div className={`flex flex-col gap-4 border border-border bg-surface p-5 motion-safe:reveal ${className}`}>
      <h3 className="flex items-center gap-2 font-mono text-sm tracking-wide text-fg uppercase">
        <span aria-hidden="true" className="size-2 shrink-0 bg-border" />
        {title}
      </h3>
      {children}
    </div>
  )
}
