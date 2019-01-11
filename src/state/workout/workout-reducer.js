import {WORKOUT} from './workout-actions'
import {getCRUDInitialState} from '../utils/crud-initial-state'

export function workoutReducer(state = getCRUDInitialState(), action) {
  switch (action.type) {
    case WORKOUT.FETCH_INIT: {
      return {
        ...state,
        items: {
          ...state.items,
          errorMsg: null,
          isLoading: true
        }
      }
    }
    case WORKOUT.FETCH_SUCCESS: {
      return {
        ...state,
        items: {
          list: state.items.list.concat(action.items),
          errorMsg: null,
          isLoading: false
        }
      }
    }
    case WORKOUT.FETCH_FAILURE: {
      return {
        ...state,
        items: {
          ...state.items,
          errorMsg: action.errorMsg,
          isLoading: false
        }
      }
    }

    default:
      return state
  }
}
