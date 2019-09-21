import { USER } from './actions'
import { REQUEST_STATUS } from '../utils/request-status'

export const initialState = {
  user: null,
  status: REQUEST_STATUS.NONE,
}

export function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    // Login actions
    case USER.LOGIN_INIT: {
      return {
        ...state,
        user: null,
        status: REQUEST_STATUS.POST,
      }
    }
    case USER.LOGIN_SUCCESS: {
      return {
        ...state,
        user: payload,
        status: REQUEST_STATUS.NONE,
      }
    }
    case USER.LOGIN_FAILURE: {
      return {
        ...state,
        user: null,
        status: REQUEST_STATUS.NONE,
      }
    }

    // Logout actions
    case USER.LOGOUT: {
      return {
        ...state,
        user: null,
        status: REQUEST_STATUS.NONE,
      }
    }

    default:
      return state
  }
}
