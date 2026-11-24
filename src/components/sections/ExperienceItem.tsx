import { formatMonth } from '../../lib/validateContent.ts'
import type { Experience } from '../../types/content.ts'
import { Tag } from '../ui/Tag.tsx'

interface ExperienceItemProps {
  item: Experience
  currentLabel: string
  presentLabel: string
  techLabel: string
}

/**
 * Una experiencia sobre la línea de tiempo (R4, R5). DOM: encabezado → período → detalle; desde
 * md:, el período va a la izquierda sin cambiar el orden de lectura.
 */
export function ExperienceItem({ item, currentLabel, presentLabel, techLabel }: ExperienceItemProps) {
  const isCurrent = item.end === undefined

  return (
    <article className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-x-12 md:gap-y-4">
      {/* Marcador píxel sobre la línea de puntos (el <li> es el contenedor posicionado). */}
      <span
        aria-hidden="true"
        className={`absolute top-1.5 left-0 size-3 ${isCurrent ? 'bg-accent' : 'bg-border'}`}
      />

      <header className="flex flex-col gap-1 motion-safe:reveal md:col-span-2 md:col-start-2 md:row-start-1">
        <h3 className="text-xl font-medium text-fg md:text-2xl">{item.role}</h3>
        <p className="text-base text-muted">
          {item.company}
          {item.industry && item.industry.trim() !== '' && <> · {item.industry}</>}
        </p>
      </header>

      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-muted motion-safe:reveal md:col-start-1 md:row-span-2 md:row-start-1 md:flex-col md:items-start md:gap-y-2">
        <span>
          <time dateTime={item.start}>{formatMonth(item.start)}</time>
          {' – '}
          {item.end ? <time dateTime={item.end}>{formatMonth(item.end)}</time> : presentLabel}
        </span>
        <span>{item.modality}</span>
        {isCurrent && <span className="text-xs tracking-wide text-accent uppercase">{currentLabel}</span>}
      </p>

      <div className="flex max-w-prose flex-col gap-5 md:col-span-2 md:col-start-2 md:row-start-2">
        {item.summary && item.summary.trim() !== '' && (
          <p className="text-base text-pretty text-fg motion-safe:reveal md:text-lg">{item.summary}</p>
        )}

        {item.highlights.length > 0 && (
          <ul className="flex flex-col gap-3">
            {item.highlights.map((highlight) => (
              <li key={highlight.text} className="flex gap-3 text-base text-pretty text-fg motion-safe:reveal">
                <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-accent" />
                <span>
                  {highlight.lead && <strong className="font-medium text-accent">{highlight.lead}</strong>}{' '}
                  {highlight.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {item.tech.length > 0 && (
          <ul aria-label={techLabel} className="flex flex-wrap gap-2 motion-safe:reveal">
            {item.tech.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
