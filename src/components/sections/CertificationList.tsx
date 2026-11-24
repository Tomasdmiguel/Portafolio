import { getValidCertificationGroups, getValidCertifications } from '../../lib/validateContent.ts'
import type { CertificationsContent } from '../../types/content.ts'
import { Card } from '../ui/Card.tsx'
import { CERTIFICATION_LINK_CLASS, CertificationItems } from './CertificationItems.tsx'

interface CertificationListProps {
  certifications: CertificationsContent
}

/**
 * Tarjeta "Certificaciones" agrupada por categoría (R3). Por categoría, los `previewCount` más
 * recientes; el resto en un <details> nativo (spec 005, Clarifications). Sin ítems, no se muestra.
 */
export function CertificationList({ certifications }: CertificationListProps) {
  const groups = getValidCertificationGroups(certifications)
  if (groups.length === 0) return null

  const total = getValidCertifications(certifications).length
  const { previewCount, newTabHint, profile } = certifications

  return (
    <Card title={certifications.label} className="md:col-span-2">
      <p className="flex flex-wrap items-center gap-x-3 font-mono text-sm text-muted">
        <span>
          <span className="text-accent">{total}</span> {certifications.countLabel}
        </span>
        {profile && profile.label.trim() !== '' && (
          <a href={profile.url} target="_blank" rel="noopener noreferrer" className={CERTIFICATION_LINK_CLASS}>
            {profile.label}
            <span className="sr-only"> {newTabHint}</span>
          </a>
        )}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {groups.map((group) => {
          const preview = group.items.slice(0, previewCount)
          const rest = group.items.slice(previewCount)
          return (
            <div key={group.category} className="flex flex-col gap-2">
              <h4 className="font-mono text-xs tracking-wide text-muted uppercase">{group.label}</h4>
              <CertificationItems items={preview} newTabHint={newTabHint} />
              {rest.length > 0 && (
                <details className="group">
                  <summary className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-mono text-xs tracking-wide text-muted uppercase transition-colors hover:text-accent">
                    <span aria-hidden="true" className="size-1.5 bg-accent group-open:bg-border" />
                    {certifications.showAllLabel} {group.items.length}
                  </summary>
                  <CertificationItems items={rest} newTabHint={newTabHint} />
                </details>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
