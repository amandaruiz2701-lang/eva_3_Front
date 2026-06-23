import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
      <h1 className="display" style={{ fontSize: '5rem', color: 'var(--accent)' }}>404</h1>
      <p className="text-muted mb-4">Esta página no existe o fue movida.</p>
      <Link to="/" className="btn-fav">Volver al inicio</Link>
    </div>
  )
}

export default NotFound