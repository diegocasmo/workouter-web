import {expect} from 'chai'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as measurement from '../../../db/models/measurement'
import {MEASUREMENT} from '../measurement-actions'
import {fetchMeasurements, resetFetchMeasurements} from '../measurement-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Measurement Action Creators', () => {

  describe('fetchMeasurements()', () => {

    afterEach(() => {
      measurement.fetchMeasurements.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on measurements fetch success", () => {
      const items = [{id: 1}, {id :2}]
      sinon.stub(measurement, 'fetchMeasurements').resolves(items)
      const expectedActions = [
        {type: MEASUREMENT.FETCH_INIT},
        {type: MEASUREMENT.FETCH_SUCCESS, items}
      ]

      const store = mockStore({measurements: {}})
      return store.dispatch(fetchMeasurements())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'FETCH_ERROR' on measurements fetch failure", () => {
      sinon.stub(measurement, 'fetchMeasurements').rejects()
      const expectedActions = [
        {type: MEASUREMENT.FETCH_INIT},
        {
          type: MEASUREMENT.FETCH_FAILURE,
          errorMsg: 'There was an error while fetching the measurements'
        }
      ]

      const store = mockStore({measurements: {}})
      return store.dispatch(fetchMeasurements())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('resetFetchMeasurements()', () => {

    it("dispatches 'FETCH_RESET'", () => {
      const expectedAction = {type: MEASUREMENT.FETCH_RESET}
      expect(resetFetchMeasurements()).to.be.eql(expectedAction)
    })
  })
})
