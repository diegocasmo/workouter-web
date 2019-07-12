import {ERROR} from './actions'

export const initialState = []

export function errorReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR.ADD:
      return state.concat([action.errorMsg])
    case ERROR.REMOVE:
      return state.filter((_, idx) => idx !== action.index)

    default:
      return state
  }
}
