import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import {ExerciseSchema} from '../db/models/exercise'

export const ExerciseForm = ({
  exercise={},
  measurements=[],
  handleSubmit,
  submitText,
  isSubmitting
}) => {

  // Add exercise measurement if not already in measurements
  if(exercise && exercise.measurement &&
    !measurements.map((x) => x.name).includes(exercise.measurement.name)) {
    measurements.unshift(exercise.measurement)
  }

  // Pre-select an exercise measurement name when possible
  let measurementName = ''
  if(exercise && exercise.measurement) {
    measurementName = exercise.measurement.name
  } else if (measurements.length > 0) {
    measurementName = measurements[0].name
  }
  return (
    <Formik
      initialValues={{
        name: exercise ? exercise.name : '',
        measurement: {name: measurementName}
      }}
      validationSchema={ExerciseSchema}
      onSubmit={values => handleSubmit(values)}
      render={() => (
        <Form>
          <div>
            <label htmlFor='name'>Name</label>
            <Field name='name' placeholder='Name' type='text'/>
            <ErrorMessage name='name' component='p'/>
          </div>
          <div>
            <label htmlFor='measurement.name'>Measurement</label>
            <Field name='measurement.name' component='select'>
              {measurements.map((x, i) => (
                <option key={i} value={x.name}>{x.name}</option>
              ))}
            </Field>
            <ErrorMessage name='measurement.name' component='p'/>
          </div>
          <div>
            <button type='submit' disabled={isSubmitting}>{submitText}</button>
          </div>
        </Form>
      )}/>
  )
}
