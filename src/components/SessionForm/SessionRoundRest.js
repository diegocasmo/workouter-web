import React from 'react'
import {Countdown} from '../Clock/Countdown'
import {WorkoutExerciseItem} from '../WorkoutDetail/WorkoutExerciseItem'
import {RoundsCompleted} from './RoundsCompleted'

export const SessionRoundRest = ({rounds, roundsCompleted, nextExercise, finishAt, onRoundRestCompleted}) => (
  <>
    <RoundsCompleted rounds={rounds} roundsCompleted={roundsCompleted}/>
    <p>Coming up: <WorkoutExerciseItem {...nextExercise}/></p>
    <Countdown
      finishAt={finishAt}
      onCountdownCompleted={onRoundRestCompleted}/>
  </>
)
