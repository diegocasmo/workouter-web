import * as session from '../../api/session'
import {SESSION} from './session-actions'
import {addError} from '../error/error-action-creators'

// Fetch an array of sessions
export function fetchSessions() {
  return async (dispatch) => {
    dispatch({type: SESSION.FETCH_INIT})
    try {
      const items = await session.fetchSessions()
      dispatch({type: SESSION.FETCH_SUCCESS, items})
    } catch(err) {
      dispatch({type: SESSION.FETCH_FAILURE})
      dispatch(addError(err.message))
    }
  }
}
