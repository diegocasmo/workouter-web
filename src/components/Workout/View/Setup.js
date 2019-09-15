import React from 'react'
import { UNITS } from '../../../api/unit'

export const WorkoutSetup = ({
  name,
  rounds,
  restTimePerRound,
  restTimePerExercise,
}) => (
  <div className="wkr-workout-setup">
    <p className="wkr-workout-setup__title h1">Setup</p>
    <ul className="pl-4 list-unstyled">
      <li className="wkr-workout-setup__workout-name">Name: {name}</li>
      <li className="wkr-workout-setup__workout-rounds">Rounds: {rounds}</li>
      <li className="wkr-workout-setup__workout-rest-time-per-round">
        Rest time per round: {restTimePerRound} {UNITS.SECONDS.text}
      </li>
      <li className="wkr-workout-setup__workout-rest-time-per-exercise">
        Rest time per exercise: {restTimePerExercise} {UNITS.SECONDS.text}
      </li>
    </ul>
  </div>
)
