import React from 'react'
import {Link} from 'react-router-dom'
import {WorkoutActions} from '../../../components/WorkoutActions'

export const WorkoutItem = ({workout, handleDeleteWorkout}) => (
  <li className='wkr-workout-item list-group-item'>
    <Link
      className='wkr-workout-item__title'
      to={`/workouts/${workout.id}`}>
      {workout.name} ({workout.exercises.length} exercises)
    </Link>
    <WorkoutActions
      workout={workout}
      handleDeleteWorkout={handleDeleteWorkout}/>
  </li>
)
