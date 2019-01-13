import * as workout from '../../db/models/workout'
import {WORKOUT} from './workout-actions'

// Fetch a list of workouts
export function fetchWorkouts() {
  return (dispatch) => {
    dispatch({type: WORKOUT.FETCH_INIT})
    return workout.fetchWorkouts()
      .then((data) => dispatch({type: WORKOUT.FETCH_SUCCESS, items: data}))
      .catch(() => dispatch({
        type: WORKOUT.FETCH_FAILURE,
        errorMsg: 'There was an error while fetching the workouts'
      }))
  }
}

// Reset fetch workouts
export function resetFetchWorkouts() {
  return {type: WORKOUT.FETCH_RESET}
}
