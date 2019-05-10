import React from 'react'
import {WorkoutExerciseItem} from './ExerciseItem'

export const WorkoutExerciseList = ({exercises=[]}) => (
  <div>
    <p className='h3 wkr-workout-exercise-list__title'>Exercises</p>
    {exercises.length > 0
      ? <ol>
          {exercises.map((x, i) => <li key={i}><WorkoutExerciseItem {...x}/></li>)}
        </ol>
      : <p className='wkr-workout-exercise-list__empty-text'>There are no exercises to show</p>}
  </div>
)
