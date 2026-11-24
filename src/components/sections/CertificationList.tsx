import { formatMonth, getValidCertificationGroups } from '../../lib/validateContent.ts'
import type { CertificationsContent } from '../../types/content.ts'
import { Card } from '../ui/Card.tsx'

interface CertificationListProps {
  certifications: CertificationsContent
}

/** Tarjeta "Certificaciones" agrupada por categoría (R3). Sin ítems válidos, no se muestra. */
export function CertificationList({ certifications }: CertificationListProps) {
  const groups = getValidCertificationGroups(certifications)
  if (groups.length === 0) return null

  return (
    <Card title={certifications.label} className="md:col-span-2">
      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.category} className="flex flex-col gap-2">
            <h4 className="font-mono text-xs tracking-wide text-muted uppercase">{group.label}</h4>
            <ul className="flex flex-col">
              {group.items.map((item) => (
                <li key={item.url} className="flex flex-wrap items-center justify-between gap-x-4">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-base text-fg underline decoration-border underline-offset-4 transition-colors hover:text-accent"
                  >
                    {item.title}
                    <span className="sr-only"> {certifications.newTabHint}</span>
                  </a>
                  <time dateTime={item.date} className="font-mono text-xs text-muted">
                    {formatMonth(item.date)}
                  </time>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Card>
  )
}
