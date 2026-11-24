import type { EducationContent } from '../types/content.ts'

/** Contenido de "Formación" (spec 005, Assumptions; del CV). Las certificaciones van en `certifications.ts`. */
export const education: EducationContent = {
  title: 'Formación',
  degreesLabel: 'Título',
  languagesLabel: 'Idiomas',
  presentLabel: 'En curso',
  degrees: [
    {
      title: 'Técnico Superior en Programación',
      institution: 'E.E.S.T. N.º 2 "Felipe Senillosa"',
      location: 'Tandil',
      start: 2015,
      end: 2022,
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Básico', detail: 'Lectura de documentación técnica' },
  ],
}
