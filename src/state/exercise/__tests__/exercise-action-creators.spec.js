import {expect} from 'chai'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as exercise from '../../../db/models/exercise'
import {EXERCISE} from '../exercise-actions'
import {fetchExercises, createExercise} from '../exercise-action-creators'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Exercise Action Creators', () => {

  describe('fetchExercises()', () => {

    afterEach(() => {
      exercise.fetchExercises.restore()
    })

    it("dispatches 'FETCH_INIT', 'FETCH_SUCCESS' on exercises fetch success", () => {
      const data = [{id: 1}, {id :2}]
      sinon.stub(exercise, 'fetchExercises').resolves(data)
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {type: EXERCISE.FETCH_SUCCESS, items: data}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(fetchExercises())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'FETCH_ERROR' on exercises fetch failure", () => {
      sinon.stub(exercise, 'fetchExercises').rejects()
      const expectedActions = [
        {type: EXERCISE.FETCH_INIT},
        {
          type: EXERCISE.FETCH_FAILURE,
          errorMsg: 'There was an error while fetching the exercises'
        }
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(fetchExercises())
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('createExercise()', () => {
    let exerciseAttrs
    beforeEach(() => {
      exerciseAttrs = {'name': 'Abs', 'measurement': {'name': 'reps'}}
    })

    afterEach(() => {
      exercise.createExercise.restore()
    })

    it("dispatches 'CREATE_INIT', 'CREATE_SUCCESS' on exercises create success", () => {
      const createdExercise = {id: 1, ...exerciseAttrs}
      sinon.stub(exercise, 'createExercise').resolves(createdExercise)
      const expectedActions = [
        {type: EXERCISE.CREATE_INIT, item: exerciseAttrs},
        {type: EXERCISE.CREATE_SUCCESS, item: createdExercise}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(createExercise(exerciseAttrs))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'CREATE_ERROR' on exercise create failure", () => {
      const errors = {'name': 'Name is required'}
      sinon.stub(exercise, 'createExercise').rejects(errors)
      const expectedActions = [
        {type: EXERCISE.CREATE_INIT, item: exerciseAttrs},
        {type: EXERCISE.CREATE_FAILURE, errors}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(createExercise(exerciseAttrs))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })
})
