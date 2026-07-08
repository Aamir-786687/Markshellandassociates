import { SEO } from '@/components/layout/SEO'
import { TeamCard, CTABanner } from '@/components/ui/Cards'
import { FadeIn, ImageReveal, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { teamMembers } from '@/data/content'

export default function TeamPage() {
  return (
    <>
      <SEO title="Our Team" description="Meet the IP specialists at Markshell and Associates — attorneys, patent agents, and strategists." path="/team" image="/Images/team-main.png" />

      <section className="pt-28 pb-16 md:pt-36">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Our Team</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">Expert IP Counsel</h1>
            <p className="mt-6 text-lg text-muted">A multidisciplinary team of attorneys, patent agents, and IP strategists committed to protecting what matters most.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/team-main.png" alt="Team collaboration illustration" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <StaggerContainer className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((m) => (
              <StaggerItem key={m.id}><TeamCard name={m.name} role={m.role} expertise={m.expertise} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding"><div className="container-custom"><FadeIn><CTABanner title="Join Our Team" description="Explore career opportunities at Markshell and Associates." buttonText="View Careers" buttonHref="/career" /></FadeIn></div></section>
    </>
  )
}
