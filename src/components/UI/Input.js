import React from 'react'
import {Field, ErrorMessage} from 'formik'

export const Input = ({
  name,
  label,
  placeholder,
  type,
  errors,
  touched,
  ...props
}) => (
  <div className='form-group'>
    <label htmlFor={name}>{label}</label>
    <Field
      className={`form-control ${touched
        ? (errors ? 'is-invalid' : 'is-valid')
        : ''
      }`}
      name={name}
      placeholder={placeholder}
      type={type}
      {...props}/>
    <ErrorMessage
      className={`${touched && errors ? 'invalid-feedback' : ''}`}
      name={name}
      component='p'/>
  </div>
)
