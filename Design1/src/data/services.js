export const services = [
  { slug: 'trademark-registration', title: 'Trademark Registration', desc: 'Secure brand identity with strategic clearance and global filing.', image: '/Images/service-trademark.png' },
  { slug: 'patent-registration', title: 'Patent Registration', desc: 'Protect inventions with expert prosecution and PCT applications.', image: '/Images/service-patent.png' },
  { slug: 'copyright-registration', title: 'Copyright Registration', desc: 'Formal registration for creative, literary, and digital works.', image: '/Images/service-copyright.png' },
  { slug: 'design-registration', title: 'Design Registration', desc: 'Protect product aesthetics through national and international registration.', image: '/Images/service-design.png' },
  { slug: 'trademark-enforcement', title: 'Trademark Enforcement', desc: 'Defend your brand with cease-and-desist and UDRP proceedings.', image: '/Images/service-enforcement.png' },
  { slug: 'trademark-infringement', title: 'Trademark Infringement', desc: 'Detection, analysis, and resolution of trademark conflicts.', image: '/Images/service-infringement.png' },
  { slug: 'property-investigation', title: 'Property Investigation', desc: 'IP ownership chain and asset verification investigations.', image: '/Images/service-investigation.png' },
  { slug: 'property-litigation', title: 'Property Litigation', desc: 'Full-service IP litigation and appellate representation.', image: '/Images/service-litigation.png' },
  { slug: 'due-diligence', title: 'Due Diligence', desc: 'Comprehensive IP audits for M&A and investment rounds.', image: '/Images/service-diligence.png' },
  { slug: 'geographical-indication', title: 'Geographical Indication', desc: 'Registration of geographical indications and appellations of origin.', image: '/Images/service-gi.png' },
]

export const team = [
  { name: 'Eleanor Markshel', role: 'Managing Partner' },
  { name: 'David Okonkwo', role: 'Patent Attorney' },
  { name: 'Priya Sharma', role: 'Trademark Counsel' },
  { name: 'James Whitfield', role: 'Litigation Lead' },
]

export const blogs = [
  { title: '2026 Trademark Filing Trends', date: 'June 15, 2026', cat: 'Trademark' },
  { title: 'AI-Generated Works and Copyright', date: 'June 2, 2026', cat: 'Copyright' },
  { title: 'Cross-Border IP Enforcement Guide', date: 'May 20, 2026', cat: 'Enforcement' },
]

export const faqs = [
  { q: 'How long does trademark registration take?', a: 'Typically 8–14 months depending on jurisdiction and office actions.' },
  { q: 'Do you handle international IP filings?', a: 'Yes — Madrid Protocol, PCT, and direct national applications across 40+ jurisdictions.' },
  { q: 'What is your fee structure?', a: 'Transparent fixed fees for registrations; flexible arrangements for litigation.' },
]

export const stats = [
  { n: '2,400+', l: 'Registrations' },
  { n: '98%', l: 'Retention' },
  { n: '18', l: 'Years' },
  { n: '40+', l: 'Countries' },
]

export function getService(slug) {
  return services.find((s) => s.slug === slug)
}
