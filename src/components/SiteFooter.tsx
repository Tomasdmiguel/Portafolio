interface SiteFooterProps {
  copyright: string
}

/** Pie chico: el recorrido de scroll del Hero lo da "Sobre mí" con `min-h-svh` (002 R3). */
export function SiteFooter({ copyright }: SiteFooterProps) {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
      <p className="text-xs text-muted">{copyright}</p>
    </footer>
  )
}
