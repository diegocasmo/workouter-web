import { WORKOUT } from './workout-actions';

const initialState = {
  value: [],    // An array of fetched workouts
  isFetching: false, // True if more workouts are being fetched
  hasFetchFailure: false, // True if an error occurred while fetching
}

export function workoutReducer(state = initialState, action) {
  switch (action.type) {
    case WORKOUT.FETCH_INIT:
      return { ...state,
        isFetching: true,
        hasFetchFailure: false
      }
    case WORKOUT.FETCH_SUCCESS:
      return { ...state,
        value: action.data,
        isFetching: false,
        hasFetchFailure: false
      }
    case WORKOUT.FETCH_FAILURE:
      return { ...state,
        isFetching: false,
        hasFetchFailure: true
      }
    default:
      return state
  }
}
