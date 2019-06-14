import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {removeError, addError} from '../state/error/error-action-creators'
import {getErrors} from '../state/error/error-selectors'
import {Login} from '../components/Auth/Login'
import {ErrorList} from '../components/ErrorList/ErrorList'
import './UnauthenticatedApp.css'

export const UnauthenticatedApp = ({errors, removeError, addError}) => (
  <div>
    <ErrorList
      errors={errors}
      handleRemoveError={removeError}/>
    <div className='wkr-unauthenticated-app__login-container'>
      <Login onFailure={addError}/>
    </div>
  </div>
)

const mapStateToProps = state => ({
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({removeError, addError}, dispatch)
)

export const UnauthenticatedAppFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UnauthenticatedApp)
