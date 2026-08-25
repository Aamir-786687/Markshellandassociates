import { Navigate, useLocation } from 'react-router-dom'
import { getLegalDocumentBySlug } from '@/data/legal'
import { SEO, Breadcrumbs } from '@/components/layout/SEO'
import { FadeIn } from '@/components/animations/MotionPrimitives'

export default function LegalDocumentPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const doc = getLegalDocumentBySlug(slug)

  if (!doc) return <Navigate to="/" replace />

  return (
    <>
      <SEO title={doc.title} description={doc.seoDescription} path={`/${doc.slug}`} />

      <section className="page-hero pb-4 md:pb-6">
        <div className="container-custom max-w-3xl">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: doc.title },
          ]} />

          <FadeIn className="mt-4 md:mt-6">
            <div className="hero-text-stack">
              <p className="section-eyebrow">Legal</p>
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl">{doc.title}</h1>
              {doc.lastUpdated ? (
                <p className="text-sm text-muted">Last updated: {doc.lastUpdated}</p>
              ) : null}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="page-section-end">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="space-y-8 text-muted md:space-y-10">
              {doc.sections.map((section, index) => (
                <div key={index}>
                  {section.heading ? (
                    <h2 className="text-display mb-3 text-xl font-semibold text-navy md:mb-4 md:text-2xl">{section.heading}</h2>
                  ) : null}
                  <div className="space-y-4 text-base leading-relaxed md:text-lg">
                    {section.paragraphs.map((paragraph, pIndex) => (
                      <p key={pIndex}>{paragraph}</p>
                    ))}
                    {section.listItems?.length ? (
                      <ul className="list-disc space-y-2 pl-6">
                        {section.listItems.map((item, liIndex) => (
                          <li key={liIndex}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
