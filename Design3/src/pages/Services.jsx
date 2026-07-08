import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section-label">Services</p>
          <h1 className="section-title">All IP Services</h1>
        </div>
      </section>
      <section className="section">
        <div className="container bento">
          {services.map((s, i) => (
            <Link key={s.slug} to={`/services/${s.slug}`} className={`card ${i === 0 ? 'wide' : ''}`}>
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
