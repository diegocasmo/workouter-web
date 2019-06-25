import React from 'react'
import PropTypes from 'prop-types'

export const ErrorItem = ({error, onClick}) => (
  <div
    className='alert alert-danger mb-2'
    role='alert'>
    <span className='wkr-error-item__text'>{error}</span>
    <button
      type='button'
      className='close'
      aria-label='Close'
      onClick={onClick}>
      <span aria-hidden='true'>&times;</span>
    </button>
  </div>
)

ErrorItem.propTypes = {
  error: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}
