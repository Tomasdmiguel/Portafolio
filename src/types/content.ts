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

/** Mes en formato `YYYY-MM` (ej. `'2024-09'`). */
export type YearMonth = `${number}-${number}`

/** Logro de una experiencia: `lead` es el dato destacado al inicio de la frase. */
export interface Highlight {
  lead?: string
  text: string
}

/** Un puesto de trabajo (feature 003). Sin `end` = puesto actual. */
export interface Experience {
  role: string
  company: string
  /** Rubro de la empresa; vacío no se muestra. */
  industry?: string
  start: YearMonth
  end?: YearMonth
  /** Ej.: "Remoto". */
  modality: string
  /** Frase de contexto. */
  summary?: string
  /** Se muestran hasta 4 válidos. */
  highlights: readonly Highlight[]
  tech: readonly string[]
}

/** Contenido de la sección "Experiencia" (feature 003). */
export interface ExperienceContent {
  /** Texto del h2. */
  title: string
  /** Texto visible del marcador del puesto actual ("Actual"). */
  currentLabel: string
  /** Fin de un período abierto ("Actualidad"). */
  presentLabel: string
  /** Nombre accesible de la lista de tecnologías. */
  techLabel: string
  /** Se muestran las válidas, de la más reciente a la más antigua. */
  items: readonly Experience[]
}

/** Categoría de "Stack" (feature 004). */
export interface StackGroup {
  name: string
  /** Aclaración corta de nivel (ej. "Conocimientos"); vacía no se muestra. */
  note?: string
  /** Destacada con el acento ámbar; como máximo una. */
  featured?: boolean
  /** Sin vacías ni repetidas; sin ítems válidos, la categoría no se muestra. */
  items: readonly string[]
}

/** Contenido de la sección "Stack" (feature 004). */
export interface StackContent {
  /** Texto del h2. */
  title: string
  /** En orden; se muestran las válidas. */
  groups: readonly StackGroup[]
}

/** Título de estudio (feature 005). Sin `end` = en curso. */
export interface Degree {
  title: string
  institution: string
  /** Ciudad; vacía no se muestra. */
  location?: string
  /** Año entero, 1900–2100. */
  start: number
  end?: number
}

/** Idioma con su nivel en texto (sin barras ni porcentajes). */
export interface Language {
  name: string
  level: string
  /** Aclaración corta (ej. "Lectura de documentación técnica"). */
  detail?: string
}

/** Contenido de la sección "Formación" (feature 005). */
export interface EducationContent {
  /** Texto del h2. */
  title: string
  degreesLabel: string
  languagesLabel: string
  /** Fin de un título en curso. */
  presentLabel: string
  degrees: readonly Degree[]
  languages: readonly Language[]
}

/** Categorías cerradas de certificaciones (constitución, Principio II). */
export type CertificationCategory = 'ai' | 'english' | 'frontend' | 'backend'

export interface Certification {
  title: string
  category: CertificationCategory
  date: YearMonth
  /** URL https de verificación. */
  url: string
}

/** Certificaciones de "Formación". Agregar un certificado = editar solo `certifications.ts`. */
export interface CertificationsContent {
  /** Título del bloque. */
  label: string
  categoryLabels: Record<CertificationCategory, string>
  /** Aviso solo para lectores de pantalla en los links. */
  newTabHint: string
  items: readonly Certification[]
}

/** Certificaciones válidas de una categoría, listas para mostrar. */
export interface CertificationGroup {
  category: CertificationCategory
  label: string
  items: Certification[]
}

export type SectionId =
  | 'inicio'
  | 'sobre-mi'
  | 'experiencia'
  | 'stack'
  | 'formacion'
  | 'contacto'

export interface Section {
  id: SectionId
  label: string
  hasContent: boolean
}

/** Textos de la navegación del header. */
export interface NavLabels {
  /** Nombre accesible del `<nav>`. */
  nav: string
  /** Texto visible del botón del menú móvil. */
  menu: string
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
