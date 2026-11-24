import { getEmailAddress, getValidContactLinks, isValidResumeHref } from '../../lib/validateContent.ts'
import type { ContactContent, ContactLink, Resume } from '../../types/content.ts'
import { Button } from '../ui/Button.tsx'
import { ContactLinks } from '../ui/ContactLinks.tsx'
import { CopyButton } from '../ui/CopyButton.tsx'
import { SectionTitle } from '../ui/SectionTitle.tsx'

interface ContactProps {
  contact: ContactContent
  /** Los mismos links del Hero (una sola fuente, FR-005). */
  links: readonly ContactLink[]
  cv: Resume
}

export function Contact({ contact, links, cv }: ContactProps) {
  const validLinks = getValidContactLinks(links)
  const email = getEmailAddress(links)
  const showCv = isValidResumeHref(cv.href)
  // Sin ningún medio de contacto válido, la sección no se muestra (FR-006).
  if (validLinks.length === 0 && !showCv) return null

  // El email va destacado arriba; en la fila de links quedan los demás (R3).
  const otherLinks = validLinks.filter((link) => link.kind !== 'email')

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-title"
      className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-24 md:px-8"
    >
      <SectionTitle id="contacto-title">{contact.title}</SectionTitle>

      <div className="flex flex-col gap-4 motion-safe:reveal">
        <p className="text-4xl font-medium text-balance text-fg md:text-6xl">{contact.heading}</p>
        <p className="max-w-prose text-base text-pretty text-muted md:text-lg">{contact.message}</p>
      </div>

      {email && (
        <div className="flex flex-wrap items-center gap-4 motion-safe:reveal">
          <a
            href={`mailto:${email}`}
            className="inline-flex min-h-11 items-center font-mono text-xl break-all text-accent underline decoration-border underline-offset-8 transition-colors hover:decoration-accent md:text-3xl"
          >
            {email}
          </a>
          <CopyButton value={email} label={contact.copyLabel} copiedLabel={contact.copiedLabel} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 motion-safe:reveal">
        <ContactLinks links={otherLinks} />
        {showCv && (
          <Button href={cv.href} variant="primary" external ariaLabel={cv.ariaLabel}>
            {cv.label}
          </Button>
        )}
      </div>
    </section>
  )
}
