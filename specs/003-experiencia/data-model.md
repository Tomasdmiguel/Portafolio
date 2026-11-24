# Data Model: Experiencia

## Experience

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `role` | `string` | sí | no vacío |
| `company` | `string` | sí | no vacío |
| `industry` | `string` | no | si viene vacío, no se muestra |
| `start` | `YearMonth` (`'YYYY-MM'`) | sí | mes 01–12 |
| `end` | `YearMonth` | no | sin `end` = puesto actual; si existe, ≥ `start` |
| `modality` | `string` | sí | ej. "Remoto" |
| `summary` | `string` | no | frase de contexto |
| `highlights` | `readonly Highlight[]` | sí | máx. 4 válidos se muestran; vacíos se omiten |
| `tech` | `readonly string[]` | sí | vacíos se omiten |

Una experiencia es **válida** si `role`, `company`, `modality` no están vacíos, `start` tiene
formato válido y `end` (si existe) es válido y no anterior a `start`.

## Highlight

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `lead` | `string` | no | dato destacado al inicio de la frase |
| `text` | `string` | sí | no vacío; `lead` + `text` ≤ 20 palabras (aviso en DEV) |

## ExperienceContent

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `string` | texto del h2, no vacío |
| `currentLabel` | `string` | "Actual" (texto visible del marcador) |
| `presentLabel` | `string` | "Actualidad" (fin del período abierto) |
| `techLabel` | `string` | "Tecnologías" (nombre accesible de la lista de etiquetas) |
| `items` | `readonly Experience[]` | se muestran los válidos, ordenados por `start` descendente |

## Section

Se agrega `{ id: 'experiencia', label: 'Experiencia', hasContent: hasExperienceContent(experience) }`
después de `sobre-mi` en `sections.ts`.

## NavLabels

`navLabels = { nav: 'Secciones', menu: 'Menú' }` en `src/data/sections.ts`: nombre accesible
del `<nav>` y texto visible del botón del menú móvil (Principio II: sin texto en el componente).

## Estados

- `items` sin válidos → sección y link ocultos.
- `end` ausente → marcador ámbar + `currentLabel` y período "… – Actualidad".
