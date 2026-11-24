import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

/** Etiqueta técnica (tecnologías): Geist Mono con borde. La reusa Stack (003 R6). */
export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex border border-border px-2 py-1 font-mono text-xs text-muted">{children}</span>
  )
}
