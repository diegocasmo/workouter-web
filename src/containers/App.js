import React from 'react'
import {connect} from 'react-redux'
import {Routes} from '../components/Routes'
import {removeError} from '../state/error/error-action-creators'
import {getErrors} from '../state/error/error-selectors'
import {Navigation} from '../components/Navigation'
import {ErrorList} from '../components/ErrorList/ErrorList'
import {BrowserRouter as Router} from 'react-router-dom'

export const App = ({errors, handleRemoveError}) => (
  <Router>
    <div>
      <Navigation/>
      <hr/>
      <ErrorList
        errors={errors}
        handleRemoveError={handleRemoveError}/>
      <Routes/>
    </div>
  </Router>
)

const mapStateToProps = state => ({
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => ({
  handleRemoveError(index) {
    dispatch(removeError(index))
  }
})

export const AppFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(App)

