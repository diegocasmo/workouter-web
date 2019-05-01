import React from 'react'
import {Link} from 'react-router-dom'
import {WorkoutItemActions} from './ItemActions'
import './Item.css'

export const WorkoutItem = ({workout, handleDeleteWorkout}) => (
  <li className='wkr-workout-item list-group-item pt-0 pb-0'>
    <Link
      className='wkr-workout-item__name'
      to={`/workouts/${workout.id}`}>
      {workout.name} ({workout.exercises.length} exercises)
    </Link>
    <WorkoutItemActions
      workout={workout}
      handleDeleteWorkout={handleDeleteWorkout}/>
  </li>
)
