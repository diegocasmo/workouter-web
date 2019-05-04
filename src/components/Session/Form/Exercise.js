import React from 'react'
import {Clock} from '../../Time/Clock'
import {Countdown} from '../../Time/Countdown'
import {WorkoutExerciseItem} from '../../Workout/View/ExerciseItem'
import {UNITS} from '../../../api/unit'
const moment = require('moment')

export const SessionExercise = ({startedAt, exercise, onExerciseCompleted}) => (
  <>
    <WorkoutExerciseItem
      className='h1 text-center font-weight-bold d-block'
      {...exercise}/>
    {exercise.quantityUnit === UNITS.SECONDS.value
      ? <div className='h3 text-center'>
          <Countdown
            finishAt={moment().add(exercise.quantity, 'seconds')}
            onCountdownCompleted={onExerciseCompleted}/>
        </div>
      : <div className='text-center'>
          <div className='h3'>
            <Clock startedAt={startedAt}/>
          </div>
          <button className='btn btn-primary btn-lg'
            onClick={(e) => {
              e.preventDefault()
              onExerciseCompleted()
            }}>
            Done
          </button>
        </div>}
  </>
)
