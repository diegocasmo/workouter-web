import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateWorkout} from '../api/workout'
import {getWorkout} from '../state/workout/workout-action-creators'
import {fetchExercises} from '../state/exercise/exercise-action-creators'
import {getExercises, isLoading as isLoadingExercises} from '../state/exercise/exercise-selectors'
import {
  getWorkout as getWorkoutSelector,
  isLoading as isLoadingWorkout
} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutForm} from '../components/WorkoutForm'

export class UpdateWorkout extends Component {
  componentDidMount() {
    this.props.handleGetWorkout(this.props.workoutId)
    this.props.handleFetchExercises()
  }

  renderWorkoutForm() {
    const {workout, exercises, history, handleUpdateWorkout} = this.props
    if(workout) {
      return (
        <WorkoutForm
          submitText='Update'
          history={history}
          redirectTo='/workouts'
          handleSubmit={handleUpdateWorkout}
          workout={workout}
          exercises={exercises}/>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Update Workout</h1>
        {this.props.isLoading
          ? <Loading/>
          : this.renderWorkoutForm()}
      </div>
    )
  }
}

const mapStateToProps = (state, {match, history}) => {
  const workoutId = Number(match.params.workoutId)
  return {
    history,
    workoutId,
    workout: getWorkoutSelector(state, workoutId),
    exercises: getExercises(state),
    isLoading: isLoadingWorkout(state) || isLoadingExercises(state),
    handleUpdateWorkout: updateWorkout
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetWorkout(id) {
    dispatch(getWorkout(id))
  },
  handleFetchExercises() {
    dispatch(fetchExercises())
  }
})

export const UpdateWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(UpdateWorkout)
