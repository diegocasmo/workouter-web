import {WORKOUT} from './workout-actions'
import {REQUEST_STATUS} from '../utils/request-status'

export const initialState = {
  items : {},
  status: REQUEST_STATUS.NONE
}

export function workoutReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch actions
    case WORKOUT.FETCH_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.GET
      }
    }
    case WORKOUT.FETCH_SUCCESS: {
      const items = action.items.reduce((acc, x) => ({...acc, [x.id]: x}), state.items)
      return {
        ...state,
        items,
        status: REQUEST_STATUS.NONE
      }
    }

    // Delete actions
    case WORKOUT.DELETE_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.DELETE
      }
    }
    case WORKOUT.DELETE_SUCCESS: {
      // Delete workout from items
      const items = Object.entries(state.items)
                      .filter(([_, x]) => x.id !== action.id)
                      .reduce((acc, [_, x]) => ({...acc, [x.id]: x}), {})
      return {
        ...state,
        items,
        status: REQUEST_STATUS.NONE
      }
    }

    default:
      return state
  }
}
