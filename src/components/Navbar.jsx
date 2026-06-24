import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

function Navbar({ cantidadFavoritos }) {
  const { cantidadTotal } = useCart()
  const { usuario, cerrarSesion } = useAuth()
  const [abierto, setAbierto] = useState(false)

  const linkClass = ({ isActive }) => `nav-link-custom ${isActive ? 'active' : ''}`
  const cerrarMenu = () => setAbierto(false)

  return (
    <nav className="navbar navbar-custom sticky-top">
      <div className="container">
        <div className="navbar-inner">

          {/* Brand — extremo izquierdo */}
          <NavLink
            to="/"
            className="brand d-flex align-items-center gap-2"
            onClick={cerrarMenu}
            style={{ flexShrink: 0 }}
          >
            <Logo width={28} height={33} />
            Tech<span className="brand-accent">Nova</span>
          </NavLink>

          {/* Todo lo demás — extremo derecho */}
          <div className="navbar-right">

            {/* Links desktop */}
            <div className="nav-links d-none d-md-flex">
              <NavLink to="/" className={linkClass} end>Inicio</NavLink>
              <NavLink to="/catalogo" className={linkClass}>Catálogo</NavLink>
              {usuario && (
                <NavLink to="/favoritos" className={linkClass}>Favoritos</NavLink>
              )}
              <NavLink to="/contacto" className={linkClass}>Contacto</NavLink>
            </div>

            {/* Acciones desktop */}
            <div className="nav-actions d-none d-md-flex">
              <ThemeToggle />
              {usuario ? (
                <>
                  <NavLink to="/favoritos" className="nav-pill">
                    <span className="pill-icon">♡</span>
                    <span>{cantidadFavoritos}</span>
                  </NavLink>
                  <NavLink to="/carrito" className="nav-pill nav-pill-accent">
                    <span className="pill-icon">🛒</span>
                    <span>{cantidadTotal}</span>
                  </NavLink>
                  <NavLink to="/historial" className="nav-pill">
                    <span className="pill-icon">📦</span>
                    <span>Pedidos</span>
                  </NavLink>
                  <div className="nav-user">
                    <NavLink to="/perfil" className="user-nombre" style={{ textDecoration: 'none' }}>
                      {usuario.nombre.split(' ')[0]}
                    </NavLink>
                    <button className="btn-salir" onClick={cerrarSesion}>Salir</button>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/carrito" className="nav-pill nav-pill-accent">
                    <span className="pill-icon">🛒</span>
                    <span>{cantidadTotal}</span>
                  </NavLink>
                  <NavLink to="/login" className="nav-pill">Ingresar</NavLink>
                  <NavLink to="/registro" className="nav-pill nav-pill-accent">Registrarse</NavLink>
                </>
              )}
            </div>

            {/* Hamburguesa + toggle mobile — extremo derecho */}
            <div className="d-flex d-md-none align-items-center gap-2">
              <ThemeToggle />
              <button
                className="hamburger"
                onClick={() => setAbierto((a) => !a)}
                aria-label="Abrir menú"
              >
                {abierto ? '✕' : '☰'}
              </button>
            </div>

          </div>
        </div>

        {/* Menú mobile */}
        {abierto && (
          <div className="mobile-menu">
            <NavLink to="/" className={linkClass} end onClick={cerrarMenu}>Inicio</NavLink>
            <NavLink to="/catalogo" className={linkClass} onClick={cerrarMenu}>Catálogo</NavLink>
            <NavLink to="/contacto" className={linkClass} onClick={cerrarMenu}>Contacto</NavLink>

            <div className="mobile-divider" />

            {usuario ? (
              <>
                <NavLink to="/favoritos" className={linkClass} onClick={cerrarMenu}>
                  ♡ Favoritos {cantidadFavoritos > 0 && `(${cantidadFavoritos})`}
                </NavLink>
                <NavLink to="/carrito" className={linkClass} onClick={cerrarMenu}>
                  🛒 Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}
                </NavLink>
                <NavLink to="/historial" className={linkClass} onClick={cerrarMenu}>
                  📦 Mis pedidos
                </NavLink>
                <NavLink to="/perfil" className={linkClass} onClick={cerrarMenu}>
                  👤 Mi perfil
                </NavLink>
                <div className="mobile-divider" />
                <div className="mobile-user">
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    Hola, <strong style={{ color: 'var(--text)' }}>{usuario.nombre.split(' ')[0]}</strong>
                  </span>
                  <button className="btn-salir" onClick={() => { cerrarSesion(); cerrarMenu() }}>
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/carrito" className={linkClass} onClick={cerrarMenu}>
                  🛒 Carrito {cantidadTotal > 0 && `(${cantidadTotal})`}
                </NavLink>
                <NavLink to="/login" className={linkClass} onClick={cerrarMenu}>Ingresar</NavLink>
                <NavLink to="/registro" className={linkClass} onClick={cerrarMenu}>Registrarse</NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar