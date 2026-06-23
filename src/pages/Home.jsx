import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'

function Home({ products }) {
  const destacados = products.slice(0, 4)

  return (
    <>
      <Hero />
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title m-0">Destacados</h2>
          <Link to="/catalogo" className="btn-fav">Ver catálogo completo →</Link>
        </div>
        <ProductList products={destacados} favoritos={[]} onToggleFavorito={() => {}} />
      </div>
    </>
  )
}

export default Home