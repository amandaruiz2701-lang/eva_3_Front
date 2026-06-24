import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/Breadcrumb'
import PageTransition from '../components/PageTransition'

function Historial() {
  const { historial } = useCart()
  const { usuario } = useAuth()

  if (!usuario) {
    return (
      <PageTransition>
        <div className="container py-5 text-center">
          <p style={{ color: 'var(--text-muted)' }} className="mb-3">
            Debes iniciar sesión para ver tu historial.
          </p>
          <Link to="/login" className="btn-cart">Iniciar sesión</Link>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="container py-4">
        <Breadcrumb items={[{ label: 'Inicio', path: '/' }, { label: 'Mis pedidos' }]} />
        <h2 className="section-title">Mis pedidos</h2>

        {historial.length === 0 ? (
          <div className="text-center py-5">
            <p style={{ color: 'var(--text-muted)' }} className="mb-3">
              Aún no has realizado ningún pedido.
            </p>
            <Link to="/catalogo" className="btn-fav">Ir al catálogo</Link>
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {historial.map((pedido) => (
              <div key={pedido.id} className="historial-card">
                <div className="historial-header">
                  <div>
                    <span className="historial-id">Pedido #{pedido.id.toString().slice(-6)}</span>
                    <span className="historial-fecha">{pedido.fecha}</span>
                  </div>
                  <span className="price">${pedido.total.toLocaleString()}</span>
                </div>

                <div className="historial-items">
                  {pedido.items.map((item) => (
                    <div key={item.id} className="historial-item">
                      <img
                        src={item.imagenes?.[0] || item.imagen}
                        alt={item.nombre}
                        className="historial-img"
                      />
                      <div className="flex-grow-1">
                        <p className="m-0" style={{ fontSize: '0.9rem' }}>{item.nombre}</p>
                        <span className="category">{item.categoria}</span>
                      </div>
                      <div className="text-end">
                        <p className="m-0" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                          x{item.cantidad}
                        </p>
                        <p className="m-0 price" style={{ fontSize: '0.95rem' }}>
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {pedido.descuentoAplicado > 0 && (
                  <p className="m-0 mt-2" style={{ color: 'var(--accent-2)', fontSize: '0.82rem' }}>
                    Descuento aplicado: {pedido.descuentoAplicado * 100}%
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default Historial