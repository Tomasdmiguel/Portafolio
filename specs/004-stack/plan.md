# Implementation Plan: Stack

**Branch**: `004-stack` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-stack/spec.md`

## Summary

Agregar "Stack" debajo de "Experiencia": grilla de 6 tarjetas, una por categoría, con las
tecnologías como etiquetas (`ui/Tag` de la 003) y "IA aplicada" destacada en ámbar. Todo desde
`src/data/stack.ts`. La navegación suma "Stack"; el menú móvil de la 003 ya escala.

**Enfoque técnico**: contenido tipado (`StackContent`, `StackGroup`) con validación pura y tests
en `node --test`; un componente nuevo; animaciones reutilizadas (`dot-assemble`, `reveal`).

## Technical Context

**Language/Version**: TypeScript ~6.0.3 (strict), React 19.3, Node 26.

**Primary Dependencies**: las de la feature 001. **Sin dependencias nuevas.**

**Storage**: N/A. Contenido estático en `src/data/stack.ts`.

**Testing**: `node --test` para las funciones puras nuevas; validación manual según
[quickstart.md](./quickstart.md); Lighthouse.

**Target Platform**: navegadores evergreen, móvil y desktop; animaciones como mejora progresiva.

**Project Type**: sitio web estático (SPA de una página) en Vercel Hobby.

**Performance Goals**: Lighthouse ≥ 90 en las 4 categorías (mobile y desktop); CLS < 0,1.

**Constraints**: sin JS de animación; sin arbitrary values; componentes ≤ 150 líneas; contenido en
español; WCAG AA.

**Scale/Scope**: 1 sección nueva, 1 componente nuevo (`Stack`), 1 archivo de data, ajustes en
`App`, `sections.ts`, `types/content.ts` y `validateContent.ts`. Sin CSS nuevo.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| **I. Claridad** | Categorías escaneables, sin prosa; español | ✅ |
| **II. Contenido real y separado** | Habilidades del CV aprobadas por Tomás (sin marcas de IA), en `src/data/stack.ts` tipado; nombres accesibles derivados de la data | ✅ |
| **III. Mobile-first** | 1 columna en 360 px; 2 y 3 desde `sm:`/`lg:` | ✅ |
| **IV. A11y y rendimiento** | h2 → h3, listas con nombre accesible, contraste AA del ámbar | ✅ |
| **V. Mejora progresiva** | Reusa utilities dentro de `@supports` + `motion-safe`; validación DEV + filtro en prod; ErrorBoundary propio | ✅ |
| **VI. SDD** | Spec aprobado; rama `004-stack`; una sección = una feature. Plan, tareas y análisis en un solo paso, a pedido de Tomás, sin saltear ninguno | ✅ |
| Sin dependencias nuevas | — | ✅ |
| Sin arbitrary values | Solo clases del scale | ✅ |
| Estructura de carpetas | `sections/Stack.tsx` y `data/stack.ts` están en el árbol de la constitución | ✅ |
| Calidad: lint + build | `npm run lint && npm run build && npm test` | ✅ |

**Re-evaluación post-diseño (Phase 1)**: sin violaciones.

## Project Structure

### Documentation (this feature)

```text
specs/004-stack/
├── spec.md
├── plan.md              # este archivo
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/content-schema.md
├── checklists/requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── App.tsx                    # + <Stack> con ErrorBoundary; validateStack en DEV
├── types/content.ts           # + StackGroup, StackContent
├── data/
│   ├── stack.ts               # NUEVO: 6 categorías
│   └── sections.ts            # + 'stack' con hasContent calculado
├── lib/
│   ├── validateContent.ts     # + getValidStackGroups, hasStackContent, validateStack
│   └── validateContent.test.ts
└── components/sections/
    └── Stack.tsx              # NUEVO
```

**Structure Decision**: proyecto único, como las features anteriores.

## Decisiones de diseño clave

Detalle y alternativas en [research.md](./research.md).

| # | Decisión | Ref |
|---|---|---|
| 1 | Grilla de tarjetas 1 / 2 / 3 columnas | R1 |
| 2 | "IA aplicada" con borde y título ámbar; marcador píxel en todas | R2 |
| 3 | `<ul>` de categorías; listas de etiquetas con `aria-labelledby` al h3 | R3 |
| 4 | Sin CSS nuevo: `dot-assemble` y `reveal` | R4 |
| 5 | Duplicados por categoría, sin distinguir mayúsculas | R5 |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Tarjetas de distinto alto desalinean la grilla | Grilla con filas de alto automático; se revisa en 768 y 1280 |
| "Stack" queda última hasta Formación/Contacto y alguna animación no termina | Tarjetas más bajas que la pantalla con rango `entry`; quickstart §4 lo revisa al final de la página |

## Complexity Tracking

Sin violaciones a justificar.
