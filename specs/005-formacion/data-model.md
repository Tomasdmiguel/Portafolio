# Data Model: Formación

## Degree

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `title` | `string` | sí | no vacío |
| `institution` | `string` | sí | no vacío |
| `location` | `string` | no | vacío no se muestra |
| `start` | `number` | sí | entero 1900–2100 |
| `end` | `number` | no | entero ≥ `start`; sin `end` = en curso |

## Language

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `name` | `string` | sí | no vacío |
| `level` | `string` | sí | no vacío |
| `detail` | `string` | no | vacío no se muestra |

## EducationContent (`src/data/education.ts`)

| Campo | Tipo | Regla |
|---|---|---|
| `title` | `string` | h2, no vacío |
| `degreesLabel` | `string` | "Título" |
| `languagesLabel` | `string` | "Idiomas" |
| `presentLabel` | `string` | "En curso" (título sin `end`) |
| `degrees` | `readonly Degree[]` | válidos, en orden de la data |
| `languages` | `readonly Language[]` | válidos, en orden de la data |

## Certification

| Campo | Tipo | Obligatorio | Regla |
|---|---|---|---|
| `title` | `string` | sí | no vacío |
| `category` | `CertificationCategory` (`'ai' \| 'english' \| 'frontend' \| 'backend'`) | sí | unión cerrada (constitución) |
| `date` | `YearMonth` | sí | `YYYY-MM` válido |
| `url` | `string` | sí | https; sin repetidos (aviso) |

## CertificationsContent (`src/data/certifications.ts`)

| Campo | Tipo | Regla |
|---|---|---|
| `label` | `string` | "Certificaciones" |
| `categoryLabels` | `Record<CertificationCategory, string>` | IA, Inglés, Frontend, Backend |
| `newTabHint` | `string` | "(abre en una pestaña nueva)", solo para lectores de pantalla |
| `items` | `readonly Certification[]` | hoy vacío |

## Section

`{ id: 'formacion', label: 'Formación', hasContent: hasEducationContent(education, certifications) }`
después de `stack`.
