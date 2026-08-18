import dotenv from 'dotenv'
import { connectDB } from '../config/db.js'
import {
  Statistic,
  TeamMember,
  BlogPost,
  Service,
  LegalDocument,
  Testimonial,
  Industry,
  Career,
  HomeFaq,
} from '../models/index.js'
import {
  statistics,
  teamMembers,
  blogPosts,
  testimonials,
  industries,
  careers,
  homeFaqs,
} from './content.js'
import { services } from './services.js'
import { legalDocuments } from './legal.js'

dotenv.config()

async function seed() {
  await connectDB()

  await Promise.all([
    Statistic.deleteMany({}),
    TeamMember.deleteMany({}),
    BlogPost.deleteMany({}),
    Service.deleteMany({}),
    LegalDocument.deleteMany({}),
    Testimonial.deleteMany({}),
    Industry.deleteMany({}),
    Career.deleteMany({}),
    HomeFaq.deleteMany({}),
  ])

  await Statistic.insertMany(statistics.map((item, order) => ({ ...item, order })))

  await TeamMember.insertMany(
    teamMembers.map((member, order) => ({
      memberId: member.id,
      name: member.name,
      role: member.role,
      image: member.image,
      expertise: member.expertise ?? [],
      order,
    })),
  )

  await BlogPost.insertMany(
    blogPosts.map((post, order) => ({
      postId: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      readTime: post.readTime,
      image: post.image,
      author: post.author,
      keywords: post.keywords ?? [],
      keywordsHeading: post.keywordsHeading,
      body: post.body ?? [],
      sections: post.sections ?? [],
      order,
    })),
  )

  await Service.insertMany(
    services.map((service, order) => ({
      serviceId: service.id,
      slug: service.slug,
      title: service.title,
      shortDescription: service.shortDescription,
      overview: service.overview,
      benefits: service.benefits,
      process: service.process,
      faqs: service.faqs,
      image: service.image,
      relatedSlugs: service.relatedSlugs,
      order,
    })),
  )

  await LegalDocument.insertMany(legalDocuments)

  await Testimonial.insertMany(
    testimonials.map((item, order) => ({
      testimonialId: item.id,
      quote: item.quote,
      author: item.author,
      role: item.role,
      company: item.company,
      order,
    })),
  )

  await Industry.insertMany(industries.map((item, order) => ({ ...item, order })))
  await Career.insertMany(careers.map((item, order) => ({ ...item, order })))
  await HomeFaq.insertMany(homeFaqs.map((item, order) => ({ ...item, order })))

  console.log('Database seeded successfully')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
