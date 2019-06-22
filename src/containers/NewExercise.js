import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createExercise} from '../api/exercise'
import {Header} from '../components/UI/Header'
import {ExerciseForm} from '../components/Exercise/Form/Form'

export const NewExercise = ({handleCreateExercise, history}) => (
  <>
    <Header>
      <div className='d-flex h-100'>
        <p className='h2 align-self-center m-0 mr-auto'>New Exercise</p>
      </div>
    </Header>
    <div className='container pt-4'>
      <ExerciseForm
        submitText='Create'
        history={history}
        redirectTo='/exercises'
        handleSubmit={handleCreateExercise}/>
    </div>
  </>
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
