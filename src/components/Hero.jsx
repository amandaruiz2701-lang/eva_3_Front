import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="hero">
      

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        Tu setup,<br />
        <span className="accent">al siguiente nivel</span>
      </motion.h1>

      

      <motion.div
        className="hero-actions"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      >
        <Link to="/catalogo" className="btn-cart px-4 py-2">
          Ver catálogo →
        </Link>
        <Link to="/registro" className="btn-fav px-4 py-2">
          Crear cuenta gratis
        </Link>
      </motion.div>

      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="hero-stat">
          <span className="hero-stat-number">10+</span>
          <span className="hero-stat-label">Productos</span>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span className="hero-stat-number">100%</span>
          <span className="hero-stat-label">Garantía</span>
        </div>
        <div className="hero-stat-divider" />
        <div className="hero-stat">
          <span className="hero-stat-number">24/7</span>
          <span className="hero-stat-label">Soporte</span>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero