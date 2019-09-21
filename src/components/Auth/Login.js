import React from 'react'
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { login, logout } from '../../state/user/action-creators'
import { addError } from '../../state/error/action-creators'
import './Login.css'

export const Login = ({ login, logout, addError }) => (
  <div>
    <p className="wkr-login__text h1">Welcome</p>
    <GoogleLogin
      className="wkr-login__button"
      isSignedIn
      buttonText="Login with Google"
      clientId="101832430197-1cls63aqj1kceqa71b6s4ei6avc4ce8t.apps.googleusercontent.com"
      theme="dark"
      onSuccess={login}
      onFailure={err => {
        logout()
        addError(err.details)
      }}
    />
  </div>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = { addError, login, logout }

export const LoginFromStore = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
