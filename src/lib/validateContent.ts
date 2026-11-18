// Funciones puras: sin import.meta ni imports de assets, para poder testearlas con node --test.
import type {
  ContactLink,
  Profile,
  Resume,
  Section,
  SiteMeta,
  ValidationIssue,
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
