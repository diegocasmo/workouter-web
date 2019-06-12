import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navigation.css'

export const Navigation = ({ className }) => (
  <nav className={`wkr-navigation navbar justify-content-center ${className ? className : ''}`}>
    <ul className='nav  nav-fill'>
      <li className='nav-item'>
        <NavLink
          to='/'
          className='wkr-navigation__link nav-link'
          activeClassName='active'
          isActive={(_, {pathname}) => (
            pathname === '/' || pathname.indexOf('sessions') >= 0
          )}>
          <i className='fas fa-history'/>
          <p className='wkr-navigation__link-text'>Sessions</p>
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          to='/workouts'
          className='wkr-navigation__link nav-link'
          activeClassName='active'>
          <i className='far fa-play-circle'/>
          <p className='wkr-navigation__link-text'>Workouts</p>
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink
          to='/exercises'
          className='wkr-navigation__link nav-link'
          activeClassName='active'>
          <i className='fas fa-dumbbell'/>
          <p className='wkr-navigation__link-text'>Exercises</p>
        </NavLink>
      </li>
    </ul>
  </nav>
)
