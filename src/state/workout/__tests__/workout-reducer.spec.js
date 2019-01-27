import {expect} from 'chai'
import {Factory} from 'rosie'
import {workoutReducer, initialState} from '../workout-reducer'
import {WORKOUT} from '../workout-actions'
import {REQUEST_STATUS} from '../../utils/request-status'

describe('Workout Reducer', () => {

  it('should return the initial state', () => {
    expect(workoutReducer(undefined, {}))
      .to.be.eql({
        items : {},
        status: REQUEST_STATUS.NONE
      })
  })

  describe('FETCH', () => {

    it('FETCH_INIT', () => {
      // Assume there are some workouts already in state
      const workouts = Factory.buildList('workout', 2)
      const items = workouts.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const state = {
        ...initialState,
        items
      }

      const action = {type: WORKOUT.FETCH_INIT}
      expect(workoutReducer(state, action))
        .to.be.eql({
          ...state,
          items,
          status: REQUEST_STATUS.GET
        })
    })

    it('FETCH_SUCCESS', () => {
      const workouts = Factory.buildList('workout', 2)
      const action = {type: WORKOUT.FETCH_SUCCESS, items: workouts}

      // Expect workouts to be added to the state by their ids
      const items = workouts.reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const expectedState = {
        ...initialState,
        items,
        status: REQUEST_STATUS.NONE
      }

      expect(workoutReducer(initialState, action))
        .to.be.eql(expectedState)
    })
  })

  describe('GET', () => {

    it('GET_INIT', () => {
      const action = {type: WORKOUT.GET_INIT}
      expect(workoutReducer(initialState, action))
        .to.be.eql({
          ...initialState,
          status: REQUEST_STATUS.GET
        })
    })

    it('GET_SUCCESS', () => {
      // Assume workout to be fetched was already in state (must be replaced anyways,
      // it might be a new version of it)
      const prevWorkout = Factory.build('workout', {id: 1})
      const state = {
        ...initialState,
        items: {1: prevWorkout}
      }

      const nextWorkout = Factory.build('workout', {...prevWorkout, name: 'new version'})
      const action = {type: WORKOUT.GET_SUCCESS, item: nextWorkout}
      expect(workoutReducer(state, action))
        .to.be.eql({
          items: {1: nextWorkout},
          status: REQUEST_STATUS.NONE
        })
    })
  })

  describe('DELETE', () => {

    it('DELETE_INIT', () => {
      // Set up initial state as if an existing workout is going to be deleted
      const workouts = Factory.buildList('workout', 2)
      const items = workouts.reduce((acc, x) => ({...acc, [x.id]: x}), {})

      const state = {
        ...initialState,
        items
      }

      const action = {type: WORKOUT.DELETE_INIT}
      expect(workoutReducer(state, action))
        .to.be.eql({
          ...state,
          status: REQUEST_STATUS.DELETE
        })
    })

    it('DELETE_SUCCESS', () => {
      // Set up initial state as if an existing workout is going to be deleted
      const workouts = Factory.buildList('workout', 2)
      const id = workouts[0].id
      const prevItems = workouts.reduce((acc, x) => ({...acc, [x.id]: x}), {})

      const state = {
        ...initialState,
        items: prevItems
      }

      // Delete workout from items
      const nextItems = workouts
                        .filter((x) => x.id !== id)
                        .reduce((acc, x) => ({...acc, [x.id]: x}), {})
      const expectedState = {
        ...initialState,
        items: nextItems,
        status: REQUEST_STATUS.NONE
      }

      const action = {type: WORKOUT.DELETE_SUCCESS, id}
      expect(workoutReducer(state, action))
        .to.be.eql(expectedState)
    })
  })
})
