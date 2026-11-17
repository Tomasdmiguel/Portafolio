// Sin imports de assets: lo lee scripts/check-links.ts en Node.
import type { ContactLink } from '../types/content.ts'

export const contactLinks: readonly ContactLink[] = [
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    ariaLabel: 'LinkedIn de Tomás De Miguel',
    href: 'https://www.linkedin.com/in/tomasdmiguel/',
  },
  {
    kind: 'github',
    label: 'GitHub',
    ariaLabel: 'GitHub de Tomás De Miguel',
    href: 'https://github.com/Tomasdmiguel',
  },
  {
    kind: 'email',
    label: 'Email',
    ariaLabel: 'Enviar email a Tomás De Miguel',
    href: 'mailto:dev.tomasdmiguel@gmail.com',
  },
]
