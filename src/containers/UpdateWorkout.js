import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateWorkout} from '../api/workout'
import {getWorkout} from '../state/workout/workout-action-creators'
import {fetchExercises} from '../state/exercise/exercise-action-creators'
import {getExercises, isLoading as isLoadingExercises} from '../state/exercise/exercise-selectors'
import {
  getWorkout as getWorkoutSelector,
  isLoading as isLoadingWorkout
} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutForm} from '../components/WorkoutForm'

export function UpdateWorkout ({
  history,
  workoutId,
  workout,
  exercises,
  isLoading,
  updateWorkout,
  getWorkout,
  fetchExercises
}) {
  useEffect(() => { getWorkout(workoutId) }, [])
  useEffect(() => { fetchExercises() }, [])

  return (
    <>
      <h1>Update Workout</h1>
      {isLoading
        ? <Loading/>
        : workout && <WorkoutForm
            submitText='Update'
            history={history}
            redirectTo={`/workouts/${workoutId}`}
            handleSubmit={updateWorkout}
            workout={workout}
            exercises={exercises}/>}
    </>
  )
}

const mapStateToProps = (state, {match, history}) => {
  const workoutId = Number(match.params.workoutId)
  return {
    history,
    workoutId,
    workout: getWorkoutSelector(state, workoutId),
    exercises: getExercises(state),
    isLoading: isLoadingWorkout(state) || isLoadingExercises(state),
    updateWorkout: updateWorkout
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({getWorkout, fetchExercises}, dispatch)
)

export const UpdateWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UpdateWorkout)
