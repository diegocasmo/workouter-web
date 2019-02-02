import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateExercise} from '../api/exercise'
import {getExercise} from '../state/exercise/exercise-action-creators'
import {getExercise as getExerciseSelector, isLoading} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ExerciseForm} from '../components/ExerciseForm'

export class UpdateExercise extends Component {
  componentDidMount() {
    this.props.handleGetExercise(this.props.exerciseId)
  }

  renderExerciseForm() {
    const {exercise, history, handleUpdateExercise} = this.props
    if(exercise) {
      return (
        <ExerciseForm
          submitText='Update'
          history={history}
          redirectTo='/exercises'
          handleSubmit={(attrs) => handleUpdateExercise({...exercise, ...attrs})}
          exercise={exercise}/>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Update Exercise</h1>
        {this.props.isLoading
          ? <Loading/>
          : this.renderExerciseForm()}
      </div>
    )
  }
}

const mapStateToProps = (state, {match, history}) => {
  const exerciseId = Number(match.params.exerciseId)
  return {
    history,
    exerciseId,
    exercise: getExerciseSelector(state, exerciseId),
    isLoading: isLoading(state),
    handleUpdateExercise: updateExercise
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetExercise(id) {
    dispatch(getExercise(id))
  }
})

export const UpdateExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UpdateExercise)
