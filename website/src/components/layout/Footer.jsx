import { BrandName } from '@/components/BrandName'
import { Mail, Phone, Share2 } from 'lucide-react'
import { services } from '@/data/services'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-navy text-gold/80" role="contentinfo">
      <div className="container-custom pt-20 pb-8">
        <div className="mb-12 overflow-hidden rounded-2xl opacity-20">
          <img src="/Images/footer-art.png" alt="" className="h-24 w-full object-cover" loading="lazy" />
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-display text-2xl font-bold text-gold">
              <BrandName inheritColor ampClassName="text-gold-light" />
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Premier intellectual property counsel for brands, innovators, and creators worldwide.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-gold/60 transition-colors hover:text-gold-light" aria-label="LinkedIn"><Share2 className="h-5 w-5" /></a>
              <a href="mailto:contact@markshelland.com" className="text-gold/60 transition-colors hover:text-gold-light" aria-label="Email"><Mail className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="section-eyebrow text-gold">Services</h3>
            <ul className="mt-6 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm transition-colors hover:text-gold-light">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-eyebrow text-gold">Firm</h3>
            <ul className="mt-6 space-y-3">
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

          <div>
            <h3 className="section-eyebrow text-gold">Contact</h3>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (800) 555-1234</li>
              <li><a href="mailto:contact@markshelland.com" className="hover:text-gold-light">contact@markshelland.com</a></li>
              <li>350 Fifth Avenue, Suite 4200<br />New York, NY 10118</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/20 pt-8 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} <BrandName inheritColor ampClassName="text-gold-light" />. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-light">Privacy Policy</a>
            <a href="#" className="hover:text-gold-light">Terms of Service</a>
            <a href="#" className="hover:text-gold-light">Legal Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
