import type { StackContent } from '../types/content.ts'

/** Contenido de "Stack" (spec 004, Assumptions; del CV, sin marcas de IA). Para editar la sección, se cambia solo este archivo. */
export const stack: StackContent = {
  title: 'Stack',
  groups: [
    {
      name: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'Diseño responsive'],
    },
    { name: 'Estado y datos', items: ['Redux', 'Zustand', 'Context API', 'TanStack Query', 'APIs REST'] },
    { name: 'Formularios y validación', items: ['React Hook Form', 'Zod', 'Yup'] },
    {
      name: 'IA aplicada',
      featured: true,
      items: ['AI-Driven Development', 'Spec-Driven Development', 'Desarrollo agéntico'],
    },
    { name: 'Herramientas', items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Figma', 'Jira', 'Scrum'] },
    { name: 'Backend', note: 'Conocimientos', items: ['Node.js', 'Express', 'NestJS', 'Supabase', 'PostgreSQL'] },
  ],
}
