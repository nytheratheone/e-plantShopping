// ProductList.jsx
// Paradise Nursery — Product listing with categories, plant cards, and cart integration

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, selectTotalItems, selectAddedIds } from '../store/CartSlice'

// ─── Plant Catalogue ─────────────────────────────────────────────────────────
// 4 categories × 6 plants each = 24 unique plants

const PLANT_CATALOGUE = [
  // ── Category 1: Tropical Statements ────────────────────────────────────────
  {
    category: 'Tropical Statements',
    plants: [
      {
        id: 'tp-01',
        name: 'Monstera Deliciosa',
        description: 'Iconic split leaves, fast-growing, effortlessly dramatic in any interior.',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1637967886160-fd78dc3ce3f5?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'tp-02',
        name: 'Bird of Paradise',
        description: 'Large paddle leaves with a sculptural silhouette. A statement floor plant.',
        price: 64.00,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'tp-03',
        name: 'Philodendron Brasil',
        description: 'Heart-shaped leaves splashed with lime and gold. Fast-trailing vine.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'tp-04',
        name: 'Calathea Orbifolia',
        description: 'Silver-striped leaves that move with the light. A living piece of art.',
        price: 29.00,
        image: 'https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'tp-05',
        name: 'Fiddle Leaf Fig',
        description: 'Bold, violin-shaped leaves on an architectural branching trunk.',
        price: 72.00,
        image: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'tp-06',
        name: 'Anthurium Clarinervium',
        description: 'Velvety dark-green leaves with brilliant white veining. Collector-grade.',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1571757767119-68b8dbed8c97?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'tp-07',
        name: 'Heliconia Rostrata',
        description: 'Pendulous lobster-claw bracts in scarlet and yellow. Showstopper.',
        price: 55.00,
        image: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=400&auto=format&fit=crop&q=70',
      },
    ],
  },

  // ── Category 2: Desert & Arid ───────────────────────────────────────────────
  {
    category: 'Desert & Arid',
    plants: [
      {
        id: 'da-01',
        name: 'Saguaro Cactus',
        description: 'The iconic columnar cactus of the American southwest. Slow and stately.',
        price: 48.00,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'da-02',
        name: 'Agave Americana',
        description: 'Rosette of thick blue-grey leaves with terminal spines. Structural perfection.',
        price: 36.00,
        image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'da-03',
        name: 'Aloe Vera',
        description: 'Succulent rosette with healing gel. Thrives in bright light, little water.',
        price: 16.00,
        image: 'https://images.unsplash.com/photo-1596746556086-9639e3e3be84?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'da-04',
        name: 'Euphorbia Trigona',
        description: 'African milk tree — upright, candelabra form in deep green and red.',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1520302630591-fd1f1f8c3619?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'da-05',
        name: 'Echeveria Subsessilis',
        description: 'Powdery blue-green rosette with pink-tipped leaves. Jewel-like formation.',
        price: 12.00,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'da-06',
        name: 'Ferocactus Wislizeni',
        description: 'Barrel cactus with fierce red spines and a perfect spherical form.',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&auto=format&fit=crop&q=70',
      },
    ],
  },

  // ── Category 3: Low-Light Shade ─────────────────────────────────────────────
  {
    category: 'Low-Light & Shade',
    plants: [
      {
        id: 'll-01',
        name: 'ZZ Plant',
        description: 'Near-indestructible. Glossy dark leaves, tolerates neglect beautifully.',
        price: 26.00,
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'll-02',
        name: 'Pothos Golden',
        description: 'Cascading golden-variegated vines. Thrives in almost any indoor condition.',
        price: 14.00,
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'll-03',
        name: 'Cast Iron Plant',
        description: 'Deep green strap leaves that survive cold, drought, and low light alike.',
        price: 22.00,
        image: 'https://images.unsplash.com/photo-1555955580-47e4c73a0158?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'll-04',
        name: 'Snake Plant Laurentii',
        description: 'Upright sword leaves with golden margins. Air-purifying and architectural.',
        price: 24.00,
        image: 'https://images.unsplash.com/photo-1593482892540-72d62e34e2e0?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'll-05',
        name: 'Peace Lily',
        description: 'White spathe flowers above deep green foliage. Classic shade performer.',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1616499614038-e08de2b7e1ed?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'll-06',
        name: 'Chinese Evergreen Silver',
        description: 'Silver-patterned leaves on a robust, adaptable stem. Virtually bulletproof.',
        price: 20.00,
        image: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?w=400&auto=format&fit=crop&q=70',
      },
    ],
  },

  // ── Category 4: Rare & Collector ───────────────────────────────────────────
  {
    category: 'Rare & Collector',
    plants: [
      {
        id: 'rc-01',
        name: 'Monstera Thai Constellation',
        description: 'Creamy variegation splashed across split leaves. Every leaf is unique.',
        price: 185.00,
        image: 'https://images.unsplash.com/photo-1610384839280-a386e6b39b14?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'rc-02',
        name: 'Philodendron Gloriosum',
        description: 'Velvet-finish heart leaves with cream venation. A crawling terrestrial beauty.',
        price: 95.00,
        image: 'https://images.unsplash.com/photo-1628702938690-7f0e1e7d3cc8?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'rc-03',
        name: 'Alocasia Dragon Scale',
        description: 'Metallic scale-like texture on iridescent leaves. Prehistoric and striking.',
        price: 68.00,
        image: 'https://images.unsplash.com/photo-1629482948363-a6c6e5849b10?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'rc-04',
        name: 'Hoya Kerrii Variegata',
        description: 'Heart-shaped succulent leaves edged in cream. Slow-growing, long-lived.',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1612685070836-08df4c48a5ce?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'rc-05',
        name: 'Begonia Masoniana',
        description: 'Iron-cross pattern on textured leaves. A collector favourite since the 1950s.',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=400&auto=format&fit=crop&q=70',
      },
      {
        id: 'rc-06',
        name: 'Selenicereus Chrysocardium',
        description: 'Oak-leaf shaped jungle cactus. Enormous blooms under the right conditions.',
        price: 78.00,
        image: 'https://images.unsplash.com/photo-1520302630591-fd1f1f8c3619?w=400&auto=format&fit=crop&q=70',
      },
    ],
  },
]

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const totalItems = useSelector(selectTotalItems)
  const [badgePop, setBadgePop] = useState(false)

  useEffect(() => {
    if (totalItems > 0) {
      setBadgePop(true)
      const t = setTimeout(() => setBadgePop(false), 300)
      return () => clearTimeout(t)
    }
  }, [totalItems])

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
              <span className={`cart-count-badge${badgePop ? ' pop' : ''}`}>
                {totalItems}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

// ─── Plant Card ───────────────────────────────────────────────────────────────

function PlantCard({ plant }) {
  const dispatch = useDispatch()
  const addedIds = useSelector(selectAddedIds)
  const isAdded = addedIds.includes(plant.id)

  const handleAdd = () => {
    if (!isAdded) dispatch(addItem(plant))
  }

  return (
    <div className="plant-card">
      <div className="plant-image-wrapper">
        <img src={plant.image} alt={plant.name} loading="lazy" />
      </div>
      <div className="plant-info">
        <h3 className="plant-name">{plant.name}</h3>
        <p className="plant-description">{plant.description}</p>
        <p className="plant-price">${plant.price.toFixed(2)}</p>
        <button
          className="btn-add-to-cart"
          onClick={handleAdd}
          disabled={isAdded}
          aria-label={isAdded ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}
        >
          {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

// ─── Category Section ─────────────────────────────────────────────────────────

function CategorySection({ category, plants }) {
  return (
    <section className="category-section" id={category.toLowerCase().replace(/\s+/g, '-')}>
      <div className="category-header">
        <h2 className="category-title">{category}</h2>
        <span className="category-count">{plants.length} varieties</span>
      </div>
      <div className="plants-grid">
        {plants.map(plant => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </section>
  )
}

// ─── Product List Page ────────────────────────────────────────────────────────

export default function ProductList() {
  return (
    <div className="product-page">
      <Navbar />

      <header className="product-page-header">
        <h1>The Collection</h1>
        <p>
          {PLANT_CATALOGUE.reduce((acc, cat) => acc + cat.plants.length, 0)} curated plants
          across {PLANT_CATALOGUE.length} categories
        </p>
      </header>

      <main className="product-container">
        {PLANT_CATALOGUE.map(({ category, plants }) => (
          <CategorySection key={category} category={category} plants={plants} />
        ))}
      </main>
    </div>
  )
}
