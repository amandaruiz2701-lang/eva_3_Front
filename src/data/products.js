import audifonos from '../assets/images/audifonos.png'
import camara from '../assets/images/camara.png'
import cargador from '../assets/images/cargador.png'
import laptop from '../assets/images/laptop.png'
import mando from '../assets/images/mando.png'
import mouse from '../assets/images/mouse.png'
import parlante from '../assets/images/parlante.png'
import reloj from '../assets/images/reloj.png'
import smartphone from '../assets/images/smartphone.png'
import teclado from '../assets/images/teclado.png'

const products = [
  {
    id: 1,
    nombre: 'Audífonos Bluetooth',
    descripcion: 'Sonido envolvente con cancelación de ruido activa. Conectividad Bluetooth 5.0 y hasta 30 horas de batería.',
    precio: 89000,
    categoria: 'Audio',
    stock: 8,
    rating: { rate: 5, count: 214 },
    imagenes: [audifonos],
    imagen: audifonos,
  },
  {
    id: 2,
    nombre: 'Cámara mirrorless',
    descripcion: 'Sensor de 24MP, grabación 4K y lente intercambiable. Ideal para fotografía profesional y creadores de contenido.',
    precio: 450000,
    categoria: 'Fotografía',
    stock: 3,
    rating: { rate: 5, count: 98 },
    imagenes: [camara],
    imagen: camara,
  },
  {
    id: 3,
    nombre: 'Cargador inalámbrico',
    descripcion: 'Carga rápida de 15W compatible con Qi. Diseño minimalista con indicador LED.',
    precio: 25000,
    categoria: 'Accesorios',
    stock: 20,
    rating: { rate: 4, count: 176 },
    imagenes: [cargador],
    imagen: cargador,
  },
  {
    id: 4,
    nombre: 'Laptop ultradelgada',
    descripcion: 'Procesador de última generación, 16GB RAM y SSD de 512GB. Pantalla Full HD de 14" con batería de 12 horas.',
    precio: 890000,
    categoria: 'Computación',
    stock: 5,
    rating: { rate: 5, count: 312 },
    imagenes: [laptop],
    imagen: laptop,
  },
  {
    id: 5,
    nombre: 'Control para videojuegos',
    descripcion: 'Control inalámbrico compatible con PC y consolas. Gatillos adaptables y vibración háptica.',
    precio: 65000,
    categoria: 'Gaming',
    stock: 12,
    rating: { rate: 4, count: 143 },
    imagenes: [mando],
    imagen: mando,
  },
  {
    id: 6,
    nombre: 'Mouse inalámbrico',
    descripcion: 'Sensor óptico de 4000 DPI, botones programables y batería recargable. Ergonómico para uso prolongado.',
    precio: 38000,
    categoria: 'Computación',
    stock: 0,
    rating: { rate: 4, count: 89 },
    imagenes: [mouse],
    imagen: mouse,
  },
  {
    id: 7,
    nombre: 'Parlante inteligente',
    descripcion: 'Asistente de voz integrado, sonido 360° y conectividad Wi-Fi y Bluetooth. Resistente a salpicaduras.',
    precio: 75000,
    categoria: 'Audio',
    stock: 7,
    rating: { rate: 4, count: 201 },
    imagenes: [parlante],
    imagen: parlante,
  },
  {
    id: 8,
    nombre: 'Reloj inteligente',
    descripcion: 'Monitor cardíaco continuo, GPS integrado y pantalla AMOLED. Resistente al agua hasta 50 metros.',
    precio: 120000,
    categoria: 'Wearables',
    stock: 6,
    rating: { rate: 5, count: 267 },
    imagenes: [reloj],
    imagen: reloj,
  },
  {
    id: 9,
    nombre: 'Smartphone Pro',
    descripcion: 'Pantalla OLED de 6.7", triple cámara de 108MP y 256GB de almacenamiento. Batería de 5000mAh con carga rápida.',
    precio: 650000,
    categoria: 'Telefonía',
    stock: 4,
    rating: { rate: 5, count: 428 },
    imagenes: [smartphone],
    imagen: smartphone,
  },
  {
    id: 10,
    nombre: 'Teclado mecánico',
    descripcion: 'Switches mecánicos táctiles, retroiluminación RGB por tecla y estructura de aluminio. Conectividad USB-C.',
    precio: 95000,
    categoria: 'Computación',
    stock: 9,
    rating: { rate: 4, count: 154 },
    imagenes: [teclado],
    imagen: teclado,
  },
]

export default products