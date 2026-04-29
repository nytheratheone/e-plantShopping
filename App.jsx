// App.jsx
// Paradise Nursery — Landing page, routing, and app shell

import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import ProductList from './components/ProductList'
import CartItem from './components/CartItem'
import AboutUs from './components/AboutUs'

// ─── Landing Page ────────────────────────────────────────────────────────────

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">Paradise Nursery</Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/plants">Plants</Link></li>
          <li>
            <Link to="/cart" className="cart-icon-wrapper" aria-label="Shopping cart">
              <CartIconNav />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="hero-content">
        <span className="hero-eyebrow">Est. 2019 · Handcurated Botanicals</span>

        <h1 className="hero-title">
          Paradise<br />
          <em>Nursery</em>
        </h1>

        <p className="hero-tagline">
          Rare and everyday plants, thoughtfully sourced.<br />
          Bring living beauty into every space.
        </p>

        <button
          className="btn-get-started"
          onClick={() => navigate('/plants')}
          aria-label="Browse our plant collection"
        >
          Explore the Collection
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Small inline cart icon used in landing page navbar (no badge — stays clean)
function CartIconNav() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

// ─── App Shell with Routes ───────────────────────────────────────────────────

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  )
}
