---
description: "Lista de tareas de la feature 003 (Experiencia)"
---

# Tasks: Experiencia

**Input**: documentos de diseño en `/specs/003-experiencia/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md),
[data-model.md](./data-model.md), [contracts/content-schema.md](./contracts/content-schema.md),
[quickstart.md](./quickstart.md)

**Tests**: el plan pide tests con `node --test` para las funciones puras nuevas (validación,
orden y formato de fechas; Principio V). El resto se valida a mano con
[quickstart.md](./quickstart.md) y Lighthouse.

**Organization**: tareas agrupadas por historia de usuario para implementarlas y probarlas por
separado.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede hacer en paralelo (otro archivo, sin dependencias pendientes)
- **[Story]**: historia del spec a la que pertenece (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: confirmar el punto de partida. No hay dependencias nuevas.

- [X] T001 Verificar que `npm run lint && npm run build && npm test` pasan en la rama `003-experiencia` antes de tocar código

---

## Phase 2: Foundational (bloquea todas las historias)

**Purpose**: tipos, contenido y validación de la experiencia.

**⚠️ CRITICAL**: ninguna historia se puede empezar sin esta fase.

### Tipos y contenido

- [X] T002 Agregar en `src/types/content.ts`, con JSDoc en español: `type YearMonth = \`${number}-${number}\``; `Highlight { lead?: string; text: string }`; `Experience { role: string; company: string; industry?: string; start: YearMonth; end?: YearMonth; modality: string; summary?: string; highlights: readonly Highlight[]; tech: readonly string[] }` ("sin `end` = puesto actual"); `ExperienceContent { title: string; currentLabel: string; presentLabel: string; techLabel: string; items: readonly Experience[] }`; `NavLabels { nav: string; menu: string }`
- [X] T003 Crear `src/data/experience.ts` que exporte `experience: ExperienceContent` con `title: 'Experiencia'`, `currentLabel: 'Actual'`, `presentLabel: 'Actualidad'`, `techLabel: 'Tecnologías'` y un ítem: `role: 'Frontend Developer'`, `company: 'Seeker Parking'`, `industry: 'SaaS de estacionamiento inteligente'`, `start: '2024-09'`, sin `end`, `modality: 'Remoto'`, `summary: 'Construyo la nueva plataforma que reemplaza al sistema legacy, en un equipo ágil de 6 a 10 personas junto a backend, QA y producto.'`, `tech: ['React', 'TypeScript', 'Next.js', 'Vite', 'React Hook Form', 'Zod', 'APIs REST', 'Scrum']` y estos 4 `highlights`:
  1. `{ lead: '+20 pantallas', text: 'del panel administrativo y la app para clientes de la nueva plataforma.' }`
  2. `{ lead: 'Registro y compra', text: '(checkout) con formularios validados e integración de APIs REST.' }`
  3. `{ lead: 'Componentes reutilizables:', text: 'tablas de datos, skeletons, selects con autocompletado y recorte de imágenes.' }`
  4. `{ lead: 'Desarrollo con IA', text: 'de forma agéntica: defino specs, reviso la arquitectura y valido el código antes de integrarlo.' }`

### Validación (tests primero)

- [X] T004 Escribir tests en `src/lib/validateContent.test.ts` (deben fallar antes de T005):
  - `isValidYearMonth`: `true` con `'2024-09'`; `false` con `'2024-13'`, `'2024-00'`, `'2024-9'`, `'24-09'` y `''`
  - `formatMonth('2024-09')` → `'Sep 2024'`; `formatMonth('2025-01')` → `'Ene 2025'`
  - `isValidExperience`: `false` si `role`, `company` o `modality` están vacíos, si `start` es inválido, si `end` es inválido o si `end` es anterior a `start`; `true` con `end === start` y sin `end`
  - `getValidExperiences` descarta las inválidas, ordena por `start` descendente, descarta logros con `text` vacío y tecnologías vacías, y deja como máximo 4 logros
  - `hasExperienceContent` es `false` con `items: []` o solo inválidas
  - `validateExperience(experience)` del contenido real devuelve `[]`
  - `validateExperience` reporta `experience.title`, `experience.techLabel`, `experience.items` ("debe tener al menos 1 experiencia válida"), `experience.items[i].role` / `.company` / `.modality` ("no puede estar vacío"), `experience.items[i].start` / `.end` ("debe tener formato YYYY-MM"), `experience.items[i].end` ("no puede ser anterior al inicio"), `experience.items[i].highlights[j].text` ("no puede estar vacío"), `experience.items[i].highlights[j]` ("debe tener hasta 20 palabras", contando `lead` + `text`) y `experience.items[i].highlights` ("se muestran hasta 4 logros") si hay más de 4
- [X] T005 Implementar en `src/lib/validateContent.ts` (sección `// ---- Experiencia (feature 003) ----`): `isValidYearMonth(value: string): boolean` (`/^\d{4}-(0[1-9]|1[0-2])$/`), `formatMonth(value: YearMonth): string` con la constante `MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']` (R2), `isValidExperience`, `getValidExperiences`, `hasExperienceContent` y `validateExperience`; las comparaciones de fecha se hacen como strings `YYYY-MM`; `npm test` en verde

**Checkpoint**: tipos, data y validación listos; el sitio se ve igual que en producción.

---

## Phase 3: User Story 1 - El reclutador ve dónde trabaja Tomás y qué hace (Priority: P1) 🎯 MVP

**Goal**: debajo de "Sobre mí" aparece "Experiencia" con la experiencia completa, desde la data.

**Independent Test**: `npm run dev`, scrollear debajo de "Sobre mí" en 360 y 1280: se ven puesto,
empresa, rubro, "Sep 2024 – Actualidad", "Remoto", contexto, 4 logros y las etiquetas; con
`items: []` la sección no aparece.

- [X] T006 [P] [US1] Crear `src/components/ui/Tag.tsx` (`{ children: ReactNode }`): `<span>` en Geist Mono `text-xs`, `border border-border`, `px-2 py-1`, texto `text-muted` con contraste AA (R6)
- [X] T007 [US1] Crear `src/components/sections/ExperienceItem.tsx` (`{ item: Experience; currentLabel: string; presentLabel: string; techLabel: string }`): `<article>` con `<h3>` (puesto), empresa y rubro, `<p>` con `<time dateTime={item.start}>{formatMonth(item.start)}</time> – ` seguido de `<time dateTime={item.end}>` o `presentLabel`, y la modalidad; `summary` si existe; `<ul>` de logros con `<strong className="text-accent">{lead}</strong> {text}`; `<ul aria-label={techLabel}>` con un `Tag` por tecnología (`flex flex-wrap gap-2`); si no hay `end`, mostrar `currentLabel` como texto visible junto al período; sin texto hardcodeado; ≤ 150 líneas (R5)
- [X] T008 [US1] Crear `src/components/sections/Experience.tsx` (`{ experience: ExperienceContent }`): `null` si `!hasExperienceContent(experience)`; si no, `<section id="experiencia" aria-labelledby="experiencia-title">` con `mx-auto w-full max-w-6xl px-4 py-16 md:px-8` (sin `min-h-svh`, R7), `SectionTitle` y un `<ol>` de `getValidExperiences(experience)` con un `ExperienceItem` por `<li>`; ≤ 150 líneas
- [X] T009 [US1] Montar `<ErrorBoundary name="Experiencia"><Experience experience={experience} /></ErrorBoundary>` dentro de `<main>`, después de "Sobre mí", y sumar `validateExperience(experience)` a los avisos de DEV en `src/App.tsx` (FR-012, FR-013)
- [X] T010 [US1] Verificar quickstart §2 (contenido y layout en 360×740, 768×1024, 1280×800, 740×360 y zoom 200%) y §5 (`items: []`, `end` anterior al inicio, logro vacío y `throw` en `Experience`)

**Checkpoint**: MVP: la experiencia se lee completa y es resistente a fallas.

---

## Phase 4: User Story 2 - La sección acompaña la identidad (Priority: P2)

**Goal**: línea de tiempo pixel con marcador del puesto actual y entrada animada solo con CSS.

**Independent Test**: en Chrome el título se arma, la línea se dibuja y todo queda nítido antes de
la mitad de la pantalla; con "reducir movimiento" o en Firefox todo se ve quieto y completo.

- [X] T011 [US2] Agregar en `src/index.css` la `@utility dot-line`: línea vertical de puntos con `background-image: radial-gradient(circle, var(--color-border) var(--dot-r-rest), transparent calc(var(--dot-r-rest) + 0.5px))`, `background-size: var(--dot-cell) var(--dot-cell)`, `background-repeat: repeat-y` y ancho de una celda (R4)
- [X] T012 [US2] Agregar en `src/index.css`, dentro de `@supports (animation-timeline: view())`, los keyframes `timeline-draw` (`clip-path: inset(0 0 100% 0)` → `inset(0)`, para no deformar los puntos; ver Riesgos del plan) y la `@utility timeline-draw` con `animation-timeline: view()` y `animation-range: entry 0% cover 50%`
- [X] T013 [US2] En `src/components/sections/Experience.tsx`: el `<ol>` con `relative` y un elemento decorativo `aria-hidden="true"` con `dot-line motion-safe:timeline-draw` a la izquierda; cada `<li>` con padding izquierdo para dejar lugar a la línea
- [X] T014 [US2] En `src/components/sections/ExperienceItem.tsx`: marcador cuadrado tipo píxel (`size-3`, `aria-hidden="true"`) sobre la línea, `bg-accent` si no hay `end` y `bg-border` si lo hay; `currentLabel` con `text-accent` y Geist Mono en mayúsculas; `motion-safe:reveal` en el `<article>` (FR-009, FR-010)
- [X] T015 [US2] Layout desde `md:` en `src/components/sections/ExperienceItem.tsx`: grilla de 3 columnas con período, modalidad y marcador "Actual" en la primera y puesto, contexto, logros y etiquetas en las otras dos (`md:col-span-2`), mismo ritmo que "Sobre mí"; en móvil apilado
- [X] T016 [US2] Verificar quickstart §4 en Chrome, con movimiento reducido y en Firefox; revisar en 360 px que la línea y el marcador no generan scroll horizontal y que la línea termina de dibujarse antes de que el texto de la experiencia pase la mitad de la pantalla (si no, cambiar el rango de `timeline-draw` a `entry 0% entry 100%`)

**Checkpoint**: US1 y US2 funcionan juntas.

---

## Phase 5: User Story 3 - Navegación (Priority: P3)

**Goal**: "Experiencia" en la navegación y menú compacto en móvil.

**Independent Test**: en 360 px el botón "Menú" abre los 3 links y se cierra al navegar, con
Escape y tocando fuera; en 768 px los links van en línea; `/#experiencia` abre en la sección.

- [X] T017 [US3] Agregar `{ id: 'experiencia', label: 'Experiencia', hasContent: hasExperienceContent(experience) }` después de `sobre-mi` en `src/data/sections.ts`
- [X] T018 [US3] Exportar `navLabels: NavLabels = { nav: 'Secciones', menu: 'Menú' }` desde `src/data/sections.ts` y pasarlo como prop `labels` a `SiteHeader` desde `src/App.tsx`; reemplazar el `aria-label="Secciones"` hardcodeado de `src/components/SiteHeader.tsx` por `labels.nav` (Principio II)
- [X] T019 [US3] Reescribir la navegación de `src/components/SiteHeader.tsx` (R1): en `< md`, un `<button popoverTarget="site-nav">` con `labels.menu` como texto visible (sin `aria-label`), `min-h-11 min-w-11`, foco visible y `md:hidden`; la lista dentro de `<nav id="site-nav" popover="auto" aria-label={labels.nav}>` (props de React 19: `popover`, `popoverTarget`) posicionada bajo el header (`inset-auto top-15 right-4 m-0`, `bg-surface`, `border border-border`, `p-2`); en `md:` se anulan los estilos del navegador para el popover cerrado con `md:static md:block md:border-0 md:bg-transparent md:p-0`, y la `<ul>` pasa de columna a fila (`flex flex-col md:flex-row`); un `onClick` en cada link llama a `document.getElementById('site-nav')?.hidePopover()`; el header mantiene `h-15`; ≤ 150 líneas
- [X] T020 [US3] Verificar quickstart §3 en 360 y 768 px, con mouse, teclado (Tab, Enter, Escape) y lector de pantalla; el Hero sigue ocupando la primera pantalla con el header (quickstart de la 001 §2)

**Checkpoint**: las 3 historias funcionan.

---

## Phase 6: Polish & Cross-Cutting

- [X] T021 [P] Revisar la jerarquía de títulos (un `h1`, un `h2` por sección, `h3` por puesto) y el recorrido con teclado de toda la página
- [X] T022 [P] Actualizar `README.md`: sumar la fila "Experiencia | `src/data/experience.ts`" a la tabla de secciones
- [X] T023 Correr `npm run lint && npm run build && npm test` y Lighthouse en mobile y desktop: ≥ 90 en las 4 categorías y CLS < 0,1 (SC-002, SC-003)
- [X] T024 Tomás commitea y abre el PR de `003-experiencia` a `master`; revisar el preview de Vercel, correr `npm run check:links -- https://<preview>.vercel.app` y, después del merge (sin squash), en producción
- [ ] T025 Prueba de lectura con 5 personas sobre producción: en 10 s dicen dónde trabaja Tomás, desde cuándo y un logro (SC-001). La hace Tomás

---

## Notas de implementación (2026-11-24)

- Tests: 29 en verde (8 nuevos de Experiencia). `noUncheckedIndexedAccess` obligó a desestructurar
  `result[0]` en el test de orden.
- T012/T016: con `entry 0% cover 50%` la línea quedaba a medio dibujar, porque "Experiencia" es la
  última sección y la página no scrollea hasta ese punto. Se usó el rango alternativo
  `entry 0% entry 100%` (ver T016); al llegar al final, `clip-path` termina en `inset(0)`.
- La línea de puntos usa `--color-muted` (con `--color-border` casi no se veía sobre el fondo).
- `reveal` se aplica por bloque (encabezado, período, contexto, cada logro, etiquetas) y no al
  `<article>` entero, para que nada quede transparente en móvil, donde la experiencia es más alta
  que la pantalla.
- Medidas con iframes de 360×740, 740×360, 768×1024 y 640×400 (≈ zoom 200%) en Chrome: sin scroll
  horizontal ni elementos que sobresalen; botón "Menú" en < 768 y links en línea desde 768.
- Menú móvil: se abre bajo el header (top 60 px, a 16 px del borde), links de 44 px; se cierra al
  navegar (el título queda a 73 px del borde), con Escape y tocando fuera.
- Resiliencia: con un `throw` en `Experience`, Hero, "Sobre mí" y el pie siguen; con
  `end: '2023-01'` no aparecen la sección ni su link y hay 2 avisos `[contenido]` en DEV.
- Títulos: un `h1`, `h2` "Sobre mí" y "Experiencia", `h3` "Frontend Developer"; orden de Tab:
  marca, links de la navegación, links de contacto y CV.
- Pendiente de T023: Lighthouse (mobile y desktop) sobre el preview de Vercel.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (1)** → **Foundational (2)** → historias → **Polish (6)**.
- **US1 (3)** depende de la fase 2.
- **US2 (4)** modifica `Experience.tsx` y `ExperienceItem.tsx`: va después de US1.
- **US3 (5)** solo depende de la fase 2 (usa `hasExperienceContent`); se puede hacer en paralelo
  con US2 porque toca otros archivos.
- T024 y T025 van al final; los commits y el PR los hace Tomás.

### Within Each Story

- T004 (tests) antes de T005.
- T006 antes de T007; T007 antes de T008; T008 antes de T009.
- T011 y T012 antes de T013 y T014.
- T017 y T018 antes de T019 (T018 también toca `SiteHeader.tsx`).

### Parallel Opportunities

- T006 [P] se puede hacer mientras se termina la fase 2.
- US3 (T017–T019) en paralelo con US2 (T011–T015).
- T021 y T022 en paralelo.

---

## Parallel Example: después de US1

```bash
# En paralelo:
Task: "T011–T012 utilities dot-line y timeline-draw en src/index.css"
Task: "T017–T019 navegación en src/data/sections.ts, src/App.tsx y src/components/SiteHeader.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Fases 1 y 2.
2. Fase 3 (US1). **Parar y validar**: la experiencia se lee completa y el resto del sitio sigue
   igual.

### Incremental Delivery

1. US1 → la sección existe y se puede leer (aunque la navegación todavía no la lista).
2. US2 → línea de tiempo y animación.
3. US3 → navegación con menú móvil; a partir de acá el header escala a las secciones siguientes.
4. Polish → Lighthouse, README, PR y deploy.

## Cierre (2026-11-24)

PR mergeado sin squash. En producción, con todas las secciones: Lighthouse 100 en Performance,
Accessibility, Best Practices y SEO (captura de Tomás) y `check:links` OK (LinkedIn y Platzi se
verifican a mano porque bloquean bots). Queda pendiente la prueba de lectura con 5 personas.
