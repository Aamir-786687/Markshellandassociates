import { useState, useEffect, useRef } from 'react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [navStuck, setNavStuck] = useState(false)
  const navSentinelRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const sentinel = navSentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setNavStuck(!entry.isIntersecting),
      { threshold: 0 },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const linkClass = (isActive) =>
    cn(
      'relative text-base font-medium transition-colors',
      isActive ? 'text-gold' : 'text-navy/85 hover:text-gold',
    )

  return (
    <>
      {/* Brand */}
      <div className="bg-white py-3 md:py-4">
        <div className="container-custom flex items-center justify-between gap-3 lg:justify-center lg:gap-4">
          <Link
            to="/"
            className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3 lg:flex-initial lg:gap-4"
            aria-label={`${brandAriaLabel()} home`}
          >
            <img
              src="/logo.png"
              alt=""
              className="h-14 w-14 shrink-0 rounded-full object-cover shadow-md sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24"
              width={96}
              height={96}
            />
            <div className="flex min-w-0 flex-col items-start">
              <span className="text-display text-lg leading-tight font-bold text-navy sm:text-xl md:text-3xl lg:text-4xl">
                <BrandName inheritColor ampClassName="text-gold" />
              </span>
              <p className="section-eyebrow mt-0.5 tracking-[0.15em] sm:mt-1 sm:tracking-[0.2em]">Protecting Innovation. Empowering growth</p>
            </div>
          </Link>

          <button
            type="button"
            className={cn(
              'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-navy lg:hidden',
              navStuck && 'hidden',
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div ref={navSentinelRef} className="pointer-events-none h-px" aria-hidden="true" />

      {/* Navigation — sticks to top on scroll */}
      <div
        className={cn(
          'sticky top-0 z-50 bg-white transition-shadow duration-300',
          navStuck && 'shadow-soft',
        )}
      >
        <div
          className={cn(
            'container-custom relative flex items-center justify-between py-2.5 md:py-3 lg:justify-center',
            !navStuck && 'max-lg:hidden',
          )}
        >
          <nav className="hidden items-center gap-5 xl:gap-8 lg:flex" aria-label="Primary navigation">
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
                      'flex items-center gap-1 text-base font-medium transition-colors',
                      location.pathname.startsWith('/services') ? 'text-gold' : 'text-navy/85 hover:text-gold',
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
                        className="absolute top-full left-1/2 z-50 mt-4 w-[640px] -translate-x-1/2 rounded-2xl border border-border bg-white p-6 shadow-strong"
                        role="menu"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((s) => (
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
                <Link key={link.href} to={link.href} className={linkClass(location.pathname === link.href)}>
                  {link.label}
                  {location.pathname === link.href && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-1 left-0 h-[1px] w-full bg-gold" />
                  )}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden lg:absolute lg:right-0 lg:block">
            <Button to="/contact" size="sm" variant="primary">
              Free Consultation
            </Button>
          </div>

          <button
            type="button"
            className={cn(
              'ml-auto flex h-10 w-10 items-center justify-center rounded-lg text-navy lg:hidden',
              !navStuck && 'hidden',
            )}
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
              className="overflow-hidden lg:hidden"
            >
              <nav className="container-custom flex flex-col gap-1 py-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'rounded-lg px-4 py-3 text-lg font-medium transition-colors',
                      location.pathname === link.href ? 'bg-surface text-gold' : 'text-navy/90 hover:bg-surface hover:text-gold',
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button to="/contact" variant="primary" className="mt-3 w-full">
                  Free Consultation
                </Button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
