import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMeasurements} from '../state/measurement/measurement-action-creators'
import {createExercise} from '../state/exercise/exercise-action-creators'
import {getMeasurements, areMeasurementsLoading, hasMeasurementsError} from '../state/measurement/measurement-selectors'
import {getNewExercise, getNewExerciseErrors} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {ExerciseForm} from '../components/ExerciseForm'

export class NewExercise extends Component {
  componentDidMount() {
    this.props.handleFetchMeasurements()
  }

  renderExerciseForm() {
    const {measurements, handleCreateExercise, exercise, exerciseErrors} = this.props
    if(measurements.length > 0) {
      return(
        <div>
          {exerciseErrors ?
            <ul>{exerciseErrors.map((x, i) => <li key={i}><ErrorMsg msg={x}/></li>)}</ul> :
            null}
          <ExerciseForm
            handleSubmit={handleCreateExercise}
            exercise={exercise}
            measurements={measurements}/>
        </div>
      )
    } else {
      return(<p>Please, <a href="/">create an exercise measurement first</a></p>)
    }
  }

  render() {
    const {areMeasurementsLoading, hasMeasurementsError} = this.props
    return (
      <div>
        <h1>New Exercise</h1>
        {areMeasurementsLoading ?
          <Loading/> :
          hasMeasurementsError ?
            <ErrorMsg msg='Unable to fetch measurements'/> :
            this.renderExerciseForm()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  exercise: getNewExercise(state),
  exerciseErrors: getNewExerciseErrors(state),
  measurements: getMeasurements(state),
  areMeasurementsLoading: areMeasurementsLoading(state),
  hasMeasurementsError: hasMeasurementsError(state)
})

const mapDispatchToProps = dispatch => {
  return {
    handleFetchMeasurements() {
      dispatch(fetchMeasurements())
    },
    handleCreateExercise(attrs) {
      dispatch(createExercise(attrs))
    }
  }
}

export const NewExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewExercise)
