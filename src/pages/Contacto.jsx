import { useToast } from '../context/ToastContext'
import useForm from '../hooks/useForm'
import FormField from '../components/FormField'
import Breadcrumb from '../components/Breadcrumb'
import PageTransition from '../components/PageTransition'

const validaciones = {
  nombre: (v) => { if (!v?.trim()) return 'El nombre es obligatorio.' },
  email: (v) => {
    if (!v) return 'El correo es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Ingresa un correo válido.'
  },
  asunto: (v) => { if (!v?.trim()) return 'El asunto es obligatorio.' },
  mensaje: (v) => {
    if (!v?.trim()) return 'El mensaje es obligatorio.'
    if (v.trim().length < 20) return 'El mensaje debe tener al menos 20 caracteres.'
  },
}

function Contacto() {
  const { showToast } = useToast()
  const { values, errors, touched, handleChange, handleBlur, validarTodo, resetForm } = useForm(
    { nombre: '', email: '', asunto: '', mensaje: '' },
    validaciones
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarTodo()) return
    showToast('Mensaje enviado, te responderemos pronto ✓')
    resetForm()
  }

  return (
    <PageTransition>
      <div className="container py-5" style={{ maxWidth: 600 }}>
        <Breadcrumb items={[{ label: 'Inicio', path: '/' }, { label: 'Contacto' }]} />
        <h2 className="section-title">Contacto</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          ¿Tienes alguna consulta? Escríbenos y te responderemos a la brevedad.
      </p>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <FormField
              label="Nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.nombre}
              touched={touched.nombre}
            />
          </div>
          <div className="col-md-6">
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
          </div>
        </div>

        <FormField
          label="Asunto"
          name="asunto"
          placeholder="¿En qué podemos ayudarte?"
          value={values.asunto}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.asunto}
          touched={touched.asunto}
        />

        <div className="form-field">
          <label className="form-label-custom">Mensaje</label>
          <textarea
            className={`form-control filter-input ${
              touched.mensaje && errors.mensaje ? 'input-error' :
              touched.mensaje && !errors.mensaje ? 'input-ok' : ''
            }`}
            name="mensaje"
            rows={5}
            placeholder="Escribe tu mensaje aquí..."
            value={values.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.mensaje && errors.mensaje && (
            <span className="field-error">{errors.mensaje}</span>
          )}
        </div>

        <button type="submit" className="btn-cart align-self-start px-4 py-2">
          Enviar mensaje
        </button>
      </form>
      </div>
    </PageTransition>
  )
}

export default Contacto