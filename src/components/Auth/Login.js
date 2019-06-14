import React from 'react'
import {GoogleLogin} from 'react-google-login'
import {useUser} from '../../context/user-context'
import './Login.css'

export const Login = ({onFailure}) => {
  const {login, logout} = useUser()

  const handleSucess = async (googleUser) => {
    try {
      await login(googleUser)
    } catch(err) {
      onFailure(err.message)
    }
  }

  const handleFailure = (err) => {
    logout()
    onFailure(err.message)
  }

  return (
    <div>
      <p className='wkr-login__text h1'>Welcome</p>
      <GoogleLogin
        className='wkr-login__button'
        isSignedIn
        buttonText='Login with Google'
        clientId='101832430197-1cls63aqj1kceqa71b6s4ei6avc4ce8t.apps.googleusercontent.com'
        theme='dark'
        onSuccess={handleSucess}
        onFailure={handleFailure}/>
    </div>
  )
}
