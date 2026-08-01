import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { SEO } from '@/components/layout/SEO'
import { Button } from '@/components/ui/Button'
import { Accordion } from '@/components/ui/Accordion'
import { ServiceCard, TeamCard, BlogCard, TestimonialCard, Timeline, CTABanner } from '@/components/ui/Cards'
import { FadeIn, StaggerContainer, StaggerItem, ImageReveal, TextReveal, Marquee, FloatingShape } from '@/components/animations/MotionPrimitives'
import { AnimatedCounter } from '@/components/ui/Button'
import { services } from '@/data/services'
import { statistics, teamMembers, blogPosts, testimonials, industries, homeFaqs } from '@/data/content'
import { trustClientLogos, getClientLogoSrc } from '@/data/trustClientLogos'

const processSteps = [
  { step: 1, title: 'Discovery', description: 'Understand your IP assets and objectives' },
  { step: 2, title: 'Analysis', description: 'Clearance search and risk assessment' },
  { step: 3, title: 'Strategy', description: 'Tailored filing and protection plan' },
  { step: 4, title: 'Execution', description: 'Registration and documentation' },
  { step: 5, title: 'Enforcement', description: 'Ongoing monitoring and defense' },
]

export default function HomePage() {
  return (
    <>
      <SEO
        title="Premier Intellectual Property Law Firm"
        description="Markshell and Associates provides world-class IP counsel — trademarks, patents, copyright, enforcement, and litigation for innovators worldwide."
        path="/"
      />

      {/* Hero */}
      <section className="relative min-h-screen overflow-hidden pt-36 pb-16 md:pt-40 md:pb-24" aria-labelledby="hero-heading">
        <FloatingShape className="top-32 -right-20 h-96 w-96" />
        <FloatingShape className="bottom-20 -left-32 h-64 w-64" />

        <div className="container-custom grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <FadeIn>
              <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">Intellectual Property Law</p>
            </FadeIn>
            <h1 id="hero-heading" className="text-display mt-6 text-5xl leading-[1.08] font-semibold text-navy md:text-6xl lg:text-7xl">
              <TextReveal text="Protecting Innovation With Precision" />
            </h1>
            <FadeIn delay={0.3}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
                We counsel visionary brands, inventors, and creators on trademarks, patents, copyright, and strategic IP enforcement — with clarity, discretion, and uncompromising excellence.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contact">Schedule Consultation</Button>
                <Button href="/services" variant="outline">Explore Services</Button>
              </div>
            </FadeIn>
          </div>

          <FadeIn type="fadeRight" delay={0.2}>
            <div className="relative">
              <motion.div
                className="absolute -inset-4 rounded-3xl bg-navy/[0.03]"
                animate={{ rotate: [0, 2, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                aria-hidden="true"
              />
              <ImageReveal src="/Images/hero-main.png" alt="Abstract illustration representing intellectual property protection and innovation" className="relative rounded-3xl shadow-strong" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-border py-10" aria-label="Trusted by industry leaders">
        <p className="container-custom mb-6 text-center text-xs font-semibold tracking-widest text-muted uppercase">Trusted by industry leaders</p>
        <Marquee images={trustClientLogos} imageSrc={getClientLogoSrc} />
      </section>

      {/* Services */}
      <section className="section-padding bg-surface" aria-labelledby="practice-heading">
        <div className="container-custom">
          <FadeIn className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Our Services</p>
            <h2 id="practice-heading" className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">Comprehensive IP Protection</h2>
            <p className="mt-4 text-lg text-muted">From registration to enforcement, we safeguard every dimension of your intellectual property portfolio.</p>
          </FadeIn>
          <FadeIn delay={0.15} className="mt-16">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={32}
              slidesPerView={1}
              slidesPerGroup={1}
              loop
              speed={600}
              breakpoints={{
                640: { slidesPerView: 2, slidesPerGroup: 1 },
                1024: { slidesPerView: 3, slidesPerGroup: 1 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              className="services-carousel !pb-12"
              aria-label="Intellectual property services carousel"
            >
              {services.map((service, i) => (
                <SwiperSlide key={service.slug} className="!h-auto">
                  <ServiceCard service={service} index={i} className="h-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          </FadeIn>
          <FadeIn className="mt-12 text-center">
            <Button href="/services" variant="outline">View All 10 Services</Button>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" aria-labelledby="why-heading">
        <div className="container-custom grid items-center gap-16 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Why Choose Us</p>
            <h2 id="why-heading" className="text-display mt-4 text-4xl font-semibold text-navy">A Firm Built for the IP Economy</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Our attorneys combine deep technical fluency with refined legal strategy — delivering outcomes that protect what you&apos;ve built and accelerate what comes next.
            </p>
            <ul className="mt-8 space-y-4">
              {['End-to-end IP lifecycle management', 'Cross-border registration expertise', 'Litigation-ready enforcement teams'].map((item, i) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="text-display text-lg font-bold text-navy">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-2 gap-8">
            {statistics.map((stat) => (
              <StaggerItem key={stat.label}>
                <AnimatedCounter end={stat.value} suffix={stat.suffix} label={stat.label} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-surface" aria-labelledby="process-heading">
        <div className="container-custom">
          <FadeIn className="text-center">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Our Process</p>
            <h2 id="process-heading" className="text-display mt-4 text-4xl font-semibold text-navy">Five Steps to Protection</h2>
          </FadeIn>
          <div className="mt-16">
            <Timeline steps={processSteps} />
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="section-padding" aria-labelledby="industry-heading">
        <div className="container-custom">
          <FadeIn className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Industry Expertise</p>
            <h2 id="industry-heading" className="text-display mt-4 text-4xl font-semibold text-navy">Deep Sector Knowledge</h2>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <StaggerItem key={ind.title}>
                <div className="rounded-2xl border border-border p-6 transition-shadow hover:shadow-soft md:p-8">
                  <h3 className="text-display text-xl font-semibold text-navy">{ind.title}</h3>
                  <p className="mt-3 text-sm text-muted">{ind.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">Client Testimonials</p>
            <h2 id="testimonials-heading" className="text-display mt-4 text-4xl font-semibold text-navy">What Our Clients Say</h2>
          </FadeIn>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="mt-12 !pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <TestimonialCard {...t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Team Preview */}
      <section className="section-padding" aria-labelledby="team-heading">
        <div className="container-custom">
          <FadeIn className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Our Team</p>
              <h2 id="team-heading" className="text-display mt-4 text-4xl font-semibold text-navy">Meet Our IP Specialists</h2>
            </div>
            <Link to="/team" className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:gap-2 transition-all">
              View Full Team <ArrowRight className="h-4 w-4" />
            </Link>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.slice(0, 4).map((member) => (
              <StaggerItem key={member.id}>
                <TeamCard name={member.name} role={member.role} expertise={member.expertise} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-surface" aria-labelledby="blog-heading">
        <div className="container-custom">
          <FadeIn className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted uppercase">Featured Insights</p>
              <h2 id="blog-heading" className="text-display mt-4 text-4xl font-semibold text-navy">Latest from Our Blog</h2>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-navy">Read All <ArrowRight className="h-4 w-4" /></Link>
          </FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding" aria-labelledby="faq-heading">
        <div className="container-custom max-w-3xl">
          <FadeIn className="text-center">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">FAQs</p>
            <h2 id="faq-heading" className="text-display mt-4 text-4xl font-semibold text-navy">Common Questions</h2>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10">
            <Accordion items={homeFaqs} />
          </FadeIn>
          <div className="mt-8 text-center">
            <Button href="/faqs" variant="outline">View All FAQs</Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <FadeIn>
            <CTABanner
              title="Ready to Protect Your IP?"
              description="Schedule a confidential consultation with our intellectual property specialists."
            />
          </FadeIn>
        </div>
      </section>
    </>
  )
}
