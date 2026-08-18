import { BrandName } from '@/components/BrandName'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useServices } from '@/hooks/useContent'
import { Link } from 'react-router-dom'

const LINKEDIN_URL = 'https://in.linkedin.com/in/markshell-and-associates-b69941421'

export function Footer() {
  const { data: services = [] } = useServices()

  return (
    <footer className="bg-navy text-gold/80" role="contentinfo">
      <div className="container-custom pt-10 pb-10 md:pt-14 md:pb-8 lg:pt-16">
        <div className="mb-8 hidden overflow-hidden rounded-2xl opacity-20 sm:mb-10 sm:block">
          <img src="/Images/footer-art.png" alt="" className="h-20 w-full object-cover md:h-24" loading="lazy" />
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-display text-xl font-bold text-gold md:text-2xl">
              <BrandName inheritColor ampClassName="text-gold-light" />
            </p>
            <p className="mt-3 text-sm leading-relaxed md:mt-4">
              Premier intellectual property counsel for brands, innovators, and creators worldwide.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 md:mt-6">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gold/80 transition-colors hover:text-gold-light"
              >
                LinkedIn
              </a>
              <a
                href="mailto:markshellassociates@gmail.com"
                className="text-sm font-medium text-gold/80 transition-colors hover:text-gold-light"
              >
                Email us
              </a>
            </div>
          </div>

          <div>
            <h3 className="section-eyebrow text-gold">Services</h3>
            <ul className="mt-4 space-y-2.5 md:mt-6 md:space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm transition-colors hover:text-gold-light">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-eyebrow text-gold">Firm</h3>
            <ul className="mt-4 space-y-2.5 md:mt-6 md:space-y-3">
              {[
                { label: 'About', href: '/about' },
                { label: 'Our Team', href: '/team' },
                { label: 'Careers', href: '/career' },
                { label: 'Blog', href: '/blog' },
                { label: 'FAQs', href: '/faqs' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-sm transition-colors hover:text-gold-light">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="section-eyebrow text-gold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm md:mt-6">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="tel:+919211978238" className="hover:text-gold-light">+91 9211978238</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="mailto:markshellassociates@gmail.com" className="break-all hover:text-gold-light">markshellassociates@gmail.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>N-45, Office No-1, Abu Fazal Enclave Part-1, Jamia Nagar Okhla New Delhi -110025, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-gold/20 pt-6 text-center text-xs md:mt-12 md:flex-row md:justify-between md:pt-8 md:text-left">
          <p>© {new Date().getFullYear()} <BrandName inheritColor ampClassName="text-gold-light" />. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end md:gap-6">
            <Link to="/privacy-policy" className="hover:text-gold-light">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-gold-light">Terms of Service</Link>
            <Link to="/legal-disclaimer" className="hover:text-gold-light">Legal Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
