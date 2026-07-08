export interface Service {
  id: string
  slug: string
  title: string
  shortDescription: string
  overview: string
  benefits: string[]
  process: ProcessStep[]
  faqs: FAQItem[]
  image: string
  relatedSlugs: string[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  expertise: string[]
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
}

export interface Statistic {
  value: number
  suffix: string
  label: string
}

export interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description: string }[]
}
