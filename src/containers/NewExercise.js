import React from 'react'
import {connect} from 'react-redux'
import {createExercise} from '../api/exercise'
import {ExerciseForm} from '../components/ExerciseForm'

export const NewExercise = ({handleCreateExercise}) => (
  <div>
    <h1>New Exercise</h1>
    <ExerciseForm
      submitText='Create'
      handleSubmit={handleCreateExercise}/>
  </div>
)

const mapStateToProps = state => ({
  handleCreateExercise: createExercise
})

const mapDispatchToProps = dispatch => ({
})

export const NewExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewExercise)
