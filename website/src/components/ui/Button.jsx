import { motion } from 'framer-motion'
import { BrandName } from '@/components/BrandName'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return p + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-display text-3xl font-semibold text-gold md:text-4xl">
          <BrandName inheritColor ampClassName="text-gold-light" />
        </p>
        <p className="mt-1 text-sm tracking-[0.3em] text-gold/60 uppercase">Intellectual Property Law</p>
      </motion.div>
      <div className="mt-12 h-[1px] w-48 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-gold"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}

export function AnimatedCounter({ end, suffix = '', label, duration = 2.5 }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!started) return
    let start = 0
    const step = end / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [started, end, duration])

  return (
    <motion.div
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-display text-4xl font-bold text-gold md:text-5xl lg:text-6xl">
        {count}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  )
}

const variants = {
  primary: 'bg-navy text-gold hover:bg-navy-light shadow-soft hover:shadow-medium',
  outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-navy',
  ghost: 'text-navy hover:text-gold hover:bg-surface-alt',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
}

export function Button({ variant = 'primary', size = 'md', className, children, href, to, ...props }) {
  const classes = cn(
    'relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 min-h-[48px] overflow-hidden group',
    variants[variant],
    sizes[size],
    className,
  )

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 scale-0 rounded-full bg-white/20 transition-transform duration-500 group-hover:scale-150" aria-hidden="true" />
    </>
  )

  if (to) {
    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
        <Link to={to} className={classes}>{content}</Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.a>
    )
  }

  const { type, disabled, onClick } = props

  return (
    <motion.button
      type={type ?? 'button'}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  )
}

export function AnimatedLink({ href, children, className }) {
  return (
    <a href={href} className={cn('group relative inline-block text-gold', className)}>
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
    </a>
  )
}
