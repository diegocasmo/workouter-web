import * as workout from '../../api/workout'
import {WORKOUT} from './workout-actions'
import {addError} from '../error/error-action-creators'

// Fetch a list of workouts
export function fetchWorkouts() {
  return (dispatch) => {
    dispatch({type: WORKOUT.FETCH_INIT})
    return workout.fetchWorkouts()
      .then((data) => dispatch({type: WORKOUT.FETCH_SUCCESS, items: data}))
      .catch((err) => dispatch(addError(err.message)))
  }
}
