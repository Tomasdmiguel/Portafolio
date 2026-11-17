import { useState } from 'react'
import type { ProfilePhoto } from '../../types/content.ts'

interface ProfileImageProps {
  photo: ProfilePhoto
  /** Clases extra para el bloque con la máscara de puntos (por ejemplo, la animación). */
  className?: string
}

const size = 'size-40 md:size-64 short:size-30'

export function ProfileImage({ photo, className = '' }: ProfileImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={photo.alt}
        className={`${size} flex shrink-0 items-center justify-center rounded-full bg-surface font-pixel text-4xl text-accent`}
      >
        {photo.fallbackInitials}
      </div>
    )
  }

  return (
    <div className={`${size} dot-photo relative shrink-0 ${className}`}>
      <picture>
        {photo.sources.map((source) => (
          <source key={source.type} type={source.type} srcSet={source.srcSet} />
        ))}
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          fetchPriority="high"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover grayscale contrast-125"
        />
      </picture>
      {/* Tinte ámbar sobre la foto en grises. */}
      <span aria-hidden="true" className="absolute inset-0 bg-accent mix-blend-multiply" />
    </div>
  )
}
