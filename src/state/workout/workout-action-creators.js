import {fetch} from '../../db/models/workout'
import {WORKOUT} from './workout-actions'

// Fetch a list of workouts
export function fetchWorkouts() {
  return (dispatch) => {
    dispatch({type: WORKOUT.FETCH_INIT})
    return fetch()
      .then((data) => dispatch({type: WORKOUT.FETCH_SUCCESS, items: data}))
      .catch(() => dispatch({
        type: WORKOUT.FETCH_FAILURE,
        errorMsg: 'There was an error while fetching the workouts'
      }))
  }
}
