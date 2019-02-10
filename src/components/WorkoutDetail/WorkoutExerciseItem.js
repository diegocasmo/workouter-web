import React from 'react'

export const WorkoutExerciseItem = ({
  name,
  quantity,
  quantityUnit,
  weight,
  weightUnit
}) => (
  <span className="wrk-workout-exercise-item__title">
    {name} x{quantity} {quantityUnit} {weight > 0 ? `@${weight} ${weightUnit}` : null}
  </span>
)
