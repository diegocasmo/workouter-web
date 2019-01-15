import React from 'react'
import {Link} from 'react-router-dom'

export const Navigation = () => (
  <ul>
    <li><Link to="/workouts">Workouts</Link></li>
    <li><Link to="/exercises">Exercises</Link></li>
  </ul>
)
