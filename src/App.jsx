import { Routes, Route } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage'
import products from './data/products'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import ProductoDetalle from './pages/ProductoDetalle'
import Favoritos from './pages/Favoritos'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import NotFound from './pages/NotFound'
import Historial from './pages/Historial'
import Login from './pages/Login'
import Registro from './pages/Registro'
import './App.css'

function App() {
  const [favoritos, setFavoritos] = useLocalStorage('favoritos', [])

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Navbar cantidadFavoritos={favoritos.length} />
      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route
          path="/catalogo"
          element={
            <Catalogo
              products={products}
              cargando={false}
              favoritos={favoritos}
              onToggleFavorito={toggleFavorito}
            />
          }
        />
        <Route
          path="/producto/:id"
          element={
            <ProductoDetalle
              products={products}
              favoritos={favoritos}
              onToggleFavorito={toggleFavorito}
            />
          }
        />
        <Route
          path="/favoritos"
          element={
            <Favoritos
              products={products}
              favoritos={favoritos}
              onToggleFavorito={toggleFavorito}
            />
          }
        />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App