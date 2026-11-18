import { getValidContactLinks, isValidResumeHref } from '../../lib/validateContent.ts'
import type { Profile } from '../../types/content.ts'
import { Button } from '../ui/Button.tsx'
import { ContactLinks } from '../ui/ContactLinks.tsx'
import { ProfileImage } from '../ui/ProfileImage.tsx'

interface HeroProps {
  profile: Profile
}

export function Hero({ profile }: HeroProps) {
  const { name, role, stack, location, availability, contactLinks, cv, photo } = profile
  // En producción, la data inválida se oculta en vez de romper la página (FR-022).
  const validLinks = getValidContactLinks(contactLinks)
  const showCv = isValidResumeHref(cv.href)

  // Con foto: dos columnas en desktop y landscape. Sin foto: una sola columna (FR-002a).
  const layout = photo
    ? 'md:flex-row-reverse md:items-center md:justify-between md:gap-12 short:flex-row short:items-center short:gap-6'
    : 'short:gap-3'

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className={`hero-timeline mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center gap-6 px-4 py-6 md:px-8 short:py-3 ${layout}`}
    >
      {photo && <ProfileImage photo={photo} className="motion-safe:dot-photo-dissolve" />}

      <div className="flex flex-col gap-5 short:gap-3">
        <h1 id="hero-title" className="font-pixel text-display text-accent motion-safe:dot-dissolve short:text-5xl">
          {name}
        </h1>

        {/* Solo se desvanece: los links siguen operables mientras se ven (FR-009a). */}
        <div className="flex flex-col gap-5 motion-safe:hero-fade short:gap-3">
          <div className="flex flex-col gap-2 short:gap-1">
            <p className="text-lg text-balance text-fg md:text-xl short:text-base">{role}</p>
            <p className="font-mono text-sm text-muted">{stack.join(' · ')}</p>
            <p className="text-sm text-muted">
              {location} · {availability}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ContactLinks links={validLinks} />
            {showCv && (
              <Button href={cv.href} variant="primary" external ariaLabel={cv.ariaLabel}>
                {cv.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
