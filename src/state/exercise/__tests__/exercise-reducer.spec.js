import {expect} from 'chai';
import {exerciseReducer} from '../exercise-reducer';
import {EXERCISE} from '../exercise-actions';

describe('Exercise Reducer', () => {

  it('should return the initial state', () => {
    expect(exerciseReducer(undefined, {}))
      .to.be.eql({
        value: [],
        isFetching: false,
        hasFetchFailed: false
      });
  });

  it('FETCH_INIT', () => {
    const action  = {type: EXERCISE.FETCH_INIT};
    expect(exerciseReducer({}, action))
      .to.be.eql({
        isFetching: true,
        hasFetchFailed: false
      });
  });

  it('FETCH_SUCCESS', () => {
    const data = {exercises: [{id: 1}, {id :2}]};
    const action  = {type: EXERCISE.FETCH_SUCCESS, data};
    expect(exerciseReducer({}, action))
      .to.be.eql({
        value: data,
        isFetching: false,
        hasFetchFailed: false
      });
  });

  it('FETCH_FAILURE', () => {
    const action  = {type: EXERCISE.FETCH_FAILURE};
    expect(exerciseReducer({}, action))
      .to.be.eql({
        isFetching: false,
        hasFetchFailed: true
      });
  });
});
