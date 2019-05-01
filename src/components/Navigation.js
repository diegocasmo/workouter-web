import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navigation.css'

export const Navigation = () => (
  <nav className='wkr-navigation navbar sticky-top justify-content-center'>
    <ul className='nav  nav-fill'>
      <li className='nav-item'>
        <NavLink
          exact
          to='/'
          className='wkr-navigation__link nav-link'
          activeClassName='active'>
          Sessions
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          exact
          to='/workouts'
          className='wkr-navigation__link nav-link'
          activeClassName='active'>
          Workouts
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          exact
          to='/exercises'
          className='wkr-navigation__link nav-link'
          activeClassName='active'>
          Exercises
        </NavLink>
      </li>
    </ul>
  </nav>
)
