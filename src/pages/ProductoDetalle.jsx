import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import ImageGallery from '../components/ImageGallery'
import Breadcrumb from '../components/Breadcrumb'
import ProductList from '../components/ProductList'

function ProductoDetalle({ products, favoritos, onToggleFavorito }) {
  const { id } = useParams()
  const { agregarAlCarrito } = useCart()
  const [cantidad, setCantidad] = useState(1)

  const producto = products.find((p) => p.id === Number(id))

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <p>Producto no encontrado.</p>
        <Link to="/catalogo" className="btn-fav">Volver al catálogo</Link>
      </div>
    )
  }

  const esFavorito = favoritos.includes(producto.id)
  const sinStock = producto.stock === 0

  const relacionados = products
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 3)

  return (
    <div className="container py-5">
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: 'Catálogo', path: '/catalogo' },
        { label: producto.categoria, path: `/catalogo` },
        { label: producto.nombre },
      ]} />

      <div className="row g-5 align-items-start">
        <div className="col-md-6">
          <ImageGallery imagenes={producto.imagenes} nombre={producto.nombre} />
        </div>

        <div className="col-md-6">
          <span className="category">{producto.categoria}</span>
          <h1 className="my-3">{producto.nombre}</h1>
          <p className="price fs-2">${producto.precio.toLocaleString()}</p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>{producto.descripcion}</p>

          {sinStock ? (
            <span className="stock-badge out d-block mb-3">Sin stock</span>
          ) : (
            <span className="stock-badge d-block mb-3">{producto.stock} disponibles</span>
          )}

          <div className="d-flex gap-2 align-items-center flex-wrap">
            <button
              className={`btn-fav ${esFavorito ? 'active' : ''}`}
              onClick={() => onToggleFavorito(producto.id)}
            >
              {esFavorito ? '❤ En favoritos' : '♡ Favoritos'}
            </button>

            {!sinStock && (
              <div className="qty-selector">
                <button onClick={() => setCantidad((c) => Math.max(1, c - 1))}>−</button>
                <span>{cantidad}</span>
                <button onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}>+</button>
              </div>
            )}

            <button
              className="btn-cart"
              disabled={sinStock}
              onClick={() => agregarAlCarrito(producto, cantidad)}
            >
              {sinStock ? 'Sin stock' : 'Agregar al carrito 🛒'}
            </button>
          </div>
        </div>
      </div>

      {relacionados.length > 0 && (
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
          <h3 className="section-title">También te puede interesar</h3>
          <ProductList
            products={relacionados}
            favoritos={favoritos}
            onToggleFavorito={onToggleFavorito}
          />
        </div>
      )}
    </div>
  )
}

export default ProductoDetalle