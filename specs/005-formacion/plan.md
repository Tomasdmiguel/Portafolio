# Implementation Plan: Formación

**Branch**: `005-formacion` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-formacion/spec.md`

## Summary

Agregar "Formación" debajo de "Stack": tarjetas "Título" e "Idiomas" (del CV) y una tarjeta
"Certificaciones" agrupada por categoría que aparece sola cuando `certifications.ts` tenga ítems.
La navegación suma "Formación" y `check:links` verifica las URLs de certificados.

**Enfoque técnico**: contenido tipado en `education.ts` y `certifications.ts`, validación pura con
tests en `node --test`, dos componentes (`Education`, `CertificationList`), estilo y animaciones
reutilizados de Stack. Sin CSS ni dependencias nuevas.

## Technical Context

**Language/Version**: TypeScript ~6.0.3 (strict), React 19.3, Node 26.

**Primary Dependencies**: las de la feature 001. **Sin dependencias nuevas.**

**Storage**: N/A. Contenido estático en `src/data/education.ts` y `src/data/certifications.ts`.

**Testing**: `node --test`; [quickstart.md](./quickstart.md); Lighthouse.

**Target Platform**: navegadores evergreen, móvil y desktop.

**Project Type**: sitio web estático (SPA de una página) en Vercel Hobby.

**Performance Goals**: Lighthouse ≥ 90; CLS < 0,1.

**Constraints**: sin JS de animación; sin arbitrary values; componentes ≤ 150 líneas; WCAG AA.

**Scale/Scope**: 1 sección, 2 componentes, 2 archivos de data, ajustes en `App`, `sections.ts`,
`types/content.ts`, `validateContent.ts`, `scripts/check-links.ts` y `README.md`.

## Constitution Check

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| **I. Claridad** | Tarjetas cortas y escaneables; español | ✅ |
| **II. Contenido real y separado** | Título e idiomas del CV; certificaciones vacías hasta tener datos reales; categorías como unión cerrada `'ai' \| 'english' \| 'frontend' \| 'backend'`; agregar un certificado = editar solo `certifications.ts` | ✅ |
| **III. Mobile-first** | Apilado en 360 px; 2 columnas desde `md:`; links de 44 px de alto | ✅ |
| **IV. A11y** | h2 → h3 → h4, `<dl>` para idiomas, aviso de pestaña nueva para lectores | ✅ |
| **V. Mejora progresiva** | `reveal` con `motion-safe`; validación DEV + filtro; links externos con `noopener noreferrer`; `check:links` incluye certificados; ErrorBoundary | ✅ |
| **VI. SDD** | Spec, plan, tareas y análisis en un paso (pedido de Tomás); rama `005-formacion` | ✅ |
| Sin dependencias ni arbitrary values | — | ✅ |
| Estructura | `sections/Education.tsx`, `data/education.ts` y `data/certifications.ts` en el árbol; `CertificationList.tsx` se separa por la regla de 150 líneas | ✅ |

**Re-evaluación post-diseño**: sin violaciones.

## Project Structure

```text
specs/005-formacion/
├── spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md
├── contracts/content-schema.md
└── checklists/requirements.md

src/
├── App.tsx                         # + <Education> con ErrorBoundary; validaciones en DEV
├── types/content.ts                # + Degree, Language, EducationContent, Certification…
├── data/
│   ├── education.ts                # NUEVO
│   ├── certifications.ts           # NUEVO (items: [])
│   └── sections.ts                 # + 'formacion'
├── lib/validateContent.ts (+ test) # + funciones de R4
└── components/sections/
    ├── Education.tsx               # NUEVO
    └── CertificationList.tsx       # NUEVO
scripts/check-links.ts              # + URLs de certificaciones
```

## Decisiones de diseño clave

| # | Decisión | Ref |
|---|---|---|
| 1 | Dos archivos de data; certificaciones vacías hasta tener la lista real | R1 |
| 2 | Tarjetas de Stack; Título e Idiomas lado a lado; Certificaciones a todo el ancho | R2 |
| 3 | `<dl>` para idiomas; `h4` por categoría; aviso de pestaña nueva desde la data | R3 |
| 4 | Validación pura que reusa `isValidYearMonth`, `formatMonth` e `isHttpsUrl` | R4 |
| 5 | Sin CSS nuevo | R5 |
| 6 | `check:links` con certificados | R6 |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| El bloque de certificaciones no se ve en producción hasta tener datos | Quickstart §3 lo prueba con datos de prueba, sin commitearlos |
| Platzi bloquea bots en `check:links` | Si responde 403/999, se marca para verificar a mano como LinkedIn (se evalúa al cargar los datos) |

## Complexity Tracking

Sin violaciones a justificar.
