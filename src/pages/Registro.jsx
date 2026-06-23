import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function Registro() {
  const { registrar } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmar) {
      setError('Las contraseñas no coinciden.')
      return
    }
    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      return
    }
    const resultado = registrar(form.nombre, form.email, form.password)
    if (resultado.ok) {
      showToast('Cuenta creada con éxito 🎉')
      navigate('/')
    } else {
      setError(resultado.mensaje)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="section-title text-center">Crear cuenta</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input
            className="form-control filter-input"
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            className="form-control filter-input"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control filter-input"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            className="form-control filter-input"
            type="password"
            name="confirmar"
            placeholder="Confirmar contraseña"
            value={form.confirmar}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-cart w-100 py-2">
            Crear cuenta
          </button>
        </form>

        <p className="text-center mt-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--accent-2)' }}>Iniciar sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro