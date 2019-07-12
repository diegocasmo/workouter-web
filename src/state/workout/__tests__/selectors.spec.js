import {expect} from 'chai'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {initialState} from '../reducer'
import {REQUEST_STATUS} from '../../utils/request-status'
import {getWorkouts, isLoading, getWorkout, canLoadMore} from '../selectors'

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

      // Make sure workouts are sorted by their name in ascending order
      const expected = [...workouts].sort((a, b) => a.name.localeCompare(b.name))
      const actual = getWorkouts(state)
      expect(actual).to.be.eql(expected)
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

  describe('canLoadMore', () => {

    it('returns true if there are more workouts to load and no workouts are being fetched', () => {
      const state = {
        workouts: {
          ...initialState,
          hasMore: true,
          status: REQUEST_STATUS.NONE
        }
      }
      expect(canLoadMore(state)).to.be.true
    })

    it('returns false if there are no more workouts to load', () => {
      const state = {
        workouts: {
          ...initialState,
          hasMore: false
        }
      }
      expect(canLoadMore(state)).to.be.false
    })

    it('returns false if workouts are being fetched', () => {
      const state = {
        workouts: {
          ...initialState,
          status: REQUEST_STATUS.GET
        }
      }
      expect(canLoadMore(state)).to.be.false
    })
  })
})
