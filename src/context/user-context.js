import React, {createContext, useContext, useReducer} from 'react'
import {GraphQLClient} from 'graphql-request'
import {CURRENT_USER_QUERY} from '../graphql/queries'
import {GraphQLUrl} from '../hooks/graphql-client'
import {FullPageSpinner} from '../components/UI/FullPageSpinner'

const UserContext = createContext()

export const ACTIONS = {
  LOGIN_INIT   : 'USER__LOGIN_INIT',
  LOGIN_SUCCESS: 'USER__LOGIN_SUCCESS',
  LOGIN_FAILURE: 'USER__LOGIN_FAILURE',
  LOGOUT       : 'USER__LOGOUT'
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.LOGIN_INIT:
      return {
        ...state,
        isLoading: true
      }
    case ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        isLoading: false
      }
    case ACTIONS.LOGIN_FAILURE:
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isLoading: false
      }
    default:
      return state
  }
}

export const UserProvider = ({
  // Allow to set initial state via props (useful for testing)
  user = null, isLoading = false,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, {user, isLoading})

  const login = async googleUser => {
    try {
      dispatch({type: ACTIONS.LOGIN_INIT})
      const client = new GraphQLClient(GraphQLUrl, {
        headers: {
          authorization: googleUser.getAuthResponse().id_token
        }
      })

      const {currentUser} = await client.request(CURRENT_USER_QUERY)
      dispatch({type: ACTIONS.LOGIN_SUCCESS, payload: currentUser})
    } catch (err) {
      dispatch({type: ACTIONS.LOGIN_FAILURE})
      return Promise.reject(new Error(err))
    }
  }

  const logout = () => { dispatch({type: ACTIONS.LOGOUT}) }

  return state.isLoading
    ? <FullPageSpinner text='Loading profile...'/>
    : <UserContext.Provider
        value={{
          user: state.user,
          login,
          logout
        }}
        {...props}/>
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContext`)
  }
  return context
}
