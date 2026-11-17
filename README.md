# Portafolio — Tomás De Miguel

Portafolio personal de Tomás De Miguel, Frontend Developer Semi Senior (Tandil, Argentina).
Producción: <https://tomasdmiguel.vercel.app>

Identidad pixel/dot-matrix: el nombre en Geist Pixel y la foto en puntos se "desarman" al
scrollear con animaciones CSS ligadas al scroll, sin JavaScript de animación.

## Stack

- React 19 + Vite + TypeScript (strict)
- Tailwind CSS v4 con design tokens en `src/index.css` (`@theme`)
- Geist Sans, Mono y Pixel, self-hosted
- Deploy en Vercel (Hobby); sin backend

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo (valida la data de `src/data/` y avisa por consola) |
| `npm run build` | Type-check (`tsc -b`) y build de producción en `dist/` |
| `npm run preview` | Sirve `dist/` en <http://localhost:4173> |
| `npm run lint` | ESLint sobre `.ts` y `.tsx` |
| `npm test` | Tests de `src/lib/` con `node --test` |
| `npm run check:links` | Verifica LinkedIn, GitHub, CV e imagen OG. Acepta una URL base: `npm run check:links -- https://<preview>.vercel.app` |

## Estructura

```text
src/
├── data/        # contenido (perfil, links, secciones, meta del sitio): se edita acá, no en componentes
├── types/       # tipos del contenido
├── lib/         # validación pura + tests
├── components/  # layout, secciones y UI
└── index.css    # tokens, fuentes y animaciones
public/          # favicon, OG image, fuentes Geist Pixel y CV
scripts/         # check-links.ts
specs/           # especificaciones por feature (Spec-Driven Development)
```

## Flujo de trabajo

El proyecto sigue Spec-Driven Development con [Spec Kit](https://github.com/github/spec-kit):
cada feature tiene su carpeta en `specs/` (spec, plan, tareas y guía de validación) y su propia
rama. Las reglas del proyecto están en `.specify/memory/constitution.md`.

Antes de cada commit: `npm run lint && npm run build && npm test`.
