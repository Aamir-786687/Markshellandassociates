import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema(
  {
    heading: String,
    paragraphs: [String],
    listItems: [String],
  },
  { _id: false },
)

const blogSectionSchema = new mongoose.Schema(
  {
    heading: String,
    paragraphs: [String],
  },
  { _id: false },
)

const processStepSchema = new mongoose.Schema(
  {
    step: Number,
    title: String,
    description: String,
  },
  { _id: false },
)

const faqSchema = new mongoose.Schema(
  {
    question: String,
    answer: String,
  },
  { _id: false },
)

export const Statistic = mongoose.model('Statistic', {
  value: Number,
  suffix: String,
  label: String,
  order: { type: Number, default: 0 },
})

export const TeamMember = mongoose.model('TeamMember', {
  memberId: { type: String, unique: true },
  name: String,
  role: String,
  image: String,
  expertise: [String],
  order: { type: Number, default: 0 },
})

export const BlogPost = mongoose.model('BlogPost', {
  postId: { type: String, unique: true },
  slug: { type: String, unique: true },
  title: String,
  excerpt: String,
  category: String,
  date: String,
  readTime: String,
  image: String,
  author: String,
  keywords: [String],
  keywordsHeading: String,
  body: [String],
  sections: [blogSectionSchema],
  order: { type: Number, default: 0 },
})

export const Service = mongoose.model('Service', {
  serviceId: { type: String, unique: true },
  slug: { type: String, unique: true },
  title: String,
  shortDescription: String,
  overview: String,
  benefits: [String],
  process: [processStepSchema],
  faqs: [faqSchema],
  image: String,
  relatedSlugs: [String],
  order: { type: Number, default: 0 },
})

export const LegalDocument = mongoose.model('LegalDocument', {
  slug: { type: String, unique: true },
  title: String,
  seoDescription: String,
  lastUpdated: String,
  sections: [sectionSchema],
})

export const Testimonial = mongoose.model('Testimonial', {
  testimonialId: { type: String, unique: true },
  quote: String,
  author: String,
  role: String,
  company: String,
  order: { type: Number, default: 0 },
})

export const Industry = mongoose.model('Industry', {
  title: String,
  description: String,
  order: { type: Number, default: 0 },
})

export const Career = mongoose.model('Career', {
  title: String,
  location: String,
  type: String,
  experience: String,
  order: { type: Number, default: 0 },
})

export const HomeFaq = mongoose.model('HomeFaq', {
  question: String,
  answer: String,
  order: { type: Number, default: 0 },
})

export const TrustClientLogo = mongoose.model('TrustClientLogo', {
  filename: { type: String, unique: true },
  src: String,
  order: { type: Number, default: 0 },
})

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    service: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const Message = mongoose.model('Message', messageSchema, 'message')
