import React from 'react'
import {ExerciseItem} from './Item'

export const ExerciseList = ({handleDeleteExercise, exercises}) => (
  exercises.length > 0
    ? <ul className="wkr-exercise-list">
        {exercises.map((e,i) =>
          <li key={i}>
            <ExerciseItem
              key={i}
              handleDeleteExercise={handleDeleteExercise}
              exercise={e}/>
          </li>)}
      </ul>
    : <p>There are no exercises to show</p>
)
