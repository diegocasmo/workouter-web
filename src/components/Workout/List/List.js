import React from 'react'
import {WorkoutItem} from './Item'

export const WorkoutList = ({workouts}) => (
  workouts.length > 0
    ? <ul className='wkr-workout-list list-group list-group-flush'>
        {workouts.map((w,i) =>
          <li
            key={i}
            className='list-group-item'>
            <WorkoutItem workout={w}/>
          </li>)}
      </ul>
    : <p className='text-center mt-2 mb-0'>There are no workouts to show</p>
)
