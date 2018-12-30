import { WORKOUT } from './workout-actions';

const initialState = {
  value: [],    // An array of fetched workouts
  isFetching: false, // True if more workouts are being fetched
  hasFetchFailed: false, // True if an error occurred while fetching
}

export function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case WORKOUT.FETCH_INIT:
      return { ...state,
        isFetching: true,
        hasFetchFailed: false
      }
    case WORKOUT.FETCH_SUCCESS:
      return { ...state,
        value: action.data,
        isFetching: false,
        hasFetchFailed: false
      }
    case WORKOUT.FETCH_FAILURE:
      return { ...state,
        isFetching: false,
        hasFetchFailed: true
      }
    default:
      return state
  }
}
