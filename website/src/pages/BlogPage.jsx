import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { BlogCard } from '@/components/ui/Cards'
import { FadeIn, ImageReveal } from '@/components/animations/MotionPrimitives'
import { blogPosts } from '@/data/content'

export default function BlogPage() {
  const latestPost = blogPosts[0]

  return (
    <>
      <SEO title="Blog & Insights" description={`IP law insights, analysis, and strategic guidance from ${FIRM_NAME}.`} path="/blog" image={latestPost.image} />

      <section className="pt-36 pb-16 md:pt-44">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <FadeIn type="fadeLeft">
            <p className="section-eyebrow">Insights</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">IP Law Blog</h1>
            <p className="mt-6 text-lg text-muted">Analysis, updates, and strategic guidance from our attorneys and IP specialists.</p>
          </FadeIn>
          <FadeIn type="fadeRight">
            <ImageReveal src={latestPost.image} alt={latestPost.title} className="rounded-3xl shadow-medium" />
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
