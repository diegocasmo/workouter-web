import {fetch} from '../../db/workout';
import {WORKOUT} from './workout-actions';

// Fetch a list of workouts
export function fetchWorkouts() {
  return (dispatch) => {
    dispatch({ type: WORKOUT.FETCH_INIT });
    return fetch()
      .then((data) => dispatch({ type: WORKOUT.FETCH_SUCCESS, data }))
      .catch(()    => dispatch({ type: WORKOUT.FETCH_FAILURE }))
  }
}
