import React from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

export const ExerciseListHeader = () => (
  <div className='wkr-exercise-list-header sticky-top'>
    <p className='wkr-exercise-list-header__title h2'>Exercises</p>
    <Link
      to='/exercises/new'
      className='wkr-exercise-list-header__link btn btn-primary btn'>
      New Exercise
    </Link>
  </div>
)
