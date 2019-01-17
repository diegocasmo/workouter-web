import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateExercise} from '../api/exercise'
import {getExercise} from '../state/exercise/exercise-action-creators'
import {getExercise as getExerciseFromState, isLoading} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ExerciseForm} from '../components/ExerciseForm'

export class UpdateExercise extends Component {
  componentDidMount() {
    this.props.handleGetExercise(this.props.exerciseId)
  }

  render() {
    return (
      <div>
        <h1>Update Exercise</h1>
        {this.props.isLoading ?
          <Loading/> :
          <ExerciseForm
            submitText='Update'
            history={this.props.history}
            redirectTo='/exercises'
            handleSubmit={(attrs) =>
              this.props.handleUpdateExercise({...this.props.exercise, ...attrs})
            }
            exercise={this.props.exercise}/>}
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const exerciseId = Number(match.params.exerciseId)
  return {
    exerciseId,
    exercise: getExerciseFromState(state, exerciseId),
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
