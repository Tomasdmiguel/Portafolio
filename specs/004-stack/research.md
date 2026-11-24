# Research: Stack

## R1. Presentación de las categorías

- **Decision**: grilla de tarjetas, una por categoría: 1 columna en móvil, 2 desde `sm:` y 3 desde
  `lg:`. Cada tarjeta: `border border-border bg-surface p-5`, título `h3` en Geist Mono
  mayúsculas (`text-sm tracking-wide`), nota opcional en `text-muted` y las tecnologías con
  `ui/Tag` (`flex flex-wrap gap-2`).
- **Rationale**: escaneable (cada categoría es un bloque), coherente con la estética de
  "Experiencia" y sin texto corrido. Seis tarjetas llenan dos filas de tres en desktop.
- **Alternatives considered**: lista de etiquetas sin agrupar (difícil de escanear con 30
  tecnologías); íconos o logos (rompen la estética pixel; fuera de alcance según el spec);
  barras de nivel (no verificables).

## R2. Destaque de "IA aplicada"

- **Decision**: la tarjeta con `featured: true` usa `border-accent` y su `h3` en `text-accent`.
  Un marcador cuadrado tipo píxel (`size-2 bg-accent`, `aria-hidden`) antecede al título de
  todas las tarjetas; en las no destacadas es `bg-border`.
- **Rationale**: ámbar sobre `#141414` cumple AA para texto (contraste > 9:1); el nombre de la
  categoría ya identifica el destaque, así que no depende solo del color (FR-004).

## R3. Semántica

- **Decision**: `<section id="stack">` → `SectionTitle` (h2) → `<ul>` de categorías; cada `<li>`
  tiene `h3` con el nombre (id derivado del índice), la nota en un `<p>` y un
  `<ul aria-labelledby={idDelH3}>` de etiquetas.
- **Rationale**: el lector de pantalla anuncia "lista, Frontend, 9 elementos" sin texto
  hardcodeado en el componente (Principio II).

## R4. Animación

- **Decision**: título con `dot-assemble` (ya existe) y cada tarjeta con `motion-safe:reveal`
  (ya existe, rango `entry 0% entry 100%`). Sin utilities nuevas.
- **Rationale**: las tarjetas son más bajas que la pantalla, así que `entry 100%` siempre se
  alcanza, incluso si "Stack" queda última hasta que existan Formación y Contacto (aprendizaje de
  la 003).

## R5. Duplicados

- **Decision**: dentro de una categoría, las tecnologías se comparan sin espacios a los lados y
  sin distinguir mayúsculas; se muestra la primera aparición. Entre categorías distintas no se
  controla.
- **Rationale**: evita "React" y "react " repetidos; una misma tecnología en dos categorías puede
  ser intencional.
