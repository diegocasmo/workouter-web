import React from 'react'
import {getUnitFromUnitValue} from '../../../api/unit'

export const WorkoutExerciseItem = ({
  name,
  quantity,
  quantityUnit,
  weight,
  weightUnit
}) => (
  <span className='wrk-workout-exercise-item__title'>
    {name} <span style={{textTransform: 'lowercase'}}>x{quantity} {getUnitFromUnitValue(quantityUnit).text} {weight > 0 ? `@${weight} ${weightUnit}` : null}</span>
  </span>
)
