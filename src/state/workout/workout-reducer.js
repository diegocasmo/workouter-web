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

    default:
      return state
  }
}
