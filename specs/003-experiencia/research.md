# Research: Experiencia

## R1. Navegación con 3 o más secciones en 360 px

- **Decision**: en móvil (< `md`), la navegación pasa a un menú compacto: un botón "Menú" que abre
  la lista con el atributo nativo `popover` (`popovertarget`), sin estado de React. Al activar un
  link, un `onClick` llama a `hidePopover()` en el contenedor. Desde `md:`, la lista se muestra en
  línea como hoy.
- **Rationale**: con "Inicio", "Sobre mí" y "Experiencia", la marca y los links ocupan ~390 px y
  no entran en los 328 px útiles de 360 px; `flex-wrap` rompe el header de altura fija (`h-15`).
  Con Stack, Formación y Contacto llegan a 6 links. `popover` es Baseline (cierre al tocar fuera,
  Escape, foco correcto) y no suma dependencias ni JS de animación. Era un riesgo ya anotado en el
  plan de la 002.
- **Alternatives considered**: scroll horizontal dentro del nav (poco descubrible en móvil);
  ocultar "Inicio" (no alcanza con 6 secciones); `<details>` (no cierra al tocar fuera ni con
  Escape sin JS extra); menú con estado de React (más código para el mismo resultado).

## R2. Formato de fechas

- **Decision**: la data guarda `'YYYY-MM'`. Una función pura `formatMonth` devuelve `"Sep 2024"`
  con una tabla fija de meses en español (`Ene`…`Dic`); `formatPeriod` arma `"Sep 2024 –
  Actualidad"`. En el DOM: `<time dateTime="2024-09">`.
- **Rationale**: resultado determinístico y testeable con `node --test`; `Intl.DateTimeFormat`
  devuelve variantes según el runtime ("sept.", "sep.") y en minúscula.
- **Alternatives considered**: `Intl.DateTimeFormat('es-AR')` (salida variable); texto libre en la
  data (no se puede validar el orden ni ordenar).

## R3. Logros con dato destacado

- **Decision**: `Highlight = { lead?: string; text: string }`. Se muestra `<strong>` con `lead` en
  acento, seguido de `text`, como una sola frase.
- **Rationale**: destaca "+20 pantallas" o "Registro y compra" sin parsear marcas dentro del texto
  y sin HTML en la data.
- **Alternatives considered**: marcar con `**…**` dentro del string (requiere parser); índices de
  subcadena (frágil al editar).

## R4. Línea de tiempo y animación

- **Decision**: lista vertical con una línea de puntos a la izquierda (`@utility dot-line`:
  `radial-gradient` repetido con `--dot-cell`, sin arbitrary values en el JSX). Cada experiencia
  tiene un marcador cuadrado tipo píxel; el actual va en ámbar y con la etiqueta de texto "Actual".
  Animación: el título reusa `dot-assemble`; la línea se "dibuja" con `@utility timeline-draw`
  (`scale-y` 0 → 1 desde arriba, `view()`, `entry 0% cover 50%`); cada bloque reusa `reveal`.
  Todo dentro de `@supports (animation-timeline: view())` y con `motion-safe:`.
- **Rationale**: misma familia visual que el Hero y "Sobre mí"; la línea comunica "trayectoria"
  aunque hoy haya un solo puesto, y escala a más sin cambiar el diseño.
- **Alternatives considered**: tarjeta sola sin línea (pierde la idea de trayectoria); línea de
  tiempo horizontal (no escala en 360 px).

## R5. Estructura semántica

- **Decision**: `<section id="experiencia">` → `SectionTitle` (h2) → `<ol>` de experiencias; cada
  `<li>` contiene un `<article>` con `<h3>` (puesto), empresa y rubro, `<p>` con período
  (`<time>`) y modalidad, contexto, `<ul>` de logros y `<ul aria-label="Tecnologías">` de
  etiquetas.
- **Rationale**: lista ordenada por fecha (FR-005), jerarquía h2 → h3 correcta (FR-015 de la 002).

## R6. Etiquetas de tecnologías

- **Decision**: nuevo `ui/Tag.tsx` (ya previsto en la constitución): Geist Mono `text-xs`, borde
  `border-border`, `px-2 py-1`. Lo reusa la feature Stack.
- **Rationale**: un solo componente para todas las etiquetas del sitio.

## R7. Alto de la sección

- **Decision**: "Experiencia" no usa `min-h-svh`; `py-16` como el resto. "Sobre mí" conserva su
  `min-h-svh` (da el recorrido del Hero, 002 R3).
- **Rationale**: con una sola experiencia, forzar pantalla completa deja un hueco grande.
