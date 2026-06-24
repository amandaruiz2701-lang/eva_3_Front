function FormField({ label, name, type = 'text', placeholder, value, onChange, onBlur, error, touched, ...props }) {
  const mostrarError = touched && error

  return (
    <div className="form-field">
      {label && <label className="form-label-custom">{label}</label>}
      <input
        className={`form-control filter-input ${mostrarError ? 'input-error' : touched && !error ? 'input-ok' : ''}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...props}
      />
      {mostrarError && <span className="field-error">{error}</span>}
    </div>
  )
}

export default FormField