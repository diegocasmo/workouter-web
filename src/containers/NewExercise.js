import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createExercise} from '../api/exercise'
import {ExerciseForm} from '../components/ExerciseForm'

export const NewExercise = ({handleCreateExercise, history}) => (
  <div className='container pt-2'>
    <h1>New Exercise</h1>
    <ExerciseForm
      submitText='Create'
      history={history}
      redirectTo='/exercises'
      handleSubmit={handleCreateExercise}/>
  </div>
)

const mapStateToProps = state => ({
  handleCreateExercise: createExercise
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({}, dispatch)
)

export const NewExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewExercise)
