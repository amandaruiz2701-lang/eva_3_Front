import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useLocalStorage('usuario', null)

  const registrar = (nombre, email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const existe = usuarios.find((u) => u.email === email)
    if (existe) return { ok: false, mensaje: 'El correo ya está registrado.' }

    const nuevoUsuario = { id: Date.now(), nombre, email, password }
    localStorage.setItem('usuarios', JSON.stringify([...usuarios, nuevoUsuario]))
    setUsuario({ id: nuevoUsuario.id, nombre, email })
    return { ok: true }
  }

  const iniciarSesion = (email, password) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const encontrado = usuarios.find((u) => u.email === email && u.password === password)
    if (!encontrado) return { ok: false, mensaje: 'Correo o contraseña incorrectos.' }

    setUsuario({ id: encontrado.id, nombre: encontrado.nombre, email: encontrado.email })
    return { ok: true }
  }

  const cerrarSesion = () => setUsuario(null)

  return (
    <AuthContext.Provider value={{ usuario, registrar, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}