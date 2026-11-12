# Implementation Plan: Hero y base del portafolio

**Branch**: `001-hero-base` | **Date**: 2026-11-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-hero-base/spec.md`

## Summary

Reemplazar el template de Vite por la base del portafolio y su primera sección. El Hero muestra
en la primera pantalla el nombre en Geist Pixel, el rol, el stack, la ubicación, la foto con
tratamiento dot-matrix, los links de contacto y "Ver CV". Al scrollear, el nombre y la foto se
desarman en puntos y el resto se desvanece.

**Enfoque técnico**:
- Migración a **TypeScript 6.0 strict**.
- **Tailwind v4** con tokens en `@theme` (paleta oscura + acento ámbar).
- Animación **solo CSS**: máscara radial cuyo radio es una custom property registrada
  (`@property`), animada con `animation-timeline: view()`.
- Contenido tipado en `src/data/`, con validación DEV y tests con `node --test`, sin
  dependencias nuevas de testing.
- Meta tags inyectados en el HTML en build desde `site.ts`.
- Assets (foto AVIF, OG image, favicon) generados una vez con herramientas locales (`sips`,
  Chrome headless).

## Technical Context

**Language/Version**: TypeScript ~6.0.3 (strict) sobre Node 26 / npm 11; JSX vía React 19.3.

**Primary Dependencies**:
- Ya instaladas: React 19.3, Vite 8.3, `@vitejs/plugin-react` 6.
- Nuevas: `tailwindcss` + `@tailwindcss/vite` 4.3, `@fontsource-variable/geist` y
  `@fontsource-variable/geist-mono` 5.3; dev: `typescript` ~6.0.3 y `typescript-eslint` ^8.72.
- Geist Pixel Square y Circle como woff2 oficiales en `public/fonts/`.

**Storage**: N/A. Contenido estático en `src/data/*.ts`.

**Testing**: `node --test` nativo (type stripping de Node 26) para las funciones puras de
`src/lib/`. Validación de punta a punta manual y con Lighthouse según
[quickstart.md](./quickstart.md).

**Target Platform**: navegadores evergreen (Chrome, Safari, Firefox, Edge; móvil y desktop).
Scroll-driven animations como mejora progresiva: sin soporte, la página se ve estática.

**Project Type**: sitio web estático (SPA de una página) desplegado en Vercel Hobby.

**Performance Goals**: Lighthouse ≥ 90 en las 4 categorías (mobile y desktop); LCP < 2,5 s en
4G lenta; CLS < 0,1; scroll sin long tasks.

**Constraints**:
- Costo cero; sin librerías de animación JS; sin arbitrary values de Tailwind.
- Componentes de 150 líneas como máximo.
- Contenido visible en español.
- WCAG AA, áreas táctiles de 44×44 px.

**Scale/Scope**: 1 sección visible, aproximadamente 10 componentes y 3 archivos de data. Es la
base que van a extender 7 features más.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| **I. Claridad** | Nombre, rol, contacto y CV en la primera pantalla (FR-001–003); title, description, OG image y favicon propios (contracts/head-meta.md); contenido en español; costo cero | ✅ |
| **II. Contenido real y separado** | Todo el texto sale de `src/data/` tipado en `src/types/content.ts`; datos reales que entregó Tomás; los componentes no tienen texto de contenido | ✅ |
| **III. Mobile-first** | Diseño desde 360 px; verificación en 360/768/1280/landscape; titular con `clamp()` vía token `text-display`; áreas táctiles de 44 px | ✅ |
| **IV. A11y y rendimiento** | Landmarks semánticos, un solo `h1`, foco visible ámbar, contraste ≥ 7:1, `alt` en la foto; Lighthouse ≥ 90 | ✅ |
| **V. Mejora progresiva** | Animaciones dentro de `@supports (animation-timeline: view())` + `motion-safe`; el estado por defecto es visible; validación DEV + filtro en prod; ErrorBoundary por sección; fallback de fuente y de foto; `rel="noopener noreferrer"`; `check:links` | ✅ |
| **VI. SDD** | Spec aprobado y clarificado; rama `001-hero-base` | ✅ |
| Stack: React 19 + Vite + TS strict | TS 6.0 (no 7.0: ver R1) | ✅ |
| Stack: Tailwind v4 + `@theme` | Tokens en `src/index.css` | ✅ |
| Stack: Geist self-hosted, sin paquete `geist` | Pixel con woff2 oficiales; Sans y Mono con Fontsource (R2) | ✅ justificado |
| Stack: animación solo CSS scroll-driven | Máscara + `@property` + `view()` (R4) | ✅ |
| Dependencias nuevas justificadas | Todas dentro de la lista permitida (Tailwind, Geist, TypeScript, `typescript-eslint`) | ✅ |
| Estructura de carpetas | Se agregan `src/lib/` y `scripts/` (ver Complexity Tracking) | ⚠️ justificado |
| Sin arbitrary values | Tamaños fluidos y colores como tokens; ningún `[…]` en clases | ✅ |
| Animaciones como `@utility` | `dot-dissolve`, `hero-fade` y `dot-photo` en `index.css` | ✅ |
| Calidad: lint + build | `build = tsc -b && vite build`; más `npm test` | ✅ |

**Re-evaluación post-diseño (Phase 1)**: sin violaciones nuevas. Los contratos y el data model
respetan II y V. La única desviación es estructural y está justificada abajo.

## Project Structure

### Documentation (this feature)

```text
specs/001-hero-base/
├── spec.md
├── plan.md              # este archivo
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/
│   ├── content-schema.md
│   └── head-meta.md
├── checklists/requirements.md
├── assets/
│   ├── foto-original.png   # fuente de la foto (no se publica)
│   └── og/                 # og.html + icon.html para exportar con Chrome headless
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
index.html                 # lang="es", placeholders del <head> que reemplaza el plugin
vite.config.ts             # react() + tailwindcss() + plugin inline site-meta
tsconfig.json              # references → app + node
tsconfig.app.json          # strict, noEmit, allowImportingTsExtensions, erasableSyntaxOnly
tsconfig.node.json         # vite.config.ts + scripts/
eslint.config.js           # typescript-eslint + react-hooks + react-refresh sobre ts/tsx
package.json               # scripts: dev, build, lint, test, check:links, preview

public/
├── favicon.svg            # pixel art "TM"
├── apple-touch-icon.png   # 180×180
├── og-image.png           # 1200×630
├── fonts/GeistPixel-{Square,Circle}.woff2
└── cv/tomas-de-miguel-cv.pdf   # PENDIENTE

scripts/
└── check-links.ts         # verificación de links antes del deploy

src/
├── main.tsx
├── App.tsx                # ErrorBoundary + SiteHeader + main(Hero) + SiteFooter; validación DEV
├── index.css              # @import tailwindcss, fuentes, @theme, @property, @utility, keyframes
├── vite-env.d.ts
├── types/content.ts
├── data/
│   ├── profile.ts
│   ├── sections.ts
│   └── site.ts            # sin imports de assets (lo usa vite.config.ts)
├── lib/
│   ├── validateContent.ts
│   └── validateContent.test.ts
├── assets/profile/        # tomas-320.avif, tomas-640.avif, tomas-640.jpg
└── components/
    ├── ErrorBoundary.tsx
    ├── SiteHeader.tsx
    ├── SiteFooter.tsx
    ├── sections/Hero.tsx
    └── ui/
        ├── Button.tsx
        ├── ContactLinks.tsx
        └── ProfileImage.tsx
```

**Se eliminan**: `src/App.jsx`, `src/main.jsx`, `src/App.css`, `src/assets/{react.svg,vite.svg,hero.png}`,
`public/icons.svg`, `vite.config.js` (pasa a `.ts`).

**Structure Decision**: proyecto único según la constitución. `SiteHeader`, `SiteFooter` y
`ErrorBoundary` van en `components/`: son layout, no secciones ni UI reutilizable sin contenido.
`ContactLinks` y `ProfileImage` van en `ui/` porque solo reciben datos por props y las
reutilizará Contacto.

## Decisiones de diseño clave

Detalle y alternativas en [research.md](./research.md).

| # | Decisión | Ref |
|---|---|---|
| 1 | TypeScript 6.0 fijado (`typescript-eslint` no soporta 7) | R1 |
| 2 | Pixel con woff2 oficiales en `public/fonts` + preload de Square; Sans y Mono con Fontsource variable | R2 |
| 3 | Paleta `#0a0a0a` / `#ededed` / acento ámbar `#ffb000` | R3 |
| 4 | Dot-dissolve: `mask-image` radial + `@property --dot-r` + `view()` exit | R4 |
| 5 | Footer `min-h-svh` para dar recorrido de scroll mientras no haya otras secciones | R5 |
| 6 | Foto AVIF 320/640 + JPEG; grises + tinte ámbar + viñeta en CSS; fallback "TDM" | R6 |
| 7 | `<head>` inyectado desde `site.ts`; OG y apple icon exportados con Chrome headless | R7 |
| 8 | Validación pura + `node --test`; filtro de links inválidos en prod | R8 |
| 9 | `check:links` antes de deploy (LinkedIn devuelve 999 y se verifica a mano) | R9 |
| 10 | ErrorBoundary propio con fallback `null` | R10 |
| 11 | Token `text-display` con `clamp()` | R11 |
| 12 | Header no fijo; `<nav>` solo si hay links; landscape en dos columnas | R12 |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Geist Pixel Square sin glifo "á" | Se verifica al inicio de implement; si falta, el fallback lo cubre y se documenta |
| Animar `mask` repinta y puede bajar Performance | Solo 2 elementos; se mide con Lighthouse y el panel Performance; plan B: animar `mask-size` |
| Fondo de plantas genera ruido en los puntos | Recorte cerrado + viñeta radial; si no alcanza, Tomás aporta una foto con fondo liso |
| CV pendiente | Bloquea solo el check final de US1 y `check:links`, no el resto de las tareas |

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Carpeta `src/lib/` (no está en el árbol de la constitución) | Funciones puras de validación, compartidas por todas las features y testeables con Node | En `data/` mezclaría lógica con contenido; dentro de componentes no se podrían testear sin React |
| Carpeta `scripts/` en la raíz | `check-links.ts`, exigido por el Principio V antes de cada deploy | Hacerlo a mano en cada deploy es propenso a olvidos |
| Pixel desde woff2 oficiales y Sans/Mono desde Fontsource (dos orígenes) | Fontsource no tiene Square ni Circle por separado | Un solo origen pierde las variantes o el subsetting |
