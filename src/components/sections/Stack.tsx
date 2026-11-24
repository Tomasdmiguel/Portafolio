import { getValidStackGroups, hasStackContent } from '../../lib/validateContent.ts'
import type { StackContent } from '../../types/content.ts'
import { SectionTitle } from '../ui/SectionTitle.tsx'
import { Tag } from '../ui/Tag.tsx'

interface StackProps {
  stack: StackContent
}

export function Stack({ stack }: StackProps) {
  // Sin categorías válidas, la sección no se muestra (FR-006).
  if (!hasStackContent(stack)) return null

  const groups = getValidStackGroups(stack)

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:px-8"
    >
      <SectionTitle id="stack-title">{stack.title}</SectionTitle>

      {/* Grilla de tarjetas: 1 / 2 / 3 columnas (R1). La destacada va en ámbar (R2). */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => {
          const headingId = `stack-group-${i}`
          return (
            <li
              key={group.name}
              className={`flex flex-col gap-4 border bg-surface p-5 motion-safe:reveal ${group.featured ? 'border-accent' : 'border-border'}`}
            >
              <div className="flex flex-col gap-1">
                <h3
                  id={headingId}
                  className={`flex items-center gap-2 font-mono text-sm tracking-wide uppercase ${group.featured ? 'text-accent' : 'text-fg'}`}
                >
                  <span aria-hidden="true" className={`size-2 shrink-0 ${group.featured ? 'bg-accent' : 'bg-border'}`} />
                  {group.name}
                </h3>
                {group.note && group.note.trim() !== '' && <p className="text-xs text-muted">{group.note}</p>}
              </div>

              {/* El nombre accesible de la lista es el h3 (R3): sin texto en el componente. */}
              <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
