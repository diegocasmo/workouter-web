import React from 'react'
import {WorkoutExerciseItem} from './WorkoutExerciseItem'

export const WorkoutExerciseList = ({exercises=[]}) => (
  <div>
    <h3 className="wkr-workout-exercise-list__title">Exercises:</h3>
    <ol>
      {exercises.length > 0 &&
        exercises.map((x, i) => <WorkoutExerciseItem key={i} {...x}/>)}
    </ol>
  </div>
)
