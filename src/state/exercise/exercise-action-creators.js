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

// Reset fetch exercises
export function resetFetchExercises() {
  return {type: EXERCISE.FETCH_RESET}
}

// Get a single exercise from DB by its id
export function getExercise(id) {
  return (dispatch) => {
    dispatch({type: EXERCISE.GET_INIT})
    return exercise.getExercise(id)
      .then((test) => dispatch({type: EXERCISE.GET_SUCCESS, item: test}))
      .catch(() => dispatch({
        type: EXERCISE.GET_FAILURE,
        errorMsg: `There was an error while fetching the exercise with id: ${id}`
      }))
  }
}

// Reset get exercise
export function resetGetExercise() {
  return {type: EXERCISE.GET_RESET}
}

// Create an exercise
export function createExercise(attrs) {
  return (dispatch) => {
    dispatch({type: EXERCISE.CREATE_INIT, item: attrs})
    return exercise.createExercise(attrs)
      .then((data) => dispatch({type: EXERCISE.CREATE_SUCCESS, item: data}))
      .catch((errors) => dispatch({type: EXERCISE.CREATE_FAILURE, errors}))
  }
}

// Reset new exercise attributes
export function resetCreateExercise() {
  return {type: EXERCISE.CREATE_RESET}
}

// Update an exercise
export function updateExercise(attrs) {
  return (dispatch) => {
    dispatch({type: EXERCISE.UPDATE_INIT, item: attrs})
    return exercise.updateExercise(attrs)
      .then((data) => dispatch({type: EXERCISE.UPDATE_SUCCESS, item: data}))
      .catch((errors) => dispatch({type: EXERCISE.UPDATE_FAILURE, errors}))
  }
}

// Reset update exercise attributes
export function resetUpdateExercise() {
  return {type: EXERCISE.UPDATE_RESET}
}

// Delete an exercise
export function deleteExercise(id) {
  return (dispatch) => {
    dispatch({type: EXERCISE.DELETE_INIT, id})
    return exercise.deleteExercise(id)
      .then(() => dispatch({type: EXERCISE.DELETE_SUCCESS, id}))
      .catch((errors) => dispatch({type: EXERCISE.DELETE_FAILURE, errors}))
  }
}

// Reset delete exercise attributes
export function resetDeleteExercise() {
  return {type: EXERCISE.DELETE_RESET}
}
