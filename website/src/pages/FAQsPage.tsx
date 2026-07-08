import { SEO } from '@/components/layout/SEO'
import { Accordion } from '@/components/ui/Accordion'
import { CTABanner } from '@/components/ui/Cards'
import { FadeIn, ImageReveal } from '@/components/animations/MotionPrimitives'
import { homeFaqs } from '@/data/content'

const extraFaqs = [
  { question: 'Do you offer free initial consultations?', answer: 'Yes. We offer a complimentary 30-minute consultation for new clients to discuss their IP needs and our approach.' },
  { question: 'What industries do you specialize in?', answer: 'We serve clients across technology, pharmaceuticals, consumer brands, media, manufacturing, and financial services.' },
  { question: 'How do you handle confidential information?', answer: 'All client communications are protected by attorney-client privilege. We maintain strict confidentiality protocols and secure document management systems.' },
  { question: 'Can you represent clients in multiple countries?', answer: 'Yes. Through our global network of associate firms and direct filings, we coordinate IP protection across 40+ jurisdictions.' },
  { question: 'What technology tools do you use?', answer: 'We leverage advanced IP management platforms, AI-assisted clearance tools, and secure client portals for real-time portfolio tracking.' },
]

export default function FAQsPage() {
  return (
    <>
      <SEO title="FAQs" description="Frequently asked questions about intellectual property services at Markshel Land & Associates." path="/faqs" image="/Images/faq-main.png" />

      <section className="pt-28 pb-16 md:pt-36">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="text-xs font-semibold tracking-widest text-muted uppercase">FAQs</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">Frequently Asked Questions</h1>
            <p className="mt-6 text-lg text-muted">Find answers to common questions about our IP services, process, and approach.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/faq-main.png" alt="FAQ illustration" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom max-w-3xl">
          <FadeIn><h2 className="text-display text-2xl font-semibold text-navy">General Questions</h2></FadeIn>
          <FadeIn delay={0.1} className="mt-6"><Accordion items={homeFaqs} /></FadeIn>
          <FadeIn delay={0.2} className="mt-12"><h2 className="text-display text-2xl font-semibold text-navy">Working With Us</h2></FadeIn>
          <FadeIn delay={0.3} className="mt-6"><Accordion items={extraFaqs} /></FadeIn>
        </div>
      </section>

      <section className="section-padding"><div className="container-custom"><FadeIn><CTABanner title="Still Have Questions?" description="Our team is ready to provide personalized answers." buttonText="Contact Us" /></FadeIn></div></section>
    </>
  )
}
