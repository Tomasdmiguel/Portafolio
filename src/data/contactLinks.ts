// Sin imports de assets: lo lee scripts/check-links.ts en Node.
import type { ContactContent, ContactLink } from '../types/content.ts'

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

/** Textos de "Contacto" (spec 007, Assumptions). Los links son los de arriba; el CV, el del perfil. */
export const contact: ContactContent = {
  title: 'Contacto',
  file: 'contacto.sh',
  heading: '¿Hablamos?',
  message:
    'Estoy disponible para trabajo remoto y busco crecer como Software Engineer en equipos de afuera. Si tenés una propuesta, escribime.',
  copyLabel: 'Copiar email',
  copiedLabel: 'Email copiado',
  keycap: 'Enter ↵',
}
