import React from 'react'
import {Link} from 'react-router-dom'

export const WorkoutItem = ({id,name,exercises}) => (
  <li className="wkr-workout-item">
    <Link to={`/workouts/${id}`}>
      {name} ({exercises.length} exercises)
    </Link>
  </li>
)
