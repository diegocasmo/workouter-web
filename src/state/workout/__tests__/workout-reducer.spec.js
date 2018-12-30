import { expect } from 'chai';
import { workoutReducer } from '../workout-reducer';
import { WORKOUT } from '../workout-actions';

describe('Workout Reducer', () => {

  it('should return the initial state', () => {
    expect(workoutReducer(undefined, {}))
      .to.be.eql({
        value: [],
        isFetching: false,
        hasFetchFailed: false
      });
  });

  it('FETCH_INIT', () => {
    const action  = {type: WORKOUT.FETCH_INIT};
    expect(workoutReducer({}, action))
      .to.be.eql({
        isFetching: true,
        hasFetchFailed: false
      });
  });

  it('FETCH_SUCCESS', () => {
    const data = { workouts: [{ id: 1 }, { id :2 }] };
    const action  = { type: WORKOUT.FETCH_SUCCESS, data };
    expect(workoutReducer({}, action))
      .to.be.eql({
        value: data,
        isFetching: false,
        hasFetchFailed: false
      });
  });

  it('FETCH_FAILURE', () => {
    const action  = { type: WORKOUT.FETCH_FAILURE };
    expect(workoutReducer({}, action))
      .to.be.eql({
        isFetching: false,
        hasFetchFailed: true
      });
  });
});
