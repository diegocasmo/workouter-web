import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchExercises} from '../state/exercise/exercise-action-creators'
import {getExercises, areExercisesLoading, hasExercisesError} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {ExerciseList} from '../components/ExerciseList/ExerciseList'

export class Exercises extends Component {
  componentDidMount() {
    this.props.onFetchExercises()
  }

  render() {
    const {areExercisesLoading, exercises, hasExercisesError} = this.props
    return (
      <div>
        <h1>Exercises</h1>
        {areExercisesLoading && <Loading/>}
        {hasExercisesError && <ErrorMsg msg='Unable to fetch exercises'/>}
        <ExerciseList exercises={exercises}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  exercises: getExercises(state),
  areExercisesLoading: areExercisesLoading(state),
  hasExercisesError: hasExercisesError(state)
})

const mapDispatchToProps = dispatch => {
  return {
    onFetchExercises() {
      dispatch(fetchExercises())
    }
  }
}

export const ExercisesFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Exercises)
