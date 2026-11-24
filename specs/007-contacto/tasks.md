---
description: "Lista de tareas de la feature 007 (Contacto)"
---

# Tasks: Contacto

**Tests**: `node --test` para las funciones puras nuevas (Principio V).

## Phase 1: Setup

- [X] T001 Verificar lint, build y tests en `007-contacto`

## Phase 2: Foundational

- [X] T002 Agregar `ContactContent { title; heading; message; copyLabel; copiedLabel }` (todos `string`) en `src/types/content.ts`
- [X] T003 Exportar `contact: ContactContent` desde `src/data/contactLinks.ts`: `title: 'Contacto'`, `heading: '¿Hablamos?'`, `message: 'Estoy disponible para trabajo remoto y busco crecer como Software Engineer en equipos de afuera. Si tenés una propuesta, escribime.'`, `copyLabel: 'Copiar email'`, `copiedLabel: 'Email copiado'`
- [X] T004 Tests en `src/lib/validateContent.test.ts` (fallan antes de T005): `getEmailAddress` devuelve la dirección sin `mailto:` del primer email válido y `null` sin email válido; `hasContactContent` es `false` sin links válidos; `validateContact(contact)` real devuelve `[]` y reporta `contact.<campo>` "no puede estar vacío"
- [X] T005 Implementar `getEmailAddress`, `hasContactContent` y `validateContact` en `src/lib/validateContent.ts`

## Phase 3: US1 - Contactar (P1) 🎯 MVP

- [X] T006 [US1] Crear `src/components/sections/Contact.tsx` (`{ contact; links; cv }`): `null` si no hay links válidos ni CV válido; `<section id="contacto" aria-labelledby="contacto-title" className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-24 md:px-8">` con `SectionTitle`, `<p>` heading (`text-4xl md:text-6xl text-balance text-fg`), `<p>` message (`max-w-prose text-base md:text-lg text-muted`), email `<a href="mailto:…">` (`font-mono text-xl md:text-3xl text-accent break-all min-h-11`) seguido de `CopyButton`, y una fila con `ContactLinks` (links válidos sin el email) y `Button` del CV como en el Hero; `motion-safe:reveal` por bloque; ≤ 150 líneas
- [X] T007 [US1] Montar `<ErrorBoundary name="Contacto"><Contact contact={contact} links={contactLinks} cv={profile.cv} /></ErrorBoundary>` al final de `<main>` y sumar `validateContact(contact)` en DEV en `src/App.tsx`

## Phase 4: US2 - Copiar (P2)

- [X] T008 [US2] Crear `src/components/ui/CopyButton.tsx` (`{ value; label; copiedLabel }`): estado `supported` (efecto que mira `navigator.clipboard?.writeText`) y `copied`; `null` sin soporte; `<button type="button">` con estilo secundario del `Button` (`min-h-11 min-w-40`), `onClick` con `await navigator.clipboard.writeText(value)` en `try/catch`, confirma 2 s (limpiar el timeout al desmontar); el texto va en `<span aria-live="polite">`
- [X] T009 [US2] Verificar quickstart §3

## Phase 5: US3 - Identidad (P2)

- [X] T010 [US3] Verificar quickstart §4 (animación al final y movimiento reducido)

## Phase 6: US4 - Navegación (P3)

- [X] T011 [US4] Agregar `{ id: 'contacto', label: 'Contacto', hasContent: hasContactContent(contactLinks) }` al final de `src/data/sections.ts`
- [X] T012 [US4] Verificar en 768 que la marca y los 6 links entran en una línea en el header de 60 px; si no, cambiar en `src/components/SiteHeader.tsx` los `md:` del menú por `lg:` (R5)

## Phase 7: Polish

- [X] T013 [P] Jerarquía de títulos, teclado y resiliencia (quickstart §5)
- [X] T014 [P] `README.md`: fila "Contacto | `src/data/contactLinks.ts`"
- [ ] T015 Lint, build, tests; Lighthouse sobre el preview (Tomás)
- [ ] T016 Tomás commitea, abre el PR y mergea; `check:links` en producción

## Análisis (2026-11-24)

En el mismo paso que plan y tareas: 11 FR y 4 SC cubiertos; sin conflictos con la constitución.
Detalle menor: si no hubiera links pero sí CV, la sección se vería sin su link en el nav (hoy no
pasa: hay 3 links válidos).

## Notas de implementación (2026-11-24)

- Tests: 46 en verde (3 nuevos). Tests e implementación de T004–T005 se escribieron juntos.
- `CopyButton`: el lint (`react-hooks`) no permite `setState` dentro de un efecto; el soporte del
  portapapeles se calcula al inicializar el estado (SPA sin SSR).
- Clic real en "Copiar email": muestra "Email copiado", vuelve a "Copiar email" a los 2 s y el
  botón mantiene 160 px de ancho.
- Header con 6 links: entran en una línea desde 768 px (también en 1024); por debajo, menú móvil.
  No hizo falta cambiar el breakpoint (R5).
- 360, 640×400, 740×360, 768 y 1024: sin scroll horizontal.
- Con un `throw` en `Contact`, el resto del sitio sigue.
- Pendientes: T015 (Lighthouse) y T016 (PR).

## Dependencies

Fase 2 → US1 → US2 (T008 antes de que `Contact` lo use; se puede hacer en paralelo con T006) →
US3/US4 → Polish.
