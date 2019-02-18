import React from 'react'
import {FieldArray} from 'formik'
import {MultistepWizard} from './UI/MultistepWizard'
import {Input} from './UI/Input'
import {Select} from './UI/Select'
import {SearchableSelect} from './UI/SearchableSelect'
import {WorkoutSetupSchema, WorkoutSchema} from '../api/workout'
import {UNITS, getUnits} from '../api/unit'

export const WorkoutForm = ({
  workout,
  submitText,
  history,
  redirectTo,
  fetchExercises,
  handleSubmit
}) => {
  // An empty workout to show if none has been created yet
  const emptyWorkout = {
    name: '',
    rounds: 4,
    restTimePerRound: 60,
    restTimePerExercise: 20,
    exercises: [{
      name: '',
      quantity: 10,
      quantityUnit: UNITS.REPS.value,
      weight: 0,
      weightUnit: UNITS.KG.value
    }]
  }
  return (
    <MultistepWizard
      initialValues={workout || emptyWorkout}
      onSubmit={async (attrs, {setErrors}) => {
        try {
          await handleSubmit(attrs)
          if (history && redirectTo) { history.push(redirectTo) }
        } catch (errors) {
          setErrors(errors)
        }
      }}
      submitText={submitText}>
      {/* First page: Workout setup details (i.e., name, rounds, etc) */}
      <MultistepWizard.Page validationSchema={WorkoutSetupSchema}>
        <h3>Workout Setup</h3>
        <Input name='name' label='Name' placeholder='Name' type='text'/>
        <Input name='rounds' label='Rounds' placeholder='4' type='number'/>
        <Input name='restTimePerRound' label='Rest time per round (seconds)' placeholder='60' type='number'/>
        <Input name='restTimePerExercise' label='Rest time per exercise (seconds)' placeholder='20' type='number'/>
      </MultistepWizard.Page>
      {/* Second page: Workout exercises */}
      <MultistepWizard.Page validationSchema={WorkoutSchema}>
        <h3>Workout Exercises</h3>
        <FieldArray
          name='exercises'
          render={({remove, push, form}) => (
            <>
              {form.values.exercises.map((_, idx) => (
                <div key={idx}>
                  <SearchableSelect
                    label='Name'
                    name={`exercises.${idx}.name`}
                    defaultValue={form.values.exercises[idx].name}
                    defaultOptions
                    onLoadOptions={async (query) => {
                      const res = await fetchExercises({name: query})
                      return res.map(({name}) => ({value: name, label: name}))
                    }}/>
                  <Input name={`exercises.${idx}.quantity`} label='Quantity' placeholder='10' type='number'/>
                  <Select name={`exercises.${idx}.quantityUnit`} label='Quantity unit' options={getUnits()}/>
                  <Input name={`exercises.${idx}.weight`} label='Weight' placeholder='0' type='number'/>
                  <Input name={`exercises.${idx}.weightUnit`} label='Weight Unit' type='string' value={UNITS.KG.value} readOnly disabled/>
                  {form.values.exercises.length > 1 && <button type='button' onClick={() => remove(idx)}>X</button>}
                </div>
              ))}
              <button type='button' onClick={() => push(emptyWorkout.exercises[0])}>Add</button>
            </>
          )}/>
      </MultistepWizard.Page>
    </MultistepWizard>
  )
}
