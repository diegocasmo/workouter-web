import * as workout from '../../api/workout'
import {WORKOUT} from './workout-actions'
import {addError} from '../error/error-action-creators'

// Fetch a list of workouts
export function fetchWorkouts() {
  return (dispatch) => {
    dispatch({type: WORKOUT.FETCH_INIT})
    return workout.fetchWorkouts()
      .then((data) => dispatch({type: WORKOUT.FETCH_SUCCESS, items: data}))
      .catch((err) => {
        dispatch({type: WORKOUT.FETCH_FAILURE})
        dispatch(addError(err.message))
      })
  }
}

// Get a single workout from DB by its id
export function getWorkout(id) {
  return async (dispatch) => {
    dispatch({type: WORKOUT.GET_INIT})
    try {
      const item = await workout.getWorkout(id)
      dispatch({type: WORKOUT.GET_SUCCESS, item})
    } catch(err) {
      dispatch({type: WORKOUT.GET_FAILURE})
      dispatch(addError(err.message))
    }
  }
}

// Delete a workout
export function deleteWorkout(id) {
  return (dispatch) => {
    dispatch({type: WORKOUT.DELETE_INIT})
    return workout.deleteWorkout(id)
      .then(() => dispatch({type: WORKOUT.DELETE_SUCCESS, id}))
      .catch((err) => {
        dispatch({type: WORKOUT.DELETE_FAILURE})
        dispatch(addError(err.message))
      })
  }
}
