import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

function Navbar({ cantidadFavoritos }) {
  const { cantidadTotal } = useCart()
  const [abierto, setAbierto] = useState(false)
  const linkClass = ({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`
  const cerrarMenu = () => setAbierto(false)
  const { usuario, cerrarSesion } = useAuth()

  return (
    <nav className="navbar navbar-custom sticky-top">
      <div className="container">
        <div className="navbar-inner">
          <NavLink to="/" className="brand d-flex align-items-center gap-2" onClick={cerrarMenu}>
            <Logo width={32} height={38} />
            Tech<span className="brand-accent">Nova</span>
          </NavLink>

          <div className="nav-links d-none d-md-flex">
            <NavLink to="/" className={linkClass} end>Inicio</NavLink>
            <NavLink to="/catalogo" className={linkClass}>Catálogo</NavLink>
            <NavLink to="/favoritos" className={linkClass}>Favoritos</NavLink>
            <NavLink to="/contacto" className={linkClass}>Contacto</NavLink>
          </div>

          <div className="nav-actions">
            <NavLink to="/favoritos" className="nav-pill d-none d-md-flex">
              <span className="pill-icon">♡</span>
              <span>{cantidadFavoritos}</span>
            </NavLink>
            <NavLink to="/carrito" className="nav-pill nav-pill-accent d-none d-md-flex">
              <span className="pill-icon">🛒</span>
              <span>{cantidadTotal}</span>
            </NavLink>

            {usuario ? (
              <div className="user-menu d-none d-md-flex">
                <NavLink to="/historial" className="nav-pill">📦 Mis pedidos</NavLink>
                <button className="nav-pill btn-cerrar" onClick={cerrarSesion}>
                  Salir
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="nav-pill nav-pill-accent d-none d-md-flex">
                Ingresar
              </NavLink>
            )}

            <button className="hamburger d-md-none" onClick={() => setAbierto((a) => !a)}>
              {abierto ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {abierto && (
          <div className="mobile-menu">
            <NavLink to="/" className={linkClass} end onClick={cerrarMenu}>Inicio</NavLink>
            <NavLink to="/catalogo" className={linkClass} onClick={cerrarMenu}>Catálogo</NavLink>
            <NavLink to="/favoritos" className={linkClass} onClick={cerrarMenu}>
              Favoritos ♡ {cantidadFavoritos}
            </NavLink>
            <NavLink to="/carrito" className={linkClass} onClick={cerrarMenu}>
              Carrito 🛒 {cantidadTotal}
            </NavLink>
            <NavLink to="/contacto" className={linkClass} onClick={cerrarMenu}>Contacto</NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar