# Feature Specification: Sobre mí

**Feature Branch**: `002-sobre-mi`

**Created**: 2026-11-18

**Status**: Draft

**Input**: User description: "Sobre mí — segunda sección del portafolio, debajo del Hero. Tiene
que lograr que un reclutador o un programador conozca a Tomás como persona en menos de 1 minuto
de lectura: de dónde viene, por qué programa, qué disfruta y hacia dónde va. Tono humano y
cercano, no de CV. Incluye un bloque de datos rápidos escaneable, suma el link en la navegación
y mantiene la identidad pixel/dot-matrix."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El visitante conoce a Tomás como persona (Priority: P1)

Un reclutador o un programador ya vio el Hero y sigue bajando. Encuentra la sección "Sobre mí" y,
en menos de un minuto, entiende de dónde viene Tomás, por qué programa, qué disfruta de su
trabajo y hacia dónde quiere crecer. El texto suena a una persona, no a un CV.

**Why this priority**: es el objetivo de la feature. Un perfil con historia propia se recuerda
más que una lista de tecnologías, y el Hero ya cubre el "quién y cómo contactarlo".

**Independent Test**: abrir el sitio, bajar hasta "Sobre mí" y leer la sección completa en 360px y
en 1280px: tiene el título, los 4 párrafos en orden y se lee en menos de 1 minuto.

**Acceptance Scenarios**:

1. **Given** un visitante en el Hero, **When** scrollea hacia abajo, **Then** la siguiente
   sección es "Sobre mí", con ese título y los 4 párrafos del contenido acordado, en ese orden.
2. **Given** la sección en pantalla, **When** el visitante la lee, **Then** el texto está en
   primera persona y en español, y no repite la lista de tareas del CV.
3. **Given** el párrafo que menciona la forma de trabajar con IA, **When** el visitante lo lee,
   **Then** el texto remite a la sección "Cómo trabajo" para el detalle, sin enlazar a una
   sección que todavía no existe.

---

### User Story 2 - El reclutador escanea los datos clave sin leer párrafos (Priority: P2)

Un reclutador con poco tiempo no lee prosa. Junto al texto encuentra un bloque de datos rápidos
(base, experiencia, enfoque y qué busca) que puede escanear en pocos segundos.

**Why this priority**: muchos reclutadores escanean; el bloque complementa el texto, pero la
sección ya cumple su objetivo con los párrafos solos.

**Independent Test**: mirar solo el bloque de datos rápidos durante 10 segundos y poder decir
dónde está Tomás, cuánta experiencia tiene, en qué se enfoca y qué busca.

**Acceptance Scenarios**:

1. **Given** la sección "Sobre mí", **When** el visitante mira el bloque de datos rápidos,
   **Then** ve 4 datos, cada uno con una etiqueta y un valor: Base, Experiencia, Enfoque y Busco.
2. **Given** un lector de pantalla, **When** recorre el bloque, **Then** cada valor se anuncia
   asociado a su etiqueta.
3. **Given** un viewport de 360px, **When** se muestra el bloque, **Then** los datos se apilan
   sin cortarse ni generar scroll horizontal.

---

### User Story 3 - El visitante navega entre secciones desde el header (Priority: P2)

Con dos secciones con contenido, el header muestra la navegación. El visitante puede ir a "Sobre
mí" o volver a "Inicio" con un clic o con el teclado.

**Why this priority**: la regla de navegación ya existe desde la feature 001; esta feature es la
primera que la activa y tiene que funcionar bien.

**Independent Test**: desde el Hero, activar "Sobre mí" en el header con mouse y con teclado; la
página se posiciona en la sección. Repetir con "Inicio".

**Acceptance Scenarios**:

1. **Given** el sitio con Hero y "Sobre mí" con contenido, **When** carga la página, **Then** el
   header muestra una navegación con los links "Inicio" y "Sobre mí", en ese orden.
2. **Given** el header, **When** el visitante activa "Sobre mí", **Then** la página se posiciona
   en la sección y el título no queda tapado por ningún elemento.
3. **Given** el contenido de "Sobre mí" vacío, **When** carga la página, **Then** no se muestran ni
   la sección ni su link, y como solo queda "Inicio", la navegación tampoco se muestra.

---

### User Story 4 - La sección acompaña la identidad sin estorbar la lectura (Priority: P3)

Al entrar en pantalla, la sección aparece con una animación sutil ligada al scroll, coherente con
la identidad pixel/dot-matrix. Quien prefiere menos movimiento, o usa un navegador sin soporte,
la ve completa y estática.

**Why this priority**: suma a la identidad, pero el contenido funciona sin animación.

**Independent Test**: scrollear en un navegador con soporte (la sección entra animada y queda
nítida), con "reducir movimiento" activado y en uno sin soporte (en ambos casos se ve completa y
estática desde el primer momento).

**Acceptance Scenarios**:

1. **Given** un navegador con soporte y sin movimiento reducido, **When** la sección entra en
   pantalla, **Then** aparece de forma progresiva ligada al scroll y termina completamente
   visible y nítida antes de que su texto llegue a la mitad de la pantalla.
2. **Given** movimiento reducido activado o un navegador sin soporte, **When** el visitante
   llega a la sección, **Then** el contenido se ve completo y legible, sin partes ocultas ni
   transparentes.
3. **Given** cualquier navegador, **When** la sección está en pantalla, **Then** el título usa la
   tipografía pixel de la identidad y el acento ámbar.

---

### Edge Cases

- **Contenido vacío**: si no hay párrafos con texto, la sección y su link de navegación no se
  muestran (nunca un título sin contenido).
- **Bloque de datos vacío o incompleto**: si no hay datos rápidos válidos, la sección se muestra
  solo con los párrafos; un dato sin etiqueta o sin valor no se muestra.
- **Párrafo vacío**: un párrafo sin texto no se muestra y no deja un hueco en el diseño.
- **Error en la sección**: si "Sobre mí" falla al mostrarse, el Hero, el header y el pie siguen
  funcionando.
- **Texto largo o zoom 200%**: el texto se reacomoda sin cortarse ni generar scroll horizontal.
- **Llegada directa por ancla**: abrir el sitio con `#sobre-mi` en la URL posiciona la página en la
  sección.
- **Recorrido de scroll del Hero**: al quitar el espacio extra del pie, el efecto de salida del
  Hero tiene que seguir completándose al bajar.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST mostrar la sección "Sobre mí" inmediatamente debajo del Hero, con un
  título visible "Sobre mí" de segundo nivel y un ancla `#sobre-mi`.
- **FR-002**: La sección MUST mostrar, en este orden, los 4 párrafos acordados (ver Assumptions →
  Contenido), en primera persona y en español.
- **FR-003**: El párrafo sobre la forma de trabajar con IA MUST mencionar "Cómo trabajo" como
  texto; se convierte en link cuando esa sección exista (feature propia).
- **FR-004**: La sección MUST incluir un bloque de datos rápidos con 4 pares etiqueta–valor:
  Base, Experiencia, Enfoque y Busco (valores en Assumptions), con la relación etiqueta–valor
  expuesta a tecnologías de asistencia.
- **FR-005**: Todo el contenido de la sección MUST salir del archivo de datos de la sección, con
  tipos definidos; el componente no tiene texto de contenido.
- **FR-006**: Si el contenido no tiene ningún párrafo con texto, la sección MUST NOT mostrarse y
  su link MUST NOT aparecer en la navegación. Párrafos y datos vacíos o incompletos MUST NOT
  mostrarse.
- **FR-007**: El header MUST mostrar la navegación con "Inicio" y "Sobre mí" cuando ambas
  secciones tienen contenido, en el orden de la página, operable con mouse y teclado y con foco
  visible.
- **FR-008**: Al activar un link de la navegación (o abrir la URL con su ancla), la página MUST
  posicionarse en la sección con su título visible, sin quedar tapado.
- **FR-009**: El título MUST usar la tipografía pixel y el acento ámbar de la identidad; el texto
  de los párrafos MUST tener un largo de línea cómodo de leer en desktop (aprox. 60–75
  caracteres) y contraste WCAG AA.
- **FR-010**: La sección MUST entrar con una animación sutil ligada al scroll, coherente con la
  identidad, que termina con todo visible y nítido. Con movimiento reducido o sin soporte, MUST
  verse completa y estática desde el inicio, sin partes ocultas ni transparentes.
- **FR-011**: La sección MUST verse completa y legible, sin scroll horizontal, en 360px, 768px,
  1280px, móvil horizontal y con zoom 200%.
- **FR-012**: Si la sección falla al mostrarse, el resto del sitio MUST seguir funcionando.
- **FR-013**: En desarrollo, el contenido inválido (párrafo vacío, dato sin etiqueta o sin valor)
  MUST generar un aviso en la consola; en producción se oculta sin romper la página.
- **FR-014**: El pie de página MUST dejar de ocupar el alto de pantalla completa si con esta
  sección ya hay recorrido suficiente para que el efecto de salida del Hero se complete; si no
  alcanza, se ajusta lo mínimo necesario.
- **FR-015**: La jerarquía de títulos del sitio MUST seguir siendo correcta: un solo título
  principal (el nombre en el Hero) y un título de segundo nivel por sección.

### Key Entities

- **Sobre mí (About)**: el contenido de la sección. Atributos: título, lista ordenada de párrafos
  y lista de datos rápidos.
- **Dato rápido (QuickFact)**: un par escaneable. Atributos: etiqueta (por ejemplo "Base") y
  valor (por ejemplo "Tandil, Argentina · Remoto").
- **Sección (Section)**: ya existe desde la feature 001; "Sobre mí" pasa a tener contenido y por
  eso aparece en la navegación.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona que no conoce a Tomás lee la sección completa en menos de 1 minuto y,
  al terminar, puede decir por qué programa, qué disfruta y hacia dónde quiere crecer (prueba con
  5 personas, al menos 4 de 5 aciertan las tres).
- **SC-002**: Mirando solo el bloque de datos rápidos durante 10 segundos, al menos 4 de 5
  personas pueden decir la base, la experiencia y qué busca Tomás.
- **SC-003**: Lighthouse ≥ 90 en las 4 categorías (Performance, Accessibility, Best Practices y
  SEO), en mobile y desktop, con la sección incluida.
- **SC-004**: El layout no salta al cargar ni al animar (CLS menor a 0,1).
- **SC-005**: El 100% de la sección se puede recorrer y navegar con teclado, y la navegación
  lleva a "Sobre mí" y de vuelta a "Inicio" en 1 acción cada una.
- **SC-006**: Con contenido vacío, la sección y su link no aparecen (0 títulos sin contenido).

## Assumptions

- **Contenido** (entregado por Tomás el 2026-11-18, tono aprobado):
  1. "Soy Frontend Developer en Tandil, Argentina. Hace dos años construyo productos SaaS con
     React, TypeScript y Next.js, y hoy formo parte del equipo que está rehaciendo de cero la
     plataforma de un SaaS de estacionamiento inteligente."
  2. "Siempre me gustaron las computadoras y los videojuegos, así que la idea de trabajar frente
     a una pantalla me atraía. En la técnica descubrí la programación y me enganché con el
     ambiente: la forma de pensar los problemas y la gente que los resuelve. Lo que más disfruto
     es crear: tomar una idea y llevarla hasta algo que se vea y se sienta bien."
  3. "Trabajo con IA de forma agéntica y escribo especificaciones antes del código (lo cuento en
     detalle en Cómo trabajo)."
  4. "Mi próximo paso es crecer como Software Engineer, mejorar mi inglés y trabajar con equipos
     de afuera. Fuera del código, juego y le dedico tiempo a mi setup."
- **Datos rápidos** (derivados del CV y de las respuestas de Tomás; se pueden ajustar en el
  archivo de datos sin tocar la spec):
  - Base: Tandil, Argentina · Remoto
  - Experiencia: 2 años en productos SaaS
  - Enfoque: Frontend · AI-Driven Development
  - Busco: crecer como Software Engineer en equipos de afuera
- **Sin imagen**: la sección va solo con texto (decisión de la feature 001, Session 2026-11-17).
- **"Cómo trabajo"** es una feature posterior; hasta entonces, la mención queda como texto.
- **Navegación**: se mantiene la base de la feature 001 (solo secciones existentes con
  contenido) con un cambio: la navegación lista todas, incluida "Inicio", y aparece cuando hay 2
  o más.
- **Animación**: el tipo exacto de entrada (por ejemplo, el título que se "arma" en puntos y el
  texto que aparece) se define en el plan, respetando FR-010 y la constitución (Principio V).
- **Fuera de alcance**: "Cómo trabajo", Experiencia, Proyectos, Stack, Formación, Contacto y la
  versión en inglés.
