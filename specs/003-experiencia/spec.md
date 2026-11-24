# Feature Specification: Experiencia

**Feature Branch**: `003-experiencia`

**Created**: 2026-11-24

**Status**: Draft

**Input**: User description: "Sección Experiencia, debajo de Sobre mí. Contenido resumido a
partir del CV (Seeker Parking), atractivo visualmente y fácil de escanear para reclutadores."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El reclutador ve dónde trabaja Tomás y qué hace (Priority: P1)

Un reclutador baja desde "Sobre mí" y encuentra "Experiencia". En pocos segundos ve el puesto,
la empresa, el período, la modalidad y 4 logros concretos, sin leer párrafos largos.

**Why this priority**: la experiencia es lo primero que valida un reclutador después de saber
quién es la persona.

**Independent Test**: abrir el sitio, bajar hasta "Experiencia" en 360px y en 1280px: se ven el
puesto, la empresa, el período, la modalidad, una frase de contexto y los 4 logros.

**Acceptance Scenarios**:

1. **Given** un visitante en "Sobre mí", **When** sigue scrolleando, **Then** la siguiente
   sección es "Experiencia", con ese título y la experiencia en Seeker Parking.
2. **Given** la experiencia en pantalla, **When** el visitante la mira, **Then** ve el puesto,
   la empresa con su rubro, el período ("Sep 2024 – Actualidad") y la modalidad ("Remoto").
3. **Given** los logros, **When** el visitante los lee, **Then** son 4 frases de no más de 20
   palabras cada una, con el dato concreto destacado cuando lo hay (por ejemplo, "+20 pantallas").
4. **Given** la experiencia, **When** el visitante la escanea, **Then** ve las tecnologías
   usadas como etiquetas.

---

### User Story 2 - La sección acompaña la identidad (Priority: P2)

La experiencia se presenta como una línea de tiempo con estética pixel/dot-matrix: un punto
marca el puesto actual y la sección entra con una animación sutil ligada al scroll. Con
movimiento reducido o sin soporte, se ve completa y estática.

**Why this priority**: el portafolio tiene que entrar por los ojos, pero el contenido funciona
sin animación.

**Independent Test**: scrollear con un navegador con soporte (la experiencia entra y queda
nítida), con "reducir movimiento" activado y en uno sin soporte (completa y estática).

**Acceptance Scenarios**:

1. **Given** un navegador con soporte y sin movimiento reducido, **When** la sección entra en
   pantalla, **Then** el título se arma en puntos como en "Sobre mí" y la experiencia aparece de
   forma progresiva, terminando visible y nítida antes de llegar a la mitad de la pantalla.
2. **Given** movimiento reducido o un navegador sin soporte, **When** el visitante llega a la
   sección, **Then** todo se ve completo y legible, sin partes ocultas ni transparentes.
3. **Given** el puesto actual, **When** se muestra, **Then** se distingue como "actual" con el
   acento ámbar de forma visible y también como texto (no solo por color).

---

### User Story 3 - Navegación (Priority: P3)

El header suma "Experiencia" a la navegación.

**Why this priority**: la base de navegación ya existe; solo se agrega una entrada.

**Independent Test**: activar "Experiencia" en el header con mouse y con teclado; la página se
posiciona en la sección.

**Acceptance Scenarios**:

1. **Given** las tres secciones con contenido, **When** carga la página, **Then** la navegación
   muestra "Inicio", "Sobre mí" y "Experiencia", en ese orden.
2. **Given** el contenido de "Experiencia" vacío, **When** carga la página, **Then** no se
   muestran la sección ni su link.

---

### Edge Cases

- **Sin experiencias válidas**: la sección y su link no se muestran.
- **Experiencia incompleta**: sin puesto, empresa o fecha de inicio, la experiencia no se
  muestra; un logro o una etiqueta vacía no se muestran.
- **Varias experiencias**: se muestran de la más reciente a la más antigua sobre la misma línea
  de tiempo (hoy hay una; el modelo admite más).
- **Error en la sección**: si "Experiencia" falla, el resto del sitio sigue funcionando.
- **Texto largo o zoom 200%**: se reacomoda sin cortarse ni generar scroll horizontal; las
  etiquetas pasan a la línea siguiente.
- **Llegada directa por ancla**: `#experiencia` en la URL posiciona la página en la sección.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST mostrar la sección "Experiencia" inmediatamente debajo de "Sobre
  mí", con un título de segundo nivel "Experiencia" y un ancla `#experiencia`.
- **FR-002**: Cada experiencia MUST mostrar puesto, empresa, rubro de la empresa, período
  (inicio y fin, o "Actualidad"), modalidad, una frase de contexto, una lista de logros y las
  tecnologías como etiquetas (contenido en Assumptions).
- **FR-003**: Los logros MUST ser como máximo 4 por experiencia, de hasta 20 palabras cada uno,
  y pueden destacar un dato concreto con el acento visual.
- **FR-004**: Las experiencias MUST ordenarse de la más reciente a la más antigua; la actual se
  marca como "actual" con texto visible, además del color.
- **FR-005**: Las fechas MUST mostrarse en español y la estructura (lista de experiencias,
  período, lista de logros) MUST exponerse a tecnologías de asistencia.
- **FR-006**: Todo el contenido MUST salir del archivo de datos de la sección, con tipos
  definidos; el componente no tiene texto de contenido.
- **FR-007**: Sin experiencias válidas, la sección MUST NOT mostrarse y su link MUST NOT aparecer
  en la navegación. Experiencias incompletas, logros y etiquetas vacíos MUST NOT mostrarse.
- **FR-008**: La navegación MUST incluir "Experiencia" en el orden de la página; al activarla, o
  al abrir la URL con el ancla, el título queda visible y sin tapar.
- **FR-009**: El título MUST usar la tipografía pixel y el acento ámbar; la línea de tiempo MUST
  usar elementos de la identidad dot-matrix, con contraste WCAG AA.
- **FR-010**: La sección MUST entrar con una animación ligada al scroll que termina con todo
  visible y nítido; con movimiento reducido o sin soporte, MUST verse completa y estática.
- **FR-011**: La sección MUST verse completa, sin scroll horizontal, en 360px, 768px, 1280px,
  móvil horizontal y zoom 200%.
- **FR-012**: Si la sección falla al mostrarse, el resto del sitio MUST seguir funcionando.
- **FR-013**: En desarrollo, el contenido inválido (experiencia sin puesto, empresa o inicio;
  logro vacío; fecha de fin anterior a la de inicio) MUST generar un aviso en la consola; en
  producción se oculta sin romper la página.

### Key Entities

- **Experiencia (Experience)**: un puesto. Atributos: puesto, empresa, rubro, inicio, fin
  (opcional: sin fin = actual), modalidad, contexto, logros y tecnologías.
- **Logro (Highlight)**: una frase, con un dato destacado opcional.
- **Sección (Section)**: ya existe; se agrega "Experiencia" al registro con su `hasContent`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Mirando la sección 10 segundos, al menos 4 de 5 personas pueden decir dónde
  trabaja Tomás, desde cuándo y al menos un logro.
- **SC-002**: Lighthouse ≥ 90 en las 4 categorías, en mobile y desktop, con la sección incluida.
- **SC-003**: El layout no salta al cargar ni al animar (CLS menor a 0,1).
- **SC-004**: El 100% de la sección se recorre con teclado y la navegación lleva a
  "Experiencia" en 1 acción.
- **SC-005**: Con contenido vacío, la sección y su link no aparecen (0 títulos sin contenido).

## Assumptions

- **Contenido** (resumido del CV en `public/cv/` el 2026-11-24, a pedido de Tomás; se ajusta en el
  archivo de datos sin tocar la spec):
  - Puesto: Frontend Developer
  - Empresa: Seeker Parking · Rubro: SaaS de estacionamiento inteligente
  - Período: septiembre 2024 – Actualidad · Modalidad: Remoto
  - Contexto: "Construyo la nueva plataforma que reemplaza al sistema legacy, en un equipo ágil
    de 6 a 10 personas junto a backend, QA y producto."
  - Logros:
    1. "+20 pantallas" del panel administrativo y la app para clientes de la nueva plataforma.
    2. Flujos de registro y compra (checkout) con formularios validados e integración de APIs
       REST.
    3. Componentes reutilizables: tablas de datos, skeletons, selects con autocompletado y
       recorte de imágenes.
    4. Desarrollo con IA de forma agéntica: defino specs, reviso la arquitectura y valido el
       código antes de integrarlo.
  - Tecnologías: React, TypeScript, Next.js, Vite, React Hook Form, Zod, APIs REST, Scrum.
- **Sin logo ni link de la empresa**: el CV no los incluye; se pueden agregar después como campo
  opcional.
- **Fuera del resumen**: el mantenimiento del sistema legacy (HTML, CSS, jQuery) y el trabajo
  desde diseños de Figma quedan en el CV descargable.
- **Animación**: el tipo exacto se define en el plan, reusando el patrón del título de "Sobre
  mí" y respetando la constitución (Principio V).
- **Fuera de alcance**: Stack, Formación, Contacto y la versión en inglés.
