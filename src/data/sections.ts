import type { Section } from '../types/content.ts'

/** Registro de secciones para la navegación. Cada feature nueva agrega su entrada. */
export const sections: readonly Section[] = [
  { id: 'inicio', label: 'Inicio', hasContent: true },
]
