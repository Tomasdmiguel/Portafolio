import type { ExperienceContent } from '../types/content.ts'

/** Contenido de "Experiencia" (spec 003, Assumptions; resumido del CV). Para editar la sección, se cambia solo este archivo. */
export const experience: ExperienceContent = {
  title: 'Experiencia',
  file: 'experiencia.log',
  currentLabel: 'Actual',
  presentLabel: 'Actualidad',
  techLabel: 'Tecnologías',
  items: [
    {
      role: 'Frontend Developer',
      company: 'Seeker Parking',
      industry: 'SaaS de estacionamiento inteligente',
      start: '2024-09',
      modality: 'Remoto',
      summary:
        'Construyo la nueva plataforma que reemplaza al sistema legacy, en un equipo ágil de 6 a 10 personas junto a backend, QA y producto.',
      highlights: [
        { lead: '+20 pantallas', text: 'del panel administrativo y la app para clientes de la nueva plataforma.' },
        { lead: 'Registro y compra', text: '(checkout) con formularios validados e integración de APIs REST.' },
        {
          lead: 'Componentes reutilizables:',
          text: 'tablas de datos, skeletons, selects con autocompletado y recorte de imágenes.',
        },
        {
          lead: 'Desarrollo con IA',
          text: 'de forma agéntica: defino specs, reviso la arquitectura y valido el código antes de integrarlo.',
        },
      ],
      tech: ['React', 'TypeScript', 'Next.js', 'Vite', 'React Hook Form', 'Zod', 'APIs REST', 'Scrum'],
    },
  ],
}
