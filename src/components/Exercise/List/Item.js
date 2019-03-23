import React from 'react'
import {Link} from 'react-router-dom'

export const ExerciseItem = ({handleDeleteExercise, exercise}) => (
  <div className='wkr-exercise-item'>
    <span className='wkr-exercise-item__name'>{exercise.name}</span>
    <span>
      &nbsp;<Link to={`/exercises/update/${exercise.id}`}>Update</Link>
      &nbsp;<Link
              className='wkr-exercise-item__action-delete'
              to={`/exercises`}
              onClick={(e) => {
                e.preventDefault()
                const msg = `Are you sure you want to delete "${exercise.name}"`
                if(window.confirm(msg)) {
                  handleDeleteExercise(exercise.id)
                }
              }}>Delete</Link>
    </span>
  </div>
)
