import type { About } from '../types/content.ts'

/** Contenido de "Sobre mí" (spec 002, Assumptions). Para editar la sección, se cambia solo este archivo. */
export const about: About = {
  title: 'Sobre mí',
  paragraphs: [
    'Soy Frontend Developer en Tandil, Argentina. Hace dos años construyo productos SaaS con React, TypeScript y Next.js, y hoy formo parte del equipo que está rehaciendo de cero la plataforma de un SaaS de estacionamiento inteligente.',
    'Siempre me gustaron las computadoras y los videojuegos, así que la idea de trabajar frente a una pantalla me atraía. En la técnica descubrí la programación y me enganché con el ambiente: la forma de pensar los problemas y la gente que los resuelve. Lo que más disfruto es crear: tomar una idea y llevarla hasta algo que se vea y se sienta bien.',
    'Trabajo con IA de forma agéntica y escribo especificaciones antes del código (lo cuento en detalle en Cómo trabajo).',
    'Mi próximo paso es crecer como Software Engineer, mejorar mi inglés y trabajar con equipos de afuera. Fuera del código, juego y le dedico tiempo a mi setup.',
  ],
  facts: [
    { label: 'Base', value: 'Tandil, Argentina · Remoto' },
    { label: 'Experiencia', value: '2 años en productos SaaS' },
    { label: 'Enfoque', value: 'Frontend · AI-Driven Development' },
    { label: 'Busco', value: 'crecer como Software Engineer en equipos de afuera' },
  ],
}
