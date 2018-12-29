import React from 'react';

export const WorkoutItem = ({title}) => {
  return (
    <li className="wkr-workout-item">
      <span className="wkr-workout-item__title">{title}</span>
    </li>
  )
}
