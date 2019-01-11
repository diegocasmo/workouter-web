import {EXERCISE} from './exercise-actions'
import {getCRUDInitialState} from '../utils/crud-initial-state'

export function exerciseReducer(state = getCRUDInitialState(), action) {
  switch (action.type) {
    case EXERCISE.FETCH_INIT: {
      return {
        ...state,
        items: {
          ...state.items,
          errorMsg: null,
          isLoading: true
        }
      }
    }
    case EXERCISE.FETCH_SUCCESS: {
      return {
        ...state,
        items: {
          list: state.items.list.concat(action.items),
          errorMsg: null,
          isLoading: false
        }
      }
    }
    case EXERCISE.FETCH_FAILURE: {
      return {
        ...state,
        items: {
          ...state.items,
          errorMsg: action.errorMsg,
          isLoading: false
        }
      }
    }

    case EXERCISE.CREATE_INIT: {
      return {
        ...state,
        newItem: {
          attrs: action.item,
          errors: {},
          isLoading: true
        }
      }
    }
    case EXERCISE.CREATE_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          list: state.items.list.concat(action.item)
        },
        newItem: getCRUDInitialState().newItem
      }
    }
    case EXERCISE.CREATE_FAILURE: {
      return {
        ...state,
        newItem: {
          ...state.newItem,
          errors: action.errors,
          isLoading: false
        }
      }
    }
    default:
      return state
  }
}
