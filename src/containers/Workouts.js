import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {fetchWorkouts} from '../state/workout/workout-action-creators'
import {getWorkouts, isLoading} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutList} from '../components/Workout/List/List'

export const Workouts = ({workouts, isLoading, fetchWorkouts}) => {
  useEffect(() => { fetchWorkouts() }, [])

  return (
    isLoading
      ? <Loading/>
      : <WorkoutList workouts={workouts}/>
  )
}

const mapStateToProps = state => ({
  workouts: getWorkouts(state),
  isLoading: isLoading(state),
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({fetchWorkouts}, dispatch)
)

export const WorkoutsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workouts)
