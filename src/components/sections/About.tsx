import { getValidFacts, getValidParagraphs, hasAboutContent } from '../../lib/validateContent.ts'
import type { About as AboutContent } from '../../types/content.ts'
import { SectionTitle } from '../ui/SectionTitle.tsx'

interface AboutProps {
  about: AboutContent
}

export function About({ about }: AboutProps) {
  // Sin párrafos con texto, la sección no se muestra (FR-006).
  if (!hasAboutContent(about)) return null

  const paragraphs = getValidParagraphs(about)
  const facts = getValidFacts(about)

  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-center gap-8 px-4 py-16 md:px-8 short:py-8"
    >
      <SectionTitle id="sobre-mi-title" file={about.file}>{about.title}</SectionTitle>

      {/* DOM: datos y después párrafos (resumen primero). Desde md:, los datos van a la derecha (R4). */}
      <div className="flex flex-col gap-10 md:grid md:grid-cols-3 md:gap-12">
        {facts.length > 0 && (
          <dl className="flex flex-col gap-5 motion-safe:reveal md:col-start-3 md:row-start-1">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1 border-l border-border pl-4">
                <dt className="font-mono text-xs tracking-wide text-muted uppercase">{fact.label}</dt>
                <dd className="text-base text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="flex max-w-prose flex-col gap-5 text-base text-pretty text-fg md:col-span-2 md:row-start-1 md:text-lg">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="motion-safe:reveal">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
