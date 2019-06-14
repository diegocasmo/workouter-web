import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Routes} from '../components/Routes'
import {removeError} from '../state/error/error-action-creators'
import {getErrors} from '../state/error/error-selectors'
import {Navigation} from '../components/Navigation'
import {ErrorList} from '../components/ErrorList/ErrorList'
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css'

export const AuthenticatedApp = ({errors, removeError}) => (
  <Router>
    <ErrorList
      errors={errors}
      handleRemoveError={removeError}/>
    <Routes/>
    <Navigation/>
  </Router>
)

const mapStateToProps = state => ({
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({removeError}, dispatch)
)

export const AuthenticatedAppFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(AuthenticatedApp)
