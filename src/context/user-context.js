import React, { createContext, useContext, useReducer } from 'react'
import { GraphQLClient } from 'graphql-request'
import { CURRENT_USER_QUERY } from '../graphql/queries'
import { GraphQLUrl } from '../hooks/graphql-client'
import { FullPageSpinner } from '../components/UI/FullPageSpinner'

const UserContext = createContext()

// Allow to set initial state via props (useful for testing)
export const UserProvider = ({ user = null, isLoading = false, ...props }) => {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { user, isLoading }
  )

  const login = async googleUser => {
    try {
      setState({ isLoading: true })
      const client = new GraphQLClient(GraphQLUrl, {
        headers: {
          authorization: googleUser.getAuthResponse().id_token,
        },
      })

      const { currentUser } = await client.request(CURRENT_USER_QUERY)
      setState({ isLoading: false, user: currentUser })
    } catch (err) {
      setState({ isLoading: false, user: null })
      return Promise.reject(new Error(err))
    }
  }

  const logout = () => {
    setState({ isLoading: false, user: null })
  }

  return state.isLoading ? (
    <FullPageSpinner text="Loading profile..." />
  ) : (
    <UserContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContext`)
  }
  return context
}
