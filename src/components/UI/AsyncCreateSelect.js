import React from 'react'
import {Field, ErrorMessage} from 'formik'
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable'

export const AsyncCreateSelect = ({
  name,
  label,
  value,
  defaultOptions,
  onLoadOptions,
  onCreateOption
}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <Field
      name={name}
      render={({form}) => (
        <AsyncCreatableSelect
          classNamePrefix='wkr-searchable-select'
          value={value ? {value, label: value} : null}
          defaultOptions={defaultOptions}
          onCreateOption={value => {
            // `onChange` is not called when `onCreateOption` is executed, thus
            // the field value in Formik must be manually updated
            form.setFieldValue(name, value)
            onCreateOption(value)
          }}
          loadOptions={onLoadOptions}
          onChange={({value}) => form.setFieldValue(name, value)}/>
      )}/>
    <ErrorMessage name={name} component='p'/>
  </div>
)
