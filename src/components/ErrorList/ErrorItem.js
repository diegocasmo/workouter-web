import React from 'react'

export const ErrorItem = ({index, error, handleRemoveError}) => (
  <p>
    {error} <button type="button"
      onClick={(event) => {
        event.preventDefault()
        handleRemoveError(index)
      }}>X</button>
  </p>
)
