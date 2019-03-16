import React, {useReducer, useState} from 'react'
import {Prompt} from 'react-router-dom'
import {
  newSessionReducer, initializeState, SESSION_STATUS, ACTIONS
} from '../../../hooks/reducers/new-session-reducer'
import {SessionExercise} from './Exercise'
import {SessionExerciseRest} from './ExerciseRest'
import {SessionRoundRest} from './RoundRest'
import {SessionCompleted} from './Completed'
import {SessionStartup} from './Startup'
const moment = require('moment')

export function SessionForm ({
  onCreateSession,
  onCreateSessionSuccess,
  onCreateSessionFailure,
  workout,
  init = initializeState
}) {
  const [state, dispatch] = useReducer(newSessionReducer, workout, init)
  const [showPrompt, setShowPrompt] = useState(true)
  const {status, currExercise, ...session} = state
  const getSessionStatusForm = () => {
    switch(status) {
      case SESSION_STATUS.EXERCISE:
        return (
          <SessionExercise
            startedAt={session.startedAt}
            exercise={workout.exercises[currExercise]}
            onExerciseCompleted={() => dispatch({type: ACTIONS.EXERCISE_COMPLETED})}/>
        )
      case SESSION_STATUS.EXERCISE_REST:
        return (
          <SessionExerciseRest
            nextExercise={session.exercises[currExercise]}
            finishAt={moment().add(workout.restTimePerExercise, 'seconds')}
            onExerciseRestCompleted={() => dispatch({type: ACTIONS.EXERCISE_REST_COMPETED})}/>
        )
      case SESSION_STATUS.ROUND_REST:
        return (
          <SessionRoundRest
            rounds={session.rounds}
            roundsCompleted={session.roundsCompleted}
            nextExercise={session.exercises[0]}
            finishAt={moment().add(workout.restTimePerRound, 'seconds')}
            onRoundRestCompleted={() => dispatch({type: ACTIONS.ROUND_REST_COMPETED})}/>
        )
      case SESSION_STATUS.COMPLETED:
        return (
          <SessionCompleted
            session={session}
            onSubmit={onCreateSession}
            onSubmitSuccess={() => {
              // Session was successfully created, no need to show unsaved changes prompt
              setShowPrompt(false)
              onCreateSessionSuccess()
            }}
            onSubmitFailure={onCreateSessionFailure}/>
        )
      default:
        return (
          <SessionStartup
            nextExercise={session.exercises[0]}
            finishAt={moment().add(10, 'seconds')}
            onSessionStartupCompleted={() => dispatch({type: ACTIONS.START})}/>
        )
    }
  }
  return (
    <>
      <Prompt when={showPrompt} message='Are you sure you want to quit this session?'/>
      {getSessionStatusForm()}
    </>
  )
}
