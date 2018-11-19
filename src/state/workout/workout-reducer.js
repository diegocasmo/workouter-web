import { WORKOUT } from './workout-actions';

const initialState = {
  value     : [],    // An array of fetched workouts
  isFetching: false, // True if more workouts are being fetched
  hasError  : false, // True if an error has occurred
}

export function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case WORKOUT.FETCH_INIT:
      return { ...state,
        isFetching: true,
        hasError: false
      }
    case WORKOUT.FETCH_SUCCESS:
      return { ...state,
        value: action.data,
        isFetching: false,
        hasError: false
      }
    case WORKOUT.FETCH_FAILURE:
      return { ...state,
        isFetching: false,
        hasError: true
      }
    default:
      return state
  }
}
