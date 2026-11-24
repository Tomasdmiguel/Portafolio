import { formatMonth } from '../../lib/validateContent.ts'
import type { Certification } from '../../types/content.ts'

interface ItemsProps {
  items: readonly Certification[]
  newTabHint: string
}

export const CERTIFICATION_LINK_CLASS =
  'inline-flex min-h-11 items-center text-base text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent'

/** Lista de certificaciones con link de verificación (pestaña nueva) y fecha. */
export function CertificationItems({ items, newTabHint }: ItemsProps) {
  return (
    <ul className="flex flex-col">
      {items.map((item) => (
        <li key={item.url} className="flex flex-wrap items-center justify-between gap-x-4">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className={CERTIFICATION_LINK_CLASS}>
            {item.title}
            <span className="sr-only"> {newTabHint}</span>
          </a>
          <time dateTime={item.date} className="font-mono text-xs text-muted">
            {formatMonth(item.date)}
          </time>
        </li>
      ))}
    </ul>
  )
}
