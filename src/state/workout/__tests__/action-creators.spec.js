import {expect} from 'chai'
import faker from 'faker'
import {Factory} from 'rosie'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as workout from '../../../api/workout'
import {WORKOUT} from '../actions'
import {ERROR} from '../../error/actions'
import {fetchWorkouts, getWorkout, deleteWorkout} from '../action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Workout Action Creators', () => {

  describe('fetchWorkouts()', () => {

    afterEach(() => {
      workout.fetchWorkouts.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on workouts fetch success", async () => {
      const items = Factory.buildList('workout', 2)
      sinon.stub(workout, 'fetchWorkouts').callsFake(sinon.spy(() => Promise.resolve(items)))
      const expectedActions = [
        {type: WORKOUT.FETCH_INIT},
        {type: WORKOUT.FETCH_SUCCESS, items}
      ]

      const store = mockStore({workouts: {perPage: 45}})
      const pageNum = 15
      await store.dispatch(fetchWorkouts(pageNum))

      expect(workout.fetchWorkouts.calledOnce).to.be.true
      expect(workout.fetchWorkouts.calledWith({
        pageNum,
        perPage: 45
      })).to.be.true
      expect(store.getActions()).to.be.eql(expectedActions)
    })

    it("dispatches 'FETCH_FAILURE' and 'ERROR__ADD' on workouts fetch failure", async () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(workout, 'fetchWorkouts').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: WORKOUT.FETCH_INIT},
        {type: WORKOUT.FETCH_FAILURE},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({workouts: {}})
      await store.dispatch(fetchWorkouts())

      expect(store.getActions()).to.be.eql(expectedActions)
    })
  })

  describe('getWorkout()', () => {

    afterEach(() => {
      workout.getWorkout.restore()
    })

    it("dispatches 'GET_INIT', 'GET_SUCCESS' on workout get success", async () => {
      const item = Factory.build('workout')
      sinon.stub(workout, 'getWorkout').resolves(item)
      const expectedActions = [
        {type: WORKOUT.GET_INIT},
        {type: WORKOUT.GET_SUCCESS, item}
      ]

      let store = mockStore({workouts: {}})
      await store.dispatch(getWorkout(item.id))
      expect(store.getActions()).to.be.eql(expectedActions)
    })

    it("dispatches 'GET_FAILURE' and 'ERROR__ADD' on workout get failure", async () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(workout, 'getWorkout').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: WORKOUT.GET_INIT},
        {type: WORKOUT.GET_FAILURE},
        {type: ERROR.ADD, errorMsg}
      ]

      let store = mockStore({workouts: {}})
      await store.dispatch(getWorkout(1))
      expect(store.getActions()).to.be.eql(expectedActions)
    })
  })

  describe('deleteWorkout()', () => {

    afterEach(() => {
      workout.deleteWorkout.restore()
    })

    it("dispatches 'DELETE_INIT', 'DELETE_SUCCESS' on workout delete success", () => {
      const attrs = Factory.build('workout')
      sinon.stub(workout, 'deleteWorkout').resolves(1)
      const expectedActions = [
        {type: WORKOUT.DELETE_INIT},
        {type: WORKOUT.DELETE_SUCCESS, id: attrs.id}
      ]

      const store = mockStore({workouts: {}})
      return store.dispatch(deleteWorkout(attrs.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'DELETE_FAILURE' and 'ERROR__ADD' on workout delete failure", () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(workout, 'deleteWorkout').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: WORKOUT.DELETE_INIT},
        {type: WORKOUT.DELETE_FAILURE},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({workouts: {}})
      return store.dispatch(deleteWorkout(1))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })
})
