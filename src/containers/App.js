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

export const App = ({errors, removeError}) => (
  <Router>
    <div className='wrk-app'>
      <div className='col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 wrk-app__container'>
        <Navigation/>
        <ErrorList
          errors={errors}
          handleRemoveError={removeError}/>
        <Routes/>
      </div>
    </div>
  </Router>
)

const mapStateToProps = state => ({
  errors: getErrors(state)
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({removeError}, dispatch)
)

export const AppFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(App)
