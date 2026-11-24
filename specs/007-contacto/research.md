# Research: Contacto

## R1. Dónde vive el contenido

- **Decision**: los textos de la sección se exportan como `contact: ContactContent` desde
  `src/data/contactLinks.ts`, junto a los links. El email, LinkedIn y GitHub salen de
  `contactLinks` y el CV de `profile.cv`.
- **Rationale**: una sola fuente para el Hero y Contacto (FR-005); `contactLinks.ts` ya está en el
  árbol de la constitución, así que no hace falta un archivo nuevo.

## R2. Copiar el email

- **Decision**: `ui/CopyButton.tsx` con `useState`: se renderiza solo si
  `navigator.clipboard?.writeText` existe (chequeo en un efecto, para no romper el render inicial);
  al copiar con éxito muestra la confirmación 2 s; el texto vive en un `<span aria-live="polite">`
  y el botón tiene ancho mínimo fijo con `min-w-40` para que el cambio de texto no mueva el layout
  (SC-003). Si `writeText` falla, no muestra confirmación.
- **Rationale**: es JS de interacción, no de animación (la constitución solo prohíbe librerías de
  animación); sin dependencias.

## R3. Layout

- **Decision**: sección con más aire (`py-24`): `SectionTitle`, frase de cierre en Geist Sans
  `text-4xl md:text-6xl text-fg`, mensaje `max-w-prose text-muted`, email como link en Geist Mono
  `text-xl md:text-3xl text-accent break-all` con `CopyButton` al lado, y debajo `ContactLinks`
  (sin el email, que ya está destacado) + `Button` del CV, reusados del Hero.
- **Rationale**: cierre con impacto visual y un solo foco (el email).

## R4. Animación

- **Decision**: `dot-assemble` en el título (vía `SectionTitle`) y `motion-safe:reveal` en cada
  bloque. Sin CSS nuevo. La sección es la última: los bloques son bajos y llegan a `entry 100%`.

## R5. Navegación con 6 links

- **Decision**: sin cambios en `SiteHeader`. Se verifica que desde 768 px la marca y los 6 links
  entran en una línea; si no, el breakpoint del menú móvil pasa de `md` a `lg`.
