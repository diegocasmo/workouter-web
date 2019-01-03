import {WORKOUT} from './workout-actions'
import {getCRUDInitialState} from '../utils/crud-initial-state'

export function workoutReducer(state = getCRUDInitialState(), action) {
  switch (action.type) {
    case WORKOUT.FETCH_INIT:
      return { ...state, isBusy: true, errorMsg: null}
    case WORKOUT.FETCH_SUCCESS:
      // Augment resources with meta info helpful for the client
      action.items.forEach((x) =>
        state.items[x.id] = {...x, _meta: {isBusy: false, errors: {}}}
      )
      return {...state, isBusy: false, errorMsg: null}
    case WORKOUT.FETCH_FAILURE:
      return {...state, isBusy: false, errorMsg: action.errorMsg}
    default:
      return state
  }
}
