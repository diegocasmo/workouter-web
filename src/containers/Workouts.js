import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWorkouts} from '../state/workout/workout-action-creators'
import {getWorkouts, areWorkoutsLoading, hasWorkoutsError} from '../state/workout/workout-selectors'
import {Loading} from '../components/Loading'
import {ErrorMsg} from '../components/ErrorMsg'
import {WorkoutList} from '../components/WorkoutList/WorkoutList'

export class Workouts extends Component {
  componentDidMount() {
    this.props.onFetchWorkouts()
  }

  render() {
    const {areWorkoutsLoading, workouts, hasWorkoutsError} = this.props
    return (
      <div>
        <h1>Workouts</h1>
        {areWorkoutsLoading && <Loading/>}
        {hasWorkoutsError && <ErrorMsg msg='Unable to fetch workouts'/>}
        <WorkoutList workouts={workouts}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: getWorkouts(state),
  areWorkoutsLoading: areWorkoutsLoading(state),
  hasWorkoutsError: hasWorkoutsError(state)
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
