import {fetch} from '../../db/models/exercise';
import {EXERCISE} from './exercise-actions';

// Fetch a list of exercises
export function fetchExercises() {
  return (dispatch) => {
    dispatch({type: EXERCISE.FETCH_INIT});
    return fetch()
      .then((data) => dispatch({type: EXERCISE.FETCH_SUCCESS, items: data}))
      .catch(() => dispatch({
        type: EXERCISE.FETCH_FAILURE,
        errorMsg: 'There was an error while fetching the exercises'
      }));
  }
}
