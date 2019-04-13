import React from 'react'
import {FieldArray} from 'formik'
import {MultistepWizard} from '../../UI/MultistepWizard'
import {Input} from '../../UI/Input'
import {WorkoutSetupSchema, WorkoutSchema} from '../../../api/workout'
import {UNITS} from '../../../api/unit'
import {WorkoutExerciseForm} from './Exercise'
import {SortableItem} from '../../UI/SortableItem'

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
          render={({remove, push, swap, form}) => (
            <>
              {form.values.exercises.map((_, index) =>
                <SortableItem
                  type='WorkoutExerciseForm'
                  key={index}
                  index={index}
                  onSortableItemMoved={swap}>
                  <WorkoutExerciseForm
                    index={index}
                    exerciseName={form.values.exercises[index].name}
                    onRemove={() => remove(index)}
                    push={push}
                    fetchExercises={fetchExercises}
                    canRemove={form.values.exercises.length > 1}/>
                </SortableItem>
              )}
              <button type='button' onClick={() => push(emptyWorkout.exercises[0])}>Add</button>
            </>
          )}/>
      </MultistepWizard.Page>
    </MultistepWizard>
  )
}
