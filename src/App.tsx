import { ErrorBoundary } from './components/ErrorBoundary.tsx'
import { SiteFooter } from './components/SiteFooter.tsx'
import { SiteHeader } from './components/SiteHeader.tsx'
import { Hero } from './components/sections/Hero.tsx'
import { profile } from './data/profile.ts'
import { sections } from './data/sections.ts'
import { site } from './data/site.ts'
import { validateProfile, validateSections, validateSite } from './lib/validateContent.ts'

// Principio V: en desarrollo se valida cada archivo de src/data/ una vez, al cargar el módulo.
if (import.meta.env.DEV) {
  const issues = [...validateProfile(profile), ...validateSite(site, profile), ...validateSections(sections)]
  for (const issue of issues) console.warn('[contenido]', issue.path, issue.message)
}

export default function App() {
  return (
    <>
      {/* Header + Hero ocupan juntos una pantalla, sin calc() (T019). */}
      <div className="flex min-h-svh flex-col">
        <SiteHeader brand={profile.name} sections={sections} />
        <main className="flex flex-1 flex-col">
          <ErrorBoundary name="Hero">
            <Hero profile={profile} />
          </ErrorBoundary>
        </main>
      </div>
      <SiteFooter copyright={site.copyright} />
    </>
  )
}
