# Quickstart: validar "Formación"

## 1. Calidad

```bash
npm run lint && npm run build && npm test
```

## 2. Contenido y layout (`npm run dev`)

- [ ] Debajo de "Stack" aparece "Formación" con "Título" (Técnico Superior en Programación,
      E.E.S.T. N.º 2 "Felipe Senillosa" · Tandil, 2015 – 2022) e "Idiomas" (Español: Nativo;
      Inglés: Básico, lectura de documentación técnica).
- [ ] Sin certificaciones cargadas no aparece el bloque "Certificaciones".
- [ ] 360: apilado; ≥ 768: Título e Idiomas lado a lado. 740×360 y zoom 200% sin scroll
      horizontal.

## 3. Certificaciones de prueba (no se commitean)

- [ ] Cargar 2 ítems de prueba (`ai` y `frontend`) con URLs https: aparece el bloque a todo el
      ancho con "IA" antes que "Frontend", fechas "Mes Año" y links que abren en pestaña nueva con
      `rel="noopener noreferrer"`; el lector anuncia "(abre en una pestaña nueva)". Restaurar.

## 4. Navegación y animación

- [ ] El nav muestra "Formación" después de "Stack"; `/#formacion` abre en la sección.
- [ ] Al final de la página todas las tarjetas quedan opacas; con movimiento reducido, estáticas.

## 5. Resiliencia

- [ ] Título con `institution: ''`: no se muestra y hay aviso en DEV. Restaurar.
- [ ] `throw` en `Education`: el resto sigue. Restaurar.

## 6. Deploy

- [ ] Lighthouse ≥ 90 (Tomás, DevTools sobre el preview).
- [ ] Después del merge: `npm run check:links` en producción.
