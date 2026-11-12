# Research: Hero y base del portafolio

**Feature**: `001-hero-base` | **Fecha**: 2026-11-12 | **Plan**: [plan.md](./plan.md)

Cada decisión resuelve un punto abierto del Technical Context o del spec (Clarifications y
Assumptions). Versiones verificadas en npm el 2026-11-12.

---

## R1. Versión de TypeScript

- **Decision**: `typescript@~6.0.3` (fijada en minor 6.0) + `typescript-eslint@^8.72`.
- **Rationale**: la última versión publicada es TypeScript 7.0.2, pero `typescript-eslint@8.72.2`
  declara `peerDependencies.typescript: ">=4.8.4 <6.1.0"`. Con 7.x el lint (gate obligatorio de
  la constitución) no tiene soporte oficial. 6.0.x cubre todo lo que necesita el proyecto
  (`strict`, `verbatimModuleSyntax`, `erasableSyntaxOnly`).
- **Alternatives considered**: TS 7 sin lint tipado (rompe el gate `npm run lint`); TS 7 con
  `--legacy-peer-deps` (oculta incompatibilidades). Se revisa cuando typescript-eslint soporte 7.

## R2. Origen de las fuentes Geist

- **Decision**:
  - **Geist Pixel Square y Circle**: archivos woff2 oficiales del repo `vercel/geist-font`
    (`fonts/GeistPixel/webfonts/GeistPixel-{Square,Circle}.woff2`, ~28 KB c/u, licencia OFL-1.1),
    self-hosted en `public/fonts/` con `@font-face` propio.
  - **Geist Sans y Geist Mono**: `@fontsource-variable/geist` y `@fontsource-variable/geist-mono`
    (5.3.0), importando solo el subset `latin`.
- **Rationale**: `@fontsource/geist-pixel@5.3.0` publica **una sola** variante (familia
  "Geist Pixel", peso 400), sin Square ni Circle por separado; la constitución exige ambas
  variantes. Los woff2 oficiales sí las traen. Para Sans y Mono, Fontsource da subsets por
  `unicode-range` y versión variable (un archivo para todos los pesos).
  Pixel va en `public/` (URL estable, sin hash) para poder hacer `<link rel="preload">` desde
  `index.html` y que el titular no tarde en pintarse (SC-004).
- **Carga real**: se declaran las dos variantes Pixel, pero el navegador solo descarga las que
  se usan. En esta feature se usa **solo Square** (titular); Circle queda declarada para
  elementos display de features futuras, sin costo de red.
- **Alternatives considered**: todo con Fontsource (no tiene Square/Circle); todo con woff2
  oficiales (perdemos subsetting de Sans/Mono); paquete npm `geist` (prohibido: depende de
  `next/font`).
- **Verificación pendiente en implement**: que Square tenga el glifo "á" (`Tomás`); si no, el
  fallback cubre solo ese glifo (edge case del spec).

## R3. Paleta: oscuro + un acento (Clarification Q1)

- **Decision**: acento **ámbar LED**.

  | Token | Valor | Uso | Contraste sobre `bg` |
  |---|---|---|---|
  | `--color-bg` | `#0a0a0a` | fondo | — |
  | `--color-surface` | `#141414` | superficies (botones secundarios) | — |
  | `--color-border` | `#262626` | bordes, separadores | — |
  | `--color-fg` | `#ededed` | texto principal | ≈ 17:1 |
  | `--color-muted` | `#a1a1a1` | texto secundario | ≈ 7.6:1 |
  | `--color-accent` | `#ffb000` | titular, puntos "encendidos", foco/hover | ≈ 10.8:1 |
  | `--color-accent-fg` | `#0a0a0a` | texto sobre botón ámbar | ≈ 10.8:1 |

- **Rationale**: el ámbar es el color clásico de los displays dot-matrix/LED, contrasta con
  holgura AA (y AAA) sobre negro y es cálido, lo que acompaña la foto. Un solo acento simplifica
  la jerarquía.
- **Alternatives considered**: verde fósforo `#33ff66` (más "terminal", asociado a hacker/cliché);
  cian (menos asociado a LED). Si Tomás prefiere otro tono, se cambia **un** token.

## R4. Efecto "desarmarse en puntos" con CSS puro (Clarification Q3)

- **Decision**: máscara de puntos con `mask-image: radial-gradient(...)` repetida en una grilla
  (`mask-size` = tamaño de celda), cuyo **radio** es una custom property registrada con
  `@property --dot-r { syntax: '<length>'; inherits: false; }`. Una animación scroll-driven
  (`animation-timeline: view()`, `animation-range: exit 0% exit 100%`) lleva `--dot-r` desde
  "celda llena" (elemento sólido) hasta `0` (desaparece en puntos cada vez más chicos).
  - **Nombre (h1)**: en reposo sin máscara (sólido, máxima legibilidad); al salir, los puntos se
    achican.
  - **Foto**: en reposo ya tiene la máscara de puntos con radio intermedio (tratamiento
    dot-matrix permanente); al salir, los puntos se achican hasta desaparecer.
  - **Rol, stack, ubicación, links y CV**: solo `opacity` (más `translate` sutil), sin máscara.
  - Todo dentro de `@supports (animation-timeline: view())` y con variante `motion-safe`. Sin
    soporte o con `prefers-reduced-motion: reduce`, no hay animación ni estados intermedios.
- **Rationale**: no requiere JS ni librerías (prohibidas), funciona igual sobre texto e imagen,
  se revierte sola al subir (es función del scroll) y el estado inicial es el estado por
  defecto, así que **nunca queda nada oculto** si la animación no corre (Principio V).
  Interpolar una custom property registrada es el único modo de animar el radio dentro de un
  gradiente.
- **Rendimiento**: animar la máscara repinta (no es solo composición). Está acotado a 2
  elementos; `opacity`/`transform` del resto sí son de composición. Se valida con Lighthouse y
  el panel Performance (sin long tasks durante el scroll).
- **FR-009a (links operables)**: la opacidad no afecta clicks; los elementos siguen operables
  mientras se ven. No se usa `visibility` ni `pointer-events: none`.
- **Alternatives considered**: `<canvas>` con partículas (requiere JS por frame, peor INP y
  accesibilidad); SVG `<pattern>` animado con JS (mismo problema); `IntersectionObserver` +
  clases (no está ligado al progreso del scroll; no lo revierte proporcionalmente).

## R5. Espacio de scroll mientras el Hero es la única sección

- **Decision**: el pie de página tiene `min-h-svh` y su contenido se alinea abajo. Así el hero
  puede salir completo del viewport y el rango `exit` de `view()` se recorre entero.
- **Rationale**: con solo hero + pie chico no hay scroll suficiente y la animación quedaría a
  medias (la Assumption del spec lo prevé). `view()` es la timeline correcta a futuro: cuando
  existan más secciones, se quita el `min-h-svh` y el efecto sigue igual.
- **Alternatives considered**: `scroll(root)` (el efecto dependería del largo total de la página
  y cambiaría con cada feature); espaciador vacío (`<div>` sin semántica).

## R6. Tratamiento y formato de la foto (Clarification Q2)

- **Decision**:
  1. **Archivo** (procesado una sola vez, sin dependencias): desde
     `specs/001-hero-base/assets/foto-original.png` (800×800), recorte centrado más cerrado
     sobre la cara y export a **AVIF** en 320 y 640 px + **JPEG** 640 px de fallback, con
     `sips` (macOS, AVIF es escribible). Destino: `src/assets/profile/`.
  2. **Color** (CSS, sin tocar el archivo): `grayscale(1) contrast(1.15)` y una capa ámbar con
     `mix-blend-mode: multiply` para el tinte LED.
  3. **Fondo de plantas**: además de la máscara de puntos, una máscara radial (viñeta) combinada
     con `mask-composite: intersect` que funde los bordes con el fondo negro; los puntos se
     concentran en la cara.
  4. **HTML**: `<picture>` con `srcset` (1x/2x), `width`/`height` fijos, `alt="Foto de Tomás De
     Miguel"`, `fetchpriority="high"` y `decoding="async"`. Tamaño: 160 px en mobile, 256 px
     desde `md`.
  5. **Fallback** (edge case): si `onError`, se reemplaza por un bloque del mismo tamaño con las
     iniciales "TDM" en Geist Pixel.
- **Rationale**: el tinte y la viñeta en CSS permiten ajustar la estética sin re-exportar; AVIF
  pesa ~10–20 KB a 320 px, sin impacto en LCP.
- **Alternatives considered**: procesar con `sharp` (dependencia nueva solo para 3 archivos);
  WebP (`sips` no lo escribe en esta máquina); hornear los puntos en el archivo (el efecto de
  scroll necesita la foto continua debajo de la máscara).

## R7. Meta tags, OG image y favicon

- **Decision**:
  - Los datos del `<head>` viven en `src/data/site.ts` (sin imports de assets). Un plugin
    inline en `vite.config.ts` (`transformIndexHtml`, ~20 líneas) los inyecta en `index.html`
    en build y en dev. Las URLs de OG son absolutas (`https://tomasdmiguel.vercel.app/...`).
  - **OG image** 1200×630 PNG y **apple-touch-icon** 180×180 PNG: se diseñan como HTML estático
    en `specs/001-hero-base/assets/og/` (fuera de `src/`, no se publica) y se exportan una vez con
    Chrome headless (`--screenshot --window-size=1200,630`). Resultado en `public/`.
  - **Favicon**: `public/favicon.svg` dibujado como pixel art (rectángulos, sin depender de
    fuentes), ámbar sobre negro, con las iniciales "TM". Se reemplaza el de Vite.
- **Rationale**: los crawlers de LinkedIn/WhatsApp/Slack no ejecutan JS, así que los meta tags
  tienen que estar en el HTML servido; el plugin evita duplicar nombre/rol entre `index.html` y
  la data (Principio II). Chrome headless ya está instalado: cero dependencias.
- **Alternatives considered**: `react-helmet`/meta en runtime (los crawlers no los ven);
  duplicar texto en `index.html` (dos fuentes de verdad); `@vercel/og` (requiere funciones
  serverless).

## R8. Validación de data y tests

- **Decision**:
  - Tipos estrictos en `src/types/content.ts` (validación en compilación).
  - `src/lib/validateContent.ts`: funciones **puras** que devuelven una lista de problemas
    (campo vacío, URL inválida, link sin nombre accesible). `App.tsx` la llama solo si
    `import.meta.env.DEV` y hace `console.warn` por cada problema.
  - En producción, `getValidContactLinks()` filtra links inválidos: un link roto no se
    renderiza y la página sigue.
  - **Tests**: `node --test` con el type stripping nativo de Node 26 sobre
    `src/lib/*.test.ts`. Cero dependencias. Script `npm test`.
- **Rationale**: el validador es la única lógica no trivial de la feature y es pura; el runner
  nativo de Node alcanza. Para que Node lo ejecute, los módulos testeados usan solo sintaxis
  borrable (`erasableSyntaxOnly`) e imports relativos con extensión `.ts`
  (`allowImportingTsExtensions`, válido con `noEmit`).
- **Alternatives considered**: Vitest (dependencia nueva; se justificará cuando haya tests de
  componentes); Zod en runtime (dependencia nueva para validar un objeto estático).

## R9. Verificación de links antes del deploy

- **Decision**: `scripts/check-links.ts` (Node 26, `fetch` nativo) recorre las URLs del perfil y
  falla si alguna responde ≥ 400. Excepción documentada: LinkedIn responde `999` a clientes
  automáticos; se trata como "alcanzable, verificar a mano". Script `npm run check:links`.
- **Rationale**: Principio V exige verificar LinkedIn, GitHub y CV antes de cada deploy a
  producción; automatizarlo evita olvidos.

## R10. ErrorBoundary

- **Decision**: componente de clase propio `src/components/ErrorBoundary.tsx` (única excepción
  permitida). Fallback: `null` (la sección no se muestra); en DEV loguea el error con el nombre
  de la sección. Envuelve cada sección en `App.tsx`.
- **Alternatives considered**: `react-error-boundary` (dependencia nueva para ~30 líneas).

## R11. Tamaño fluido del titular sin arbitrary values

- **Decision**: token `--text-display: clamp(2.75rem, 7vw + 1rem, 6.5rem)` (con su
  `--text-display--line-height`) en `@theme`, que genera la clase `text-display`.
- **Rationale**: cumple "tamaños fluidos con `clamp()`" (Principio III) sin arbitrary values
  (prohibidos). En 360 px da 44 px: "Tomás De Miguel" entra en dos líneas sin desbordar.

## R12. Navegación y layout

- **Decision**: `src/data/sections.ts` es el registro de secciones (`id`, `label`, `hasContent`).
  `SiteHeader` muestra la marca (nombre, enlace a `#inicio`) y los links de las secciones con
  `hasContent: true` **excepto** el Hero. En esta feature la lista queda vacía y el `<nav>` no
  se renderiza (evita un landmark vacío). Header **no fijo** por ahora: en 360 px cada píxel de
  altura cuenta para que el hero entre sin scroll; se revisa cuando haya secciones.
- **Landscape móvil** (alto ~360 px): hero en dos columnas (foto a la izquierda, texto a la
  derecha) con la variante `landscape:` + altura máxima; la foto baja a 120 px.
