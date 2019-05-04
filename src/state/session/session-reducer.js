import {SESSION} from './session-actions'
import {REQUEST_STATUS} from '../utils/request-status'

export const initialState = {
  perPage: 12,
  hasMore: true,
  items : {},
  status: REQUEST_STATUS.NONE
}

export function sessionReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch actions
    case SESSION.FETCH_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.GET
      }
    }
    case SESSION.FETCH_SUCCESS: {
      const items = action.items.reduce((acc, x) => ({...acc, [x.id]: x}), state.items)
      return {
        ...state,
        hasMore: action.items.length >= state.perPage,
        items,
        status: REQUEST_STATUS.NONE
      }
    }
    case SESSION.FETCH_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.NONE
      }
    }
    case SESSION.FETCH_CLEAR: {
      return initialState
    }

    // Get actions
    case SESSION.GET_INIT: {
      return {
        ...state,
        status: REQUEST_STATUS.GET
      }
    }
    case SESSION.GET_SUCCESS: {
      const items = [action.item].reduce((acc, x) => ({...acc, [x.id]: x}), state.items)
      return {
        ...state,
        items,
        status: REQUEST_STATUS.NONE
      }
    }
    case SESSION.GET_FAILURE: {
      return {
        ...state,
        status: REQUEST_STATUS.NONE
      }
    }
    default:
      return state
  }
}
