import { hasEducationContent, isValidDegree, isValidLanguage } from '../../lib/validateContent.ts'
import type { CertificationsContent, EducationContent } from '../../types/content.ts'
import { Card } from '../ui/Card.tsx'
import { SectionTitle } from '../ui/SectionTitle.tsx'
import { CertificationList } from './CertificationList.tsx'

interface EducationProps {
  education: EducationContent
  certifications: CertificationsContent
}

export function Education({ education, certifications }: EducationProps) {
  // Sin títulos, idiomas ni certificaciones válidos, la sección no se muestra (FR-008).
  if (!hasEducationContent(education, certifications)) return null

  const degrees = education.degrees.filter(isValidDegree)
  const languages = education.languages.filter(isValidLanguage)

  return (
    <section
      id="formacion"
      aria-labelledby="formacion-title"
      className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:px-8"
    >
      <SectionTitle id="formacion-title">{education.title}</SectionTitle>

      <div className="grid gap-4 md:grid-cols-2">
        {degrees.length > 0 && (
          <Card title={education.degreesLabel}>
            {degrees.map((degree) => (
              <div key={`${degree.title}-${degree.start}`} className="flex flex-col gap-1">
                <p className="text-lg text-fg">{degree.title}</p>
                <p className="text-base text-muted">
                  {degree.institution}
                  {degree.location && degree.location.trim() !== '' && <> · {degree.location}</>}
                </p>
                <p className="font-mono text-sm text-muted">
                  {degree.start} – {degree.end ?? education.presentLabel}
                </p>
              </div>
            ))}
          </Card>
        )}

        {languages.length > 0 && (
          <Card title={education.languagesLabel}>
            <dl className="flex flex-col gap-4">
              {languages.map((language) => (
                <div key={language.name} className="flex flex-col gap-1">
                  <dt className="text-lg text-fg">{language.name}</dt>
                  <dd className="text-base text-muted">{language.level}</dd>
                  {language.detail && language.detail.trim() !== '' && (
                    <dd className="text-xs text-muted">{language.detail}</dd>
                  )}
                </div>
              ))}
            </dl>
          </Card>
        )}

        <CertificationList certifications={certifications} />
      </div>
    </section>
  )
}
