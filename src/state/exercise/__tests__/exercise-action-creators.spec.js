import {expect} from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as exercise from '../../../db/models/exercise';
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
      const data = [{id: 1}, {id :2}];
      sinon.stub(exercise, 'fetch').resolves(data);
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {type: EXERCISE.FETCH_SUCCESS, items: data}
      ];

      const store = mockStore({exerciseStore: {}});

      return store.dispatch(fetchExercises())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });

    it("dispatches 'FETCH_ERROR' on exercises fetch failure", () => {
      sinon.stub(exercise, 'fetch').rejects();
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {
          type: EXERCISE.FETCH_FAILURE,
          errorMsg: 'There was an error while fetching the exercises'
        }
      ];

      const store = mockStore({exerciseStore: {}});

      return store.dispatch(fetchExercises())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });
  });
});
