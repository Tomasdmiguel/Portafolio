---
description: "Lista de tareas de la feature 002 (Sobre mí)"
---

# Tasks: Sobre mí

**Input**: documentos de diseño en `/specs/002-sobre-mi/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/content-schema.md](./contracts/content-schema.md),
[quickstart.md](./quickstart.md)

**Tests**: el plan pide tests con `node --test` para las funciones puras nuevas de validación
(Principio V). El resto se valida a mano con [quickstart.md](./quickstart.md) y Lighthouse.

**Organization**: tareas agrupadas por historia de usuario para implementarlas y probarlas por
separado.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede hacer en paralelo (otro archivo, sin dependencias pendientes)
- **[Story]**: historia del spec a la que pertenece (US1, US2, US3, US4)

---

## Phase 1: Setup

**Purpose**: confirmar el punto de partida. No hay dependencias nuevas.

- [X] T001 Verificar que `npm run lint && npm run build && npm test` pasan en la rama `002-sobre-mi` antes de tocar código (15 tests de la 001 en verde)

---

## Phase 2: Foundational (bloquea todas las historias)

**Purpose**: tipos, contenido, validación y el layout que permite tener dos secciones en `<main>`.

**⚠️ CRITICAL**: ninguna historia se puede empezar sin esta fase.

### Tipos y contenido

- [X] T002 Agregar las interfaces `QuickFact { label: string; value: string }` y `About { title: string; paragraphs: readonly string[]; facts: readonly QuickFact[] }` en `src/types/content.ts`, con comentarios JSDoc en español
- [X] T003 Crear `src/data/about.ts` que exporte `about: About` con `title: 'Sobre mí'`, los 4 párrafos del spec (Assumptions → Contenido) en orden y literales, y los 4 datos rápidos: Base → "Tandil, Argentina · Remoto"; Experiencia → "2 años en productos SaaS"; Enfoque → "Frontend · AI-Driven Development"; Busco → "crecer como Software Engineer en equipos de afuera"

### Validación (tests primero)

- [X] T004 Escribir tests en `src/lib/validateContent.test.ts` (deben fallar antes de T005):
  - `getValidParagraphs` descarta párrafos vacíos o solo con espacios y conserva el orden
  - `getValidFacts` descarta datos con `label` o `value` vacíos
  - `hasAboutContent` es `false` con `paragraphs: []` y con párrafos solo vacíos; `true` con al menos un párrafo con texto
  - `validateAbout(about)` del contenido real devuelve `[]`
  - `validateAbout` reporta `about.title` "no puede estar vacío", `about.paragraphs` "debe tener al menos 1 párrafo", `about.paragraphs[i]` "no puede estar vacío" y `about.facts[i].label` / `about.facts[i].value` "no puede estar vacío"
- [X] T005 Implementar `getValidParagraphs(about): string[]`, `getValidFacts(about): QuickFact[]`, `hasAboutContent(about): boolean` (= `getValidParagraphs(about).length > 0`) y `validateAbout(about): ValidationIssue[]` en `src/lib/validateContent.ts`; `npm test` en verde

### Layout de la primera pantalla (R3)

- [X] T006 Agregar en `src/index.css` la `@utility hero-screen { min-height: calc(100svh - --spacing(15)); }`; si `--spacing()` no compila dentro de `calc()`, usar el plan B del plan: token `--header-h` en `@theme static`
- [X] T007 Darle al header altura fija en `src/components/SiteHeader.tsx`: reemplazar el `py-2` del `<header>` por `h-15`; los links mantienen `min-h-11` (áreas táctiles de 44 px)
- [X] T008 Cambiar `flex-1` por `hero-screen` en el contenedor del Hero en `src/components/sections/Hero.tsx`, sin tocar el resto del layout con o sin foto
- [X] T009 Reestructurar `src/App.tsx`: sacar el contenedor `flex min-h-svh flex-col`; quedan `<SiteHeader/>`, `<main>` (por ahora solo con el Hero en su `ErrorBoundary`) y `<SiteFooter/>`
- [X] T010 Verificar en 360×740, 1280×800 y 740×360 que el Hero sigue ocupando la primera pantalla junto con el header, igual que en la 001 (quickstart §2, último ítem)

**Checkpoint**: tipos, data y validación listos; el sitio se ve igual que en producción.

---

## Phase 3: User Story 1 - El visitante conoce a Tomás como persona (Priority: P1) 🎯 MVP

**Goal**: debajo del Hero aparece "Sobre mí" con su título y los 4 párrafos, todo desde la data.

**Independent Test**: `npm run dev`, scrollear debajo del Hero y leer los 4 párrafos en orden en
360 y en 1280, sin scroll horizontal; con `paragraphs: []` la sección no aparece.

- [X] T011 [P] [US1] Crear `src/components/ui/SectionTitle.tsx` (`{ id: string; children: ReactNode }`): `<h2 id={id}>` en Geist Pixel (`font-pixel`), acento ámbar y tamaño responsivo, sin animación todavía
- [X] T012 [US1] Crear `src/components/sections/About.tsx` (`{ about: About }`): devuelve `null` si `!hasAboutContent(about)`; si no, `<section id="sobre-mi" aria-labelledby="sobre-mi-title">` con `min-h-svh` y contenido centrado verticalmente, `SectionTitle` y los párrafos de `getValidParagraphs` con `max-w-prose`; sin texto hardcodeado; ≤ 150 líneas
- [X] T013 [US1] Montar `<ErrorBoundary name="Sobre mí"><About about={about} /></ErrorBoundary>` dentro de `<main>`, después del Hero, en `src/App.tsx`
- [X] T014 [US1] Sumar `validateAbout(about)` a los avisos de DEV en `src/App.tsx` (FR-013)
- [X] T015 [US1] Sacar `min-h-svh` y `justify-end` de `src/components/SiteFooter.tsx` para que vuelva a ser un pie chico (FR-014)
- [X] T016 [US1] Verificar quickstart §2 (contenido en 360×740, 768×1024, 1280×800, 740×360 y zoom 200%) y §5 (párrafos vacíos y `throw` en `About`: el resto del sitio sigue)

**Checkpoint**: MVP: la sección se lee completa y es resistente a fallas.

---

## Phase 4: User Story 2 - El reclutador escanea los datos clave (Priority: P2)

**Goal**: bloque de 4 datos rápidos escaneable y accesible.

**Independent Test**: mirar solo el bloque en 360 y 1280; con lector de pantalla cada valor se
anuncia junto a su etiqueta; vaciar un `value` lo oculta y avisa en DEV.

- [X] T017 [US2] Agregar en `src/components/sections/About.tsx` el bloque `<dl>` con `<dt>`/`<dd>` a partir de `getValidFacts(about)`; no se renderiza si queda vacío; en el DOM va entre el título y los párrafos (R4)
- [X] T018 [US2] Layout en `src/components/sections/About.tsx`: apilado en móvil (datos y después párrafos); desde `md:` grilla de dos columnas con los párrafos a la izquierda (`max-w-prose`) y los datos a la derecha, ubicados con `md:col-start-2 md:row-start-1` sin cambiar el orden del DOM; etiquetas en Geist Mono con color secundario, valores con contraste AA
- [X] T019 [US2] Verificar quickstart §2 (columnas en 1280, apilado en 360) y §5 (dato con `value: ''`)

**Checkpoint**: US1 y US2 funcionan juntas.

---

## Phase 5: User Story 3 - El visitante navega entre secciones desde el header (Priority: P2)

**Goal**: el header muestra "Inicio" y "Sobre mí" y los links llevan a cada sección.

**Independent Test**: los dos links funcionan con mouse y con Tab + Enter; `/#sobre-mi` abre en la
sección; con `paragraphs: []` no hay `<nav>`.

- [X] T020 [US3] Agregar `{ id: 'sobre-mi', label: 'Sobre mí', hasContent: hasAboutContent(about) }` después de `inicio` en `src/data/sections.ts`
- [X] T021 [US3] Cambiar el filtro de `src/components/SiteHeader.tsx`: listar todas las secciones con `hasContent` (incluida "Inicio") y mostrar el `<nav aria-label="Secciones">` solo si hay 2 o más (R2, reemplaza R12 de la 001); links de 44 px de alto con foco visible
- [X] T022 [US3] Agregar en `src/index.css` `scroll-behavior: smooth` en `html` solo dentro de `@media (prefers-reduced-motion: no-preference)` (FR-008)
- [X] T023 [US3] Verificar quickstart §3 y que en 360 px la marca y los dos links entran en una línea

**Checkpoint**: navegación completa.

---

## Phase 6: User Story 4 - La sección acompaña la identidad sin estorbar (Priority: P3)

**Goal**: el título se "arma" en puntos y el contenido aparece al entrar, solo CSS.

**Independent Test**: en Chrome todo queda nítido antes de la mitad de la pantalla y se revierte
al subir; con "reducir movimiento" o en Firefox todo se ve quieto y completo.

- [X] T024 [US4] Agregar en `src/index.css`, dentro de `@supports (animation-timeline: view())`, los keyframes y la `@utility dot-assemble` (máscara de puntos con `--dot-r` de 0 a `--dot-cell`, reutilizando la máscara y `@property --dot-r` de la 001) con `animation-timeline: view()` y `animation-range: entry 0% entry 100%`
- [X] T025 [US4] Agregar en `src/index.css`, en el mismo `@supports`, los keyframes y la `@utility reveal` (opacidad 0 → 1 y desplazamiento corto hacia arriba) con el mismo timeline y rango
- [X] T026 [US4] Aplicar `motion-safe:dot-assemble` al `<h2>` de `src/components/ui/SectionTitle.tsx` y `motion-safe:reveal` al bloque de datos y a cada párrafo en `src/components/sections/About.tsx`
- [X] T027 [US4] Verificar quickstart §4: entrada nítida antes de la mitad, reversión al subir, efecto de salida del Hero completo sin el pie de pantalla completa, y estado estático con movimiento reducido y en Firefox; revisar en el celular que la máscara del título se lea en 360 px (si no, celda más chica solo para títulos)

**Checkpoint**: las 4 historias funcionan.

---

## Phase 7: Polish & Cross-Cutting

- [X] T028 [P] Revisar la jerarquía de títulos (un `h1` en el Hero, un `h2` en "Sobre mí") y el recorrido con teclado de toda la página (FR-015, SC-005)
- [X] T029 [P] Actualizar `README.md` con la sección "Sobre mí" y dónde se edita su contenido (`src/data/about.ts`)
- [ ] T030 Correr `npm run lint && npm run build && npm test` y Lighthouse en mobile y desktop: ≥ 90 en las 4 categorías y CLS < 0,1 (SC-003, SC-004)
- [ ] T031 Abrir el PR de `002-sobre-mi` a `master`, revisar el preview de Vercel y, después del merge (sin squash), correr `npm run check:links` en producción
- [ ] T032 Prueba de lectura con 5 personas sobre producción: lectura completa en < 1 min y datos rápidos en 10 s (SC-001, SC-002). La hace Tomás

---

## Notas de implementación (2026-11-19)

- `--spacing(15)` dentro de `calc()` compila en Tailwind 4.3: no hizo falta el plan B (T006).
- Medidas con viewport emulado por DevTools Protocol (Chrome headless no baja de 500 px de
  ancho): sin scroll horizontal en 360, 640×400 (≈ zoom 200%), 740×360, 768 y 1280.
- En 360 la marca y los dos links entran en una línea (borde derecho del último link en 344 px).
- Navegar a "Sobre mí" deja el título a 64 px del borde superior.
- El efecto de salida del Hero llega a su final (`--dot-r: 0`, opacidad 0) en 360, 1280 y 740×360.
- Con movimiento reducido: todo opaco y sin máscara.
- Resiliencia: con `paragraphs: []` no aparecen la sección ni el `<nav>`; con un `throw` en
  `About`, el Hero, el header y el pie siguen.
- Pendiente de T030: Lighthouse (mobile y desktop).

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (1)** → **Foundational (2)** → historias → **Polish (7)**.
- **US1 (3)** depende de la fase 2.
- **US2 (4)** y **US4 (6)** agregan cosas a `About.tsx`: van después de US1.
- **US3 (5)** solo depende de la fase 2 (usa `hasAboutContent`), pero para probarla de punta a
  punta conviene tener US1.
- T031 y T032 van al final; T032 la hace Tomás después del deploy.

### Within Each Story

- T004 (tests) antes de T005.
- T006 antes de T008; T007, T008 y T009 antes de T010.
- T011 antes de T012 y T026; T024 y T025 antes de T026.

### Parallel Opportunities

- T002 y T006 tocan archivos distintos.
- T011 [P] puede hacerse mientras se termina la fase 2.
- US3 (T020–T022) puede hacerse en paralelo con US2, porque toca otros archivos.
- T028 y T029 en paralelo.

---

## Parallel Example: después de la fase 2

```bash
# En paralelo:
Task: "T011 SectionTitle en src/components/ui/SectionTitle.tsx"
Task: "T020 entrada sobre-mi en src/data/sections.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Fases 1 y 2.
2. Fase 3 (US1). **Parar y validar**: la sección se lee y el Hero sigue igual.

### Incremental Delivery

1. US1 → US2 (datos) → US3 (navegación) → US4 (animación).
2. Cada historia suma sin romper la anterior.
3. Un commit por paso de SDD; `implement` puede ir en un commit por fase si el diff queda claro.
