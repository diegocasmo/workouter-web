import React from 'react'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import {ExerciseSchema} from '../db/models/exercise'

export const ExerciseForm = ({
  exercise={},
  handleSubmit,
  submitText,
  isSubmitting
}) => {
  return (
    <Formik
      initialValues={{
        name: exercise ? exercise.name : ''
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
            <button type='submit' disabled={isSubmitting}>{submitText}</button>
          </div>
        </Form>
      )}/>
  )
}
