import {MEASUREMENT} from './measurement-actions'
import {initialState} from '../utils/crud-initial-state'

export function measurementReducer(state = initialState, action) {
  switch (action.type) {
    case MEASUREMENT.FETCH_INIT:
      return { ...state, isBusy: true, errorMsg: null}
    case MEASUREMENT.FETCH_SUCCESS:
      // Augment resources with meta info helpful for the client
      action.items.forEach((x) =>
        state.items[x.id] = {...x, _meta: {isBusy: false, errors: {}}}
      )
      return {...state, isBusy: false, errorMsg: null}
    case MEASUREMENT.FETCH_FAILURE:
      return {...state, isBusy: false, errorMsg: action.errorMsg}
    default:
      return state
  }
}
