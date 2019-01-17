import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WorkoutForm} from '../components/WorkoutForm'

export class NewWorkout extends Component {
  render() {
    return (
      <div>
        <h1>New Workout</h1>
        <WorkoutForm
          handleSubmit={(attrs) => (console.log(attrs))}
          submitText="Create Workout"
          isSubmitting={false}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
})

export const NewWorkoutFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(NewWorkout)
