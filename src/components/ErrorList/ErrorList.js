import React from 'react'
import {ErrorItem} from './ErrorItem'

export const ErrorList = ({errors, handleRemoveError}) => (
  errors.map((error, index) =>
    <ErrorItem key={index} index={index} error={error} handleRemoveError={handleRemoveError}/>)
)
