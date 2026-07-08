import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/team', 'Our Team'], ['/blog', 'Blog'], ['/career', 'Career'], ['/faqs', 'FAQs'], ['/contact', 'Contact']]

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-brand" aria-label="Markshell and Associates home">
          <img src="/logo.png" alt="" className="nav-logo" width={44} height={44} />
          <span className="logo-text">Markshell and Associates</span>
        </Link>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
        <Link to="/contact" className="btn btn-nav">Consult</Link>
        <button type="button" className="mobile-toggle" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
      </div>
    </header>
  )
}
