import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateWorkout} from '../api/workout'
import {fetchExercises} from '../api/exercise'
import {getWorkout} from '../state/workout/workout-action-creators'
import {getWorkout as getWorkoutSelector, isLoading} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutForm} from '../components/Workout/Form/Form'

export const UpdateWorkout = ({
  history,
  workoutId,
  updateWorkout,
  fetchExercises,
  workout,
  isLoading,
  getWorkout
}) => {
  useEffect(
    () => { getWorkout(workoutId) },
    [getWorkout, workoutId]
  )

  return (
    <>
      <h1>Update Workout</h1>
      {isLoading
        ? <Loading/>
        : workout && <WorkoutForm
            workout={workout}
            submitText='Update Workout'
            history={history}
            redirectTo={`/workouts/${workoutId}`}
            fetchExercises={fetchExercises}
            handleSubmit={updateWorkout}/>}
    </>
  )
}

const mapStateToProps = (state, {match, history}) => {
  const workoutId = Number(match.params.workoutId)
  return {
    history,
    workoutId,
    updateWorkout,
    fetchExercises,
    workout: getWorkoutSelector(state, workoutId),
    isLoading: isLoading(state),
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({getWorkout}, dispatch)
)

export const UpdateWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UpdateWorkout)
