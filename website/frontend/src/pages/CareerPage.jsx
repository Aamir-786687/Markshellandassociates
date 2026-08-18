import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { Button } from '@/components/ui/Button'
import { CTABanner } from '@/components/ui/Cards'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { useCareers } from '@/hooks/useContent'

const benefits = [
  'Competitive compensation and performance bonuses',
  'Professional development and CLE support',
  'Global secondment opportunities',
  'Flexible hybrid work arrangements',
  'Comprehensive health and wellness benefits',
]

export default function CareerPage() {
  const { data: careers = [], isLoading } = useCareers()

  if (isLoading) return <PageLoader />

  return (
    <>
      <SEO title="Careers" description={`Build your IP career at ${FIRM_NAME}. Explore open positions and our culture of excellence.`} path="/career" image="/Images/career-main.png" />

      <PageHero
        eyebrow="Careers"
        title="Build Your IP Career"
        description="Join a firm where precision, innovation, and professional growth converge."
        image="/Images/career-main.png"
        imageAlt="Career opportunities illustration"
      />

      <section className="page-section bg-surface">
        <div className="container-custom grid gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn type="fadeLeft">
            <h2 className="text-display text-2xl font-semibold text-navy md:text-3xl">Our Culture</h2>
            <p className="mt-3 text-muted md:mt-4">We foster an environment of intellectual curiosity, collaborative excellence, and genuine commitment to client success. Every team member contributes to shaping the future of IP law.</p>
            <ul className="mt-6 space-y-2.5 md:mt-8 md:space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-muted"><span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />{b}</li>
              ))}
            </ul>
          </FadeIn>
          <StaggerContainer className="space-y-4">
            {careers.map((job) => (
              <StaggerItem key={job.title}>
                <article className="rounded-2xl border border-border bg-white p-5 transition-shadow hover:shadow-soft md:p-6">
                  <h3 className="text-display text-lg font-semibold text-navy">{job.title}</h3>
                  <p className="mt-2 text-sm text-muted">{job.location} · {job.type} · {job.experience}</p>
                  <Button href="/contact" variant="outline" size="sm" className="mt-4">Apply Now</Button>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="page-section-end"><div className="container-custom"><FadeIn><CTABanner title="Don't See Your Role?" description="Send us your resume — we're always looking for exceptional IP talent." buttonText="Get in Touch" /></FadeIn></div></section>
    </>
  )
}
