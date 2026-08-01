import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { SEO, Breadcrumbs } from '@/components/layout/SEO'
import { getBlogBySlug } from '@/data/content'
import { FadeIn, ImageReveal } from '@/components/animations/MotionPrimitives'
import { Button } from '@/components/ui/Button'

export default function BlogDetailPage() {
  const { slug } = useParams()
  const post = slug ? getBlogBySlug(slug) : undefined

  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.image}
        type="article"
      />

      <article className="pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="container-custom max-w-4xl">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: post.title },
          ]} />

          <FadeIn>
            <Link to="/blog" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Blog
            </Link>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="section-eyebrow normal-case tracking-wider">{post.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">{post.title}</h1>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-10">
            <ImageReveal
              src={post.image}
              alt={post.title}
              className="aspect-[16/10] w-full rounded-3xl shadow-medium"
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="prose-custom mt-10 space-y-6 text-lg leading-relaxed text-muted">
              {post.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 border-t border-border pt-10">
            <p className="text-muted">Questions about your intellectual property strategy?</p>
            <div className="mt-4">
              <Button href="/contact">Schedule Consultation</Button>
            </div>
          </FadeIn>
        </div>
      </article>
    </>
  )
}
