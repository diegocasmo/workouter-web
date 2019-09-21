import { USER } from './actions'
import { GraphQLClient } from 'graphql-request'
import { GraphQLUrl } from '../../hooks/graphql-client'
import { CURRENT_USER_QUERY } from '../../graphql/queries'
import { addError } from '../error/action-creators'

export function login(googleUser) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: USER.LOGIN_INIT })
      const client = new GraphQLClient(GraphQLUrl, {
        headers: {
          authorization: googleUser.getAuthResponse().id_token,
        },
      })

      const { currentUser } = await client.request(CURRENT_USER_QUERY)
      dispatch({ type: USER.LOGIN_SUCCESS, payload: currentUser })
    } catch (err) {
      dispatch({ type: USER.LOGIN_FAILURE })
      dispatch(addError(err.message))
    }
  }
}

export function logout() {
  return { type: USER.LOGOUT }
}
