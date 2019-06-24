import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {GoogleLogin} from 'react-google-login'
import {useUser} from '../../context/user-context'
import {addError} from '../../state/error/error-action-creators'
import './Login.css'

export const Login = ({addError}) => {
  const {login, logout} = useUser()

  const handleSucess = async (googleUser) => {
    try {
      await login(googleUser)
    } catch(err) {
      addError(err.message)
    }
  }

  const handleFailure = (err) => {
    logout()
    addError(err.message)
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

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => (
  bindActionCreators({addError}, dispatch)
)

export const LoginFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Login)
