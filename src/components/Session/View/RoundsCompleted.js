import React from 'react'

export const RoundsCompleted = ({ rounds, roundsCompleted }) => (
  <p className="wkr-rounds-completed__text">
    {roundsCompleted}/{rounds} rounds completed
  </p>
)
