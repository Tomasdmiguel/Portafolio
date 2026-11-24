import type { ReactNode } from 'react'

interface SectionTitleProps {
  /** Lo usa la sección en `aria-labelledby`. */
  id: string
  /** Etiqueta decorativa tipo archivo (ej. `sobre-mi.md`), oculta a lectores (008 R4). */
  file?: string
  children: ReactNode
}

/** Título de sección (h2) con la identidad pixel: Geist Pixel y acento ámbar; se "arma" en puntos al entrar (FR-009, FR-010, FR-015). */
export function SectionTitle({ id, file, children }: SectionTitleProps) {
  return (
    <div className="flex flex-col items-start gap-3">
      {file && file.trim() !== '' && (
        <span aria-hidden="true" className="-rotate-2 bg-accent px-2 py-0.5 font-mono text-xs text-accent-fg">
          {file}
        </span>
      )}
      <h2 id={id} className="font-pixel text-4xl text-accent motion-safe:dot-assemble md:text-5xl">
        {children}
      </h2>
    </div>
  )
}
