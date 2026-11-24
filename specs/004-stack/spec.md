# Feature Specification: Stack

**Feature Branch**: `004-stack`

**Created**: 2026-11-24

**Status**: Draft

**Input**: User description: "Sección Stack, debajo de Experiencia. Las skills de Tomás agrupadas
por categoría, con el desarrollo con IA como una skill más dentro del stack. Atractiva
visualmente ('que entre todo por los ojos') y escaneable para reclutadores. Contenido del CV."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El reclutador ve con qué tecnologías trabaja Tomás (Priority: P1)

Un reclutador baja desde "Experiencia" y encuentra "Stack". En pocos segundos ve las tecnologías
agrupadas por categoría (Frontend, Estado y datos, Formularios, IA aplicada, Herramientas y
Backend) y puede confirmar si cubre las que pide la búsqueda.

**Why this priority**: es el filtro más común de los reclutadores ("¿sabe React? ¿Next.js?").

**Independent Test**: abrir el sitio, bajar hasta "Stack" en 360px y en 1280px: se ven las 6
categorías con su título y sus tecnologías, sin leer párrafos.

**Acceptance Scenarios**:

1. **Given** un visitante en "Experiencia", **When** sigue scrolleando, **Then** la siguiente
   sección es "Stack", con ese título y las 6 categorías en el orden acordado.
2. **Given** una categoría, **When** el visitante la mira, **Then** ve su nombre y sus
   tecnologías como etiquetas, en el orden de la data.
3. **Given** la categoría "Backend", **When** se muestra, **Then** queda claro que es un nivel de
   conocimientos (no de experiencia profesional), con texto visible.
4. **Given** un lector de pantalla, **When** recorre la sección, **Then** cada categoría se
   anuncia con su nombre seguido de la lista de tecnologías.

---

### User Story 2 - La IA se destaca como diferencial dentro del stack (Priority: P2)

El desarrollo con IA aparece como una categoría más, pero visualmente destacada (acento ámbar),
porque es el diferencial del perfil.

**Why this priority**: es el diferencial que Tomás quiere comunicar; la sección funciona igual
sin el destaque.

**Independent Test**: mirar la sección 5 segundos; la categoría "IA aplicada" se distingue del
resto por color y no solo por posición.

**Acceptance Scenarios**:

1. **Given** la sección, **When** el visitante la mira, **Then** la categoría "IA aplicada" tiene
   el acento ámbar en su borde o título, y el resto usa el estilo neutro.
2. **Given** el destaque, **When** se revisa el contraste, **Then** cumple WCAG AA y la categoría
   se identifica también por su nombre (no solo por color).

---

### User Story 3 - La sección entra por los ojos (Priority: P2)

El título se arma en puntos, como en las otras secciones, y las categorías aparecen de forma
progresiva al scrollear. Con movimiento reducido o sin soporte, todo se ve completo y estático.

**Why this priority**: identidad visual pedida; el contenido funciona sin animación.

**Independent Test**: scrollear en Chrome (las categorías entran y quedan nítidas antes de la
mitad de la pantalla), con "reducir movimiento" y en un navegador sin soporte (todo estático y
visible).

**Acceptance Scenarios**:

1. **Given** un navegador con soporte y sin movimiento reducido, **When** la sección entra en
   pantalla, **Then** el título se arma en puntos y cada categoría aparece de forma progresiva,
   terminando visible y nítida antes de llegar a la mitad de la pantalla.
2. **Given** movimiento reducido o un navegador sin soporte, **When** el visitante llega a la
   sección, **Then** todo se ve completo, sin partes ocultas ni transparentes.
3. **Given** cualquier viewport, **When** se muestran las categorías, **Then** se acomodan en
   una columna en móvil y en una grilla de 2 o 3 columnas en pantallas más anchas.

---

### User Story 4 - Navegación (Priority: P3)

La navegación suma "Stack".

**Why this priority**: la base de navegación y el menú móvil ya existen desde la 003.

**Independent Test**: activar "Stack" en el header (en línea y en el menú móvil) con mouse y
teclado; la página se posiciona en la sección.

**Acceptance Scenarios**:

1. **Given** las cuatro secciones con contenido, **When** carga la página, **Then** la
   navegación muestra "Inicio", "Sobre mí", "Experiencia" y "Stack", en ese orden.
2. **Given** el contenido de "Stack" vacío, **When** carga la página, **Then** no se muestran la
   sección ni su link.

---

### Edge Cases

- **Sin categorías válidas**: la sección y su link no se muestran.
- **Categoría sin nombre o sin tecnologías válidas**: no se muestra; las demás se reacomodan sin
  huecos.
- **Tecnología vacía o repetida dentro de una categoría**: no se muestra (las repetidas, una sola
  vez).
- **Error en la sección**: si "Stack" falla, el resto del sitio sigue funcionando.
- **Texto largo o zoom 200%**: las etiquetas pasan de línea sin cortarse ni generar scroll
  horizontal.
- **Llegada directa por ancla**: `#stack` en la URL posiciona la página en la sección.
- **Recorrido de la animación**: la sección no es la última de la página, pero si lo fuera, las
  animaciones tienen que terminar aunque la página no pueda seguir scrolleando (aprendizaje de la
  003).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST mostrar la sección "Stack" inmediatamente debajo de "Experiencia",
  con un título de segundo nivel "Stack" y un ancla `#stack`.
- **FR-002**: La sección MUST mostrar las categorías en el orden de la data, cada una con su
  nombre (título de tercer nivel) y sus tecnologías como etiquetas (contenido en Assumptions).
- **FR-003**: Una categoría MAY tener una nota visible corta que aclare el nivel (ej.
  "Conocimientos" en Backend).
- **FR-004**: Una categoría MAY marcarse como destacada; la destacada MUST usar el acento ámbar
  y mantener contraste WCAG AA. Solo "IA aplicada" se destaca.
- **FR-005**: Todo el contenido MUST salir del archivo de datos de la sección, con tipos
  definidos; el componente no tiene texto de contenido.
- **FR-006**: Sin categorías válidas, la sección MUST NOT mostrarse y su link MUST NOT aparecer
  en la navegación. Categorías sin nombre o sin tecnologías, y tecnologías vacías o repetidas,
  MUST NOT mostrarse.
- **FR-007**: La navegación MUST incluir "Stack" en el orden de la página, en línea y en el menú
  móvil; al activarla, o al abrir la URL con el ancla, el título queda visible.
- **FR-008**: El título MUST usar la tipografía pixel y el acento ámbar; las etiquetas MUST
  reutilizar el estilo de etiquetas de "Experiencia" para que el sitio sea consistente.
- **FR-009**: Las categorías MUST entrar con una animación ligada al scroll que termina con todo
  visible y nítido; con movimiento reducido o sin soporte, MUST verse completas y estáticas.
- **FR-010**: La sección MUST verse completa, sin scroll horizontal, en 360px, 768px, 1280px,
  móvil horizontal y zoom 200%.
- **FR-011**: Si la sección falla al mostrarse, el resto del sitio MUST seguir funcionando.
- **FR-012**: En desarrollo, el contenido inválido (categoría sin nombre o sin tecnologías,
  tecnología vacía o repetida, más de una categoría destacada) MUST generar un aviso en la
  consola; en producción se oculta sin romper la página.

### Key Entities

- **Stack (StackContent)**: el contenido de la sección. Atributos: título y lista ordenada de
  categorías.
- **Categoría (StackGroup)**: nombre, nota opcional, si está destacada y lista de tecnologías.
- **Sección (Section)**: ya existe; se agrega "Stack" al registro con su `hasContent`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Mirando la sección 10 segundos, al menos 4 de 5 personas pueden nombrar 3
  tecnologías de frontend de Tomás y decir que trabaja con IA.
- **SC-002**: Lighthouse ≥ 90 en las 4 categorías, en mobile y desktop, con la sección incluida.
- **SC-003**: El layout no salta al cargar ni al animar (CLS menor a 0,1).
- **SC-004**: El 100% de la sección se recorre con teclado y la navegación lleva a "Stack" en 1
  acción.
- **SC-005**: Con contenido vacío, la sección y su link no aparecen (0 títulos sin contenido).

## Assumptions

- **Contenido** (del CV en `public/cv/`, sección "Habilidades técnicas", el 2026-11-24; se
  ajusta en el archivo de datos sin tocar la spec):
  1. **Frontend**: React, Next.js, TypeScript, JavaScript, Vite, HTML, CSS, Tailwind CSS,
     Diseño responsive.
  2. **Estado y datos**: Redux, Zustand, Context API, TanStack Query, APIs REST.
  3. **Formularios y validación**: React Hook Form, Zod, Yup.
  4. **IA aplicada** (destacada): AI-Driven Development, Spec-Driven Development, Desarrollo
     agéntico, Claude Code.
  5. **Herramientas**: Git, GitHub, GitLab, Docker, Figma, Jira, Scrum.
  6. **Backend** (nota: "Conocimientos"): Node.js, Express, NestJS, Supabase, PostgreSQL.
- **Claude Code** aparece como herramienta del stack, igual que Git o Docker, porque figura en el
  CV; si Tomás prefiere no nombrar marcas de IA, se quita de la data sin tocar la spec.
- **Sin niveles ni porcentajes**: no se muestran barras de nivel ni años por tecnología (no son
  verificables); el único matiz de nivel es la nota de Backend.
- **Sin íconos ni logos de tecnologías**: se mantiene la estética pixel con etiquetas de texto;
  se puede evaluar en una iteración visual posterior.
- **Stack del Hero**: el Hero sigue mostrando su resumen de 3 tecnologías (`profile.stack`); esta
  sección es el detalle.
- **Animación**: el tipo exacto se define en el plan, reusando `dot-assemble` y `reveal` y
  respetando la constitución (Principio V).
- **Fuera de alcance**: Formación, Contacto y la versión en inglés.
