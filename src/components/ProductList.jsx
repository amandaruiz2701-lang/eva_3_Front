import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '../utils/animations'
import ProductCard from './ProductCard'

function ProductList({ products, favoritos, onToggleFavorito }) {
  return (
    <motion.div
      className="row g-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {products.map((p) => (
        <motion.div
          className="col-12 col-sm-6 col-md-4 col-lg-3"
          key={p.id}
          variants={staggerItem}
        >
          <ProductCard
            product={p}
            esFavorito={favoritos.includes(p.id)}
            onToggleFavorito={onToggleFavorito}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default ProductList