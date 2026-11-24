# Quickstart: validar "Stack"

## 1. Calidad

```bash
npm run lint && npm run build && npm test
```

Todo en verde; pasan los tests nuevos de `getValidStackGroups`, `hasStackContent` y `validateStack`.

## 2. Contenido y layout (`npm run dev`)

- [ ] Debajo de "Experiencia" aparece "Stack" con las 6 categorías en orden: Frontend, Estado y
      datos, Formularios y validación, IA aplicada, Herramientas y Backend.
- [ ] "IA aplicada" tiene borde y título ámbar; el resto, neutro.
- [ ] "Backend" muestra la nota "Conocimientos".
- [ ] Ninguna categoría nombra herramientas de IA.
- [ ] 360×740: 1 columna; 768: 2 columnas; 1280: 3 columnas. 740×360 y zoom 200%: sin scroll
      horizontal; las etiquetas pasan de línea.
- [ ] Lector de pantalla: cada lista de tecnologías se anuncia con el nombre de su categoría.

## 3. Navegación

- [ ] El nav (en línea y en el menú móvil) muestra "Stack" después de "Experiencia".
- [ ] `/#stack` posiciona la página en la sección con el título visible.

## 4. Animaciones

- [ ] Chrome: el título se arma en puntos y cada tarjeta aparece; todo nítido al llegar al final
      de la página.
- [ ] "Reducir movimiento" y navegador sin soporte: todo visible y estático.

## 5. Resiliencia

- [ ] `groups: []`: no aparecen la sección ni su link; aviso en DEV. Restaurar.
- [ ] Una categoría con `items: ['', ' ']`: no se muestra y hay aviso. Restaurar.
- [ ] Forzar un `throw` en `Stack`: el resto del sitio sigue visible. Restaurar.

## 6. Lighthouse y deploy

- [ ] Lighthouse ≥ 90 en las 4 categorías, mobile y desktop (Tomás, desde DevTools sobre el
      preview).
- [ ] Después del merge: `npm run check:links` en producción.
