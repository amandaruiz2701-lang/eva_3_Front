import { useState } from 'react'
import ProductList from '../components/ProductList'
import SkeletonList from '../components/SkeletonList'
import Breadcrumb from '../components/Breadcrumb'
import FilterPanel from '../components/FilterPanel'
import PageTransition from '../components/PageTransition'

const FILTROS_INICIALES = (products) => ({
  precioMin: Math.min(...products.map((p) => p.precio)),
  precioMax: Math.max(...products.map((p) => p.precio)),
  ratingMin: 0,
  soloConStock: false,
})

function Catalogo({ products, cargando, favoritos, onToggleFavorito }) {
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [orden, setOrden] = useState('default')
  const [filtrando, setFiltrando] = useState(false)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [filtros, setFiltros] = useState(() => FILTROS_INICIALES(products))

  const categorias = ['Todas', ...new Set(products.map((p) => p.categoria))]

  const handleCategoria = (cat) => {
    setFiltrando(true)
    setTimeout(() => { setCategoria(cat); setFiltrando(false) }, 500)
  }

  const limpiarFiltros = () => {
    setBusqueda('')
    setCategoria('Todas')
    setOrden('default')
    setFiltros(FILTROS_INICIALES(products))
  }

  // ---- aplicar filtros ----
  let filtrados = products.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoria === 'Todas' || p.categoria === categoria
    const coincidePrecio = p.precio >= filtros.precioMin && p.precio <= filtros.precioMax
    const coincideRating = filtros.ratingMin === 0 || (p.rating?.rate || 0) >= filtros.ratingMin
    const coincideStock = !filtros.soloConStock || p.stock > 0
    return coincideNombre && coincideCategoria && coincidePrecio && coincideRating && coincideStock
  })

  if (orden === 'precio-asc') filtrados = [...filtrados].sort((a, b) => a.precio - b.precio)
  if (orden === 'precio-desc') filtrados = [...filtrados].sort((a, b) => b.precio - a.precio)
  if (orden === 'nombre') filtrados = [...filtrados].sort((a, b) => a.nombre.localeCompare(b.nombre))
  if (orden === 'rating') filtrados = [...filtrados].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))

  const mostrarSkeleton = cargando || filtrando

  // contar filtros activos
  const filtrosActivos = [
    categoria !== 'Todas',
    filtros.ratingMin > 0,
    filtros.soloConStock,
    filtros.precioMin > Math.min(...products.map((p) => p.precio)),
    filtros.precioMax < Math.max(...products.map((p) => p.precio)),
  ].filter(Boolean).length

  return (
    <PageTransition>
      <div className="container py-4">
        <Breadcrumb items={[{ label: 'Inicio', path: '/' }, { label: 'Catálogo' }]} />
        <h2 className="section-title">Catálogo</h2>

        {/* Barra de controles */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control filter-input"
              placeholder="Buscar producto..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select filter-input"
              value={categoria}
              onChange={(e) => handleCategoria(e.target.value)}
            >
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <select
              className="form-select filter-input"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="default">Ordenar por...</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A→Z</option>
              <option value="rating">Mejor calificación</option>
            </select>
          </div>
          <div className="col-md-2">
            <button
              className={`btn-filtros w-100 ${mostrarFiltros ? 'active' : ''}`}
              onClick={() => setMostrarFiltros((v) => !v)}
            >
              ⚙ Filtros
              {filtrosActivos > 0 && (
                <span className="filtros-badge">{filtrosActivos}</span>
              )}
            </button>
          </div>
        </div>

        {/* Panel de filtros */}
        {mostrarFiltros && (
          <FilterPanel
            products={products}
            filtros={filtros}
            setFiltros={setFiltros}
            onLimpiar={limpiarFiltros}
          />
        )}

        {/* Resultados */}
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
            <p style={{ color: 'var(--text-muted)' }}>
              No se encontraron productos con los filtros seleccionados.
            </p>
            <button className="btn-fav mt-2" onClick={limpiarFiltros}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </PageTransition>
  )
}

export default Catalogo