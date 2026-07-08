import { SEO } from '@/components/layout/SEO'
import { AnimatedCounter } from '@/components/ui/Button'
import { CTABanner } from '@/components/ui/Cards'
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { statistics } from '@/data/content'

const values = [
  { title: 'Precision', description: 'Every filing, every strategy, every counsel delivered with meticulous attention to detail.' },
  { title: 'Integrity', description: 'Transparent communication and ethical practice at the foundation of every client relationship.' },
  { title: 'Innovation', description: 'Forward-thinking IP strategies that anticipate market evolution and technological change.' },
  { title: 'Partnership', description: 'We embed within your business — understanding your goals as deeply as your legal needs.' },
]

export default function AboutPage() {
  return (
    <>
      <SEO title="About Us" description="Learn about Markshell and Associates — eighteen years of premier intellectual property counsel for innovators worldwide." path="/about" image="/Images/about-main.png" />

      <section className="pt-28 pb-16 md:pt-36">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">About Us</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl lg:text-6xl">Eighteen Years of IP Excellence</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">Founded on the belief that intellectual property is the foundation of modern enterprise, Markshell and Associates has grown into trusted counsel for innovators across six continents.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/about-main.png" alt="Abstract illustration of firm history and innovation timeline" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-display text-3xl font-semibold text-navy">Our Mission</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">To deliver precise, strategic intellectual property counsel that empowers clients to innovate with confidence — protecting their creations while enabling sustainable growth in an increasingly complex global IP landscape.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {statistics.map((s) => (
              <StaggerItem key={s.label}><AnimatedCounter end={s.value} suffix={s.suffix} label={s.label} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-surface">
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

      <section className="section-padding"><div className="container-custom"><FadeIn><CTABanner title="Partner With Us" description="Discover how our IP expertise can protect and accelerate your business." /></FadeIn></div></section>
    </>
  )
}
