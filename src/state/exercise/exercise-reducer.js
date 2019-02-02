import {EXERCISE} from './exercise-actions'
import {REQUEST_STATUS} from '../utils/request-status'

export const initialState = {
  items : {},
  status: REQUEST_STATUS.NONE
}

export function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch actions
    case EXERCISE.FETCH_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.GET
      }
    }
    case EXERCISE.FETCH_SUCCESS: {
      const items = action.items.reduce((acc, x) => ({...acc, [x.id]: x}), state.items)
      return {
        ...state,
        items,
        status: REQUEST_STATUS.NONE
      }
    }
    case EXERCISE.FETCH_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.NONE
      }
    }

    // Get actions
    case EXERCISE.GET_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.GET
      }
    }
    case EXERCISE.GET_SUCCESS: {
      const items = [action.item].reduce((acc, x) => ({...acc, [x.id]: x}), state.items)
      return {
        ...state,
        items,
        status: REQUEST_STATUS.NONE
      }
    }
    case EXERCISE.GET_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.NONE
      }
    }

    // Delete actions
    case EXERCISE.DELETE_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.DELETE
      }
    }
    case EXERCISE.DELETE_SUCCESS: {
      // Delete exercise from items
      const items = Object.entries(state.items)
                      .filter(([_, x]) => x.id !== action.id)
                      .reduce((acc, [_, x]) => ({...acc, [x.id]: x}), {})
      return {
        ...state,
        items,
        status: REQUEST_STATUS.NONE
      }
    }
    case EXERCISE.DELETE_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.NONE
      }
    }

    default:
      return state
  }
}
