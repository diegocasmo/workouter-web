import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getWorkout} from '../state/workout/workout-action-creators'
import {getWorkout as getWorkoutSelector, isLoading} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {SessionForm} from '../components/SessionForm/SessionForm'

export function NewSession ({workoutId, workout, isLoading, getWorkout}) {
  useEffect(() => { getWorkout(workoutId) }, [])
  return (
    <>
      <h1>New Session</h1>
      {isLoading
        ? <Loading/>
        : workout && <SessionForm workout={workout}/>}
    </>
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
  bindActionCreators({getWorkout}, dispatch)
)

export const NewSessionFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewSession)
