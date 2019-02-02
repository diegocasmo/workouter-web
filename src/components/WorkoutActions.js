import React from 'react'
import {Link} from 'react-router-dom'

export const WorkoutActions = ({workout, handleDeleteWorkout}) => (
  <span>
    &nbsp;
    <Link
      className="wkr-workout-actions__update"
      to={`/workouts/update/${workout.id}`}>Update</Link>
    &nbsp;
    <Link
      className='wkr-workout-actions__delete'
      to="/workouts"
      onClick={(e) => {
        const msg = `Are you sure you want to delete "${workout.name}"`
        if(window.confirm(msg)) {
          handleDeleteWorkout(workout.id)
        } else {
          // Prevent redirect only if user cancels deletion
          e.preventDefault()
        }
      }}>Delete</Link>
  </span>
)
