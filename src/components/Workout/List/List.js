import React from 'react'
import PropTypes from 'prop-types'
import {WorkoutItem} from './Item'

export const WorkoutList = ({hasMore, workouts}) => (
  hasMore || workouts.length > 0
    ? <div className='list-group list-group-flush'>
        {workouts.map((w, i) => <WorkoutItem key={i} workout={w}/>)}
      </div>
    : <p className='text-center m-0 pt-3'>There are no workouts to show</p>
)

WorkoutList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  workouts: PropTypes.array.isRequired
}
