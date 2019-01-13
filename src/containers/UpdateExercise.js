import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMeasurements, resetFetchMeasurements} from '../state/measurement/measurement-action-creators'
import {getExercise, updateExercise, resetGetExercise, resetUpdateExercise} from '../state/exercise/exercise-action-creators'
import {getMeasurements, areMeasurementsLoading, hasMeasurementsError} from '../state/measurement/measurement-selectors'
import {
  getActiveExercise, isActiveExerciseLoading, hasActiveExerciseError, getUpdateExerciseErrors,
  isUpdateExerciseSubmitting
} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {ExerciseForm} from '../components/ExerciseForm'

export class UpdateExercise extends Component {
  componentDidMount() {
    this.props.handleFetchMeasurements()
    this.props.handleGetExercise(this.props.exerciseId)
  }

  componentWillUnmount () {
    this.props.handleResetGetExercise()
    this.props.handleResetUpdateExercise()
    this.props.handleResetFetchMeasurements()
  }

  renderExerciseForm() {
    if(this.props.isLoading) {
      return <Loading/>
    } else {
      const {errors, exercise} = this.props
      return (
        <div>
          {errors && <ul>{errors.map((x, i) => <li key={i}><ErrorMsg msg={x}/></li>)}</ul>}
          <ExerciseForm
            submitText='Update'
            isSubmitting={this.props.isSubmitting}
            handleSubmit={(attrs) => this.props.handleUpdateExercise({...exercise, ...attrs})}
            exercise={exercise}
            measurements={this.props.measurements}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Update Exercise</h1>
        {this.props.hasLoadingError ?
          <ErrorMsg msg='Unable to render update exercise form'/> :
          this.renderExerciseForm()}
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => ({
  exerciseId: Number(match.params.exerciseId),
  exercise: getActiveExercise(state),
  isSubmitting: isUpdateExerciseSubmitting(state),
  errors: getUpdateExerciseErrors(state),
  measurements: getMeasurements(state),
  isLoading: areMeasurementsLoading(state) || isActiveExerciseLoading(state),
  hasLoadingError: hasMeasurementsError(state) || hasActiveExerciseError(state)
})

const mapDispatchToProps = dispatch => ({
  handleFetchMeasurements() {
    dispatch(fetchMeasurements())
  },
  handleResetFetchMeasurements() {
    dispatch(resetFetchMeasurements())
  },
  handleGetExercise(id) {
    dispatch(getExercise(id))
  },
  handleUpdateExercise(attrs) {
    dispatch(updateExercise(attrs))
  },
  handleResetGetExercise() {
    dispatch(resetGetExercise())
  },
  handleResetUpdateExercise() {
    dispatch(resetUpdateExercise())
  }
})

export const UpdateExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UpdateExercise)
