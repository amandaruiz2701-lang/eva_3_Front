import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import ProductList from '../components/ProductList'
import ProductCarousel from '../components/ProductCarousel'
import PageTransition from '../components/PageTransition'
import { staggerContainer, staggerItem } from '../utils/animations'

const CATEGORIAS = [
  { nombre: 'Audio', icono: '🎧' },
  { nombre: 'Fotografía', icono: '📷' },
  { nombre: 'Computación', icono: '💻' },
  { nombre: 'Gaming', icono: '🎮' },
  { nombre: 'Telefonía', icono: '📱' },
  { nombre: 'Wearables', icono: '⌚' },
  { nombre: 'Hogar', icono: '🏠' },
  { nombre: 'Accesorios', icono: '🔌' },
]

const BENEFICIOS = [
  { icono: '🚚', titulo: 'Envío rápido', descripcion: 'Despacho en 24 a 48 horas hábiles a todo el país.' },
  { icono: '🛡️', titulo: 'Garantía oficial', descripcion: '12 meses de garantía en todos nuestros productos.' },
  { icono: '💬', titulo: 'Soporte 24/7', descripcion: 'Equipo de atención disponible todos los días del año.' },
  { icono: '🔄', titulo: 'Devoluciones', descripcion: 'Cambios y devoluciones sin costo dentro de los 30 días.' },
]

function Home({ products, favoritos = [], onToggleFavorito = () => {} }) {
  const masVendidos = products.slice(4, 8)

  return (
    <PageTransition>
      {/* Hero */}
      <Hero />

      {/* Carrusel de destacados */}
      <section className="home-section">
        <div className="container">
          <ProductCarousel
            products={products}
            favoritos={favoritos}
            onToggleFavorito={onToggleFavorito}
            titulo="✦ Productos destacados"
          />
        </div>
      </section>

      {/* Categorías */}
      <section className="home-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Explorar por categoría</h2>
            <Link to="/catalogo" className="section-link">Ver todo →</Link>
          </div>
          <motion.div
            className="categorias-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {CATEGORIAS.map((cat) => (
              <motion.div key={cat.nombre} variants={staggerItem}>
                <Link to={`/catalogo`} className="categoria-card">
                  <span className="categoria-icono">{cat.icono}</span>
                  <span className="categoria-nombre">{cat.nombre}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Banner cupón */}
      <section className="home-banner">
        <div className="container">
          <div className="banner-card">
            <div className="banner-glow" />
            <div className="banner-content">
              <span className="banner-tag">Oferta especial</span>
              <h3 className="banner-title">Hasta 20% de descuento</h3>
              <p className="banner-desc">
                Usá el código <strong>PROMO20</strong> en tu próxima compra y ahorrá en los mejores productos de tecnología.
              </p>
              <Link to="/catalogo" className="btn-cart px-4 py-2">
                Aprovechar oferta →
              </Link>
            </div>
            <div className="banner-emoji">⚡</div>
          </div>
        </div>
      </section>

      {/* Más vendidos */}
      {masVendidos.length > 0 && (
        <section className="home-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">🔥 Más vendidos</h2>
              <Link to="/catalogo" className="section-link">Ver todos →</Link>
            </div>
            <ProductList
              products={masVendidos}
              favoritos={favoritos}
              onToggleFavorito={onToggleFavorito}
            />
          </div>
        </section>
      )}

      {/* Beneficios */}
      <section className="home-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">¿Por qué elegirnos?</h2>
          <motion.div
            className="beneficios-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {BENEFICIOS.map((b) => (
              <motion.div key={b.titulo} className="beneficio-card" variants={staggerItem}>
                <span className="beneficio-icono">{b.icono}</span>
                <h5 className="beneficio-titulo">{b.titulo}</h5>
                <p className="beneficio-desc">{b.descripcion}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="home-cta">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="cta-title">¿Listo para encontrar tu próximo producto favorito?</h2>
            <p className="cta-desc">Registrate gratis y accedé a ofertas exclusivas.</p>
            <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
              <Link to="/registro" className="btn-cart px-4 py-2">Crear cuenta gratis</Link>
              <Link to="/catalogo" className="btn-fav px-4 py-2">Explorar catálogo</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Home