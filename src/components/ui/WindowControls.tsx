/** Botones decorativos de ventana retro (minimizar, maximizar, cerrar). Ocultos a lectores (008 R3). */
export function WindowControls() {
  return (
    <span aria-hidden="true" className="flex shrink-0 gap-1">
      <svg viewBox="0 0 16 16" className="size-4 border border-border-strong text-muted">
        <path d="M4 11h8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 16 16" className="size-4 border border-border-strong text-muted">
        <rect x="4" y="4" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 16 16" className="size-4 border border-border-strong text-muted">
        <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </span>
  )
}
