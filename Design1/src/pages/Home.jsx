import { Link } from 'react-router-dom'
import { services, team, blogs, faqs, stats } from '../data/services'

export default function Home() {
  const clients = ['NOVA TECH', 'ARTISAN CO.', 'MERIDIAN', 'VERTEX', 'LUMINA', 'APEX BIO']
  const steps = ['Discovery', 'Analysis', 'Strategy', 'Execution', 'Enforcement']

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-badge">Intellectual Property Law</span>
            <h1>Protecting <span>Innovation</span> With Bold Precision</h1>
            <p>We counsel visionary brands and creators on trademarks, patents, copyright, and IP enforcement — with clarity and excellence.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn btn-primary">Schedule Consultation</Link>
              <Link to="/services" className="btn btn-outline">Explore Services</Link>
            </div>
          </div>
          <div className="hero-img">
            <img src="/Images/design1-hero.png" alt="IP law hero illustration" />
          </div>
        </div>
      </section>

      <div className="trust-marquee">
        <div className="trust-track">
          {[...clients, ...clients].map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <section className="section sec-primary">
        <div className="container">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">A Firm Built for the IP Economy</h2>
          <div className="grid-4" style={{ marginTop: '3rem' }}>
            {stats.map((s) => (
              <div key={s.l} className="stat-box">
                <strong>{s.n}</strong>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section sec-light">
        <div className="container">
          <p className="section-label">Practice Areas</p>
          <h2 className="section-title">Comprehensive IP Protection</h2>
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card">
                <img src={s.image} alt={s.title} loading="lazy" />
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/services" className="btn btn-primary">View All 10 Services</Link>
          </div>
        </div>
      </section>

      <section className="section sec-alt">
        <div className="container">
          <p className="section-label">Our Process</p>
          <h2 className="section-title">Five Steps to Protection</h2>
          <div className="grid-4" style={{ marginTop: '2rem' }}>
            {steps.map((step, i) => (
              <div key={step} className="stat-box">
                <strong>{i + 1}</strong>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section sec-accent">
        <div className="container">
          <p className="section-label">Our Team</p>
          <h2 className="section-title">Meet Our IP Specialists</h2>
          <div className="grid-4" style={{ marginTop: '2rem' }}>
            {team.map((m) => (
              <div key={m.name} className="stat-box">
                <strong style={{ fontSize: '1.25rem' }}>{m.name}</strong>
                <span>{m.role}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/team" className="btn btn-primary">Full Team</Link>
          </div>
        </div>
      </section>

      <section className="section sec-muted">
        <div className="container">
          <p className="section-label">Insights</p>
          <h2 className="section-title">Latest from Our Blog</h2>
          <div className="grid-3" style={{ marginTop: '2rem' }}>
            {blogs.map((b) => (
              <div key={b.title} className="stat-box">
                <span style={{ fontSize: '0.75rem', color: 'var(--blue)' }}>{b.cat} · {b.date}</span>
                <strong style={{ fontSize: '1.1rem', marginTop: 8, display: 'block', color: 'var(--navy-deep)' }}>{b.title}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section sec-light">
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="section-label">FAQs</p>
          <h2 className="section-title">Common Questions</h2>
          <div style={{ marginTop: '2rem' }}>
            {faqs.map((f) => (
              <details key={f.q} className="faq-item" style={{ padding: '0.75rem 0' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--navy-deep)', listStyle: 'none' }}>{f.q}</summary>
                <p style={{ padding: '0.75rem 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section sec-alt">
        <div className="container">
          <div className="cta-block">
            <h2 className="section-title">Ready to Protect Your IP?</h2>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>Schedule a confidential consultation today.</p>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>Get Started</Link>
          </div>
        </div>
      </section>
    </>
  )
}
