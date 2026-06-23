import { useState } from 'react'
import ProductList from '../components/ProductList'
import SkeletonList from '../components/SkeletonList'
import Breadcrumb from '../components/Breadcrumb'

function Catalogo({ products, cargando, favoritos, onToggleFavorito }) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [orden, setOrden] = useState('default')
  const [filtrando, setFiltrando] = useState(false)

  const categorias = ['Todas', ...new Set(products.map((p) => p.categoria))]

  const handleCategoria = (cat) => {
    setFiltrando(true)
    setTimeout(() => { setCategoria(cat); setFiltrando(false) }, 500)
  }

  let filtrados = products.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
    return coincideNombre && coincideCategoria
  })

  if (orden === 'precio-asc') filtrados = [...filtrados].sort((a, b) => a.precio - b.precio)
  if (orden === 'precio-desc') filtrados = [...filtrados].sort((a, b) => b.precio - a.precio)
  if (orden === 'nombre') filtrados = [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre))

  const mostrarSkeleton = cargando || filtrando

  return (
    <div className="container py-4">
      <Breadcrumb items={[{ label: 'Inicio', path: '/' }, { label: 'Catálogo' }]} />
      <h2 className="section-title">Catálogo</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control filter-input"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select filter-input"
            value={categoria}
            onChange={(e) => handleCategoria(e.target.value)}
          >
            {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select filter-input"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="default">Ordenar por...</option>
            <option value="precio-asc">Precio: menor a mayor</option>
            <option value="precio-desc">Precio: mayor a menor</option>
            <option value="nombre">Nombre A→Z</option>
          </select>
        </div>
      </div>

      {mostrarSkeleton ? (
        <SkeletonList />
      ) : filtrados.length > 0 ? (
        <>
          <p className="results-count">{filtrados.length} productos encontrados</p>
          <ProductList
            products={filtrados}
            favoritos={favoritos}
            onToggleFavorito={onToggleFavorito}
          />
        </>
      ) : (
        <div className="text-center py-5">
          <p style={{ color: 'var(--text-muted)' }}>No se encontraron productos para "{busqueda}".</p>
          <button className="btn-fav mt-2" onClick={() => { setBusqueda(''); setCategoria('Todas') }}>
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  )
}

export default Catalogo