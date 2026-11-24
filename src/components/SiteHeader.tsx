import type { NavLabels, Section } from '../types/content.ts'

interface SiteHeaderProps {
  brand: string
  sections: readonly Section[]
  labels: NavLabels
}

const NAV_ID = 'site-nav'

/** Al navegar desde el menú móvil, se cierra (en md: no está abierto y no hace nada). */
function closeMenu() {
  const nav = document.getElementById(NAV_ID)
  if (nav?.matches(':popover-open')) nav.hidePopover()
}

export function SiteHeader({ brand, sections, labels }: SiteHeaderProps) {
  // Todas las secciones con contenido, incluida "Inicio"; con una sola no hace falta navegar (002 R2).
  const navItems = sections.filter((section) => section.hasContent)
  const showNav = navItems.length >= 2

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 h-15 px-4 md:px-8">
      <a
        href="#inicio"
        className="inline-flex min-h-11 items-center text-sm font-medium text-fg transition-colors hover:text-accent"
      >
        {brand}
      </a>
      {showNav && (
        <>
          {/* < md: menú compacto con popover nativo (003 R1). */}
          <button
            type="button"
            popoverTarget={NAV_ID}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border px-3 text-sm text-fg transition-colors hover:text-accent md:hidden"
          >
            {labels.menu}
          </button>
          {/* md:: se anulan los estilos del navegador para el popover cerrado y la lista va en línea. */}
          <nav
            id={NAV_ID}
            popover="auto"
            aria-label={labels.nav}
            className="inset-auto top-15 right-4 m-0 border border-border bg-surface p-2 text-fg md:static md:block md:border-0 md:bg-transparent md:p-0"
          >
            <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-1">
              {navItems.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={closeMenu}
                    className="inline-flex min-h-11 w-full items-center px-3 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </>
      )}
    </header>
  )
}
