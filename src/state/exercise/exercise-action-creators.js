import {fetch} from '../../db/exercise';
import {EXERCISE} from './exercise-actions';

// Fetch a list of exercises
export function fetchExercises() {
  return (dispatch) => {
    dispatch({type: EXERCISE.FETCH_INIT});
    return fetch()
      .then((data) => dispatch({type: EXERCISE.FETCH_SUCCESS, data}))
      .catch(() => dispatch({type: EXERCISE.FETCH_FAILURE}))
  }
}
