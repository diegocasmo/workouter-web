import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createExercise, resetCreateExercise} from '../state/exercise/exercise-action-creators'
import {getNewExercise, isNewExerciseSubmitting, getNewExerciseErrors} from '../state/exercise/exercise-selectors'
import {ErrorMsg} from '../components/ErrorMsg'
import {ExerciseForm} from '../components/ExerciseForm'

export class NewExercise extends Component {
  componentWillUnmount () {
    this.props.handleResetCreateExercise()
  }

  render() {
    const {errors} = this.props
    return (
      <div>
        <h1>New Exercise</h1>
        {errors && <ul> {errors.map((x, i) => <li key={i}><ErrorMsg msg={x}/></li>)}</ul>}
        <ExerciseForm
          submitText='Create'
          isSubmitting={this.props.isSubmitting}
          handleSubmit={this.props.handleCreateExercise}
          exercise={this.props.exercise}
          measurements={this.props.measurements}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  exercise: getNewExercise(state),
  isSubmitting: isNewExerciseSubmitting(state),
  errors: getNewExerciseErrors(state)
})

const mapDispatchToProps = dispatch => ({
  handleCreateExercise(attrs) {
    dispatch(createExercise(attrs))
  },
  handleResetCreateExercise() {
    dispatch(resetCreateExercise())
  }
})

export const NewExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewExercise)
