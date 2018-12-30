import React from 'react';
import {Link} from 'react-router-dom';

export const WorkoutItem = ({id,title}) => {
  return (
    <li className="wkr-workout-item">
      <Link to={`/workout/${id}`}
        className="wkr-workout-item__title">
        {title}
      </Link>
    </li>
  )
}
