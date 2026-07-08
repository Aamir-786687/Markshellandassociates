import { team, blogs, faqs } from '../data/services'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="section-label">About Us</p>
            <h1 className="section-title">Eighteen Years of IP Excellence</h1>
            <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>Trusted counsel for innovators worldwide.</p>
          </div>
          <img src="/Images/about-corporate.png" alt="About" className="hero-img" />
        </div>
      </section>
      <section className="section sec-gold">
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 className="section-title">Our Mission</h2>
          <p style={{ marginTop: '1rem', lineHeight: 1.8, color: 'var(--muted)' }}>To deliver precise, strategic intellectual property counsel that empowers clients to innovate with confidence.</p>
        </div>
      </section>
    </>
  )
}

export function Team() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">Our Team</p><h1 className="section-title">Expert IP Counsel</h1></div>
          <img src="/Images/team-main.png" alt="Team" className="hero-img" />
        </div>
      </section>
      <section className="section"><div className="container grid-4">{team.map((m) => (<div key={m.name} className="card" style={{ textAlign: 'center' }}><h3>{m.name}</h3><p>{m.role}</p></div>))}</div></section>
    </>
  )
}

export function Blog() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">Insights</p><h1 className="section-title">IP Law Blog</h1></div>
          <img src="/Images/blog-main.png" alt="Blog" className="hero-img" />
        </div>
      </section>
      <section className="section sec-dark"><div className="container grid-3">{blogs.map((b) => (<div key={b.title} className="card"><span style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>{b.cat}</span><h3 style={{ marginTop: 8 }}>{b.title}</h3></div>))}</div></section>
    </>
  )
}

export function Career() {
  const jobs = [{ t: 'Senior Trademark Attorney', l: 'New York' }, { t: 'Patent Agent', l: 'San Francisco' }, { t: 'IP Litigation Associate', l: 'Chicago' }]
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">Careers</p><h1 className="section-title">Build Your IP Career</h1></div>
          <img src="/Images/career-main.png" alt="Career" className="hero-img" />
        </div>
      </section>
      <section className="section"><div className="container grid-3">{jobs.map((j) => (<div key={j.t} className="card"><h3>{j.t}</h3><p>{j.l}</p><Link to="/contact" className="btn btn-primary" style={{ marginTop: '1rem' }}>Apply</Link></div>))}</div></section>
    </>
  )
}

export function FAQs() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">FAQs</p><h1 className="section-title">Frequently Asked Questions</h1></div>
          <img src="/Images/faq-main.png" alt="FAQ" className="hero-img" />
        </div>
      </section>
      <section className="section sec-dark"><div className="container" style={{ maxWidth: 720 }}>{faqs.map((f) => (<details key={f.q} style={{ borderBottom: '1px solid var(--border)', padding: '1rem 0' }}><summary style={{ cursor: 'pointer', color: 'var(--text)' }}>{f.q}</summary><p style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>{f.a}</p></details>))}</div></section>
    </>
  )
}

export function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">Contact</p><h1 className="section-title">Get in Touch</h1></div>
          <img src="/Images/contact-main.png" alt="Contact" className="hero-img" />
        </div>
      </section>
      <section className="section">
        <div className="container grid-2">
          <form className="card" onSubmit={(e) => { e.preventDefault(); alert('Message sent!') }}>
            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-d)' }}>Send a Message</h3>
            <div className="form-group"><label className="form-label">Name</label><input className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={5} required /></div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
          <div className="card" style={{ borderColor: 'var(--gold)' }}>
            <h3 style={{ fontFamily: 'var(--font-d)', color: 'var(--gold)' }}>New York HQ</h3>
            <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>350 Fifth Avenue, Suite 4200<br />New York, NY 10118</p>
          </div>
        </div>
      </section>
    </>
  )
}
