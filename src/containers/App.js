import React from 'react'
import {UnauthenticatedApp} from './UnauthenticatedApp'
import {AuthenticatedApp} from './AuthenticatedApp'
import {useUser} from '../context/user-context'
import './App.css'

export const App = () => {
  const {user} = useUser()
  return (
    <div className='wkr-app'>
      <div className='wkr-app__container col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </div>
    </div>
  )
}
