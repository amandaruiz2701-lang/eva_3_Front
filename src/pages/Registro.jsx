import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import useForm from '../hooks/useForm'
import FormField from '../components/FormField'
import PageTransition from '../components/PageTransition'

const validaciones = {
  nombre: (v) => {
    if (!v?.trim()) return 'El nombre es obligatorio.'
    if (v.trim().length < 2) return 'Mínimo 2 caracteres.'
  },
  email: (v) => {
    if (!v) return 'El correo es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Ingresa un correo válido.'
  },
  password: (v) => {
    if (!v) return 'La contraseña es obligatoria.'
    if (v.length < 6) return 'Mínimo 6 caracteres.'
    if (!/[A-Z]/.test(v)) return 'Debe incluir al menos una mayúscula.'
    if (!/[0-9]/.test(v)) return 'Debe incluir al menos un número.'
  },
  confirmar: (v, values) => {
    if (!v) return 'Confirma tu contraseña.'
    if (v !== values.password) return 'Las contraseñas no coinciden.'
  },
}

function Registro() {
  const { registrar } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const { values, errors, touched, handleChange, handleBlur, validarTodo } = useForm(
    { nombre: '', email: '', password: '', confirmar: '' },
    validaciones
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarTodo()) return
    const resultado = registrar(values.nombre, values.email, values.password)
    if (resultado.ok) {
      showToast('Cuenta creada con éxito 🎉')
      navigate('/')
    } else {
      showToast(resultado.mensaje, 'error')
    }
  }

  return (
    <PageTransition>
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="section-title text-center mb-4">Crear cuenta</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" noValidate>
            <FormField
              label="Nombre completo"
            name="nombre"
            placeholder="Juan Pérez"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.nombre}
            touched={touched.nombre}
          />
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
            placeholder="Mín. 6 caracteres, 1 mayúscula y 1 número"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touched={touched.password}
          />
          <FormField
            label="Confirmar contraseña"
            name="confirmar"
            type="password"
            placeholder="Repite tu contraseña"
            value={values.confirmar}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmar}
            touched={touched.confirmar}
          />
          <button type="submit" className="btn-cart w-100 py-2 mt-1">
            Crear cuenta
          </button>
        </form>
        <p className="text-center mt-3" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: 'var(--accent-2)' }}>Iniciar sesión</Link>
        </p>
      </div>
    </div>
    </PageTransition>
  )
}

export default Registro