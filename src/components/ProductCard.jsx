import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function ProductCard({ product, esFavorito, onToggleFavorito }) {
  const { agregarAlCarrito } = useCart()
  const [cantidad, setCantidad] = useState(1)
  const sinStock = product.stock === 0
  const imgSrc = product.imagenes?.[0] || product.imagen

  return (
    <div className="product-card">
      <Link to={`/producto/${product.id}`} className="card-img-link">
        <img src={imgSrc} alt={product.nombre} />
        <span className={`stock-overlay ${sinStock ? 'out' : ''}`}>
          {sinStock ? 'Sin stock' : `${product.stock} disponibles`}
        </span>
      </Link>

      <div className="card-body">
        <Link to={`/producto/${product.id}`} className="text-decoration-none">
          <h5 className="card-title">{product.nombre}</h5>
        </Link>
        <span className="category">{product.categoria}</span>

        {product.rating && (
          <div className="rating">
            {'★'.repeat(Math.round(product.rating.rate))}
            {'☆'.repeat(5 - Math.round(product.rating.rate))}
            <span className="rating-count"> ({product.rating.count})</span>
          </div>
        )}

        <p className="price">${product.precio.toLocaleString()}</p>

        {/* Fila 1: favorito + qty selector */}
        <div className="card-actions-row">
          <button
            className={`btn-fav-icon ${esFavorito ? 'active' : ''}`}
            onClick={() => onToggleFavorito(product.id)}
            title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            {esFavorito ? '❤' : '♡'}
          </button>

          {!sinStock && (
            <div className="qty-selector">
              <button onClick={() => setCantidad((c) => Math.max(1, c - 1))}>−</button>
              <span>{cantidad}</span>
              <button onClick={() => setCantidad((c) => Math.min(product.stock, c + 1))}>+</button>
            </div>
          )}
        </div>

        {/* Fila 2: botón agregar al carrito */}
        <button
          className="btn-cart w-100 mt-2"
          disabled={sinStock}
          onClick={() => agregarAlCarrito(product, cantidad)}
        >
          {sinStock ? 'Sin stock' : 'Agregar al carrito 🛒'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard