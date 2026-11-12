# Feature Specification: Hero y base del portafolio

**Feature Branch**: `001-hero-base`

**Created**: 2026-11-12

**Status**: Draft

**Input**: User description: "Hero y base del portafolio — primera pantalla del portafolio de
Tomás De Miguel, Frontend Developer, para que un reclutador de RRHH o un programador entienda en
menos de 30 segundos quién es, qué hace, dónde está y cómo contactarlo, con identidad
pixel/dot-matrix y animaciones al hacer scroll. Incluye la base común (tipado estricto, design
tokens, tipografías, tipos de contenido, layout, navegación, meta tags, manejo de errores y
validación de data en desarrollo) que van a usar las secciones siguientes."

## Clarifications

### Session 2026-11-12

- Q: ¿Qué base de colores querés para la identidad pixel/dot-matrix del portafolio? → A: Oscuro
  + un acento: fondo casi negro, texto blanco roto y un único color de acento, estilo display LED.
- Q: ¿El Hero tiene que mostrar una foto tuya? → A: Sí, una foto con tratamiento
  pixel/dot-matrix (la foto convertida en puntos, coherente con la identidad).
- Q: Al scrollear hacia abajo, ¿qué partes del Hero se transforman con el efecto
  pixel/dot-matrix? → A: El nombre y la foto se "desarman" en puntos al salir de pantalla; rol,
  stack, ubicación, links y CV solo se desvanecen.
- Q: Cuando alguien hace clic en el botón del CV, ¿el PDF se descarga directo o se abre en una
  pestaña nueva? → A: Se abre en una pestaña nueva (botón "Ver CV"); desde el visor del
  navegador se puede descargar.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El reclutador entiende quién es Tomás en segundos (Priority: P1)

Un reclutador (de RRHH o técnico) abre el link del portafolio, por ejemplo desde LinkedIn o un
email. Sin scrollear ni tocar nada, ve el nombre, el rol, el stack principal, la ubicación con
disponibilidad remota, los links de contacto y un botón para ver el CV. En pocos segundos
sabe quién es Tomás, qué hace y cómo contactarlo.

**Why this priority**: es el objetivo central del portafolio (Principio I). Si solo existiera
esta pantalla, el reclutador ya podría evaluar el perfil y contactarlo.

**Independent Test**: abrir el sitio en un viewport de 360px y uno de 1280px y verificar que toda
la información y las acciones de contacto se ven en la primera pantalla, sin scroll.

**Acceptance Scenarios**:

1. **Given** un visitante que abre el sitio por primera vez, **When** la página termina de cargar,
   **Then** ve, sin scrollear, el nombre "Tomás De Miguel" como titular principal, el rol
   "Frontend Developer Semi Senior | AI-Driven Development", el stack "React · TypeScript ·
   Next.js" y la ubicación "Tandil, Argentina · Disponible para trabajo remoto".
2. **Given** el visitante en la primera pantalla, **When** activa el link de LinkedIn o de GitHub,
   **Then** el perfil correspondiente se abre en una pestaña nueva y el portafolio queda abierto.
3. **Given** el visitante en la primera pantalla, **When** activa el link de email, **Then** se
   abre su cliente de correo con `dev.tomasdmiguel@gmail.com` como destinatario.
4. **Given** el visitante en la primera pantalla, **When** activa el botón "Ver CV", **Then** el
   CV en PDF se abre en una pestaña nueva, desde donde puede descargarlo, y el portafolio queda
   abierto.
5. **Given** un visitante que navega solo con teclado, **When** recorre la página con Tab,
   **Then** llega a cada link y botón en un orden lógico, con el foco siempre visible.

---

### User Story 2 - El visitante se sorprende con la identidad pixel/dot-matrix (Priority: P2)

Un programador o reclutador que ya leyó el hero empieza a scrollear. El nombre y la foto se
"desarman" en puntos al ritmo del scroll, mientras el resto del texto del hero se desvanece. La experiencia se siente original y distinta de un portafolio genérico, sin demorar la
lectura.

**Why this priority**: es el diferencial visual del portafolio, pero el contenido de la P1 ya
cumple el objetivo sin él.

**Independent Test**: en un navegador con soporte de animaciones ligadas al scroll, scrollear
lentamente y verificar que el efecto avanza y retrocede al ritmo del scroll. En un navegador sin
soporte, o con "reducir movimiento" activo, verificar que todo se ve estático y completo.

**Acceptance Scenarios**:

1. **Given** un navegador con soporte de animaciones ligadas al scroll y sin preferencia de
   movimiento reducido, **When** el visitante scrollea hacia abajo, **Then** el nombre y la foto
   se "desarman" en puntos y el rol, el stack, la ubicación, los links y el botón de CV se
   desvanecen, todo en proporción al avance del scroll.
5. **Given** el hero completamente visible (scroll en el inicio), **When** el visitante lo mira,
   **Then** ningún elemento está desarmado ni desvanecido: todo se ve nítido y opaco.
2. **Given** el mismo visitante, **When** scrollea de vuelta hacia arriba, **Then** el efecto se
   revierte y el hero vuelve a su estado inicial.
3. **Given** un visitante con "reducir movimiento" activo, **When** scrollea, **Then** no hay
   animación y todo el contenido se ve completo y legible.
4. **Given** un navegador sin soporte de animaciones ligadas al scroll, **When** el visitante
   carga y scrollea la página, **Then** el contenido se ve completo, estático y legible; nada
   queda oculto ni transparente.

---

### User Story 3 - El link se ve profesional al compartirlo (Priority: P2)

Un reclutador comparte el link del portafolio con un colega por LinkedIn, WhatsApp o Slack. La
vista previa muestra el nombre y el rol, una descripción breve y una imagen propia del
portafolio. En la pestaña del navegador se ve un favicon propio.

**Why this priority**: gran parte de la primera impresión se da en la vista previa del link,
antes de abrirlo.

**Independent Test**: pegar la URL de un deploy en un validador de vistas previas (o en una
conversación de LinkedIn, WhatsApp o Slack) y verificar título, descripción e imagen.

**Acceptance Scenarios**:

1. **Given** el link del portafolio pegado en LinkedIn, WhatsApp o Slack, **When** se genera la
   vista previa, **Then** muestra el título "Tomás De Miguel — Frontend Developer", una
   descripción breve en español y la imagen propia del portafolio.
2. **Given** el sitio abierto en una pestaña, **When** el visitante mira la pestaña, **Then** ve
   el título con nombre y rol y el favicon propio (no el de la plantilla).

---

### User Story 4 - Tomás puede sumar secciones sin rehacer la base (Priority: P3)

Tomás, como mantenedor, va a agregar las próximas secciones (Sobre mí, Cómo trabajo,
Experiencia, etc.) en features separadas. Necesita que el proyecto ya tenga la base común lista:
contenido separado del código y tipado, tokens de diseño y tipografías, layout, navegación que
se actualiza sola, manejo de errores por sección y avisos en desarrollo cuando la data está
incompleta.

**Why this priority**: no lo ve el visitante, pero define el costo de todas las features que
vienen.

**Independent Test**: cambiar un dato del perfil (por ejemplo, la ubicación) editando solo el
archivo de data y verificar que el hero se actualiza sin tocar componentes. Borrar un campo
obligatorio y verificar que en desarrollo aparece un aviso y que la página no se rompe.

**Acceptance Scenarios**:

1. **Given** el archivo de data del perfil, **When** Tomás cambia el rol, el stack, la ubicación
   o un link, **Then** el hero muestra el cambio sin modificar ningún componente.
2. **Given** el entorno de desarrollo, **When** a la data del perfil le falta un campo
   obligatorio o tiene una URL vacía, **Then** aparece un aviso en la consola que identifica el
   campo, y la página sigue funcionando.
3. **Given** que una sección lanza un error al renderizarse, **When** el visitante carga la
   página, **Then** esa sección no se muestra y el resto del portafolio sigue visible y
   funcional.
4. **Given** el proyecto, **When** se corren el lint y el build, **Then** ambos terminan sin
   errores y no queda ningún rastro de la plantilla inicial (logos, imágenes, contador ni
   estilos de ejemplo).

---

### Edge Cases

- **Fuente pixel no disponible**: si la tipografía pixel no carga o tarda, el nombre se muestra
  con la fuente de respaldo y se lee igual; el layout no salta de forma notable.
- **Pantallas muy chicas o móvil horizontal**: en 360px de ancho y en móvil horizontal (altura
  reducida), el nombre no se corta ni desborda horizontalmente, y la información clave y las
  acciones de contacto siguen accesibles sin scroll horizontal.
- **Foto que no carga**: si la foto falla, se muestra un fallback visual (por ejemplo, las
  iniciales en estilo pixel) del mismo tamaño; el layout no se rompe y el resto del hero se lee
  igual.
- **Nombre largo con tilde**: "Tomás" se renderiza correctamente con la tipografía pixel y con la
  de respaldo.
- **Link de CV roto**: antes de cada deploy a producción se verifica que el CV y los links de
  LinkedIn y GitHub respondan.
- **Navegación sin otras secciones**: mientras el Hero sea la única sección, la navegación no
  muestra links a secciones inexistentes ni vacías.
- **Zoom al 200%**: el contenido del hero sigue legible y operable sin pérdida de información.

## Requirements *(mandatory)*

### Functional Requirements

**Hero — contenido y acciones**

- **FR-001**: La primera pantalla MUST mostrar, sin scroll ni interacción previa, el nombre
  "Tomás De Miguel" como único titular principal de la página.
- **FR-002**: La primera pantalla MUST mostrar el rol "Frontend Developer Semi Senior |
  AI-Driven Development", el stack principal "React · TypeScript · Next.js" (con estilo de
  elemento técnico) y la ubicación "Tandil, Argentina · Disponible para trabajo remoto".
- **FR-002a**: La primera pantalla MUST mostrar una foto de Tomás con tratamiento
  pixel/dot-matrix, con texto alternativo descriptivo ("Foto de Tomás De Miguel"), dimensiones
  reservadas para que el layout no salte al cargar, y un tamaño que no desplace nombre, rol ni
  acciones de contacto fuera de la primera pantalla en 360px. El nombre sigue siendo el elemento
  con mayor jerarquía visual.
- **FR-003**: La primera pantalla MUST ofrecer links a LinkedIn, GitHub y email, y un botón
  "Ver CV" que abre el CV en PDF.
- **FR-004**: Los links externos (LinkedIn, GitHub) y el CV MUST abrirse en una pestaña nueva sin
  dar a la página destino acceso a la ventana del portafolio. El CV se muestra en el visor de PDF
  del navegador, desde donde el visitante puede descargarlo.
- **FR-005**: El link de email MUST abrir el cliente de correo del visitante con la dirección
  `dev.tomasdmiguel@gmail.com`.
- **FR-006**: Todo el texto visible MUST estar en español; los nombres de tecnologías y el
  título del rol se mantienen como se usan en la industria.
- **FR-007**: Cada link y botón MUST tener un nombre accesible que describa su destino o acción
  (por ejemplo, "LinkedIn de Tomás De Miguel", "Ver CV en PDF (se abre en una pestaña nueva)").

**Identidad visual y animación**

- **FR-008**: El nombre MUST mostrarse con la tipografía pixel de la identidad del portafolio, en
  un tamaño que se adapta de forma fluida al ancho de pantalla.
- **FR-009**: Al scrollear hacia abajo, el nombre y la foto MUST "desarmarse" en puntos
  (efecto pixel/dot-matrix), y el rol, el stack, la ubicación, los links y el botón de CV MUST
  solo desvanecerse, sin pixelarse. El avance está ligado a la posición del scroll: progresa al
  bajar y se revierte al subir. Con el scroll en el inicio, todo el hero se ve nítido y opaco.
- **FR-009a**: Los links y el botón de CV MUST seguir siendo operables mientras sean visibles,
  aunque estén parcialmente desvanecidos.
- **FR-010**: Con la preferencia "reducir movimiento" activa, o en navegadores sin soporte de
  animaciones ligadas al scroll, MUST NOT haber animación y todo el contenido MUST verse
  completo, estático y legible.
- **FR-011**: Si la tipografía pixel no carga, el texto MUST mostrarse con una fuente de
  respaldo legible.

**Navegación y layout**

- **FR-012**: El sitio MUST tener una navegación con anclas a las secciones del portafolio que
  existen y tienen contenido; MUST NOT mostrar links a secciones inexistentes o vacías.
- **FR-013**: La página MUST usar una estructura semántica (encabezado, navegación, contenido
  principal, secciones, pie) con un solo titular principal.
- **FR-014**: Todo elemento interactivo MUST ser operable por teclado, con foco visible, y tener
  un área táctil de al menos 44×44px.
- **FR-015**: El layout MUST verse y funcionar correctamente en 360px, 768px, 1280px y móvil
  horizontal, sin scroll horizontal.
- **FR-016**: Texto y elementos interactivos MUST cumplir contraste WCAG AA.

**Presentación al compartir**

- **FR-017**: El título de la página MUST ser "Tomás De Miguel — Frontend Developer".
- **FR-018**: La página MUST incluir una descripción breve en español y una imagen propia para
  vistas previas al compartir el link (LinkedIn, WhatsApp, Slack).
- **FR-019**: La pestaña MUST mostrar un favicon propio del portafolio.

**Base común**

- **FR-020**: Todo el contenido del hero (nombre, rol, stack, ubicación, links y ubicación del
  CV) MUST provenir de un archivo de data del perfil; los componentes MUST NOT tener ese texto
  escrito en su código.
- **FR-021**: La forma de la data del perfil MUST estar definida con tipos estrictos, de modo que
  un campo faltante o con tipo incorrecto se detecte antes de publicar.
- **FR-022**: En desarrollo, una validación MUST avisar en consola si a la data le falta un campo
  obligatorio o tiene una URL vacía; en producción, un ítem inválido no se muestra y no rompe la
  página.
- **FR-023**: Cada sección MUST estar protegida de modo que un error en ella no impida ver el
  resto del portafolio.
- **FR-024**: Los tokens de diseño (colores, tipografías, espaciados) y las tres familias
  tipográficas (pixel para titulares, sans para lectura, mono para elementos técnicos) MUST
  quedar definidos de forma centralizada para que las próximas secciones los reutilicen.
- **FR-024a**: La paleta MUST ser oscura con un único color de acento (estilo display LED): fondo
  casi negro, texto principal blanco roto y el acento reservado para el titular, los elementos
  "encendidos" del efecto dot-matrix y los estados de foco/hover. El acento MUST cumplir
  contraste WCAG AA sobre el fondo.
- **FR-025**: MUST eliminarse todo el contenido de ejemplo de la plantilla inicial (logos,
  imágenes, contador y estilos de ejemplo).
- **FR-026**: El proyecto MUST cumplir el stack, la estructura y las reglas de calidad de la
  constitución v1.1.0 (incluido el tipado estricto); el detalle técnico se define en el
  `plan.md`.

### Key Entities

- **Perfil (Profile)**: la información personal y profesional que muestra el hero. Atributos:
  nombre, rol, stack principal (lista de tecnologías), ubicación, disponibilidad, links de
  contacto, ubicación del CV y foto (imagen con tratamiento pixel y su texto alternativo).
- **Link de contacto (ContactLink)**: un canal de contacto. Atributos: tipo (LinkedIn, GitHub,
  email), etiqueta visible, nombre accesible y destino (URL o dirección de email).
- **Sección del portafolio (Section)**: una entrada de la navegación. Atributos: identificador
  (ancla), etiqueta visible y si tiene contenido para mostrarse. Las secciones futuras se suman
  como nuevas entradas.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: En una prueba con al menos 5 personas (reclutadores o personas ajenas al
  proyecto), al menos 4 pueden decir el nombre, el rol, la ubicación y cómo contactar a Tomás
  después de mirar la primera pantalla durante 30 segundos o menos.
- **SC-002**: El 100% de la información y acciones del hero (FR-001 a FR-003) se ve sin scroll en
  360px, 768px y 1280px.
- **SC-003**: La auditoría automática de calidad web (Lighthouse) da 90 o más en Performance,
  Accessibility, Best Practices y SEO, tanto en mobile como en desktop.
- **SC-004**: El contenido principal se ve en menos de 2,5 segundos en una conexión móvil
  simulada (4G lenta), y el layout no salta de forma perceptible al cargar las fuentes.
- **SC-005**: Al compartir el link en LinkedIn, WhatsApp y Slack, las tres vistas previas
  muestran el título, la descripción y la imagen propios.
- **SC-006**: Cambiar cualquier dato del perfil requiere editar un solo archivo de data y ningún
  componente.
- **SC-007**: Con "reducir movimiento" activo o sin soporte de animaciones ligadas al scroll, el
  100% del contenido del hero sigue visible y legible.

## Assumptions

- **Valores completos del perfil**: dos líneas de la descripción llegaron cortadas ("…| AI" y
  "…Disponibl"); se usan los valores completos acordados en la conversación previa:
  "Frontend Developer Semi Senior | AI-Driven Development" y "Tandil, Argentina · Disponible
  para trabajo remoto".
- **Datos del perfil recibidos**: LinkedIn `https://www.linkedin.com/in/tomasdmiguel/`, GitHub
  `https://github.com/Tomasdmiguel` y foto original (retrato cuadrado 800×800, fondo con plantas
  y pared gris) guardada en `specs/001-hero-base/assets/foto-original.png` como material fuente.
- **Datos pendientes de Tomás**: el PDF del CV se entrega antes de la fase de implementación; no
  bloquea el spec ni el plan.
- **Tratamiento de la foto**: se resuelve en el plan (imagen procesada de antemano o efecto
  aplicado en el navegador). El fondo de la foto original es muy detallado; el plan evalúa
  recortarla o simplificar el fondo para que el efecto de puntos se lea bien.
- **Imagen para compartir y favicon**: se diseñan como parte de esta feature con la identidad
  pixel/dot-matrix (por ejemplo, las iniciales o el nombre en estilo pixel).
- **Navegación con una sola sección**: mientras el Hero sea la única sección, la navegación
  muestra solo la marca (nombre o iniciales que llevan al inicio) y ningún link a secciones;
  los links aparecen a medida que se agregan secciones en las próximas features.
- **Contenido debajo del hero**: mientras no existan otras secciones, debajo del hero hay solo
  un pie de página mínimo, con espacio de scroll suficiente para que el efecto se aprecie.
- **Tema visual**: un único tema oscuro con un acento (ver FR-024a), sin selector claro/oscuro
  y sin seguir la preferencia del sistema; el tono exacto del acento (ej. ámbar o verde fósforo)
  se define en el plan.
- **Deploy**: el sitio se publica en el hosting gratuito definido en la constitución; cada rama
  genera una vista previa donde se verifican las vistas previas al compartir.
- **Fuera de alcance**: las secciones Sobre mí, Cómo trabajo, Experiencia, Proyectos, Stack,
  Formación y certificaciones y Contacto; formulario de contacto; backend, CMS, blog, analytics
  y multi-idioma; selector de tema.
