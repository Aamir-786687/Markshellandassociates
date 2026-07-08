import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <img src="/Images/footer-art.png" alt="" style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 12, opacity: 0.4, marginBottom: 32 }} loading="lazy" />
        <div className="footer-grid">
          <div>
            <p className="logo" style={{ marginBottom: 16 }}>Markshell and Associates</p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>Premier IP counsel — protecting innovation with color, clarity, and conviction.</p>
          </div>
          <div>
            <h4>Services</h4>
            {services.slice(0, 5).map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>
            ))}
          </div>
          <div>
            <h4>Firm</h4>
            <Link to="/about">About</Link>
            <Link to="/team">Our Team</Link>
            <Link to="/career">Careers</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <Link to="/contact">Get in Touch</Link>
            <Link to="/faqs">FAQs</Link>
            <span style={{ fontSize: '0.875rem' }}>+1 (800) 555-1234</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Markshell and Associates</span>
          <span>Privacy · Terms · Disclaimer</span>
        </div>
      </div>
    </footer>
  )
}
