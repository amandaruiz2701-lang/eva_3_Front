import { useState } from 'react'

function Contacto() {
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="container py-5" style={{ maxWidth: 560 }}>
      <h2 className="section-title">Contacto</h2>

      {enviado ? (
        <p className="text-muted">Gracias, te vamos a responder a la brevedad.</p>
      ) : (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <input className="form-control filter-input" placeholder="Nombre" required />
          <input className="form-control filter-input" type="email" placeholder="Email" required />
          <textarea className="form-control filter-input" rows="4" placeholder="Mensaje" required />
          <button type="submit" className="btn-fav align-self-start">Enviar mensaje</button>
        </form>
      )}
    </div>
  )
}

export default Contacto