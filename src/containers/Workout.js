import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getWorkout, deleteWorkout} from '../state/workout/workout-action-creators'
import {getWorkout as getWorkoutSelector, isLoading} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {WorkoutSetup} from '../components/WorkoutDetail/WorkoutSetup'
import {WorkoutExerciseList} from '../components/WorkoutDetail/WorkoutExerciseList'
import {WorkoutActions} from '../components/WorkoutActions'

export class Workout extends Component {
  componentDidMount() {
    this.props.handleGetWorkout(this.props.workoutId)
  }

  renderWorkoutDetails() {
    const {workout} = this.props
    if(workout) {
      return (
        <div>
          <WorkoutSetup {...workout}/>
          <WorkoutExerciseList {...workout}/>
          <WorkoutActions
            workout={workout}
            handleDeleteWorkout={this.props.handleDeleteWorkout}/>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Workout Details</h1>
        {this.props.isLoading
          ? <Loading/>
          : this.renderWorkoutDetails()}
      </div>
    )
  }
}

const mapStateToProps = (state, {match}) => {
  const workoutId = Number(match.params.workoutId)
  return {
    workoutId,
    workout: getWorkoutSelector(state, workoutId),
    isLoading: isLoading(state)
  }
}

const mapDispatchToProps = dispatch => ({
  handleGetWorkout(id) {
    dispatch(getWorkout(id))
  },
  handleDeleteWorkout(id) {
    dispatch(deleteWorkout(id))
  }
})

export const WorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workout)
