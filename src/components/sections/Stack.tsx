import { getValidStackGroups, hasStackContent } from '../../lib/validateContent.ts'
import type { StackContent } from '../../types/content.ts'
import { Card } from '../ui/Card.tsx'
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
      <SectionTitle id="stack-title" file={stack.file}>{stack.title}</SectionTitle>

      {/* Grilla de tarjetas: 1 / 2 / 3 columnas (R1). La destacada va en ámbar (R2). */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, i) => {
          const headingId = `stack-group-${i}`
          return (
            <li key={group.name} className="flex">
              <Card title={group.name} headingId={headingId} featured={group.featured} className="w-full">
                {group.note && group.note.trim() !== '' && <p className="-mt-2 text-xs text-muted">{group.note}</p>}
                {/* El nombre accesible de la lista es el h3 (R3): sin texto en el componente. */}
                <ul aria-labelledby={headingId} className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
