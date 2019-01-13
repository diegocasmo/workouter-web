import {MEASUREMENT} from './measurement-actions'

/**
 * CRUD reducer state format:
 * getItems: {
 *   list: [], // An array of resources
 *   errorMsg: null, // Error message text set if there was an error while fetching
 *   isLoading: false // True if resources are being fetch
 * }
*/
export const initialState = {
  getItems: {list: [], errorMsg: null, isLoading: false}
}

export function measurementReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch actions
    case MEASUREMENT.FETCH_INIT: {
      return {
        ...state,
        getItems: {
          ...state.getItems,
          isLoading: true
        }
      }
    }
    case MEASUREMENT.FETCH_SUCCESS: {
      return {
        ...state,
        getItems: {
          list: state.getItems.list.concat(action.items),
          errorMsg: null,
          isLoading: false
        }
      }
    }
    case MEASUREMENT.FETCH_FAILURE: {
      return {
        ...state,
        getItems: {
          ...state.getItems,
          errorMsg: action.errorMsg,
          isLoading: false
        }
      }
    }
    case MEASUREMENT.FETCH_RESET: {
      return {
        ...state,
        getItems: initialState.getItems
      }
    }

    default:
      return state
  }
}
