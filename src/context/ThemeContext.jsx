import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [tema, setTema] = useLocalStorage('tema', 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tema)
  }, [tema])

  const toggleTema = () => setTema((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}