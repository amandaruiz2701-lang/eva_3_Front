import { useState, useEffect } from 'react'

const CATEGORIAS_ES = {
  "men's clothing": 'Ropa masculina',
  "women's clothing": 'Ropa femenina',
  'jewelery': 'Joyería',
  'electronics': 'Electrónica',
}

const TRADUCCIONES = {
  1:  { nombre: 'Mochila de cuero dorada', descripcion: 'Mochila casual de cuero con hebillas doradas. Capacidad para laptop de 15". Ideal para uso diario.' },
  2:  { nombre: 'Bolso mensajero casual', descripcion: 'Bolso de tela resistente con múltiples compartimentos. Correa ajustable al hombro.' },
  3:  { nombre: 'Camiseta básica masculina', descripcion: 'Camiseta de algodón premium de corte slim. Disponible en varios colores.' },
  4:  { nombre: 'Chaqueta slim fit', descripcion: 'Chaqueta ligera de corte ajustado, ideal para primavera y otoño. Diseño moderno.' },
  5:  { nombre: 'Gabardina clásica masculina', descripcion: 'Gabardina impermeable de corte clásico. Interior satinado y capucha desmontable.' },
  6:  { nombre: 'Camiseta de algodón premium', descripcion: 'Camiseta 100% algodón con serigrafía. Lavado a máquina sin decoloración.' },
  7:  { nombre: 'Camiseta estampada gráfica', descripcion: 'Camiseta de edición limitada con estampado gráfico. Tela suave y duradera.' },
  8:  { nombre: 'Sudadera con capucha', descripcion: 'Sudadera con capucha de tela polar interior. Bolsillos frontales con cierre.' },
  9:  { nombre: 'Collar con colgante de corazón', descripcion: 'Collar plateado con dije de corazón y cristal. Cierre de langosta ajustable.' },
  10: { nombre: 'Anillo de piedra blanca', descripcion: 'Anillo de plata 925 con piedra blanca natural. Talla estándar ajustable.' },
  11: { nombre: 'Collar con colgante de cruz', descripcion: 'Collar dorado con cruz delicada. Cadena de 45cm incluida.' },
  12: { nombre: 'Pulsera de cristal dorada', descripcion: 'Pulsera ajustable con cristales incrustados. Acabado dorado de larga duración.' },
  13: { nombre: 'Reloj inteligente con pantalla táctil', descripcion: 'Smartwatch con monitor cardíaco, GPS y notificaciones. Batería de 7 días.' },
  14: { nombre: 'SanDisk 1TB SSD externo', descripcion: 'Disco sólido externo ultraportátil. Velocidad de lectura hasta 550MB/s.' },
  15: { nombre: 'Disco externo portátil 3TB', descripcion: 'Almacenamiento externo de alta capacidad compatible con PC y Mac.' },
  16: { nombre: 'Auriculares inalámbricos', descripcion: 'Auriculares bluetooth con cancelación de ruido y 20 horas de batería.' },
  17: { nombre: 'Monitor ultrawide 4K', descripcion: 'Monitor de 27" resolución 4K, 144Hz y panel IPS. Ideal para diseño y gaming.' },
  18: { nombre: 'Adaptador USB-C a USB-A (pack x3)', descripcion: 'Pack de 3 adaptadores de alta velocidad. Compatible con todos los dispositivos.' },
  19: { nombre: 'Mochila de viaje impermeable', descripcion: 'Mochila con cierre impermeable y puerto de carga USB. Capacidad 40L.' },
  20: { nombre: 'Billetera delgada de cuero', descripcion: 'Billetera de cuero genuino con compartimentos organizadores para tarjetas y efectivo.' },
}

function adaptarProducto(p) {
  const traduccion = TRADUCCIONES[p.id] || {}
  return {
    id: p.id,
    nombre: traduccion.nombre || p.title,
    descripcion: traduccion.descripcion || p.description,
    precio: Math.round(p.price * 900),
    categoria: CATEGORIAS_ES[p.category] || p.category,
    imagenes: [p.image],
    imagen: p.image,
    stock: Math.floor(Math.random() * 15) + 1,
    rating: p.rating,
  }
}

function useProducts() {
  const [products, setProducts] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar productos')
        return res.json()
      })
      .then((data) => setProducts(data.map(adaptarProducto)))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  return { products, cargando, error }
}

export default useProducts