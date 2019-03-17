import React from 'react'
import {Countdown} from '../../Time/Countdown'
import {WorkoutExerciseItem} from '../../Workout/View/ExerciseItem'
import {RoundsCompleted} from '../View/RoundsCompleted'

export const SessionRoundRest = ({rounds, roundsCompleted, nextExercise, finishAt, onRoundRestCompleted}) => (
  <>
    <RoundsCompleted rounds={rounds} roundsCompleted={roundsCompleted}/>
    <p>Coming up: <WorkoutExerciseItem {...nextExercise}/></p>
    <Countdown
      finishAt={finishAt}
      onCountdownCompleted={onRoundRestCompleted}/>
  </>
)
