import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

export const WorkoutListHeader = () => (
  <div className='wkr-workout-list-header sticky-top'>
    <p className='wkr-workout-list-header__title h2'>Workouts</p>
    <Link
      to='/workouts/new'
      className='wkr-workout-list-header__link btn btn-primary btn'>
      New Workout
    </Link>
  </div>
)
