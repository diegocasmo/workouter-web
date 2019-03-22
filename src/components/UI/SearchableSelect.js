import React from 'react'
import {Field, ErrorMessage} from 'formik'
import AsyncSelect from 'react-select/lib/Async'

export const SearchableSelect = ({name, label, value, defaultOptions, onLoadOptions}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <Field
      name={name}
      render={({field, form}) => (
        <AsyncSelect
          classNamePrefix='wkr-searchable-select'
          value={value ? {value, label: value} : null}
          defaultOptions={defaultOptions}
          loadOptions={onLoadOptions}
          onChange={({value}) => form.setFieldValue(name, value)}/>
      )}/>
    <ErrorMessage name={name} component='p'/>
  </div>
)
