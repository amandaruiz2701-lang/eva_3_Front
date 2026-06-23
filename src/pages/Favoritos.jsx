import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'

function Favoritos({ products, favoritos, onToggleFavorito }) {
  const productosFavoritos = products.filter((p) => favoritos.includes(p.id))

  return (
    <div className="container py-4">
      <h2 className="section-title">Tus favoritos</h2>

      {productosFavoritos.length > 0 ? (
        <ProductList
          products={productosFavoritos}
          favoritos={favoritos}
          onToggleFavorito={onToggleFavorito}
        />
      ) : (
        <div className="text-center py-5">
          <p className="text-muted mb-3">Todavía no agregaste nada a favoritos.</p>
          <Link to="/catalogo" className="btn-fav">Explorar catálogo</Link>
        </div>
      )}
    </div>
  )
}

export default Favoritos