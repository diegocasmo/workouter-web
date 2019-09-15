import React from 'react'
import { Link } from 'react-router-dom'
import './Item.css'

export const ExerciseItem = ({ handleDeleteExercise, exercise }) => (
  <div className="wkr-exercise-item list-group-item">
    <span className="wkr-exercise-item__name">{exercise.name}</span>
    <span className="wkr-exercise-item__dropdown dropdown">
      <button
        className="wkr-exercise-item__dropdown-btn btn btn-sm dropdown-toggle"
        type="button"
        id="wkr-exercise-item__dropdown-menu-button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      />
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="wkr-exercise-item__dropdown-menu-button"
      >
        <Link className="dropdown-item" to={`/exercises/update/${exercise.id}`}>
          Update
        </Link>
        <Link
          className="wkr-exercise-item__action-delete dropdown-item text-danger"
          to={`/exercises`}
          onClick={e => {
            e.preventDefault()
            const msg = `Are you sure you want to delete "${exercise.name}"`
            if (window.confirm(msg)) {
              handleDeleteExercise(exercise.id)
            }
          }}
        >
          Delete
        </Link>
      </div>
    </span>
  </div>
)
