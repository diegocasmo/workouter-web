import React from 'react'
import {Link} from 'react-router-dom'

export const Navigation = () => (
  <ul>
    <li><Link to='/sessions'>Sessions</Link></li>
    <li><Link to='/workouts'>Workouts</Link></li>
    <li><Link to='/workouts/new'>Create Workout</Link></li>
    <li><Link to='/exercises'>Exercises</Link></li>
    <li><Link to='/exercises/new'>Create Exercise</Link></li>
  </ul>
)
