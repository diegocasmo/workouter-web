import React from 'react'
import {Link} from 'react-router-dom'

export const WorkoutItem = ({workout, handleDeleteWorkout}) => (
  <li className="wkr-workout-item">
    <Link
      className="wkr-workout-item__title"
      to={`/workouts/${workout.id}`}>
      {workout.name} ({workout.exercises.length} exercises)
    </Link>
    <span>
      &nbsp;<Link to={`/workouts/update/${workout.id}`}>Update</Link>
      &nbsp;<Link
              className='wkr-workout-item__action-delete'
              to={`/workouts`}
              onClick={(e) => {
                e.preventDefault()
                const msg = `Are you sure you want to delete "${workout.name}"`
                if(window.confirm(msg)) {
                  handleDeleteWorkout(workout.id)
                }
              }}>Delete</Link>
    </span>
  </li>
)
