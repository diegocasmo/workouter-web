import React from 'react'
import './FullPageSpinner.css'

export const FullPageSpinner = ({ text = 'Loading...' }) => (
  <div className='wkr-app text-center'>
    <div className='wkr-app__container col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3'>
      <div className='wkr-full-page-spinner__content'>
        <div className='spinner-border' role='status'/>
        <p className='wkr-full-page-spinner__text'>{text}</p>
      </div>
    </div>
  </div>
)
