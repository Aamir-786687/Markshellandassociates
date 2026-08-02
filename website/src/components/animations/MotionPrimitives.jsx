import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

const fadeRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

const variantMap = {
  fadeUp: fadeUpVariants,
  fadeLeft: fadeLeftVariants,
  fadeRight: fadeRightVariants,
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
  type = 'fadeUp',
  once = true,
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variantMap[type]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className, staggerDelay = 0.1 }) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function TextReveal({ text, className, delay = 0 }) {
  const words = text.split(' ')
  return (
    <span className={cn('inline-flex flex-wrap', className)} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="mr-[0.25em] inline-block overflow-hidden"
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

export function ImageReveal({ src, alt, className, priority = false }) {
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      initial={priority ? { clipPath: 'inset(0% 0 0 0)' } : { clipPath: 'inset(100% 0 0 0)' }}
      whileInView={priority ? undefined : { clipPath: 'inset(0% 0 0 0)' }}
      animate={priority ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: priority ? 0.6 : 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        className="h-full w-full object-cover"
        initial={priority ? { scale: 1 } : { scale: 1.15 }}
        whileInView={priority ? undefined : { scale: 1 }}
        animate={priority ? { scale: 1 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: priority ? 0.6 : 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function FloatingShape({ className }) {
  return (
    <motion.div
      className={cn('pointer-events-none absolute rounded-full bg-navy/[0.03]', className)}
      animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    />
  )
}

export function Marquee({ items, images, className, imageSrc }) {
  const list = images ?? items ?? []
  const doubled = [...list, ...list]
  const resolveSrc = imageSrc ?? ((item) => (item.startsWith('/') ? item : item))
  return (
    <div className={cn('overflow-hidden', className)} aria-hidden="true">
      <div className="flex animate-marquee items-center whitespace-nowrap">
        {doubled.map((item, i) =>
          images ? (
            <img
              key={`${item}-${i}`}
              src={resolveSrc(item)}
              alt=""
              className="mx-8 size-[1in] flex-shrink-0 object-contain"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span key={`${item}-${i}`} className="mx-8 text-display text-2xl font-semibold tracking-wider text-navy/20 md:text-3xl">
              {item}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
