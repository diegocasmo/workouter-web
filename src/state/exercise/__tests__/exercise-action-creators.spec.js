import {expect} from 'chai'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as exercise from '../../../db/models/exercise'
import {EXERCISE} from '../exercise-actions'
import {
  fetchExercises, getExercise, resetGetExercise, createExercise, resetCreateExercise,
  deleteExercise, resetDeleteExercise, updateExercise, resetUpdateExercise
} from '../exercise-action-creators'

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

  describe('getExercise()', () => {

    afterEach(() => {
      exercise.getExercise.restore()
    })

    it("dispatches 'GET_INIT', 'GET_SUCCESS' on exercise get success", () => {
      const exerciseAttrs = {id: 1, name: 'Foo', measurement: {name: 'Bar'}}
      sinon.stub(exercise, 'getExercise').resolves(exerciseAttrs)
      const expectedActions = [
        {type: EXERCISE.GET_INIT},
        {type: EXERCISE.GET_SUCCESS, item: exerciseAttrs}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(getExercise(exerciseAttrs.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'GET_ERROR' on exercise get failure", () => {
      const exerciseAttrs = {id: 1, name: 'Foo', measurement: {name: 'Bar'}}
      sinon.stub(exercise, 'getExercise').rejects()
      const expectedActions = [
        {type: EXERCISE.GET_INIT},
        {
          type: EXERCISE.GET_FAILURE,
          errorMsg: `There was an error while fetching the exercise with id: ${exerciseAttrs.id}`
        }
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(getExercise(exerciseAttrs.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('resetGetExercise()', () => {

    it("dispatches 'GET_RESET'", () => {
      const expectedAction = {type: EXERCISE.GET_RESET}
      expect(resetGetExercise()).to.be.eql(expectedAction)
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

  describe('resetCreateExercise()', () => {

    it("dispatches 'CREATE_RESET'", () => {
      const expectedAction = {type: EXERCISE.CREATE_RESET}
      expect(resetCreateExercise()).to.be.eql(expectedAction)
    })
  })

  describe('updateExercise()', () => {
    let prevExercise
    beforeEach(() => {
      prevExercise = {id: 1, 'name': 'Abs', 'measurement': {'name': 'reps'}}
    })

    afterEach(() => {
      exercise.updateExercise.restore()
    })

    it("dispatches 'UPDATE_INIT', 'UPDATE_SUCCESS' on exercises update success", () => {
      const nextExercise = {...prevExercise, name: 'Foo'}
      sinon.stub(exercise, 'updateExercise').resolves(nextExercise)
      const expectedActions = [
        {type: EXERCISE.UPDATE_INIT, item: prevExercise},
        {type: EXERCISE.UPDATE_SUCCESS, item: nextExercise}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(updateExercise(prevExercise))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'UPDATE_ERROR' on exercise update failure", () => {
      const errors = {'name': 'Name is required'}
      sinon.stub(exercise, 'updateExercise').rejects(errors)
      const expectedActions = [
        {type: EXERCISE.UPDATE_INIT, item: prevExercise},
        {type: EXERCISE.UPDATE_FAILURE, errors}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(updateExercise(prevExercise))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('resetUpdateExercise()', () => {

    it("dispatches 'UPDATE_RESET'", () => {
      const expectedAction = {type: EXERCISE.UPDATE_RESET}
      expect(resetUpdateExercise()).to.be.eql(expectedAction)
    })
  })

  describe('deleteExercise()', () => {
    let attrs
    beforeEach(() => {
      attrs = {id: 1, 'name': 'Abs', 'measurement': {'name': 'reps'}}
    })

    afterEach(() => {
      exercise.deleteExercise.restore()
    })

    it("dispatches 'DELETE_INIT', 'DELETE_SUCCESS' on exercises delete success", () => {
      sinon.stub(exercise, 'deleteExercise').resolves(1)
      const expectedActions = [
        {type: EXERCISE.DELETE_INIT, id: attrs.id},
        {type: EXERCISE.DELETE_SUCCESS, id: attrs.id}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(deleteExercise(attrs.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })

    it("dispatches 'DELETE_ERROR' on exercise delete failure", () => {
      const errors = {'id': 'Exercise id doesn\'t exist'}
      sinon.stub(exercise, 'deleteExercise').rejects(errors)
      const expectedActions = [
        {type: EXERCISE.DELETE_INIT, id: attrs.id},
        {type: EXERCISE.DELETE_FAILURE, errors}
      ]

      const store = mockStore({exercises: {}})
      return store.dispatch(deleteExercise(attrs.id))
        .then(() => expect(store.getActions()).to.be.eql(expectedActions))
    })
  })

  describe('resetDeleteExercise()', () => {

    it("dispatches 'DELETE_RESET'", () => {
      const expectedAction = {type: EXERCISE.DELETE_RESET}
      expect(resetDeleteExercise()).to.be.eql(expectedAction)
    })
  })
})
