import {expect} from 'chai'
import faker from 'faker'
import {Factory} from 'rosie'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as workout from '../../../api/workout'
import {WORKOUT} from '../workout-actions'
import {ERROR} from '../../error/error-actions'
import {fetchWorkouts, getWorkout, deleteWorkout} from '../workout-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Workout Action Creators', () => {

  describe('fetchWorkouts()', () => {

    afterEach(() => {
      workout.fetchWorkouts.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on workouts fetch success", () => {
      const items = Factory.buildList('workout', 2)
      sinon.stub(workout, 'fetchWorkouts').resolves(items)
      const expectedActions = [
        {type: WORKOUT.FETCH_INIT},
        {type: WORKOUT.FETCH_SUCCESS, items}
      ]

      const store = mockStore({workouts: {}})
      return store.dispatch(fetchWorkouts())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'ERROR__ADD' on workouts fetch failure", () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(workout, 'fetchWorkouts').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: WORKOUT.FETCH_INIT},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({workouts: {}})
      return store.dispatch(fetchWorkouts())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })
})
