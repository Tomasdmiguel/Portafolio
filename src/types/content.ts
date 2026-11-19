export type ContactKind = 'linkedin' | 'github' | 'email'

export interface ContactLink {
  kind: ContactKind
  /** Texto visible. */
  label: string
  /** Nombre accesible: describe el destino o la acción. */
  ariaLabel: string
  /** `https://…` o `mailto:…` */
  href: string
}

export interface Resume {
  label: string
  ariaLabel: string
  href: `/${string}.pdf`
}

export interface ImageSource {
  type: 'image/avif'
  /** "url 1x, url 2x" */
  srcSet: string
}

export interface ProfilePhoto {
  /** Fallback JPEG. */
  src: string
  sources: readonly ImageSource[]
  alt: string
  width: number
  height: number
  fallbackInitials: string
}

export interface Profile {
  name: string
  role: string
  stack: readonly string[]
  location: string
  availability: string
  contactLinks: readonly ContactLink[]
  cv: Resume
  /** Opcional: sin foto, el Hero se arma en una sola columna. */
  photo?: ProfilePhoto
}

/** Par escaneable del bloque de datos rápidos de "Sobre mí". */
export interface QuickFact {
  /** Corto: "Base", "Experiencia", "Enfoque", "Busco". */
  label: string
  value: string
}

/** Contenido de la sección "Sobre mí" (feature 002). */
export interface About {
  /** Texto del h2. */
  title: string
  /** En orden; los vacíos no se muestran. Sin párrafos con texto, la sección no aparece. */
  paragraphs: readonly string[]
  /** Puede estar vacío: la sección se muestra sin el bloque de datos. */
  facts: readonly QuickFact[]
}

export type SectionId =
  | 'inicio'
  | 'sobre-mi'
  | 'como-trabajo'
  | 'experiencia'
  | 'proyectos'
  | 'stack'
  | 'formacion'
  | 'contacto'

export interface Section {
  id: SectionId
  label: string
  hasContent: boolean
}

export interface SiteMeta {
  lang: string
  title: string
  description: string
  siteUrl: string
  ogImage: `/${string}`
  ogImageAlt: string
  themeColor: `#${string}`
  locale: string
  copyright: string
}

export interface ValidationIssue {
  /** Ej.: "profile.contactLinks[1].href" */
  path: string
  /** En español. */
  message: string
}
