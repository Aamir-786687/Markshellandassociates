import { SEO } from '@/components/layout/SEO'
import { ServiceCard, CTABanner } from '@/components/ui/Cards'
import { FadeIn, StaggerContainer, StaggerItem, ImageReveal } from '@/components/animations/MotionPrimitives'
import { services } from '@/data/services'

export default function ServicesPage() {
  return (
    <>
      <SEO title="IP Services" description="Comprehensive intellectual property services — trademark, patent, copyright, enforcement, litigation, and due diligence." path="/services" />

      <section className="pt-36 pb-16 md:pt-44">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Our Services</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">Intellectual Property Services</h1>
            <p className="mt-6 text-lg text-muted">Ten specialized practice areas designed to protect, enforce, and maximize the value of your intellectual assets.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/service-trademark.png" alt="Intellectual property services illustration" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <StaggerItem key={service.slug}><ServiceCard service={service} index={i} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding"><div className="container-custom"><FadeIn><CTABanner title="Need Guidance on Your IP Strategy?" description="Our specialists are ready to assess your needs." /></FadeIn></div></section>
    </>
  )
}
