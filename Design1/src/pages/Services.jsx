import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="section-label">Our Services</p>
            <h1 className="section-title">Intellectual Property Services</h1>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>Ten specialized practice areas.</p>
          </div>
          <img src="/Images/service-trademark.png" alt="" />
        </div>
      </section>
      <section className="section sec-light">
        <div className="container grid-2">
          {services.map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className="card">
              <img src={s.image} alt={s.title} loading="lazy" />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
