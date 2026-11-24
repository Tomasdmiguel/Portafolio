// Sin imports de assets: lo lee scripts/check-links.ts en Node.
import type { CertificationsContent } from '../types/content.ts'

/**
 * Certificaciones (spec 005). Para agregar una, se suma un ítem a `items`; el bloque aparece solo:
 *   { title: 'Curso de …', category: 'frontend', date: '2025-03', url: 'https://platzi.com/p/…' }
 * Categorías: 'ai' | 'english' | 'frontend' | 'backend'.
 */
export const certifications: CertificationsContent = {
  label: 'Certificaciones',
  categoryLabels: { ai: 'IA', english: 'Inglés', frontend: 'Frontend', backend: 'Backend' },
  newTabHint: '(abre en una pestaña nueva)',
  items: [],
}
