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
    : <p className='text-center mt-2 mb-0'>There are no exercises to show</p>
)
