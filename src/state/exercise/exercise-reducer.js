import {EXERCISE} from './exercise-actions';

const initialState = {
  value: [],    // An array of fetched exercises
  isFetching: false, // True if more exercises are being fetched
  hasFetchFailed: false, // True if an error occurred while fetching
}

export function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case EXERCISE.FETCH_INIT:
      return { ...state,
        isFetching: true,
        hasFetchFailed: false
      }
    case EXERCISE.FETCH_SUCCESS:
      return { ...state,
        value: action.data,
        isFetching: false,
        hasFetchFailed: false
      }
    case EXERCISE.FETCH_FAILURE:
      return { ...state,
        isFetching: false,
        hasFetchFailed: true
      }
    default:
      return state
  }
}
