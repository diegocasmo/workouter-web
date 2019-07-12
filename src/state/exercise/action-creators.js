import * as exercise from '../../api/exercise'
import {EXERCISE} from './actions'
import {addError} from '../error/action-creators'

// Fetch exercises from API
export function fetchExercises(pageNum = 0) {
  return async (dispatch, getState) => {
    const {perPage} = getState().exercises
    dispatch({type: EXERCISE.FETCH_INIT})
    try {
      const items = await exercise.fetchExercises({pageNum, perPage})
      dispatch({type: EXERCISE.FETCH_SUCCESS, items})
    } catch (err) {
      dispatch({type: EXERCISE.FETCH_FAILURE})
      dispatch(addError(err.message))
    }
  }
}

// Clear exercises that have been fetched
export function fetchClear() {
  return {type: EXERCISE.FETCH_CLEAR}
}

// Get a single exercise from DB by its id
export function getExercise(id) {
  return async (dispatch) => {
    dispatch({type: EXERCISE.GET_INIT})
    try {
      const item  = await exercise.getExercise(id)
      dispatch({type: EXERCISE.GET_SUCCESS, item})
    } catch (err) {
      dispatch({type: EXERCISE.GET_FAILURE})
      dispatch(addError(err.message))
    }
  }
}

// Delete an exercise
export function deleteExercise(id) {
  return async (dispatch) => {
    dispatch({type: EXERCISE.DELETE_INIT})
    try {
      await exercise.deleteExercise(id)
      dispatch({type: EXERCISE.DELETE_SUCCESS, id})
    } catch (err) {
      dispatch({type: EXERCISE.DELETE_FAILURE})
      dispatch(addError(err.message))
    }
  }
}
