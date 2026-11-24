import { useEffect, useState } from 'react'
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

/** Id de la sección que cruza el centro de la pantalla (008 R6). Sin IntersectionObserver, `null`. */
function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const id of key.split(',')) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [key])

  return active
}

export function SiteHeader({ brand, sections, labels }: SiteHeaderProps) {
  // Todas las secciones con contenido, incluida "Inicio"; con una sola no hace falta navegar (002 R2).
  const navItems = sections.filter((section) => section.hasContent)
  const showNav = navItems.length >= 2
  const active = useActiveSection(navItems.map((section) => section.id))

  return (
    // Fijo arriba con fondo translúcido (008 R6); el Hero ya descuenta su alto (hero-screen).
    <div className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-sm">
      <header className="mx-auto flex h-15 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
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
              className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border-strong bg-surface px-3 text-sm text-fg shadow-hard transition-colors hover:text-accent md:hidden"
            >
              {labels.menu}
            </button>
            {/* md:: se anulan los estilos del navegador para el popover cerrado y la lista va en línea. */}
            <nav
              id={NAV_ID}
              popover="auto"
              aria-label={labels.nav}
              className="inset-auto top-15 right-4 m-0 border border-border-strong bg-surface p-2 text-fg shadow-hard md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none"
            >
              <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-1">
                {navItems.map((section) => {
                  const isActive = section.id === active
                  return (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={closeMenu}
                        aria-current={isActive ? 'true' : undefined}
                        className={`inline-flex min-h-11 w-full items-center px-3 text-sm transition-colors hover:text-accent ${isActive ? 'text-accent' : 'text-muted'}`}
                      >
                        {section.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </>
        )}
      </header>
    </div>
  )
}
