# Data Model: Stack

## StackGroup

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `name` | `string` | sí | no vacío |
| `note` | `string` | no | si viene vacía, no se muestra |
| `featured` | `boolean` | no | como máximo 1 categoría con `true` (aviso en DEV) |
| `items` | `readonly string[]` | sí | se omiten vacías y repetidas (sin distinguir mayúsculas); sin ítems válidos, la categoría no se muestra |

## StackContent

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `string` | texto del h2, no vacío |
| `groups` | `readonly StackGroup[]` | se muestran las válidas, en el orden de la data |

## Section

Se agrega `{ id: 'stack', label: 'Stack', hasContent: hasStackContent(stack) }` después de
`experiencia` en `sections.ts`.

## Estados

- Sin categorías válidas → sección y link ocultos.
- `featured: true` → borde y título en ámbar.
