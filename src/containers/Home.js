import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchWorkouts } from '../state/workout/workout-action-creators';

export class Home extends Component {
  componentDidMount() {
    this.props.onFetchWorkouts();
  }

  render() {
    return (<p>Home</p>)
  }
}

function mapStateToProps(state, ownProps) {
  return {
    workouts: state.workoutStore.value
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
