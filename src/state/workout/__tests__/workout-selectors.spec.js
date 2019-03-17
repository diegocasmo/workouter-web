import {expect} from 'chai'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {initialState} from '../workout-reducer'
import {REQUEST_STATUS} from '../../utils/request-status'
import {getWorkouts, isLoading, getWorkout} from '../workout-selectors'

describe('Workout Selectors', () => {

  let state
  beforeEach(() => {
    state = {workouts: initialState}
  })

  describe('getWorkouts()', () => {

    it('returns a list of workouts', () => {
      const workouts = Factory.buildList('workout', 3)

      state.workouts.items = workouts.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      expect(getWorkouts(state)).to.be.eql(workouts)
    })
  })

  describe('getWorkout()', () => {

    it('returns a workout', () => {
      const workouts = Factory.buildList('workout', 3)

      state.workouts.items = workouts.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      expect(getWorkout(state, workouts[0].id)).to.be.eql(workouts[0])
    })
  })

  describe('isLoading()', () => {

    it('returns true if workouts are being loaded', () => {
      state.workouts.status = REQUEST_STATUS.GET
      expect(isLoading(state)).to.be.true
    })

    it('returns false if workouts are not being loaded', () => {
      state.workouts.status = REQUEST_STATUS.NONE
      expect(isLoading(state)).to.be.false
      state.workouts.status = REQUEST_STATUS.DELETE
      expect(isLoading(state)).to.be.false
    })
  })
})
