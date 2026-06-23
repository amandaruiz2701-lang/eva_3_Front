import { useState } from 'react'

function ImageGallery({ imagenes, nombre }) {
  const [seleccionada, setSeleccionada] = useState(0)

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={imagenes[seleccionada]} alt={nombre} className="gallery-img-main" />
      </div>
      {imagenes.length > 1 && (
        <div className="gallery-thumbs">
          {imagenes.map((img, i) => (
            <button
              key={i}
              className={`gallery-thumb ${i === seleccionada ? 'active' : ''}`}
              onClick={() => setSeleccionada(i)}
            >
              <img src={img} alt={`${nombre} ${i + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery