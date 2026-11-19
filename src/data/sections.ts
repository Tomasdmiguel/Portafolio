import { hasAboutContent } from '../lib/validateContent.ts'
import type { Section } from '../types/content.ts'
import { about } from './about.ts'

/**
 * Registro de secciones para la navegación, en el orden de la página. Cada feature nueva agrega
 * su entrada; `hasContent` se calcula desde la data para que sección y link aparezcan juntos.
 */
export const sections: readonly Section[] = [
  { id: 'inicio', label: 'Inicio', hasContent: true },
  { id: 'sobre-mi', label: 'Sobre mí', hasContent: hasAboutContent(about) },
]
