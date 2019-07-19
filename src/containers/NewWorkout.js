import React from 'react'
import {connect} from 'react-redux'
import {createWorkout} from '../api/workout'
import {fetchExercises, createExercise} from '../api/exercise'
import {WorkoutForm} from '../components/Workout/Form/Form'

export const NewWorkout = ({
  history,
  fetchExercises,
  createExercise,
  createWorkout
}) => (
  <>
    <h1>New Workout</h1>
    <WorkoutForm
      submitText='Create Workout'
      history={history}
      redirectTo='/workouts'
      fetchExercises={fetchExercises}
      createExercise={createExercise}
      handleSubmit={createWorkout}/>
  </>
)

const mapStateToProps = (state, {history}) => ({
  history,
  fetchExercises,
  createWorkout,
  createExercise
})

export const NewWorkoutFromStore = connect(
  mapStateToProps, null
)(NewWorkout)
