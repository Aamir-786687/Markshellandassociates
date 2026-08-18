import { FIRM_NAME } from '@/data/brand'
import { BrandName } from '@/components/BrandName'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCounter } from '@/components/ui/Button'
import { CTABanner } from '@/components/ui/Cards'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { statistics } from '@/data/content'

const values = [
  { title: 'Precision', description: 'We deliver every filing and legal strategy with exceptional accuracy and attention to detail.' },
  { title: 'Integrity', description: 'We uphold honesty, transparency, and ethical standards in every client relationship.' },
  { title: 'Innovation', description: 'We create forward-thinking IP solutions that adapt to evolving technology and business needs.' },
  { title: 'Partnership', description: 'We work as an extension of your team, aligning our legal expertise with your business goals.' },
]

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description={`Learn about ${FIRM_NAME} — nine years of premier intellectual property counsel for innovators worldwide.`} path="/about" image="/Images/about-main.png" />

      <PageHero
        eyebrow="About Us"
        title="Nine Years of IP Excellence"
        description={<>Founded on the belief that intellectual property is the foundation of modern enterprise, <BrandName ampClassName="text-gold" /> has grown into trusted counsel for innovators across six continents.</>}
        image="/Images/about-main.png"
        imageAlt="Abstract illustration of firm history and innovation timeline"
      />

      <section className="page-section">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl lg:text-4xl">Who Are We?</h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:mt-6 md:text-lg">
              <BrandName ampClassName="text-gold" /> is a trusted Intellectual Property law firm committed to helping businesses, startups, and creators safeguard what they build. From trademark, copyright, patent, and design registration to enforcement and litigation, we provide comprehensive IPR solutions with unmatched speed, clarity, and precision.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted md:mt-6 md:text-lg">
              Founded by experienced legal professionals, our mission is simple: to transform your ideas into protected assets. With a client-first approach, affordable services, and a PAN-India presence, we ensure your brand remains secure and ahead of the curve.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="page-section bg-surface">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Our Mission</h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:mt-6 md:text-lg">To deliver precise, strategic intellectual property counsel that empowers clients to innovate with confidence — protecting their creations while enabling sustainable growth in an increasingly complex global IP landscape.</p>
          </FadeIn>
        </div>
      </section>

      <section className="page-section">
        <div className="container-custom">
          <StaggerContainer className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
            {statistics.map((s) => (
              <StaggerItem key={s.label}><AnimatedCounter end={s.value} suffix={s.suffix} label={s.label} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="page-section bg-surface">
        <div className="container-custom">
          <FadeIn className="text-center"><h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Our Values</h2></FadeIn>
          <StaggerContainer className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-12 md:gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="rounded-2xl border border-border bg-white p-6 md:p-8">
                  <h3 className="text-display text-lg font-semibold text-navy md:text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted md:mt-3">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="page-section-end"><div className="container-custom"><FadeIn><CTABanner title="Partner With Us" description="Discover how our IP expertise can protect and accelerate your business." /></FadeIn></div></section>
    </>
  )
}
