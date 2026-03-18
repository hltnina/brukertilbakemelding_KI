import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="site-navbar" aria-label="Hovednavigasjon">
      <Link to="/" className="navbar-brand" aria-label="Gå til forsiden">
        <span className="navbar-brand-text">Gruppe 03</span>
      </Link>

      <div className="navbar-links">
        <NavLink to="/" className="navbar-pill">
          Hjem
        </NavLink>
        <NavLink to="/about" className="navbar-pill">
          Om oss
        </NavLink>
        <a href="#contact-section" className="navbar-pill">
          Kontakt
        </a>
        <a
          href="https://github.com/hltnina/brukertilbakemelding_KI"
          className="navbar-pill"
          target="_blank"
          rel="noreferrer"
        >
          Github
        </a>
      </div>
    </nav>
  )
}

export default Navbar
