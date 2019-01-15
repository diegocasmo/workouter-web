import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchExercises, deleteExercise} from '../state/exercise/exercise-action-creators'
import {getExercises, isLoading} from '../state/exercise/exercise-selectors'
import {Loading} from '../components/Loading'
import {ExerciseList} from '../components/ExerciseList/ExerciseList'

export class Exercises extends Component {
  componentDidMount() {
    this.props.handleFetchExercises()
  }

  render() {
    return (
      <div>
        <h1>Exercises</h1>
        {this.props.isLoading ?
          <Loading/> :
          <ExerciseList
            handleDeleteExercise={this.props.handleDeleteExercise}
            exercises={this.props.exercises}/>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  exercises: getExercises(state),
  isLoading: isLoading(state)
})

const mapDispatchToProps = dispatch => ({
  handleFetchExercises() {
    dispatch(fetchExercises())
  },
  handleDeleteExercise(id) {
    dispatch(deleteExercise(id))
  },
})

export const ExercisesFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Exercises)
