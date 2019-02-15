import React from 'react'
import {Timer} from '../Clock/Timer'
import {Countdown} from '../Clock/Countdown'
import {WorkoutExerciseItem} from '../WorkoutDetail/WorkoutExerciseItem'
import {UNITS} from '../../api/unit'
const moment = require('moment')

export const SessionExercise = ({startedAt, exercise, onExerciseCompleted}) => (
  <>
    <WorkoutExerciseItem {...exercise}/>
    {exercise.quantityUnit === UNITS.SECONDS.value
      ? <Countdown
          finishAt={moment().add(exercise.quantity, 'seconds')}
          onCountdownCompleted={onExerciseCompleted}/>
      : <>
          <Timer startedAt={startedAt}/>
          <button onClick={(e) => {
            e.preventDefault()
            onExerciseCompleted()
          }}>Done</button>
        </>}
  </>
)
