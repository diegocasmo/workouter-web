import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchExercises} from '../state/exercise/exercise-action-creators'
import {getExercises, isLoading} from '../state/exercise/exercise-selectors'
import {createWorkout} from '../api/workout'
import {Loading} from '../components/Loading'
import {WorkoutForm} from '../components/WorkoutForm'

export class NewWorkout extends Component {
  componentDidMount() {
    this.props.handleFetchExercises()
  }

  render() {
    return (
      <div>
        <h1>New Workout</h1>
        {this.props.isLoading ?
          <Loading/> :
          <WorkoutForm
            history={this.props.history}
            redirectTo='/workouts'
            exercises={this.props.exercises}
            handleSubmit={this.props.handleCreateWorkout}
            submitText="Create Workout"/>}
      </div>
    )
  }
}

const mapStateToProps = (state, {history}) => ({
  history,
  exercises: getExercises(state),
  isLoading: isLoading(state),
  handleCreateWorkout: createWorkout
})

const mapDispatchToProps = dispatch => ({
  handleFetchExercises() {
    dispatch(fetchExercises())
  }
})

export const NewWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewWorkout)
