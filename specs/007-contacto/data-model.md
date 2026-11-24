# Data Model: Contacto

## ContactContent (`src/data/contactLinks.ts`, export `contact`)

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `string` | h2 "Contacto", no vacío |
| `heading` | `string` | frase de cierre, no vacía |
| `message` | `string` | mensaje breve, no vacío |
| `copyLabel` | `string` | "Copiar email" |
| `copiedLabel` | `string` | "Email copiado" |

## Derivados

- **Email**: el `ContactLink` válido con `kind: 'email'`; se muestra la dirección sin `mailto:`.
- **Otros links**: los `ContactLink` válidos que no son email.
- **CV**: `profile.cv` si `isValidResumeHref`.
- **Hay contenido**: email, otro link o CV válidos.

## Section

`{ id: 'contacto', label: 'Contacto', hasContent: hasContactContent(contactLinks) }` al final.
El CV siempre existe en el perfil, pero `sections.ts` no puede importar `profile.ts` (importa
assets en algunas versiones); la presencia se calcula con los links y el componente suma el CV.
