# Data Model: Sobre mí

Tipos nuevos en `src/types/content.ts`. Los existentes (`Section`, `ValidationIssue`) no cambian.

## About (`src/data/about.ts`)

| Campo | Tipo | Obligatorio | Regla | En DEV (`validateAbout`) |
|---|---|---|---|---|
| `title` | string | sí | no vacío | `about.title`: "no puede estar vacío" |
| `paragraphs` | readonly string[] | sí | ≥ 1 párrafo con texto para mostrar la sección | `about.paragraphs`: "debe tener al menos 1 párrafo"; `about.paragraphs[i]`: "no puede estar vacío" |
| `facts` | readonly QuickFact[] | sí (puede estar vacío) | cada dato con `label` y `value` no vacíos | `about.facts[i].label` / `.value`: "no puede estar vacío" |

## QuickFact

| Campo | Tipo | Regla |
|---|---|---|
| `label` | string | no vacío; corto (Base, Experiencia, Enfoque, Busco) |
| `value` | string | no vacío |

## Reglas de visualización (producción)

- `getValidParagraphs(about)` → párrafos con texto, en orden.
- `getValidFacts(about)` → datos con `label` y `value` no vacíos.
- `hasAboutContent(about)` → `getValidParagraphs(about).length > 0`. Si es `false`, no se
  renderiza la sección ni su link (FR-006).
- Si `getValidFacts` queda vacío, la sección se muestra sin el bloque de datos.

## Section (`src/data/sections.ts`)

Se agrega `{ id: 'sobre-mi', label: 'Sobre mí', hasContent: hasAboutContent(about) }` después
de `inicio`. El orden del array es el orden de la navegación (FR-007).

## Contenido inicial

Los 4 párrafos y los 4 datos rápidos del spec (Assumptions → Contenido y Datos rápidos).
