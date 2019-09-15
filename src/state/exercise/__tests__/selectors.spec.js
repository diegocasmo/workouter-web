import { expect } from 'chai'
import { Factory } from 'rosie'
import sinon from 'sinon'
import { initialState } from '../reducer'
import { REQUEST_STATUS } from '../../utils/request-status'
import { getExercises, isLoading, getExercise, canLoadMore } from '../selectors'

describe('Exercise Selectors', () => {
  let state
  beforeEach(() => {
    state = { exercises: initialState }
  })

  describe('getExercises()', () => {
    it('returns a list of exercises', () => {
      const exercises = Factory.buildList('exercise', 3)

      state.exercises.items = exercises.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      // Make sure exercises are sorted by their name in ascending order
      const expected = [...exercises].sort((a, b) =>
        a.name.localeCompare(b.name)
      )
      const actual = getExercises(state)
      expect(actual).to.be.eql(expected)
    })
  })

  describe('getExercise()', () => {
    it('returns an exercise', () => {
      const exercises = Factory.buildList('exercise', 3)

      state.exercises.items = exercises.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      expect(getExercise(state, exercises[0].id)).to.be.eql(exercises[0])
    })
  })

  describe('isLoading()', () => {
    it('returns true if exercises are being loaded', () => {
      state.exercises.status = REQUEST_STATUS.GET
      expect(isLoading(state)).to.be.true
    })

    it('returns false if exercises are not being loaded', () => {
      state.exercises.status = REQUEST_STATUS.NONE
      expect(isLoading(state)).to.be.false
      state.exercises.status = REQUEST_STATUS.DELETE
      expect(isLoading(state)).to.be.false
    })
  })

  describe('canLoadMore', () => {
    it('returns true if there are more exercises to load and no exercises are being fetched', () => {
      const state = {
        exercises: {
          ...initialState,
          hasMore: true,
          status: REQUEST_STATUS.NONE,
        },
      }
      expect(canLoadMore(state)).to.be.true
    })

    it('returns false if there are no more exercises to load', () => {
      const state = {
        exercises: {
          ...initialState,
          hasMore: false,
        },
      }
      expect(canLoadMore(state)).to.be.false
    })

    it('returns false if exercises are being fetched', () => {
      const state = {
        exercises: {
          ...initialState,
          status: REQUEST_STATUS.GET,
        },
      }
      expect(canLoadMore(state)).to.be.false
    })
  })
})
