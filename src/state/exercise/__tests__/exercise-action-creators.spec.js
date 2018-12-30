import {expect} from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as exercise from '../../../db/exercise';
import {EXERCISE} from '../exercise-actions';
import {fetchExercises} from '../exercise-action-creators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Exercise Action Creators', () => {

  describe('fetchExercises()', () => {

    afterEach(() => {
      exercise.fetch.restore();
    });

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on exercises fetch success", () => {
      const data = {exercises: [{id: 1}, {id :2}]};
      sinon.stub(exercise, 'fetch').resolves(data);
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {type: EXERCISE.FETCH_SUCCESS, data}
      ];

      const store = mockStore({exerciseStore: {}});

      return store.dispatch(fetchExercises())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });

    it("dispatches 'FETCH_ERROR' on exercises fetch failure", () => {
      sinon.stub(exercise, 'fetch').rejects([]);
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {type: EXERCISE.FETCH_FAILURE}
      ];

      const store = mockStore({exerciseStore: {}});

      return store.dispatch(fetchExercises())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });
  });
});
