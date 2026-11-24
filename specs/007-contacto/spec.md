# Feature Specification: Contacto

**Feature Branch**: `007-contacto`

**Created**: 2026-11-24

**Status**: Draft

**Input**: User description: "Sección Contacto, la última del portafolio: cierre atractivo que
invite a escribirle a Tomás, con email, LinkedIn, GitHub y CV."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El reclutador contacta a Tomás al terminar de leer (Priority: P1)

Después de Formación, el reclutador llega a "Contacto": una invitación corta y directa, el email
bien visible y los links a LinkedIn, GitHub y el CV. Con un clic puede escribirle.

**Why this priority**: el objetivo final del portafolio es que lo contacten.

**Independent Test**: bajar hasta el final en 360px y 1280px: se ven el título, la invitación, el
email como link `mailto:` y los botones de LinkedIn, GitHub y CV.

**Acceptance Scenarios**:

1. **Given** un visitante en "Formación", **When** sigue scrolleando, **Then** la última sección
   es "Contacto", con una frase de cierre destacada y un mensaje breve.
2. **Given** la sección, **When** el visitante activa el email, **Then** se abre su cliente de
   correo con la dirección de Tomás.
3. **Given** la sección, **When** activa LinkedIn, GitHub o CV, **Then** se abren en una pestaña
   nueva, igual que en el Hero.

---

### User Story 2 - Copiar el email (Priority: P2)

Muchos reclutadores no tienen un cliente de correo configurado. Junto al email hay un botón
"Copiar email" que lo copia al portapapeles y confirma con un mensaje visible y anunciado.

**Independent Test**: activar "Copiar email" con mouse y teclado: el portapapeles tiene la
dirección y el botón muestra "Email copiado" durante unos segundos.

**Acceptance Scenarios**:

1. **Given** un navegador con portapapeles disponible, **When** el visitante activa el botón,
   **Then** el email queda copiado y se muestra la confirmación, anunciada a lectores de pantalla.
2. **Given** un navegador sin portapapeles disponible, **When** carga la sección, **Then** el
   botón no se muestra y el email sigue visible y seleccionable.

---

### User Story 3 - La sección cierra con la identidad (Priority: P2)

El título se arma en puntos y el contenido aparece al llegar, como en el resto del sitio. Con
movimiento reducido o sin soporte, todo estático y visible.

**Acceptance Scenarios**:

1. **Given** un navegador con soporte, **When** el visitante llega al final de la página,
   **Then** todo el contenido queda visible y nítido.
2. **Given** movimiento reducido o sin soporte, **Then** todo se ve completo y estático.

---

### User Story 4 - Navegación (Priority: P3)

**Acceptance Scenarios**:

1. **Given** las seis secciones con contenido, **When** carga la página, **Then** la navegación
   muestra "Contacto" al final, en línea (desde tablet, sin romper el header) y en el menú móvil.
2. **Given** sin email, LinkedIn, GitHub ni CV válidos, **Then** no se muestran la sección ni su
   link.

---

### Edge Cases

- **Sin email válido**: no se muestran el email ni el botón de copiar; quedan los demás links.
- **Sin ningún medio de contacto válido**: la sección y su link no se muestran.
- **Fallo al copiar** (permiso denegado): el botón no muestra confirmación falsa; el email sigue
  visible.
- **Error en la sección**: el resto del sitio sigue funcionando.
- **Email largo o zoom 200%**: el email se corta en líneas sin scroll horizontal.
- **Llegada directa por ancla**: `#contacto` posiciona la página en la sección.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sitio MUST mostrar "Contacto" como última sección, debajo de "Formación", con un
  título de segundo nivel "Contacto" y un ancla `#contacto`.
- **FR-002**: La sección MUST mostrar una frase de cierre destacada y un mensaje breve
  (Assumptions).
- **FR-003**: La sección MUST mostrar el email como link `mailto:` en tamaño destacado, y los
  links de LinkedIn, GitHub y el CV con el mismo comportamiento que en el Hero.
- **FR-004**: La sección MUST ofrecer un botón para copiar el email cuando el portapapeles esté
  disponible, con confirmación visible y anunciada; si no está disponible, no se muestra.
- **FR-005**: El email, los links y el CV MUST salir de la misma data que usa el Hero (una sola
  fuente); los textos propios de la sección, de su archivo de datos. Sin texto en el componente.
- **FR-006**: Sin ningún medio de contacto válido, la sección y su link MUST NOT mostrarse.
- **FR-007**: La navegación MUST incluir "Contacto" al final.
- **FR-008**: Título en tipografía pixel y acento ámbar; entrada animada ligada al scroll que
  termina visible al final de la página; estática con movimiento reducido o sin soporte.
- **FR-009**: Sin scroll horizontal en 360px, 768px, 1280px, móvil horizontal y zoom 200%; áreas
  táctiles de 44px.
- **FR-010**: Si la sección falla, el resto del sitio MUST seguir funcionando.
- **FR-011**: En desarrollo, textos vacíos de la sección MUST generar un aviso en la consola.

### Key Entities

- **Contacto (ContactContent)**: título, frase de cierre, mensaje, textos del botón de copiar
  (normal y confirmación). Usa `contactLinks` y el CV del perfil.

## Success Criteria *(mandatory)*

- **SC-001**: Desde que llega a la sección, un visitante abre un medio de contacto en 1 acción.
- **SC-002**: Lighthouse ≥ 90 en las 4 categorías, en mobile y desktop.
- **SC-003**: CLS menor a 0,1 (también al mostrar la confirmación de copiado).
- **SC-004**: El 100% de la sección se recorre con teclado.

## Assumptions

- **Textos** (propuesta a partir de "Sobre mí"; Tomás los ajusta en la data sin tocar la spec):
  - Frase de cierre: "¿Hablamos?"
  - Mensaje: "Estoy disponible para trabajo remoto y busco crecer como Software Engineer en
    equipos de afuera. Si tenés una propuesta, escribime."
  - Botón: "Copiar email" / confirmación "Email copiado".
- **Sin formulario**: no hay backend (constitución); el contacto es por email y links.
- **Pie**: se mantiene el pie actual con el copyright.
- **Fuera de alcance**: versión en inglés.
