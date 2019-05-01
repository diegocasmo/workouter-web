import React from 'react'
import {Link} from 'react-router-dom'
import './ItemActions.css'

export const WorkoutItemActions = ({workout, handleDeleteWorkout}) => (
  <span className='wkr-workout-item-actions__dropdown dropdown'>
    <button
      className='wkr-workout-item-actions__dropdown-btn btn btn-sm dropdown-toggle'
      type='button'
      id='wkr-workout-item-actions__dropdown-menu-button'
      data-toggle='dropdown'
      aria-haspopup='true'
      aria-expanded='false'/>
    <div
      className='dropdown-menu dropdown-menu-right'
      aria-labelledby='wkr-workout-item-actions__dropdown-menu-button'>
      <Link
        to={`/sessions/new/${workout.id}`}
        className='dropdown-item'>
        Start
      </Link>
      <Link
        to={`/workouts/update/${workout.id}`}
        className='dropdown-item'>
        Update
      </Link>
      <Link
        to='/workouts'
        className='wkr-workout-item-actions__delete-link dropdown-item text-danger'
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
  </span>
)
