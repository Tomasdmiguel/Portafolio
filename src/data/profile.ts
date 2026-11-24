import type { Profile } from '../types/content.ts'
import { contactLinks } from './contactLinks.ts'

export const profile: Profile = {
  name: 'Tomás De Miguel',
  role: 'Frontend Developer Semi Senior | AI-Driven Development',
  stack: ['React', 'TypeScript', 'Next.js'],
  location: 'Tandil, Argentina',
  availability: 'Disponible para trabajo remoto',
  contactLinks,
  keycaps: ['</>', '{ }', 'AI'],
  cv: {
    label: 'Ver CV',
    ariaLabel: 'Ver CV en PDF (se abre en una pestaña nueva)',
    href: '/cv/tomas-de-miguel-cv.pdf',
  },
  // Sin foto por ahora (2026-11-17): se suma acá cuando haya una imagen definitiva.
}
