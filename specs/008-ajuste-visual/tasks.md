---
description: "Lista de tareas de la feature 008 (Ajuste visual)"
---

# Tasks: Ajuste visual

## Phase 1: Setup

- [X] T001 Verificar lint, build y tests en `008-ajuste-visual`

## Phase 2: Foundational

- [X] T002 Tokens en `src/index.css` (`@theme`): `--color-grid-line`, `--color-border-strong`, `--shadow-hard`, `--shadow-hard-accent`; `@theme static`: `--grid-cell: 2rem` (R1)
- [X] T003 `@utility graph-paper` y aplicarla al `body`; `scroll-padding-top: --spacing(16)` en `html`; `@utility press` (R2, R6, R7)
- [X] T004 [P] Tipos: `file?: string` en `About`, `ExperienceContent`, `StackContent`, `EducationContent` y `ContactContent`; `keycaps?: readonly string[]` en `Profile`; `keycap?: string` en `ContactContent`
- [X] T005 [P] Data: `file` en `about.ts` (`sobre-mi.md`), `experience.ts` (`experiencia.log`), `stack.ts` (`stack.json`), `education.ts` (`formacion.md`) y `contact` (`contacto.sh`); `keycaps: ['</>', '{ }', 'AI']` en `profile.ts`; `keycap: 'Enter ↵'` en `contact`

## Phase 3: US1 - Entra por los ojos (P1) 🎯

- [X] T006 [US1] Crear `src/components/ui/WindowControls.tsx`: tres cuadros `size-4 border border-border-strong` con SVG (línea, cuadrado, cruz), `aria-hidden`
- [X] T007 [US1] Reescribir `src/components/ui/Card.tsx` como ventana (R3): barra `flex items-center justify-between gap-3 border-b px-4 py-2` con marcador + `h3` (Geist Mono mayúsculas) y `WindowControls`; cuerpo `flex flex-col gap-4 p-5`; `border bg-surface shadow-hard`; prop `featured` → `border-accent shadow-hard-accent` y `h3` ámbar; mantiene `className` y `motion-safe:reveal`
- [X] T008 [US1] `src/components/sections/Stack.tsx`: usar `Card` (con `featured`) en lugar del markup propio; el `ul` de etiquetas sigue con `aria-labelledby` (Card recibe `headingId`)
- [X] T009 [US1] `src/components/ui/SectionTitle.tsx`: prop `file?`; etiqueta `aria-hidden` (Geist Mono `text-xs`, `bg-accent text-accent-fg px-2 py-0.5 -rotate-2 self-start`) sobre el `h2`; pasar `file` desde About, Experience, Stack, Education y Contact
- [X] T010 [US1] Verificar en 360 y 1280: grilla, ventanas, etiquetas; contraste y decoración oculta a lectores

## Phase 4: US2 - Hero con presencia (P1)

- [X] T011 [US2] Crear `src/components/ui/Keycap.tsx` (`{ children; className? }`): `inline-flex min-w-14 h-14 items-center justify-center border-2 border-border-strong bg-surface font-mono text-lg text-fg shadow-hard` con un borde interno
- [X] T012 [US2] `src/components/sections/Hero.tsx`: `relative` en la sección; si hay `keycaps`, grupo `aria-hidden` `absolute right-16 top-1/2 hidden lg:grid` con 3 teclas a distintas rotaciones, una en ámbar, y `motion-safe:hero-fade`
- [X] T013 [US2] `src/components/sections/Contact.tsx`: si hay `keycap`, mostrarla inclinada junto a la frase de cierre, `aria-hidden`, desde `sm`
- [X] T014 [US2] Verificar Hero en 1280 (sin superposición, se desvanece) y en 360 (sin teclas)

## Phase 5: US3 - Header fijo (P2)

- [X] T015 [US3] `src/components/SiteHeader.tsx`: envolver en `<div className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-sm">`; hook `useActiveSection(ids)` con `IntersectionObserver` (R6); link activo `text-accent` + `aria-current="true"`
- [X] T016 [US3] Verificar header fijo, sección activa al scrollear y anclas sin título tapado; menú móvil sigue funcionando

## Phase 6: US4 - Botones cuadrados (P2)

- [X] T017 [US4] Quitar `rounded-md` y sumar `shadow-hard motion-safe:press` en `ui/Button.tsx`, `ui/ContactLinks.tsx` y `ui/CopyButton.tsx`; secundarios con `border-border-strong`
- [X] T018 [US4] Verificar hover/clic y movimiento reducido

## Phase 7: Polish

- [X] T019 Lint, build, tests; sin scroll horizontal en 360, 640×400, 740×360, 768, 1280
- [ ] T020 Tomás commitea, abre el PR, corre Lighthouse en el preview y mergea; `check:links` en producción

## Análisis (2026-11-24)

En el mismo paso que plan y tareas: 8 FR cubiertos; sin conflictos con la constitución.

## Notas de implementación (2026-11-24)

- La utility de la grilla se llamaba `bg-grid` y chocaba con la utility de color de Tailwind
  (`bg-` + token `--color-grid`): pintaba todo el fondo de gris. Se renombró a `graph-paper` y el
  token a `--color-grid-line` (`#1f1f1f`).
- Teclas del Hero desde `lg`, no `md`: a 768 px se superponían con el rol. Medido con los
  rectángulos del texto: sin superposición en 1024, 1280 y 1440.
- Sin scroll horizontal en 360, 640×400, 740×360, 768 y 1280.
- Header fijo; la sección activa cambia al scrollear (Stack, Contacto) con `aria-current`.
- `press` compila dentro de `prefers-reduced-motion: no-preference`.
- Pendiente: T020 (PR, Lighthouse en el preview y merge).
