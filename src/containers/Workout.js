import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getWorkout, deleteWorkout} from '../state/workout/action-creators'
import {getWorkout as getWorkoutSelector, isLoading} from '../state/workout/selectors'
import {Loading} from '../components/Loading'
import {WorkoutView} from '../components/Workout/View/View'

export const Workout = ({workoutId, workout, isLoading, getWorkout, deleteWorkout}) => {
  useEffect(
    () => { getWorkout(workoutId) },
    [getWorkout, workoutId]
  )

  return (
    <div className='p-3'>
      {isLoading
        ? <Loading/>
        : workout && <WorkoutView workout={workout} deleteWorkout={deleteWorkout}/>}
    </div>
  )
}

const mapStateToProps = (state, {match}) => {
  const workoutId = Number(match.params.workoutId)
  return {
    workoutId,
    workout: getWorkoutSelector(state, workoutId),
    isLoading: isLoading(state)
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({getWorkout, deleteWorkout}, dispatch)
)

export const WorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workout)
