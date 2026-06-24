import { useState } from 'react'

function useForm(initialValues, validaciones) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (touched[name]) validarCampo(name, value)
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validarCampo(name, value)
  }

  const validarCampo = (name, value) => {
    const regla = validaciones[name]
    if (!regla) return
    const error = regla(value, values)
    setErrors((prev) => ({ ...prev, [name]: error || '' }))
  }

  const validarTodo = () => {
    const newErrors = {}
    const newTouched = {}
    Object.keys(validaciones).forEach((name) => {
      newTouched[name] = true
      const error = validaciones[name](values[name], values)
      if (error) newErrors[name] = error
    })
    setErrors(newErrors)
    setTouched(newTouched)
    return Object.keys(newErrors).length === 0
  }

  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, validarTodo, resetForm }
}

export default useForm
