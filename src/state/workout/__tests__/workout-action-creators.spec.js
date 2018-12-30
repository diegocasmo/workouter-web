import { expect } from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as workout from '../../../db/workout';
import { WORKOUT } from '../workout-actions';
import { fetchWorkouts } from '../workout-action-creators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Workout Action Creators', () => {

  describe('fetchWorkouts()', () => {

    afterEach(() => {
      workout.fetch.restore();
    });

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on workouts fetch success", () => {
      const data = { workouts: [{ id: 1 }, { id :2 }] };
      sinon.stub(workout, 'fetch').resolves(data);
      const expectedActions = [
        { type: WORKOUT.FETCH_INIT },
        { type: WORKOUT.FETCH_SUCCESS, data }
      ];

      const store = mockStore({ workoutStore: {} });

      return store.dispatch(fetchWorkouts())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });

    it("dispatches 'FETCH_ERROR' on workouts fetch failure", () => {
      sinon.stub(workout, 'fetch').rejects([]);
      const expectedActions = [
        { type: WORKOUT.FETCH_INIT },
        { type: WORKOUT.FETCH_FAILURE }
      ];

      const store = mockStore({ workoutStore: {} });

      return store.dispatch(fetchWorkouts())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });
  });
});
