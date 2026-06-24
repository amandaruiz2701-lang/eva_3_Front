function FilterPanel({ products, filtros, setFiltros, onLimpiar }) {
  const precioMax = Math.max(...products.map((p) => p.precio))
  const precioMin = Math.min(...products.map((p) => p.precio))

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <span className="filter-panel-title">Filtros</span>
        <button className="filter-limpiar" onClick={onLimpiar}>
          Limpiar todo
        </button>
      </div>

      {/* Rango de precio */}
      <div className="filter-group">
        <label className="filter-group-label">Precio</label>
        <div className="price-range-values">
          <span>${filtros.precioMin.toLocaleString()}</span>
          <span>${filtros.precioMax.toLocaleString()}</span>
        </div>
        <div className="range-track">
          <input
            type="range"
            className="range-input range-min"
            min={precioMin}
            max={precioMax}
            step={1000}
            value={filtros.precioMin}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (val < filtros.precioMax) {
                setFiltros((f) => ({ ...f, precioMin: val }))
              }
            }}
          />
          <input
            type="range"
            className="range-input range-max"
            min={precioMin}
            max={precioMax}
            step={1000}
            value={filtros.precioMax}
            onChange={(e) => {
              const val = Number(e.target.value)
              if (val > filtros.precioMin) {
                setFiltros((f) => ({ ...f, precioMax: val }))
              }
            }}
          />
          <div
            className="range-fill"
            style={{
              left: `${((filtros.precioMin - precioMin) / (precioMax - precioMin)) * 100}%`,
              right: `${100 - ((filtros.precioMax - precioMin) / (precioMax - precioMin)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Rating mínimo */}
      <div className="filter-group">
        <label className="filter-group-label">Calificación mínima</label>
        <div className="rating-filters">
          {[0, 3, 4, 5].map((r) => (
            <button
              key={r}
              className={`rating-filter-btn ${filtros.ratingMin === r ? 'active' : ''}`}
              onClick={() => setFiltros((f) => ({ ...f, ratingMin: r }))}
            >
              {r === 0 ? 'Todas' : `${'★'.repeat(r)} o más`}
            </button>
          ))}
        </div>
      </div>

      {/* Solo con stock */}
      <div className="filter-group">
        <label className="filter-group-label">Disponibilidad</label>
        <label className="filter-toggle">
          <input
            type="checkbox"
            checked={filtros.soloConStock}
            onChange={(e) => setFiltros((f) => ({ ...f, soloConStock: e.target.checked }))}
          />
          <span className="toggle-track">
            <span className="toggle-thumb" />
          </span>
          Solo con stock disponible
        </label>
      </div>
    </div>
  )
}

export default FilterPanel