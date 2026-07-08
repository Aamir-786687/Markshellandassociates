import { useParams, Link, Navigate } from 'react-router-dom'
import { getService } from '../data/services'

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  if (!service) return <Navigate to="/services" replace />

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="section-label">Service</p>
            <h1 className="section-title">{service.title}</h1>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>{service.desc}</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Request Consultation</Link>
          </div>
          <img src={service.image} alt={service.title} />
        </div>
      </section>
      <section className="section sec-alt">
        <div className="container" style={{ maxWidth: 800 }}>
          <p className="section-label">Overview</p>
          <h2 className="section-title">How We Help</h2>
          <p style={{ marginTop: '1rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
            {service.desc} Our specialists deliver end-to-end counsel with strategic filing, compliance, and enforcement readiness.
          </p>
        </div>
      </section>
    </>
  )
}
