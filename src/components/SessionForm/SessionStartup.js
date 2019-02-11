import React from 'react'
import {Countdown} from '../Countdown'
import {WorkoutExerciseItem} from '../WorkoutDetail/WorkoutExerciseItem'

export const SessionStartup = ({nextExercise, finishAt, onSessionStartupCompleted}) => (
  <>
    <span>Coming up: <WorkoutExerciseItem {...nextExercise}/></span>
    <Countdown
      finishAt={finishAt}
      onCountdownCompleted={onSessionStartupCompleted}/>
  </>
)
