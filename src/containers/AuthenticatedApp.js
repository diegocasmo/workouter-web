import React from 'react'
import { Routes } from '../components/Routes'
import { Navigation } from '../components/Navigation'
import { ErrorListFromStore } from '../components/ErrorList/ErrorList'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

export const AuthenticatedApp = () => (
  <Router>
    <ErrorListFromStore />
    <Routes />
    <Navigation />
  </Router>
)
