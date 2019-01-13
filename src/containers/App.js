import React from 'react'
import {Routes} from '../Routes'
import {Navigation} from '../components/Navigation'
import {BrowserRouter as Router} from 'react-router-dom'

export const App = () => (
  <Router>
    <div>
      <Navigation/>
      <hr/>
      <Routes/>
    </div>
  </Router>
)
