import { Router } from 'express'
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

const router = Router()

function toBlog(post) {
  const doc = post.toObject()
  return {
    id: doc.postId,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: doc.date,
    readTime: doc.readTime,
    image: doc.image,
    author: doc.author,
    keywords: doc.keywords,
    keywordsHeading: doc.keywordsHeading,
    body: doc.body,
    sections: doc.sections,
  }
}

function toService(service) {
  const doc = service.toObject()
  return {
    id: doc.serviceId,
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    overview: doc.overview,
    benefits: doc.benefits,
    process: doc.process,
    faqs: doc.faqs,
    image: doc.image,
    relatedSlugs: doc.relatedSlugs,
  }
}

function toTeamMember(member) {
  const doc = member.toObject()
  return {
    id: doc.memberId,
    name: doc.name,
    role: doc.role,
    image: doc.image,
    expertise: doc.expertise,
  }
}

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

router.get('/statistics', async (_req, res, next) => {
  try {
    const items = await Statistic.find().sort({ order: 1 }).lean()
    res.json(items.map(({ value, suffix, label }) => ({ value, suffix, label })))
  } catch (error) {
    next(error)
  }
})

router.get('/team', async (_req, res, next) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 })
    res.json(members.map(toTeamMember))
  } catch (error) {
    next(error)
  }
})

router.get('/blog', async (_req, res, next) => {
  try {
    const posts = await BlogPost.find().sort({ order: 1 })
    res.json(posts.map(toBlog))
  } catch (error) {
    next(error)
  }
})

router.get('/blog/:slug', async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug })
    if (!post) return res.status(404).json({ error: 'Blog post not found' })
    res.json(toBlog(post))
  } catch (error) {
    next(error)
  }
})

router.get('/services', async (_req, res, next) => {
  try {
    const items = await Service.find().sort({ order: 1 })
    res.json(items.map(toService))
  } catch (error) {
    next(error)
  }
})

router.get('/services/:slug', async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug })
    if (!service) return res.status(404).json({ error: 'Service not found' })
    res.json(toService(service))
  } catch (error) {
    next(error)
  }
})

router.get('/legal/:slug', async (req, res, next) => {
  try {
    const doc = await LegalDocument.findOne({ slug: req.params.slug }).lean()
    if (!doc) return res.status(404).json({ error: 'Legal document not found' })
    res.json({
      slug: doc.slug,
      title: doc.title,
      seoDescription: doc.seoDescription,
      lastUpdated: doc.lastUpdated,
      sections: doc.sections,
    })
  } catch (error) {
    next(error)
  }
})

router.get('/testimonials', async (_req, res, next) => {
  try {
    const items = await Testimonial.find().sort({ order: 1 }).lean()
    res.json(items.map(({ testimonialId, quote, author, role, company }) => ({
      id: testimonialId,
      quote,
      author,
      role,
      company,
    })))
  } catch (error) {
    next(error)
  }
})

router.get('/industries', async (_req, res, next) => {
  try {
    const items = await Industry.find().sort({ order: 1 }).lean()
    res.json(items.map(({ title, description }) => ({ title, description })))
  } catch (error) {
    next(error)
  }
})

router.get('/careers', async (_req, res, next) => {
  try {
    const items = await Career.find().sort({ order: 1 }).lean()
    res.json(items.map(({ title, location, type, experience }) => ({ title, location, type, experience })))
  } catch (error) {
    next(error)
  }
})

router.get('/faqs', async (_req, res, next) => {
  try {
    const items = await HomeFaq.find().sort({ order: 1 }).lean()
    res.json(items.map(({ question, answer }) => ({ question, answer })))
  } catch (error) {
    next(error)
  }
})

export default router
