import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.markshelland.com'
const DEFAULT_IMAGE = '/Images/hero-main.png'

export function SEO({ title, description, path = '', image = DEFAULT_IMAGE, type = 'website' }) {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} | Markshell and Associates`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Markshell and Associates',
    description: 'Premier intellectual property law firm specializing in trademarks, patents, copyright, and IP enforcement.',
    url: SITE_URL,
    areaServed: 'Worldwide',
    serviceType: ['Trademark Registration', 'Patent Registration', 'Copyright Registration', 'IP Litigation'],
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:site_name" content="Markshell and Associates" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}

export function Breadcrumbs({ items }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <a href={item.href} className="hover:text-navy">{item.label}</a>
              ) : (
                <span className="text-navy" aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
