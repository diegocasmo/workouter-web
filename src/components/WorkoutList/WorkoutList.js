import React from 'react';
import {WorkoutItem} from './WorkoutItem';

export const WorkoutList = ({workouts}) => {
  if(workouts.length > 0) {
    return (
      <ul className="wkr-workout-list">
        {workouts.map((w,i) => <WorkoutItem key={i} {...w}/>)}
      </ul>
    )
  } else {
    return (
      <p>There are no workouts to show</p>
    )
  }
}
