import { useEffect, useRef, useState } from 'react'

interface CopyButtonProps {
  value: string
  label: string
  copiedLabel: string
}

const CONFIRM_MS = 2000

/**
 * Copia `value` al portapapeles (007 R2). Sin portapapeles disponible no se muestra; si la copia
 * falla, no confirma. Ancho mínimo fijo para que el cambio de texto no mueva el layout.
 */
export function CopyButton({ value, label, copiedLabel }: CopyButtonProps) {
  // SPA sin SSR: el soporte se conoce al montar.
  const [supported] = useState(
    () => typeof navigator !== 'undefined' && typeof navigator.clipboard?.writeText === 'function',
  )
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  if (!supported) return null

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), CONFIRM_MS)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-11 min-w-40 items-center justify-center border border-border-strong bg-surface px-5 text-sm font-medium text-fg shadow-hard transition-colors hover:border-accent hover:text-accent motion-safe:press"
    >
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}
