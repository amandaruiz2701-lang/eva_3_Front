import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import useForm from '../hooks/useForm'
import FormField from '../components/FormField'
import Breadcrumb from '../components/Breadcrumb'
import PageTransition from '../components/PageTransition'

const validacionesPerfil = {
  nombre: (v) => {
    if (!v?.trim()) return 'El nombre es obligatorio.'
    if (v.trim().length < 2) return 'Mínimo 2 caracteres.'
  },
  email: (v) => {
    if (!v) return 'El correo es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Correo inválido.'
  },
}

const validacionesPassword = {
  passwordActual: (v) => {
    if (!v) return 'Ingresa tu contraseña actual.'
  },
  passwordNuevo: (v) => {
    if (!v) return 'Ingresa la nueva contraseña.'
    if (v.length < 6) return 'Mínimo 6 caracteres.'
    if (!/[A-Z]/.test(v)) return 'Debe incluir al menos una mayúscula.'
    if (!/[0-9]/.test(v)) return 'Debe incluir al menos un número.'
  },
  confirmarPassword: (v, values) => {
    if (!v) return 'Confirma la nueva contraseña.'
    if (v !== values.passwordNuevo) return 'Las contraseñas no coinciden.'
  },
}

function Perfil() {
  const { usuario, actualizarPerfil, cambiarPassword } = useAuth()
  const { showToast } = useToast()
  const { historial } = useCart()
  const [seccion, setSeccion] = useState('info')

  const formPerfil = useForm(
    { nombre: usuario?.nombre || '', email: usuario?.email || '' },
    validacionesPerfil
  )

  const formPassword = useForm(
    { passwordActual: '', passwordNuevo: '', confirmarPassword: '' },
    validacionesPassword
  )

  const handleGuardarPerfil = (e) => {
    e.preventDefault()
    if (!formPerfil.validarTodo()) return
    const resultado = actualizarPerfil(formPerfil.values.nombre, formPerfil.values.email)
    if (resultado.ok) {
      showToast('Perfil actualizado ✓')
    } else {
      showToast(resultado.mensaje, 'error')
    }
  }

  const handleCambiarPassword = (e) => {
    e.preventDefault()
    if (!formPassword.validarTodo()) return
    const resultado = cambiarPassword(formPassword.values.passwordActual, formPassword.values.passwordNuevo)
    if (resultado.ok) {
      showToast('Contraseña actualizada ✓')
      formPassword.resetForm()
    } else {
      showToast(resultado.mensaje, 'error')
    }
  }

  const tabs = [
    { id: 'info', label: '👤 Información' },
    { id: 'password', label: '🔒 Contraseña' },
    { id: 'resumen', label: '📦 Resumen' },
  ]

  return (
    <PageTransition>
      <div className="container py-5">
        <Breadcrumb items={[{ label: 'Inicio', path: '/' }, { label: 'Mi perfil' }]} />

      <div className="perfil-layout">

        {/* Sidebar */}
        <div className="perfil-sidebar">
          <div className="perfil-avatar">
            {usuario?.nombre?.charAt(0).toUpperCase()}
          </div>
          <h5 className="mt-3 mb-0">{usuario?.nombre}</h5>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{usuario?.email}</p>

          <div className="perfil-tabs mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`perfil-tab ${seccion === tab.id ? 'active' : ''}`}
                onClick={() => setSeccion(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="perfil-content">

          {/* Información personal */}
          {seccion === 'info' && (
            <div>
              <h4 className="mb-4">Información personal</h4>
              <form onSubmit={handleGuardarPerfil} className="d-flex flex-column gap-3" noValidate>
                <FormField
                  label="Nombre completo"
                  name="nombre"
                  placeholder="Tu nombre"
                  value={formPerfil.values.nombre}
                  onChange={formPerfil.handleChange}
                  onBlur={formPerfil.handleBlur}
                  error={formPerfil.errors.nombre}
                  touched={formPerfil.touched.nombre}
                />
                <FormField
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={formPerfil.values.email}
                  onChange={formPerfil.handleChange}
                  onBlur={formPerfil.handleBlur}
                  error={formPerfil.errors.email}
                  touched={formPerfil.touched.email}
                />
                <button type="submit" className="btn-cart align-self-start px-4 py-2 mt-1">
                  Guardar cambios
                </button>
              </form>
            </div>
          )}

          {/* Cambiar contraseña */}
          {seccion === 'password' && (
            <div>
              <h4 className="mb-4">Cambiar contraseña</h4>
              <form onSubmit={handleCambiarPassword} className="d-flex flex-column gap-3" noValidate>
                <FormField
                  label="Contraseña actual"
                  name="passwordActual"
                  type="password"
                  placeholder="••••••••"
                  value={formPassword.values.passwordActual}
                  onChange={formPassword.handleChange}
                  onBlur={formPassword.handleBlur}
                  error={formPassword.errors.passwordActual}
                  touched={formPassword.touched.passwordActual}
                />
                <FormField
                  label="Nueva contraseña"
                  name="passwordNuevo"
                  type="password"
                  placeholder="Mín. 6 caracteres, 1 mayúscula y 1 número"
                  value={formPassword.values.passwordNuevo}
                  onChange={formPassword.handleChange}
                  onBlur={formPassword.handleBlur}
                  error={formPassword.errors.passwordNuevo}
                  touched={formPassword.touched.passwordNuevo}
                />

                {/* Barra de fuerza */}
                {formPassword.values.passwordNuevo && (
                  <PasswordStrength password={formPassword.values.passwordNuevo} />
                )}

                <FormField
                  label="Confirmar nueva contraseña"
                  name="confirmarPassword"
                  type="password"
                  placeholder="Repite la nueva contraseña"
                  value={formPassword.values.confirmarPassword}
                  onChange={formPassword.handleChange}
                  onBlur={formPassword.handleBlur}
                  error={formPassword.errors.confirmarPassword}
                  touched={formPassword.touched.confirmarPassword}
                />
                <button type="submit" className="btn-cart align-self-start px-4 py-2 mt-1">
                  Actualizar contraseña
                </button>
              </form>
            </div>
          )}

          {/* Resumen de actividad */}
          {seccion === 'resumen' && (
            <div>
              <h4 className="mb-4">Resumen de actividad</h4>
              <div className="resumen-stats">
                <div className="stat-card">
                  <span className="stat-number">{historial.length}</span>
                  <span className="stat-label">Pedidos realizados</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">
                    ${historial.reduce((acc, p) => acc + p.total, 0).toLocaleString()}
                  </span>
                  <span className="stat-label">Total gastado</span>
                </div>
                <div className="stat-card">
                  <span className="stat-number">
                    {historial.reduce((acc, p) => acc + p.items.length, 0)}
                  </span>
                  <span className="stat-label">Productos comprados</span>
                </div>
              </div>

              {historial.length > 0 ? (
                <div className="mt-4">
                  <h6 className="mb-3" style={{ color: 'var(--text-muted)' }}>Último pedido</h6>
                  <div className="ultimo-pedido">
                    {historial[0].items.map((item) => (
                      <div key={item.id} className="sidebar-item">
                        <img
                          src={item.imagenes?.[0] || item.imagen}
                          alt={item.nombre}
                          className="sidebar-img"
                        />
                        <div className="flex-grow-1">
                          <p className="m-0" style={{ fontSize: '0.88rem' }}>{item.nombre}</p>
                          <span className="category">x{item.cantidad}</span>
                        </div>
                        <span className="price" style={{ fontSize: '0.9rem' }}>
                          ${(item.precio * item.cantidad).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Link to="/historial" className="btn-fav d-inline-block mt-3">
                    Ver todos los pedidos →
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p style={{ color: 'var(--text-muted)' }}>Aún no has realizado pedidos.</p>
                  <Link to="/catalogo" className="btn-fav">Ir al catálogo</Link>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
    </PageTransition>
  )
}

function PasswordStrength({ password }) {
  const calcularFuerza = (p) => {
    let puntos = 0
    if (p.length >= 6) puntos++
    if (p.length >= 10) puntos++
    if (/[A-Z]/.test(p)) puntos++
    if (/[0-9]/.test(p)) puntos++
    if (/[^A-Za-z0-9]/.test(p)) puntos++
    return puntos
  }

  const fuerza = calcularFuerza(password)
  const niveles = ['Muy débil', 'Débil', 'Regular', 'Buena', 'Fuerte']
  const colores = ['#ff5c7a', '#ff9f43', '#ffd32a', '#00F5D4', '#8B5CF6']
  const idx = Math.max(0, Math.min(4, fuerza - 1))

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className="strength-bar"
            style={{ background: n <= fuerza ? colores[idx] : 'var(--border)' }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: colores[idx] }}>
        {niveles[Math.max(0, fuerza - 1)]}
      </span>
    </div>
  )
}

export default Perfil