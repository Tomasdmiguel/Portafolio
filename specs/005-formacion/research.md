# Research: Formación

## R1. Archivos de datos

- **Decision**: `src/data/education.ts` (título de la sección, etiquetas, títulos e idiomas) y
  `src/data/certifications.ts` (etiqueta del bloque, nombres de categorías, aviso de pestaña nueva
  y lista). Los dos están en el árbol de la constitución.
- **Rationale**: "Agregar un certificado = editar solo `certifications.ts`" (Principio II).
  `certifications.ts` no importa assets, así que `scripts/check-links.ts` lo puede leer en Node.

## R2. Layout

- **Decision**: tarjetas como en Stack (`border border-border bg-surface p-5`, `h3` en Geist Mono
  mayúsculas con marcador píxel). Grilla `md:grid-cols-2`: "Título" e "Idiomas" lado a lado;
  "Certificaciones" con `md:col-span-2`. En móvil, apilado.
- **Rationale**: consistencia visual con Stack; con certificaciones vacías la grilla queda en dos
  tarjetas parejas.

## R3. Semántica

- **Decision**: `h3` por bloque. "Título": `<p>` con el nombre (`text-lg text-fg`), institución y
  ciudad en `text-muted`, años en Geist Mono. "Idiomas": `<dl>` con `<dt>` idioma y `<dd>` nivel
  (y aclaración). "Certificaciones": un `h4` por categoría y `<ul>` de ítems con
  `<a target="_blank" rel="noopener noreferrer">` + `<span className="sr-only">` con el aviso de
  pestaña nueva tomado de la data, y `<time dateTime>` con `formatMonth` (de la 003).

## R4. Validación

- **Decision**: funciones puras en `validateContent.ts`: `isValidDegree` (título, institución,
  `start` entero 1900–2100, `end` ≥ `start` si existe), `isValidLanguage`, `isValidCertification`
  (título, categoría de la unión, `YYYY-MM`, URL https), `getValidCertificationGroups` (orden fijo
  `ai`, `english`, `frontend`, `backend`; por fecha descendente) y `hasEducationContent(education,
  certifications)`. Avisos en DEV con `validateEducation` y `validateCertifications` (incluye URLs
  repetidas).
- **Rationale**: mismo patrón testeable de las features anteriores; reusa `isValidYearMonth`,
  `formatMonth` e `isHttpsUrl`.

## R5. Animación

- **Decision**: `motion-safe:reveal` en cada tarjeta y `dot-assemble` en el título. Sin CSS nuevo.
- **Rationale**: las tarjetas son más bajas que la pantalla; "Formación" queda última hasta que
  exista Contacto y `entry 100%` se alcanza al final de la página (verificado en la 004).

## R6. Chequeo de links

- **Decision**: `scripts/check-links.ts` suma las URLs de `certifications.items` válidas.
- **Rationale**: Principio V y FR-014.
