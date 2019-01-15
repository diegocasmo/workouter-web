import * as exercise from '../../api/exercise'
import {EXERCISE} from './exercise-actions'
import {addError} from '../error/error-action-creators'

// Fetch a list of exercises
export function fetchExercises() {
  return (dispatch) => {
    dispatch({type: EXERCISE.FETCH_INIT})
    return exercise.fetchExercises()
      .then((data) => dispatch({type: EXERCISE.FETCH_SUCCESS, items: data}))
      .catch((err) => dispatch(addError(err.message)))
  }
}

// Get a single exercise from DB by its id
export function getExercise(id) {
  return (dispatch) => {
    dispatch({type: EXERCISE.GET_INIT})
    return exercise.getExercise(id)
      .then((test) => dispatch({type: EXERCISE.GET_SUCCESS, item: test}))
      .catch((err) => dispatch(addError(err.message)))
  }
}

// Delete an exercise
export function deleteExercise(id) {
  return (dispatch) => {
    dispatch({type: EXERCISE.DELETE_INIT})
    return exercise.deleteExercise(id)
      .then(() => dispatch({type: EXERCISE.DELETE_SUCCESS, id}))
      .catch((err) => dispatch(addError(err.message)))
  }
}
