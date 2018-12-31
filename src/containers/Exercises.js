import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchExercises} from '../state/exercise/exercise-action-creators';
import {getAll, isLoading, hasError} from '../state/exercise/exercise-selectors';
import {Loading} from '../components/Loading';
import {ErrorMsg} from '../components/ErrorMsg';
import {ExerciseList} from '../components/ExerciseList/ExerciseList';

export class Exercises extends Component {
  componentDidMount() {
    this.props.onFetchExercises();
  }

  render() {
    const {isLoading, exercises, hasError} = this.props;
    return (
      <div>
        <h1>Exercises</h1>
        {isLoading ? <Loading/> : null}
        {hasError ? <ErrorMsg msg='Unable to fetch exercises'/> : null}
        <ExerciseList exercises={exercises}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exercises: getAll(state),
  isLoading: isLoading(state),
  hasError: hasError(state)
})

const mapDispatchToProps = dispatch => {
  return {
    onFetchExercises() {
      dispatch(fetchExercises())
    }
  }
}

export const ExercisesFromStore = connect(
  mapStateToProps, mapDispatchToProps
)(Exercises);
