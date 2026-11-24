import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { SiteFooter } from './components/SiteFooter.tsx'
import { SiteHeader } from './components/SiteHeader.tsx'
import { About } from './components/sections/About.tsx'
import { Experience } from './components/sections/Experience.tsx'
import { Hero } from './components/sections/Hero.tsx'
import { about } from './data/about.ts'
import { experience } from './data/experience.ts'
import { profile } from './data/profile.ts'
import { navLabels, sections } from './data/sections.ts'
import { site } from './data/site.ts'
import {
  validateAbout,
  validateExperience,
  validateProfile,
  validateSections,
  validateSite,
} from './lib/validateContent.ts'

// Principio V: en desarrollo se valida cada archivo de src/data/ una vez, al cargar el módulo.
if (import.meta.env.DEV) {
  const issues = [
    ...validateProfile(profile),
    ...validateSite(site, profile),
    ...validateSections(sections),
    ...validateAbout(about),
    ...validateExperience(experience),
  ]
  for (const issue of issues) console.warn('[contenido]', issue.path, issue.message)
}

export default function App() {
  return (
    <>
      {/* Header (h-15) + Hero (hero-screen) ocupan juntos la primera pantalla (002 R3). */}
      <SiteHeader brand={profile.name} sections={sections} labels={navLabels} />
      <main>
        <ErrorBoundary name="Hero">
          <Hero profile={profile} />
        </ErrorBoundary>
        <ErrorBoundary name="Sobre mí">
          <About about={about} />
        </ErrorBoundary>
        <ErrorBoundary name="Experiencia">
          <Experience experience={experience} />
        </ErrorBoundary>
      </main>
      <SiteFooter copyright={site.copyright} />
    </>
  )
}
