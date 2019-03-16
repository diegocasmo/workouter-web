import React from 'react'
import {UNITS} from '../../../api/unit'

export const WorkoutSetup = ({
  name,
  rounds,
  restTimePerRound,
  restTimePerExercise
}) => (
  <div className="wkr-workout-setup">
    <h3 className="wkr-workout-setup__title">Setup:</h3>
    <p className="wrk-workout-setup__workout-name">Name: {name}</p>
    <p className="wrk-workout-setup__workout-rounds">Rounds: {rounds}</p>
    <p className="wrk-workout-setup__workout-rest-time-per-round">
      Rest time per round: {restTimePerRound} {UNITS.SECONDS.value}
    </p>
    <p className="wrk-workout-setup__workout-rest-time-per-exercise">
      Rest time per exercise: {restTimePerExercise} {UNITS.SECONDS.value}
    </p>
  </div>
)
