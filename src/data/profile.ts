import photo320 from '../assets/profile/tomas-320.avif'
import photo640 from '../assets/profile/tomas-640.avif'
import photoJpeg from '../assets/profile/tomas-640.jpg'
import type { Profile } from '../types/content.ts'
import { contactLinks } from './contactLinks.ts'

export const profile: Profile = {
  name: 'Tomás De Miguel',
  role: 'Frontend Developer Semi Senior | AI-Driven Development',
  stack: ['React', 'TypeScript', 'Next.js'],
  location: 'Tandil, Argentina',
  availability: 'Disponible para trabajo remoto',
  contactLinks,
  cv: {
    label: 'Ver CV',
    ariaLabel: 'Ver CV en PDF (se abre en una pestaña nueva)',
    href: '/cv/tomas-de-miguel-cv.pdf',
  },
  photo: {
    src: photoJpeg,
    sources: [{ type: 'image/avif', srcSet: `${photo320} 1x, ${photo640} 2x` }],
    alt: 'Foto de Tomás De Miguel',
    width: 320,
    height: 320,
    fallbackInitials: 'TDM',
  },
}
