import { FIRM_NAME } from '@/data/brand'
import { SEO } from '@/components/layout/SEO'
import { PageHero } from '@/components/layout/PageHero'
import { BlogCard } from '@/components/ui/Cards'
import { blogPosts } from '@/data/content'

export default function BlogPage() {
  const latestPost = blogPosts[0]

  return (
    <>
      <SEO title="Blog & Insights" description={`IP law insights, analysis, and strategic guidance from ${FIRM_NAME}.`} path="/blog" image={latestPost.image} />

      <PageHero
        eyebrow="Insights"
        title="IP Law Blog"
        description="Analysis, updates, and strategic guidance from our attorneys and IP specialists."
        image={latestPost.image}
        imageAlt={latestPost.title}
      />

      <section className="page-section-end bg-surface">
        <div className="container-custom grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  )
}
