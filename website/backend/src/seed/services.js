const defaultProcess = [
  { step: 1, title: 'Consultation', description: 'We assess your IP assets, objectives, and jurisdictional requirements.' },
  { step: 2, title: 'Strategy', description: 'A tailored protection plan is developed with clear timelines and deliverables.' },
  { step: 3, title: 'Execution', description: 'Our specialists handle filings, documentation, and regulatory compliance.' },
  { step: 4, title: 'Monitoring', description: 'Ongoing portfolio management and enforcement readiness.' },
]

const defaultFaqs = [
  { question: 'How long does the process typically take?', answer: 'Timelines vary by service and jurisdiction, generally ranging from 3 to 18 months. We provide detailed estimates during consultation.' },
  { question: 'Do you handle international filings?', answer: 'Yes. We coordinate filings across 40+ jurisdictions through Madrid Protocol, PCT, and direct national applications.' },
]

export const services = [
  {
    id: '1', slug: 'trademark-registration', title: 'Trademark Registration',
    shortDescription: 'Secure brand identity with strategic clearance, filing, and global portfolio management.',
    overview: 'Our trademark practice delivers end-to-end brand protection — from comprehensive clearance searches and strategic class selection to domestic and international registration through the Madrid Protocol. We counsel clients on brand architecture, licensing, and portfolio optimization.',
    benefits: ['Comprehensive clearance analysis', 'Multi-jurisdiction filing strategy', 'Portfolio monitoring and renewal management', 'Brand licensing and assignment support', 'Opposition and cancellation defense'],
    process: defaultProcess,
    faqs: [...defaultFaqs, { question: 'What makes a strong trademark?', answer: 'Distinctiveness, non-descriptiveness, and proper classification are key. We guide you through selection and registration strategy.' }],
    image: '/Images/service-trademark.png',
    relatedSlugs: ['trademark-enforcement', 'trademark-infringement', 'design-registration'],
  },
  {
    id: '2', slug: 'patent-registration', title: 'Patent Registration',
    shortDescription: 'Protect inventions with expert prosecution, prior art analysis, and PCT international applications.',
    overview: 'We guide innovators through the complete patent lifecycle — patentability opinions, provisional and non-provisional applications, PCT international filing, and prosecution before patent offices worldwide.',
    benefits: ['Patentability and freedom-to-operate analysis', 'Utility and design patent prosecution', 'PCT and national phase entry', 'Patent portfolio strategy', 'Technology transfer support'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-patent.png',
    relatedSlugs: ['design-registration', 'due-diligence', 'property-litigation'],
  },
  {
    id: '3', slug: 'copyright-registration', title: 'Copyright Registration',
    shortDescription: 'Formal registration and protection for creative, literary, musical, and digital works.',
    overview: 'We assist creators and enterprises in securing copyright protection for original works — including software, literary content, artistic creations, and multimedia — with registration, licensing, and enforcement strategies.',
    benefits: ['Registration across multiple work categories', 'Licensing and assignment agreements', 'DMCA takedown and enforcement', 'Fair use and licensing counsel', 'Digital rights management strategy'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-copyright.png',
    relatedSlugs: ['trademark-registration', 'trademark-infringement', 'due-diligence'],
  },
  {
    id: '4', slug: 'design-registration', title: 'Design Registration',
    shortDescription: 'Protect product aesthetics and industrial designs through national and international registration.',
    overview: 'Our design registration practice protects the ornamental and aesthetic aspects of products — from consumer goods to industrial equipment — through Hague System international registrations and national design patents.',
    benefits: ['Design search and clearance', 'Hague System international filing', 'Design patent prosecution', 'Portfolio alignment with trademark strategy', 'Enforcement against design copying'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-design.png',
    relatedSlugs: ['patent-registration', 'trademark-registration', 'trademark-enforcement'],
  },
  {
    id: '5', slug: 'trademark-enforcement', title: 'Trademark Enforcement',
    shortDescription: 'Defend your brand with cease-and-desist actions, UDRP proceedings, and customs recordation.',
    overview: 'When unauthorized use threatens your brand, our enforcement team deploys swift, strategic action — from demand letters and UDRP domain disputes to customs border measures and litigation coordination.',
    benefits: ['Online and marketplace monitoring', 'Cease-and-desist and negotiation', 'UDRP and domain recovery', 'Customs recordation programs', 'Litigation support and coordination'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-enforcement.png',
    relatedSlugs: ['trademark-infringement', 'trademark-registration', 'property-litigation'],
  },
  {
    id: '6', slug: 'trademark-infringement', title: 'Trademark Infringement',
    shortDescription: 'Detection, analysis, and resolution of trademark conflicts and unauthorized brand use.',
    overview: 'We provide comprehensive infringement analysis — likelihood-of-confusion assessments, market surveys, and remedial strategies ranging from negotiated settlements to full litigation.',
    benefits: ['Likelihood-of-confusion analysis', 'Market survey coordination', 'Settlement negotiation', 'Injunctive relief strategies', 'Damages assessment and recovery'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-infringement.png',
    relatedSlugs: ['trademark-enforcement', 'property-litigation', 'trademark-registration'],
  },
  {
    id: '7', slug: 'property-investigation', title: 'Property Investigation',
    shortDescription: 'Due diligence investigations into IP ownership, chain of title, and asset verification.',
    overview: 'Our investigation team conducts thorough IP asset verification — tracing ownership chains, identifying encumbrances, and validating the integrity of intellectual property portfolios for transactions and disputes.',
    benefits: ['Chain-of-title analysis', 'Encumbrance and lien identification', 'Asset verification reports', 'Third-party IP audits', 'Forensic document analysis'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-investigation.png',
    relatedSlugs: ['due-diligence', 'property-litigation', 'patent-registration'],
  },
  {
    id: '8', slug: 'property-litigation', title: 'Property Litigation',
    shortDescription: 'Full-service IP litigation including infringement suits, invalidity challenges, and appeals.',
    overview: 'Our litigation practice handles complex IP disputes before courts and tribunals — patent infringement, trademark conflicts, copyright disputes, trade secret misappropriation, and appellate representation.',
    benefits: ['Trial and appellate experience', 'Technical expert coordination', 'Alternative dispute resolution', 'Injunction and damages strategies', 'Cross-border litigation management'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-litigation.png',
    relatedSlugs: ['trademark-enforcement', 'trademark-infringement', 'due-diligence'],
  },
  {
    id: '9', slug: 'due-diligence', title: 'Due Diligence',
    shortDescription: 'Comprehensive IP audits for M&A, licensing, investment rounds, and joint ventures.',
    overview: 'We deliver rigorous IP due diligence for transactions — identifying risks, validating ownership, assessing portfolio value, and providing actionable recommendations for deal structuring.',
    benefits: ['M&A IP audit reports', 'Risk identification and quantification', 'Portfolio valuation support', 'Deal structure recommendations', 'Post-acquisition integration planning'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-diligence.png',
    relatedSlugs: ['property-investigation', 'patent-registration', 'trademark-registration'],
  },
  {
    id: '10', slug: 'geographical-indication', title: 'Geographical Indication',
    shortDescription: 'Registration and protection of geographical indications and appellations of origin.',
    overview: 'We counsel producers and associations on registering and enforcing geographical indications — protecting regional products, agricultural goods, and artisanal crafts under national and international frameworks.',
    benefits: ['GI registration strategy', 'Appellation of origin protection', 'Collective mark coordination', 'Enforcement against misuse', 'International GI treaty navigation'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-gi.png',
    relatedSlugs: ['trademark-registration', 'trademark-enforcement', 'copyright-registration'],
  },
]

export function getServiceBySlug(slug) {
  return services.find(s => s.slug === slug)
}

export function getRelatedServices(slugs) {
  return slugs.map(s => getServiceBySlug(s)).filter(Boolean)
}
