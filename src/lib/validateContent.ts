// Funciones puras: sin import.meta ni imports de assets, para poder testearlas con node --test.
import type {
  About,
  ContactLink,
  Experience,
  ExperienceContent,
  Highlight,
  Profile,
  QuickFact,
  Resume,
  Section,
  SiteMeta,
  ValidationIssue,
  YearMonth,
} from '../types/content.ts'

const isBlank = (value: string): boolean => value.trim() === ''
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:'
  } catch {
    return false
  }
}

export function isValidContactLink(link: ContactLink): boolean {
  if (isBlank(link.label) || isBlank(link.ariaLabel)) return false
  if (link.kind === 'email') {
    return link.href.startsWith('mailto:') && EMAIL.test(link.href.slice('mailto:'.length))
  }
  return isHttpsUrl(link.href)
}

export function getValidContactLinks(links: readonly ContactLink[]): ContactLink[] {
  return links.filter(isValidContactLink)
}

export function isValidResumeHref(href: Resume['href']): boolean {
  return href.startsWith('/') && href.endsWith('.pdf') && href.length > '/.pdf'.length
}

export function validateProfile(profile: Profile): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const add = (path: string, message: string) => issues.push({ path: `profile.${path}`, message })

  for (const key of ['name', 'role', 'location', 'availability'] as const) {
    if (isBlank(profile[key])) add(key, 'no puede estar vacío')
  }

  if (profile.stack.length === 0) add('stack', 'debe tener al menos 1 ítem')
  profile.stack.forEach((item, i) => {
    if (isBlank(item)) add(`stack[${i}]`, 'no puede estar vacío')
  })

  if (getValidContactLinks(profile.contactLinks).length === 0) {
    add('contactLinks', 'debe tener al menos 1 link válido')
  }
  const seen = new Set<string>()
  profile.contactLinks.forEach((link, i) => {
    if (!isValidContactLink(link)) add(`contactLinks[${i}].href`, `link de ${link.kind} inválido`)
    if (seen.has(link.kind)) add(`contactLinks[${i}].kind`, `el tipo "${link.kind}" está repetido`)
    seen.add(link.kind)
  })

  if (!isValidResumeHref(profile.cv.href)) {
    add('cv.href', 'debe empezar con "/" y terminar en ".pdf"')
  }

  const { photo } = profile
  if (photo) {
    if (isBlank(photo.alt)) add('photo.alt', 'no puede estar vacío')
    if (!(photo.width > 0)) add('photo.width', 'debe ser mayor a 0')
    if (!(photo.height > 0)) add('photo.height', 'debe ser mayor a 0')
    const initials = photo.fallbackInitials.trim().length
    if (initials < 1 || initials > 3) add('photo.fallbackInitials', 'debe tener entre 1 y 3 caracteres')
  }

  return issues
}

export function validateSite(site: SiteMeta, profile: Profile): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const add = (path: string, message: string) => issues.push({ path: `site.${path}`, message })

  const { length } = site.description.trim()
  if (length < 50 || length > 160) {
    add('description', `debe tener entre 50 y 160 caracteres (tiene ${length})`)
  }
  if (!isHttpsUrl(site.siteUrl) || site.siteUrl.endsWith('/')) {
    add('siteUrl', 'debe ser una URL https sin "/" final')
  }
  if (!site.title.startsWith(profile.name)) add('title', 'debe empezar con el nombre del perfil')
  if (!/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(site.themeColor)) add('themeColor', 'debe ser un color hex')

  return issues
}

export function validateSections(sections: readonly Section[]): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const seen = new Set<string>()

  sections.forEach((section, i) => {
    if (seen.has(section.id)) {
      issues.push({ path: `sections[${i}].id`, message: `el id "${section.id}" está repetido` })
    }
    seen.add(section.id)
    if (isBlank(section.label)) {
      issues.push({ path: `sections[${i}].label`, message: 'no puede estar vacío' })
    }
  })

  if (!seen.has('inicio')) {
    issues.push({ path: 'sections', message: 'falta la sección "inicio"' })
  }

  return issues
}

// ---- Sobre mí (feature 002) ----

export function getValidParagraphs(about: About): string[] {
  return about.paragraphs.filter((paragraph) => !isBlank(paragraph))
}

export function getValidFacts(about: About): QuickFact[] {
  return about.facts.filter((fact) => !isBlank(fact.label) && !isBlank(fact.value))
}

/** Sin párrafos con texto, no se muestran ni la sección ni su link (FR-006). */
export function hasAboutContent(about: About): boolean {
  return getValidParagraphs(about).length > 0
}

export function validateAbout(about: About): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const add = (path: string, message: string) => issues.push({ path: `about.${path}`, message })

  if (isBlank(about.title)) add('title', 'no puede estar vacío')
  if (!hasAboutContent(about)) add('paragraphs', 'debe tener al menos 1 párrafo')
  about.paragraphs.forEach((paragraph, i) => {
    if (isBlank(paragraph)) add(`paragraphs[${i}]`, 'no puede estar vacío')
  })
  about.facts.forEach((fact, i) => {
    if (isBlank(fact.label)) add(`facts[${i}].label`, 'no puede estar vacío')
    if (isBlank(fact.value)) add(`facts[${i}].value`, 'no puede estar vacío')
  })

  return issues
}

// ---- Experiencia (feature 003) ----

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
const MAX_HIGHLIGHTS = 4
const MAX_HIGHLIGHT_WORDS = 20

export function isValidYearMonth(value: string): boolean {
  return YEAR_MONTH.test(value)
}

/** `'2024-09'` → `'Sep 2024'` (formato fijo, sin depender de Intl; research R2). */
export function formatMonth(value: YearMonth): string {
  const [year, month] = value.split('-')
  return `${MONTHS_ES[Number(month) - 1]} ${year}`
}

const isValidHighlight = (highlight: Highlight): boolean => !isBlank(highlight.text)

const countWords = (highlight: Highlight): number =>
  `${highlight.lead ?? ''} ${highlight.text}`.trim().split(/\s+/).length

export function isValidExperience(item: Experience): boolean {
  if (isBlank(item.role) || isBlank(item.company) || isBlank(item.modality)) return false
  if (!isValidYearMonth(item.start)) return false
  if (item.end === undefined) return true
  // Con formato YYYY-MM, la comparación de strings sigue el orden cronológico.
  return isValidYearMonth(item.end) && item.end >= item.start
}

/** Válidas, de la más reciente a la más antigua, con hasta 4 logros y sin tecnologías vacías. */
export function getValidExperiences(content: ExperienceContent): Experience[] {
  return content.items
    .filter(isValidExperience)
    .map((item) => ({
      ...item,
      highlights: item.highlights.filter(isValidHighlight).slice(0, MAX_HIGHLIGHTS),
      tech: item.tech.filter((tech) => !isBlank(tech)),
    }))
    .sort((a, b) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0))
}

/** Sin experiencias válidas, no se muestran ni la sección ni su link (FR-007). */
export function hasExperienceContent(content: ExperienceContent): boolean {
  return content.items.some(isValidExperience)
}

export function validateExperience(content: ExperienceContent): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  const add = (path: string, message: string) => issues.push({ path: `experience.${path}`, message })

  for (const key of ['title', 'currentLabel', 'presentLabel', 'techLabel'] as const) {
    if (isBlank(content[key])) add(key, 'no puede estar vacío')
  }
  if (!hasExperienceContent(content)) add('items', 'debe tener al menos 1 experiencia válida')

  content.items.forEach((item, i) => {
    const at = `items[${i}]`
    for (const key of ['role', 'company', 'modality'] as const) {
      if (isBlank(item[key])) add(`${at}.${key}`, 'no puede estar vacío')
    }
    const startOk = isValidYearMonth(item.start)
    if (!startOk) add(`${at}.start`, 'debe tener formato YYYY-MM')
    if (item.end !== undefined) {
      if (!isValidYearMonth(item.end)) add(`${at}.end`, 'debe tener formato YYYY-MM')
      else if (startOk && item.end < item.start) add(`${at}.end`, 'no puede ser anterior al inicio')
    }
    if (item.highlights.filter(isValidHighlight).length > MAX_HIGHLIGHTS) {
      add(`${at}.highlights`, `se muestran hasta ${MAX_HIGHLIGHTS} logros`)
    }
    item.highlights.forEach((highlight, j) => {
      if (!isValidHighlight(highlight)) add(`${at}.highlights[${j}].text`, 'no puede estar vacío')
      else if (countWords(highlight) > MAX_HIGHLIGHT_WORDS) {
        add(`${at}.highlights[${j}]`, `debe tener hasta ${MAX_HIGHLIGHT_WORDS} palabras`)
      }
    })
    item.tech.forEach((tech, j) => {
      if (isBlank(tech)) add(`${at}.tech[${j}]`, 'no puede estar vacío')
    })
  })

  return issues
}
