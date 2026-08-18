import { Mail, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

const EMAIL = 'markshellassociates@gmail.com'
const PHONE = '+91 9211978238'

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Mark-Shell/pfbid082c8AAaqb5pVJ8vvRLAmJqcK2VqQzqhgayu8WmussZoWkaeHo6MNCFXzXcyRaRGml/?sk=about', Icon: FacebookIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/markshellandassociates/', Icon: InstagramIcon },
  { label: 'X (Twitter)', href: '#', Icon: XIcon },
  { label: 'LinkedIn', href: 'https://in.linkedin.com/in/markshell-and-associates-b69941421', Icon: LinkedInIcon },
]

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14 8.5h2.5l-.5 3H14v9h-3v-9H9v-3h2V9.5c0-2 1.2-3.5 3.5-3.5H16v3h-1.5c-.5 0-1 .2-1 1v1.5z" />
    </svg>
  )
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.5 4h3.2l-7 8.1L21.5 20h-6.3l-4.9-6.4L4.8 20H1.6l7.5-8.6L2.5 4h6.5l4.4 5.8L17.5 4zm-1.1 14.3h1.8L7.9 5.7H6l10.4 12.6z" />
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.64c0-1.11-.02-2.53-1.54-2.53-1.54 0-1.77 1.2-1.77 2.45V19h-3v-9h2.89v1.23h.04a3.16 3.16 0 012.85-1.57c3.05 0 3.62 2.01 3.62 4.62V19z" />
    </svg>
  )
}

export function TopBar() {
  return (
    <div className="border-b border-white/10 bg-navy">
      <div className="container-custom flex h-8 items-center justify-between gap-4 md:h-10">
        <p className="text-display hidden truncate text-sm font-semibold text-gold sm:block md:text-[15px]">
          Protecting Innovation. Empowering Growth.
        </p>

        <div className="ml-auto flex items-center gap-3 text-xs text-gold/90 sm:gap-4 md:gap-5 md:text-sm">
          <a
            href={`mailto:${EMAIL}`}
            className="flex items-center gap-1.5 transition-colors hover:text-gold-light"
            aria-label={`Email ${EMAIL}`}
          >
            <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span className="hidden lg:inline">{EMAIL}</span>
          </a>

          <a
            href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="flex items-center gap-1.5 transition-colors hover:text-gold-light"
            aria-label={`Call ${PHONE}`}
          >
            <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            <span className="hidden md:inline">{PHONE}</span>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-sm text-gold transition-opacity hover:opacity-80 sm:h-7 sm:w-7',
                )}
              >
                <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
