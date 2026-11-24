# Implementation Plan: Contacto

**Branch**: `007-contacto` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

## Summary

Última sección: "¿Hablamos?", mensaje breve, email destacado con botón de copiar, y LinkedIn,
GitHub y CV reutilizando los componentes del Hero. Una sola fuente de links (`contactLinks.ts`).

## Technical Context

**Language/Version**: TypeScript ~6.0.3 (strict), React 19.3, Node 26.
**Primary Dependencies**: sin dependencias nuevas.
**Storage**: N/A (`src/data/contactLinks.ts`).
**Testing**: `node --test` para las funciones puras; [quickstart.md](./quickstart.md).
**Project Type**: SPA estática en Vercel Hobby.
**Constraints**: sin JS de animación (el copiado es interacción, no animación); sin arbitrary
values; componentes ≤ 150 líneas; WCAG AA.
**Scale/Scope**: 1 sección, 2 componentes (`Contact`, `CopyButton`), ajustes en
`contactLinks.ts`, `types`, `validateContent`, `sections.ts`, `App` y `README`.

## Constitution Check

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| I. Claridad | Un solo foco (email) y links siempre visibles; costo cero (sin formulario ni servicios) | ✅ |
| II. Contenido separado | Textos en `contactLinks.ts`; links y CV de la misma data que el Hero | ✅ |
| III. Mobile-first | Email con `break-all`; botones de 44 px | ✅ |
| IV. A11y | h2, confirmación en `aria-live`, foco visible, links externos anunciados (ya en el Hero) | ✅ |
| V. Mejora progresiva | Botón de copiar solo si hay portapapeles; `reveal` con `motion-safe`; ErrorBoundary | ✅ |
| VI. SDD | Spec + plan + tareas + análisis en un paso (pedido de Tomás); rama `007-contacto` | ✅ |
| Stack: sin JS de animación | `useState` + `setTimeout` para la confirmación de copiado; no anima | ✅ |
| Estructura | `sections/Contact.tsx` y `data/contactLinks.ts` en el árbol; `ui/CopyButton.tsx` es un componente reutilizable sin contenido propio | ✅ |

## Project Structure

```text
src/
├── App.tsx                    # + <Contact> con ErrorBoundary; validateContact en DEV
├── types/content.ts           # + ContactContent
├── data/
│   ├── contactLinks.ts        # + export contact
│   └── sections.ts            # + 'contacto'
├── lib/validateContent.ts (+ test)  # + getEmailAddress, hasContactContent, validateContact
└── components/
    ├── sections/Contact.tsx   # NUEVO
    └── ui/CopyButton.tsx      # NUEVO
```

## Decisiones (detalle en [research.md](./research.md))

| # | Decisión | Ref |
|---|---|---|
| 1 | Textos en `contactLinks.ts`, links y CV compartidos con el Hero | R1 |
| 2 | `CopyButton` con portapapeles nativo, confirmación sin mover el layout | R2 |
| 3 | Email grande en Geist Mono ámbar; links y CV del Hero | R3 |
| 4 | Sin CSS nuevo | R4 |
| 5 | Verificar 6 links en el header desde 768 px | R5 |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| 6 links no entran en el header a 768 px | Mover el menú compacto a `< lg` (R5) |
| El cambio de texto del botón mueve el layout | Ancho mínimo fijo del botón |

## Complexity Tracking

Sin violaciones.
