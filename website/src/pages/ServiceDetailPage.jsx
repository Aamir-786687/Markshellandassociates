import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { SEO, Breadcrumbs } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { getServiceBySlug, getRelatedServices } from '@/data/services'
import { Accordion } from '@/components/ui/Accordion'
import { ServiceCard, Timeline, CTABanner } from '@/components/ui/Cards'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { Button } from '@/components/ui/Button'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const service = slug ? getServiceBySlug(slug) : undefined

  if (!service) return <Navigate to="/services" replace />

  const related = getRelatedServices(service.relatedSlugs)

  return (
    <>
      <SEO
        title={service.title}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
        image={service.image}
      />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
        image={service.image}
        imageAlt={`Illustration for ${service.title}`}
        titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        topContent={
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]} />
        }
      >
        <div className="mt-4 md:mt-6">
          <Button href="/contact">Request Consultation</Button>
        </div>
      </PageHero>

      <section className="page-section bg-surface">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Overview</h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:mt-6 md:text-lg">{service.overview}</p>
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Key Benefits</h2>
          </FadeIn>
          <StaggerContainer className="mt-6 grid gap-4 sm:grid-cols-2 md:mt-10">
            {service.benefits.map((benefit) => (
              <StaggerItem key={benefit}>
                <div className="flex items-start gap-3 rounded-xl border border-border p-5">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                  <span className="text-muted">{benefit}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="page-section bg-surface">
        <div className="container-custom">
          <FadeIn className="text-center">
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Our Process</h2>
          </FadeIn>
          <div className="mt-8 md:mt-12">
            <Timeline steps={service.process} />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Frequently Asked Questions</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-6 md:mt-8">
            <Accordion items={service.faqs} />
          </FadeIn>
        </div>
      </section>

      {related.length > 0 && (
        <section className="page-section bg-surface">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Related Services</h2>
            </FadeIn>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 lg:gap-8">
              {related.map((s, i) => (
                <ServiceCard key={s.slug} service={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="page-section-end">
        <div className="container-custom">
          <CTABanner
            title={`Ready to Get Started with ${service.title}?`}
            description="Our specialists are ready to assess your needs and develop a tailored strategy."
          />
        </div>
      </section>
    </>
  )
}
