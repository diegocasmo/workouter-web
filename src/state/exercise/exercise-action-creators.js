import * as exercise from '../../api/exercise'
import {EXERCISE} from './exercise-actions'
import {addError} from '../error/error-action-creators'

// Fetch a list of exercises
export function fetchExercises() {
  return (dispatch) => {
    dispatch({type: EXERCISE.FETCH_INIT})
    return exercise.fetchExercises()
      .then((data) => dispatch({type: EXERCISE.FETCH_SUCCESS, items: data}))
      .catch((err) => {
        dispatch({type: EXERCISE.FETCH_FAILURE})
        dispatch(addError(err.message))
      })
  }
}

// Get a single exercise from DB by its id
export function getExercise(id) {
  return (dispatch) => {
    dispatch({type: EXERCISE.GET_INIT})
    return exercise.getExercise(id)
      .then((item) => dispatch({type: EXERCISE.GET_SUCCESS, item}))
      .catch((err) => {
        dispatch({type: EXERCISE.GET_FAILURE})
        dispatch(addError(err.message))
      })
  }
}

// Delete an exercise
export function deleteExercise(id) {
  return (dispatch) => {
    dispatch({type: EXERCISE.DELETE_INIT})
    return exercise.deleteExercise(id)
      .then(() => dispatch({type: EXERCISE.DELETE_SUCCESS, id}))
      .catch((err) => {
        dispatch({type: EXERCISE.DELETE_FAILURE})
        dispatch(addError(err.message))
      })
  }
}
