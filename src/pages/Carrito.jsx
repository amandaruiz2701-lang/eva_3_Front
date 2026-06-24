import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Breadcrumb from '../components/Breadcrumb'
import PageTransition from '../components/PageTransition'

function Carrito() {
  const navigate = useNavigate()
  const {
    carrito, quitarDelCarrito, cambiarCantidad,
    total, totalConDescuento, descuento,
    aplicarCupon,
  } = useCart()

  const [codigoCupon, setCodigoCupon] = useState('')

  const handleAplicarCupon = () => aplicarCupon(codigoCupon)

  if (carrito.length === 0) {
    return (
      <PageTransition>
        <div className="container py-5 text-center">
          <div style={{ fontSize: '3rem' }}>🛒</div>
          <p style={{ color: 'var(--text-muted)' }} className="mt-3 mb-3">
            Tu carrito está vacío.
          </p>
          <Link to="/catalogo" className="btn-fav">Ir al catálogo</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="container py-5">
        <Breadcrumb items={[
          { label: 'Inicio', path: '/' },
          { label: 'Carrito' },
        ]} />

        <h2 className="section-title">Tu carrito</h2>

        {/* Lista de items */}
        <div className="d-flex flex-column gap-3">
          {carrito.map((item) => (
            <div key={item.id} className="cart-item d-flex align-items-center gap-3">
              <img
                src={item.imagenes?.[0] || item.imagen}
                alt={item.nombre}
                className="cart-item-img"
              />
              <div className="flex-grow-1">
                <Link
                  to={`/producto/${item.id}`}
                  style={{ color: 'var(--text)', textDecoration: 'none' }}
                >
                  <h6 className="m-0">{item.nombre}</h6>
                </Link>
                <span className="category">{item.categoria}</span>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button className="qty-btn" onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}>−</button>
                <span>{item.cantidad}</span>
                <button className="qty-btn" onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}>+</button>
              </div>

              <p className="price m-0" style={{ minWidth: 100, textAlign: 'right' }}>
                ${(item.precio * item.cantidad).toLocaleString()}
              </p>

              <button className="remove-btn" onClick={() => quitarDelCarrito(item.id)}>✕</button>
            </div>
          ))}
        </div>

        {/* Cupón */}
        <div className="d-flex gap-2 mt-4">
          <input
            className="form-control filter-input"
            placeholder="Código de descuento"
            value={codigoCupon}
            onChange={(e) => setCodigoCupon(e.target.value)}
            style={{ maxWidth: 260 }}
          />
          <button className="btn-fav" onClick={handleAplicarCupon}>Aplicar</button>
        </div>

        {descuento > 0 && (
          <p style={{ color: 'var(--accent-2)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Descuento aplicado: {descuento * 100}% — ahorrás $
            {(total - totalConDescuento).toLocaleString()}
          </p>
        )}

        {/* Resumen */}
        <div className="cart-summary mt-4">
          {descuento > 0 && (
            <div className="d-flex justify-content-between mb-1">
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${total.toLocaleString()}
              </span>
            </div>
          )}
          <div className="d-flex justify-content-between align-items-center">
            <span style={{ color: 'var(--text-muted)' }}>Total</span>
            <span className="price fs-3">${totalConDescuento.toLocaleString()}</span>
          </div>
        </div>

        <button className="btn-cart w-100 mt-3 py-2" onClick={() => navigate('/checkout')}>
          Finalizar compra →
        </button>
      </div>
    </PageTransition>
  )
}

export default Carrito