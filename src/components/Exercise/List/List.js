import React from 'react'
import PropTypes from 'prop-types'
import { ExerciseItem } from './Item'

export const ExerciseList = ({ hasMore, exercises, handleDeleteExercise }) =>
  hasMore || exercises.length > 0 ? (
    <div className="list-group list-group-flush">
      {exercises.map((e, i) => (
        <ExerciseItem
          key={i}
          handleDeleteExercise={handleDeleteExercise}
          exercise={e}
        />
      ))}
    </div>
  ) : (
    <p className="text-center m-0 pt-3">There are no exercises to show</p>
  )

ExerciseList.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  exercises: PropTypes.array.isRequired,
  handleDeleteExercise: PropTypes.func.isRequired,
}
