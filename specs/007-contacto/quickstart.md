# Quickstart: validar "Contacto"

## 1. Calidad

```bash
npm run lint && npm run build && npm test
```

## 2. Contenido (`npm run dev`)

- [ ] Al final aparece "Contacto" con "¿Hablamos?", el mensaje, el email destacado, "Copiar
      email", LinkedIn, GitHub y "Ver CV".
- [ ] El email es `mailto:`; LinkedIn, GitHub y CV abren en pestaña nueva.
- [ ] 360, 768, 1280, 740×360 y zoom 200%: sin scroll horizontal; el email se corta si no entra.

## 3. Copiar

- [ ] "Copiar email" con mouse y con teclado: el portapapeles tiene la dirección y el botón
      dice "Email copiado" ~2 s sin mover el layout.

## 4. Navegación y animación

- [ ] El nav muestra "Contacto" al final; en 768 la marca y los 6 links entran en una línea.
- [ ] Al final de la página todo queda opaco; con movimiento reducido, estático.

## 5. Resiliencia

- [ ] `throw` en `Contact`: el resto sigue. Restaurar.

## 6. Deploy

- [ ] Lighthouse ≥ 90 (Tomás, DevTools sobre el preview); `check:links` en producción.
