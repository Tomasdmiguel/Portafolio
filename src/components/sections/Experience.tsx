import { getValidExperiences, hasExperienceContent } from '../../lib/validateContent.ts'
import type { ExperienceContent } from '../../types/content.ts'
import { SectionTitle } from '../ui/SectionTitle.tsx'
import { ExperienceItem } from './ExperienceItem.tsx'

interface ExperienceProps {
  experience: ExperienceContent
}

export function Experience({ experience }: ExperienceProps) {
  // Sin experiencias válidas, la sección no se muestra (FR-007).
  if (!hasExperienceContent(experience)) return null

  const items = getValidExperiences(experience)

  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:px-8"
    >
      <SectionTitle id="experiencia-title">{experience.title}</SectionTitle>

      {/* Línea de tiempo: línea de puntos decorativa que se dibuja al scrollear (R4). */}
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-y-0 left-0 w-3 dot-line motion-safe:timeline-draw" />
        <ol className="flex flex-col gap-16">
          {items.map((item) => (
            <li key={`${item.company}-${item.start}`} className="relative pl-8 md:pl-12">
              <ExperienceItem
                item={item}
                currentLabel={experience.currentLabel}
                presentLabel={experience.presentLabel}
                techLabel={experience.techLabel}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
