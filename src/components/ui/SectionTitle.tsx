import type { ReactNode } from 'react'

interface SectionTitleProps {
  /** Lo usa la sección en `aria-labelledby`. */
  id: string
  children: ReactNode
}

/** Título de sección (h2) con la identidad pixel: Geist Pixel y acento ámbar; se "arma" en puntos al entrar (FR-009, FR-010, FR-015). */
export function SectionTitle({ id, children }: SectionTitleProps) {
  return (
    <h2 id={id} className="font-pixel text-4xl text-accent motion-safe:dot-assemble md:text-5xl">
      {children}
    </h2>
  )
}
