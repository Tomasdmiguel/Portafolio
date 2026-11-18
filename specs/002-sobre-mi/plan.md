# Implementation Plan: Sobre mí

**Branch**: `002-sobre-mi` | **Date**: 2026-11-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-sobre-mi/spec.md`

## Summary

Agregar la sección "Sobre mí" debajo del Hero: título en Geist Pixel que se "arma" en puntos al
entrar en pantalla, un bloque de 4 datos rápidos y los 4 párrafos de Tomás, todo desde
`src/data/about.ts`. La navegación del header se activa ("Inicio" y "Sobre mí").

**Enfoque técnico**:
- Contenido tipado (`About`, `QuickFact`) con validación pura y tests en `node --test`.
- Animaciones solo CSS con `view()` por elemento y rango `entry` (utilities `dot-assemble` y
  `reveal`), dentro de `@supports` y con `motion-safe`.
- Layout: header de altura fija (`h-15`) y Hero con la utility `hero-screen`, para que `<main>`
  contenga Hero y Sobre mí. "Sobre mí" con `min-h-svh` da el recorrido que antes daba el pie.

## Technical Context

**Language/Version**: TypeScript ~6.0.3 (strict), React 19.3, Node 26.

**Primary Dependencies**: las de la feature 001. **Sin dependencias nuevas.**

**Storage**: N/A. Contenido estático en `src/data/about.ts`.

**Testing**: `node --test` para las funciones puras nuevas; validación manual según
[quickstart.md](./quickstart.md); Lighthouse.

**Target Platform**: navegadores evergreen, móvil y desktop; animaciones como mejora progresiva.

**Project Type**: sitio web estático (SPA de una página) en Vercel Hobby.

**Performance Goals**: Lighthouse ≥ 90 en las 4 categorías (mobile y desktop); CLS < 0,1; sin
long tasks al scrollear.

**Constraints**: sin JS de animación; sin arbitrary values; componentes ≤ 150 líneas; contenido en
español; WCAG AA; áreas táctiles de 44 px.

**Scale/Scope**: 1 sección nueva, 2 componentes nuevos (`About`, `SectionTitle`), 1 archivo de
data, ajustes en `SiteHeader`, `SiteFooter`, `Hero`, `App`, `sections.ts` e `index.css`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| **I. Claridad** | Datos rápidos escaneables y texto corto (< 1 min); español; costo cero | ✅ |
| **II. Contenido real y separado** | Texto real entregado por Tomás, en `src/data/about.ts` tipado; el componente no tiene texto | ✅ |
| **III. Mobile-first** | Diseño desde 360 px; grilla de 2 columnas solo desde `md:`; `max-w-prose` | ✅ |
| **IV. A11y y rendimiento** | Un `h2` por sección, `<dl>` para los datos, foco visible, contraste del 001; Lighthouse ≥ 90 | ✅ |
| **V. Mejora progresiva** | `@supports` + `motion-safe`; sin soporte todo visible; validación DEV + filtro en prod; sección oculta si está vacía; ErrorBoundary propio | ✅ |
| **VI. SDD** | Spec aprobado; rama `002-sobre-mi`; una sección = una feature | ✅ |
| Stack: animación solo CSS scroll-driven | `view()` + `animation-range` (R1) | ✅ |
| Sin dependencias nuevas | — | ✅ |
| Sin arbitrary values | `h-15` del scale; el `calc()` vive en `@utility hero-screen` | ✅ |
| Animaciones como `@utility` | `dot-assemble`, `reveal`, `hero-screen` | ✅ |
| Estructura de carpetas | `sections/About.tsx` y `ui/SectionTitle.tsx` están en el árbol; `data/about.ts` no (ver Complexity Tracking) | ⚠️ justificado |
| Calidad: lint + build | `npm run lint && npm run build && npm test` | ✅ |

**Re-evaluación post-diseño (Phase 1)**: sin violaciones nuevas. Los contratos respetan II y V.

## Project Structure

### Documentation (this feature)

```text
specs/002-sobre-mi/
├── spec.md
├── plan.md              # este archivo
├── research.md          # Phase 0
├── data-model.md        # Phase 1
├── quickstart.md        # Phase 1
├── contracts/content-schema.md
├── checklists/requirements.md
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── App.tsx                    # <main> con Hero + About (cada uno con ErrorBoundary); validateAbout en DEV
├── index.css                  # + hero-screen, dot-assemble, reveal; scroll suave con motion OK
├── types/content.ts           # + About, QuickFact
├── data/
│   ├── about.ts               # NUEVO: título, 4 párrafos, 4 datos rápidos
│   └── sections.ts            # + 'sobre-mi' con hasContent calculado
├── lib/
│   ├── validateContent.ts     # + getValidParagraphs, getValidFacts, hasAboutContent, validateAbout
│   └── validateContent.test.ts
└── components/
    ├── SiteHeader.tsx         # h-15; nav con todas las secciones con contenido si hay ≥ 2
    ├── SiteFooter.tsx         # sin min-h-svh
    ├── sections/
    │   ├── Hero.tsx           # hero-screen en lugar de flex-1
    │   └── About.tsx          # NUEVO
    └── ui/SectionTitle.tsx    # NUEVO: h2 pixel con dot-assemble
```

**Structure Decision**: proyecto único, igual que la 001. `SectionTitle` va en `ui/` porque lo
van a reutilizar todas las secciones siguientes.

## Decisiones de diseño clave

Detalle y alternativas en [research.md](./research.md).

| # | Decisión | Ref |
|---|---|---|
| 1 | Título que se "arma" en puntos y contenido que aparece, con `view()` + `entry 0% entry 100%` | R1 |
| 2 | Navegación con todas las secciones con contenido (incluida "Inicio") cuando hay ≥ 2; reemplaza R12 de la 001 | R2 |
| 3 | `hasContent` de "Sobre mí" calculado desde la data | R2 |
| 4 | Header `h-15` + Hero `hero-screen`; "Sobre mí" `min-h-svh`; pie sin `min-h-svh` (reemplaza R5 de la 001) | R3 |
| 5 | `<dl>` para datos rápidos; DOM: título → datos → párrafos; 2 columnas desde `md:` | R4 |
| 6 | "Cómo trabajo" como texto plano hasta que exista la sección | R4 |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| El header de altura fija no alcanza cuando haya más secciones en la navegación | Hoy entran en una línea en 360 px; la feature que agregue la 3.ª o 4.ª sección suma un menú compacto en móvil |
| `--spacing()` dentro de `calc()` no compila en Tailwind 4.3 | Se verifica en el build al implementar; plan B: token `--header-h` en `@theme static` |
| La máscara de puntos del título no se lee bien en 360 px | Se revisa en el celular; se puede usar una celda más chica solo para títulos |
| Cambiar el layout del Hero rompe lo validado en la 001 (primera pantalla, landscape) | Quickstart §2 repite las medidas de la 001 |

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `src/data/about.ts` no figura en la lista de archivos de data de la constitución | Contenido propio de la sección, separado del Hero | Dentro de `profile.ts` mezcla dos secciones; se propone sumarlo a la constitución en la enmienda v1.1.1 pendiente (junto con `src/lib/` y `scripts/`) |
