import type { ReactNode } from 'react'

interface KeycapProps {
  children: ReactNode
  /** Rotación, color o posición (ej. `rotate-6`). */
  className?: string
}

/** Tecla decorativa con sombra dura (008 R5). Quien la usa la oculta a lectores de pantalla. */
export function Keycap({ children, className = '' }: KeycapProps) {
  return (
    <span
      className={`inline-flex h-14 min-w-14 items-center justify-center border-2 border-border-strong bg-surface p-1 font-mono text-lg shadow-hard ${className}`}
    >
      <span className="flex size-full items-center justify-center border border-border px-3">
        {children}
      </span>
    </span>
  )
}
