# Research: Sobre mí

Decisiones técnicas de la feature 002. Se apoya en la base de la feature 001
([research 001](../001-hero-base/research.md)); acá solo se documenta lo nuevo o lo que cambia.

## R1. Animación de entrada

- **Decision**: animaciones CSS ligadas al scroll con la línea de tiempo del propio elemento
  (`animation-timeline: view()`) y rango `animation-range: entry 0% entry 100%`:
  - **Título** ("Sobre mí", Geist Pixel): se "arma" en puntos. Es el efecto inverso al del
    nombre del Hero: la máscara de puntos va de radio 0 a la celda completa (`--dot-r` de 0 a
    `--dot-cell`). Utility nueva `dot-assemble` con keyframes `dot-assemble`.
  - **Datos rápidos y párrafos**: aparecen con opacidad y un desplazamiento corto hacia arriba.
    Utility nueva `reveal` con keyframes `reveal` (inverso de `hero-fade`).
- **Rationale**: `entry 100%` ocurre cuando el elemento entra completo en pantalla, o sea, con su
  borde inferior todavía en la parte baja del viewport: termina visible y nítido antes de llegar a
  la mitad de la pantalla (US4, escenario 1). Cada bloque usa su propia línea de tiempo, así el
  efecto no depende del largo de la sección.
- **Mejora progresiva (Principio V)**: las dos utilities van dentro de
  `@supports (animation-timeline: view())` y se aplican con `motion-safe:`. Sin soporte o con
  movimiento reducido no hay máscara ni opacidad: el contenido se ve completo desde el inicio.
  El estado "oculto" solo existe mientras el elemento todavía no entró en pantalla.
- **Alternatives considered**: `IntersectionObserver` + clases (JS y no reversible con el scroll);
  animar toda la sección como un bloque (en móvil la sección es más alta que la pantalla y el
  final de la animación llegaría tarde).

## R2. Navegación

- **Decision**: la navegación lista **todas** las secciones con contenido, incluida "Inicio", y se
  muestra solo cuando hay 2 o más. Reemplaza la regla de R12 de la feature 001 (que excluía al
  Hero porque la marca ya enlaza a `#inicio`).
- **Rationale**: el spec 002 (FR-007) pide "Inicio" y "Sobre mí". Con una sola sección el
  resultado es el mismo que antes: no hay `<nav>`.
- **`hasContent` calculado**: la entrada `sobre-mi` de `sections.ts` toma `hasContent` de
  `hasAboutContent(about)` (al menos un párrafo con texto). Si el contenido se vacía, la sección
  y su link desaparecen juntos (FR-006) sin tocar `sections.ts`.
- **Header**: altura fija `h-15` (60 px, lo que ya medía: links de `min-h-11` + el `py-2` del header; los links mantienen `min-h-11`) y no fijo. En
  360 px "Tomás De Miguel" + "Inicio" + "Sobre mí" entran en una línea (≈ 290 px de 328 útiles).
  Con más secciones (features siguientes) hará falta un menú compacto en móvil: queda anotado
  como riesgo.
- **Scroll suave**: `scroll-behavior: smooth` en `html` solo con
  `prefers-reduced-motion: no-preference`. Como el header no es fijo, no hace falta
  `scroll-margin`.

## R3. Layout de la primera pantalla y del recorrido de scroll

- **Problema**: en la 001, `<main>` estaba dentro del contenedor `min-h-svh` junto al header, y el
  Hero ocupaba el resto con `flex-1`. Si "Sobre mí" entra en `<main>`, el Hero pierde ese
  `flex-1` (el contenedor ya es más alto que la pantalla).
- **Decision**: el header pasa a tener altura fija (`h-15`) y el Hero usa una utility nueva
  `hero-screen` con `min-height: calc(100svh - --spacing(15))`. `<main>` contiene Hero y Sobre mí
  como hermanos. Sin arbitrary values en las clases: el cálculo vive en `@utility`.
- **Recorrido para el efecto del Hero**: la sección "Sobre mí" tiene `min-h-svh` (contenido
  centrado verticalmente). Así, después del Hero siempre hay al menos una pantalla de scroll y el
  rango `exit 0% exit 80%` del Hero se completa en cualquier tamaño. El pie pierde su `min-h-svh`
  (FR-014) y vuelve a ser un pie chico. Reemplaza R5 de la feature 001.
- **Alternatives considered**: `grid` con `subgrid` entre header, Hero y `<main>` (más complejo y
  con arbitrary values para las filas); `display: contents` en `<main>` (algunos lectores de
  pantalla pierden el landmark); dejar el `min-h-svh` en el pie (pie vacío de una pantalla, sin
  sentido una vez que hay contenido).

## R4. Estructura del contenido y del componente

- **Decision**: `src/data/about.ts` exporta `about: About` con `title`, `paragraphs: string[]` y
  `facts: QuickFact[]`. Componente `sections/About.tsx` y un `ui/SectionTitle.tsx` reutilizable
  (está en el árbol de la constitución) para el `h2` en Geist Pixel con su efecto.
- **Datos rápidos**: lista de descripción (`<dl>` con `<dt>`/`<dd>`), que expone la relación
  etiqueta–valor a los lectores de pantalla (US2, escenario 2).
- **Orden**: en el DOM van título → datos rápidos → párrafos (resumen primero, para quien escanea).
  En desktop (`md:`) se usa una grilla de dos columnas: párrafos a la izquierda con
  `max-w-prose` (≈ 65 caracteres, FR-009) y datos rápidos a la derecha.
- **Mención a "Cómo trabajo"** (FR-003): queda dentro del texto del párrafo 3 como `string`. Cuando
  exista esa sección, el tipo de párrafo se amplía para admitir un link interno; no se adelanta
  ahora (YAGNI).
- **Validación (Principio V)**: funciones puras nuevas en `src/lib/validateContent.ts`:
  `getValidParagraphs`, `getValidFacts`, `hasAboutContent` y `validateAbout`, con tests en
  `node --test`. En DEV, `App.tsx` suma `validateAbout(about)` a los avisos; en producción se
  filtran párrafos y datos vacíos.
- **Alternatives considered**: guardar el contenido dentro de `profile.ts` (mezcla el Hero con
  otra sección y lo vuelve largo); párrafos como JSX (rompe el Principio II: contenido en data).
