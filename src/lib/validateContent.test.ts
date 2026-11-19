import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { about } from '../data/about.ts'
import type { About, ContactLink, Profile, Section, SiteMeta } from '../types/content.ts'
import {
  getValidFacts,
  getValidParagraphs,
  hasAboutContent,
  validateAbout,
  getValidContactLinks,
  isValidContactLink,
  validateProfile,
  validateSections,
  validateSite,
} from './validateContent.ts'

// Fixtures inline: src/data/profile.ts importa assets y Node no los puede cargar.
const links: ContactLink[] = [
  { kind: 'linkedin', label: 'LinkedIn', ariaLabel: 'LinkedIn de X', href: 'https://www.linkedin.com/in/x/' },
  { kind: 'github', label: 'GitHub', ariaLabel: 'GitHub de X', href: 'https://github.com/x' },
  { kind: 'email', label: 'Email', ariaLabel: 'Enviar email a X', href: 'mailto:x@example.com' },
]

const profile: Profile = {
  name: 'Tomás De Miguel',
  role: 'Frontend Developer',
  stack: ['React', 'TypeScript'],
  location: 'Tandil, Argentina',
  availability: 'Disponible para trabajo remoto',
  contactLinks: links,
  cv: { label: 'Ver CV', ariaLabel: 'Ver CV en PDF', href: '/cv/cv.pdf' },
  photo: {
    src: '/foto.jpg',
    sources: [{ type: 'image/avif', srcSet: '/foto.avif 1x' }],
    alt: 'Foto',
    width: 320,
    height: 320,
    fallbackInitials: 'TDM',
  },
}

const site: SiteMeta = {
  lang: 'es',
  title: 'Tomás De Miguel — Frontend Developer',
  description: 'Una descripción de prueba con más de cincuenta caracteres para el sitio.',
  siteUrl: 'https://example.vercel.app',
  ogImage: '/og-image.png',
  ogImageAlt: 'Imagen',
  themeColor: '#0a0a0a',
  locale: 'es_AR',
  copyright: '© 2026',
}

const sections: Section[] = [{ id: 'inicio', label: 'Inicio', hasContent: true }]

const paths = (issues: { path: string }[]) => issues.map((issue) => issue.path)

describe('validateProfile', () => {
  test('un perfil válido no tiene problemas', () => {
    assert.deepEqual(validateProfile(profile), [])
  })

  test('un perfil sin foto es válido (la foto es opcional)', () => {
    assert.deepEqual(validateProfile({ ...profile, photo: undefined }), [])
  })

  test('role vacío genera un problema en profile.role', () => {
    assert.ok(paths(validateProfile({ ...profile, role: '  ' })).includes('profile.role'))
  })

  test('kind repetido genera un problema', () => {
    const repeated = [...links, { ...links[0]!, href: 'https://www.linkedin.com/in/y/' }]
    assert.ok(paths(validateProfile({ ...profile, contactLinks: repeated })).includes('profile.contactLinks[3].kind'))
  })

  test('cv.href sin .pdf genera un problema', () => {
    const cv = { ...profile.cv, href: '/cv/cv.doc' as `/${string}.pdf` }
    assert.ok(paths(validateProfile({ ...profile, cv })).includes('profile.cv.href'))
  })
})

describe('links de contacto', () => {
  test('un link https inválido se filtra', () => {
    const broken = { ...links[0]!, href: 'no es una url' }
    assert.deepEqual(getValidContactLinks([broken, links[1]!]), [links[1]])
  })

  test('mailto sin @ es inválido', () => {
    assert.equal(isValidContactLink({ ...links[2]!, href: 'mailto:sin-arroba' }), false)
  })

  test('http (sin s) es inválido', () => {
    assert.equal(isValidContactLink({ ...links[1]!, href: 'http://github.com/x' }), false)
  })
})

describe('validateSite', () => {
  test('un sitio válido no tiene problemas', () => {
    assert.deepEqual(validateSite(site, profile), [])
  })

  test('description de 20 caracteres genera un problema', () => {
    assert.ok(paths(validateSite({ ...site, description: 'Muy corta, 20 chars.' }, profile)).includes('site.description'))
  })

  test('title que no empieza con el nombre genera un problema', () => {
    assert.ok(paths(validateSite({ ...site, title: 'Portafolio' }, profile)).includes('site.title'))
  })
})

describe('validateSections', () => {
  test('la lista válida no tiene problemas', () => {
    assert.deepEqual(validateSections(sections), [])
  })

  test('id repetido genera un problema', () => {
    assert.ok(paths(validateSections([...sections, ...sections])).includes('sections[1].id'))
  })

  test('label vacío genera un problema', () => {
    assert.ok(paths(validateSections([{ ...sections[0]!, label: '' }])).includes('sections[0].label'))
  })

  test('sin "inicio" genera un problema', () => {
    assert.ok(paths(validateSections([{ id: 'contacto', label: 'Contacto', hasContent: true }])).includes('sections'))
  })
})

describe('about', () => {
  const base: About = { title: 'Sobre mí', paragraphs: ['Uno', 'Dos'], facts: [{ label: 'Base', value: 'Tandil' }] }

  test('el contenido real es válido', () => {
    assert.deepEqual(validateAbout(about), [])
  })

  test('getValidParagraphs descarta los vacíos y conserva el orden', () => {
    assert.deepEqual(getValidParagraphs({ ...base, paragraphs: ['Uno', '', '  ', 'Dos'] }), ['Uno', 'Dos'])
  })

  test('getValidFacts descarta datos sin etiqueta o sin valor', () => {
    const facts = [
      { label: 'Base', value: 'Tandil' },
      { label: '', value: 'x' },
      { label: 'Busco', value: ' ' },
    ]
    assert.deepEqual(getValidFacts({ ...base, facts }), [{ label: 'Base', value: 'Tandil' }])
  })

  test('hasAboutContent depende de que haya al menos un párrafo con texto', () => {
    assert.equal(hasAboutContent({ ...base, paragraphs: [] }), false)
    assert.equal(hasAboutContent({ ...base, paragraphs: ['', '  '] }), false)
    assert.equal(hasAboutContent(base), true)
  })

  test('validateAbout reporta título, párrafos y datos inválidos', () => {
    const issues = validateAbout({
      title: ' ',
      paragraphs: ['Uno', ''],
      facts: [{ label: '', value: '' }],
    })
    assert.deepEqual(paths(issues), [
      'about.title',
      'about.paragraphs[1]',
      'about.facts[0].label',
      'about.facts[0].value',
    ])
    assert.ok(issues.every((issue) => issue.message === 'no puede estar vacío'))
  })

  test('sin párrafos con texto pide al menos uno', () => {
    const issues = validateAbout({ ...base, paragraphs: [] })
    assert.deepEqual(issues, [{ path: 'about.paragraphs', message: 'debe tener al menos 1 párrafo' }])
  })
})
