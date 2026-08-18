import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/MotionPrimitives'
import { services } from '@/data/services'
import { submitContactForm } from '@/lib/contact'
import { isContactFormConfigured } from '@/lib/env'

export default function ContactPage() {
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  const onSubmit = async (data) => {
    if (data._hp) {
      reset()
      setStatus('success')
      return
    }

    setStatus('idle')
    setErrorMessage('')

    if (!isContactFormConfigured) {
      setStatus('error')
      setErrorMessage('The contact form is not configured yet. Please email us directly at markshellassociates@gmail.com.')
      return
    }

    try {
      await submitContactForm(data)
      reset()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      if (error instanceof Error && error.message === 'CONTACT_NOT_CONFIGURED') {
        setErrorMessage('The contact form is not configured yet. Please email us directly at markshellassociates@gmail.com.')
      } else {
        setErrorMessage('Something went wrong while sending your message. Please try again or email markshellassociates@gmail.com.')
      }
    }
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

              {status === 'success' ? (
                <p className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
                  Thank you for your message. We will respond within 24 hours.
                </p>
              ) : null}

              {status === 'error' ? (
                <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                  {errorMessage}
                </p>
              ) : null}

              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="_hp">Leave blank</label>
                <input id="_hp" type="text" tabIndex={-1} autoComplete="off" {...register('_hp')} />
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-navy">Full Name *</label>
                  <input
                    id="name"
                    maxLength={120}
                    {...register('name', { required: 'Name is required', maxLength: { value: 120, message: 'Name is too long' } })}
                    className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    autoComplete="name"
                  />
                  {errors.name ? <p className="mt-1 text-xs text-red-600" role="alert">{errors.name.message}</p> : null}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-navy">Email *</label>
                  <input
                    id="email"
                    type="email"
                    maxLength={254}
                    {...register('email', {
                      required: 'Email is required',
                      maxLength: { value: 254, message: 'Email is too long' },
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
                    })}
                    className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    autoComplete="email"
                  />
                  {errors.email ? <p className="mt-1 text-xs text-red-600" role="alert">{errors.email.message}</p> : null}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-navy">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    maxLength={30}
                    {...register('phone', { maxLength: { value: 30, message: 'Phone number is too long' } })}
                    className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                    autoComplete="tel"
                  />
                  {errors.phone ? <p className="mt-1 text-xs text-red-600" role="alert">{errors.phone.message}</p> : null}
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
                <textarea
                  id="message"
                  rows={5}
                  maxLength={5000}
                  {...register('message', {
                    required: 'Message is required',
                    maxLength: { value: 5000, message: 'Message is too long' },
                  })}
                  className="mt-2 w-full resize-y rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                />
                {errors.message ? <p className="mt-1 text-xs text-red-600" role="alert">{errors.message.message}</p> : null}
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 min-h-[48px] rounded-full bg-navy px-8 py-4 text-sm font-semibold text-gold transition-colors hover:bg-navy-light disabled:opacity-60"
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
