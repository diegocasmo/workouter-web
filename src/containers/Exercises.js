import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchExercises} from '../state/exercise/exercise-action-creators';
import {Loading} from '../components/Loading';
import {ErrorMsg} from '../components/ErrorMsg';
import {ExerciseList} from '../components/ExerciseList/ExerciseList';

export class Exercises extends Component {
  componentDidMount() {
    this.props.onFetchExercises();
  }

  render() {
    const {isFetching, exercises, hasFetchFailed} = this.props;
    return (
      <div>
        <h1>Exercises</h1>
        {isFetching ? <Loading/> : null}
        {hasFetchFailed ? <ErrorMsg msg='Unable to fetch exercises'/> : null}
        <ExerciseList exercises={exercises}/>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {exerciseStore} = state;
  return {
    exercises: exerciseStore.value,
    isFetching: exerciseStore.isFetching,
    hasFetchFailed: exerciseStore.hasFetchFailed,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onFetchExercises() {
      dispatch(fetchExercises())
    }
  }
}

export const ExercisesFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Exercises);
