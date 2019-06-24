import React from 'react'
import {LoginFromStore} from '../components/Auth/Login'
import {ErrorListFromStore} from '../components/ErrorList/ErrorList'
import './UnauthenticatedApp.css'

export const UnauthenticatedApp = () => (
  <>
    <ErrorListFromStore/>
    <div className='wkr-unauthenticated-app__login-container'>
      <LoginFromStore/>
    </div>
  </>
)
