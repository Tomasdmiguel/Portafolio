# Implementation Plan: Experiencia

**Branch**: `003-experiencia` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-experiencia/spec.md`

## Summary

Agregar "Experiencia" debajo de "Sobre mí": línea de tiempo pixel con la experiencia en Seeker
Parking (puesto, período, contexto, 4 logros con dato destacado y etiquetas de tecnologías), todo
desde `src/data/experience.ts`. La navegación suma "Experiencia" y, como ya no entra en 360 px,
pasa a un menú compacto en móvil.

**Enfoque técnico**:
- Contenido tipado (`ExperienceContent`, `Experience`, `Highlight`) con validación pura, orden y
  formato de fechas testeados con `node --test`.
- Animaciones solo CSS: reusa `dot-assemble` y `reveal`; suma `timeline-draw` y `dot-line`.
- Menú móvil con el atributo nativo `popover`, sin dependencias.

## Technical Context

**Language/Version**: TypeScript ~6.0.3 (strict), React 19.3, Node 26.

**Primary Dependencies**: las de la feature 001. **Sin dependencias nuevas.**

**Storage**: N/A. Contenido estático en `src/data/experience.ts`.

**Testing**: `node --test` para las funciones puras nuevas; validación manual según
[quickstart.md](./quickstart.md); Lighthouse.

**Target Platform**: navegadores evergreen, móvil y desktop; animaciones como mejora progresiva.

**Project Type**: sitio web estático (SPA de una página) en Vercel Hobby.

**Performance Goals**: Lighthouse ≥ 90 en las 4 categorías (mobile y desktop); CLS < 0,1.

**Constraints**: sin JS de animación; sin arbitrary values; componentes ≤ 150 líneas; contenido en
español; WCAG AA; áreas táctiles de 44 px.

**Scale/Scope**: 1 sección nueva, 3 componentes nuevos (`Experience`, `ExperienceItem`, `Tag`),
1 archivo de data, ajustes en `SiteHeader`, `App`, `sections.ts`, `types/content.ts`,
`validateContent.ts` e `index.css`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| **I. Claridad** | Puesto, período y 4 logros cortos escaneables; español; costo cero | ✅ |
| **II. Contenido real y separado** | Resumen del CV aprobado por Tomás, en `src/data/experience.ts` tipado | ✅ |
| **III. Mobile-first** | Diseño desde 360 px; menú compacto en móvil; etiquetas con wrap | ✅ |
| **IV. A11y y rendimiento** | h2 → h3, `<ol>`/`<ul>`, `<time>`, "Actual" como texto, menú `popover` accesible con teclado | ✅ |
| **V. Mejora progresiva** | `@supports` + `motion-safe`; validación DEV + filtro en prod; sección oculta si está vacía; ErrorBoundary propio | ✅ |
| **VI. SDD** | Spec aprobado; rama `003-experiencia`; una sección = una feature | ✅ |
| Stack: animación solo CSS scroll-driven | `view()` + `animation-range` (R4) | ✅ |
| Sin dependencias nuevas | `popover` es nativo (R1) | ✅ |
| Sin arbitrary values | gradientes y escalas en `@utility` | ✅ |
| Estructura de carpetas | `sections/Experience.tsx`, `ui/Tag.tsx` y `data/experience.ts` están en el árbol de la constitución; `ExperienceItem.tsx` se separa por la regla de 150 líneas | ✅ |
| Calidad: lint + build | `npm run lint && npm run build && npm test` | ✅ |

**Re-evaluación post-diseño (Phase 1)**: sin violaciones nuevas.

## Project Structure

### Documentation (this feature)

```text
specs/003-experiencia/
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
├── App.tsx                      # + <Experience> con ErrorBoundary; validateExperience en DEV
├── index.css                    # + dot-line, timeline-draw
├── types/content.ts             # + YearMonth, Highlight, Experience, ExperienceContent
├── data/
│   ├── experience.ts            # NUEVO: Seeker Parking
│   └── sections.ts              # + 'experiencia' con hasContent calculado
├── lib/
│   ├── validateContent.ts       # + isValidYearMonth, formatMonth, isValidExperience,
│   │                            #   getValidExperiences, hasExperienceContent, validateExperience
│   └── validateContent.test.ts
└── components/
    ├── SiteHeader.tsx           # menú popover en < md
    ├── sections/
    │   ├── Experience.tsx       # NUEVO: sección + línea de tiempo
    │   └── ExperienceItem.tsx   # NUEVO: una experiencia
    └── ui/Tag.tsx               # NUEVO
```

**Structure Decision**: proyecto único, como la 001 y la 002.

## Decisiones de diseño clave

Detalle y alternativas en [research.md](./research.md).

| # | Decisión | Ref |
|---|---|---|
| 1 | Menú compacto con `popover` nativo en < `md`; lista en línea desde `md:` | R1 |
| 2 | Fechas `'YYYY-MM'` y formato propio "Sep 2024 – Actualidad" | R2 |
| 3 | Logros `{ lead?, text }` con `lead` destacado en ámbar | R3 |
| 4 | Línea de tiempo de puntos que se dibuja con el scroll; marcador ámbar + "Actual" | R4 |
| 5 | `<ol>` de `<article>` con h3; `<time dateTime>` | R5 |
| 6 | `ui/Tag` reutilizable (lo usa Stack después) | R6 |
| 7 | Sin `min-h-svh` en Experiencia | R7 |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| El popover se posiciona en el centro por defecto (estilos del UA) | Se fija con clases (`inset-auto`, `top-15`, `right-4`) y se verifica en 360 px |
| Navegar desde un link dentro del popover no lo cierra | `onClick` que llama a `hidePopover()`; se verifica en quickstart §3 |
| La línea de puntos con `scale-y` se ve estirada | Se anima con `clip-path` (`inset(0 0 100% 0)` → `inset(0)`) si los puntos se deforman |
| Cambios en el header rompen la primera pantalla del Hero | El header mantiene `h-15`; quickstart de la 001 §2 sigue vigente |

## Complexity Tracking

Sin violaciones a justificar.
