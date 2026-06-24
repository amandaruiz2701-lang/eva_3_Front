import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CarouselCard({ product, esFavorito, onToggleFavorito }) {
  const { agregarAlCarrito } = useCart()
  const imgSrc = product.imagenes?.[0] || product.imagen
  const sinStock = product.stock === 0

  return (
    <div className="carousel-card">
      <Link to={`/producto/${product.id}`} className="carousel-card-img-link">
        <img src={imgSrc} alt={product.nombre} className="carousel-card-img" />
        <span className={`stock-overlay ${sinStock ? 'out' : ''}`}>
          {sinStock ? 'Sin stock' : `${product.stock} disponibles`}
        </span>
      </Link>
      <div className="carousel-card-body">
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
        <div className="d-flex gap-2 mt-auto">
          <button
            className={`btn-fav-icon ${esFavorito ? 'active' : ''}`}
            onClick={() => onToggleFavorito(product.id)}
          >
            {esFavorito ? '❤' : '♡'}
          </button>
          <button
            className="btn-cart flex-fill"
            disabled={sinStock}
            onClick={() => agregarAlCarrito(product, 1)}
          >
            {sinStock ? 'Sin stock' : 'Agregar 🛒'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ProductCarousel({ products, favoritos, onToggleFavorito, titulo, intervalo = 3000 }) {
  const trackRef = useRef(null)
  const [indice, setIndice] = useState(0)
  const [pausado, setPausado] = useState(false)
  const total = products.length

  // ← clave: scrollLeft en el track, no scrollIntoView en la página
  const scrollTo = useCallback((i) => {
    const idx = (i + total) % total
    setIndice(idx)

    const track = trackRef.current
    if (!track) return

    const card = track.children[idx]
    if (!card) return

    // desplaza solo el contenedor del carrusel, no la página
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: 'smooth',
    })
  }, [total])

  // Autoplay
  useEffect(() => {
    if (pausado) return
    const timer = setInterval(() => {
      setIndice((prev) => {
        const siguiente = (prev + 1) % total
        const track = trackRef.current
        if (track) {
          const card = track.children[siguiente]
          if (card) {
            track.scrollTo({
              left: card.offsetLeft - track.offsetLeft,
              behavior: 'smooth',
            })
          }
        }
        return siguiente
      })
    }, intervalo)
    return () => clearInterval(timer)
  }, [pausado, total, intervalo])

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onTouchStart={() => setPausado(true)}
      onTouchEnd={() => setPausado(false)}
    >
      {/* Header */}
      <div className="carousel-header">
        <div className="d-flex align-items-center gap-3">
          <h2 className="section-title m-0">{titulo}</h2>
          <div className={`autoplay-indicator ${pausado ? 'pausado' : ''}`}>
            <div className="autoplay-ring" />
            <span>{pausado ? '⏸' : '▶'}</span>
          </div>
        </div>
        <div className="carousel-controls">
          <button
            className="carousel-btn"
            onClick={() => { setPausado(true); scrollTo(indice - 1) }}
            aria-label="Anterior"
          >←</button>
          <button
            className="carousel-btn"
            onClick={() => { setPausado(true); scrollTo(indice + 1) }}
            aria-label="Siguiente"
          >→</button>
        </div>
      </div>

      {/* Track */}
      <div className="carousel-track" ref={trackRef}>
        {products.map((p) => (
          <CarouselCard
            key={p.id}
            product={p}
            esFavorito={favoritos.includes(p.id)}
            onToggleFavorito={onToggleFavorito}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="carousel-dots">
        {products.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === indice ? 'active' : ''}`}
            onClick={() => { setPausado(true); scrollTo(i) }}
            aria-label={`Ir al producto ${i + 1}`}
          >
            {i === indice && !pausado && (
              <span
                className="dot-progress"
                style={{ animationDuration: `${intervalo}ms` }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel