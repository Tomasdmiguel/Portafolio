import type { ContactLink } from '../../types/content.ts'

interface ContactLinksProps {
  links: readonly ContactLink[]
}

export function ContactLinks({ links }: ContactLinksProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {links.map((link) => (
        <li key={link.kind}>
          <a
            href={link.href}
            aria-label={link.ariaLabel}
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border-strong bg-surface px-4 text-sm text-fg shadow-hard transition-colors hover:border-accent hover:text-accent motion-safe:press"
            {...(link.kind !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
