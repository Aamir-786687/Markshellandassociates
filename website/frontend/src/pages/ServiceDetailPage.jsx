import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { SEO, Breadcrumbs } from '@/components/layout/SEO'
import { Accordion } from '@/components/ui/Accordion'
import { ServiceCard, Timeline, CTABanner } from '@/components/ui/Cards'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { Button } from '@/components/ui/Button'
import { getRelatedServices } from '@/api/client'
import { useService, useServices } from '@/hooks/useContent'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const { data: service, isLoading, isError } = useService(slug)
  const { data: allServices = [] } = useServices()

  if (isLoading) return <PageLoader />
  if (isError || !service) return <Navigate to="/services" replace />

  const related = getRelatedServices(allServices, service.relatedSlugs)

  return (
    <>
      <SEO
        title={service.title}
        description={service.shortDescription}
        path={`/services/${service.slug}`}
        image={service.image}
      />

      <section className="page-hero md:pb-10 lg:pb-16">
        <div className="container-custom">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]} />

          <div className="page-hero-grid !px-0 lg:mt-4">
            <FadeIn type="fadeLeft">
              <p className="section-eyebrow">Service</p>
              <h1 className="text-display mt-3 text-3xl font-semibold text-navy sm:text-4xl md:mt-4 md:text-5xl lg:text-6xl">{service.title}</h1>
              <p className="mt-4 text-base leading-relaxed text-muted md:mt-6 md:text-lg">{service.shortDescription}</p>
              <div className="mt-6 md:mt-8">
                <Button href="/contact">Request Consultation</Button>
              </div>
            </FadeIn>
            <FadeIn type="fadeRight" className="hidden lg:block">
              <ImageReveal src={service.image} alt={`Illustration for ${service.title}`} className="max-h-[min(420px,50vh)] rounded-3xl shadow-medium" />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="page-section bg-surface">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Overview</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{service.overview}</p>
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Key Benefits</h2>
          </FadeIn>
          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2">
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
            <h2 className="text-display text-3xl font-semibold text-navy">Our Process</h2>
          </FadeIn>
          <div className="mt-12">
            <Timeline steps={service.process} />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Frequently Asked Questions</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-8">
            <Accordion items={service.faqs} />
          </FadeIn>
        </div>
      </section>

      {related.length > 0 && (
        <section className="page-section bg-surface">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-display text-3xl font-semibold text-navy">Related Services</h2>
            </FadeIn>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
