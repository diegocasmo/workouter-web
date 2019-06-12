import React from 'react'
import {Link} from 'react-router-dom'

export const WorkoutActions = ({workout, handleDeleteWorkout}) => (
  <div className='text-center'>
    <Link
      className='wkr-workout-actions__start btn btn-primary btn-lg mr-3'
      to={`/sessions/new/${workout.id}`}>Start</Link>
    <Link
      className='wkr-workout-actions__update btn btn-secondary btn-lg mr-3'
      to={`/workouts/update/${workout.id}`}>Update</Link>
    <Link
      className='wkr-workout-actions__delete btn btn-danger btn-lg'
      to='/workouts'
      onClick={(e) => {
        const msg = `Are you sure you want to delete '${workout.name}'`
        if(window.confirm(msg)) {
          handleDeleteWorkout(workout.id)
        } else {
          // Prevent redirect only if user cancels deletion
          e.preventDefault()
        }
      }}>Delete</Link>
  </div>
)
