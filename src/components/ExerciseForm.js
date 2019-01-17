import React from 'react'
import {Formik, Form} from 'formik'
import {Input} from './Form/Input'
import {ExerciseSchema} from '../api/exercise'

export const ExerciseForm = ({
  exercise,
  submitText,
  validationSchema = ExerciseSchema,
  handleSubmit
}) => (
  <Formik
    initialValues={{
      name: (exercise && exercise.name) ? exercise.name : ''
    }}
    validationSchema={validationSchema}
    onSubmit={(attrs, {setErrors}) =>
      handleSubmit(attrs)
        .catch((errors) => setErrors(errors))
    }
    render={({isSubmitting}) => (
      <Form>
        <Input name='name' label='Name' placeholder='Name' type='text'/>
        <button type='submit' disabled={isSubmitting}>{submitText}</button>
      </Form>
    )}/>
)
