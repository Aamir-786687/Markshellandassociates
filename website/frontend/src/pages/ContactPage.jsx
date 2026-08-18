import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn, ImageReveal } from '@/components/animations/MotionPrimitives'
import { useServices } from '@/hooks/useContent'

const offices = [
  { city: 'New York HQ', address: '350 Fifth Avenue, Suite 4200', detail: 'New York, NY 10118', phone: '+1 (800) 555-1234' },
  { city: 'San Francisco', address: '555 Market Street, Suite 1200', detail: 'San Francisco, CA 94105', phone: '+1 (415) 555-0100' },
  { city: 'London', address: '30 St Mary Axe', detail: 'London EC3A 8BF, UK', phone: '+44 20 7946 0958' },
  { city: 'Singapore', address: '1 Raffles Place, Tower 2', detail: 'Singapore 048616', phone: '+65 6123 4567' },
]

export default function ContactPage() {
  const { data: services = [], isLoading } = useServices()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (_data) => {
    await new Promise((r) => setTimeout(r, 1000))
    reset()
    alert('Thank you for your message. We will respond within 24 hours.')
  }

  if (isLoading) return <PageLoader />

  return (
    <>
      <SEO title="Contact Us" description={`Get in touch with ${FIRM_NAME} for a confidential IP consultation.`} path="/contact" image="/Images/contact-main.png" />

      <section className="pt-36 pb-16 md:pt-44">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="section-eyebrow">Contact</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">Get in Touch</h1>
            <p className="mt-6 text-lg text-muted">Schedule a confidential consultation with our intellectual property specialists.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src="/Images/contact-main.png" alt="Contact illustration" className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="pt-16 pb-16 bg-surface">
        <div className="container-custom grid gap-16 lg:grid-cols-5">
          <FadeIn type="fadeLeft" className="lg:col-span-3">
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

          <FadeIn type="fadeRight" className="lg:col-span-2">
            <h2 className="text-display text-2xl font-semibold text-navy">Office Locations</h2>
            <div className="mt-8 space-y-6">
              {offices.map((office) => (
                <div key={office.city} className="rounded-xl border border-border bg-white p-6">
                  <h3 className="font-semibold text-navy">{office.city}</h3>
                  <p className="mt-2 flex items-start gap-2 text-sm text-muted"><MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />{office.address}<br />{office.detail}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted"><Phone className="h-4 w-4" />{office.phone}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted">
              <Mail className="h-4 w-4" />
              <a href="mailto:contact@markshelland.com" className="hover:text-navy">contact@markshelland.com</a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
