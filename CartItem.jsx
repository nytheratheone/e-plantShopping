// CartItem.jsx
// Paradise Nursery — Shopping cart page
// Shows all cart items, per-item totals, quantity controls, delete, checkout, continue shopping

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectTotalItems,
  selectTotalCost,
} from '../store/CartSlice'

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const totalItems = useSelector(selectTotalItems)

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Paradise Nursery</Link>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/plants">Plants</Link></li>
        <li>
          <Link to="/cart" className="cart-icon-wrapper" aria-label={`Cart — ${totalItems} items`}>
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

// ─── Single Cart Item Row ─────────────────────────────────────────────────────

function CartItemRow({ item }) {
  const dispatch = useDispatch()
  const lineTotal = (item.price * item.quantity).toFixed(2)

  return (
    <div className="cart-item-row">
      {/* Thumbnail */}
      <img
        className="cart-item-thumb"
        src={item.image}
        alt={item.name}
        loading="lazy"
      />

      {/* Plant details */}
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-unit-price">
          ${item.price.toFixed(2)} / unit
        </p>
        <p className="cart-item-subtotal">
          Subtotal: ${lineTotal}
        </p>
      </div>

      {/* Controls: quantity + delete */}
      <div className="cart-item-controls">
        <div className="quantity-control" role="group" aria-label={`Quantity for ${item.name}`}>
          <button
            className="qty-btn"
            onClick={() => dispatch(decreaseQuantity(item.id))}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="qty-display" aria-live="polite">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => dispatch(increaseQuantity(item.id))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          className="btn-delete"
          onClick={() => dispatch(removeItem(item.id))}
          aria-label={`Remove ${item.name} from cart`}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M2 3h8M5 3V2h2v1M3 3l.5 7h5L9 3" />
          </svg>
          Remove
        </button>
      </div>
    </div>
  )
}

// ─── Cart Page ────────────────────────────────────────────────────────────────

export default function CartItem() {
  const items = useSelector(selectCartItems)
  const totalItems = useSelector(selectTotalItems)
  const totalCost = useSelector(selectTotalCost)
  const [showToast, setShowToast] = useState(false)

  const handleCheckout = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3500)
  }

  return (
    <div className="cart-page">
      <Navbar />

      <header className="cart-page-header">
        <h1>Your Cart</h1>
      </header>

      <main>
        {items.length === 0 ? (
          // ── Empty State ──────────────────────────────────────────────────
          <div className="cart-container">
            <div className="cart-empty">
              <div className="cart-empty-icon">🪴</div>
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any plants yet.</p>
              <Link to="/plants" className="btn-continue" style={{ display: 'inline-flex', width: 'auto', padding: '0.9rem 2.4rem' }}>
                ← Browse Plants
              </Link>
            </div>
          </div>
        ) : (
          // ── Populated Cart ───────────────────────────────────────────────
          <div className="cart-container">
            {/* Left: Item list */}
            <div>
              <div className="cart-items-list" role="list" aria-label="Cart items">
                {items.map(item => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Right: Order summary panel */}
            <aside className="cart-summary" aria-label="Order summary">
              <h2>Order Summary</h2>

              <div className="summary-line">
                <span>Items ({totalItems})</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-line">
                <span>Discount</span>
                <span>—</span>
              </div>
              <div className="summary-line total">
                <span>Total</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>

              {/* Checkout CTA */}
              <button
                className="btn-checkout"
                onClick={handleCheckout}
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link to="/plants" className="btn-continue">
                ← Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </main>

      {/* Coming Soon toast notification */}
      {showToast && (
        <div className="checkout-toast" role="status" aria-live="polite">
          Checkout coming soon — thank you for your patience!
        </div>
      )}
    </div>
  )
}
