import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createWorkout} from '../api/workout'
import {fetchExercises} from '../api/exercise'
import {WorkoutForm} from '../components/Workout/Form/Form'

export const NewWorkout = ({history, fetchExercises, createWorkout}) => (
  <>
    <h1>New Workout</h1>
    <WorkoutForm
      submitText='Create Workout'
      history={history}
      redirectTo='/workouts'
      fetchExercises={fetchExercises}
      handleSubmit={createWorkout}/>
  </>
)

const mapStateToProps = (state, {history}) => ({
  history,
  fetchExercises,
  createWorkout
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
)

export const NewWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewWorkout)
