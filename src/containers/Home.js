import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchWorkouts} from '../state/workout/workout-action-creators';
import {ErrorMsg} from '../components/ErrorMsg';
import {WorkoutList} from '../components/WorkoutList';

export class Home extends Component {
  componentDidMount() {
    this.props.onFetchWorkouts();
  }

  render() {
    const {hasFetchFailure, workouts} = this.props;
    return (
      <div>
        <h1>Home</h1>
        {hasFetchFailure ? <ErrorMsg msg="Unable to fetch workouts"/> : null}
        <WorkoutList workouts={workouts}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {workoutStore} = state;
  return {
    workouts: workoutStore.value,
    hasFetchFailure: workoutStore.hasFetchFailure
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onFetchWorkouts() {
      dispatch(fetchWorkouts())
    }
  }
}

export const HomeFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Home);
