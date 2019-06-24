import React from 'react'

export const ErrorItem = ({index, error, removeError}) => (
  <p>
    {error} <button type="button"
      onClick={(event) => {
        event.preventDefault()
        removeError(index)
      }}>X</button>
  </p>
)
