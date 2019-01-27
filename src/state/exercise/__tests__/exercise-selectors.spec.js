import {expect} from 'chai'
import {Factory} from 'rosie'
import sinon from 'sinon'
import {initialState} from '../exercise-reducer'
import {REQUEST_STATUS} from '../../utils/request-status'
import {getExercises, isLoading, getExercise} from '../exercise-selectors'

describe('Exercise Selectors', () => {

  let state
  beforeEach(() => {
    state = {exercises: initialState}
  })

  describe('getExercises()', () => {

    it('returns a list of exercises', () => {
      const exercises = Factory.buildList('exercise', 3)

      state.exercises.items = exercises.reduce((acc, x) => {
        acc[x.id] = x
        return acc
      }, {})

      expect(getExercises(state)).to.be.eql(exercises)
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
})
