# Contract: contenido y componentes de "Stack"

Complementa los contratos de la [001](../../001-hero-base/contracts/content-schema.md), la
[002](../../002-sobre-mi/contracts/content-schema.md) y la
[003](../../003-experiencia/contracts/content-schema.md).

## Tipos (`src/types/content.ts`)

```ts
export interface StackGroup {
  name: string
  note?: string
  featured?: boolean
  items: readonly string[]
}

export interface StackContent {
  title: string
  groups: readonly StackGroup[]
}
```

## Funciones (`src/lib/validateContent.ts`)

| Función | Firma | Uso |
|---|---|---|
| `getValidStackGroups` | `(content: StackContent) => StackGroup[]` | categorías con nombre y al menos 1 ítem, con ítems sin vacíos ni repetidos, en orden |
| `hasStackContent` | `(content: StackContent) => boolean` | `sections.ts` y el componente |
| `validateStack` | `(content: StackContent) => ValidationIssue[]` | avisos en DEV |

## Componentes

| Componente | Props | Comportamiento |
|---|---|---|
| `sections/Stack` | `{ stack: StackContent }` | `<section id="stack" aria-labelledby>`; `null` sin categorías válidas; grilla de tarjetas |
| `ui/Tag` | sin cambios | reutilizado de la 003 |

Sin utilities CSS nuevas: reusa `dot-assemble` y `reveal`.
