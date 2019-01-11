import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMeasurements} from '../state/measurement/measurement-action-creators'
import {createExercise, resetCreateExercise} from '../state/exercise/exercise-action-creators'
import {getMeasurements, areMeasurementsLoading, hasMeasurementsError} from '../state/measurement/measurement-selectors'
import {getNewExercise, isNewExerciseSubmitting, getNewExerciseErrors} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {ExerciseForm} from '../components/ExerciseForm'

export class NewExercise extends Component {
  componentDidMount() {
    this.props.handleFetchMeasurements()
  }

  componentWillUnmount () {
    this.props.handleResetCreateExercise()
  }

  renderExerciseForm() {
    if(this.props.isLoading) {
      return <Loading/>
    } else {
      const {measurements, errors} = this.props
      return (
        <div>
          {measurements.length === 0 ?
            <p>Please, <a href="/">create an exercise measurement first</a></p> :
            <div>
              {errors && <ul> {errors.map((x, i) => <li key={i}><ErrorMsg msg={x}/></li>)}</ul>}
              <ExerciseForm
                submitText='Create'
                isSubmitting={this.props.isSubmitting}
                handleSubmit={this.props.handleCreateExercise}
                exercise={this.props.exercise}
                measurements={this.props.measurements}/>
            </div>}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>New Exercise</h1>
        {this.props.hasLoadingError ?
          <ErrorMsg msg='Unable to render create exercise form'/> :
          this.renderExerciseForm()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  exercise: getNewExercise(state),
  isSubmitting: isNewExerciseSubmitting(state),
  errors: getNewExerciseErrors(state),
  measurements: getMeasurements(state),
  isLoading: areMeasurementsLoading(state),
  hasLoadingError: hasMeasurementsError(state)
})

const mapDispatchToProps = dispatch => {
  return {
    handleFetchMeasurements() {
      dispatch(fetchMeasurements())
    },
    handleCreateExercise(attrs) {
      dispatch(createExercise(attrs))
    },
    handleResetCreateExercise() {
      dispatch(resetCreateExercise())
    }
  }
}

export const NewExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewExercise)
