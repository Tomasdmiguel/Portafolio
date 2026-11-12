# Quickstart: validar la feature 001 (Hero y base)

Guía para comprobar de punta a punta que la feature cumple el spec. No contiene implementación.
Referencias: [spec.md](./spec.md) · [data-model.md](./data-model.md) ·
[contracts/](./contracts/) · [research.md](./research.md)

## Prerrequisitos

- Node 26 y npm 11 (`node -v`, `npm -v`).
- Google Chrome (Lighthouse y export de OG image).
- Rama `001-hero-base`.
- `public/cv/tomas-de-miguel-cv.pdf` presente (**pendiente de Tomás**).

## 1. Calidad (gate de la constitución)

```bash
npm install
npm run lint        # 0 errores
npm run build       # tsc -b + vite build, 0 errores
npm test            # node --test sobre src/lib/*.test.ts, todo verde
npm run check:links # LinkedIn puede dar 999 → verificar a mano
```

**Esperado**: los cuatro terminan sin errores. No quedan archivos del template de Vite
(`src/assets/react.svg`, `vite.svg`, `hero.png`, `App.css`, `public/icons.svg`, contador). FR-025.

## 2. Primera pantalla (US1 · FR-001–FR-007 · SC-002)

```bash
npm run preview     # sirve dist/ en http://localhost:4173
```

En Chrome DevTools (modo dispositivo), viewports **360×740**, **768×1024**, **1280×800** y
**740×360** (móvil horizontal):

- [ ] Sin scrollear se ven: nombre (h1), rol, stack "React · TypeScript · Next.js", ubicación +
      disponibilidad, foto, LinkedIn, GitHub, Email y "Ver CV". (En 740×360 se admite que el
      layout pase a dos columnas.)
- [ ] No hay scroll horizontal.
- [ ] LinkedIn, GitHub y "Ver CV" abren pestaña nueva; Email abre el cliente de correo.
- [ ] Tab recorre marca → LinkedIn → GitHub → Email → Ver CV con foco ámbar visible.
- [ ] Cada link/botón mide ≥ 44×44 px (DevTools → inspeccionar).
- [ ] Hay un solo `<h1>` (consola: `document.querySelectorAll('h1').length === 1`).

## 3. Efecto dot-matrix (US2 · FR-008–FR-011 · SC-007)

- [ ] Chrome actual: al scrollear, nombre y foto se desarman en puntos; el resto se desvanece.
      Al volver arriba, todo vuelve a verse nítido y opaco.
- [ ] Mientras se desvanecen, los links siguen siendo clickeables.
- [ ] DevTools → Rendering → **Emulate `prefers-reduced-motion: reduce`**: sin animación,
      contenido completo.
- [ ] Sin soporte de scroll-driven animations (Firefox sin flag, o deshabilitar la regla
      `@supports` en DevTools): contenido completo y estático, nada con opacidad 0.
- [ ] DevTools → Network → bloquear `GeistPixel-Square.woff2`: el nombre se lee con
      `monospace`, sin saltos grandes de layout; "á" se ve bien.
- [ ] Bloquear la foto: aparece el bloque "TDM" del mismo tamaño.

## 4. Al compartir (US3 · FR-017–FR-019 · SC-005)

```bash
grep -E 'og:|twitter:|<title>|description|canonical|apple-touch' dist/index.html
```

- [ ] Todos los tags de [contracts/head-meta.md](./contracts/head-meta.md) presentes, con URLs
      absolutas y sin placeholders.
- [ ] `public/og-image.png` es 1200×630 (`sips -g pixelWidth -g pixelHeight public/og-image.png`).
- [ ] La pestaña muestra el favicon pixel "TM".
- [ ] En el **preview deploy de Vercel**: pegar la URL en LinkedIn Post Inspector, en un chat de
      WhatsApp y en Slack → título, descripción e imagen correctos.

## 5. Base común (US4 · FR-020–FR-024a · SC-006)

- [ ] Cambiar `location` en `src/data/profile.ts` → el hero cambia sin tocar componentes.
- [ ] `npm run dev`, vaciar `role` en `profile.ts` → `console.warn` con
      `profile.role`; la página sigue funcionando.
- [ ] Poner un `href` inválido en un link → warning en DEV; en `npm run build && npm run preview`
      ese link no aparece y el resto sí.
- [ ] Forzar un `throw` temporal en `Hero` → el header y el footer siguen visibles (ErrorBoundary).
      Revertir.
- [ ] Ningún componente tiene colores hex ni arbitrary values (`grep -rE '\[#|-\[[0-9]' src/components`
      sin resultados).

## 6. Rendimiento y accesibilidad (SC-003 · SC-004)

```bash
npx lighthouse http://localhost:4173 --preset=desktop --only-categories=performance,accessibility,best-practices,seo --view
npx lighthouse http://localhost:4173 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --view
```

- [ ] ≥ 90 en las 4 categorías, en mobile y desktop.
- [ ] Mobile (throttling por defecto ≈ 4G lenta): LCP < 2,5 s y CLS < 0,1.

## 7. Prueba con personas (SC-001)

Mostrar la primera pantalla a 5 personas ajenas al proyecto durante 30 s y preguntar nombre,
rol, ubicación y cómo contactar. **Esperado**: ≥ 4 de 5 responden todo.
