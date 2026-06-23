import ProductCard from './ProductCard'

function ProductList({ products, favoritos, onToggleFavorito }) {
  return (
    <div className="row g-4">
      {products.map((p) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
          <ProductCard
            product={p}
            esFavorito={favoritos.includes(p.id)}
            onToggleFavorito={onToggleFavorito}
          />
        </div>
      ))}
    </div>
  )
}

export default ProductList