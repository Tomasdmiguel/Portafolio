import type { Section } from '../types/content.ts'

interface SiteHeaderProps {
  brand: string
  sections: readonly Section[]
}

export function SiteHeader({ brand, sections }: SiteHeaderProps) {
  // El Hero ya es la marca: la navegación solo lista las demás secciones con contenido.
  const navItems = sections.filter((section) => section.hasContent && section.id !== 'inicio')

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-8">
      <a
        href="#inicio"
        className="inline-flex min-h-11 items-center text-sm font-medium text-fg transition-colors hover:text-accent"
      >
        {brand}
      </a>
      {navItems.length > 0 && (
        <nav aria-label="Secciones">
          <ul className="flex flex-wrap gap-1">
            {navItems.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="inline-flex min-h-11 items-center px-3 text-sm text-muted transition-colors hover:text-accent"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
