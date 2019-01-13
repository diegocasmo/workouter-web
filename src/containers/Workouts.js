import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWorkouts, resetFetchWorkouts} from '../state/workout/workout-action-creators'
import {getWorkouts, areWorkoutsLoading, hasWorkoutsError} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {WorkoutList} from '../components/WorkoutList/WorkoutList'

export class Workouts extends Component {
  componentDidMount() {
    this.props.handleFetchWorkouts()
  }

  componentWillUnmount() {
    this.props.handleResetFetchWorkouts()
  }

  renderWorkouts() {
    if(this.props.isLoading) {
      return <Loading/>
    } else {
      return (
        <WorkoutList workouts={this.props.workouts}/>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Workouts</h1>
        {this.props.hasError ?
          <ErrorMsg msg='Unable to fetch workouts'/> :
          this.renderWorkouts()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: getWorkouts(state),
  isLoading: areWorkoutsLoading(state),
  hasError: hasWorkoutsError(state)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleFetchWorkouts() {
    dispatch(fetchWorkouts())
  },
  handleResetFetchWorkouts() {
    dispatch(resetFetchWorkouts())
  }
})

export const WorkoutsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workouts)
