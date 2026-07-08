import type { TeamMember, BlogPost, Testimonial, Statistic } from '@/types'

export const statistics: Statistic[] = [
  { value: 2400, suffix: '+', label: 'Registrations Filed' },
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 18, suffix: '', label: 'Years of Excellence' },
  { value: 40, suffix: '+', label: 'Jurisdictions Served' },
]

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Eleanor Markshel', role: 'Managing Partner', bio: 'Leading IP strategist with 20 years of cross-border trademark and patent experience.', expertise: ['Trademark Strategy', 'Global Portfolio Management', 'M&A Due Diligence'] },
  { id: '2', name: 'David Okonkwo', role: 'Partner — Patents', bio: 'Former patent examiner specializing in biotechnology and medical device prosecution.', expertise: ['Patent Prosecution', 'PCT Filings', 'Freedom to Operate'] },
  { id: '3', name: 'Priya Sharma', role: 'Partner — Trademarks', bio: 'Recognized trademark counsel with expertise in brand enforcement and licensing.', expertise: ['Trademark Registration', 'Enforcement', 'Brand Licensing'] },
  { id: '4', name: 'James Whitfield', role: 'Partner — Litigation', bio: 'Trial attorney with extensive IP litigation experience before federal courts.', expertise: ['IP Litigation', 'Injunctions', 'Appeals'] },
  { id: '5', name: 'Amara Osei', role: 'Counsel — Copyright', bio: 'Digital media and entertainment copyright specialist.', expertise: ['Copyright Registration', 'DMCA', 'Content Licensing'] },
  { id: '6', name: 'Lucas Chen', role: 'Associate — Design & GI', bio: 'Industrial design and geographical indication registration expert.', expertise: ['Design Registration', 'Geographical Indication', 'Hague System'] },
]

export const blogPosts: BlogPost[] = [
  { id: '1', slug: 'trademark-trends-2026', title: '2026 Trademark Filing Trends: What Brands Need to Know', excerpt: 'Key developments shaping brand protection strategies in the evolving IP landscape.', category: 'Trademark', date: '2026-06-15', readTime: '6 min' },
  { id: '2', slug: 'ai-copyright-framework', title: 'AI-Generated Works and Copyright: Emerging Legal Frameworks', excerpt: 'How courts and regulators are addressing machine-created content ownership.', category: 'Copyright', date: '2026-06-02', readTime: '8 min' },
  { id: '3', slug: 'cross-border-enforcement', title: 'Cross-Border IP Enforcement: A Strategic Guide', excerpt: 'Multi-jurisdiction strategies for protecting intellectual property assets globally.', category: 'Enforcement', date: '2026-05-20', readTime: '10 min' },
  { id: '4', slug: 'patent-prosecution-tips', title: 'Five Critical Steps in Patent Prosecution', excerpt: 'Best practices for navigating patent office procedures and maximizing grant rates.', category: 'Patent', date: '2026-05-08', readTime: '7 min' },
]

export const testimonials: Testimonial[] = [
  { id: '1', quote: 'Markshel Land transformed our IP strategy from reactive to proactive. Their precision and responsiveness set a new standard for legal counsel.', author: 'Sarah Chen', role: 'Chief Legal Officer', company: 'Nova Tech Industries' },
  { id: '2', quote: 'Exceptional counsel on trademark enforcement. They protected our brand with sophistication and unwavering commitment to our business objectives.', author: 'Rajesh Mehta', role: 'Founder & CEO', company: 'Artisan Co.' },
  { id: '3', quote: 'Their due diligence team identified critical IP risks in our acquisition that saved us millions. Truly world-class expertise.', author: 'Michael Torres', role: 'VP Corporate Development', company: 'Vertex Holdings' },
]

export const trustClients = ['NOVA TECH', 'ARTISAN CO.', 'MERIDIAN', 'VERTEX', 'LUMINA', 'APEX BIO', 'STRATOS', 'PRISM']

export const industries = [
  { title: 'Technology & Software', description: 'Patent portfolios, open-source compliance, and SaaS IP strategy.' },
  { title: 'Pharmaceuticals & Life Sciences', description: 'Drug patents, regulatory exclusivity, and biotech prosecution.' },
  { title: 'Consumer Brands & Retail', description: 'Trademark protection, counterfeiting enforcement, and licensing.' },
  { title: 'Media & Entertainment', description: 'Copyright registration, content licensing, and digital rights.' },
  { title: 'Manufacturing & Industrial', description: 'Design patents, trade secrets, and cross-border enforcement.' },
  { title: 'Financial Services & FinTech', description: 'Brand protection, software patents, and regulatory IP compliance.' },
]

export const careers = [
  { title: 'Senior Trademark Attorney', location: 'New York', type: 'Full-time', experience: '8+ years' },
  { title: 'Patent Agent — Biotechnology', location: 'San Francisco', type: 'Full-time', experience: '3+ years' },
  { title: 'IP Litigation Associate', location: 'Chicago', type: 'Full-time', experience: '4+ years' },
  { title: 'Legal Technology Specialist', location: 'Remote', type: 'Full-time', experience: '2+ years' },
  { title: 'Paralegal — IP Operations', location: 'London', type: 'Full-time', experience: '1+ years' },
]

export const homeFaqs = [
  { question: 'How long does trademark registration take?', answer: 'Typically 8–14 months depending on jurisdiction and whether office actions arise. We provide timeline estimates during your initial consultation.' },
  { question: 'Do you handle international IP filings?', answer: 'Yes. We coordinate filings through the Madrid Protocol, PCT, and direct national applications across 40+ jurisdictions.' },
  { question: 'What is your fee structure?', answer: 'We offer transparent fixed fees for registrations and flexible arrangements for litigation and enforcement matters.' },
  { question: 'Can you help with IP due diligence for M&A?', answer: 'Absolutely. Our due diligence team conducts comprehensive IP audits identifying risks, validating ownership, and assessing portfolio value.' },
]
