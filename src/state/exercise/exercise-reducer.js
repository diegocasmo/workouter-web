import {EXERCISE} from './exercise-actions'

export const initialState = {
  items  : {list:    [], errorMsg: null, isLoading: false},
  newItem: {attrs: null, errors  :   {}, isLoading: false}
}

export function exerciseReducer(state = initialState, action) {
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
        newItem: initialState.newItem
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
