import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useToast } from './ToastContext'

const CartContext = createContext()

const CUPONES = {
  'BIENVENIDO': 0.10,
  'PROMO20': 0.20,
  'NEON50': 0.50,
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useLocalStorage('carrito', [])
  const [descuento, setDescuento] = useLocalStorage('descuento', 0)
  const { showToast } = useToast()

  const agregarAlCarrito = (producto, cantidad = 1) => {
    if (producto.stock === 0) {
      showToast('No hay stock disponible', 'error')
      return
    }
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id)
      if (existe) {
        const nuevaCantidad = existe.cantidad + cantidad
        if (nuevaCantidad > producto.stock) {
          showToast('Llegaste al stock disponible', 'error')
          return prev
        }
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
    showToast(`${producto.nombre} agregado al carrito ✓`)
  }

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  const cambiarCantidad = (id, cantidad) => {
    if (cantidad < 1) return
    setCarrito((prev) =>
      prev.map((item) => (item.id === id ? { ...item, cantidad } : item))
    )
  }

  const vaciarCarrito = () => setCarrito([])

  const aplicarCupon = (codigo) => {
    const porcentaje = CUPONES[codigo.toUpperCase()]
    if (porcentaje) {
      setDescuento(porcentaje)
      showToast(`Cupón aplicado: ${porcentaje * 100}% de descuento 🎉`)
      return true
    } else {
      showToast('Código inválido', 'error')
      return false
    }
  }
  const [historial, setHistorial] = useLocalStorage('historial', [])

  const confirmarCompra = () => {
    if (carrito.length === 0) return
    const pedido = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-CL', {
        year: 'numeric', month: 'long', day: 'numeric',
      }),
      items: [...carrito],
      total: totalConDescuento,
      descuentoAplicado: descuento,
    }
    setHistorial((prev) => [pedido, ...prev])
    vaciarCarrito()
    setDescuento(0)
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
  const totalConDescuento = Math.round(total - total * descuento)

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        quitarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        aplicarCupon,
        total,
        totalConDescuento,
        descuento,
        cantidadTotal,
        historial,
        confirmarCompra,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}