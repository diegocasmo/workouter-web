import React from 'react'
import {ExerciseItem} from './Item'

export const ExerciseList = ({handleDeleteExercise, exercises}) => (
  exercises.length > 0
    ? <ul className='wkr-exercise-list list-group list-group-flush'>
        {exercises.map((e,i) =>
          <li
          key={i}
          className='list-group-item pt-0 pb-0'>
            <ExerciseItem
              key={i}
              handleDeleteExercise={handleDeleteExercise}
              exercise={e}/>
          </li>)}
      </ul>
    : <p className='text-center mt-2 mb-0'>There are no exercises to show</p>
)
