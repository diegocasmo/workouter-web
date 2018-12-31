import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWorkouts} from '../state/workout/workout-action-creators'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {WorkoutList} from '../components/WorkoutList/WorkoutList'

export class Workouts extends Component {
  componentDidMount() {
    this.props.onFetchWorkouts()
  }

  render() {
    const {isFetching, workouts, hasFetchFailed} = this.props
    return (
      <div>
        <h1>Workouts</h1>
        {isFetching ? <Loading/> : null}
        {hasFetchFailed ? <ErrorMsg msg='Unable to fetch workouts'/> : null}
        <WorkoutList workouts={workouts}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: state.workoutStore.value,
  isFetching: state.workoutStore.isFetching,
  hasFetchFailed: state.workoutStore.hasFetchFailed,
})

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onFetchWorkouts() {
      dispatch(fetchWorkouts())
    }
  }
}

export const WorkoutsFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Workouts)
