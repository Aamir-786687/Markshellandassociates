import { FadeIn, ImageReveal } from '@/components/animations/MotionPrimitives'
import { cn } from '@/lib/utils'

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  titleClassName,
  children,
  className,
  topContent,
}) {
  const heroGrid = (
    <div className={cn('page-hero-grid', topContent && 'mt-4 md:mt-6')}>
      <FadeIn type="fadeLeft">
        {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
        <h1
          className={cn(
            'text-display mt-3 font-semibold text-navy md:mt-4',
            titleClassName ?? 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
          )}
        >
          {title}
        </h1>
        {description ? (
          <div className="mt-3 text-base leading-relaxed text-muted sm:mt-4 md:text-lg">{description}</div>
        ) : null}
        {children}
      </FadeIn>
      {image ? (
        <FadeIn type="fadeRight" className="hidden lg:block">
          <ImageReveal
            src={image}
            alt={imageAlt}
            className="max-h-[min(420px,50vh)] rounded-3xl shadow-medium"
          />
        </FadeIn>
      ) : null}
    </div>
  )

  return (
    <section className={cn('page-hero', className)}>
      {topContent ? (
        <div className="container-custom">
          {topContent}
          {heroGrid}
        </div>
      ) : (
        heroGrid
      )}
    </section>
  )
}
