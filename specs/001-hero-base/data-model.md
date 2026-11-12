# Data Model: Hero y base del portafolio

**Feature**: `001-hero-base` | **Fecha**: 2026-11-12

Todo el contenido es data estática en `src/data/*.ts`, tipada en `src/types/content.ts`. No hay
persistencia, estados ni transiciones: el contenido cambia editando archivos y haciendo deploy.
El contrato detallado (tipos y reglas) está en [contracts/content-schema.md](./contracts/content-schema.md).

## Entidades

### Profile (`src/data/profile.ts`)

La información que muestra el Hero.

| Campo | Tipo | Obligatorio | Regla de validación | Valor actual |
|---|---|---|---|---|
| `name` | string | sí | no vacío | `Tomás De Miguel` |
| `role` | string | sí | no vacío | `Frontend Developer Semi Senior \| AI-Driven Development` |
| `stack` | string[] | sí | ≥ 1 ítem, ninguno vacío; se muestra unido con ` · ` | `React`, `TypeScript`, `Next.js` |
| `location` | string | sí | no vacío | `Tandil, Argentina` |
| `availability` | string | sí | no vacío | `Disponible para trabajo remoto` |
| `contactLinks` | ContactLink[] | sí | ≥ 1 ítem válido; tipos sin repetir | ver abajo |
| `cv` | Resume | sí | `href` empieza con `/` y termina en `.pdf` | ver abajo |
| `photo` | ProfilePhoto | sí | ver abajo | ver abajo |

### ContactLink

| Campo | Tipo | Regla |
|---|---|---|
| `kind` | `'linkedin' \| 'github' \| 'email'` | unión cerrada |
| `label` | string | no vacío; texto visible (`LinkedIn`, `GitHub`, `Email`) |
| `ariaLabel` | string | no vacío; describe destino (`LinkedIn de Tomás De Miguel`) |
| `href` | string | `linkedin`/`github`: URL `https://`; `email`: `mailto:` + email válido |

Valores:

| kind | href |
|---|---|
| linkedin | `https://www.linkedin.com/in/tomasdmiguel/` |
| github | `https://github.com/Tomasdmiguel` |
| email | `mailto:dev.tomasdmiguel@gmail.com` |

Derivado (no se guarda): `isExternal = kind !== 'email'` → `target="_blank"` +
`rel="noopener noreferrer"`.

### Resume (CV)

| Campo | Tipo | Regla | Valor |
|---|---|---|---|
| `label` | string | no vacío | `Ver CV` |
| `ariaLabel` | string | no vacío | `Ver CV en PDF (se abre en una pestaña nueva)` |
| `href` | string | `/…​.pdf` | `/cv/tomas-de-miguel-cv.pdf` (**archivo pendiente**) |

### ProfilePhoto

| Campo | Tipo | Regla |
|---|---|---|
| `src` | string | import de asset (JPEG 640, fallback) |
| `sources` | `{ type: 'image/avif'; srcSet: string }[]` | 1x (320) y 2x (640) |
| `alt` | string | no vacío: `Foto de Tomás De Miguel` |
| `width` / `height` | number | > 0; reservan espacio (sin CLS) |
| `fallbackInitials` | string | 1–3 caracteres: `TDM` |

### Section (`src/data/sections.ts`)

Registro de secciones para la navegación.

| Campo | Tipo | Regla |
|---|---|---|
| `id` | `SectionId` (unión: `'inicio' \| 'sobre-mi' \| 'como-trabajo' \| 'experiencia' \| 'proyectos' \| 'stack' \| 'formacion' \| 'contacto'`) | único; es el ancla (`#id`) |
| `label` | string | no vacío; texto del link |
| `hasContent` | boolean | `false` → no aparece en la navegación |

Valor en esta feature: solo `{ id: 'inicio', label: 'Inicio', hasContent: true }`. Las features
siguientes agregan su entrada.

### SiteMeta (`src/data/site.ts`)

Datos del `<head>`. **Sin imports de assets** (lo lee `vite.config.ts` en Node).

| Campo | Regla | Valor |
|---|---|---|
| `lang` | BCP 47 | `es` |
| `title` | no vacío | `Tomás De Miguel — Frontend Developer` |
| `description` | 50–160 caracteres, español | `Frontend Developer Semi Senior en Tandil, Argentina. React, TypeScript y Next.js con desarrollo AI-Driven y Spec-Driven. Disponible para trabajo remoto.` |
| `siteUrl` | URL https sin `/` final | `https://tomasdmiguel.vercel.app` |
| `ogImage` | ruta absoluta desde `public/` | `/og-image.png` (1200×630) |
| `ogImageAlt` | no vacío | `Tomás De Miguel — Frontend Developer` |
| `themeColor` | hex | `#0a0a0a` |
| `locale` | `es_AR` | `es_AR` |

### FooterContent (en `site.ts`)

| Campo | Valor |
|---|---|
| `copyright` | `© 2026 Tomás De Miguel` |

## Relaciones

```text
SiteMeta ─(nombre/rol coinciden por contenido, no por referencia)─ Profile
Profile 1 ── n ContactLink
Profile 1 ── 1 Resume
Profile 1 ── 1 ProfilePhoto
Section n (registro) ── usado por SiteHeader (navegación)
```

`SiteMeta.title` repite nombre y rol a propósito: `site.ts` no puede importar `profile.ts`
porque este importa la foto (asset) y Node no puede cargarla desde `vite.config.ts`. El
validador DEV verifica que `SiteMeta.title` empiece con `Profile.name`.

## Validación (resumen)

- **Compilación**: tipos estrictos; uniones cerradas para `kind` y `SectionId`.
- **DEV** (`validateProfile`, `validateSite`): reglas de las tablas → `console.warn` por problema.
- **Producción**: `getValidContactLinks()` descarta links inválidos; si el CV es inválido, el
  botón no se renderiza. Nada lanza excepciones por data inválida.
