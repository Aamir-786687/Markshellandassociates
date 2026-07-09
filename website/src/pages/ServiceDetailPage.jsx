import { useParams, Navigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { SEO, Breadcrumbs } from '@/components/layout/SEO'
import { getServiceBySlug, getRelatedServices } from '@/data/services'
import { Accordion } from '@/components/ui/Accordion'
import { ServiceCard, Timeline, CTABanner } from '@/components/ui/Cards'
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
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

      <section className="pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="container-custom">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.title },
          ]} />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn type="fadeLeft">
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Service</p>
              <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl lg:text-6xl">{service.title}</h1>
              <p className="mt-6 text-lg leading-relaxed text-muted">{service.shortDescription}</p>
              <div className="mt-8">
                <Button href="/contact">Request Consultation</Button>
              </div>
            </FadeIn>
            <FadeIn type="fadeRight">
              <ImageReveal src={service.image} alt={`Illustration for ${service.title}`} className="rounded-3xl shadow-medium" />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Overview</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">{service.overview}</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Key Benefits</h2>
          </FadeIn>
          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((benefit) => (
              <StaggerItem key={benefit}>
                <div className="flex items-start gap-3 rounded-xl border border-border p-5">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-navy" />
                  <span className="text-muted">{benefit}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <FadeIn className="text-center">
            <h2 className="text-display text-3xl font-semibold text-navy">Our Process</h2>
          </FadeIn>
          <div className="mt-12">
            <Timeline steps={service.process} />
          </div>
        </div>
      </section>

      <section className="section-padding">
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
        <section className="section-padding bg-surface">
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

      <section className="section-padding">
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
