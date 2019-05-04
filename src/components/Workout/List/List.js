import React from 'react'
import {WorkoutItem} from './Item'

export const WorkoutList = ({workouts}) => (
  workouts.length > 0
    ? <div className='list-group list-group-flush'>
        {workouts.map((w,i) => <WorkoutItem key={i} workout={w}/>)}
      </div>
    : <p className='text-center mt-2 mb-0'>There are no workouts to show</p>
)
