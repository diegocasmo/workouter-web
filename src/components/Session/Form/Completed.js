import React, {useState} from 'react'
import {SessionStatistics} from '../View/Statistics'
import './Completed.css'

export const SessionCompleted = ({session, onSubmit, onSubmitSuccess, onSubmitFailure}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await onSubmit(session)
      setIsSubmitting(false)
      onSubmitSuccess()
    } catch (err) {
      setIsSubmitting(false)
      onSubmitFailure(err.message ? err.message : Object.values(err))
    }
  }
  return (
    <div className='wkr-session-completed text-center'>
      <p className='h1 text-center'>{session.name}</p>
      <SessionStatistics session={session}/>
      <button
        className='btn btn-outline-success btn-lg'
        type='submit'
        disabled={isSubmitting}
        onClick={handleSubmit}>Save</button>
    </div>
  )
}
