import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { about } from '../data/about.ts'
import { experience } from '../data/experience.ts'
import { stack } from '../data/stack.ts'
import { contact } from '../data/contactLinks.ts'
import { certifications } from '../data/certifications.ts'
import { education } from '../data/education.ts'
import type {
  About,
  Certification,
  CertificationsContent,
  EducationContent,
  ContactLink,
  Experience,
  ExperienceContent,
  Profile,
  Section,
  SiteMeta,
  StackContent,
} from '../types/content.ts'
import {
  getEmailAddress,
  hasContactContent,
  validateContact,
  getValidCertificationGroups,
  hasEducationContent,
  isValidCertification,
  isValidDegree,
  isValidLanguage,
  validateCertifications,
  validateEducation,
  getValidStackGroups,
  hasStackContent,
  validateStack,
  formatMonth,
  getValidExperiences,
  hasExperienceContent,
  isValidExperience,
  isValidYearMonth,
  validateExperience,
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

describe('Experiencia (feature 003)', () => {
  const job: Experience = {
    role: 'Frontend Developer',
    company: 'Acme',
    start: '2024-09',
    modality: 'Remoto',
    highlights: [{ text: 'Hice cosas.' }],
    tech: ['React'],
  }
  const content: ExperienceContent = {
    title: 'Experiencia',
    currentLabel: 'Actual',
    presentLabel: 'Actualidad',
    techLabel: 'Tecnologías',
    items: [job],
  }

  test('isValidYearMonth acepta YYYY-MM con mes 01–12', () => {
    assert.equal(isValidYearMonth('2024-09'), true)
    for (const value of ['2024-13', '2024-00', '2024-9', '24-09', '']) {
      assert.equal(isValidYearMonth(value), false, value)
    }
  })

  test('formatMonth usa meses abreviados en español', () => {
    assert.equal(formatMonth('2024-09'), 'Sep 2024')
    assert.equal(formatMonth('2025-01'), 'Ene 2025')
  })

  test('isValidExperience exige puesto, empresa, modalidad y fechas coherentes', () => {
    assert.equal(isValidExperience(job), true)
    assert.equal(isValidExperience({ ...job, end: '2024-09' }), true)
    assert.equal(isValidExperience({ ...job, role: ' ' }), false)
    assert.equal(isValidExperience({ ...job, company: '' }), false)
    assert.equal(isValidExperience({ ...job, modality: '' }), false)
    assert.equal(isValidExperience({ ...job, start: '2024-13' }), false)
    assert.equal(isValidExperience({ ...job, end: '2024-1' as Experience['end'] }), false)
    assert.equal(isValidExperience({ ...job, end: '2023-01' }), false)
  })

  test('getValidExperiences filtra, ordena por inicio descendente y limpia logros y tecnologías', () => {
    const old: Experience = { ...job, company: 'Vieja', start: '2022-03', end: '2023-01' }
    const invalid: Experience = { ...job, role: '' }
    const messy: Experience = {
      ...job,
      start: '2025-02',
      highlights: [{ text: 'a' }, { text: ' ' }, { text: 'b' }, { text: 'c' }, { text: 'd' }, { text: 'e' }],
      tech: ['React', '', 'Zod'],
    }
    const result = getValidExperiences({ ...content, items: [old, invalid, messy, job] })
    assert.deepEqual(
      result.map((item) => item.start),
      ['2025-02', '2024-09', '2022-03'],
    )
    const [first] = result
    assert.ok(first)
    assert.deepEqual(
      first.highlights.map((h) => h.text),
      ['a', 'b', 'c', 'd'],
    )
    assert.deepEqual(first.tech, ['React', 'Zod'])
  })

  test('hasExperienceContent es false sin experiencias válidas', () => {
    assert.equal(hasExperienceContent({ ...content, items: [] }), false)
    assert.equal(hasExperienceContent({ ...content, items: [{ ...job, company: '' }] }), false)
    assert.equal(hasExperienceContent(content), true)
  })

  test('el contenido real no tiene avisos', () => {
    assert.deepEqual(validateExperience(experience), [])
  })

  test('validateExperience reporta campos y fechas inválidos', () => {
    const issues = validateExperience({
      ...content,
      title: '',
      techLabel: ' ',
      items: [
        { ...job, role: '', company: '', modality: '', start: '2024-13', end: '2024-1' as Experience['end'] },
        { ...job, end: '2023-01', highlights: [{ text: '' }] },
      ],
    })
    assert.deepEqual(paths(issues), [
      'experience.title',
      'experience.techLabel',
      'experience.items',
      'experience.items[0].role',
      'experience.items[0].company',
      'experience.items[0].modality',
      'experience.items[0].start',
      'experience.items[0].end',
      'experience.items[1].end',
      'experience.items[1].highlights[0].text',
    ])
    const byPath = new Map(issues.map((issue) => [issue.path, issue.message]))
    assert.equal(byPath.get('experience.items'), 'debe tener al menos 1 experiencia válida')
    assert.equal(byPath.get('experience.items[0].start'), 'debe tener formato YYYY-MM')
    assert.equal(byPath.get('experience.items[1].end'), 'no puede ser anterior al inicio')
  })

  test('validateExperience avisa logros largos y más de 4', () => {
    const long = { lead: 'Uno dos', text: Array.from({ length: 19 }, () => 'palabra').join(' ') }
    const issues = validateExperience({
      ...content,
      items: [{ ...job, highlights: [long, { text: 'a' }, { text: 'b' }, { text: 'c' }, { text: 'd' }] }],
    })
    assert.deepEqual(issues, [
      { path: 'experience.items[0].highlights', message: 'se muestran hasta 4 logros' },
      { path: 'experience.items[0].highlights[0]', message: 'debe tener hasta 20 palabras' },
    ])
  })
})

describe('Stack (feature 004)', () => {
  const content: StackContent = {
    title: 'Stack',
    groups: [
      { name: 'Frontend', items: ['React', 'TypeScript'] },
      { name: 'Backend', note: 'Conocimientos', items: ['Node.js'] },
    ],
  }

  test('getValidStackGroups filtra categorías inválidas y limpia ítems vacíos y repetidos', () => {
    const result = getValidStackGroups({
      ...content,
      groups: [
        { name: 'Frontend', items: ['React', ' react ', '', 'Zod', 'ZOD', '  Vite  '] },
        { name: ' ', items: ['Git'] },
        { name: 'Vacía', items: ['', ' '] },
        { name: 'Backend', items: ['Node.js'] },
      ],
    })
    assert.deepEqual(
      result.map((group) => group.name),
      ['Frontend', 'Backend'],
    )
    assert.deepEqual(result[0]?.items, ['React', 'Zod', 'Vite'])
  })

  test('hasStackContent es false sin categorías válidas', () => {
    assert.equal(hasStackContent({ ...content, groups: [] }), false)
    assert.equal(hasStackContent({ ...content, groups: [{ name: 'X', items: [''] }] }), false)
    assert.equal(hasStackContent(content), true)
  })

  test('el contenido real no tiene avisos', () => {
    assert.deepEqual(validateStack(stack), [])
  })

  test('validateStack reporta nombres, ítems vacíos, repetidos y destacados de más', () => {
    const issues = validateStack({
      title: '',
      groups: [
        { name: '', featured: true, items: [] },
        { name: 'Frontend', featured: true, items: ['React', '', 'react'] },
      ],
    })
    assert.deepEqual(issues, [
      { path: 'stack.title', message: 'no puede estar vacío' },
      { path: 'stack.groups', message: 'solo una categoría puede estar destacada' },
      { path: 'stack.groups[0].name', message: 'no puede estar vacío' },
      { path: 'stack.groups[0].items', message: 'debe tener al menos 1 tecnología' },
      { path: 'stack.groups[1].items[1]', message: 'no puede estar vacío' },
      { path: 'stack.groups[1].items[2]', message: 'está repetido' },
    ])
  })

  test('sin categorías válidas pide al menos una', () => {
    const issues = validateStack({ ...content, groups: [] })
    assert.deepEqual(issues, [{ path: 'stack.groups', message: 'debe tener al menos 1 categoría válida' }])
  })
})

describe('Formación (feature 005)', () => {
  const degree = { title: 'Técnico', institution: 'Escuela', start: 2015, end: 2022 }
  const edu: EducationContent = {
    title: 'Formación',
    degreesLabel: 'Título',
    languagesLabel: 'Idiomas',
    presentLabel: 'En curso',
    degrees: [degree],
    languages: [{ name: 'Inglés', level: 'Básico' }],
  }
  const cert: Certification = { title: 'Curso', category: 'frontend', date: '2025-03', url: 'https://platzi.com/p/x/' }
  const certs: CertificationsContent = {
    label: 'Certificaciones',
    categoryLabels: { ai: 'IA', english: 'Inglés', frontend: 'Frontend', backend: 'Backend' },
    newTabHint: '(abre en una pestaña nueva)',
    previewCount: 5,
    countLabel: 'cursos aprobados',
    showAllLabel: 'Ver los',
    items: [],
  }

  test('isValidDegree exige título, institución y años coherentes', () => {
    assert.equal(isValidDegree(degree), true)
    assert.equal(isValidDegree({ ...degree, end: undefined }), true)
    assert.equal(isValidDegree({ ...degree, title: ' ' }), false)
    assert.equal(isValidDegree({ ...degree, institution: '' }), false)
    assert.equal(isValidDegree({ ...degree, start: 1899 }), false)
    assert.equal(isValidDegree({ ...degree, start: 2015.5 }), false)
    assert.equal(isValidDegree({ ...degree, end: 2014 }), false)
  })

  test('isValidLanguage exige nombre y nivel', () => {
    assert.equal(isValidLanguage({ name: 'Inglés', level: 'Básico' }), true)
    assert.equal(isValidLanguage({ name: '', level: 'Básico' }), false)
    assert.equal(isValidLanguage({ name: 'Inglés', level: ' ' }), false)
  })

  test('isValidCertification valida título, categoría, fecha y URL https', () => {
    assert.equal(isValidCertification(cert), true)
    assert.equal(isValidCertification({ ...cert, title: '' }), false)
    assert.equal(isValidCertification({ ...cert, category: 'design' as Certification['category'] }), false)
    assert.equal(isValidCertification({ ...cert, date: '2025-13' }), false)
    assert.equal(isValidCertification({ ...cert, url: 'http://platzi.com/p/x/' }), false)
  })

  test('getValidCertificationGroups ordena por categoría fija y fecha descendente', () => {
    const groups = getValidCertificationGroups({
      ...certs,
      items: [
        { ...cert, title: 'Front viejo', date: '2024-01' },
        { ...cert, title: 'IA', category: 'ai' },
        { ...cert, title: 'Front nuevo', date: '2025-06', url: 'https://platzi.com/p/y/' },
        { ...cert, title: '' },
      ],
    })
    assert.deepEqual(
      groups.map((group) => [group.category, group.label, group.items.map((item) => item.title)]),
      [
        ['ai', 'IA', ['IA']],
        ['frontend', 'Frontend', ['Front nuevo', 'Front viejo']],
      ],
    )
  })

  test('hasEducationContent con cualquiera de los tres bloques', () => {
    const empty: EducationContent = { ...edu, degrees: [], languages: [] }
    assert.equal(hasEducationContent(empty, certs), false)
    assert.equal(hasEducationContent({ ...empty, languages: edu.languages }, certs), true)
    assert.equal(hasEducationContent(empty, { ...certs, items: [cert] }), true)
  })

  test('el contenido real no tiene avisos', () => {
    assert.deepEqual(validateEducation(education), [])
    assert.deepEqual(validateCertifications(certifications), [])
  })

  test('validateEducation reporta campos vacíos y años inválidos', () => {
    const issues = validateEducation({
      ...edu,
      title: '',
      degrees: [{ title: '', institution: '', start: 3000, end: 2000 }],
      languages: [{ name: '', level: '' }],
    })
    assert.deepEqual(paths(issues), [
      'education.title',
      'education.degrees[0].title',
      'education.degrees[0].institution',
      'education.degrees[0].start',
      'education.languages[0].name',
      'education.languages[0].level',
    ])
    const valid = validateEducation({ ...edu, degrees: [{ ...degree, end: 2010 }] })
    assert.deepEqual(valid, [{ path: 'education.degrees[0].end', message: 'no puede ser anterior al inicio' }])
  })

  test('validateCertifications valida previewCount y el perfil', () => {
    const issues = validateCertifications({
      ...certs,
      previewCount: 0,
      profile: { label: ' ', url: 'http://platzi.com/p/x/' },
    })
    assert.deepEqual(paths(issues), [
      'certifications.previewCount',
      'certifications.profile.label',
      'certifications.profile.url',
    ])
  })

  test('validateCertifications reporta campos inválidos y URLs repetidas', () => {
    const issues = validateCertifications({
      ...certs,
      items: [
        cert,
        { title: '', category: 'x' as Certification['category'], date: '2025-1' as Certification['date'], url: 'ftp://x' },
        { ...cert, title: 'Otro' },
      ],
    })
    assert.deepEqual(issues, [
      { path: 'certifications.items[1].title', message: 'no puede estar vacío' },
      { path: 'certifications.items[1].category', message: 'debe ser ai, english, frontend o backend' },
      { path: 'certifications.items[1].date', message: 'debe tener formato YYYY-MM' },
      { path: 'certifications.items[1].url', message: 'debe ser una URL https' },
      { path: 'certifications.items[2].url', message: 'está repetida' },
    ])
  })
})

describe('Contacto (feature 007)', () => {
  test('getEmailAddress devuelve la dirección del primer email válido', () => {
    assert.equal(getEmailAddress(links), 'x@example.com')
    assert.equal(getEmailAddress(links.filter((link) => link.kind !== 'email')), null)
    assert.equal(getEmailAddress([{ ...links[2]!, href: 'mailto:roto' }]), null)
  })

  test('hasContactContent es false sin links válidos', () => {
    assert.equal(hasContactContent([]), false)
    assert.equal(hasContactContent([{ ...links[0]!, href: 'http://inseguro' }]), false)
    assert.equal(hasContactContent(links), true)
  })

  test('validateContact: el contenido real no tiene avisos y reporta textos vacíos', () => {
    assert.deepEqual(validateContact(contact), [])
    assert.deepEqual(paths(validateContact({ ...contact, heading: ' ', copiedLabel: '' })), [
      'contact.heading',
      'contact.copiedLabel',
    ])
  })
})
