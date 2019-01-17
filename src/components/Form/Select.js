// TODO: Test
import React from 'react'
import {Field, ErrorMessage} from 'formik'

export const Select = ({name, label, options, ...props}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <Field name={name} component='select' {...props}>
      {options.map((x, i) => (
        <option key={i} value={x.value}>{x.text}</option>
      ))}
    </Field>
    <ErrorMessage name={name} component='p'/>
  </div>
)
