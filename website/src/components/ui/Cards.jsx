import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

export function ServiceCard({ service, className, index = 0 }) {
  return (
    <motion.article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 transition-shadow duration-500 hover:shadow-medium md:p-8',
        className,
      )}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-surface">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <span className="text-xs font-semibold tracking-widest text-muted uppercase">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="text-display mt-2 text-xl font-semibold text-navy md:text-2xl">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
      <Link
        to={`/services/${service.slug}`}
        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-gap group-hover:gap-2"
      >
        Learn more <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.article>
  )
}

export function TeamCard({ name, role, expertise, className }) {
  return (
    <motion.article
      className={cn('group text-center', className)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative mx-auto mb-6 aspect-[3/4] max-w-[280px] overflow-hidden rounded-2xl bg-surface">
        <div className="flex h-full items-center justify-center">
          <svg viewBox="0 0 100 120" className="h-2/3 w-2/3 text-navy/10" aria-hidden="true">
            <circle cx="50" cy="35" r="20" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M20 110c0-20 13-35 30-35s30 15 30 35" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/5" />
      </div>
      <h3 className="text-display text-xl font-semibold text-navy">{name}</h3>
      <p className="mt-1 text-sm text-muted">{role}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        {expertise.slice(0, 2).map((e) => (
          <span key={e} className="rounded-full bg-surface px-3 py-1 text-xs text-muted">{e}</span>
        ))}
      </div>
    </motion.article>
  )
}

export function BlogCard({ post, className }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={cn(
        'group block overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-medium',
        className,
      )}
    >
      <div className="aspect-[16/10] bg-surface">
        <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="font-semibold tracking-wider text-navy uppercase">{post.category}</span>
          <span>·</span>
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-display mt-3 text-lg font-semibold text-navy group-hover:text-navy-light">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  )
}

export function TestimonialCard({ quote, author, role, company }) {
  return (
    <blockquote className="rounded-2xl bg-surface p-8 md:p-10">
      <p className="text-display text-xl italic leading-relaxed text-navy md:text-2xl">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-8 border-t border-border pt-6">
        <cite className="not-italic font-semibold text-navy">{author}</cite>
        <p className="text-sm text-muted">{role}, {company}</p>
      </footer>
    </blockquote>
  )
}

export function Timeline({ steps }) {
  return (
    <div className="relative">
      <div className="absolute top-6 left-0 hidden h-[1px] w-full bg-border md:block" aria-hidden="true" />
      <div className="grid gap-8 md:grid-cols-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="relative z-10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-navy bg-white text-display font-bold text-navy">
              {s.step}
            </div>
            <h4 className="font-semibold text-navy">{s.title}</h4>
            <p className="mt-2 text-xs text-muted">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function CTABanner({ title, description, buttonText = 'Schedule Consultation', buttonHref = '/contact' }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-16 md:flex md:items-center md:justify-between md:px-16 md:py-20">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <img src="/Images/footer-art.png" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative max-w-xl">
        <h2 className="text-display text-3xl font-semibold text-white md:text-4xl">{title}</h2>
        <p className="mt-4 text-white/70">{description}</p>
      </div>
      <div className="relative mt-8 md:mt-0">
        <Button href={buttonHref} variant="primary" className="!bg-white !text-navy hover:!bg-surface">
          {buttonText}
        </Button>
      </div>
    </div>
  )
}
