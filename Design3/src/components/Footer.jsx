import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <img src="/Images/footer-art.png" alt="" style={{ width: '100%', height: 72, objectFit: 'cover', borderRadius: 16, opacity: 0.35, marginBottom: 28 }} loading="lazy" />
        <div className="footer-grid">
          <div>
            <p className="logo" style={{ marginBottom: 12, color: 'white' }}>Markshel Land & Associates</p>
            <p style={{ fontSize: '0.875rem' }}>Creative premium IP counsel — protecting innovation with bold design and deep expertise.</p>
          </div>
          <div><h4>Services</h4>{services.slice(0, 5).map((s) => <Link key={s.slug} to={`/services/${s.slug}`}>{s.title}</Link>)}</div>
          <div><h4>Firm</h4><Link to="/about">About</Link><Link to="/team">Team</Link><Link to="/career">Careers</Link></div>
          <div><h4>Contact</h4><Link to="/contact">Get in Touch</Link><Link to="/faqs">FAQs</Link></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Markshel Land & Associates</span></div>
      </div>
    </footer>
  )
}
