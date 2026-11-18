interface SiteFooterProps {
  copyright: string
}

/** `min-h-svh` da recorrido de scroll al efecto del Hero mientras sea la única sección (research R5). */
export function SiteFooter({ copyright }: SiteFooterProps) {
  return (
    <footer className="mx-auto flex min-h-svh w-full max-w-6xl flex-col justify-end px-4 py-8 md:px-8">
      <p className="text-xs text-muted">{copyright}</p>
    </footer>
  )
}
