import { FIRM_NAME } from '@/data/brand'
import { BrandName } from '@/components/BrandName'
import { SEO } from '@/components/layout/SEO'
import { TeamCard, CTABanner } from '@/components/ui/Cards'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { useTeam } from '@/hooks/useContent'

export default function TeamPage() {
  const { data: teamMembers = [], isLoading } = useTeam()

  if (isLoading) return <PageLoader />

  return (
    <>
      <SEO title="Our Team" description={`Meet the IP specialists at ${FIRM_NAME} — attorneys, patent agents, and strategists.`} path="/team" image="/Images/team-main.png" />

      <section className="pt-36 pb-16 md:pt-44">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="section-eyebrow">Our Team</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">Expert IP Counsel</h1>
            <p className="mt-6 text-lg text-muted">A multidisciplinary team of attorneys, patent agents, and IP strategists committed to protecting what matters most.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/team-main.png" alt="Team collaboration illustration" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="pt-16 bg-surface">
        <div className="container-custom">
          <StaggerContainer className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <StaggerItem key={m.id}><TeamCard name={m.name} role={m.role} expertise={m.expertise} image={m.image} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="pt-16 pb-16"><div className="container-custom"><FadeIn><CTABanner title="Join Our Team" description={<>Explore career opportunities at <BrandName ampClassName="text-gold" />.</>} buttonText="View Careers" buttonHref="/career" /></FadeIn></div></section>
    </>
  )
}