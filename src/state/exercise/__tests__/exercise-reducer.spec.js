import {expect} from 'chai'
import {Factory} from 'rosie'
import {exerciseReducer, initialState} from '../exercise-reducer'
import {EXERCISE} from '../exercise-actions'
import {REQUEST_STATUS} from '../../utils/request-status'

describe('Exercise Reducer', () => {

  it('should return the initial state', () => {
    expect(exerciseReducer(undefined, {}))
      .to.be.eql({
        pageNum: 0,
        perPage: 12,
        hasMore: true,
        items : {},
        status: REQUEST_STATUS.NONE
      })
  })

  describe('FETCH', () => {

    it('FETCH_INIT', () => {
      // Assume there are some exercises already in state
      const exercises = Factory.buildList('exercise', 2)
      const items = exercises.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const state = {
        ...initialState,
        items
      }

      const action = {type: EXERCISE.FETCH_INIT}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          items,
          status: REQUEST_STATUS.GET
        })
    })

    it('FETCH_SUCCESS', () => {
      const exercises = Factory.buildList('exercise', 20)
      const action = {type: EXERCISE.FETCH_SUCCESS, items: exercises}

      // Expect exercises to be added to the state by their ids
      const items = exercises.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const {pageNum, perPage} = initialState
      const expectedState = {
        ...initialState,
        pageNum: exercises.length >= perPage ? pageNum + 1 : pageNum,
        hasMore: exercises.length >= perPage,
        items,
        status: REQUEST_STATUS.NONE
      }

      expect(exerciseReducer(initialState, action))
        .to.be.eql(expectedState)
    })

    it('FETCH_FAILURE', () => {
      const state = {
        ...initialState,
        status: REQUEST_STATUS.GET
      }

      const action = {type: EXERCISE.FETCH_FAILURE}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.NONE
        })
    })

    it('FETCH_CLEAR', () => {
      // Assume there are some exercises already in state
      const exercises = Factory.buildList('exercise', 10)
      const items = exercises.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const state = {...initialState, items}

      const action = {type: EXERCISE.FETCH_CLEAR}
      const expected = initialState
      const actual = exerciseReducer(state, action)
      expect(actual).to.be.eql(expected)
    })
  })

  describe('GET', () => {

    it('GET_INIT', () => {
      const action = {type: EXERCISE.GET_INIT}
      expect(exerciseReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          status: REQUEST_STATUS.GET
        })
    })

    it('GET_SUCCESS', () => {
      // Assume exercise to be fetched was already in state (must be replaced anyways,
      // it might be a new version of it)
      const prevExercise = Factory.build('exercise', {id: 1})
      const nextExercise = Factory.build('exercise', {...prevExercise, name: 'new version'})
      const state = {
        ...initialState,
        items: {1: prevExercise}
      }
      const action = {type: EXERCISE.GET_SUCCESS, item: nextExercise}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          items: {1: nextExercise},
          status: REQUEST_STATUS.NONE
        })
    })

    it('GET_FAILURE', () => {
      const state = {
        ...initialState,
        status: REQUEST_STATUS.GET
      }

      const action = {type: EXERCISE.GET_FAILURE}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.NONE
        })
    })
  })

  describe('DELETE', () => {

    it('DELETE_INIT', () => {
      // Set up initial state as if an existing exercise is going to be deleted
      const exercises = Factory.buildList('exercise', 2)
      const items = exercises.reduce((acc, x) => ({...acc, [x.id]: x}), {})

      const state = {
        ...initialState,
        items
      }

      const action = {type: EXERCISE.DELETE_INIT}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.DELETE
        })
    })

    it('DELETE_SUCCESS', () => {
      // Set up initial state as if an existing exercise is going to be deleted
      const exercises = Factory.buildList('exercise', 2)
      const id = exercises[0].id
      const prevItems = exercises.reduce((acc, x) => ({...acc, [x.id]: x}), {})

      const state = {
        ...initialState,
        items: prevItems
      }

      // Delete exercise from items
      const nextItems = exercises
                        .filter((x) => x.id !== id)
                        .reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const expectedState = {
        ...initialState,
        items: nextItems,
        status: REQUEST_STATUS.NONE
      }

      const action = {type: EXERCISE.DELETE_SUCCESS, id}
      expect(exerciseReducer(state, action))
        .to.be.eql(expectedState)
    })

    it('DELETE_FAILURE', () => {
      const state = {
        ...initialState,
        status: REQUEST_STATUS.DELETE
      }

      const action = {type: EXERCISE.DELETE_FAILURE}
      expect(exerciseReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.NONE
        })
    })
  })
})
