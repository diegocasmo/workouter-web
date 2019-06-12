import React from 'react'
import {ExerciseItem} from './Item'

export const ExerciseList = ({handleDeleteExercise, exercises}) => (
  exercises.length > 0
    ? <div className='list-group list-group-flush'>
        {exercises.map((e,i) =>
          <ExerciseItem
            key={i}
            handleDeleteExercise={handleDeleteExercise}
            exercise={e}/>)}
      </div>
    : <p className='text-center m-0 pt-3'>There are no exercises to show</p>
)
