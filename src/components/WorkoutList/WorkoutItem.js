import React from 'react'
import {Link} from 'react-router-dom'

export const WorkoutItem = ({id,name}) => (
  <li className="wkr-workout-item">
    <Link to={`/workout/${id}`}
      className="wkr-workout-item__name">
      {name}
    </Link>
  </li>
)
