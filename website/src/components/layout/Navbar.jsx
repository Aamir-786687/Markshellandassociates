import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandName, brandAriaLabel } from '@/components/BrandName'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services', hasMega: true },
  { label: 'Our Team', href: '/team' },
  { label: 'Blog', href: '/blog' },
  { label: 'Career', href: '/career' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  return (
    <div
      className={cn(
        'w-full transition-all duration-500',
        scrolled ? 'bg-white/95 py-3 shadow-soft backdrop-blur-md' : 'bg-transparent py-5',
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label={`${brandAriaLabel()} home`}>
          <img src="/logo.png" alt="" className="h-14 w-14 shrink-0 rounded-full object-cover shadow-md md:h-16 md:w-16" width={64} height={64} />
          <span className="text-display hidden text-lg leading-tight font-bold text-navy sm:block md:text-xl">
            <BrandName inheritColor ampClassName="text-gold" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navLinks.map((link) =>
            link.hasMega ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  to={link.href}
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium transition-colors',
                    location.pathname.startsWith('/services') ? 'text-navy' : 'text-muted hover:text-gold',
                  )}
                >
                  {link.label}
                  <ChevronDown className={cn('h-4 w-4 transition-transform', megaOpen && 'rotate-180')} />
                </Link>
                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="absolute top-full left-1/2 mt-4 w-[640px] -translate-x-1/2 rounded-2xl border border-border bg-white p-6 shadow-strong"
                      role="menu"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {services.slice(0, 8).map((s) => (
                          <Link
                            key={s.slug}
                            to={`/services/${s.slug}`}
                            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-surface"
                            role="menuitem"
                          >
                            <img src={s.image} alt="" className="h-10 w-10 rounded-lg object-cover" loading="lazy" />
                            <div>
                              <p className="text-sm font-semibold text-navy">{s.title}</p>
                              <p className="text-xs text-muted line-clamp-1">{s.shortDescription}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link to="/services" className="mt-4 block text-center text-sm font-semibold text-gold hover:text-gold-dark hover:underline">
                        View All Services →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors',
                  location.pathname === link.href ? 'text-navy' : 'text-muted hover:text-gold',
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-[1px] w-full bg-gold" />
                )}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" size="sm">Free Consultation</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-white lg:hidden"
          >
            <nav className="container-custom flex flex-col gap-1 py-6" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-lg px-4 py-3 text-base font-medium text-navy hover:bg-surface"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/contact" className="mt-4 w-full">Free Consultation</Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
