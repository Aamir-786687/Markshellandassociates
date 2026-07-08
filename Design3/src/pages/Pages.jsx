import { team, blogs, faqs } from '../data/services'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">About</p><h1 className="section-title">IP Excellence</h1></div>
          <img src="/Images/about-main.png" alt="About" className="hero-img" />
        </div>
      </section>
      <section className="section sec-soft"><div className="container" style={{ maxWidth: 680 }}><p style={{ lineHeight: 1.8, color: '#6B5B6E' }}>Strategic intellectual property counsel for innovators worldwide.</p></div></section>
    </>
  )
}

export function Team() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">Team</p><h1 className="section-title">Our Specialists</h1></div>
          <img src="/Images/team-creative.png" alt="Team" className="hero-img" />
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
          <div><p className="section-label">Blog</p><h1 className="section-title">Insights</h1></div>
          <img src="/Images/blog-main.png" alt="Blog" className="hero-img" />
        </div>
      </section>
      <section className="section"><div className="container grid-3">{blogs.map((b) => (<div key={b.title} className="card"><h3>{b.title}</h3><p>{b.date}</p></div>))}</div></section>
    </>
  )
}

export function Career() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">Careers</p><h1 className="section-title">Join Us</h1></div>
          <img src="/Images/career-main.png" alt="Career" className="hero-img" />
        </div>
      </section>
      <section className="section"><div className="container"><Link to="/contact" className="btn btn-primary">Apply Now</Link></div></section>
    </>
  )
}

export function FAQs() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div><p className="section-label">FAQs</p><h1 className="section-title">Questions</h1></div>
          <img src="/Images/faq-main.png" alt="FAQ" className="hero-img" />
        </div>
      </section>
      <section className="section"><div className="container" style={{ maxWidth: 680 }}>{faqs.map((f) => (<details key={f.q} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(13,79,79,0.1)' }}><summary style={{ cursor: 'pointer', fontWeight: 600, color: 'var(--teal)' }}>{f.q}</summary><p style={{ marginTop: 8, color: '#6B5B6E' }}>{f.a}</p></details>))}</div></section>
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
          <form className="card" onSubmit={(e) => { e.preventDefault(); alert('Sent!') }}>
            <div className="form-group"><label className="form-label">Name</label><input className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Email</label><input type="email" className="form-input" required /></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={4} required /></div>
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
          <div className="card sec-teal" style={{ color: 'white', padding: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-d)' }}>New York HQ</h3>
            <p style={{ marginTop: '1rem', opacity: 0.9 }}>350 Fifth Avenue<br />New York, NY 10118</p>
          </div>
        </div>
      </section>
    </>
  )
}
