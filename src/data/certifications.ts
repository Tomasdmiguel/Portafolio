// Sin imports de assets: lo lee scripts/check-links.ts en Node.
import type { CertificationsContent } from '../types/content.ts'

/**
 * Certificaciones (spec 005). Para agregar una, se suma un ítem a `items`; el bloque aparece solo:
 *   { title: 'Curso de …', category: 'frontend', date: '2025-03', url: 'https://platzi.com/p/…' }
 * Categorías: 'ai' | 'english' | 'frontend' | 'backend'.
 */
export const certifications: CertificationsContent = {
  label: 'Certificaciones',
  categoryLabels: { ai: 'IA', english: 'Inglés', frontend: 'Frontend', backend: 'Backend' },
  newTabHint: '(abre en una pestaña nueva)',
  previewCount: 5,
  countLabel: 'cursos aprobados',
  showAllLabel: 'Ver los',
  profile: { label: 'Ver perfil en Platzi', url: 'https://platzi.com/p/oteguit31/' },
  // Perfil público de Platzi (2026-11-24); los 32 cursos aprobados (spec 005, Clarifications).
  items: [
    {
      title: 'Curso de Codex',
      category: 'ai',
      date: '2026-07',
      url: 'https://platzi.com/p/oteguit31/curso/13333-course/diploma/detalle/',
    },
    {
      title: 'Curso de Claude Code',
      category: 'ai',
      date: '2026-05',
      url: 'https://platzi.com/p/oteguit31/curso/12284-course/diploma/detalle/',
    },
    {
      title: 'Curso de Inglés Básico A1: Fechas, Horas y Descripciones',
      category: 'english',
      date: '2026-10',
      url: 'https://platzi.com/p/oteguit31/curso/13082-course/diploma/detalle/',
    },
    {
      title: 'Curso de Inglés Básico A1: Verbos Comunes',
      category: 'english',
      date: '2026-10',
      url: 'https://platzi.com/p/oteguit31/curso/12016-course/diploma/detalle/',
    },
    {
      title: 'Curso de Inglés Básico A1: Presente Simple',
      category: 'english',
      date: '2026-10',
      url: 'https://platzi.com/p/oteguit31/curso/11945-course/diploma/detalle/',
    },
    {
      title: 'Curso de Inglés Básico A1: Verbo To Be',
      category: 'english',
      date: '2026-09',
      url: 'https://platzi.com/p/oteguit31/curso/11944-course/diploma/detalle/',
    },
    {
      title: 'Curso de Inglés Básico A1 para Principiantes',
      category: 'english',
      date: '2026-09',
      url: 'https://platzi.com/p/oteguit31/curso/10629-course/diploma/detalle/',
    },
    {
      title: 'Curso Gratis de Estrategias para Aprender Inglés en Línea',
      category: 'english',
      date: '2026-08',
      url: 'https://platzi.com/p/oteguit31/curso/12290-course/diploma/detalle/',
    },
    {
      title: 'Curso de Supabase Avanzado',
      category: 'backend',
      date: '2026-07',
      url: 'https://platzi.com/p/oteguit31/curso/12559-course/diploma/detalle/',
    },
    {
      title: 'Curso de Supabase',
      category: 'backend',
      date: '2026-07',
      url: 'https://platzi.com/p/oteguit31/curso/12544-course/diploma/detalle/',
    },
    {
      title: 'Curso de TypeScript',
      category: 'frontend',
      date: '2026-05',
      url: 'https://platzi.com/p/oteguit31/curso/2878-course/diploma/detalle/',
    },
    {
      title: 'Curso de Server Side Render o SSR con React.js',
      category: 'frontend',
      date: '2026-03',
      url: 'https://platzi.com/p/oteguit31/curso/6241-course/diploma/detalle/',
    },
    {
      title: 'Curso Profesional de React.js y Redux',
      category: 'frontend',
      date: '2026-02',
      url: 'https://platzi.com/p/oteguit31/curso/3219-course/diploma/detalle/',
    },
    {
      title: 'Curso de React.js: Navegación con React Router',
      category: 'frontend',
      date: '2026-02',
      url: 'https://platzi.com/p/oteguit31/curso/3468-course/diploma/detalle/',
    },
    {
      title: 'Curso de React.js',
      category: 'frontend',
      date: '2025-11',
      url: 'https://platzi.com/p/oteguit31/curso/11887-course/diploma/detalle/',
    },
    {
      title: 'Curso de Responsive Design: Maquetación Mobile First',
      category: 'frontend',
      date: '2025-11',
      url: 'https://platzi.com/p/oteguit31/curso/2030-course/diploma/detalle/',
    },
    {
      title: 'Curso de API REST con Javascript: Performance y Usabilidad',
      category: 'frontend',
      date: '2025-10',
      url: 'https://platzi.com/p/oteguit31/curso/2942-course/diploma/detalle/',
    },
    {
      title: 'Curso de API REST con Javascript: Ejemplos con APIs reales',
      category: 'frontend',
      date: '2025-10',
      url: 'https://platzi.com/p/oteguit31/curso/2986-course/diploma/detalle/',
    },
    {
      title: 'Curso de Arquitecturas CSS',
      category: 'frontend',
      date: '2025-10',
      url: 'https://platzi.com/p/oteguit31/curso/7991-course/diploma/detalle/',
    },
    {
      title: 'Curso de Webpack',
      category: 'frontend',
      date: '2025-10',
      url: 'https://platzi.com/p/oteguit31/curso/2242-course/diploma/detalle/',
    },
    {
      title: 'Curso de State Machines en React.js',
      category: 'frontend',
      date: '2025-10',
      url: 'https://platzi.com/p/oteguit31/curso/3108-course/diploma/detalle/',
    },
    {
      title: 'Curso de React.js: Manejo Profesional del Estado',
      category: 'frontend',
      date: '2025-10',
      url: 'https://platzi.com/p/oteguit31/curso/2597-course/diploma/detalle/',
    },
    {
      title: 'Curso de React Avanzado',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/11223-course/diploma/detalle/',
    },
    {
      title: 'Prueba Técnica: E-commerce Profesional con React.js',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/7397-course/diploma/detalle/',
    },
    {
      title: 'Curso de React.js: Patrones de Render y Composición',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/2457-course/diploma/detalle/',
    },
    {
      title: 'Curso de Asincronismo con JavaScript 2022',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/3175-course/diploma/detalle/',
    },
    {
      title: 'Curso de API REST con Javascript: Fundamentos',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/2985-course/diploma/detalle/',
    },
    {
      title: 'Curso de JavaScript: Manipulación del DOM',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/10135-course/diploma/detalle/',
    },
    {
      title: 'Curso de Closures y Scope en JavaScript',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/3213-course/diploma/detalle/',
    },
    {
      title: 'Curso de React.js con Vite.js y TailwindCSS',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/7396-course/diploma/detalle/',
    },
    {
      title: 'Curso de React.js',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/7395-course/diploma/detalle/',
    },
    {
      title: 'Curso Básico de Tailwind 2 y 3',
      category: 'frontend',
      date: '2024-11',
      url: 'https://platzi.com/p/oteguit31/curso/2702-course/diploma/detalle/',
    },
  ],
}
