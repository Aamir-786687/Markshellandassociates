/**
 * Legal page copy — edit sections and paragraphs below.
 * Each section: { heading?: string, paragraphs: string[], listItems?: string[] }
 */
export const legalDocuments = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    seoDescription: 'Privacy policy for Markshell & Associates — how we collect, use, and protect your information.',
    lastUpdated: 'August 02, 2026',
    sections: [
      {
        heading: 'Information We Collect',
        paragraphs: [
          'We may collect the following when you use our website or contact us:',
        ],
        listItems: [
          'Name',
          'Email address',
          'Phone number',
          'Company details',
          'Information submitted through contact forms',
          'Website usage data (cookies and analytics)',
        ],
      },
      {
        heading: 'How we use your information',
        paragraphs: [],
        listItems: [
          'Respond to legal inquiries',
          'Provide legal consultations',
          'Improve our website',
          'Send important updates',
          'Comply with legal obligations',
        ],
      },
      {
        heading: 'Data Protection',
        paragraphs: ['We implement appropriate security measures to protect your information against unauthorized access, disclosure, or misuse.'],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'Our website uses cookies to improve user experience and analyze website traffic. You may disable cookies through your browser settings.'],
      },
      {
        heading: 'Third-Party Services',
        paragraphs: [
          'We may use trusted third-party providers such as Google Analytics or payment gateways. These providers have their own privacy policies.',
        ],
      },
      {
        heading: 'Your Rights',
        paragraphs: [
          'You may request access, correction, or deletion of your personal information by contacting us.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We may update this Privacy Policy from time to time. The "Last updated" date at the top of this page will reflect the most recent revision. Continued use of the site after changes constitutes acceptance of the updated policy.',
        ],
      },
      {
        heading: 'Contact Us',
        paragraphs: [
          'If you have any questions about this Privacy Policy, please contact us at markshellassociates@gmail.com.',
        ],
      },
    ],
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    seoDescription: 'Terms of service governing use of the Markshell & Associates website and services.',
    lastUpdated: 'August 2, 2026',
    sections: [
      {
        paragraphs: ['By using this website, you agree to these Terms.'],
      },
      {
        heading: 'Use of Website',
        paragraphs: [
          'Information provided is for general informational purposes only.',
          'You agree not to misuse the website.',
        ],
      },
      {
        heading: 'Intellectual Property',
        paragraphs: [
          'All website content, logos, graphics, and text belong to Markshell & Associates unless otherwise stated.',
        ],
      },
      {
        heading: 'No Attorney-Client Relationship',
        paragraphs: [
          'Using this website or contacting us does not establish an attorney-client relationship until formally agreed in writing.',
        ],
      },
      {
        heading: 'Limitation of Liability',
        paragraphs: [
          'Markshell & Associates is not responsible for any loss arising from reliance on website information.',
        ],
      },
      {
        heading: 'Governing Law',
        paragraphs: ['These terms are governed by the laws of India.'],
      },
    ],
  },
  {
    slug: 'legal-disclaimer',
    title: 'Legal Disclaimer',
    seoDescription: 'Legal disclaimer for Markshell & Associates website and informational materials.',
    lastUpdated: 'August 2, 2026',
    sections: [
      {
        heading: 'General information only',
        paragraphs: [
          'The materials on this website are provided for general informational purposes regarding intellectual property and related legal topics. They do not constitute legal advice and should not be relied upon as a substitute for consultation with a qualified professional.',
          'Laws and regulations change frequently. Information that was accurate when published may become outdated. We make no representation that content on this site is current, complete, or applicable to your specific situation.',
        ],
      },
      {
        heading: 'No guarantee of outcomes',
        paragraphs: [
          'Past results, case studies, or descriptions of services do not guarantee similar outcomes in future matters. Each IP filing, dispute, or transaction depends on unique facts, jurisdictions, and procedural requirements.',
        ],
      },
      {
        heading: 'Jurisdiction and professional rules',
        paragraphs: [
          'Markshell & Associates provides services in accordance with applicable bar admission and professional conduct rules. Website content may not reflect the laws of every jurisdiction. Users outside India should seek local counsel where required.',
        ],
      },
      {
        heading: 'Trademarks and third-party names',
        paragraphs: [
          'References to company names, brands, or products on this site are for identification purposes only and do not imply endorsement, sponsorship, or affiliation unless explicitly stated. All third-party trademarks remain the property of their respective owners.',
        ],
      },
      {
        heading: 'Contact for advice',
        paragraphs: [
          'For advice tailored to your circumstances—including trademarks, patents, designs, copyright, or enforcement—please contact us directly. Do not act or refrain from acting based solely on website content without obtaining professional guidance.',
        ],
      },
    ],
  },
]

export function getLegalDocumentBySlug(slug) {
  return legalDocuments.find((doc) => doc.slug === slug)
}
