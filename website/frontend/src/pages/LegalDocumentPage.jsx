import { Navigate, useLocation } from 'react-router-dom'
import { FIRM_NAME } from '@/data/brand'
import { SEO, Breadcrumbs } from '@/components/layout/SEO'
import { PageLoader } from '@/components/ui/PageLoader'
import { FadeIn } from '@/components/animations/MotionPrimitives'
import { useLegalDocument } from '@/hooks/useContent'

export default function LegalDocumentPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace(/^\//, '')
  const { data: doc, isLoading, isError } = useLegalDocument(slug)

  if (isLoading) return <PageLoader />
  if (isError || !doc) return <Navigate to="/" replace />

  return (
    <>
      <SEO title={doc.title} description={doc.seoDescription} path={`/${doc.slug}`} />

      <section className="page-hero pb-4 md:pb-6 lg:pb-8">
        <div className="container-custom max-w-3xl">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: doc.title },
          ]} />

          <FadeIn className="mt-8">
            <p className="section-eyebrow">Legal</p>
            <h1 className="text-display mt-4 text-4xl font-semibold text-navy md:text-5xl">{doc.title}</h1>
            {doc.lastUpdated ? (
              <p className="mt-4 text-sm text-muted">Last updated: {doc.lastUpdated}</p>
            ) : null}
          </FadeIn>
        </div>
      </section>

      <section className="page-section-end">
        <div className="container-custom max-w-3xl">
          <FadeIn>
            <div className="space-y-10 text-muted">
              {doc.sections.map((section, index) => (
                <div key={index}>
                  {section.heading ? (
                    <h2 className="text-display mb-4 text-xl font-semibold text-navy md:text-2xl">{section.heading}</h2>
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
            <p className="mt-12 border-t border-border pt-8 text-sm text-muted">
              Questions? Contact{' '}
              <a href="mailto:markshellassociates@gmail.com" className="font-medium text-gold hover:text-gold-dark">
                {FIRM_NAME}
              </a>
              .
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
