import React from 'react'
import { Countdown } from '../../Time/Countdown'
import { WorkoutExerciseItem } from '../../Workout/View/ExerciseItem'
import { RoundsCompleted } from '../View/RoundsCompleted'
import './RoundRest.css'

export const SessionRoundRest = ({
  rounds,
  roundsCompleted,
  nextExercise,
  finishAt,
  onRoundRestCompleted,
}) => (
  <div className="wkr-session-round-rest text-center">
    <RoundsCompleted rounds={rounds} roundsCompleted={roundsCompleted} />
    <p className="h3 text-center font-weight-normal">Coming Up</p>
    <WorkoutExerciseItem
      className="h1 text-center font-weight-bold d-block"
      {...nextExercise}
    />
    <div className="h3 text-center">
      <Countdown
        finishAt={finishAt}
        onCountdownCompleted={onRoundRestCompleted}
      />
    </div>
  </div>
)
