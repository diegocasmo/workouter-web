import React from 'react'
import {Link} from 'react-router-dom'
import './Item.css'

export const WorkoutItem = ({workout}) => (
  <Link
    className='wkr-workout-item list-group-item d-flex justify-content-between align-items-center'
    to={`/workouts/${workout.id}`}>
    <span className='wkr-workout-item__name'>{workout.name}</span>
    <span className='wkr-workout-item__exercise-count badge badge-pill'>{workout.exercises.length} exercises</span>
  </Link>
)
