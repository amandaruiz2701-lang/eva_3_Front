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

  const actualizarPerfil = (nombre, email) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const duplicado = usuarios.find((u) => u.email === email && u.id !== usuario.id)
    if (duplicado) return { ok: false, mensaje: 'Ese correo ya está en uso.' }

    const actualizados = usuarios.map((u) =>
      u.id === usuario.id ? { ...u, nombre, email } : u
    )
    localStorage.setItem('usuarios', JSON.stringify(actualizados))
    setUsuario((prev) => ({ ...prev, nombre, email }))
    return { ok: true }
  }

  const cambiarPassword = (passwordActual, passwordNuevo) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
    const encontrado = usuarios.find((u) => u.id === usuario.id)
    if (!encontrado || encontrado.password !== passwordActual) {
      return { ok: false, mensaje: 'La contraseña actual es incorrecta.' }
    }

    const actualizados = usuarios.map((u) =>
      u.id === usuario.id ? { ...u, password: passwordNuevo } : u
    )
    localStorage.setItem('usuarios', JSON.stringify(actualizados))
    return { ok: true }
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        registrar,
        iniciarSesion,
        cerrarSesion,
        actualizarPerfil,
        cambiarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}