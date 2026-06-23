import { Link } from 'react-router-dom'

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb-custom mb-4">
      {items.map((item, i) => (
        <span key={i}>
          {i < items.length - 1 ? (
            <>
              <Link to={item.path} className="breadcrumb-link">{item.label}</Link>
              <span className="breadcrumb-sep"> / </span>
            </>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb