import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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
import Checkout from './pages/Checkout'
import Historial from './pages/Historial'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Perfil from './pages/Perfil'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  const [favoritos, setFavoritos] = useLocalStorage('favoritos', [])
  const location = useLocation()

  const toggleFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Navbar cantidadFavoritos={favoritos.length} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home products={products}
            favoritos={favoritos}
            onToggleFavorito={toggleFavorito} />} />
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
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/favoritos"
            element={
              <ProtectedRoute>
                <Favoritos
                  products={products}
                  favoritos={favoritos}
                  onToggleFavorito={toggleFavorito}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={<ProtectedRoute><Checkout /></ProtectedRoute>}
          />
          <Route
            path="/historial"
            element={<ProtectedRoute><Historial /></ProtectedRoute>}
          />
          <Route
            path="/perfil"
            element={<ProtectedRoute><Perfil /></ProtectedRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App