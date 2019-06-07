import React from 'react'
import {Field, ErrorMessage} from 'formik'

export const Input = ({name, label, placeholder, type, ...props}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <Field name={name} placeholder={placeholder} type={type} {...props}/>
    <ErrorMessage className='wkr-input__error' name={name} component='p'/>
  </div>
)
