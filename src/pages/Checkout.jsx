import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import useForm from '../hooks/useForm'
import FormField from '../components/FormField'
import Breadcrumb from '../components/Breadcrumb'
import PageTransition from '../components/PageTransition'
import { motion } from 'framer-motion'

// ---- Constantes ----
const PASOS = ['Envío', 'Pago', 'Confirmación']

const validacionesEnvio = {
  nombre: (v) => { if (!v?.trim()) return 'El nombre es obligatorio.' },
  email: (v) => {
    if (!v) return 'El correo es obligatorio.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Correo inválido.'
  },
  direccion: (v) => { if (!v?.trim()) return 'La dirección es obligatoria.' },
  ciudad: (v) => { if (!v?.trim()) return 'La ciudad es obligatoria.' },
  codigoPostal: (v) => {
    if (!v?.trim()) return 'El código postal es obligatorio.'
    if (!/^\d{4,6}$/.test(v)) return 'Debe tener entre 4 y 6 dígitos.'
  },
  telefono: (v) => {
    if (!v?.trim()) return 'El teléfono es obligatorio.'
    if (!/^\+?[\d\s\-]{7,15}$/.test(v)) return 'Teléfono inválido.'
  },
}

const validacionesTarjeta = {
  numero: (v) => {
    if (!v) return 'El número de tarjeta es obligatorio.'
    if (v.replace(/\s/g, '').length < 16) return 'Debe tener 16 dígitos.'
  },
  vencimiento: (v) => {
    if (!v) return 'La fecha de vencimiento es obligatoria.'
    if (!/^\d{2}\/\d{2}$/.test(v)) return 'Formato MM/AA.'
    const [mes] = v.split('/')
    if (Number(mes) < 1 || Number(mes) > 12) return 'Mes inválido.'
  },
  cvv: (v) => {
    if (!v) return 'El CVV es obligatorio.'
    if (v.length < 3) return 'Debe tener 3 dígitos.'
  },
  titular: (v) => { if (!v?.trim()) return 'El nombre del titular es obligatorio.' },
}

// ---- Step Indicator ----
function StepIndicator({ pasoActual }) {
  return (
    <div className="step-indicator mb-5">
      {PASOS.map((paso, i) => (
        <div key={paso} className="step-item">
          <motion.div
            className={`step-circle ${i < pasoActual ? 'done' : ''} ${i === pasoActual ? 'active' : ''}`}
            animate={{
              scale: i === pasoActual ? 1.15 : 1,
              boxShadow: i === pasoActual
                ? '0 0 0 4px rgba(139, 92, 246, 0.25)'
                : '0 0 0 0px rgba(0,0,0,0)',
            }}
            transition={{ duration: 0.3 }}
          >
            {i < pasoActual ? '✓' : i + 1}
          </motion.div>
          <span className={`step-label ${i === pasoActual ? 'active' : ''}`}>{paso}</span>
          {i < PASOS.length - 1 && (
            <div className={`step-line ${i < pasoActual ? 'done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ---- Paso 1: Envío ----
function PasoEnvio({ datosIniciales, onSiguiente }) {
  const { values, errors, touched, handleChange, handleBlur, validarTodo } = useForm(
    datosIniciales,
    validacionesEnvio
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarTodo()) return
    onSiguiente(values)
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" noValidate>
      <h4 className="mb-3">Datos de envío</h4>
      <div className="row g-3">
        <div className="col-md-6">
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
        <div className="col-12">
          <FormField
            label="Dirección"
            name="direccion"
            placeholder="Calle, número, piso"
            value={values.direccion}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.direccion}
            touched={touched.direccion}
          />
        </div>
        <div className="col-md-6">
          <FormField
            label="Ciudad"
            name="ciudad"
            placeholder="Ciudad"
            value={values.ciudad}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.ciudad}
            touched={touched.ciudad}
          />
        </div>
        <div className="col-md-3">
          <FormField
            label="Código postal"
            name="codigoPostal"
            placeholder="12345"
            value={values.codigoPostal}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.codigoPostal}
            touched={touched.codigoPostal}
          />
        </div>
        <div className="col-md-3">
          <FormField
            label="Teléfono"
            name="telefono"
            type="tel"
            placeholder="+56 9 1234 5678"
            value={values.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.telefono}
            touched={touched.telefono}
          />
        </div>
      </div>
      <button type="submit" className="btn-cart align-self-end px-4 py-2 mt-2">
        Continuar →
      </button>
    </form>
  )
}

// ---- Paso 2: Pago ----
function PasoPago({ pago, setPago, total, onSiguiente, onAnterior }) {
  const [procesando, setProcesando] = useState(false)
  const esTarjeta = pago.metodo === 'Tarjeta de crédito' || pago.metodo === 'Tarjeta de débito'

  const { values, errors, touched, handleChange, handleBlur, validarTodo } = useForm(
    { numero: '', vencimiento: '', cvv: '', titular: '' },
    esTarjeta ? validacionesTarjeta : {}
  )

  const handleNumero = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formateado = val.match(/.{1,4}/g)?.join(' ') || val
    handleChange({ target: { name: 'numero', value: formateado } })
    setPago((p) => ({ ...p, numero: formateado }))
  }

  const handleVencimiento = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    const formateado = val.length > 2 ? `${val.slice(0, 2)}/${val.slice(2)}` : val
    handleChange({ target: { name: 'vencimiento', value: formateado } })
    setPago((p) => ({ ...p, vencimiento: formateado }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (esTarjeta && !validarTodo()) return
    setProcesando(true)
    setTimeout(() => {
      setProcesando(false)
      onSiguiente()
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-4" noValidate>
      <h4 className="mb-1">Método de pago</h4>

      <div className="metodos-pago">
        {['Tarjeta de crédito', 'Tarjeta de débito', 'Transferencia bancaria'].map((metodo) => (
          <label
            key={metodo}
            className={`metodo-item ${pago.metodo === metodo ? 'active' : ''}`}
          >
            <input
              type="radio"
              name="metodo"
              value={metodo}
              checked={pago.metodo === metodo}
              onChange={(e) => setPago((p) => ({ ...p, metodo: e.target.value }))}
              style={{ display: 'none' }}
            />
            <span className="metodo-icon">
              {metodo === 'Tarjeta de crédito' ? '💳' : metodo === 'Tarjeta de débito' ? '🏦' : '🔄'}
            </span>
            {metodo}
          </label>
        ))}
      </div>

      {esTarjeta && (
        <div className="d-flex flex-column gap-3">
          <FormField
            label="Número de tarjeta"
            name="numero"
            placeholder="4242 4242 4242 4242"
            value={values.numero}
            onChange={handleNumero}
            onBlur={handleBlur}
            error={errors.numero}
            touched={touched.numero}
            maxLength={19}
          />
          <div className="row g-3">
            <div className="col-md-6">
              <FormField
                label="Vencimiento"
                name="vencimiento"
                placeholder="MM/AA"
                value={values.vencimiento}
                onChange={handleVencimiento}
                onBlur={handleBlur}
                error={errors.vencimiento}
                touched={touched.vencimiento}
                maxLength={5}
              />
            </div>
            <div className="col-md-6">
              <FormField
                label="CVV"
                name="cvv"
                type="password"
                placeholder="•••"
                value={values.cvv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 3)
                  handleChange({ target: { name: 'cvv', value: val } })
                  setPago((p) => ({ ...p, cvv: val }))
                }}
                onBlur={handleBlur}
                error={errors.cvv}
                touched={touched.cvv}
                maxLength={3}
              />
            </div>
          </div>
          <FormField
            label="Nombre en la tarjeta"
            name="titular"
            placeholder="Como aparece en la tarjeta"
            value={values.titular}
            onChange={(e) => {
              handleChange(e)
              setPago((p) => ({ ...p, titular: e.target.value }))
            }}
            onBlur={handleBlur}
            error={errors.titular}
            touched={touched.titular}
          />
        </div>
      )}

      {pago.metodo === 'Transferencia bancaria' && (
        <div className="transferencia-info">
          <p className="m-0">Banco: <strong>TechNova Bank</strong></p>
          <p className="m-0">Cuenta: <strong>0012-3456-78-9012345678</strong></p>
          <p className="m-0">Referencia: <strong>TN-{Date.now().toString().slice(-6)}</strong></p>
        </div>
      )}

      <div className="checkout-total">
        <span style={{ color: 'var(--text-muted)' }}>Total a pagar</span>
        <span className="price fs-4">${total.toLocaleString()}</span>
      </div>

      <div className="d-flex gap-3 justify-content-between">
        <button type="button" className="btn-fav" onClick={onAnterior}>
          ← Volver
        </button>
        <button type="submit" className="btn-cart px-4 py-2" disabled={procesando}>
          {procesando ? (
            <span className="d-flex align-items-center gap-2">
              <span className="spinner" /> Procesando...
            </span>
          ) : (
            'Confirmar pago'
          )}
        </button>
      </div>
    </form>
  )
}

// ---- Paso 3: Confirmación ----
function PasoConfirmacion({ datos, pago, total, onFinalizar }) {
  return (
    <div className="text-center py-3">
      <div className="confirmacion-icon">✓</div>
      <h3 className="mt-4 mb-2">¡Pago confirmado!</h3>
      <p style={{ color: 'var(--text-muted)' }}>
        Enviamos los detalles del pedido a{' '}
        <strong style={{ color: 'var(--accent-2)' }}>{datos.email}</strong>
      </p>

      <div className="confirmacion-detalle mt-4 text-start">
        <div className="confirmacion-fila">
          <span>Método de pago</span>
          <span>{pago.metodo}</span>
        </div>
        <div className="confirmacion-fila">
          <span>Dirección de envío</span>
          <span>{datos.direccion}, {datos.ciudad}</span>
        </div>
        <div className="confirmacion-fila">
          <span>Total pagado</span>
          <span className="price">${total.toLocaleString()}</span>
        </div>
      </div>

      <button className="btn-cart mt-4 px-5 py-2" onClick={onFinalizar}>
        Ver mis pedidos
      </button>
    </div>
  )
}

// ---- Componente principal ----
function Checkout() {
  const { carrito, totalConDescuento, confirmarCompra } = useCart()
  const { usuario } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [paso, setPaso] = useState(0)
  const [datos, setDatos] = useState({
    nombre: usuario?.nombre || '',
    email: usuario?.email || '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
  })
  const [pago, setPago] = useState({
    metodo: 'Tarjeta de crédito',
    numero: '',
    vencimiento: '',
    cvv: '',
    titular: '',
  })

  if (carrito.length === 0 && paso < 2) {
    navigate('/carrito')
    return null
  }

  const handleConfirmar = () => {
    confirmarCompra()
    setPaso(2)
    showToast('¡Compra realizada con éxito! 🎉')
  }

  return (
    <div className="container py-5">
      <Breadcrumb items={[
        { label: 'Inicio', path: '/' },
        { label: 'Carrito', path: '/carrito' },
        { label: 'Checkout' },
      ]} />

      <div className="checkout-layout">
        <div className="checkout-main">
          <StepIndicator pasoActual={paso} />

          {paso === 0 && (
            <PasoEnvio
              datosIniciales={datos}
              onSiguiente={(values) => { setDatos(values); setPaso(1) }}
            />
          )}
          {paso === 1 && (
            <PasoPago
              pago={pago}
              setPago={setPago}
              total={totalConDescuento}
              onSiguiente={handleConfirmar}
              onAnterior={() => setPaso(0)}
            />
          )}
          {paso === 2 && (
            <PasoConfirmacion
              datos={datos}
              pago={pago}
              total={totalConDescuento}
              onFinalizar={() => navigate('/historial')}
            />
          )}
        </div>

        {paso < 2 && (
          <div className="checkout-sidebar">
            <h5 className="mb-3">Resumen del pedido</h5>
            <div className="d-flex flex-column gap-2 mb-3">
              {carrito.map((item) => (
                <div key={item.id} className="sidebar-item">
                  <img
                    src={item.imagenes?.[0] || item.imagen}
                    alt={item.nombre}
                    className="sidebar-img"
                  />
                  <div className="flex-grow-1">
                    <p className="m-0" style={{ fontSize: '0.85rem' }}>{item.nombre}</p>
                    <span className="category">x{item.cantidad}</span>
                  </div>
                  <span className="price" style={{ fontSize: '0.9rem' }}>
                    ${(item.precio * item.cantidad).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span style={{ color: 'var(--text-muted)' }}>Total</span>
              <span className="price fs-5">${totalConDescuento.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout