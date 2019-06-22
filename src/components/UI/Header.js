import React from 'react'
import './Header.css'

export const Header = ({ children }) => (
  <div className='wkr-header sticky-top'>
    <div className='wkr-header__content h-100 w-100'>
      <div className='wkr-header__content-logo h-100 align-self-center'/>
      <div className='wkr-header__content-page h-100 align-self-center'>
        {children}
      </div>
    </div>
  </div>
)
