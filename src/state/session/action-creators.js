import * as session from '../../api/session'
import { SESSION } from './actions'
import { addError } from '../error/action-creators'

// Fetch sessions from API
export function fetchSessions(pageNum = 0) {
  return async (dispatch, getState) => {
    const { perPage } = getState().sessions
    dispatch({ type: SESSION.FETCH_INIT })
    try {
      const items = await session.fetchSessions({ pageNum, perPage })
      dispatch({ type: SESSION.FETCH_SUCCESS, items })
    } catch (err) {
      dispatch({ type: SESSION.FETCH_FAILURE })
      dispatch(addError(err.message))
    }
  }
}

// Clear sessions that have been fetched
export function fetchClear() {
  return { type: SESSION.FETCH_CLEAR }
}

// Get a single session from DB by its id
export function getSession(id) {
  return async dispatch => {
    dispatch({ type: SESSION.GET_INIT })
    try {
      const item = await session.getSession(id)
      dispatch({ type: SESSION.GET_SUCCESS, item })
    } catch (err) {
      dispatch({ type: SESSION.GET_FAILURE })
      dispatch(addError(err.message))
    }
  }
}
