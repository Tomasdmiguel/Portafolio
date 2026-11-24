# Contract: contenido y componentes de "Formación"

Complementa los contratos de las features 001 a 004.

## Tipos (`src/types/content.ts`)

```ts
export interface Degree {
  title: string
  institution: string
  location?: string
  start: number
  end?: number
}

export interface Language {
  name: string
  level: string
  detail?: string
}

export interface EducationContent {
  title: string
  degreesLabel: string
  languagesLabel: string
  presentLabel: string
  degrees: readonly Degree[]
  languages: readonly Language[]
}

export type CertificationCategory = 'ai' | 'english' | 'frontend' | 'backend'

export interface Certification {
  title: string
  category: CertificationCategory
  date: YearMonth
  url: string
}

export interface CertificationsContent {
  label: string
  categoryLabels: Record<CertificationCategory, string>
  newTabHint: string
  items: readonly Certification[]
}

export interface CertificationGroup {
  category: CertificationCategory
  label: string
  items: Certification[]
}
```

## Funciones (`src/lib/validateContent.ts`)

| Función | Firma |
|---|---|
| `CERTIFICATION_CATEGORIES` | `readonly CertificationCategory[]` = `['ai', 'english', 'frontend', 'backend']` |
| `isValidDegree` | `(degree: Degree) => boolean` |
| `isValidLanguage` | `(language: Language) => boolean` |
| `isValidCertification` | `(item: Certification) => boolean` |
| `getValidCertifications` | `(content: CertificationsContent) => Certification[]` |
| `getValidCertificationGroups` | `(content: CertificationsContent) => CertificationGroup[]` |
| `hasEducationContent` | `(education: EducationContent, certifications: CertificationsContent) => boolean` |
| `validateEducation` | `(education: EducationContent) => ValidationIssue[]` |
| `validateCertifications` | `(content: CertificationsContent) => ValidationIssue[]` |

## Componentes

| Componente | Props | Comportamiento |
|---|---|---|
| `sections/Education` | `{ education: EducationContent; certifications: CertificationsContent }` | `<section id="formacion">`; `null` sin contenido; tarjetas Título e Idiomas |
| `sections/CertificationList` | `{ certifications: CertificationsContent }` | tarjeta "Certificaciones" agrupada; `null` sin ítems válidos |

## Script

`scripts/check-links.ts` verifica también `getValidCertifications(...)` → cada `url`.
