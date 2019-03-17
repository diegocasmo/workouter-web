import React from 'react'
import {Countdown} from '../../Time/Countdown'
import {WorkoutExerciseItem} from '../../Workout/View/ExerciseItem'

export const SessionStartup = ({nextExercise, finishAt, onSessionStartupCompleted}) => (
  <>
    <span>Coming up: <WorkoutExerciseItem {...nextExercise}/></span>
    <Countdown
      finishAt={finishAt}
      onCountdownCompleted={onSessionStartupCompleted}/>
  </>
)
