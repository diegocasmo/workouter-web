import React from 'react'
import {ExerciseItem} from './ExerciseItem'

export const ExerciseList = ({handleDeleteExercise, exercises}) => {
  if(exercises.length > 0) {
    return (
      <ul className="wkr-exercise-list">
        {exercises.map((e,i) =>
          <ExerciseItem
            key={i}
            handleDeleteExercise={handleDeleteExercise}
            exercise={e}/>)}
      </ul>
    )
  } else {
    return (
      <p>There are no exercises to show</p>
    )
  }
}
