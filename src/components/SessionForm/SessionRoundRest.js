import React from 'react'
import {Countdown} from '../Clock/Countdown'
import {WorkoutExerciseItem} from '../WorkoutDetail/WorkoutExerciseItem'

export const SessionRoundRest = ({nextExercise, finishAt, onRoundRestCompleted}) => (
  <>
    <span>Coming up: <WorkoutExerciseItem {...nextExercise}/></span>
    <Countdown
      finishAt={finishAt}
      onCountdownCompleted={onRoundRestCompleted}/>
  </>
)
