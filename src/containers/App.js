import React from 'react'
import { connect } from 'react-redux'
import { UnauthenticatedApp } from './UnauthenticatedApp'
import { AuthenticatedApp } from './AuthenticatedApp'
import './App.css'

export const App = ({ user = null }) => (
  <div className="wkr-app">
    <div className="wkr-app__container col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  </div>
)

const mapStateToProps = ({ user }) => ({
  user: user.user,
})

export const AppFromStore = connect(
  mapStateToProps,
  null
)(App)
