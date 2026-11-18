# Contract: contenido y componentes de "Sobre mí"

Complementa el [contrato de la feature 001](../../001-hero-base/contracts/content-schema.md).

## Tipos

```ts
export interface QuickFact {
  label: string
  value: string
}

export interface About {
  title: string
  paragraphs: readonly string[]
  facts: readonly QuickFact[]
}
```

## Funciones (`src/lib/validateContent.ts`)

| Función | Firma | Uso |
|---|---|---|
| `getValidParagraphs` | `(about: About) => string[]` | párrafos a mostrar |
| `getValidFacts` | `(about: About) => QuickFact[]` | datos a mostrar |
| `hasAboutContent` | `(about: About) => boolean` | `sections.ts` y `App.tsx` |
| `validateAbout` | `(about: About) => ValidationIssue[]` | avisos en DEV |

## Componentes

| Componente | Props | Comportamiento |
|---|---|---|
| `sections/About` | `{ about: About }` | `<section id="sobre-mi" aria-labelledby>`; `null` si no hay párrafos válidos |
| `ui/SectionTitle` | `{ id: string; children: ReactNode }` | `<h2>` en Geist Pixel, acento ámbar, con `motion-safe:dot-assemble` |
| `SiteHeader` | sin cambios de props | lista las secciones con contenido (incluida "Inicio") si hay 2 o más |

## Utilities CSS nuevas (`src/index.css`)

| Utility | Qué hace |
|---|---|
| `hero-screen` | `min-height: calc(100svh - --spacing(15))` (alto de pantalla menos el header) |
| `dot-assemble` | máscara de puntos de radio 0 → celda, con `view()` y `entry 0% entry 100%`, dentro de `@supports` |
| `reveal` | opacidad 0 → 1 y desplazamiento corto hacia arriba, mismo rango, dentro de `@supports` |
