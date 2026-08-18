import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { Accordion } from '@/components/ui/Accordion'
import { CTABanner } from '@/components/ui/Cards'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn } from '@/components/animations/MotionPrimitives'
import { useFaqs } from '@/hooks/useContent'

const extraFaqs = [
  { question: 'Do you offer free initial consultations?', answer: 'Yes. We offer a complimentary 30-minute consultation for new clients to discuss their IP needs and our approach.' },
  { question: 'What industries do you specialize in?', answer: 'We serve clients across technology, pharmaceuticals, consumer brands, media, manufacturing, and financial services.' },
  { question: 'How do you handle confidential information?', answer: 'All client communications are protected by attorney-client privilege. We maintain strict confidentiality protocols and secure document management systems.' },
  { question: 'Can you represent clients in multiple countries?', answer: 'Yes. Through our global network of associate firms and direct filings, we coordinate IP protection across 40+ jurisdictions.' },
  { question: 'What technology tools do you use?', answer: 'We leverage advanced IP management platforms, AI-assisted clearance tools, and secure client portals for real-time portfolio tracking.' },
]

export default function FAQsPage() {
  const { data: homeFaqs = [], isLoading } = useFaqs()

  if (isLoading) return <PageLoader />

  return (
    <>
      <SEO title="FAQs" description={`Frequently asked questions about intellectual property services at ${FIRM_NAME}.`} path="/faqs" image="/Images/faq-main.png" />

      <PageHero
        eyebrow="FAQs"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our IP services, process, and approach."
        image="/Images/faq-main.png"
        imageAlt="FAQ illustration"
      />

      <section className="page-section bg-surface">
        <div className="container-custom max-w-3xl">
          <FadeIn><h2 className="text-display text-xl font-semibold text-navy md:text-2xl">General Questions</h2></FadeIn>
          <FadeIn delay={0.1} className="mt-4 md:mt-6"><Accordion items={homeFaqs} /></FadeIn>
          <FadeIn delay={0.2} className="mt-8 md:mt-12"><h2 className="text-display text-xl font-semibold text-navy md:text-2xl">Working With Us</h2></FadeIn>
          <FadeIn delay={0.3} className="mt-4 md:mt-6"><Accordion items={extraFaqs} /></FadeIn>
        </div>
      </section>

      <section className="page-section-end"><div className="container-custom"><FadeIn><CTABanner title="Still Have Questions?" description="Our team is ready to provide personalized answers." buttonText="Contact Us" /></FadeIn></div></section>
    </>
  )
}
