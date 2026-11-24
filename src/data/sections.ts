import { hasAboutContent, hasEducationContent, hasExperienceContent, hasStackContent } from '../lib/validateContent.ts'
import type { NavLabels, Section } from '../types/content.ts'
import { about } from './about.ts'
import { certifications } from './certifications.ts'
import { education } from './education.ts'
import { experience } from './experience.ts'
import { stack } from './stack.ts'

/**
 * Registro de secciones para la navegación, en el orden de la página. Cada feature nueva agrega
 * su entrada; `hasContent` se calcula desde la data para que sección y link aparezcan juntos.
 */
export const sections: readonly Section[] = [
  { id: 'inicio', label: 'Inicio', hasContent: true },
  { id: 'sobre-mi', label: 'Sobre mí', hasContent: hasAboutContent(about) },
  { id: 'experiencia', label: 'Experiencia', hasContent: hasExperienceContent(experience) },
  { id: 'stack', label: 'Stack', hasContent: hasStackContent(stack) },
  {
    id: 'formacion',
    label: 'Formación',
    hasContent: hasEducationContent(education, certifications),
  },
]

/** Textos de la navegación del header (Principio II: sin texto en el componente). */
export const navLabels: NavLabels = { nav: 'Secciones', menu: 'Menú' }
