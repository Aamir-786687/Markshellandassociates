import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
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
        <p className="text-display text-3xl font-semibold text-white md:text-4xl">Markshell and Associates</p>
        <p className="mt-1 text-sm tracking-[0.3em] text-white/50 uppercase">Intellectual Property Law</p>
      </motion.div>
      <div className="mt-12 h-[1px] w-48 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-white"
          style={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}

interface AnimatedCounterProps {
  end: number
  suffix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({ end, suffix = '', label, duration = 2.5 }: AnimatedCounterProps) {
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
      <p className="text-display text-4xl font-bold text-navy md:text-5xl lg:text-6xl">
        {count}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  )
}

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  to?: string
  children: React.ReactNode
}

const variants = {
  primary: 'bg-navy text-white hover:bg-navy-light shadow-soft hover:shadow-medium',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  ghost: 'text-navy hover:bg-surface-alt',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
}

export function Button({ variant = 'primary', size = 'md', className, children, href, to, ...props }: MagneticButtonProps) {
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

  const { type, disabled, onClick, ...rest } = props
  void rest

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

interface AnimatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function AnimatedLink({ href, children, className }: AnimatedLinkProps) {
  return (
    <a href={href} className={cn('group relative inline-block text-navy', className)}>
      {children}
      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-navy transition-all duration-300 group-hover:w-full" />
    </a>
  )
}
