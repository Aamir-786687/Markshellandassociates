import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { FIRM_NAME } from '@/data/brand'
import { getCareerBySlug } from '@/data/content'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/MotionPrimitives'
import { submitCareerApplicationForm } from '@/lib/career'

export default function CareerApplyPage() {
  const { slug } = useParams()
  const job = slug ? getCareerBySlug(slug) : undefined
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  if (!job) return <Navigate to="/career" replace />

  const onSubmit = async (data) => {
    if (data._hp) {
      reset()
      setStatus('success')
      return
    }

    setStatus('idle')
    setErrorMessage('')

    try {
      await submitCareerApplicationForm(data, job)
      reset()
      setStatus('success')
    } catch (error) {
      setStatus('error')
      if (error instanceof Error) {
        if (error.message === 'CAREER_APPLY_NOT_CONFIGURED' || error.code === 'CAREER_APPLY_NOT_CONFIGURED') {
          setErrorMessage('Applications are not configured yet. Please email your resume to markshellassociates@gmail.com.')
        } else if (error.message === 'RESUME_TOO_LARGE') {
          setErrorMessage('Resume must be smaller than 2 MB.')
        } else if (error.message === 'RESUME_INVALID_TYPE') {
          setErrorMessage('Resume must be a PDF or Word document.')
        } else if (error.code === 'SUBMIT_FAILED') {
          setErrorMessage('Something went wrong while sending your application. Please try again or email markshellassociates@gmail.com.')
        } else {
          setErrorMessage(typeof error.code === 'string' ? error.code : 'Unable to submit your application. Please try again.')
        }
      } else {
        setErrorMessage('Unable to submit your application. Please try again.')
      }
    }
  }

  return (
    <>
      <SEO
        title={`Apply — ${job.title}`}
        description={`Apply for the ${job.title} role at ${FIRM_NAME}.`}
        path={`/career/${job.slug}`}
        image="/Images/career-main.png"
      />

      <PageHero
        eyebrow="Career Application"
        title={job.title}
        description={`${job.location} · ${job.type} · ${job.experience}`}
        image="/Images/career-main.png"
        imageAlt="Career application illustration"
      />

      <section className="page-section-end bg-surface">
        <div className="container-custom max-w-3xl">
          <FadeIn type="fadeLeft">
            <Link to="/career" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-gold">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Careers
            </Link>

            {job.description ? (
              <p className="mb-8 text-muted">{job.description}</p>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-white p-8 md:p-10" noValidate>
              <h2 className="text-display text-2xl font-semibold text-navy">Apply for this Role</h2>
              <p className="mt-2 text-sm text-muted">Complete the form below. A confirmation email will be sent to the address you provide.</p>

              {status === 'success' ? (
                <p className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800" role="status">
                  Thank you for applying. A confirmation email has been sent to your inbox, and our team will review your application shortly.
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
                  <label htmlFor="linkedin" className="block text-sm font-medium text-navy">LinkedIn Profile</label>
                  <input
                    id="linkedin"
                    type="url"
                    maxLength={300}
                    placeholder="https://linkedin.com/in/..."
                    {...register('linkedin', { maxLength: { value: 300, message: 'URL is too long' } })}
                    className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/20"
                  />
                  {errors.linkedin ? <p className="mt-1 text-xs text-red-600" role="alert">{errors.linkedin.message}</p> : null}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="resume" className="block text-sm font-medium text-navy">Resume (PDF or Word, max 2 MB)</label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  {...register('resume')}
                  className="mt-2 block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-navy file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gold hover:file:bg-navy-light"
                />
              </div>

              <div className="mt-6">
                <label htmlFor="message" className="block text-sm font-medium text-navy">Cover Letter / Message *</label>
                <textarea
                  id="message"
                  rows={5}
                  maxLength={5000}
                  {...register('message', {
                    required: 'Cover letter or message is required',
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
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
