import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { ServiceCard, CTABanner } from '@/components/ui/Cards'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { services } from '@/data/services'

export default function ServicesPage() {
  return (
    <>
      <SEO title="IP Services" description="Comprehensive intellectual property services — trademark, patent, copyright, enforcement, litigation, and due diligence." path="/services" />

      <PageHero
        eyebrow="Our Services"
        title="Intellectual Property Services"
        description="Ten specialized practice areas designed to protect, enforce, and maximize the value of your intellectual assets."
        image="/Images/service-trademark.png"
        imageAlt="Intellectual property services illustration"
      />

      <section className="page-section bg-surface">
        <div className="container-custom">
          <StaggerContainer className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {services.map((service, i) => (
              <StaggerItem key={service.slug}><ServiceCard service={service} index={i} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="page-section-end"><div className="container-custom"><FadeIn><CTABanner title="Need Guidance on Your IP Strategy?" description="Our specialists are ready to assess your needs." /></FadeIn></div></section>
    </>
  )
}
