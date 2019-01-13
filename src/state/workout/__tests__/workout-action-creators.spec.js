import {expect} from 'chai'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as workout from '../../../db/models/workout'
import {WORKOUT} from '../workout-actions'
import {fetchWorkouts, resetFetchWorkouts} from '../workout-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Workout Action Creators', () => {

  describe('fetchWorkouts()', () => {

    afterEach(() => {
      workout.fetchWorkouts.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on workouts fetch success", () => {
      const items = [{id: 1}, {id :2}]
      sinon.stub(workout, 'fetchWorkouts').resolves(items)
      const expectedActions = [
        {type: WORKOUT.FETCH_INIT},
        {type: WORKOUT.FETCH_SUCCESS, items}
      ]

      const store = mockStore({workouts: {}})
      return store.dispatch(fetchWorkouts())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'FETCH_ERROR' on workouts fetch failure", () => {
      sinon.stub(workout, 'fetchWorkouts').rejects()
      const expectedActions = [
        {type: WORKOUT.FETCH_INIT},
        {
          type: WORKOUT.FETCH_FAILURE,
          errorMsg: 'There was an error while fetching the workouts'
        }
      ]

      const store = mockStore({workouts: {}})
      return store.dispatch(fetchWorkouts())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('resetFetchWorkouts()', () => {

    it("dispatches 'FETCH_RESET'", () => {
      const expectedAction = {type: WORKOUT.FETCH_RESET}
      expect(resetFetchWorkouts()).to.be.eql(expectedAction)
    })
  })
})
