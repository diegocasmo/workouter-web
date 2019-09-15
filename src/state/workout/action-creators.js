import * as workout from '../../api/workout'
import { WORKOUT } from './actions'
import { addError } from '../error/action-creators'

// Fetch workouts from API
export function fetchWorkouts(pageNum = 0) {
  return async (dispatch, getState) => {
    const { perPage } = getState().workouts
    dispatch({ type: WORKOUT.FETCH_INIT })
    try {
      const items = await workout.fetchWorkouts({ pageNum, perPage })
      dispatch({ type: WORKOUT.FETCH_SUCCESS, items })
    } catch (err) {
      dispatch({ type: WORKOUT.FETCH_FAILURE })
      dispatch(addError(err.message))
    }
  }
}

// Clear workouts that have been fetched
export function fetchClear() {
  return { type: WORKOUT.FETCH_CLEAR }
}

// Get a single workout from DB by its id
export function getWorkout(id) {
  return async dispatch => {
    dispatch({ type: WORKOUT.GET_INIT })
    try {
      const item = await workout.getWorkout(id)
      dispatch({ type: WORKOUT.GET_SUCCESS, item })
    } catch (err) {
      dispatch({ type: WORKOUT.GET_FAILURE })
      dispatch(addError(err.message))
    }
  }
}

// Delete a workout
export function deleteWorkout(id) {
  return dispatch => {
    dispatch({ type: WORKOUT.DELETE_INIT })
    return workout
      .deleteWorkout(id)
      .then(() => dispatch({ type: WORKOUT.DELETE_SUCCESS, id }))
      .catch(err => {
        dispatch({ type: WORKOUT.DELETE_FAILURE })
        dispatch(addError(err.message))
      })
  }
}
