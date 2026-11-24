---
description: "Lista de tareas de la feature 004 (Stack)"
---

# Tasks: Stack

**Input**: documentos de diseño en `/specs/004-stack/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/content-schema.md](./contracts/content-schema.md),
[quickstart.md](./quickstart.md)

**Tests**: `node --test` para las funciones puras nuevas (Principio V). El resto, con
[quickstart.md](./quickstart.md) y Lighthouse.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede hacer en paralelo (otro archivo, sin dependencias pendientes)
- **[Story]**: historia del spec a la que pertenece (US1, US2, US3, US4)

---

## Phase 1: Setup

- [X] T001 Verificar que `npm run lint && npm run build && npm test` pasan en la rama `004-stack` antes de tocar código

---

## Phase 2: Foundational (bloquea todas las historias)

- [X] T002 Agregar en `src/types/content.ts`, con JSDoc en español: `StackGroup { name: string; note?: string; featured?: boolean; items: readonly string[] }` y `StackContent { title: string; groups: readonly StackGroup[] }`
- [X] T003 Crear `src/data/stack.ts` que exporte `stack: StackContent` con `title: 'Stack'` y estas 6 categorías, en orden:
  1. `{ name: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Vite', 'HTML', 'CSS', 'Tailwind CSS', 'Diseño responsive'] }`
  2. `{ name: 'Estado y datos', items: ['Redux', 'Zustand', 'Context API', 'TanStack Query', 'APIs REST'] }`
  3. `{ name: 'Formularios y validación', items: ['React Hook Form', 'Zod', 'Yup'] }`
  4. `{ name: 'IA aplicada', featured: true, items: ['AI-Driven Development', 'Spec-Driven Development', 'Desarrollo agéntico'] }` (sin marcas de IA)
  5. `{ name: 'Herramientas', items: ['Git', 'GitHub', 'GitLab', 'Docker', 'Figma', 'Jira', 'Scrum'] }`
  6. `{ name: 'Backend', note: 'Conocimientos', items: ['Node.js', 'Express', 'NestJS', 'Supabase', 'PostgreSQL'] }`
- [X] T004 Escribir tests en `src/lib/validateContent.test.ts` (deben fallar antes de T005):
  - `getValidStackGroups` descarta categorías con `name` vacío o sin ítems válidos, conserva el orden, descarta ítems vacíos y repetidos dentro de una categoría (comparando sin espacios a los lados y sin distinguir mayúsculas; queda la primera aparición, recortada)
  - `hasStackContent` es `false` con `groups: []` o solo categorías inválidas
  - `validateStack(stack)` del contenido real devuelve `[]`
  - `validateStack` reporta `stack.title` y `stack.groups[i].name` ("no puede estar vacío"), `stack.groups` ("debe tener al menos 1 categoría válida"), `stack.groups[i].items` ("debe tener al menos 1 tecnología"), `stack.groups[i].items[j]` ("no puede estar vacío" o "está repetido") y `stack.groups` ("solo una categoría puede estar destacada") si hay más de una con `featured: true`
- [X] T005 Implementar `getValidStackGroups`, `hasStackContent` y `validateStack` en `src/lib/validateContent.ts` (sección `// ---- Stack (feature 004) ----`); `npm test` en verde

**Checkpoint**: tipos, data y validación listos.

---

## Phase 3: User Story 1 - El reclutador ve con qué tecnologías trabaja (Priority: P1) 🎯 MVP

**Independent Test**: `npm run dev`, bajar hasta "Stack" en 360 y 1280: 6 categorías con nombre y
etiquetas; "Backend" con "Conocimientos"; con `groups: []` la sección no aparece.

- [X] T006 [US1] Crear `src/components/sections/Stack.tsx` (`{ stack: StackContent }`): `null` si `!hasStackContent(stack)`; si no, `<section id="stack" aria-labelledby="stack-title">` con `mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:px-8`, `SectionTitle` y un `<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">` de `getValidStackGroups(stack)`; cada `<li>` es una tarjeta `flex flex-col gap-4 border border-border bg-surface p-5` con `<h3 id={\`stack-group-${i}\`}>` (Geist Mono, `text-sm tracking-wide uppercase`, `text-fg`), la `note` en `<p className="text-xs text-muted">` si existe y no está vacía, y `<ul aria-labelledby={\`stack-group-${i}\`} className="flex flex-wrap gap-2">` con un `Tag` por ítem (R1, R3); sin texto hardcodeado; ≤ 150 líneas
- [X] T007 [US1] Montar `<ErrorBoundary name="Stack"><Stack stack={stack} /></ErrorBoundary>` en `<main>` después de "Experiencia" y sumar `validateStack(stack)` a los avisos de DEV en `src/App.tsx` (FR-011, FR-012)
- [X] T008 [US1] Verificar quickstart §2 (contenido, columnas y tamaños) y §5 (`groups: []`, categoría con ítems vacíos y `throw` en `Stack`)

---

## Phase 4: User Story 2 - La IA se destaca (Priority: P2)

- [X] T009 [US2] En `src/components/sections/Stack.tsx`: marcador cuadrado `size-2` con `aria-hidden="true"` antes del texto del `h3` (en fila con `flex items-center gap-2`), `bg-accent` si `featured` y `bg-border` si no; con `featured`, la tarjeta usa `border-accent` en lugar de `border-border` y el `h3` `text-accent` (R2, FR-004)
- [X] T010 [US2] Verificar en 360 y 1280 que solo "IA aplicada" se ve en ámbar y que el título ámbar sobre `bg-surface` cumple contraste AA

---

## Phase 5: User Story 3 - La sección entra por los ojos (Priority: P2)

- [X] T011 [US3] Aplicar `motion-safe:reveal` a cada tarjeta (`<li>`) en `src/components/sections/Stack.tsx`; el título ya usa `dot-assemble` vía `SectionTitle` (R4)
- [X] T012 [US3] Verificar quickstart §4: con el scroll al final de la página todas las tarjetas quedan opacas y nítidas; con movimiento reducido y sin soporte, todo estático

---

## Phase 6: User Story 4 - Navegación (Priority: P3)

- [X] T013 [US4] Agregar `{ id: 'stack', label: 'Stack', hasContent: hasStackContent(stack) }` después de `experiencia` en `src/data/sections.ts`
- [X] T014 [US4] Verificar quickstart §3 en 360 (menú móvil) y 1280 (en línea): los 4 links entran sin romper el header de 60 px

---

## Phase 7: Polish & Cross-Cutting

- [X] T015 [P] Revisar la jerarquía de títulos (un `h1`, `h2` por sección, `h3` por categoría y por puesto) y el recorrido con teclado
- [X] T016 [P] Actualizar `README.md`: fila "Stack | `src/data/stack.ts`" en la tabla de secciones y "stack" en el comentario de `data/`
- [ ] T017 Correr `npm run lint && npm run build && npm test`; Lighthouse ≥ 90 en las 4 categorías y CLS < 0,1 sobre el preview (lo corre Tomás desde DevTools, porque el preview está protegido) (SC-002, SC-003)
- [ ] T018 Tomás commitea y abre el PR de `004-stack` a `master`; después del merge (sin squash), `npm run check:links` en producción
- [ ] T019 Prueba de lectura con 5 personas: en 10 s nombran 3 tecnologías de frontend y que trabaja con IA (SC-001). La hace Tomás

---

## Análisis (2026-11-24)

Corrido en el mismo paso que plan y tareas, a pedido de Tomás: 12 FR y 5 SC con cobertura del
100%, sin conflictos con la constitución, sin ambigüedades ni duplicados.

## Notas de implementación (2026-11-24)

- Tests: 34 en verde (5 nuevos de Stack).
- 1280: 3 columnas; 768, 740×360 y 640×400 (≈ zoom 200%): 2; 360: 1. Sin scroll horizontal.
- Con el scroll al final de la página, las 6 tarjetas quedan opacas (la primera medición daba
  0,43 en la última fila porque el scroll suave no había terminado).
- Navegación: "Inicio", "Sobre mí", "Experiencia" y "Stack".
- Resiliencia: con un `throw` en `Stack`, el resto sigue; una categoría con ítems vacíos no se
  muestra y hay 2 avisos `[contenido]` en DEV.
- Pendiente de T017: Lighthouse sobre el preview (Tomás, desde DevTools).

---

## Dependencies & Execution Order

- **Setup (1)** → **Foundational (2)** → historias → **Polish (7)**.
- US1 depende de la fase 2. US2 y US3 modifican `Stack.tsx`: van después de US1.
- US4 (T013) solo depende de la fase 2 y toca otro archivo: puede ir en paralelo con US2/US3.
- T004 antes de T005; T006 antes de T007, T009 y T011.

### Parallel Opportunities

- T013 en paralelo con T009–T011.
- T015 y T016 en paralelo.

## Implementation Strategy

1. Fases 1 y 2, después US1 (MVP): **parar y validar** que la sección se lee.
2. US2 y US3 (destaque y animación) y US4 (navegación).
3. Polish: README, Lighthouse, PR y deploy.
