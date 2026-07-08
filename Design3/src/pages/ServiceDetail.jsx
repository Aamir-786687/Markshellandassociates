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
            <p style={{ marginTop: '1rem', color: '#6B5B6E' }}>{service.desc}</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Consult</Link>
          </div>
          <img src={service.image} alt={service.title} className="hero-img" />
        </div>
      </section>
      <section className="section sec-soft">
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 className="section-title">Overview</h2>
          <p style={{ marginTop: '1rem', lineHeight: 1.8, color: '#6B5B6E' }}>{service.desc}</p>
        </div>
      </section>
    </>
  )
}
