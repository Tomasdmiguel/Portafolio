---
description: "Lista de tareas de la feature 005 (Formación)"
---

# Tasks: Formación

**Input**: documentos de diseño en `/specs/005-formacion/`

**Tests**: `node --test` para las funciones puras nuevas (Principio V).

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup

- [X] T001 Verificar que `npm run lint && npm run build && npm test` pasan en `005-formacion`

## Phase 2: Foundational

- [X] T002 Agregar en `src/types/content.ts` (JSDoc en español) `Degree`, `Language`, `EducationContent`, `CertificationCategory = 'ai' | 'english' | 'frontend' | 'backend'`, `Certification`, `CertificationsContent` y `CertificationGroup`, según [contracts/content-schema.md](./contracts/content-schema.md)
- [X] T003 Crear `src/data/education.ts`: `title: 'Formación'`, `degreesLabel: 'Título'`, `languagesLabel: 'Idiomas'`, `presentLabel: 'En curso'`, `degrees: [{ title: 'Técnico Superior en Programación', institution: 'E.E.S.T. N.º 2 "Felipe Senillosa"', location: 'Tandil', start: 2015, end: 2022 }]`, `languages: [{ name: 'Español', level: 'Nativo' }, { name: 'Inglés', level: 'Básico', detail: 'Lectura de documentación técnica' }]`
- [X] T004 [P] Crear `src/data/certifications.ts` (sin imports de assets, lo lee `check-links.ts`): `label: 'Certificaciones'`, `categoryLabels: { ai: 'IA', english: 'Inglés', frontend: 'Frontend', backend: 'Backend' }`, `newTabHint: '(abre en una pestaña nueva)'`, `items: []` con un comentario que explique el formato de un ítem
- [X] T005 Tests en `src/lib/validateContent.test.ts` (fallan antes de T006): `isValidDegree` (vacíos, `start` fuera de 1900–2100 o no entero, `end` < `start`); `isValidLanguage`; `isValidCertification` (título vacío, categoría fuera de la unión, fecha inválida, URL no https); `getValidCertificationGroups` (orden `ai`, `english`, `frontend`, `backend`; omite categorías vacías; fecha descendente; etiqueta desde `categoryLabels`); `hasEducationContent` (false con todo vacío; true con solo idiomas o solo certificaciones); `validateEducation(education)` y `validateCertifications(certifications)` del contenido real devuelven `[]`; reportan campos vacíos, años inválidos, categoría inválida, fecha inválida, URL no https y URL repetida ("está repetida")
- [X] T006 Implementar en `src/lib/validateContent.ts` (sección `// ---- Formación (feature 005) ----`): `CERTIFICATION_CATEGORIES`, `isValidDegree`, `isValidLanguage`, `isValidCertification`, `getValidCertifications`, `getValidCertificationGroups`, `hasEducationContent`, `validateEducation`, `validateCertifications`; `npm test` en verde

## Phase 3: User Story 1 - Formación e idiomas (P1) 🎯 MVP

- [X] T007 [US1] Crear `src/components/sections/Education.tsx` (`{ education; certifications }`): `null` si `!hasEducationContent`; `<section id="formacion" aria-labelledby="formacion-title">` con el contenedor de Stack, `SectionTitle` y `<div className="grid gap-4 md:grid-cols-2">` con: tarjeta "Título" (si hay grados válidos) con, por grado, `<p className="text-lg text-fg">` título, `<p className="text-muted">` institución · ciudad y años en Geist Mono (`start – end` o `presentLabel`); tarjeta "Idiomas" (si hay válidos) con `<dl>`: `<dt>` idioma (`text-fg`), `<dd>` nivel (`text-muted`) y aclaración en otro `<dd>` (`text-xs text-muted`); después `<CertificationList certifications={certifications} />`; tarjetas `flex flex-col gap-4 border border-border bg-surface p-5 motion-safe:reveal` con `h3` igual al de Stack (Geist Mono mayúsculas + marcador `size-2 bg-border`); ≤ 150 líneas
- [X] T008 [US1] Montar `<ErrorBoundary name="Formación"><Education … /></ErrorBoundary>` después de Stack y sumar `validateEducation` y `validateCertifications` a los avisos de DEV en `src/App.tsx`
- [X] T009 [US1] Verificar quickstart §2 y §5

## Phase 4: User Story 2 - Certificaciones (P2)

- [X] T010 [US2] Crear `src/components/sections/CertificationList.tsx`: `null` sin grupos; tarjeta `md:col-span-2` con `h3` = `label`, y por grupo `<h4>` (Geist Mono `text-xs text-muted` mayúsculas) + `<ul>`; cada ítem con `<a href target="_blank" rel="noopener noreferrer">` (título, `min-h-11`, `hover:text-accent`, foco visible) + `<span className="sr-only">{newTabHint}</span>` y `<time dateTime={date}>{formatMonth(date)}</time>` en Geist Mono; grilla de grupos `sm:grid-cols-2`
- [X] T011 [US2] Agregar las URLs de `getValidCertifications(certifications)` a los `checks` de `scripts/check-links.ts`
- [X] T012 [US2] Verificar quickstart §3 con 2 certificaciones de prueba (sin commitearlas)

## Phase 5: User Story 3 - Identidad (P2)

- [X] T013 [US3] Verificar quickstart §4 (animación al final de la página y movimiento reducido); el estilo sale de T007 y T010

## Phase 6: User Story 4 - Navegación (P3)

- [X] T014 [US4] Agregar `{ id: 'formacion', label: 'Formación', hasContent: hasEducationContent(education, certifications) }` después de `stack` en `src/data/sections.ts`; verificar el nav en 360 y 1280

## Phase 7: Polish

- [X] T015 [P] Revisar jerarquía de títulos (h1 → h2 → h3 → h4) y teclado
- [X] T016 [P] `README.md`: fila "Formación | `src/data/education.ts` y `src/data/certifications.ts`" y cómo agregar un certificado
- [ ] T017 Lint, build, tests; Lighthouse ≥ 90 sobre el preview (Tomás, DevTools)
- [ ] T018 Tomás commitea, abre el PR y mergea sin squash; `npm run check:links` en producción
- [ ] T019 Tomás pasa las certificaciones de Platzi y se cargan en `certifications.ts` (fuera de esta feature si llega después del merge)

## Análisis (2026-11-24)

En el mismo paso que plan y tareas: 14 FR y 5 SC con cobertura del 100%; sin conflictos con la
constitución.

## Notas de implementación (2026-11-24)

- Tests: 42 en verde (8 nuevos de Formación).
- La tarjeta quedó en `ui/Card.tsx` (está en el árbol de la constitución) en lugar de dentro de
  `Education.tsx`, por la regla de un componente por archivo; la reusa `CertificationList`.
- Con 2 certificaciones de prueba (no commiteadas): grupos "IA" y "Frontend" en ese orden, fechas
  "Feb 2025" y "May 2024", links con `target="_blank"`, `rel="noopener noreferrer"`, 44 px de alto
  y el aviso "(abre en una pestaña nueva)" para lectores.
- 360, 640×400 y 740×360: 1 columna; 768: 2. Sin scroll horizontal. Al final de la página, las
  tarjetas quedan opacas.
- Resiliencia: con `institution: ''` el título no se muestra y hay aviso; con un `throw` en
  `Education`, el resto sigue.
- `check:links` ya incluye certificados (hoy no hay ninguno cargado).
- Pendientes: T017 (Lighthouse), T018 (PR) y T019 (certificados reales de Platzi).

## Dependencies

- Fase 2 antes de todo; T005 antes de T006; T007 antes de T008; T010 antes de T012.
- T004 [P] en paralelo con T003; T014 en paralelo con US2; T015 y T016 en paralelo.

## Implementation Strategy

1. Fases 1–2, US1 (MVP con título e idiomas).
2. US2 (certificaciones, probadas con datos de prueba), US3, US4.
3. Polish, PR y deploy.
