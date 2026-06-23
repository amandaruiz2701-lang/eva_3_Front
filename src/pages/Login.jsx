import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

function Login() {
  const { iniciarSesion } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const resultado = iniciarSesion(form.email, form.password)
    if (resultado.ok) {
      showToast('Bienvenido de nuevo 👋')
      navigate('/')
    } else {
      setError(resultado.mensaje)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="section-title text-center">Iniciar sesión</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
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
          <button type="submit" className="btn-cart w-100 py-2">
            Ingresar
          </button>
        </form>

        <p className="text-center mt-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          ¿No tenés cuenta?{' '}
          <Link to="/registro" style={{ color: 'var(--accent-2)' }}>Registrarse</Link>
        </p>
      </div>
    </div>
  )
}

export default Login