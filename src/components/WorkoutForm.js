import React from 'react'
import {Formik, Form, FieldArray} from 'formik'
import {Input} from './Form/Input'
import {Select} from './Form/Select'
import {WorkoutSchema} from '../api/workout'
import {getUnits} from '../api/unit'

const emptyWorkoutExercise = {
  name: '',
  quantity: '',
  unit: getUnits()[0].value,
  weight: ''
}

// TODO: This should be rendered in 'another page' (i.e., this should be a multi page form)
// See more at: https://github.com/jaredpalmer/formik/blob/master/examples/MultistepWizard.js
const WorkoutExercisesForm = ({exercises}) => (
  <FieldArray
    name="exercises"
    render={({insert, remove, push}) => (
      <div>
        {exercises.length > 0 && exercises.map((_, idx) => (
          <div key={idx}>
            {/* Exercise name should be a select input, with the exercises the user as created (in the future a search-able select)*/}
            <Input name={`exercises.${idx}.name`} label='Name' placeholder='Name' type='text'/>
            <Input name={`exercises.${idx}.quantity`} label='Quantity' placeholder='10' type='number'/>
            <Select name={`exercises.${idx}.unit`} label='Unit' options={getUnits()}/>
            <Input name={`exercises.${idx}.weight`} label='Weight' placeholder='10' type='number'/>
            <button type="button" onClick={() => remove(idx)}>X</button>
          </div>
        ))}
        <button type="button" onClick={() => push(emptyWorkoutExercise)}>Add</button>
      </div>
    )}/>
)

export const WorkoutForm = ({
  workout={},
  handleSubmit,
  submitText,
  isSubmitting
}) => {
  return (
    <Formik
      initialValues={{
        // TODO: Any better way to do this?
        name: (workout && workout.name) ? workout.name : '',
        rounds: (workout && workout.rounds) ? workout.rounds : '',
        restTimePerRound: (workout && workout.restTimePerRound) ? workout.restTimePerRound : '',
        restTimePerExercise: (workout && workout.restTimePerExercise) ? workout.restTimePerExercise : '',
        exercises: (workout && workout.exercises) ? workout.exercises : [emptyWorkoutExercise]
      }}
      validationSchema={WorkoutSchema}
      onSubmit={attrs => handleSubmit(attrs)}
      render={({values}) => (
        <Form>
          <Input name='name' label='Name' placeholder='Name' type='text'/>
          <Input name='rounds' label='Rounds' placeholder='4' type='number'/>
          <Input name='restTimePerRound' label='Rest time per round (seconds)' placeholder='60' type='number'/>
          <Input name='restTimePerExercise' label='Rest time per exercise (seconds)' placeholder='20' type='number'/>
          <WorkoutExercisesForm exercises={values.exercises}/>
          <button type='submit' disabled={isSubmitting}>{submitText}</button>
        </Form>
      )}/>
  )
}
