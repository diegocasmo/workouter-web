import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchWorkouts, deleteWorkout} from '../state/workout/workout-action-creators'
import {getWorkouts, isLoading} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutList} from '../components/WorkoutList/WorkoutList'

export function Workouts ({
  workouts,
  isLoading,
  fetchWorkouts,
  deleteWorkout
}) {
  useEffect(() => { fetchWorkouts() }, [])

  return (
    <>
      <h1>Workouts</h1>
      {isLoading
        ? <Loading/>
        : <WorkoutList
            handleDeleteWorkout={deleteWorkout}
            workouts={workouts}/>}
    </>
  )
}

const mapStateToProps = state => ({
  workouts: getWorkouts(state),
  isLoading: isLoading(state),
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchWorkouts, deleteWorkout}, dispatch)
)

export const WorkoutsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workouts)
