# Contract: esquema de contenido (`src/types/content.ts`)

Interfaz entre la data (`src/data/`) y los componentes. Las features siguientes **extienden**
este archivo; no cambian la forma de lo existente sin actualizar este contrato.

## Tipos

```ts
export type ContactKind = 'linkedin' | 'github' | 'email';

export interface ContactLink {
  kind: ContactKind;
  label: string;      // texto visible
  ariaLabel: string;  // nombre accesible (destino o acción)
  href: string;       // https://… o mailto:…
}

export interface Resume {
  label: string;
  ariaLabel: string;
  href: `/${string}.pdf`;
}

export interface ImageSource {
  type: 'image/avif';
  srcSet: string;     // "url 1x, url 2x"
}

export interface ProfilePhoto {
  src: string;        // fallback JPEG
  sources: readonly ImageSource[];
  alt: string;
  width: number;
  height: number;
  fallbackInitials: string;
}

export interface Profile {
  name: string;
  role: string;
  stack: readonly string[];
  location: string;
  availability: string;
  contactLinks: readonly ContactLink[];
  cv: Resume;
  photo: ProfilePhoto;
}

export type SectionId =
  | 'inicio' | 'sobre-mi' | 'como-trabajo' | 'experiencia'
  | 'proyectos' | 'stack' | 'formacion' | 'contacto';

export interface Section {
  id: SectionId;
  label: string;
  hasContent: boolean;
}

export interface SiteMeta {
  lang: string;
  title: string;
  description: string;
  siteUrl: string;
  ogImage: `/${string}`;
  ogImageAlt: string;
  themeColor: `#${string}`;
  locale: string;
  copyright: string;
}

export interface ValidationIssue {
  path: string;       // ej. "profile.contactLinks[1].href"
  message: string;    // en español
}
```

## Funciones de validación (`src/lib/validateContent.ts`)

| Función | Entrada | Salida | Uso |
|---|---|---|---|
| `validateProfile(profile)` | `Profile` | `ValidationIssue[]` | DEV: `console.warn` por issue |
| `validateSite(site, profile)` | `SiteMeta`, `Profile` | `ValidationIssue[]` | DEV |
| `isValidContactLink(link)` | `ContactLink` | `boolean` | runtime (prod y dev) |
| `getValidContactLinks(links)` | `readonly ContactLink[]` | `ContactLink[]` | runtime: filtra inválidos |

Reglas: las de [data-model.md](../data-model.md). Funciones puras: sin `import.meta`, sin
imports de assets, sin efectos. Esto permite testearlas con `node --test`.

## Props de componentes

| Componente | Props | Notas |
|---|---|---|
| `Hero` | `{ profile: Profile }` | `<section id="inicio" aria-labelledby>`; único `h1` |
| `SiteHeader` | `{ brand: string; sections: readonly Section[] }` | sin `<nav>` si no hay links |
| `SiteFooter` | `{ copyright: string }` | `min-h-svh` mientras sea la única sección |
| `ProfileImage` | `{ photo: ProfilePhoto }` | `<picture>`; fallback a iniciales en `onError` |
| `ContactLinks` | `{ links: readonly ContactLink[] }` | aplica `rel`/`target` según `kind` |
| `Button` (ui) | `{ href: string; variant: 'primary' \| 'secondary'; external?: boolean; ariaLabel?: string; children }` | `<a>` estilizado, ≥ 44×44 px |
| `ErrorBoundary` | `{ name: string; children }` | clase; fallback `null` |
