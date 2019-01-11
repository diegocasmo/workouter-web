import {MEASUREMENT} from './measurement-actions'
import {getCRUDInitialState} from '../utils/crud-initial-state'

export function measurementReducer(state = getCRUDInitialState(), action) {
  switch (action.type) {
    case MEASUREMENT.FETCH_INIT: {
      return {
        ...state,
        items: {
          ...getCRUDInitialState().items,
          isLoading: true
        }
      }
    }
    case MEASUREMENT.FETCH_SUCCESS: {
      return {
        ...state,
        items: {
          list: state.items.list.concat(action.items),
          errorMsg: null,
          isLoading: false
        }
      }
    }
    case MEASUREMENT.FETCH_FAILURE: {
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
