# Contract: `<head>` del HTML servido

Interfaz externa del sitio: lo que leen navegadores, buscadores y los crawlers de vista previa
(LinkedIn, WhatsApp, Slack, X). Los crawlers **no ejecutan JS**, por eso todo esto MUST estar en
el HTML estático que genera el build (`dist/index.html`). Valores tomados de `src/data/site.ts`
e inyectados por el plugin de `vite.config.ts`.

## Tags obligatorios

```html
<html lang="es">
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Tomás De Miguel — Frontend Developer</title>
<meta name="description" content="{site.description}" />
<link rel="canonical" href="https://tomasdmiguel.vercel.app/" />
<meta name="theme-color" content="#0a0a0a" />
<meta name="color-scheme" content="dark" />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="es_AR" />
<meta property="og:url" content="https://tomasdmiguel.vercel.app/" />
<meta property="og:title" content="Tomás De Miguel — Frontend Developer" />
<meta property="og:description" content="{site.description}" />
<meta property="og:image" content="https://tomasdmiguel.vercel.app/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Tomás De Miguel — Frontend Developer" />

<!-- Twitter/X y Slack -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Tomás De Miguel — Frontend Developer" />
<meta name="twitter:description" content="{site.description}" />
<meta name="twitter:image" content="https://tomasdmiguel.vercel.app/og-image.png" />

<!-- Rendimiento -->
<link rel="preload" href="/fonts/GeistPixel-Square.woff2" as="font" type="font/woff2" crossorigin />
```

## Reglas

- `og:image` y `og:url` son **absolutas** (los crawlers no resuelven relativas).
- `og-image.png`: 1200×630, PNG, < 300 KB.
- `apple-touch-icon.png`: 180×180, PNG, sin transparencia.
- En previews de Vercel las URLs absolutas siguen apuntando a producción (aceptable: la imagen es
  la misma).
- Ningún tag queda con placeholders sin reemplazar: el build falla si el plugin no encuentra un
  valor (guard en el plugin).

## Archivos públicos (`public/`)

| Ruta | Origen |
|---|---|
| `/favicon.svg` | pixel art "TM", ámbar sobre negro (a mano) |
| `/apple-touch-icon.png` | export Chrome headless de `specs/001-hero-base/assets/og/icon.html` |
| `/og-image.png` | export Chrome headless de `specs/001-hero-base/assets/og/og.html` |
| `/fonts/GeistPixel-Square.woff2`, `/fonts/GeistPixel-Circle.woff2` | repo `vercel/geist-font` (OFL-1.1) |
| `/cv/tomas-de-miguel-cv.pdf` | **pendiente** (lo entrega Tomás) |
