# Quickstart: validar "Sobre mí"

## 1. Calidad

```bash
npm run lint && npm run build && npm test
```

Todo en verde; los tests nuevos de `validateAbout` y compañía pasan.

## 2. Contenido y layout (`npm run dev`)

- [ ] Debajo del Hero aparece "Sobre mí" con los 4 párrafos en orden y los 4 datos rápidos.
- [ ] 360×740, 768×1024, 1280×800, 740×360 y zoom 200%: sin scroll horizontal ni texto cortado.
- [ ] En 1280: párrafos a la izquierda con largo de línea cómodo, datos rápidos a la derecha.
- [ ] El Hero sigue ocupando la primera pantalla junto con el header (nombre, rol y "Ver CV"
      visibles sin scroll, como en la 001).

## 3. Navegación

- [ ] El header muestra "Inicio" y "Sobre mí"; ambos funcionan con mouse y con Tab + Enter.
- [ ] Abrir `/#sobre-mi` posiciona la página en la sección con el título visible.
- [ ] Con "reducir movimiento", el salto es instantáneo; sin esa preferencia, es suave.

## 4. Animaciones

- [ ] Chrome actual: el título se "arma" en puntos y el resto aparece al entrar; todo queda nítido
      antes de llegar a la mitad de la pantalla. Al subir, se revierte.
- [ ] El efecto de salida del Hero se completa al bajar (sin el pie de pantalla completa).
- [ ] "Reducir movimiento" activado y un navegador sin soporte (Firefox sin la flag): todo visible
      y estático.

## 5. Resiliencia

- [ ] Dejar `paragraphs: []` en `about.ts`: no aparecen la sección ni la navegación; en DEV hay
      aviso en consola. Restaurar.
- [ ] Vaciar un dato (`value: ''`): ese dato no se muestra y hay aviso en DEV. Restaurar.
- [ ] Forzar un `throw` en `About`: el Hero, el header y el pie siguen visibles. Restaurar.

## 6. Lighthouse y deploy

- [ ] Lighthouse ≥ 90 en las 4 categorías, mobile y desktop, con CLS < 0,1.
- [ ] Preview de Vercel revisado; después del merge, `npm run check:links` en producción.
- [ ] Prueba de lectura con 5 personas (SC-001 y SC-002).
