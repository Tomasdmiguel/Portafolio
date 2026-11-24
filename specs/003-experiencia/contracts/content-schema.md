# Contract: contenido y componentes de "Experiencia"

Complementa los contratos de la [001](../../001-hero-base/contracts/content-schema.md) y la
[002](../../002-sobre-mi/contracts/content-schema.md).

## Tipos (`src/types/content.ts`)

```ts
export type YearMonth = `${number}-${number}`

export interface Highlight {
  lead?: string
  text: string
}

export interface Experience {
  role: string
  company: string
  industry?: string
  start: YearMonth
  end?: YearMonth
  modality: string
  summary?: string
  highlights: readonly Highlight[]
  tech: readonly string[]
}

export interface ExperienceContent {
  title: string
  currentLabel: string
  presentLabel: string
  techLabel: string
  items: readonly Experience[]
}

export interface NavLabels {
  nav: string
  menu: string
}
```

## Funciones (`src/lib/validateContent.ts`)

| Función | Firma | Uso |
|---|---|---|
| `isValidYearMonth` | `(value: string) => boolean` | formato `YYYY-MM`, mes 01–12 |
| `formatMonth` | `(value: YearMonth) => string` | `'2024-09'` → `'Sep 2024'` |
| `isValidExperience` | `(item: Experience) => boolean` | reglas del data model |
| `getValidExperiences` | `(content: ExperienceContent) => Experience[]` | válidas, por `start` desc., con logros (máx. 4) y tecnologías no vacíos |
| `hasExperienceContent` | `(content: ExperienceContent) => boolean` | `sections.ts` y el componente |
| `validateExperience` | `(content: ExperienceContent) => ValidationIssue[]` | avisos en DEV |

## Componentes

| Componente | Props | Comportamiento |
|---|---|---|
| `sections/Experience` | `{ experience: ExperienceContent }` | `<section id="experiencia" aria-labelledby>`; `null` sin experiencias válidas |
| `sections/ExperienceItem` | `{ item: Experience; currentLabel: string; presentLabel: string; techLabel: string }` | `<article>` con h3, período, logros y etiquetas |
| `ui/Tag` | `{ children: ReactNode }` | etiqueta Geist Mono con borde |
| `SiteHeader` | `+ labels: NavLabels` | `< md`: botón con `labels.menu` visible + lista en `popover`; `md:` lista en línea; `<nav aria-label={labels.nav}>` |

## Utilities CSS nuevas (`src/index.css`)

| Utility | Qué hace |
|---|---|
| `dot-line` | línea vertical de puntos (`radial-gradient` con `--dot-cell`) |
| `timeline-draw` | `clip-path` de arriba hacia abajo con `view()`, dentro de `@supports` (no deforma los puntos) |
