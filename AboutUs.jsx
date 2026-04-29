// AboutUs.jsx
// Paradise Nursery — Company story, mission, and values

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTotalItems } from '../store/CartSlice'

// ─── Shared Navbar (used on interior pages) ──────────────────────────────────

function Navbar() {
  const totalItems = useSelector(selectTotalItems)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Paradise Nursery</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/plants">Plants</Link></li>
        <li>
          <Link to="/cart" className="cart-icon-wrapper" aria-label={`Cart, ${totalItems} items`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="cart-count-badge">{totalItems}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

// ─── About Us Page ───────────────────────────────────────────────────────────

export default function AboutUs() {
  return (
    <div className="about-page">
      <Navbar />

      <div className="about-hero">
        <h1 className="about-hero-title">Our Story</h1>
        <p className="about-hero-subtitle">Growing more than plants since 2019</p>
      </div>

      <div className="about-body">
        <div className="about-text">
          <h2>Where every plant has a purpose</h2>
          <p>
            Paradise Nursery was founded in 2019 by a small team of botanists and designers
            who believed that living with plants changes how we think, breathe, and feel.
            What started as a weekend market stall in Portland, Oregon grew into one of the
            most trusted independent plant retailers in the Pacific Northwest.
          </p>
          <p>
            We source every plant with intention — working directly with ethical growers,
            small-scale farms, and conservation nurseries. We don't list anything we
            wouldn't keep in our own homes.
          </p>
          <p>
            Our team includes certified horticulturists, interior plant stylists, and
            obsessive collectors. Every listing on this site has been personally assessed
            for quality, health, and viability in home environments.
          </p>
        </div>

        <div className="about-values">
          <h3>What we stand for</h3>

          <div className="value-item">
            <span className="value-icon">🌱</span>
            <p>
              <strong>Ethical Sourcing</strong>
              Every plant is traceable to responsible growers who prioritize soil health
              and sustainable cultivation practices.
            </p>
          </div>

          <div className="value-item">
            <span className="value-icon">🔬</span>
            <p>
              <strong>Expert Curation</strong>
              Our horticulturists personally select every variety. If it doesn't meet our
              quality threshold, it doesn't reach the listing.
            </p>
          </div>

          <div className="value-item">
            <span className="value-icon">📦</span>
            <p>
              <strong>Safe Delivery</strong>
              Plants ship in climate-aware packaging with live-arrival guarantees.
              We absorb the risk so you don't have to.
            </p>
          </div>

          <div className="value-item">
            <span className="value-icon">🌍</span>
            <p>
              <strong>Carbon Commitment</strong>
              One tree planted for every order. We've put over 40,000 trees in the ground
              since 2021 through our reforestation partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
