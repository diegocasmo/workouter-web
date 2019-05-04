import React from 'react'
import {Link} from 'react-router-dom'
import './Item.css'

export const WorkoutItem = ({workout}) => (
  <Link
    className='wkr-workout-item__name'
    to={`/workouts/${workout.id}`}>
    {workout.name} ({workout.exercises.length} exercises)
  </Link>
)
