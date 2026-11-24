# Feature Specification: Formación

**Feature Branch**: `005-formacion`

**Created**: 2026-11-24

**Status**: Draft

## Clarifications

### Session 2026-11-24 (después del merge, al cargar los certificados reales)

- Q: Con 32 certificados la tarjeta queda más alta que la pantalla, ¿cómo se muestran? → A: los 5
  más recientes por categoría y un desplegable "Ver los N" con el resto; arriba, la cantidad total
  de cursos aprobados y un link al perfil de Platzi.
- Q: ¿Se incluyen los certificados de IA con marca ("Curso de Claude Code", "Curso de Codex")? →
  A: sí; son certificados reales y verificables (la regla de no nombrar marcas de IA aplica al
  Stack).

**Input**: User description: "Sección Formación y certificaciones, debajo de Stack: título técnico,
certificaciones de Platzi agrupadas por categoría (IA, Inglés, Frontend, Backend) e idiomas.
Contenido del CV. Las certificaciones se cargan cuando Tomás pase la lista; hasta entonces, la
sección sale con el título y los idiomas ('lo que mejor resultado me dé')."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El reclutador ve la formación y los idiomas (Priority: P1)

Un reclutador baja desde "Stack" y encuentra "Formación". En pocos segundos ve el título
técnico (institución y años) y los idiomas con su nivel.

**Why this priority**: muchos procesos piden título y nivel de inglés; es el mínimo de la sección.

**Independent Test**: abrir el sitio, bajar hasta "Formación" en 360px y 1280px: se ven el
título, la institución, "2015 – 2022" y los dos idiomas con su nivel.

**Acceptance Scenarios**:

1. **Given** un visitante en "Stack", **When** sigue scrolleando, **Then** la siguiente sección
   es "Formación", con un bloque "Título" y un bloque "Idiomas".
2. **Given** el bloque "Título", **When** el visitante lo mira, **Then** ve "Técnico Superior en
   Programación", la institución con su ciudad y el período.
3. **Given** el bloque "Idiomas", **When** el visitante lo mira, **Then** ve cada idioma con su
   nivel y, si existe, una aclaración (ej. "lectura de documentación técnica").
4. **Given** un lector de pantalla, **When** recorre "Idiomas", **Then** cada nivel se anuncia
   asociado a su idioma.

---

### User Story 2 - El reclutador verifica certificaciones (Priority: P2)

Cuando hay certificaciones cargadas, aparecen agrupadas por categoría (IA, Inglés, Frontend,
Backend), cada una con su fecha y un link de verificación que abre en una pestaña nueva.

**Why this priority**: suma credibilidad verificable; la sección funciona sin ellas.

**Independent Test**: cargar 2 certificaciones de prueba en categorías distintas: aparece el
bloque "Certificaciones" con 2 grupos, fechas y links; con la lista vacía, el bloque no aparece.

**Acceptance Scenarios**:

1. **Given** certificaciones cargadas, **When** el visitante llega a la sección, **Then** ve el
   bloque "Certificaciones" con los grupos en orden IA, Inglés, Frontend, Backend, solo los que
   tienen certificaciones, y dentro de cada grupo de la más reciente a la más antigua.
2. **Given** una certificación, **When** el visitante activa su link, **Then** se abre la URL de
   verificación en una pestaña nueva, sin dar acceso a la página de origen, y un lector de
   pantalla anuncia que abre en una pestaña nueva.
3. **Given** la lista vacía, **When** carga la página, **Then** no aparece el bloque ni un título
   vacío.
4. **Given** el chequeo de links previo al deploy, **When** se ejecuta, **Then** verifica las URLs
   de todas las certificaciones.

---

### User Story 3 - La sección acompaña la identidad (Priority: P2)

El título se arma en puntos y los bloques aparecen al scrollear, con el mismo estilo de tarjetas
de "Stack". Con movimiento reducido o sin soporte, todo se ve completo y estático.

**Independent Test**: scrollear hasta el final de la página en Chrome (todo opaco y nítido), con
"reducir movimiento" y en un navegador sin soporte (todo estático).

**Acceptance Scenarios**:

1. **Given** un navegador con soporte, **When** la sección entra en pantalla, **Then** los
   bloques aparecen de forma progresiva y terminan visibles, aunque la sección sea la última de la
   página.
2. **Given** movimiento reducido o sin soporte, **When** el visitante llega, **Then** todo se ve
   completo, sin partes ocultas ni transparentes.
3. **Given** cualquier viewport, **When** se muestran los bloques, **Then** van apilados en móvil y
   "Título" e "Idiomas" lado a lado desde tablet, con "Certificaciones" a todo el ancho debajo.

---

### User Story 4 - Navegación (Priority: P3)

La navegación suma "Formación".

**Acceptance Scenarios**:

1. **Given** las cinco secciones con contenido, **When** carga la página, **Then** la navegación
   muestra "Formación" después de "Stack", en línea y en el menú móvil.
2. **Given** título, idiomas y certificaciones vacíos, **When** carga la página, **Then** no se
   muestran la sección ni su link.

---

### Edge Cases

- **Sin títulos ni idiomas ni certificaciones válidos**: la sección y su link no se muestran.
- **Un bloque vacío**: no se muestra; los demás ocupan el espacio sin huecos.
- **Título incompleto** (sin nombre, institución o año de inicio, o fin anterior al inicio): no
  se muestra.
- **Idioma sin nombre o sin nivel**: no se muestra.
- **Certificación inválida** (sin título, categoría fuera de las 4, fecha inválida o URL que no
  es https): no se muestra.
- **Error en la sección**: el resto del sitio sigue funcionando.
- **Texto largo o zoom 200%**: se reacomoda sin cortarse ni generar scroll horizontal.
- **Llegada directa por ancla**: `#formacion` posiciona la página en la sección.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST mostrar la sección "Formación" debajo de "Stack", con un título de
  segundo nivel "Formación" y un ancla `#formacion`.
- **FR-002**: La sección MUST mostrar un bloque "Título" con nombre del título, institución,
  ciudad (opcional) y período en años.
- **FR-003**: La sección MUST mostrar un bloque "Idiomas" con nombre, nivel y aclaración
  opcional de cada idioma, con la relación idioma–nivel expuesta a tecnologías de asistencia.
- **FR-004**: Si hay certificaciones válidas, la sección MUST mostrar un bloque "Certificaciones"
  agrupado por categoría en el orden IA, Inglés, Frontend, Backend (solo grupos con ítems), cada
  ítem con título, fecha ("Mes Año") y link de verificación. Por categoría se ven los 5 más
  recientes; el resto queda en un desplegable "Ver los N" operable con teclado y sin JS. Arriba del
  bloque, la cantidad total de certificaciones válidas y un link al perfil público (pestaña nueva).
- **FR-005**: Los links de certificaciones MUST abrir en una pestaña nueva con
  `noopener noreferrer` y anunciar a tecnologías de asistencia que abren en una pestaña nueva.
- **FR-006**: Las categorías de certificaciones MUST ser solo `ai`, `english`, `frontend` y
  `backend` (constitución, Principio II).
- **FR-007**: Todo el contenido MUST salir de los archivos de datos (formación y
  certificaciones), con tipos definidos; el componente no tiene texto de contenido.
- **FR-008**: Bloques sin ítems válidos MUST NOT mostrarse; sin ningún bloque, la sección y su
  link MUST NOT mostrarse.
- **FR-009**: La navegación MUST incluir "Formación" en el orden de la página.
- **FR-010**: El título MUST usar la tipografía pixel y el acento ámbar; los bloques MUST seguir
  el estilo de tarjetas de "Stack". Los bloques MUST entrar con animación ligada al scroll que
  termina con todo visible; con movimiento reducido o sin soporte, MUST verse estáticos.
- **FR-011**: La sección MUST verse completa, sin scroll horizontal, en 360px, 768px, 1280px,
  móvil horizontal y zoom 200%.
- **FR-012**: Si la sección falla, el resto del sitio MUST seguir funcionando.
- **FR-013**: En desarrollo, el contenido inválido MUST generar un aviso en la consola; en
  producción se oculta sin romper la página.
- **FR-014**: El chequeo de links previo al deploy MUST incluir las URLs de las certificaciones.

### Key Entities

- **Formación (EducationContent)**: título de la sección, etiquetas de los bloques, títulos e
  idiomas.
- **Título (Degree)**: nombre, institución, ciudad opcional, año de inicio y de fin.
- **Idioma (Language)**: nombre, nivel y aclaración opcional.
- **Certificación (Certification)**: título, categoría, fecha y URL de verificación.
- **Certificaciones (CertificationsContent)**: etiqueta del bloque, nombres de las categorías,
  aviso de pestaña nueva y lista de certificaciones.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Mirando la sección 10 segundos, al menos 4 de 5 personas pueden decir qué estudió
  Tomás y su nivel de inglés.
- **SC-002**: Lighthouse ≥ 90 en las 4 categorías, en mobile y desktop.
- **SC-003**: CLS menor a 0,1.
- **SC-004**: El 100% de la sección y sus links se recorren con teclado.
- **SC-005**: 0 links de certificaciones rotos en el chequeo previo al deploy.

## Assumptions

- **Contenido** (del CV en `public/cv/`, 2026-11-24):
  - Título: Técnico Superior en Programación · E.E.S.T. N.º 2 "Felipe Senillosa" · Tandil ·
    2015 – 2022.
  - Idiomas: Español — Nativo; Inglés — Básico (lectura de documentación técnica).
- **Certificaciones**: 32 cursos aprobados del perfil público de Platzi (leído el 2026-11-24),
  clasificados en las 4 categorías: IA 2, Inglés 6, Frontend 22, Backend 2. Platzi responde 403 a
  clientes automáticos; `check:links` lo marca para verificar a mano, como LinkedIn.
- **Nivel de idioma como texto**: sin barras ni porcentajes (mismo criterio que Stack).
- **Fuera de alcance**: Contacto y la versión en inglés.
