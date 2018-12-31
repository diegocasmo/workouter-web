import {expect} from 'chai';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as measurement from '../../../db/models/measurement';
import {MEASUREMENT} from '../measurement-actions';
import {fetchMeasurements} from '../measurement-action-creators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Measurement Action Creators', () => {

  describe('fetchMeasurements()', () => {

    afterEach(() => {
      measurement.fetch.restore();
    });

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on measurements fetch success", () => {
      const data = [{id: 1}, {id :2}];
      sinon.stub(measurement, 'fetch').resolves(data);
      const expectedActions = [
        {type: MEASUREMENT.FETCH_INIT},
        {type: MEASUREMENT.FETCH_SUCCESS, items: data}
      ];

      const store = mockStore({measurementStore: {}});

      return store.dispatch(fetchMeasurements())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });

    it("dispatches 'FETCH_ERROR' on measurements fetch failure", () => {
      sinon.stub(measurement, 'fetch').rejects();
      const expectedActions = [
        {type: MEASUREMENT.FETCH_INIT},
        {
          type: MEASUREMENT.FETCH_FAILURE,
          errorMsg: 'There was an error while fetching the measurements'
        }
      ];

      const store = mockStore({measurementStore: {}});

      return store.dispatch(fetchMeasurements())
              .then(() => expect(store.getActions()).to.be.eql(expectedActions));
    });
  });
});
