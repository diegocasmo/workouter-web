import * as exercise from '../../db/models/exercise'
import {EXERCISE} from './exercise-actions'

// Fetch a list of exercises
export function fetchExercises() {
  return (dispatch) => {
    dispatch({type: EXERCISE.FETCH_INIT})
    return exercise.fetchExercises()
      .then((data) => dispatch({type: EXERCISE.FETCH_SUCCESS, items: data}))
      .catch(() => dispatch({
        type: EXERCISE.FETCH_FAILURE,
        errorMsg: 'There was an error while fetching the exercises'
      }))
  }
}

// Create an exercise
export function createExercise(attrs) {
  return (dispatch) => {
    dispatch({type: EXERCISE.CREATE_INIT, item: attrs})

    // Attempt to create exercise in DB
    return exercise.createExercise(attrs)
      .then((data) => dispatch({type: EXERCISE.CREATE_SUCCESS, item: data}))
      .catch((errors) => dispatch({type: EXERCISE.CREATE_FAILURE, errors}))
  }
}
