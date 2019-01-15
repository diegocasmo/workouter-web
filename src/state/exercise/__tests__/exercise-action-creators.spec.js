import {expect} from 'chai'
import faker from 'faker'
import {Factory} from 'rosie'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as exercise from '../../../api/exercise'
import {EXERCISE} from '../exercise-actions'
import {ERROR} from '../../error/error-actions'
import {fetchExercises, getExercise, deleteExercise} from '../exercise-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Exercise Action Creators', () => {

  describe('fetchExercises()', () => {

    afterEach(() => {
      exercise.fetchExercises.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on exercises fetch success", () => {
      const items = Factory.buildList('exercise', 2)
      sinon.stub(exercise, 'fetchExercises').resolves(items)
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {type: EXERCISE.FETCH_SUCCESS, items}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(fetchExercises())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'ERROR__ADD' on exercises fetch failure", () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(exercise, 'fetchExercises').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(fetchExercises())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('getExercise()', () => {

    afterEach(() => {
      exercise.getExercise.restore()
    })

    it("dispatches 'GET_INIT', 'GET_SUCCESS' on exercise get success", () => {
      const item = Factory.build('exercise')
      sinon.stub(exercise, 'getExercise').resolves(item)
      const expectedActions = [
        {type: EXERCISE.GET_INIT},
        {type: EXERCISE.GET_SUCCESS, item}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(getExercise(item.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'ERROR__ADD' on exercise get failure", () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(exercise, 'getExercise').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: EXERCISE.GET_INIT},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(getExercise(1))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('deleteExercise()', () => {

    afterEach(() => {
      exercise.deleteExercise.restore()
    })

    it("dispatches 'DELETE_INIT', 'DELETE_SUCCESS' on exercises delete success", () => {
      const attrs = Factory.build('exercise')
      sinon.stub(exercise, 'deleteExercise').resolves(1)
      const expectedActions = [
        {type: EXERCISE.DELETE_INIT},
        {type: EXERCISE.DELETE_SUCCESS, id: attrs.id}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(deleteExercise(attrs.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'ERROR__ADD' on exercises delete failure", () => {
      const errorMsg = faker.lorem.words()
      sinon.stub(exercise, 'deleteExercise').rejects(new Error(errorMsg))
      const expectedActions = [
        {type: EXERCISE.DELETE_INIT},
        {type: ERROR.ADD, errorMsg}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(deleteExercise(1))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })
})
