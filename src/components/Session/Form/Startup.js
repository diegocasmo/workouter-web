import React from 'react'
import {Countdown} from '../../Time/Countdown'
import {WorkoutExerciseItem} from '../../Workout/View/ExerciseItem'

export const SessionStartup = ({nextExercise, finishAt, onSessionStartupCompleted}) => (
  <>
    <p className='h3 text-center font-weight-normal'>Coming Up</p>
    <WorkoutExerciseItem
      className='h1 text-center font-weight-bold d-block'
      {...nextExercise}/>
    <div className='h3 text-center'>
      <Countdown
        finishAt={finishAt}
        onCountdownCompleted={onSessionStartupCompleted}/>
    </div>
  </>
)
