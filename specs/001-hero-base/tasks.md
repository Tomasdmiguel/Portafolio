---

description: "Task list for feature 001 — Hero y base del portafolio"
---

# Tasks: Hero y base del portafolio

**Input**: Design documents from `/specs/001-hero-base/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: el spec no pide TDD. Se incluyen solo los tests unitarios de `src/lib/` porque el
plan los define (research R8). El resto se valida con [quickstart.md](./quickstart.md).

**Organization**: tareas agrupadas por historia de usuario del spec (US1–US4).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: se puede hacer en paralelo (otro archivo, sin dependencias pendientes)
- **[Story]**: historia del spec (US1, US2, US3, US4)
- Rutas relativas a la raíz del repo

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: sacar el template de Vite, migrar a TypeScript strict e instalar el stack.

- [ ] T001 Eliminar el contenido del template de Vite: `src/App.css`, `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg` (FR-025). `public/favicon.svg` se reemplaza en T030.
- [ ] T002 Instalar dependencias en `package.json`: `npm install tailwindcss@^4.3 @tailwindcss/vite@^4.3 @fontsource-variable/geist@^5.3 @fontsource-variable/geist-mono@^5.3` y `npm install -D typescript@~6.0.3 typescript-eslint@^8.72 @types/node`. **No** instalar TypeScript 7 (incompatible con typescript-eslint, research R1) ni el paquete `geist`.
- [ ] T003 Crear `tsconfig.json` (solo `files: []` y `references` a app y node), `tsconfig.app.json` (`include: ["src"]`, `target/lib ES2023 + DOM`, `module: ESNext`, `moduleResolution: bundler`, `jsx: react-jsx`, `strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `erasableSyntaxOnly`, `allowImportingTsExtensions`, `noEmit`, `types: ["vite/client"]`) y `tsconfig.node.json` (`include: ["vite.config.ts", "scripts"]`, mismas opciones strict, `types: ["node"]`, `noEmit`).
- [ ] T004 Renombrar `vite.config.js` → `vite.config.ts` con los plugins `react()` y `tailwindcss()` de `@tailwindcss/vite` (el plugin de meta tags se agrega en T033).
- [ ] T005 [P] Reescribir `eslint.config.js` para `**/*.{ts,tsx}` con `typescript-eslint` (`tseslint.configs.recommended`), `react-hooks` y `react-refresh`; ignorar `dist`.
- [ ] T006 Actualizar scripts en `package.json`: `"build": "tsc -b && vite build"`, `"test": "node --test \"src/lib/**/*.test.ts\""`, `"check:links": "node scripts/check-links.ts"`; mantener `dev`, `lint`, `preview`.
- [ ] T007 [P] Crear `src/vite-env.d.ts` con `/// <reference types="vite/client" />`.
- [ ] T008 Migrar `src/main.jsx` → `src/main.tsx` (si `document.getElementById('root')` es `null`, lanzar un error claro; sin `!`) y `src/App.jsx` → `src/App.tsx` como placeholder vacío que devuelve `null`. Actualizar el `<script>` de `index.html` a `/src/main.tsx` y poner `<html lang="es">`.
- [ ] T009 [P] Descargar `GeistPixel-Square.woff2` y `GeistPixel-Circle.woff2` desde `https://raw.githubusercontent.com/vercel/geist-font/main/fonts/GeistPixel/webfonts/` a `public/fonts/` (licencia OFL-1.1, research R2).
- [ ] T010 [P] Procesar la foto con `sips` desde `specs/001-hero-base/assets/foto-original.png` (800×800): recorte cuadrado más cerrado sobre la cara (verificar visualmente que la cara quede centrada y que se vea menos fondo de plantas) y exportar a `src/assets/profile/tomas-320.avif`, `src/assets/profile/tomas-640.avif` y `src/assets/profile/tomas-640.jpg` (research R6). Cada AVIF de 320 px debe pesar menos de 30 KB.

**Checkpoint**: `npm run lint` y `npm run build` pasan con la app vacía.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: tipos, data, tokens de diseño y layout que necesitan todas las historias.

**⚠️ CRITICAL**: ninguna historia empieza hasta terminar esta fase.

- [ ] T011 Crear `src/types/content.ts` con los tipos exactos de [contracts/content-schema.md](./contracts/content-schema.md): `ContactKind`, `ContactLink`, `Resume` (`href: \`/${string}.pdf\``), `ImageSource`, `ProfilePhoto`, `Profile`, `SectionId`, `Section`, `SiteMeta`, `ValidationIssue`.
- [ ] T012 [P] Crear `src/data/site.ts` exportando `site: SiteMeta` **sin imports de assets**: `lang: 'es'`, `title: 'Tomás De Miguel — Frontend Developer'`, `description` (50–160 caracteres, en español): `'Frontend Developer Semi Senior en Tandil, Argentina. React, TypeScript y Next.js con desarrollo AI-Driven y Spec-Driven. Disponible para trabajo remoto.'`, `siteUrl: 'https://tomasdmiguel.vercel.app'` (sin `/` final), `ogImage: '/og-image.png'`, `ogImageAlt: 'Tomás De Miguel — Frontend Developer'`, `themeColor: '#0a0a0a'`, `locale: 'es_AR'`, `copyright: '© 2026 Tomás De Miguel'`. Usar import de tipo con extensión `.ts`.
- [ ] T013 [P] Crear `src/data/sections.ts` exportando `sections: readonly Section[]` con solo `{ id: 'inicio', label: 'Inicio', hasContent: true }`.
- [ ] T014 Crear `src/data/profile.ts` exportando `profile: Profile` (depende de T010 y T011): `name: 'Tomás De Miguel'`, `role: 'Frontend Developer Semi Senior | AI-Driven Development'`, `stack: ['React', 'TypeScript', 'Next.js']`, `location: 'Tandil, Argentina'`, `availability: 'Disponible para trabajo remoto'`; `contactLinks`: linkedin → `https://www.linkedin.com/in/tomasdmiguel/` (label `LinkedIn`, ariaLabel `LinkedIn de Tomás De Miguel`), github → `https://github.com/Tomasdmiguel` (label `GitHub`, ariaLabel `GitHub de Tomás De Miguel`), email → `mailto:dev.tomasdmiguel@gmail.com` (label `Email`, ariaLabel `Enviar email a Tomás De Miguel`); `cv: { label: 'Ver CV', ariaLabel: 'Ver CV en PDF (se abre en una pestaña nueva)', href: '/cv/tomas-de-miguel-cv.pdf' }`; `photo` con imports de los 3 archivos de T010, `sources` AVIF `1x`/`2x`, `alt: 'Foto de Tomás De Miguel'`, `width: 320`, `height: 320`, `fallbackInitials: 'TDM'`.
- [ ] T015 Escribir `src/index.css`: `@import "tailwindcss"`; imports de `@fontsource-variable/geist` y `@fontsource-variable/geist-mono`; `@font-face` para `Geist Pixel Square` y `Geist Pixel Circle` (`url(/fonts/…woff2)`, `font-display: swap`); `@theme` con `--color-bg #0a0a0a`, `--color-surface #141414`, `--color-border #262626`, `--color-fg #ededed`, `--color-muted #a1a1a1`, `--color-accent #ffb000`, `--color-accent-fg #0a0a0a`, `--font-sans` (Geist Variable + system-ui), `--font-mono` (Geist Mono Variable + ui-monospace), `--font-pixel` (`'Geist Pixel Square', monospace`), `--font-pixel-circle` (`'Geist Pixel Circle', monospace`), `--text-display: clamp(2.75rem, 7vw + 1rem, 6.5rem)` con `--text-display--line-height: 1`. `@layer base`: `color-scheme: dark`, `body` con `bg-bg text-fg font-sans antialiased`, `:focus-visible` con outline de 2 px en `--color-accent` y offset de 3 px, `::selection` en ámbar (research R3, R11).
- [ ] T016 [P] Crear `src/components/ui/Button.tsx` con props `{ href; variant: 'primary' | 'secondary'; external?; ariaLabel?; children }`: renderiza `<a>`; `external` agrega `target="_blank"` y `rel="noopener noreferrer"`; altura mínima de 44 px (`min-h-11`, `min-w-11`); `primary` = fondo ámbar con texto `accent-fg`; `secondary` = borde `border` y texto `fg`, hover ámbar. Solo clases de Tailwind con tokens, sin arbitrary values.
- [ ] T017 [P] Crear `src/components/SiteHeader.tsx` con props `{ brand: string; sections: readonly Section[] }`: `<header>` no fijo con la marca (link a `#inicio`, Geist Sans). Filtrar `hasContent && id !== 'inicio'`; si la lista queda vacía, **no** renderizar `<nav>` (research R12).
- [ ] T018 [P] Crear `src/components/SiteFooter.tsx` con props `{ copyright: string }`: `<footer>` con `min-h-svh`, contenido alineado abajo y texto `muted` en tamaño chico (research R5).
- [ ] T019 Componer el layout en `src/App.tsx`: `SiteHeader` (brand = `profile.name`, `sections`) → `<main>` vacío → `SiteFooter` (`site.copyright`), y en `src/main.tsx` importar `./index.css`.

**Checkpoint**: `npm run dev` muestra fondo negro, header con el nombre y footer; lint y build pasan.

---

## Phase 3: User Story 1 - El reclutador entiende quién es Tomás en segundos (Priority: P1) 🎯 MVP

**Goal**: primera pantalla con nombre, rol, stack, ubicación, foto con tratamiento dot-matrix,
links de contacto y "Ver CV" (FR-001–FR-008, FR-011–FR-016).

**Independent Test**: quickstart §2. En 360, 768 y 1280 px todo se ve sin scroll; los links abren
donde corresponde; Tab recorre todo con foco visible; hay un solo `h1`.

- [ ] T020 [P] [US1] Crear `src/components/ui/ContactLinks.tsx` con props `{ links: readonly ContactLink[] }`: `<ul>` de `<a>` con `label` visible y `aria-label={ariaLabel}`; para `kind !== 'email'` agregar `target="_blank"` y `rel="noopener noreferrer"`; cada link ≥ 44×44 px; foco y hover en ámbar.
- [ ] T021 [P] [US1] Crear `src/components/ui/ProfileImage.tsx` con props `{ photo: ProfilePhoto }`: `<picture>` con `<source type="image/avif" srcSet>` + `<img src alt width height fetchPriority="high" decoding="async">`; estado `failed` (`useState`) que en `onError` muestra un bloque del mismo tamaño con `fallbackInitials` en `font-pixel` y `role="img"` con el mismo `alt`. Tamaño `size-40` en mobile y `md:size-64`; `landscape:` con altura chica `size-30`.
- [ ] T022 [US1] Agregar a `src/index.css` el `@utility dot-photo` (tratamiento estático de la foto, FR-002a): `filter: grayscale(1) contrast(1.15)`; máscara combinada con `mask-composite: intersect` de (a) viñeta `radial-gradient` que funde los bordes a transparente y (b) grilla de puntos `radial-gradient(circle, #000 var(--dot-r), transparent calc(var(--dot-r) + 0.5px))` con `mask-size` de 6 px y `--dot-r` en reposo de 2.2 px; tinte ámbar con un pseudo-elemento o contenedor con `bg-accent` y `mix-blend-mode: multiply` (research R6). Aplicarlo en `ProfileImage.tsx`. Si falta soporte de `mask`, la foto se ve en grises sin puntos (aceptable).
- [ ] T023 [US1] Crear `src/components/sections/Hero.tsx` con props `{ profile: Profile }`: `<section id="inicio" aria-labelledby="hero-title">` con `min-h-svh`; `<h1 id="hero-title">` con `font-pixel text-display text-accent` y `profile.name`; rol en `text-fg`; stack con `profile.stack.join(' · ')` en `font-mono text-muted`; `{location} · {availability}`; `ProfileImage`; `ContactLinks`; `Button` primary externo con `cv.label` y `cv.ariaLabel`. Layout mobile-first en columna; `md:` foto a la derecha; `landscape:` (alto chico) en dos columnas, foto a la izquierda (research R12). Sin texto de contenido hardcodeado. Menos de 150 líneas.
- [ ] T024 [US1] Montar `<Hero profile={profile} />` dentro de `<main>` en `src/App.tsx`.
- [ ] T025 [US1] Verificar quickstart §2 en 360×740, 768×1024, 1280×800 y 740×360: todo visible sin scroll, sin scroll horizontal, orden de Tab marca → LinkedIn → GitHub → Email → Ver CV, áreas de 44 px, `document.querySelectorAll('h1').length === 1`. Ajustar `src/components/sections/Hero.tsx` si algo no entra.

**Checkpoint**: MVP. El hero cumple el objetivo de "30 segundos" por sí solo.

---

## Phase 4: User Story 2 - El visitante se sorprende con la identidad pixel/dot-matrix (Priority: P2)

**Goal**: al scrollear, nombre y foto se desarman en puntos y el resto se desvanece; reversible;
estático sin soporte o con movimiento reducido (FR-009, FR-009a, FR-010, FR-011).

**Independent Test**: quickstart §3.

- [ ] T026 [US2] Agregar a `src/index.css`: `@property --dot-r { syntax: '<length>'; inherits: false; initial-value: 0px; }`; `@keyframes dot-dissolve` (desde `--dot-r` = celda llena, 6 px, hasta 0), `@keyframes dot-photo-dissolve` (desde 2.2 px hasta 0) y `@keyframes hero-fade` (`opacity` 1 → 0 y `translate` 0 → `-1.5rem`) (research R4).
- [ ] T027 [US2] Agregar a `src/index.css` los `@utility` `dot-dissolve`, `dot-photo-dissolve` y `hero-fade`, cada uno **dentro de** `@supports (animation-timeline: view())`, con `animation-timeline: view()`, `animation-range: exit 0% exit 100%`, `animation-fill-mode: both`, `animation-timing-function: linear`. `dot-dissolve` aplica al texto la máscara de puntos con `mask-size: 6px`. El estado inicial (scroll arriba) MUST ser idéntico al estado sin animación: nada oculto ni transparente.
- [ ] T028 [US2] Aplicar en `src/components/sections/Hero.tsx` las clases con variante `motion-safe:`: `motion-safe:dot-dissolve` al `h1`, `motion-safe:dot-photo-dissolve` al contenedor de `ProfileImage` y `motion-safe:hero-fade` al bloque de rol, stack, ubicación, links y CV. No usar `visibility`, `display` ni `pointer-events: none` (FR-009a).
- [ ] T029 [US2] Verificar quickstart §3: efecto proporcional y reversible en Chrome; con "reducir movimiento" emulado, sin animación; sin la regla `@supports`, todo visible; con `GeistPixel-Square.woff2` bloqueado, nombre legible en `monospace` y "á" correcta (si Square no tiene "á", documentarlo en `research.md` R2); con la foto bloqueada, aparece el bloque "TDM". Panel Performance: sin long tasks durante el scroll; si las hay, aplicar el plan B (animar `mask-size`).

**Checkpoint**: US1 + US2 funcionan; el efecto nunca tapa contenido.

---

## Phase 5: User Story 3 - El link se ve profesional al compartirlo (Priority: P2)

**Goal**: title, description, OG image, favicon y apple-touch-icon propios en el HTML servido
(FR-017–FR-019, [contracts/head-meta.md](./contracts/head-meta.md)).

**Independent Test**: quickstart §4.

- [ ] T030 [P] [US3] Reemplazar `public/favicon.svg` por pixel art "TM" (rectángulos `<rect>` en una grilla, `#ffb000` sobre fondo `#0a0a0a`, `viewBox` cuadrado, sin texto ni fuentes).
- [ ] T031 [P] [US3] Crear `specs/001-hero-base/assets/og/og.html` (1200×630): fondo `#0a0a0a`; nombre en Geist Pixel Square ámbar (`@font-face` apuntando a `../../../../public/fonts/GeistPixel-Square.woff2`); rol y "React · TypeScript · Next.js" en Geist; detalle de grilla de puntos. Crear también `specs/001-hero-base/assets/og/icon.html` (180×180) con "TM" pixel ámbar sobre negro, sin transparencia.
- [ ] T032 [US3] Exportar con Chrome headless: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --screenshot=public/og-image.png --window-size=1200,630 --hide-scrollbars file://$PWD/specs/001-hero-base/assets/og/og.html` y lo mismo con 180×180 a `public/apple-touch-icon.png`. Verificar con `sips -g pixelWidth -g pixelHeight` (1200×630 y 180×180) y que `og-image.png` pese menos de 300 KB.
- [ ] T033 [US3] Agregar en `vite.config.ts` un plugin inline `siteMeta()` con `transformIndexHtml` que importe `site` desde `./src/data/site.ts` e inyecte en `<head>` todos los tags de [contracts/head-meta.md](./contracts/head-meta.md): title, description, canonical, theme-color, `color-scheme`, iconos, `og:*` (URLs absolutas con `site.siteUrl`), `twitter:*` y el preload de `/fonts/GeistPixel-Square.woff2`. Si falta algún valor, lanzar un error para que el build falle. Menos de 40 líneas.
- [ ] T034 [US3] Limpiar `index.html`: dejar charset, viewport, `<html lang="es">`, `#root` y el script; quitar el `<title>` y el `<link rel="icon">` del template (los inyecta T033).
- [ ] T035 [US3] Verificar quickstart §4: `npm run build` y `grep -E 'og:|twitter:|<title>|description|canonical|apple-touch' dist/index.html` muestran todos los tags del contrato, sin placeholders y con URLs absolutas; la pestaña muestra el favicon "TM".

**Checkpoint**: US1–US3 completas; las vistas previas reales se prueban en el preview de Vercel (T046).

---

## Phase 6: User Story 4 - Tomás puede sumar secciones sin rehacer la base (Priority: P3)

**Goal**: validación DEV, filtrado en producción, ErrorBoundary por sección y chequeo de links
(FR-020–FR-023, Principio V).

**Independent Test**: quickstart §5, más `npm test` en verde.

- [ ] T036 [P] [US4] Crear `src/lib/validateContent.ts` con funciones puras (sin `import.meta` ni imports de assets; import de tipos con extensión `.ts`) según [contracts/content-schema.md](./contracts/content-schema.md):
  - `validateProfile(profile): ValidationIssue[]`: `name`, `role`, `location` y `availability` "no vacío"; `stack` "≥ 1 ítem, ninguno vacío"; `contactLinks` "≥ 1 ítem válido; tipos sin repetir"; `cv.href` "empieza con `/` y termina en `.pdf`"; `photo.alt` "no vacío"; `photo.width`/`height` "> 0"; `fallbackInitials` "1–3 caracteres".
  - `validateSite(site, profile)`: `description` "50–160 caracteres"; `siteUrl` "URL https sin `/` final"; `title` empieza con `profile.name`; `themeColor` hex.
  - `isValidContactLink(link)`: `label` y `ariaLabel` no vacíos; `linkedin`/`github` → URL `https://` parseable con `new URL`; `email` → `mailto:` + email válido.
  - `getValidContactLinks(links)`.
  - Mensajes en español y `path` del estilo `profile.contactLinks[1].href`.
- [ ] T037 [P] [US4] Crear `src/lib/validateContent.test.ts` con `node:test` y `node:assert/strict`, usando fixtures inline (no importar `src/data/profile.ts`, que importa assets): perfil válido → 0 issues; `role` vacío → issue con path `profile.role`; link `https` inválido → filtrado por `getValidContactLinks`; `mailto:` sin `@` → inválido; `kind` repetido → issue; `cv.href` sin `.pdf` → issue; `description` de 20 caracteres → issue; `title` que no empieza con el nombre → issue. Correr `npm test`.
- [ ] T038 [P] [US4] Crear `src/components/ErrorBoundary.tsx`: componente de clase (única excepción permitida) con props `{ name: string; children: ReactNode }`, `getDerivedStateFromError` → `hasError`, `componentDidCatch` que hace `console.error` con `name` solo en `import.meta.env.DEV`. Fallback: `null`.
- [ ] T039 [US4] En `src/App.tsx`: envolver `Hero` con `<ErrorBoundary name="Hero">`. Si `import.meta.env.DEV`, ejecutar una vez al cargar el módulo `validateProfile(profile)` y `validateSite(site, profile)` y hacer `console.warn('[contenido]', issue.path, issue.message)` por cada issue.
- [ ] T040 [US4] En `src/components/sections/Hero.tsx`, pasar a `ContactLinks` solo `getValidContactLinks(profile.contactLinks)` y no renderizar el botón de CV si `cv.href` no cumple "empieza con `/` y termina en `.pdf`" (reusar el validador). Producción: nada lanza excepciones por data inválida.
- [ ] T041 [P] [US4] Crear `scripts/check-links.ts` (Node 26, `fetch` nativo, import de `src/data/site.ts` y de las URLs; **no** importar `profile.ts`; si hace falta, extraer las URLs de contacto a `src/data/contactLinks.ts` sin assets, importarlo desde `profile.ts` y actualizar data-model.md): HEAD/GET a LinkedIn, GitHub, `${siteUrl}/cv/tomas-de-miguel-cv.pdf` y `${siteUrl}/og-image.png`; exit 1 si alguna responde ≥ 400; el estado `999` de LinkedIn se reporta como "verificar a mano" sin fallar (research R9).
- [ ] T042 [US4] Verificar quickstart §5: cambiar `location` cambia el hero sin tocar componentes; `role` vacío → warning en DEV; `href` inválido → warning en DEV y link oculto en `npm run preview`; `throw` temporal en `Hero` → header y footer siguen visibles (revertir después).

**Checkpoint**: todas las historias funcionan de forma independiente.

---

## Phase 7: Polish & Cross-Cutting Concerns

- [ ] T043 Copiar el CV real a `public/cv/tomas-de-miguel-cv.pdf`. **Bloqueada**: falta que Tomás entregue el PDF.
- [ ] T044 [P] Auditoría de la constitución: `grep -rE '\[#|-\[[0-9]' src/components` sin resultados (sin arbitrary values ni hex); cada componente < 150 líneas (`wc -l src/components/**/*.tsx`); ningún texto de contenido en componentes; identificadores en inglés.
- [ ] T045 [P] Reemplazar `README.md` (texto del template de Vite) por una descripción breve del portafolio, el stack, los scripts (`dev`, `build`, `lint`, `test`, `check:links`, `preview`) y el flujo SDD con `specs/`.
- [ ] T046 Validación final con [quickstart.md](./quickstart.md) §1–§7: `npm run lint && npm run build && npm test`; Lighthouse ≥ 90 en las 4 categorías, mobile y desktop, con LCP < 2,5 s y CLS < 0,1 (si falla, optimizar y repetir); push de la rama, preview de Vercel, `npm run check:links`, vistas previas en LinkedIn Post Inspector, WhatsApp y Slack; prueba de 30 s con 5 personas (SC-001).

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: arranca ya.
- **Foundational (Phase 2)**: depende de Setup y bloquea todas las historias.
- **US1 (Phase 3)**: depende de Foundational. Es el MVP.
- **US2 (Phase 4)**: depende de US1 (anima los elementos de `Hero.tsx`).
- **US3 (Phase 5)**: depende solo de Foundational (`site.ts`); puede ir en paralelo con US1 y US2.
- **US4 (Phase 6)**: depende de Foundational; T039 y T040 tocan `App.tsx`/`Hero.tsx`, así que van después de US1.
- **Polish (Phase 7)**: depende de todas; T043 está bloqueada por el PDF del CV.

### Dentro de cada fase

- T002 → T003, T004, T006 (necesitan los paquetes).
- T011 → T012, T013, T014. T010 → T014.
- T015 → T016–T019. T020, T021 y T022 → T023 → T024 → T025.
- T026 → T027 → T028 → T029.
- T030, T031 → T032. T033 → T034 → T035.
- T036 → T037, T039, T040.

### Parallel Opportunities

- Setup: T005, T007, T009 y T010 juntas (después de T002).
- Foundational: T012 y T013 juntas; T016, T017 y T018 juntas.
- US1: T020 y T021 juntas.
- US3 completa en paralelo con US1 y US2 (otros archivos).
- US4: T036, T038 y T041 juntas.

---

## Parallel Example: User Story 1

```bash
Task: "Crear src/components/ui/ContactLinks.tsx (T020)"
Task: "Crear src/components/ui/ProfileImage.tsx (T021)"
# después:
Task: "Crear src/components/sections/Hero.tsx (T023)"
```

## Parallel Example: US3 junto a US1

```bash
Task: "Pixel art en public/favicon.svg (T030)"
Task: "HTML de OG en specs/001-hero-base/assets/og/ (T031)"
Task: "Hero.tsx (T023)"   # US1, otro archivo
```

---

## Implementation Strategy

### MVP First (User Story 1)

1. Phase 1 + Phase 2.
2. Phase 3 (US1) → **parar y validar** con quickstart §2.
3. Commit `feat: hero con información de contacto` y push para el preview de Vercel.

### Incremental Delivery

1. Setup + Foundational → `chore: migrar a TypeScript y Tailwind v4`.
2. US1 → `feat: hero con información de contacto` (MVP).
3. US2 → `feat: efecto dot-matrix al hacer scroll`.
4. US3 → `feat: meta tags, imagen OG y favicon`.
5. US4 → `feat: validación de contenido y error boundary`.
6. Polish → `docs: README` y validación final → merge a `master`.

Antes de cada commit: `npm run lint && npm run build` (y `npm test` desde US4).

---

## Notes

- [P] = otro archivo, sin dependencias pendientes.
- Si una tarea choca con el spec o la constitución: frenar, avisar y proponer el cambio (Principio VI).
- Datos pendientes: PDF del CV (T043).
