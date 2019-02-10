import React, {useReducer} from 'react'
import {newSessionReducer, initializeState, SESSION_STATUS, ACTIONS} from '../../hooks/reducers/new-session-reducer'
import {SessionExercise} from './SessionExercise'
import {SessionExerciseRest} from './SessionExerciseRest'
import {SessionRoundRest} from './SessionRoundRest'
import {SessionCompleted} from './SessionCompleted'
import {Countdown} from '../Countdown'
const moment = require('moment')

export function SessionForm ({workout, init = initializeState}) {
  const [state, dispatch] = useReducer(newSessionReducer, workout, init)
  const {status, currExercise, startedAt} = state
  switch(status) {
    case SESSION_STATUS.EXERCISE:
      return (
        <SessionExercise
          startedAt={startedAt}
          exercise={workout.exercises[currExercise]}
          onExerciseCompleted={() => dispatch({type: ACTIONS.EXERCISE_COMPLETED})}/>
      )
    case SESSION_STATUS.EXERCISE_REST:
      return (
        <SessionExerciseRest
          finishAt={moment().add(workout.restTimePerExercise, 'seconds')}
          onExerciseRestCompleted={() => dispatch({type: ACTIONS.EXERCISE_REST_COMPETED})}/>
      )
    case SESSION_STATUS.ROUND_REST:
      return (
        <SessionRoundRest
          finishAt={moment().add(workout.restTimePerRound, 'seconds')}
          onRoundRestCompleted={() => dispatch({type: ACTIONS.ROUND_REST_COMPETED})}/>
      )
    case SESSION_STATUS.COMPLETED:
      return <SessionCompleted/>
    default:
      return (
        <Countdown
          finishAt={moment().add(10, 'seconds')}
          onCountdownCompleted={() => dispatch({type: ACTIONS.START})}/>
      )
  }
}
