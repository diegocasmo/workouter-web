import React from 'react'
import {Timer} from '../Timer'
import {WorkoutExerciseItem} from '../WorkoutDetail/WorkoutExerciseItem'

export const SessionExercise = ({startedAt, workoutExercise, onExerciseCompleted}) => (
  <>
    <WorkoutExerciseItem {...workoutExercise}/>
    <Timer startedAt={startedAt}/>
    <button onClick={(e) => {
      e.preventDefault()
      onExerciseCompleted()
    }}>Done</button>
  </>
)
