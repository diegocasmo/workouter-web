import React from 'react'
import { Input } from '../../UI/Input'
import { Select } from '../../UI/Select'
import { AsyncCreateSelect } from '../../UI/AsyncCreateSelect'
import { UNITS, getUnits } from '../../../api/unit'

export const WorkoutExerciseForm = ({
  index,
  exerciseName,
  onRemove,
  fetchExercises,
  createExercise,
  canRemove = false,
}) => (
  <div style={{ marginBottom: '10px', paddingBottom: '10px' }}>
    <AsyncCreateSelect
      label="Name"
      name={`exercises.${index}.name`}
      value={exerciseName}
      defaultOptions
      onLoadOptions={async query => {
        const res = await fetchExercises({ name: query })
        return res.map(({ name }) => ({ value: name, label: name }))
      }}
      onCreateOption={value => createExercise({ name: value })}
    />
    <Input
      name={`exercises.${index}.quantity`}
      label="Quantity"
      placeholder="10"
      type="number"
    />
    <Select
      name={`exercises.${index}.quantityUnit`}
      label="Quantity unit"
      options={getUnits()}
    />
    <Input
      name={`exercises.${index}.weight`}
      label="Weight"
      placeholder="0"
      type="number"
    />
    <Input
      name={`exercises.${index}.weightUnit`}
      label="Weight Unit"
      type="string"
      value={UNITS.KG.value}
      readOnly
      disabled
    />
    {canRemove && (
      <button type="button" onClick={onRemove}>
        X
      </button>
    )}
  </div>
)
