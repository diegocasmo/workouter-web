import React, {useEffect} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getWorkout} from '../state/workout/workout-action-creators'
import {addError} from '../state/error/error-action-creators'
import {createSession} from '../api/session'
import {getWorkout as getWorkoutSelector, isLoading} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {SessionForm} from '../components/Session/Form/Form'

export const NewSession = ({
  history,
  workoutId,
  workout,
  isLoading,
  getWorkout,
  createSession,
  addError
}) => {
  useEffect(
    () => { getWorkout(workoutId) },
    [getWorkout, workoutId]
  )

  return (
    <>
      {isLoading
        ? <Loading/>
        : workout && <SessionForm
            workout={workout}
            onCreateSession={createSession}
            onCreateSessionSuccess={() => history.push('/')}
            onCreateSessionFailure={addError}/>}
    </>
  )
}

const mapStateToProps = (state, {match, history}) => {
  const workoutId = Number(match.params.workoutId)
  return {
    history,
    workoutId,
    workout: getWorkoutSelector(state, workoutId),
    isLoading: isLoading(state),
    createSession
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({getWorkout, addError}, dispatch)
)

export const NewSessionFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewSession)
