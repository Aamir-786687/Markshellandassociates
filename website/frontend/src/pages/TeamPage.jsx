import { FIRM_NAME } from '@/data/brand'
import { BrandName } from '@/components/BrandName'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { TeamCard, CTABanner } from '@/components/ui/Cards'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionPrimitives'
import { useTeam } from '@/hooks/useContent'

export default function TeamPage() {
  const { data: teamMembers = [], isLoading } = useTeam()

  if (isLoading) return <PageLoader />

  return (
    <>
      <SEO title="Our Team" description={`Meet the IP specialists at ${FIRM_NAME} — attorneys, patent agents, and strategists.`} path="/team" image="/Images/team-main.png" />

      <PageHero
        eyebrow="Our Team"
        title="Expert IP Counsel"
        description="A multidisciplinary team of attorneys, patent agents, and IP strategists committed to protecting what matters most."
        image="/Images/team-main.png"
        imageAlt="Team collaboration illustration"
      />

      <section className="page-section bg-surface">
        <div className="container-custom">
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {teamMembers.map((m) => (
              <StaggerItem key={m.id}><TeamCard name={m.name} role={m.role} expertise={m.expertise} image={m.image} /></StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="page-section-end"><div className="container-custom"><FadeIn><CTABanner title="Join Our Team" description={<>Explore career opportunities at <BrandName ampClassName="text-gold" />.</>} buttonText="View Careers" buttonHref="/career" /></FadeIn></div></section>
    </>
  )
}
