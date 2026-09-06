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
    image: '/Images/service-trademark.jpeg',
    relatedSlugs: ['trademark-enforcement', 'trademark-infringement', 'design-registration'],
  },
  {
    id: '2', slug: 'patent-registration', title: 'Patent Registration',
    shortDescription: 'Protect inventions with expert prosecution, prior art analysis, and PCT international applications.',
    overview: 'We guide innovators through the complete patent lifecycle — patentability opinions, provisional and non-provisional applications, PCT international filing, and prosecution before patent offices worldwide.',
    benefits: ['Patentability and freedom-to-operate analysis', 'Utility and design patent prosecution', 'PCT and national phase entry', 'Patent portfolio strategy', 'Technology transfer support'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-patent.jpeg',
    relatedSlugs: ['design-registration', 'due-diligence', 'property-litigation'],
  },
  {
    id: '3', slug: 'copyright-registration', title: 'Copyright Registration',
    shortDescription: 'Formal registration and protection for creative, literary, musical, and digital works.',
    overview: 'We assist creators and enterprises in securing copyright protection for original works — including software, literary content, artistic creations, and multimedia — with registration, licensing, and enforcement strategies.',
    benefits: ['Registration across multiple work categories', 'Licensing and assignment agreements', 'DMCA takedown and enforcement', 'Fair use and licensing counsel', 'Digital rights management strategy'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-copyright.jpeg',
    relatedSlugs: ['trademark-registration', 'trademark-infringement', 'due-diligence'],
  },
  {
    id: '4', slug: 'design-registration', title: 'Design Registration',
    shortDescription: 'Protect product aesthetics and industrial designs through national and international registration.',
    overview: 'Our design registration practice protects the ornamental and aesthetic aspects of products — from consumer goods to industrial equipment — through Hague System international registrations and national design patents.',
    benefits: ['Design search and clearance', 'Hague System international filing', 'Design patent prosecution', 'Portfolio alignment with trademark strategy', 'Enforcement against design copying'],
    process: defaultProcess, faqs: defaultFaqs,
    image: '/Images/service-design.jpeg',
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
    image: '/Images/service-gi.jpeg',
    relatedSlugs: ['trademark-registration', 'trademark-enforcement', 'copyright-registration'],
  },
  {
    id: '11', slug: 'fssai-registration', title: 'FSSAI Registration',
    shortDescription: 'Obtain and maintain FSSAI licenses for food businesses — registration, state, and central licensing.',
    overview: 'We assist food manufacturers, distributors, retailers, and cloud kitchens with FSSAI compliance — from basic registration and state licenses to central licensing, renewals, modifications, and label review under the Food Safety and Standards Act.',
    benefits: ['FSSAI registration and license classification', 'State and central license applications', 'Renewal and modification support', 'Food label and packaging compliance review', 'Documentation and regulatory filing assistance'],
    process: [
      { step: 1, title: 'Business Assessment', description: 'We evaluate your food business category, turnover, and operational scope to determine the correct FSSAI license type.' },
      { step: 2, title: 'Documentation', description: 'Required documents, premises details, and business proofs are prepared and verified for filing.' },
      { step: 3, title: 'Application & Filing', description: 'We submit your FSSAI application through the FoSCoS portal and respond to authority queries.' },
      { step: 4, title: 'Compliance Support', description: 'Post-approval guidance on renewals, modifications, and ongoing food safety compliance.' },
    ],
    faqs: [
      ...defaultFaqs,
      { question: 'Which FSSAI license does my business need?', answer: 'Basic registration applies to small businesses below specified turnover thresholds. State and central licenses depend on business scale, product category, and operational footprint. We advise during consultation.' },
      { question: 'How long does FSSAI registration take?', answer: 'Basic registration may be processed within 7–15 working days in many cases. State and central licenses can take longer depending on documentation and authority processing times.' },
    ],
    image: '/Images/service-fssai.jpeg',
    relatedSlugs: ['trademark-registration', 'company-registration', 'due-diligence'],
  },
  {
    id: '12', slug: 'company-registration', title: 'Company Registration',
    shortDescription: 'Incorporate and structure your business — private limited, LLP, OPC, and MCA compliance.',
    overview: 'We guide entrepreneurs and enterprises through company formation and corporate compliance — including private limited companies, LLPs, one person companies, name approval, incorporation filings, and post-incorporation statutory requirements with the Ministry of Corporate Affairs.',
    benefits: ['Entity selection and structuring advice', 'Name reservation and incorporation filings', 'MOA, AOA, and LLP agreement drafting support', 'DIN, DSC, and director compliance', 'Post-incorporation MCA and regulatory guidance'],
    process: [
      { step: 1, title: 'Consultation', description: 'We recommend the right entity structure based on your business goals, ownership, and compliance needs.' },
      { step: 2, title: 'Name & Documentation', description: 'Company name is reserved and incorporation documents are prepared and verified.' },
      { step: 3, title: 'Incorporation Filing', description: 'SPICe+ and related MCA filings are submitted for company or LLP registration.' },
      { step: 4, title: 'Post-Incorporation', description: 'We assist with PAN, TAN, bank onboarding readiness, and initial statutory compliances.' },
    ],
    faqs: [
      ...defaultFaqs,
      { question: 'What is the difference between a private limited company and an LLP?', answer: 'A private limited company offers a familiar corporate structure with shareholding flexibility, while an LLP combines partnership flexibility with limited liability. The best choice depends on funding plans, ownership, and compliance appetite.' },
      { question: 'How long does company registration take in India?', answer: 'With complete documentation, incorporation through MCA can often be completed within 7–15 working days, subject to name approval and registry processing.' },
    ],
    image: '/Images/service-companyreg.jpeg',
    relatedSlugs: ['due-diligence', 'fssai-registration', 'trademark-registration'],
  },
]

export function getServiceBySlug(slug) {
  return services.find(s => s.slug === slug)
}

export function getRelatedServices(slugs) {
  return slugs.map(s => getServiceBySlug(s)).filter(Boolean)
}
