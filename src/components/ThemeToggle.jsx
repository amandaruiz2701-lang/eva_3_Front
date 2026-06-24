import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { tema, toggleTema } = useTheme()
  const esDark = tema === 'dark'

  return (
    <button
      className="theme-toggle"
      onClick={toggleTema}
      title={esDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label={esDark ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      <span className="theme-toggle-icon">
        {esDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle