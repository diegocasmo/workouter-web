import React from 'react'
import {Prompt} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {Input} from './Form/Input'
import {ExerciseSchema} from '../api/exercise'

export const ExerciseForm = ({
  exercise,
  submitText,
  history,
  redirectTo,
  validationSchema = ExerciseSchema,
  handleSubmit
}) => {
  const initialValues = {
    name: (exercise && exercise.name) ? exercise.name : ''
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(attrs, {setErrors}) =>
        handleSubmit(attrs)
          .then(() => (history && redirectTo) ? history.push(redirectTo) : null)
          .catch((errors) => setErrors(errors))
      }
      render={({isSubmitting, values}) => (
        <>
          <Prompt
            when={JSON.stringify(values) !== JSON.stringify(initialValues)}
            message='You have unsaved changes. Are you sure you want to leave?'/>
          <Form>
            <Input name='name' label='Name' placeholder='Name' type='text'/>
            <button type='submit' disabled={isSubmitting}>{submitText}</button>
          </Form>
        </>
      )}/>
  )
}
