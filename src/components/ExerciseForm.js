import React from 'react'
import {Prompt} from 'react-router-dom'
import {Formik, Form} from 'formik'
import {Input} from './UI/Input'
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
      render={({isSubmitting, values, errors, touched}) => {
        return (
        <>
          <Prompt
            when={!isSubmitting && JSON.stringify(values) !== JSON.stringify(initialValues)}
            message='You have unsaved changes. Are you sure you want to leave?'/>
          <Form>
            <div className='row'>
              <div className='col-sm-8'>
                <Input
                  autoFocus
                  name='name'
                  label='Name'
                  placeholder='Exercise name...'
                  type='text'
                  errors={errors.name}
                  touched={touched.name}/>
              </div>
            </div>
            <button
              className='btn btn-primary my-1'
              type='submit'
              disabled={isSubmitting}>
              {submitText}
            </button>
          </Form>
        </>
        )
      }}/>
  )
}
