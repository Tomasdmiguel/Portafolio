# Feature Specification: Ajuste visual

**Feature Branch**: `008-ajuste-visual`

**Created**: 2026-11-24

**Status**: Draft

**Input**: User description: "Ajuste visual general con el portafolio completo: Hero con más
presencia, header fijo con la sección activa, esquinas cuadradas en todo y elementos visuales
como los de la referencia (grilla de fondo, tarjetas como ventanas retro con sombra dura,
etiquetas de archivo, teclas inclinadas), adaptados a la identidad oscura, ámbar y pixel."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El sitio entra por los ojos (Priority: P1)

Un reclutador abre el sitio y lo recuerda: fondo cuadriculado, tarjetas como ventanas de un
sistema retro con sombra dura, etiquetas tipo archivo sobre cada título y teclas inclinadas como
detalle, todo en negro, gris y ámbar.

**Independent Test**: recorrer el sitio en 360 y 1280: se ven la grilla, las ventanas, las
etiquetas y las teclas; el contenido se lee igual o mejor que antes.

**Acceptance Scenarios**:

1. **Given** cualquier sección, **When** se muestra, **Then** el fondo de la página es una grilla
   sutil que no baja el contraste del texto (WCAG AA se mantiene).
2. **Given** las tarjetas de Stack y Formación, **When** se muestran, **Then** tienen barra de
   título con su nombre y tres botones decorativos de ventana, borde y sombra dura desplazada; la
   destacada ("IA aplicada") usa el ámbar.
3. **Given** el título de cada sección (salvo el Hero), **When** se muestra, **Then** lo antecede
   una etiqueta tipo archivo (ej. `sobre-mi.md`) en Geist Mono sobre ámbar.
4. **Given** los elementos decorativos (botones de ventana, teclas, etiquetas), **When** los
   recorre un lector de pantalla, **Then** no se anuncian.

---

### User Story 2 - El Hero tiene presencia (Priority: P1)

Desde 1024 px, el lado derecho del Hero deja de estar vacío: un grupo de teclas inclinadas con
símbolos de código. En móvil no se muestran, para no tapar el contenido.

**Acceptance Scenarios**:

1. **Given** 1024 px o más, **When** carga el Hero, **Then** se ven las teclas a la derecha del nombre
   sin superponerse al texto y se desvanecen al scrollear junto con el resto del Hero.
2. **Given** 360 px, **When** carga el Hero, **Then** no se ven las teclas y el Hero queda igual
   que antes.

---

### User Story 3 - Navegación siempre a mano (Priority: P2)

El header queda fijo arriba con fondo translúcido; el link de la sección visible se resalta en
ámbar. Al navegar por anclas, el título no queda tapado por el header.

**Acceptance Scenarios**:

1. **Given** el visitante en cualquier parte de la página, **When** mira arriba, **Then** ve el
   header con la navegación (o el botón "Menú" en móvil).
2. **Given** la sección "Stack" en el centro de la pantalla, **When** mira el nav, **Then**
   "Stack" está en ámbar y marcado como actual para lectores de pantalla.
3. **Given** un link del nav, **When** lo activa, **Then** el título de la sección queda visible
   debajo del header.

---

### User Story 4 - Estética pixel coherente (Priority: P2)

Botones, links de contacto y el botón de copiar pasan a esquinas cuadradas con sombra dura, igual
que tarjetas y etiquetas; al pasar el mouse se "levantan" y al hacer clic se "hunden".

**Acceptance Scenarios**:

1. **Given** cualquier botón o link con forma de botón, **When** se muestra, **Then** no tiene
   esquinas redondeadas y tiene sombra dura.
2. **Given** movimiento reducido, **When** el visitante pasa el mouse o hace clic, **Then** no
   hay desplazamiento (solo cambio de color).

### Edge Cases

- Teclas del Hero sin datos: no se muestra el grupo.
- Sección sin etiqueta de archivo en la data: el título se muestra sin etiqueta.
- Navegador sin `IntersectionObserver`: el nav funciona sin resaltar la sección activa.
- Zoom 200% y 360 px: sin scroll horizontal; las teclas y sombras no generan desborde.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El fondo de la página MUST ser una grilla sutil hecha con CSS, con contraste del
  texto WCAG AA intacto.
- **FR-002**: Las tarjetas MUST tener barra de título (nombre como `h3` + tres botones
  decorativos ocultos a tecnologías de asistencia), borde y sombra dura; la destacada, en ámbar.
- **FR-003**: Cada título de sección MAY tener una etiqueta tipo archivo tomada de la data,
  decorativa.
- **FR-004**: El Hero MUST mostrar, desde `lg` (a 768 px se superponía con el rol), un grupo de teclas inclinadas tomadas de la data,
  decorativo, que se desvanece con el resto del Hero; en móvil, oculto.
- **FR-005**: El header MUST quedar fijo arriba con fondo translúcido y MUST resaltar la sección
  visible con color y `aria-current`; las anclas MUST dejar el título visible bajo el header.
- **FR-006**: Botones y links con forma de botón MUST tener esquinas cuadradas y sombra dura, con
  desplazamiento al pasar el mouse y al hacer clic solo con `motion-safe`.
- **FR-007**: Sin colores ni tamaños sueltos: los nuevos valores van como tokens en `@theme` o
  como `@utility`.
- **FR-008**: Lighthouse ≥ 90 y CLS < 0,1 se mantienen.

## Success Criteria *(mandatory)*

- **SC-001**: 4 de 5 personas describen el sitio como "memorable" o "con personalidad".
- **SC-002**: Lighthouse ≥ 90 en las 4 categorías; CLS < 0,1.
- **SC-003**: 0 elementos decorativos anunciados por lector de pantalla.

## Assumptions

- Inspiración: estilo neo-brutalista / ventanas retro de la referencia que pasó Tomás; no se
  copian textos, imágenes ni marcas de ese sitio.
- Etiquetas de archivo: `sobre-mi.md`, `experiencia.log`, `stack.json`, `formacion.md`,
  `contacto.sh`. Teclas del Hero: `</>`, `{ }`, `AI`. Tecla en Contacto: `Enter ↵`.
- Sin cambios de contenido ni de orden de secciones.
