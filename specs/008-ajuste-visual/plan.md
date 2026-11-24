# Implementation Plan: Ajuste visual

**Branch**: `008-ajuste-visual` | **Date**: 2026-11-24 | **Spec**: [spec.md](./spec.md)

## Summary

Capa visual neo-brutalista sobre la identidad existente: grilla de fondo, tarjetas-ventana con
sombra dura, etiquetas de archivo en los títulos, teclas decorativas en Hero y Contacto, header
fijo con sección activa y botones cuadrados con sombra dura. Sin cambios de contenido.

## Technical Context

TypeScript strict, React 19, Tailwind v4. **Sin dependencias nuevas.** Tests con `node --test`
solo si se agrega lógica pura (no se prevé). Validación visual según tasks.

## Decisiones (research)

| # | Decisión | Alternativas descartadas |
|---|---|---|
| R1 | Tokens nuevos en `@theme`: `--color-grid-line`, `--color-border-strong`, `--shadow-hard` y `--shadow-hard-accent` (generan `shadow-hard`, `border-border-strong`, etc.). `@theme static` suma `--grid-cell: 2rem`. | Arbitrary values (prohibidos) |
| R2 | `@utility graph-paper` con dos `linear-gradient` de 1px cada `--grid-cell`, aplicada al `body`. | Imagen SVG (otra request, más peso) |
| R3 | `ui/Card` pasa a ventana: barra con marcador + `h3` + 3 botones decorativos (`ui/WindowControls`, SVG `aria-hidden`), cuerpo `p-5`, `shadow-hard`; prop `featured` → borde y sombra ámbar. Stack usa `Card` en lugar de su markup propio. | Componente nuevo y mantener `Card` (dos estilos de tarjeta) |
| R4 | `SectionTitle` recibe `file?: string` y lo muestra como etiqueta `aria-hidden` (Geist Mono, `bg-accent`, `-rotate-2`) sobre el `h2`. Cada contenido suma `file?` en su data. | Derivar el nombre del id (texto generado en el componente) |
| R5 | `ui/Keycap` (borde doble, `shadow-hard`, Geist Mono). Hero: `profile.keycaps?: string[]`, grupo absoluto a la derecha desde `lg`, inclinado, con `motion-safe:hero-fade`. Contacto: `contact.keycap?: string` junto a la frase de cierre. | Imágenes de teclas |
| R6 | Header `sticky top-0 z-40` con `bg-bg/85 backdrop-blur-sm border-b`; `html { scroll-padding-top: --spacing(16) }`. Sección activa con `IntersectionObserver` (`rootMargin: -50% 0px -50% 0px`) en un hook dentro de `SiteHeader.tsx`; sin soporte, no resalta. | Scroll listener (más costoso) |
| R7 | `@utility press`: `transition` de `translate` y `box-shadow`; con `motion-safe:` hover `-translate-0.5` y active `translate-1 shadow-none`. Se quita `rounded-md` de `Button`, `ContactLinks` y `CopyButton`. | — |

## Constitution Check

| Principio / regla | Cómo se cumple | Estado |
|---|---|---|
| I. Claridad | El contenido no cambia; decoración fuera del flujo de lectura y oculta en móvil cuando estorba | ✅ |
| II. Contenido en data | Etiquetas de archivo y teclas salen de la data | ✅ |
| III. Mobile-first | Teclas del Hero solo desde `lg`; sombras de 4 px dentro del gutter | ✅ |
| IV. A11y | Decoración `aria-hidden`; `aria-current` en el nav; contraste intacto | ✅ |
| V. Mejora progresiva | Desplazamientos con `motion-safe`; sin `IntersectionObserver` no hay resaltado y todo funciona | ✅ |
| VI. SDD | Spec + plan + tareas + análisis en un paso; rama `008-ajuste-visual` | ✅ |
| Sin JS de animación | El hook solo marca la sección activa; las transiciones son CSS | ✅ |
| Sin arbitrary values | Tokens en `@theme` y `@utility` | ✅ |
| Estructura | `ui/WindowControls.tsx` y `ui/Keycap.tsx` son componentes reutilizables sin contenido propio | ✅ |

## Riesgos

| Riesgo | Mitigación |
|---|---|
| `backdrop-blur` baja Performance en móvil | Se mide con Lighthouse; plan B: fondo opaco |
| La grilla compite con el texto | Color `--color-grid-line` muy cercano al fondo; se revisa contraste |
| Header fijo tapa el efecto del Hero | `hero-screen` ya descuenta el header; se verifica la primera pantalla |
