import React from 'react'
import { getUnitFromUnitValue } from '../../../api/unit'

export const WorkoutExerciseItem = ({
  className,
  name,
  quantity,
  quantityUnit,
  weight,
  weightUnit,
}) => (
  <span className={`wkr-workout-exercise-item__title ${className}`}>
    {name}{' '}
    <span style={{ textTransform: 'lowercase' }}>
      x{quantity} {getUnitFromUnitValue(quantityUnit).text}{' '}
      {weight > 0 ? `@${weight} ${weightUnit}` : null}
    </span>
  </span>
)
