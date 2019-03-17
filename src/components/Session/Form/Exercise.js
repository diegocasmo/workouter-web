import React from 'react'
import {Clock} from '../../Time/Clock'
import {Countdown} from '../../Time/Countdown'
import {WorkoutExerciseItem} from '../../Workout/View/ExerciseItem'
import {UNITS} from '../../../api/unit'
const moment = require('moment')

export const SessionExercise = ({startedAt, exercise, onExerciseCompleted}) => (
  <>
    <WorkoutExerciseItem {...exercise}/>
    {exercise.quantityUnit === UNITS.SECONDS.value
      ? <Countdown
          finishAt={moment().add(exercise.quantity, 'seconds')}
          onCountdownCompleted={onExerciseCompleted}/>
      : <>
          <Clock startedAt={startedAt}/>
          <button onClick={(e) => {
            e.preventDefault()
            onExerciseCompleted()
          }}>Done</button>
        </>}
  </>
)
