import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../context/ToastContext'
import Logo from './Logo'

function Footer() {
  const { showToast } = useToast()
  const [email, setEmail] = useState('')

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    showToast('¡Suscrito con éxito! Pronto recibirás novedades 📬')
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="container">

        {/* Grid principal */}
        <div className="footer-grid">

          {/* Col 1 — Logo + descripción */}
          <div className="footer-col footer-col-brand">
            <Link to="/" className="footer-brand">
              <Logo width={28} height={33} />
              <span>Tech<span className="brand-accent">Nova</span></span>
            </Link>
            <p className="footer-desc">
              Productos de tecnología seleccionados para quienes no se conforman con lo estándar.
              Calidad, garantía y soporte en cada compra.
            </p>
            <div className="footer-social">
              <a href="#" className="social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="Twitter / X">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Links */}
          <div className="footer-col">
            <h6 className="footer-col-title">Tienda</h6>
            <ul className="footer-links">
              <li><Link to="/catalogo">Catálogo</Link></li>
              <li><Link to="/catalogo">Ofertas</Link></li>
              <li><Link to="/catalogo">Nuevos productos</Link></li>
              <li><Link to="/catalogo">Más vendidos</Link></li>
            </ul>
            <h6 className="footer-col-title mt-4">Cuenta</h6>
            <ul className="footer-links">
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/registro">Registrarse</Link></li>
              <li><Link to="/perfil">Mi perfil</Link></li>
              <li><Link to="/historial">Mis pedidos</Link></li>
              <li><Link to="/favoritos">Favoritos</Link></li>
            </ul>
          </div>

          {/* Col 3 — Contacto */}
          <div className="footer-col">
            <h6 className="footer-col-title">Contacto</h6>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>Av. Tecnología 1234, Santiago, Chile</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <a href="tel:+56912345678">+56 9 1234 5678</a>
              </li>
              <li>
                <span className="contact-icon">✉️</span>
                <a href="mailto:hola@technova.cl">hola@technova.cl</a>
              </li>
              <li>
                <span className="contact-icon">🕐</span>
                <span>Lun – Vie, 9:00 – 18:00</span>
              </li>
            </ul>

            <h6 className="footer-col-title mt-4">Legal</h6>
            <ul className="footer-links">
              <li><Link to="/contacto">Términos y condiciones</Link></li>
              <li><Link to="/contacto">Política de privacidad</Link></li>
              <li><Link to="/contacto">Política de devoluciones</Link></li>
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div className="footer-col">
            <h6 className="footer-col-title">Newsletter</h6>
            <p className="footer-newsletter-desc">
              Suscríbete y recibe ofertas exclusivas, novedades y tips de tecnología directo en tu correo.
            </p>
            <form onSubmit={handleNewsletter} className="footer-newsletter-form">
              <input
                type="email"
                className="footer-newsletter-input"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-newsletter-btn">
                Suscribir →
              </button>
            </form>
            <p className="footer-newsletter-nota">
              Sin spam. Puedes cancelar cuando quieras.
            </p>

            {/* Métodos de pago */}
            <h6 className="footer-col-title mt-4">Pagos aceptados</h6>
            <div className="footer-pagos">
              {['Visa', 'MC', 'Amex', 'PayPal'].map((p) => (
                <span key={p} className="pago-badge">{p}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Tech<span style={{ color: 'var(--accent-2)' }}>Nova</span>. Todos los derechos reservados.
          </p>
          <div className="footer-bottom-links">
            <Link to="/contacto">Privacidad</Link>
            <Link to="/contacto">Términos</Link>
            <Link to="/contacto">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer