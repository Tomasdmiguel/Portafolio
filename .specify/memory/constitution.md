<!--
Sync Impact Report
==================
Version change: 1.0.1 → 1.1.0
Bump rationale: MINOR — se agregan secciones al portafolio (Cómo trabajo, Stack, Formación y
certificaciones), se activa Proyectos y se cambia el lenguaje del stack de JavaScript a
TypeScript. Ningún principio se elimina ni cambia de propósito.

Principios modificados:
  - II. Contenido real y separado del código: la forma de la data pasa de JSDoc (@typedef) a
    tipos de TypeScript; el alcance de "contenido real" incluye proyectos y formación.
  - I–VI: sin cambios de título.

Secciones modificadas:
  - Naturaleza del proyecto: nombre "Tomás De Miguel"; nueva lista y orden de secciones;
    Certificaciones de Platzi fusionadas en "Formación y certificaciones"; Proyectos visible.
  - Stack y restricciones técnicas: React 19 + Vite + TypeScript (TSX) en modo strict;
    TypeScript y @types/* agregados a las dependencias base.
  - Estructura y estilo de código: archivos .tsx/.ts, nuevas secciones y data, carpeta types/,
    typecheck como parte de la calidad.

Secciones agregadas: ninguna sección del documento (las nuevas son secciones del portafolio).
Secciones eliminadas: ninguna. "Certificaciones" deja de ser sección propia del portafolio.

Inferencias (confirmar): tipos compartidos en src/types/content.ts; prohibido `any`;
ErrorBoundary.tsx en components/; README sin cambios.

Templates dependientes (.specify/templates/*): leen la constitución en runtime; no se modifican.
Specs existentes: ninguna; no hay coherencia que revisar.

TODOs diferidos: ninguno.
-->

# Portafolio Tomás De Miguel — Constitución

## Naturaleza del proyecto

Portafolio personal de Tomás De Miguel, Frontend Developer. Objetivo: que reclutadores técnicos
y no técnicos entiendan **en menos de 30 segundos** quién es, qué hace, su experiencia y cómo
contactarlo. Se diferencia visualmente con una identidad **pixel/dot-matrix** y animaciones al
hacer scroll.

Secciones, en este orden:

1. **Hero**
2. **Sobre mí**
3. **Cómo trabajo**: AI-Driven + Spec-Driven Development (el diferencial del perfil).
4. **Experiencia**
5. **Proyectos**
6. **Stack**
7. **Formación y certificaciones**: título técnico, certificaciones de Platzi agrupadas por
   categoría (IA, Inglés, Frontend, Backend) e idiomas.
8. **Contacto**

La sección **Proyectos** se muestra porque `projects.ts` tiene contenido (Niddo). Si en algún
momento `projects.ts` queda vacío, la sección NO se renderiza.

## Core Principles

### I. Claridad para reclutadores

- El público objetivo son reclutadores. Toda decisión de diseño MUST priorizar claridad y
  velocidad de lectura por encima del efecto visual.
- Siempre visibles (sin interacción previa): nombre, rol, links de contacto (LinkedIn, GitHub,
  email) y CV descargable en PDF.
- Profesionalismo al compartir: `<title>` con nombre y rol, meta description, imagen Open Graph
  propia y favicon propio son obligatorios.
- Idioma: todo el contenido visible está en español. Los nombres de tecnologías y títulos de rol
  de la industria (ej. "Frontend Developer") se mantienen como se usan habitualmente.
- Costo cero: MUST NOT usarse servicios pagos (dominio propio, hosting, APIs).

**Rationale**: el sitio compite por segundos de atención; un efecto que demora la lectura es un
defecto, no un adorno.

### II. Contenido real y separado del código (NO NEGOCIABLE)

- La experiencia, los proyectos, la formación y las certificaciones son reales y verificables.
  MUST NOT inventarse contenido.
- Cada certificado tiene: título, categoría, fecha y URL de verificación de Platzi.
- Categorías de certificaciones cerradas: `'ai'`, `'english'`, `'frontend'`, `'backend'`.
  Agregar una categoría nueva exige enmendar esta constitución.
- Los componentes MUST NOT tener texto de contenido hardcodeado; lo reciben por props desde
  `src/data/`. Agregar un certificado = editar solo `certifications.ts`.
- La forma de cada entidad de data se define con tipos de TypeScript en `src/types/content.ts`;
  la data y los componentes los importan. Las categorías se tipan como unión de literales.

**Rationale**: el portafolio es una declaración pública verificable; mantener el contenido en
data tipada permite actualizarlo sin tocar componentes y detectar errores al compilar.

### III. Mobile-first responsive (NO NEGOCIABLE)

- Se diseña primero para 360px y se escala con los breakpoints `sm`/`md`/`lg`/`xl`.
- Cada sección MUST verificarse en 360px, 768px, 1280px y móvil horizontal.
- Titulares en Geist Pixel con tamaños fluidos (`clamp()`).
- Áreas táctiles de al menos 44×44px.

**Rationale**: gran parte de los reclutadores abre links desde el teléfono (LinkedIn, email).

### IV. Accesibilidad y rendimiento medibles

- HTML semántico (`header`, `nav`, `main`, `section`, `footer`) y un solo `h1`.
- Navegación completa por teclado con foco visible.
- Contraste WCAG AA y `alt` descriptivo en toda imagen con contenido.
- Lighthouse ≥ 90 en Performance, Accessibility, Best Practices y SEO, en mobile y desktop.

**Rationale**: son criterios objetivos y auditables; un portafolio de desarrollador que falla en
ellos contradice lo que intenta demostrar.

### V. Mejora progresiva y resiliencia

- **Animaciones**: las animaciones scroll-driven MUST ir dentro de
  `@supports (animation-timeline: view())`. Sin soporte, el contenido se ve completo, estático y
  legible; nunca queda oculto ni con `opacity: 0`.
- **Movimiento reducido**: con `prefers-reduced-motion: reduce` las animaciones se desactivan
  (variantes `motion-safe` / `motion-reduce` de Tailwind).
- **Validación de data**: los tipos cubren la validación en compilación. Además, en desarrollo
  (`import.meta.env.DEV`) una función valida cada archivo de `src/data/` en runtime y hace
  `console.warn` si falta un campo obligatorio o una URL está vacía. En producción, un ítem
  inválido no se renderiza y no rompe la página.
- **Estados vacíos**: una sección o grupo sin ítems no se renderiza. Nunca se muestran títulos
  con listas vacías.
- **Imágenes**: tienen `width`/`height` para evitar CLS y un fallback visual si fallan al cargar.
- **Links externos**: `target="_blank"` con `rel="noopener noreferrer"`. Antes de cada deploy a
  producción se verifica que los links de LinkedIn, GitHub, CV, proyectos y certificados
  respondan.
- **Error Boundary**: un componente `ErrorBoundary` envuelve cada sección; si una falla, el resto
  del portafolio sigue funcionando.
- **Fuentes**: si Geist Pixel no carga, hay un fallback (`monospace`) que mantiene la legibilidad.

**Rationale**: la identidad visual es un plus; el contenido accesible y completo es el mínimo
garantizado en cualquier navegador.

### VI. Spec-Driven Development

- Ningún código se escribe sin un spec aprobado. Cada feature sigue el flujo
  specify → clarify → plan → tasks → analyze → implement, en su propia rama (`001-…`, `002-…`).
- Una sección del portafolio = una feature.
- Si un pedido contradice esta constitución o el spec de la feature, o si la IA detecta una falla
  lógica, una ambigüedad o un requisito faltante, la IA MUST:
  1. frenar sin tocar código;
  2. avisar explicando qué regla o requisito está en conflicto;
  3. proponer cómo actualizar el `spec.md` (o la constitución);
  4. esperar aprobación antes de implementar.

**Rationale**: el spec es el contrato; detenerse ante la ambigüedad es más barato que reescribir.

## Stack y restricciones técnicas

- **Frontend**: React 19 + Vite, en TypeScript (TSX) con `strict: true`. MUST NOT usarse `any`
  explícito; si es inevitable, se justifica en el `plan.md`.
- **Estilos**: Tailwind CSS v4 con el plugin `@tailwindcss/vite`. Los design tokens (colores,
  tipografías, espaciados) se definen con `@theme` dentro de `src/index.css`.
- **Tipografía**: fuentes Geist (Sans, Mono y Pixel) self-hosted, vía Fontsource o los archivos
  woff2 oficiales de Vercel; la elección concreta se justifica en el `plan.md`. Se cargan solo
  las variantes usadas, con `font-display: swap`. El paquete npm `geist` MUST NOT usarse porque
  depende de `next/font` (Next.js).
  - Geist Pixel (variantes Square y Circle): solo titulares y elementos display.
  - Geist Sans: texto de lectura.
  - Geist Mono: elementos técnicos.
- **Animaciones**: CSS scroll-driven animations (`animation-timeline: scroll()` / `view()`,
  `animation-range`). Prohibidas las librerías de animación JS (Framer Motion, GSAP, AOS, etc.).
- **Backend**: ninguno. **Base de datos**: ninguna; todo el contenido es data en archivos TS
  dentro de `src/data/`.
- **Deploy**: Vercel (plan Hobby, gratuito) con integración Git conectada al repo de GitHub.
  Producción: https://tomasdmiguel.vercel.app. `master` = producción; cada rama de feature genera
  un preview deploy automático.
- **Dependencias**: toda dependencia nueva fuera de React, Vite, Tailwind, Geist, TypeScript y
  sus paquetes de tipos (`@types/*`, `typescript-eslint`) MUST justificarse en el `plan.md` de
  la feature.

## Estructura y estilo de código

```text
src/
├── components/
│   ├── sections/   → una sección por archivo (Hero.tsx, About.tsx, HowIWork.tsx,
│   │                 Experience.tsx, Projects.tsx, Stack.tsx, Education.tsx, Contact.tsx)
│   ├── ui/         → componentes reutilizables sin contenido propio (Button.tsx, Tag.tsx,
│   │                 Card.tsx, SectionTitle.tsx)
│   └── ErrorBoundary.tsx
├── data/           → profile.ts, howIWork.ts, experience.ts, projects.ts, stack.ts,
│                     education.ts, certifications.ts
├── types/          → content.ts (tipos de todas las entidades de data)
├── assets/         → imágenes y logos
├── App.tsx         → solo compone las secciones
├── main.tsx
└── index.css       → @import "tailwindcss", @theme con tokens, @utility y keyframes
                      de scroll-driven
public/             → favicon, imagen Open Graph, CV en PDF
```

Reglas:

- Componentes funcionales con hooks; un componente por archivo. Si un componente supera 150
  líneas, se divide.
- Las props de cada componente se tipan con un `type` o `interface` explícito.
- Excepción: `ErrorBoundary` es el único componente de clase permitido, porque React no ofrece
  Error Boundaries con hooks.
- Nomenclatura: componentes en PascalCase; variables, funciones y archivos de data en camelCase;
  tipos en PascalCase; constantes en UPPER_SNAKE_CASE. Código e identificadores en inglés;
  contenido visible en español.
- Estilos solo con clases de Tailwind. Prohibidos colores y tamaños sueltos (arbitrary values como
  `text-[#ff0000]`) salvo justificación documentada en el `plan.md`.
- Las animaciones se definen como `@utility` en `index.css`, nunca como estilos inline.
- Calidad: `npm run lint` y `npm run build` (que incluye el chequeo de tipos con `tsc`) MUST pasar
  sin errores antes de cada commit.
- Commits con Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`).

## Governance

- Esta constitución es la máxima autoridad del proyecto. Le siguen, en orden, el `spec.md`, el
  `plan.md` y el `tasks.md` de cada feature. Ante conflicto, prevalece el documento de mayor rango.
- Toda modificación requiere subir la versión con semver:
  - **MAJOR**: se elimina o redefine un principio.
  - **MINOR**: se agrega un principio o sección, o se amplía materialmente una regla.
  - **PATCH**: aclaraciones, redacción o correcciones sin cambio semántico.
- Tras cada enmienda se revisa que las specs existentes sigan siendo coherentes con ella.
- Cada `plan.md` incluye un "Constitution Check" contra los principios I–VI; toda excepción se
  justifica explícitamente allí.

**Version**: 1.1.0 | **Ratified**: 2026-11-10 | **Last Amended**: 2026-11-12
