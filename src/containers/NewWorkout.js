import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchExercises} from '../state/exercise/exercise-action-creators'
import {getExercises, isLoading} from '../state/exercise/exercise-selectors'
import {createWorkout} from '../api/workout'
import {Loading} from '../components/Loading'
import {WorkoutForm} from '../components/WorkoutForm'

export function NewWorkout ({
  history,
  exercises,
  isLoading,
  fetchExercises,
  createWorkout
}) {
  useEffect(() => { fetchExercises() }, [])

  return (
    <>
      <h1>New Workout</h1>
      {isLoading
        ? <Loading/>
        : <WorkoutForm
            history={history}
            redirectTo='/workouts'
            exercises={exercises}
            handleSubmit={createWorkout}
            submitText="Create Workout"/>}
    </>
  )
}

const mapStateToProps = (state, {history}) => ({
  history,
  exercises: getExercises(state),
  isLoading: isLoading(state),
  createWorkout: createWorkout
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchExercises}, dispatch)
)

export const NewWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewWorkout)
