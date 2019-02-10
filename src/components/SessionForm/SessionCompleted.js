import React, {useState} from 'react'

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
    <>
      <p>TODO: Show statistics</p>
      <button
        type='submit'
        disabled={isSubmitting}
        onClick={handleSubmit}>Save</button>
    </>
  )
}
