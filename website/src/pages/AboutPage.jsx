import { FIRM_NAME } from '@/data/brand'
import { BrandName } from '@/components/BrandName'
import { SEO } from '@/components/layout/SEO'
import { AnimatedCounter } from '@/components/ui/Button'
import { CTABanner } from '@/components/ui/Cards'
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
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

      <section className="pt-36 pb-16 md:pt-44">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="section-eyebrow">About Us</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl lg:text-6xl">Nine Years of IP Excellence</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">Founded on the belief that intellectual property is the foundation of modern enterprise, <BrandName ampClassName="text-gold" /> has grown into trusted counsel for innovators across six continents.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/about-main.png" alt="Abstract illustration of firm history and innovation timeline" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="pt-16">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy md:text-4xl">Who Are We?</h2>            <p className="mt-6 text-lg leading-relaxed text-muted">
              <BrandName ampClassName="text-gold" /> is a trusted Intellectual Property law firm committed to helping businesses, startups, and creators safeguard what they build. From trademark, copyright, patent, and design registration to enforcement and litigation, we provide comprehensive IPR solutions with unmatched speed, clarity, and precision.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Founded by experienced legal professionals, our mission is simple: to transform your ideas into protected assets. With a client-first approach, affordable services, and a PAN-India presence, we ensure your brand remains secure and ahead of the curve.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="pt-16 bg-surface">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">To deliver precise, strategic intellectual property counsel that empowers clients to innovate with confidence — protecting their creations while enabling sustainable growth in an increasingly complex global IP landscape.</p>
          </FadeIn>
        </div>
      </section>

      <section className="pt-16">
        <div className="container-custom">
          <StaggerContainer className="mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-12">
            {statistics.map((s) => (
              <StaggerItem key={s.label}><AnimatedCounter end={s.value} suffix={s.suffix} label={s.label} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="pt-16 bg-surface">
        <div className="container-custom">
          <FadeIn className="text-center"><h2 className="text-display text-3xl font-semibold text-navy">Our Values</h2></FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="rounded-2xl border border-border bg-white p-8">
                  <h3 className="text-display text-xl font-semibold text-navy">{v.title}</h3>
                  <p className="mt-3 text-muted">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="pt-16 pb-16"><div className="container-custom"><FadeIn><CTABanner title="Partner With Us" description="Discover how our IP expertise can protect and accelerate your business." /></FadeIn></div></section>
    </>
  )
}
