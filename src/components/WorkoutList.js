import React from 'react';
import {WorkoutItem} from './WorkoutItem';

export const WorkoutList = ({workouts}) => {
  return (
    <ul className="wkr-workout-list">
      {workouts.map((w,i) => <WorkoutItem key={i} {...w}/>)}
    </ul>
  )
}
