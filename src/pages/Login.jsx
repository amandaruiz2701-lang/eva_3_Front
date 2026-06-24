import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import useForm from '../hooks/useForm'
import FormField from '../components/FormField'
import PageTransition from '../components/PageTransition'

const validaciones = {
  email: (v) => {
    if (!v) return 'El correo es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Ingresa un correo válido.'
  },
  password: (v) => {
    if (!v) return 'La contraseña es obligatoria.'
    if (v.length < 6) return 'Mínimo 6 caracteres.'
  },
}

function Login() {
  // 1. Extraemos las funciones de los contextos y hooks correspondientes
  const { iniciarSesion } = useAuth()
  const { showToast } = useToast()
  
  const { 
    values, 
    errors, 
    touched, 
    handleChange, 
    handleBlur, 
    validarTodo 
  } = useForm({ email: '', password: '' }, validaciones)

  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.from || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarTodo()) return
    
    const resultado = iniciarSesion(values.email, values.password)
    if (resultado.ok) {
      showToast('Bienvenido de nuevo 👋')
      navigate(destino, { replace: true })  // ← vuelve a donde estaba
    } else {
      showToast(resultado.mensaje, 'error')
    }
  }

  return (
    <PageTransition>
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="section-title text-center mb-4">Iniciar sesión</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" noValidate>
            <FormField
              label="Correo electrónico"
              name="email"
              type="email"
              placeholder="tu@correo.com"
              value={values.email}
              onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <FormField
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          <button type="submit" className="btn-cart w-100 py-2 mt-1">
            Ingresar
          </button>
          </form>
          <p className="text-center mt-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            ¿No tienes cuenta?{' '}
            <Link to="/registro" style={{ color: 'var(--accent-2)' }}>Registrarse</Link>
          </p>
        </div>
      </div>
    </PageTransition>
  )
}

export default Login

