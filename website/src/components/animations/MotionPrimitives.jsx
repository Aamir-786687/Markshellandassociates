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
    <span className={cn('flex flex-wrap gap-x-[0.3em] gap-y-2', className)} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden py-px">
          <motion.span
            className="block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export function ImageReveal({ src, alt, className, priority = false, objectFit = 'cover', imgClassName }) {
  const contain = objectFit === 'contain'

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
        className={cn(
          contain ? 'mx-auto h-auto w-full object-contain' : 'h-full w-full object-cover',
          imgClassName,
        )}
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

export function Marquee({ clients, items, images, className, imageSrc, reverse = false, durationSeconds }) {
  const clientList = clients ?? []
  const list = images ?? items ?? []
  const resolveSrc = imageSrc ?? ((item) => (item.startsWith('/') ? item : item))
  const sourceList = clientList.length > 0 ? clientList : list
  const duration = durationSeconds ?? Math.max(60, sourceList.length * 2.5)
  const animationClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee'

  const renderTrack = (keyPrefix) => (
    <div className="flex shrink-0 items-center gap-6 md:gap-8">
      {clientList.length > 0
        ? clientList.map((client, i) => (
            <div
              key={`${keyPrefix}-${client.file}-${i}`}
              className="flex w-[2.25in] shrink-0 flex-col items-center gap-2"
            >
              <div className="flex size-[2in] items-center justify-center">
                <img
                  src={imageSrc ? imageSrc(client.file) : `/Images/clients/${encodeURIComponent(client.file)}`}
                  alt={client.name}
                  className="size-[1.2in] object-contain p-1"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <p className="line-clamp-2 max-w-[2.25in] text-center text-sm font-bold leading-snug text-navy md:text-base">
                {client.name}
              </p>
            </div>
          ))
        : list.map((item, i) =>
            images ? (
              <div
                key={`${keyPrefix}-${item}-${i}`}
                className="flex size-[2in] shrink-0 items-center justify-center"
              >
                <img
                  src={resolveSrc(item)}
                  alt=""
                  className="size-[1.2in] object-contain p-1"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : (
              <span
                key={`${keyPrefix}-${item}-${i}`}
                className="text-display shrink-0 px-3 text-2xl font-semibold tracking-wider text-navy/20 md:text-3xl"
              >
                {item}
              </span>
            ),
          )}
    </div>
  )

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className={cn('flex w-max items-center gap-6 md:gap-8', animationClass)}
        style={{ animationDuration: `${duration}s` }}
      >
        {renderTrack('a')}
        {renderTrack('b')}
      </div>
    </div>
  )
}
