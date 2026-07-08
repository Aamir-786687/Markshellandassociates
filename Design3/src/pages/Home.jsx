import { Link } from 'react-router-dom'
import { services, team, blogs, faqs, stats } from '../data/services'

export default function Home() {
  const clients = ['NOVA TECH', 'ARTISAN CO.', 'MERIDIAN', 'VERTEX', 'LUMINA']

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-badge">Intellectual Property</span>
            <h1>Protecting <span>Innovation</span> Creatively</h1>
            <p>Bold IP counsel for brands and creators — trademarks, patents, copyright, and enforcement with creative precision.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Schedule Consultation</Link>
              <Link to="/services" className="btn btn-outline">Our Services</Link>
            </div>
          </div>
          <div className="hero-img">
            <img src="/Images/hero-home.png" alt="Creative IP hero illustration" />
          </div>
        </div>
      </section>

      <div className="trust-marquee">
        <div className="trust-track">{[...clients, ...clients].map((c, i) => <span key={i}>{c}</span>)}</div>
      </div>

      <section className="section">
        <div className="container">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Built for Innovators</h2>
          <div className="grid-4" style={{ marginTop: '2rem' }}>
            {stats.map((s) => (<div key={s.l} className="stat-box"><strong>{s.n}</strong><span style={{ fontSize: '0.8125rem', color: '#6B5B6E' }}>{s.l}</span></div>))}
          </div>
        </div>
      </section>

      <section className="section sec-soft" style={{ borderRadius: '2rem', margin: '0 1rem' }}>
        <div className="container">
          <p className="section-label">Practice Areas</p>
          <h2 className="section-title">IP Services — Bento View</h2>
          <div className="bento" style={{ marginTop: '2rem' }}>
            {services.slice(0, 6).map((s, i) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className={`card ${i === 0 ? 'wide tall' : i === 2 ? 'wide' : ''}`}>
                <img src={s.image} alt={s.title} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn btn-primary">All 10 Services</Link>
          </div>
        </div>
      </section>

      <section className="section sec-teal">
        <div className="container">
          <p className="section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>Our Team</p>
          <h2 className="section-title" style={{ color: 'white' }}>Meet Our Specialists</h2>
          <div className="grid-4" style={{ marginTop: '2rem' }}>
            {team.map((m) => (
              <div key={m.name} className="stat-box" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }}>
                <strong style={{ color: 'white', fontSize: '1.1rem' }}>{m.name}</strong>
                <span style={{ color: 'rgba(255,255,255,0.75)' }}>{m.role}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/team" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Full Team</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="section-label">Insights</p>
          <h2 className="section-title">Latest Blog</h2>
          <div className="grid-3" style={{ marginTop: '1.5rem' }}>
            {blogs.map((b) => (
              <div key={b.title} className="card">
                <span style={{ fontSize: '0.6875rem', color: 'var(--teal-light)', fontWeight: 700 }}>{b.cat}</span>
                <h3 style={{ marginTop: 6 }}>{b.title}</h3>
                <p>{b.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section sec-soft">
        <div className="container" style={{ maxWidth: 680 }}>
          <p className="section-label">FAQs</p>
          <h2 className="section-title">Questions</h2>
          {faqs.map((f) => (
            <details key={f.q} style={{ borderBottom: '1px solid rgba(13,79,79,0.15)', padding: '1rem 0' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--teal)' }}>{f.q}</summary>
              <p style={{ marginTop: '0.5rem', color: '#6B5B6E', fontSize: '0.875rem' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container sec-teal" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: 'white' }}>Ready to Protect Your IP?</h2>
          <Link to="/contact" className="btn btn-primary" style={{ marginTop: '1.5rem', background: 'white', color: 'var(--teal)' }}>Get Started</Link>
        </div>
      </section>
    </>
  )
}
