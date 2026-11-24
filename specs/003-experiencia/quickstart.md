# Quickstart: validar "Experiencia"

## 1. Calidad

```bash
npm run lint && npm run build && npm test
```

Todo en verde; pasan los tests nuevos de `formatMonth`, `getValidExperiences` y `validateExperience`.

## 2. Contenido y layout (`npm run dev`)

- [ ] Debajo de "Sobre mí" aparece "Experiencia" con Seeker Parking: puesto, empresa, rubro,
      "Sep 2024 – Actualidad", "Remoto", contexto, 4 logros y las etiquetas.
- [ ] El marcador del puesto es ámbar y dice "Actual".
- [ ] 360×740, 768×1024, 1280×800, 740×360 y zoom 200%: sin scroll horizontal ni texto cortado;
      las etiquetas pasan de línea.
- [ ] Lector de pantalla: lista de 1 experiencia, h3 con el puesto, lista de 4 logros.

## 3. Navegación

- [ ] 360 px: el header muestra la marca y "Menú"; el menú abre "Inicio", "Sobre mí" y
      "Experiencia"; tocar un link navega y cierra el menú; Escape y tocar fuera lo cierran.
- [ ] ≥ 768 px: los 3 links en línea, sin botón "Menú".
- [ ] Tab + Enter funciona en ambos casos, con foco visible.
- [ ] `/#experiencia` posiciona la página en la sección con el título visible.

## 4. Animaciones

- [ ] Chrome actual: el título se arma en puntos, la línea de puntos se dibuja y la experiencia
      aparece; todo nítido antes de la mitad de la pantalla.
- [ ] "Reducir movimiento" y navegador sin soporte: todo visible y estático.

## 5. Resiliencia

- [ ] `items: []`: no aparecen la sección ni su link; aviso en DEV. Restaurar.
- [ ] `end: '2023-01'` (anterior al inicio): la experiencia no se muestra y hay aviso en DEV.
      Restaurar.
- [ ] Logro con `text: ''`: no se muestra. Restaurar.
- [ ] Forzar un `throw` en `Experience`: el resto del sitio sigue visible. Restaurar.

## 6. Lighthouse y deploy

- [ ] Lighthouse ≥ 90 en las 4 categorías, mobile y desktop, en el preview de Vercel.
- [ ] CLS < 0,1.
- [ ] `npm run check:links -- https://<preview>.vercel.app` en verde.
