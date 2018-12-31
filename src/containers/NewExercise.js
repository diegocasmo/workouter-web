import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMeasurements} from '../state/measurement/measurement-action-creators'
import {getAll, isLoading, hasError} from '../state/measurement/measurement-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'

export class NewExercise extends Component {
  componentDidMount() {
    this.props.handleFetchMeasurements()
  }

  render() {
    const {isLoading, hasError} = this.props
    return (
      <div>
        <h1>Create Exercise</h1>
        {isLoading ? <Loading/> : null}
        {hasError ?
          <ErrorMsg msg='Unable to fetch measurements'/> :
          <p>ExerciseForm</p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  measurements: getAll(state),
  isLoading: isLoading(state),
  hasError: hasError(state)
})

const mapDispatchToProps = dispatch => {
  return {
    handleFetchMeasurements() {
      dispatch(fetchMeasurements())
    }
  }
}

export const NewExerciseFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewExercise)
