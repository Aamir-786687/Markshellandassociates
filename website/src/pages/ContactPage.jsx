import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/MotionPrimitives'
import { services } from '@/data/services'

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (_data) => {
    await new Promise((r) => setTimeout(r, 1000))
    reset()
    alert('Thank you for your message. We will respond within 24 hours.')
  }

  return (
    <>
      <SEO title="Contact Us" description={`Get in touch with ${FIRM_NAME} for a confidential IP consultation.`} path="/contact" image="/Images/contact-main.png" />

      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        description="Schedule a confidential consultation with our intellectual property specialists."
        image="/Images/contact-main.png"
        imageAlt="Contact illustration"
      />

      <section className="page-section-end bg-surface">
        <div className="container-custom max-w-3xl">
          <FadeIn type="fadeLeft">
            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-white p-8 md:p-10" noValidate>
              <h2 className="text-display text-2xl font-semibold text-navy">Send a Message</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy">Full Name *</label>
                  <input id="name" {...register('name', { required: 'Name is required' })} className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20" autoComplete="name" />
                  {errors.name && <p className="mt-1 text-xs text-red-600" role="alert">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy">Email *</label>
                  <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })} className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20" autoComplete="email" />
                  {errors.email && <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-navy">Phone</label>
                  <input id="phone" type="tel" {...register('phone')} className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20" autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-navy">Service Interest</label>
                  <select id="service" {...register('service')} className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20">
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-navy">Message *</label>
                <textarea id="message" rows={5} {...register('message', { required: 'Message is required' })} className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20 resize-y" />
                {errors.message && <p className="mt-1 text-xs text-red-600" role="alert">{errors.message.message}</p>}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-gold transition-colors hover:bg-navy-light disabled:opacity-60 min-h-[48px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
