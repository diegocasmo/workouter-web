import {EXERCISE} from './exercise-actions'
import {initialState} from '../utils/crud-initial-state'

export function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case EXERCISE.FETCH_INIT:
      return { ...state, isBusy: true, errorMsg: null}
    case EXERCISE.FETCH_SUCCESS:
      // Augment resources with meta info helpful for the client
      action.items.forEach((x) =>
        state.items[x.id] = {...x, _meta: {isBusy: false, errors: {}}}
      )
      return {...state, isBusy: false, errorMsg: null}
    case EXERCISE.FETCH_FAILURE:
      return {...state, isBusy: false, errorMsg: action.errorMsg}
    default:
      return state
  }
}
