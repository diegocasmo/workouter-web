import {expect} from 'chai'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {initialState} from '../workout-reducer'
import {getWorkouts, areWorkoutsLoading, hasWorkoutsError} from '../workout-selectors'

describe('Workout Selectors', () => {

  let state
  beforeEach(() => {
    state = {workouts: initialState}
  })

  describe('getWorkouts()', () => {

    it('returns a list of workouts', () => {
      const list = Factory.buildList(3, 'workout')
      state.workouts.getItems.list = list
      expect(getWorkouts(state)).to.be.eql(list)
    })
  })

  describe('areWorkoutsLoading()', () => {

    it('returns true if workouts are being loaded', () => {
      state.workouts.getItems.isLoading = true
      expect(areWorkoutsLoading(state)).to.be.true
    })

    it('returns false if workouts are not being loaded', () => {
      state.workouts.getItems.isLoading = false
      expect(areWorkoutsLoading(state)).to.be.false
    })
  })

  describe('hasWorkoutsError()', () => {

    it('returns true if workouts have an error', () => {
      state.workouts.getItems.errorMsg = 'Some error message'
      expect(hasWorkoutsError(state)).to.be.true
    })

    it('returns false if workouts have no error', () => {
      state.workouts.getItems.errorMsg = null
      expect(hasWorkoutsError(state)).to.be.false
    })
  })
})
