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
})
