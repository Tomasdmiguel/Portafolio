# Contract: contenido y componentes de "Contacto"

## Tipos (`src/types/content.ts`)

```ts
export interface ContactContent {
  title: string
  heading: string
  message: string
  copyLabel: string
  copiedLabel: string
}
```

## Funciones (`src/lib/validateContent.ts`)

| Función | Firma | Uso |
|---|---|---|
| `getEmailAddress` | `(links: readonly ContactLink[]) => string \| null` | dirección del primer link de email válido, sin `mailto:` |
| `hasContactContent` | `(links: readonly ContactLink[]) => boolean` | al menos un link válido |
| `validateContact` | `(contact: ContactContent) => ValidationIssue[]` | avisos en DEV |

## Componentes

| Componente | Props | Comportamiento |
|---|---|---|
| `sections/Contact` | `{ contact: ContactContent; links: readonly ContactLink[]; cv: Resume }` | `<section id="contacto">`; `null` sin links ni CV válidos |
| `ui/CopyButton` | `{ value: string; label: string; copiedLabel: string }` | `null` sin portapapeles; confirmación 2 s en `aria-live` |
| `ui/ContactLinks`, `ui/Button` | sin cambios | reutilizados del Hero |
