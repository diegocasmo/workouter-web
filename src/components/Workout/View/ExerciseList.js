import React from 'react'
import {WorkoutExerciseItem} from './ExerciseItem'

export const WorkoutExerciseList = ({exercises=[]}) => (
  <div>
    <h3 className="wkr-workout-exercise-list__title">Exercises:</h3>
    {exercises.length > 0
      ? <ol>
          {exercises.map((x, i) => <li key={i}><WorkoutExerciseItem {...x}/></li>)}
        </ol>
      : <p>There are no exercises to show</p>}
  </div>
)
