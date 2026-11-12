<!--
Sync Impact Report
==================
Version change: 1.0.0 → 1.0.1
Bump rationale: PATCH — corrección de la fuente de tipografías (el paquete npm 'geist' no es
utilizable fuera de Next.js) y aclaración explícita de la excepción de ErrorBoundary, que ya era
requerida por el Principio V. No se agregan, eliminan ni redefinen principios.

Principios modificados: ninguno (I–VI sin cambios de título ni de alcance).

Secciones modificadas:
  - Stack y restricciones técnicas → Tipografía: Geist self-hosted (Fontsource o woff2 oficiales
    de Vercel), elección justificada en plan.md; se excluye el paquete npm 'geist'.
  - Estructura y estilo de código → excepción: ErrorBoundary como único componente de clase.

Secciones agregadas: ninguna.
Secciones eliminadas: ninguna.

Inferencias de v1.0.0 (slugs de categorías, campos de certificado, elementos siempre visibles,
viewports, Geist Mono, inline styles): confirmadas por el autor.

Templates dependientes (.specify/templates/*): leen la constitución en runtime; no se modifican.
Specs existentes: ninguna; no hay coherencia que revisar.

TODOs diferidos: ninguno.
-->

# Portafolio Tomás D. Miguel — Constitución

## Naturaleza del proyecto

Portafolio personal de Tomás D. Miguel, desarrollador. Objetivo: que reclutadores técnicos y no
técnicos entiendan **en menos de 30 segundos** quién es, qué hace, su experiencia y cómo
contactarlo. Se diferencia visualmente con una identidad **pixel/dot-matrix** y animaciones al
hacer scroll.

Secciones: **Hero**, **Sobre mí**, **Experiencia**, **Certificaciones de Platzi** agrupadas por
categoría (IA, Inglés, Frontend, Backend) y **Contacto**. La sección **Proyectos personales**
queda preparada en código y data, pero NO se muestra mientras `projects.js` esté vacío.

## Core Principles

### I. Claridad para reclutadores

- El público objetivo son reclutadores. Toda decisión de diseño MUST priorizar claridad y
  velocidad de lectura por encima del efecto visual.
- Siempre visibles (sin interacción previa): nombre, rol, links de contacto (LinkedIn, GitHub,
  email) y CV descargable en PDF.
- Profesionalismo al compartir: `<title>` con nombre y rol, meta description, imagen Open Graph
  propia y favicon propio son obligatorios.
- Idioma: todo el contenido visible está en español.
- Costo cero: MUST NOT usarse servicios pagos (dominio propio, hosting, APIs).

**Rationale**: el sitio compite por segundos de atención; un efecto que demora la lectura es un
defecto, no un adorno.

### II. Contenido real y separado del código (NO NEGOCIABLE)

- La experiencia y las certificaciones son reales y verificables. MUST NOT inventarse contenido.
- Cada certificado tiene: título, categoría, fecha y URL de verificación de Platzi.
- Categorías de certificaciones cerradas: `'ai'`, `'english'`, `'frontend'`, `'backend'`.
  Agregar una categoría nueva exige enmendar esta constitución.
- Los componentes MUST NOT tener texto de contenido hardcodeado; lo reciben por props desde
  `src/data/`. Agregar un certificado = editar solo `certifications.js`.
- La forma de cada entidad de data se documenta con JSDoc (`@typedef`) en su archivo.

**Rationale**: el portafolio es una declaración pública verificable; mantener el contenido en
data permite actualizarlo sin tocar componentes ni arriesgar regresiones.

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
- **Validación de data**: en desarrollo (`import.meta.env.DEV`) una función valida cada archivo de
  `src/data/` y hace `console.warn` si falta un campo obligatorio o una categoría no es válida.
  En producción, un ítem inválido no se renderiza y no rompe la página.
- **Estados vacíos**: una sección o grupo sin ítems no se renderiza. Nunca se muestran títulos
  con listas vacías.
- **Imágenes**: tienen `width`/`height` para evitar CLS y un fallback visual si fallan al cargar.
- **Links externos**: `target="_blank"` con `rel="noopener noreferrer"`. Antes de cada deploy a
  producción se verifica que los links de LinkedIn, GitHub, CV y certificados respondan.
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

- **Frontend**: React 19 + Vite, en JavaScript (JSX). Sin TypeScript.
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
- **Backend**: ninguno. **Base de datos**: ninguna; todo el contenido es data en archivos JS
  dentro de `src/data/`.
- **Deploy**: Vercel (plan Hobby, gratuito) con integración Git conectada al repo de GitHub.
  Producción: https://tomasdmiguel.vercel.app. `master` = producción; cada rama de feature genera
  un preview deploy automático.
- **Dependencias**: toda dependencia nueva fuera de React, Vite, Tailwind y Geist MUST
  justificarse en el `plan.md` de la feature.

## Estructura y estilo de código

```text
src/
├── components/
│   ├── sections/   → una sección por archivo (Hero.jsx, About.jsx, Experience.jsx,
│   │                 Certifications.jsx, Contact.jsx)
│   └── ui/         → componentes reutilizables sin contenido propio (Button.jsx, Tag.jsx,
│                     Card.jsx, SectionTitle.jsx)
├── data/           → profile.js, experience.js, certifications.js, projects.js
├── assets/         → imágenes y logos
├── App.jsx         → solo compone las secciones
├── main.jsx
└── index.css       → @import "tailwindcss", @theme con tokens, @utility y keyframes
                      de scroll-driven
public/             → favicon, imagen Open Graph, CV en PDF
```

Reglas:

- Componentes funcionales con hooks; un componente por archivo. Si un componente supera 150
  líneas, se divide.
- Excepción: `ErrorBoundary` es el único componente de clase permitido, porque React no ofrece
  Error Boundaries con hooks.
- Nomenclatura: componentes en PascalCase; variables, funciones y archivos de data en camelCase;
  constantes en UPPER_SNAKE_CASE. Código e identificadores en inglés; contenido visible en español.
- Estilos solo con clases de Tailwind. Prohibidos colores y tamaños sueltos (arbitrary values como
  `text-[#ff0000]`) salvo justificación documentada en el `plan.md`.
- Las animaciones se definen como `@utility` en `index.css`, nunca como estilos inline.
- Calidad: `npm run lint` y `npm run build` MUST pasar sin errores antes de cada commit.
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

**Version**: 1.0.1 | **Ratified**: 2026-11-10 | **Last Amended**: 2026-11-10
